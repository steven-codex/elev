"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

export interface StatsBentoProps {
  onOpenAuth?: (mode: 'signup' | 'login') => void;
  onOpenDemo?: () => void;
  className?: string;
}

type TabKey = "all" | "sales" | "ops";

interface CategoryData {
  primary: {
    badge: string;
    value: string;
    sublabel: string;
    description: string;
    actionLabel: string;
  };
  growth: {
    badge: string;
    value: string;
    sublabel: string;
    bars: number[];
  };
  kpi: {
    value: string;
    label: string;
    sublabel: string;
  };
  rating: {
    score: string;
    source: string;
    volume: string;
  };
}

const STATS_DATA: Record<TabKey, CategoryData> = {
  all: {
    primary: {
      badge: "Time Reclaimed",
      value: "15.4 hrs",
      sublabel: "/ rep / month",
      description: "Dominating modern meeting infrastructure for venture-backed startups and hyper-growth enterprises.",
      actionLabel: "Reclaim your schedule",
    },
    growth: {
      badge: "Growth & Velocity",
      value: "+320%",
      sublabel: "Inbound pipeline velocity",
      bars: [22, 34, 45, 38, 62, 54, 78, 70, 92, 102, 115],
    },
    kpi: {
      value: "1.2s",
      label: "Lead Routing",
      sublabel: "Sub-second sync",
    },
    rating: {
      score: "4.9 / 5.0",
      source: "G2 Peer Reviews",
      volume: "100k+ global users",
    },
  },
  sales: {
    primary: {
      badge: "Pipeline Conversion",
      value: "64%",
      sublabel: "Meeting-to-deal rate",
      description: "Match inbound prospects to senior reps in under 2 seconds while buyer intent is at its peak.",
      actionLabel: "Accelerate pipeline",
    },
    growth: {
      badge: "Revenue Growth",
      value: "+240%",
      sublabel: "Closed-won acceleration",
      bars: [15, 25, 40, 35, 60, 50, 80, 75, 95, 105, 120],
    },
    kpi: {
      value: "0",
      label: "Email Ping-Pong",
      sublabel: "Instant self-book",
    },
    rating: {
      score: "4.95 / 5.0",
      source: "G2 Best Sales Tool",
      volume: "Top 1% rated 2026",
    },
  },
  ops: {
    primary: {
      badge: "Capacity Restored",
      value: "85%",
      sublabel: "Fewer no-shows",
      description: "Automated prep briefs, calendar governance, and instant meeting recaps eliminate administrative drag.",
      actionLabel: "Automate operations",
    },
    growth: {
      badge: "Org Efficiency",
      value: "+180%",
      sublabel: "Meeting throughput",
      bars: [28, 38, 48, 42, 65, 58, 82, 78, 88, 98, 110],
    },
    kpi: {
      value: "150+",
      label: "Integrations",
      sublabel: "Native two-way sync",
    },
    rating: {
      score: "5.0 / 5.0",
      source: "Capterra Verified",
      volume: "Enterprise satisfaction",
    },
  },
};

