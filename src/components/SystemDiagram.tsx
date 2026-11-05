import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, BookOpen, Bot, Plus, RefreshCw, Shield, ShieldCheck, Workflow, type LucideIcon } from 'lucide-react';
import { LoopReplayButton, Reveal, StaggerGroup, useLoopPlayback } from '../motion';
import { useLang } from '../i18n';
import { SYSTEM } from '../data/landingData';

const CORE_ICONS: LucideIcon[] = [Bot, Workflow, BookOpen, Shield, Activity];
const TEAM_DOTS = ['bg-[#0055FF]', 'bg-[#60A5FA]', 'bg-[#93C5FD]'];
const TEAM_STEP_MS = 2800;

// Geometry: rows have fixed heights (not widths) so connectors sit at exact row centres at any viewport.
// Tools panel padding is p-5 (20px) and the grid gap is lg:gap-x-5 (20px), so a 40px line reaches the core panel.
export default function SystemDiagram() {
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const playback = useLoopPlayback(rootRef);
  const [activeIndex, setActiveIndex] = useState(0);
  const teamCount = SYSTEM.panel3.nodes.length;

  // One cycle = one pass through every team node. Stops after LOOP_CYCLES; "Play again" restarts it.
  useEffect(() => {
    if (!playback.enabled) return;
    let ticks = 0;
    const timer = setInterval(() => {
      ticks += 1;
      setActiveIndex((prev) => (prev + 1) % teamCount);
      if (ticks % teamCount === 0 && !playback.endCycle()) clearInterval(timer);
    }, TEAM_STEP_MS);
    return () => clearInterval(timer);
  }, [playback.enabled, playback.endCycle, teamCount]);

  const replay = () => {
    setActiveIndex(0);
    playback.replay();
  };

  return (
    <section id="system" className="py-16 sm:py-24 lg:py-24 bg-white border-t border-[#E2E8F0] relative overflow-hidden text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <Reveal y={24}>
            <h2 className="text-h2 lg:text-h2-lg text-ink font-medium text-balance">
              {t(SYSTEM.heading.lead)}{' '}
              <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">
                {t(SYSTEM.heading.accent)}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} y={16}>
            <p className="mt-4 text-lead text-ink-secondary max-w-[62ch] text-pretty mx-auto">
              {t(SYSTEM.sub)}
            </p>
          </Reveal>
        </div>

        <div ref={rootRef} data-motion-paused={!playback.inView || undefined}>
          <StaggerGroup
            stagger={0.14}
            y={28}
            blur={6}
            startScale={0.965}
            className="grid grid-cols-1 gap-8 lg:gap-y-0 lg:gap-x-5 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1.12fr)_6rem_minmax(0,1.16fr)] items-stretch xl:auto-rows-[minmax(31.25rem,auto)]"
          >
            <ToolsPanel />
            <CorePanel />
            <LinkColumn />
            <TeamPanel
              activeIndex={activeIndex}
              finished={playback.finished}
              onReplay={replay}
            />
          </StaggerGroup>
        </div>

        <p className="mt-12 text-center text-caption text-ink-tertiary">{t(SYSTEM.example)}</p>
      </div>
    </section>
  );
}

const NODE_BOX = 'flex h-full items-center rounded-2xl bg-white border border-slate-200/80 shadow-2xs px-3';

