import { Check } from 'lucide-react';

export default function OrbitalMotionStage() {
  const orbitingCards = [
    {
      id: 'velie',
      tagText: 'VELIE AI',
      tagColor: '#DBEE9F',
      icon3d: '/icon-velie-3d.png',
      title: 'Discovery',
      subtitle: 'Scheduled',
      detail: 'Free-slot coordination email approved by client',
      ringRadius: 330, // Layer 3 (Product Card Layer 1)
      angle: 45, // Top-Right Quadrant
    },
    {
      id: 'notetaker',
      tagText: 'NOTETAKER',
      tagColor: '#B89FFA',
      icon3d: '/icon-notetaker-3d.png',
      title: 'Meeting',
      subtitle: 'Summarized',
      detail: '3 action items extracted and dispatched to Slack',
      ringRadius: 420, // Layer 4 (Product Card Layer 2)
      angle: 135, // Bottom-Right Quadrant
    },
    {
      id: 'scheduling',
      tagText: 'SCHEDULING',
      tagColor: '#6BB1FF',
      icon3d: '/icon-scheduling-3d.png',
      title: 'Interview',
      subtitle: 'Booked',
      detail: 'Round-robin assigned to Lead Engineer in 4s',
      ringRadius: 330, // Layer 3 (Product Card Layer 1)
      angle: 225, // Bottom-Left Quadrant
    },
    {
      id: 'payments',
      tagText: 'PAYMENTS',
      tagColor: '#5DDFD7',
      icon3d: '/icon-payments-3d.png',
      title: 'Payment',
      subtitle: 'Received',
      detail: '$150 upfront consultation fee settled via Stripe',
      ringRadius: 420, // Layer 4 (Product Card Layer 2)
      angle: 315, // Top-Left Quadrant
    }
  ];

  return (
    <div className="orbital-root orbital-scene group-orbit-pause relative w-full max-w-[860px] aspect-square mx-auto flex items-center justify-center select-none overflow-hidden">
      
      {/* Spatial Dot Grid Background */}
      <div
        className="grid-spatial absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(203, 213, 225, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(203, 213, 225, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.4) 60%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.4) 60%, transparent 80%)'
        }}
      />

      {/* Soft Center Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-400/10 via-indigo-300/10 to-transparent blur-3xl pointer-events-none" />

      {/* ===================================================================== */}
      {/* ORBIT SYSTEM (860x860 CANVAS, PERFECT ASPECT-SQUARE MATCHING SVG)    */}
      {/* ===================================================================== */}
      <div className="orbit-system relative w-full h-full aspect-square flex items-center justify-center pointer-events-none">
        
        {/* SVG Orbit Lines & Centered Accent Arcs */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 860 860"
        >
          <defs>
            {/* Coral Arc Gradient */}
            <linearGradient id="coralArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.15" />
            </linearGradient>

            {/* Purple Arc Gradient */}
            <linearGradient id="purpleArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#C084FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Layer 1: Orbit Ring (Inner - r=160px) */}
          <circle
            cx="430"
            cy="430"
            r="160"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />

          {/* Layer 2: Orbit Ring (Middle Inner - r=240px) */}
          <circle
            cx="430"
            cy="430"
            r="240"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />

          {/* Layer 3: Orbit Ring (Discovery Card Layer - r=330px) */}
          <circle
            cx="430"
            cy="430"
            r="330"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />

          {/* Layer 4: Orbit Ring (Outer Product Layer - r=420px) */}
          <circle
            cx="430"
            cy="430"
            r="420"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />

          {/* Coral Accent Arc on Layer 2 (r=240px, C ≈ 1507.96px) */}
          <g className="animate-arc-coral" style={{ transformOrigin: '430px 430px' }}>
            <circle
              cx="430"
              cy="430"
              r="240"
              fill="none"
              stroke="url(#coralArcGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="280 1227"
              strokeDashoffset="30"
            />
          </g>

          {/* Purple Accent Arc on Layer 4 (r=420px, C ≈ 2638.94px) */}
          <g className="animate-arc-purple" style={{ transformOrigin: '430px 430px' }}>
            <circle
              cx="430"
              cy="430"
              r="420"
              fill="none"
              stroke="url(#purpleArcGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="380 2258"
              strokeDashoffset="100"
            />
          </g>
        </svg>

        {/* =================================================================== */}
        {/* ORBIT ROTATION WRAPPER: Continuous Clockwise Perpetual Motion       */}
        {/* =================================================================== */}
        <div className="orbit-rotation animate-orbital-cw absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* ── 1. SATELLITE PRODUCT CARDS CENTERED ON ORBIT LINES ── */}
          {orbitingCards.map((card) => (
            <div
              key={card.id}
              className="satellite-node-wrapper absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                transform: `translate(-50%, -50%) rotate(${card.angle}deg) translateX(${card.ringRadius}px) rotate(-${card.angle}deg)`
              }}
            >
              {/* Counter-rotation keeps card content 100% upright */}
              <div className="satellite-inverse animate-orbital-ccw">
                <div
                  className="satellite-card w-[175px] sm:w-[190px] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-[20px] p-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_18px_40px_rgba(0,85,255,0.14)] hover:border-[#0055FF]/40 transition-all duration-200 ease-out text-left flex flex-col justify-between group/card cursor-pointer active:scale-[0.97]"
                  title={`${card.title} ${card.subtitle}`}
                >
                  <div>
                    {/* Top Header: 3D Glass Icon & Category Tag Label */}
                    <div className="flex items-center justify-between mb-2">
                      <img
                        src={card.icon3d}
                        alt={card.title}
                        className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain drop-shadow-xs group-hover/card:scale-110 transition-transform duration-200 shrink-0 pointer-events-none"
                      />
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-full border border-slate-200/70">
                        {card.tagText}
                      </span>
                    </div>

                    {/* Main Title & Subtitle */}
                    <div className="space-y-0 mb-1">
                      <span className="text-xs sm:text-sm font-bold text-[#0A0D14] block leading-tight">
                        {card.title}
                      </span>
                      <span className="font-editorial italic text-base sm:text-lg text-[#0A0D14] block leading-tight">
                        {card.subtitle}
                      </span>
                    </div>

                    {/* Detail Text */}
                    <p className="text-[10px] text-slate-500 leading-snug font-normal line-clamp-1">
                      {card.detail}
                    </p>
                  </div>

                  {/* Footer Automation Tag */}
                  <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[9px] font-bold text-emerald-700">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                    <span>Automated by elev</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* ===================================================================== */}
      {/* CENTER LOGO CARD (STABLE & STATIC ANCHOR, NO ZOOM EFFECT)             */}
      {/* ===================================================================== */}
      <div className="center-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] bg-white border border-slate-200/95 shadow-[0_18px_44px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-3.5 pointer-events-auto select-none">
        <img
          src="/elev-infinity-logo.png"
          alt="elev icon"
          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xs"
          loading="eager"
          draggable={false}
        />
      </div>

    </div>
  );
}