export const StatsBento: React.FC<StatsBentoProps> = ({
  onOpenAuth,
  onOpenDemo,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const current = STATS_DATA[activeTab];

  return (
    <section
      id="stats-bento"
      className={`w-full py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden ${className}`}
    >
      {/* Subtle organic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A0D14]">
                Measurable Impact
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0A0D14] tracking-tight leading-[1.08] text-balance">
              Proven at <span className="font-editorial italic font-normal text-[#0055FF]">enterprise scale</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed text-pretty">
              Real telemetry from over 100,000 teams orchestrating calendars, Velie AI copilots, notetakers, and payments.
            </p>
          </div>

          {/* Interactive Metric Filter Pill Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs self-start md:self-end">
            {(
              [
                { id: "all", label: "All Teams" },
                { id: "sales", label: "Sales & Pipeline" },
                { id: "ops", label: "Operations & CS" },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-[background-color,color,box-shadow] duration-200 cursor-pointer active:scale-[0.96] ${
                    isActive
                      ? "bg-[#0B1222] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-stone-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 6-COLUMN x 2-ROW GAPLESS BENTO GRID                       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 max-w-7xl mx-auto items-stretch">
          
          {/* ========================================================= */}
          {/* 1. PRIMARY STAT CARD (md:col-span-3 md:row-span-2)        */}
          {/* ========================================================= */}
          <div className="md:col-span-3 md:row-span-2 bg-[#0B1222] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group border border-slate-800/80 shadow-lg min-h-[380px] sm:min-h-[440px]">
            {/* Signature 45-degree diagonal hairline grid texture with radial gradient mask */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #94a3b8 0px, #94a3b8 1px, transparent 1px, transparent 10px)",
                maskImage:
                  "radial-gradient(ellipse 80% 50% at 100% 0%, #000 70%, transparent 110%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 50% at 100% 0%, #000 70%, transparent 110%)",
              }}
            />

            {/* Ambient Radial Blue Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-blue-200 uppercase tracking-widest mb-6 border border-white/10 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {current.primary.badge}
              </span>

              <div className="flex items-baseline gap-3">
                <h3 className="text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-white font-editorial font-normal tabular-nums">
                  {current.primary.value}
                </h3>
                <span className="text-xs sm:text-sm font-sans tabular-nums text-slate-400 font-medium">
                  {current.primary.sublabel}
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-auto">
              <p className="text-slate-300 text-sm max-w-sm leading-relaxed text-pretty">
                {current.primary.description}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onOpenAuth ? onOpenAuth('signup') : onOpenDemo?.()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0055FF] hover:bg-[#0047D6] text-white text-xs font-semibold shadow-xs hover:shadow-md active:scale-[0.96] transition-[background-color,box-shadow,transform] duration-150 cursor-pointer group/btn"
                >
                  <span>{current.primary.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-150" />
                </button>
                <span className="text-[11px] font-sans tabular-nums text-slate-400">
                  No credit card required
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. SECONDARY STAT A - GROWTH (md:col-span-3)              */}
          {/* ========================================================= */}
          <div className="md:col-span-3 bg-white rounded-3xl p-7 sm:p-8 border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group hover:border-blue-200 transition-[border-color,box-shadow] duration-200">
            {/* Background hairline pattern */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #0B1222 0px, #0B1222 1px, transparent 1px, transparent 8px)",
              }}
            />

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">
                  {current.growth.badge}
                </p>
              </div>

              <p className="text-4xl sm:text-5xl font-editorial font-normal text-[#0A0D14] tabular-nums tracking-tight">
                {current.growth.value}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {current.growth.sublabel}
              </p>
            </div>

            {/* Interactive Dynamic Equalizer Bars */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex gap-1.5 items-end h-14 px-3 py-2 bg-stone-50 rounded-2xl border border-[#E2E8F0]/60">
                {current.growth.bars.map((h, i) => {
                  const isHovered = hoveredBarIndex === i;
                  return (
                    <motion.div
                      key={i}
                      onMouseEnter={() => setHoveredBarIndex(i)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      initial={{ height: "20%" }}
                      animate={{ height: `${Math.min(h, 100)}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 24,
                        delay: i * 0.03,
                      }}
                      className={`w-2 sm:w-2.5 rounded-full cursor-pointer transition-[background-color,transform] duration-150 ${
                        isHovered
                          ? "bg-blue-600 scale-y-110 shadow-xs"
                          : i >= current.growth.bars.length - 3
                          ? "bg-[#0B1222]"
                          : "bg-stone-300 group-hover:bg-slate-700"
                      }`}
                      style={{ height: `${h}%` }}
                      title={`Week ${i + 1}: ${h}% capacity`}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] font-sans tabular-nums text-slate-400">
                Quarterly throughput
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. TERTIARY STAT B - KPI (md:col-span-1)                  */}
          {/* ========================================================= */}
          <div className="md:col-span-1 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs flex flex-col justify-center text-center items-center group hover:border-stone-300 transition-[border-color,box-shadow] duration-200 relative overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-editorial font-normal text-[#0A0D14] tabular-nums tracking-tight">
              {current.kpi.value}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans mt-0.5">
              {current.kpi.label}
            </p>
            <span className="text-[10px] text-emerald-600 font-medium mt-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              {current.kpi.sublabel}
            </span>
          </div>

          {/* ========================================================= */}
          {/* 4. TERTIARY STAT C - RATING & TRUST (md:col-span-2)       */}
          {/* ========================================================= */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-2xs flex items-center gap-4 group hover:border-stone-300 transition-[border-color,box-shadow] duration-200 relative overflow-hidden">
            {/* Concentric Golden Star Badge */}
            <div className="w-12 h-12 text-2xl rounded-full bg-amber-50 text-amber-500 border border-amber-200/70 flex items-center justify-center shrink-0 shadow-2xs font-semibold group-hover:scale-105 transition-transform duration-200">
              <span className="leading-none select-none">★</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-base sm:text-lg font-bold text-[#0A0D14] leading-none tabular-nums font-sans">
                  {current.rating.score}
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-600 mt-1 truncate">
                {current.rating.source}
              </p>
              <p className="text-[10px] font-sans tabular-nums text-slate-400 mt-0.5">
                {current.rating.volume}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsBento;

// --- Demo Export matching user snippet ---
export function StatsBentoDemo() {
  return <StatsBento />;
}
