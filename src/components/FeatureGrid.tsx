import { Sliders, Shuffle, Sparkles, CreditCard, Compass, Shield, ArrowRight } from 'lucide-react';
import { CORE_FEATURES } from '../data/landingData';

interface FeatureGridProps {
  onOpenDemo: () => void;
}

export default function FeatureGrid({ onOpenDemo }: FeatureGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sliders': return <Sliders className="w-5 h-5 text-blue-600" />;
      case 'Shuffle': return <Shuffle className="w-5 h-5 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-blue-600" />;
      case 'Shield': return <Shield className="w-5 h-5 text-blue-600" />;
      default: return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-normal text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Designed for the rhythm of modern work
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600">
            Every control, rule, and workflow you need to maintain control over your schedule while delivering a flawless booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {getIcon(feature.icon)}
                  </div>
                  {feature.badge && (
                    <span className="text-[11px] font-normal uppercase tracking-wider bg-blue-100/70 text-blue-700 px-2 py-0.5 rounded-full">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-normal text-slate-400 uppercase tracking-wider mb-1">
                  {feature.tag}
                </div>

                <h3 className="text-lg font-normal text-slate-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-normal text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                  {feature.visualHighlight}
                </span>
                <button
                  onClick={onOpenDemo}
                  className="text-xs font-normal text-blue-600 group-hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
