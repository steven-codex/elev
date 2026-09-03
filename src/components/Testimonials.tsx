import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/landingData';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by revenue, recruiting, and operations leaders
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600">
            See how modern teams replace scheduling bottlenecks with high-velocity pipeline and seamless attendee experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                {/* Metric callout */}
                <div className="mb-6 pb-6 border-b border-slate-200/80 flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-black text-blue-600 tracking-tight">
                      {t.metric}
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">
                      {t.metricLabel}
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <Quote className="w-6 h-6 text-blue-300 mb-3 opacity-60" />

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