function ToolsPanel() {
  const { t } = useLang();
  const { panel1 } = SYSTEM;

  return (
    <div className="relative flex flex-col rounded-3xl bg-[#F8FAFC] p-5 ring-1 ring-slate-900/5 shadow-[0_16px_40px_rgba(0,35,102,0.05),0_2px_8px_rgba(0,0,0,0.02)]">
      <p className="text-label font-medium text-ink-tertiary">{t(panel1.title)}</p>

      <div className="mt-5 flex flex-1 flex-col xl:grid xl:grid-cols-[minmax(0,1fr)_9rem] xl:items-center">
        {/* Tool rows: 52px each, pill centred, stub to the trunk on the right edge. */}
        <div className="relative pr-5">
          <span aria-hidden="true" className="system-flow-y absolute right-0 top-[26px] bottom-0 w-px xl:bottom-[26px]" />
          {panel1.tools.map((tool) => (
            <div key={tool.name} className="relative flex h-[3.25rem] items-center">
              <div className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full bg-white border border-slate-200/80 shadow-2xs px-3.5">
                <img src={tool.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain shrink-0" />
                <span className="text-body-sm text-ink">{tool.name}</span>
              </div>
              <span aria-hidden="true" className="system-flow-x absolute -right-5 top-1/2 h-px w-5" />
            </div>
          ))}
          <div className="relative flex h-[3.25rem] items-center">
            <div className="flex h-full min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-dashed border-slate-300 px-3.5 text-ink-tertiary">
              <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="text-body-sm leading-tight">{t(panel1.more)}</span>
            </div>
            <span aria-hidden="true" className="system-flow-x absolute -right-5 top-1/2 h-px w-5" />
          </div>
        </div>

        {/* Node stack. Below xl the trunk keeps running down the right edge; at xl the stack sits beside the pills. */}
        <div className="relative flex flex-col gap-2.5 pt-6 pr-5 xl:gap-0 xl:p-0 xl:pl-5">
          <span aria-hidden="true" className="system-flow-y absolute right-0 top-0 bottom-9 w-px xl:hidden" />

          <div className="relative h-14">
            <div className={NODE_BOX}>
              <span className="text-body-sm font-medium text-ink">{t(panel1.node1)}</span>
            </div>
            <span aria-hidden="true" className="system-flow-x absolute -right-5 top-1/2 h-px w-5 xl:hidden" />
          </div>
          <span aria-hidden="true" className="system-flow-y mx-auto hidden h-5 w-px xl:block" />

          <div className="relative h-[4.5rem]">
            <div className="flex h-full flex-col justify-center rounded-2xl bg-gradient-to-r from-[#2F6BEA] to-[#0055FF] px-3 text-white shadow-[0_8px_22px_rgba(0,85,255,0.28)]">
              <span className="text-label font-medium text-white/90">{t(panel1.node2.label)}</span>
              <span className="text-body-sm font-medium leading-tight text-white">{t(panel1.node2.title)}</span>
            </div>
            <span aria-hidden="true" className="system-flow-x absolute -right-5 top-1/2 h-px w-5 xl:hidden" />
            <span aria-hidden="true" className="system-flow-x absolute -left-5 top-1/2 hidden h-px w-5 xl:block" />
            <span aria-hidden="true" className="system-flow-x absolute left-[calc(100%+1.25rem)] top-1/2 hidden h-px w-[calc(1.25rem+1.25rem)] lg:block xl:hidden" />
            <span aria-hidden="true" className="system-flow-x absolute left-full top-1/2 hidden h-px w-[calc(1.25rem+1.25rem)] xl:block" />
          </div>
          <span aria-hidden="true" className="system-flow-y mx-auto hidden h-5 w-px xl:block" />

          <div className="relative h-14">
            <div className={NODE_BOX}>
              <span className="text-body-sm font-medium text-ink">{t(panel1.node3)}</span>
            </div>
            <span aria-hidden="true" className="system-flow-x absolute -right-5 top-1/2 h-px w-5 xl:hidden" />
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="system-flow-y absolute left-1/2 top-full h-8 w-px lg:hidden" />
    </div>
  );
}

function CorePanel() {
  const { t } = useLang();
  const { core } = SYSTEM;

  return (
    <div className="relative flex flex-col justify-center rounded-3xl bg-[#1E60F2] bg-[url('/hero-fluid-wave-bg.png')] bg-cover bg-center p-7 shadow-[0_24px_60px_rgba(0,35,102,0.18)] ring-1 ring-white/10">
      <div className="flex flex-col rounded-xl bg-white shadow-[0_16px_40px_rgba(0,20,60,0.18),0_2px_6px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <img src="/elev-infinity-logo.png" alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            <span className="text-body-sm font-medium text-ink">{t(core.brand)}</span>
          </div>
          <span className="text-label font-medium text-ink-tertiary">{t(core.title)}</span>
        </div>

        <ul className="flex flex-col divide-y divide-slate-100 px-4">
          {core.rows.map((row, index) => {
            const Icon = CORE_ICONS[index];
            return (
              <li key={row.title.en} className="flex items-start gap-3 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-accent">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-ink">{t(row.title)}</p>
                  <p className="text-caption text-ink-tertiary text-pretty">{t(row.sub)}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="border-t border-slate-100 px-4 py-3.5 text-caption text-ink-tertiary text-pretty">{t(core.caption)}</p>
      </div>
    </div>
  );
}

function LinkColumn() {
  const { t } = useLang();

  return (
    <div className="relative flex flex-row lg:flex-col items-start lg:items-stretch justify-center gap-3 lg:gap-0">
      <span aria-hidden="true" className="system-flow-y absolute left-1/2 -top-8 h-[calc(2rem+22px)] w-px lg:hidden" />

      <LinkItem Icon={ShieldCheck} caption={t(SYSTEM.link.top)} />

      <div aria-hidden="true" className="relative mt-[22px] h-px min-w-8 flex-1 lg:mt-0 lg:my-6 lg:-mx-5 lg:flex-none">
        <span className="system-flow-x block h-px w-full" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 border-y-[3.5px] border-y-transparent border-r-[6px] border-r-[#CBD5E1]" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[3.5px] border-y-transparent border-l-[6px] border-l-[#CBD5E1]" />
      </div>

      <LinkItem Icon={RefreshCw} caption={t(SYSTEM.link.bottom)} />

      <span aria-hidden="true" className="system-flow-y absolute left-1/2 top-[22px] -bottom-8 w-px lg:hidden" />
    </div>
  );
}

function LinkItem({ Icon, caption }: { Icon: LucideIcon; caption: string }) {
  return (
    <div className="flex w-28 sm:w-36 lg:w-full shrink-0 flex-col items-center gap-2 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-accent ring-1 ring-slate-900/5 shadow-[0_6px_18px_rgba(0,35,102,0.08)]">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </span>
      <p className="text-caption text-ink-tertiary text-pretty">{caption}</p>
    </div>
  );
}

function TeamPanel({
  activeIndex,
  finished,
  onReplay,
}: {
  activeIndex: number;
  finished: boolean;
  onReplay: () => void;
}) {
  const { t } = useLang();
  const { panel3 } = SYSTEM;
  const active = panel3.nodes[activeIndex];

  return (
    <div className="relative flex flex-col rounded-3xl bg-[#F8FAFC] p-5 ring-1 ring-slate-900/5 shadow-[0_16px_40px_rgba(0,35,102,0.05),0_2px_8px_rgba(0,0,0,0.02)]">
      <p className="text-label font-medium text-ink-tertiary">{t(panel3.title)}</p>

      <div className="flex flex-1 flex-col pt-5 pb-6 xl:pt-8">
        <div className="relative mx-auto flex h-16 w-full items-center rounded-2xl bg-white border border-slate-200/80 shadow-2xs px-4 xl:w-44 xl:justify-center">
          <span className="text-body-sm font-medium text-ink">{t(panel3.owner)}</span>
        </div>
        <span aria-hidden="true" className="system-flow-y mx-auto hidden h-8 w-px xl:block" />

        <div className="ml-5 flex flex-col xl:ml-0 xl:grid xl:grid-cols-3">
          {panel3.nodes.map((node, index) => {
            const isActive = index === activeIndex;
            const last = index === panel3.nodes.length - 1;
            return (
              <div key={node.name.en} className="relative py-1.5 pl-6 xl:px-1 xl:pb-0 xl:pl-1 xl:pt-5">
                {/* Vertical list rail */}
                <span aria-hidden="true" className={`system-flow-y absolute left-0 top-0 w-px xl:hidden ${last ? 'h-1/2' : 'h-full'}`} />
                <span aria-hidden="true" className="system-flow-x absolute left-0 top-1/2 h-px w-6 xl:hidden" />
                {/* Tree: drop to the node plus a bar segment, joined edge to edge between columns */}
                <span aria-hidden="true" className="system-flow-y absolute left-1/2 top-0 hidden h-5 w-px xl:block" />
                <span
                  aria-hidden="true"
                  className={`system-flow-x absolute top-0 hidden h-px xl:block ${index === 0 ? 'left-1/2 right-0' : last ? 'left-0 right-1/2' : 'left-0 right-0'}`}
                />
                <div className="relative flex min-h-16 items-center gap-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs px-3.5 xl:flex-col xl:justify-center xl:gap-1.5 xl:px-1.5 xl:pb-4 xl:pt-3 xl:text-center">
                  {isActive && (
                    <motion.span
                      layoutId="systemActiveNode"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className="absolute inset-0 rounded-2xl ring-2 ring-accent pointer-events-none"
                    />
                  )}
                  <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${TEAM_DOTS[index]}`} />
                  <div className="min-w-0 flex-1 xl:flex-none">
                    <p className="text-body-sm font-medium text-ink">{t(node.name)}</p>
                    <p className="text-caption text-ink-tertiary">{t(node.sub)}</p>
                  </div>
                  {isActive && (
                    <span className="absolute -top-2.5 right-3 rounded-full border border-blue-200/60 bg-blue-50 px-2 py-0.5 text-label font-medium text-accent shadow-2xs xl:-bottom-2.5 xl:top-auto xl:left-1/2 xl:right-auto xl:-translate-x-1/2">
                      {t(panel3.active)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto flex min-h-8 items-end justify-between gap-3 border-t border-slate-200/60 pt-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="text-body-sm text-ink-tertiary text-pretty"
          >
            {t(active.caption)}
          </motion.p>
        </AnimatePresence>
        {finished && <LoopReplayButton onClick={onReplay} className="shrink-0" />}
      </div>
    </div>
  );
}
