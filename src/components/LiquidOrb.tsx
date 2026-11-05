import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  shaderSource,
  stateSeeds,
  ribbonStyleIndex,
  ribbonInstanceCount,
  activationDurationMs,
  settleDurationMs,
  audioRules,
  audioFlowStrengths
} from './liquid-orb-shader';

export type OrbState = 'idle' | 'thinking';

interface LiquidOrbProps {
  state?: OrbState;
  onStateChange?: (state: OrbState) => void;
  interactive?: boolean;
  className?: string;
  size?: number | string;
}

export default function LiquidOrb({
  state: externalState = 'thinking',
  onStateChange,
  interactive = true,
  className = '',
}: LiquidOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [internalState, setInternalState] = useState<OrbState>(externalState);
  const [webGpuSupported, setWebGpuSupported] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState(false);
  const switchStateRef = useRef<((nextState: OrbState) => void) | null>(null);

  // Sync external state if changed
  useEffect(() => {
    if (externalState) {
      setInternalState(externalState);
      if (switchStateRef.current) {
        switchStateRef.current(externalState);
      }
    }
  }, [externalState]);

  const activeState = externalState || internalState;

  // WebGPU Implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!navigator.gpu) {
      setWebGpuSupported(false);
      return;
    }

    let animationFrame = 0;
    // Reduced motion: paint one static frame and stop the RAF loop (shader untouched).
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let device: GPUDevice | null = null;
    let ribbonTarget: GPUTexture | null = null;
    let stopped = false;

    let currentState: OrbState = activeState;
    let transitionTargetState: OrbState = currentState;
    let fromUniforms = new Float32Array(stateSeeds[currentState]);
    let targetUniforms = new Float32Array(stateSeeds[currentState]);
    const displayedUniforms = new Float32Array(stateSeeds[currentState]);
    let transitionStartedAt = 0;
    let activeTransitionDuration = 0;
    let lastFrameAt: number | null = null;
    let motionPhase = 0;

    let audioBands = { low: 0, mid: 0, high: 0, all: 0 };

    function srgbToLinear(value: number) {
      return value <= 0.04045
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    }

    function linearToSrgb(value: number) {
      return value <= 0.0031308
        ? value * 12.92
        : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
    }

    function mixSrgb(from: number, to: number, progress: number) {
      return linearToSrgb(
        srgbToLinear(from) + (srgbToLinear(to) - srgbToLinear(from)) * progress
      );
    }

    function transitionProgress(now: number) {
      if (activeTransitionDuration === 0) return 1;
      const raw = Math.min(1, Math.max(0, (now - transitionStartedAt) / activeTransitionDuration));
      return transitionTargetState === 'thinking'
        ? 1 - Math.pow(1 - raw, 3)
        : raw * raw * (3 - 2 * raw);
    }

    function sampleTransition(now: number) {
      const progress = transitionProgress(now);
      for (let index = 3; index < displayedUniforms.length; index += 1) {
        const colorComponent = index >= 40 && (index - 40) % 4 < 3;
        displayedUniforms[index] = colorComponent
          ? mixSrgb(fromUniforms[index], targetUniforms[index], progress)
          : fromUniforms[index] + (targetUniforms[index] - fromUniforms[index]) * progress;
      }
      return displayedUniforms;
    }

    function applyAudioUniforms(values: Float32Array, bands: typeof audioBands) {
      const styleKey = String(Math.round(values[15]));
      const strength = audioFlowStrengths[styleKey] ?? 0;
      if (!strength) return;
      for (const [index, band, additive, proportional, ceiling] of audioRules) {
        const input = bands[band as keyof typeof audioBands];
        const level = (Number.isFinite(input) ? Math.max(0, Math.min(1, input)) : 0) * strength;
        if (!level) continue;
        values[index] = Math.min(
          Math.max(ceiling, values[index]),
          values[index] * (1 + proportional * level) + additive * level
        );
      }
    }

    function switchState(nextState: OrbState) {
      if (!Object.prototype.hasOwnProperty.call(stateSeeds, nextState)) return;
      if (nextState === currentState) return;

      const now = performance.now();
      sampleTransition(now);
      fromUniforms = new Float32Array(displayedUniforms);
      targetUniforms = new Float32Array(stateSeeds[nextState]);
      transitionTargetState = nextState;
      transitionStartedAt = now;
      activeTransitionDuration = nextState === 'thinking' ? activationDurationMs : settleDurationMs;
      currentState = nextState;
      if (onStateChange) onStateChange(nextState);
    }
    switchStateRef.current = switchState;

    // Attach to window for external control
    const api = {
      getState: () => currentState,
      setState: switchState,
      setAudioBands: (bands: Partial<typeof audioBands> = {}) => {
        audioBands = {
          low: Number.isFinite(bands.low) ? Math.max(0, Math.min(1, bands.low!)) : 0,
          mid: Number.isFinite(bands.mid) ? Math.max(0, Math.min(1, bands.mid!)) : 0,
          high: Number.isFinite(bands.high) ? Math.max(0, Math.min(1, bands.high!)) : 0,
          all: Number.isFinite(bands.all) ? Math.max(0, Math.min(1, bands.all!)) : 0
        };
      }
    };
    (window as any).liquidOrb = api;

    async function initWebGpu() {
      try {
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
          setWebGpuSupported(false);
          return;
        }

        device = await adapter.requestDevice();
        if (stopped) return;

        const context = canvas!.getContext('webgpu');
        if (!context) {
          setWebGpuSupported(false);
          return;
        }

        const format = navigator.gpu.getPreferredCanvasFormat();
        context.configure({ device, format, alphaMode: 'premultiplied' });

        const shader = device.createShaderModule({ code: shaderSource });
        const compilation = await shader.getCompilationInfo();
        const errors = compilation.messages.filter((m) => m.type === 'error');
        if (errors.length) {
          console.warn('WebGPU shader compilation error:', errors);
          setWebGpuSupported(false);
          return;
        }

        const pipeline = device.createRenderPipeline({
          layout: 'auto',
          vertex: { module: shader, entryPoint: 'vs_main' },
          fragment: {
            module: shader,
            entryPoint: 'fs_main',
            targets: [
              {
                format,
                blend: {
                  color: {
                    srcFactor: 'one',
                    dstFactor: 'one-minus-src-alpha',
                    operation: 'add'
                  },
                  alpha: {
                    srcFactor: 'one',
                    dstFactor: 'one-minus-src-alpha',
                    operation: 'add'
                  }
                }
              }
            ]
          },
          primitive: { topology: 'triangle-list' }
        });

        const ribbonPipeline = device.createRenderPipeline({
          layout: 'auto',
          vertex: { module: shader, entryPoint: 'ribbon_vs_main' },
          fragment: {
            module: shader,
            entryPoint: 'ribbon_fs_main',
            targets: [
              {
                format,
                blend: {
                  color: { srcFactor: 'one', dstFactor: 'one', operation: 'add' },
                  alpha: {
                    srcFactor: 'one',
                    dstFactor: 'one-minus-src-alpha',
                    operation: 'add'
                  }
                }
              }
            ]
          },
          primitive: { topology: 'triangle-list' }
        });

        const ribbonCompositePipeline = device.createRenderPipeline({
          layout: 'auto',
          vertex: { module: shader, entryPoint: 'vs_main' },
          fragment: {
            module: shader,
            entryPoint: 'ribbon_composite_fs_main',
            targets: [
              {
                format,
                blend: {
                  color: {
                    srcFactor: 'one',
                    dstFactor: 'one-minus-src-alpha',
                    operation: 'add'
                  },
                  alpha: {
                    srcFactor: 'one',
                    dstFactor: 'one-minus-src-alpha',
                    operation: 'add'
                  }
                }
              }
            ]
          },
          primitive: { topology: 'triangle-list' }
        });

        const values = new Float32Array(displayedUniforms);
        const uniformBuffer = device.createBuffer({
          size: values.byteLength,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });

        const bindGroup = device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [{ binding: 0, resource: { buffer: uniformBuffer } }]
        });

        const ribbonBindGroup = device.createBindGroup({
          layout: ribbonPipeline.getBindGroupLayout(0),
          entries: [{ binding: 0, resource: { buffer: uniformBuffer } }]
        });

        const ribbonSampler = device.createSampler({
          addressModeU: 'clamp-to-edge',
          addressModeV: 'clamp-to-edge',
          magFilter: 'linear',
          minFilter: 'linear'
        });

        let ribbonCompositeBindGroup: GPUBindGroup | null = null;

        device.lost.then(() => {
          if (!stopped) setWebGpuSupported(false);
        });

        function renderFrame(now: number) {
          if (stopped || !device || !canvas) return;

          try {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
            const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));

            if (canvas.width !== width || canvas.height !== height) {
              canvas.width = width;
              canvas.height = height;
              ribbonTarget?.destroy();
              ribbonTarget = null;
              ribbonCompositeBindGroup = null;
            }

            values.set(sampleTransition(now));
            const frameDelta =
              lastFrameAt === null ? 0 : Math.min(0.1, Math.max(0, (now - lastFrameAt) / 1000));
            lastFrameAt = now;

            applyAudioUniforms(values, audioBands);
            motionPhase += frameDelta * Math.max(values[3], 0);
            values[0] = width;
            values[1] = height;
            values[2] = motionPhase / Math.max(values[3], 0.001);
            device.queue.writeBuffer(uniformBuffer, 0, values);

            const isParticleRibbon = Math.round(values[15]) === ribbonStyleIndex;
            const encoder = device.createCommandEncoder();

            if (isParticleRibbon) {
              if (!ribbonTarget || !ribbonCompositeBindGroup) {
                ribbonTarget = device.createTexture({
                  size: { width, height },
                  format,
                  usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
                });
                ribbonCompositeBindGroup = device.createBindGroup({
                  layout: ribbonCompositePipeline.getBindGroupLayout(0),
                  entries: [
                    { binding: 0, resource: { buffer: uniformBuffer } },
                    { binding: 1, resource: ribbonTarget.createView() },
                    { binding: 2, resource: ribbonSampler }
                  ]
                });
              }

              const particlePass = encoder.beginRenderPass({
                colorAttachments: [
                  {
                    view: ribbonTarget.createView(),
                    clearValue: { r: 0, g: 0, b: 0, a: 0 },
                    loadOp: 'clear',
                    storeOp: 'store'
                  }
                ]
              });
              particlePass.setPipeline(ribbonPipeline);
              particlePass.setBindGroup(0, ribbonBindGroup);
              particlePass.draw(6, ribbonInstanceCount);
              particlePass.end();
            }

            const currentTexture = context!.getCurrentTexture();
            const pass = encoder.beginRenderPass({
              colorAttachments: [
                {
                  view: currentTexture.createView(),
                  clearValue: { r: 0, g: 0, b: 0, a: 0 },
                  loadOp: 'clear',
                  storeOp: 'store'
                }
              ]
            });

            if (isParticleRibbon && ribbonCompositeBindGroup) {
              pass.setPipeline(ribbonCompositePipeline);
              pass.setBindGroup(0, ribbonCompositeBindGroup);
            } else {
              pass.setPipeline(pipeline);
              pass.setBindGroup(0, bindGroup);
            }
            pass.draw(3);
            pass.end();

            device.queue.submit([encoder.finish()]);
            if (!reducedMotion) animationFrame = requestAnimationFrame(renderFrame);
          } catch (err) {
            console.warn('Render frame error:', err);
            setWebGpuSupported(false);
          }
        }

        animationFrame = requestAnimationFrame(renderFrame);
      } catch (err) {
        console.warn('WebGPU initialization error:', err);
        setWebGpuSupported(false);
      }
    }

    initWebGpu();

    return () => {
      stopped = true;
      switchStateRef.current = null;
      cancelAnimationFrame(animationFrame);
      ribbonTarget?.destroy();
      device?.destroy();
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none bg-transparent ${className}`}
      aria-label="Newseed AI orb"
    >
      {/* WebGPU Native Canvas */}
      {webGpuSupported ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full block bg-transparent"
          aria-label="Liquid Glass Orb Particle Ribbon"
        />
      ) : (
        /* Fallback: Ultra-Polished Neural Glass Orb Faithful to Photo 1 & Velie Section Card */
        <div className="relative w-full h-full max-w-[270px] max-h-[270px] aspect-square rounded-full flex items-center justify-center bg-transparent">
          {/* Outer Multi-Layer Diffuse Glow (Soft Velie Cyan & Violet Atmospheric Haze) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/25 via-indigo-400/15 to-pink-400/20 blur-[28px] opacity-70 animate-pulse pointer-events-none" />
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-300/20 to-cyan-300/25 blur-[18px] opacity-45 animate-spin [animation-duration:16s] pointer-events-none" />

          {/* Glass Sphere Shell (Translucent Pearlescent Glass) */}
          <div className="relative w-full h-full rounded-full border border-white/80 shadow-[inset_0_4px_24px_rgba(255,255,255,0.85),0_12px_36px_rgba(0,85,255,0.10)] bg-gradient-to-b from-white/75 via-white/35 to-blue-50/20 backdrop-blur-md overflow-hidden flex items-center justify-center">
            {/* Inner Refractive Iridescent Ribbon Waves */}
            <div className="absolute w-[82%] h-[82%] rounded-full border border-cyan-300/40 animate-ping [animation-duration:4s] opacity-50 pointer-events-none" />
            <div className="absolute w-[68%] h-[68%] rounded-full bg-gradient-to-tr from-cyan-300/35 via-purple-300/30 to-pink-300/35 blur-md animate-pulse pointer-events-none" />
            
            {/* Luminous Specular Crescents */}
            <div className="absolute top-2 left-4 w-20 h-10 rounded-[50%] bg-white/70 blur-[3px] -rotate-45 pointer-events-none" />
            <div className="absolute bottom-3 right-4 w-14 h-7 rounded-[50%] bg-cyan-200/40 blur-[5px] pointer-events-none" />

            {/* Glowing Pure White Core */}
            <div className="w-14 h-14 rounded-full bg-white/95 shadow-[0_0_28px_rgba(56,189,248,0.65),0_0_12px_rgba(255,255,255,0.9)] animate-pulse pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}
