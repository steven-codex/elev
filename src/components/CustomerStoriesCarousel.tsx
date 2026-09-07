import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, CheckCircle2 } from 'lucide-react';

export default function CustomerStoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      metric: '75 hours saved monthly',
      quote: '“elev helps us protect our team’s time and make every single student and parent support interaction count.”',
      author: 'Marques Stewart',
      role: 'Managing Director of Technology',
      company: 'Achievement First',
      category: 'Education & Tech',
      impact: '120 Team Members Active'
    },
    {
      metric: '80% reduction in booking emails',
      quote: '“We care deeply about the experience our clients have with us — and elev helps us start it off right from the first touchpoint.”',
      author: 'Akira Bradley',
      role: 'Co-Founder',
      company: 'Barking with the Bradley’s',
      category: 'Client Services',
      impact: 'Zero Scheduling Conflicts'
    },
    {
      metric: '3 to 5 hours saved per week',
      quote: '“Notetaker organizes the chaos of dialogue into clarity. I never have to scramble to remember what was decided on a donor call.”',
      author: 'Lizzie Lewis',
      role: 'Founder',
      company: 'Kitty of Angels',
      category: 'Nonprofit & Operations',
      impact: 'Instant Post-Call Recaps'
    },
    {
      metric: '$1,200 annual savings',
      quote: '“I use elev every single day. Without it, I honestly couldn’t run my agency and serve high-touch clients efficiently.”',
      author: 'Pua Pakele',
      role: 'Founder & Creative Lead',
      company: 'RBL Media',
      category: 'Media & Marketing',
      impact: 'Consolidated 3 Tool Subscriptions'
    },
    {
      metric: '100% attendance rate',
      quote: '“Adding an upfront booking fee didn’t just reduce no-shows — it completely elevated the professional tone of my initial consultations.”',
      author: 'Elizabeth Saunders',
      role: 'Time Management Coach & Founder',
      company: 'Real Life E',
      category: 'Executive Coaching',
      impact: 'Upfront Stripe Deposits'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const current = stories[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A0D14]">
              Customer Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-tight tracking-tight text-[#0A0D14] text-balance">
            Real customers. <span className="font-editorial italic font-normal text-[#0055FF]">Real results.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-xl mx-auto text-pretty">
            Discover how modern teams use elev to eliminate scheduling friction and protect productive time.
          </p>
        </div>

        {/* Big Highlighted Story Card */}
        <div className="max-w-4xl mx-auto bg-[#F8FAFC] rounded-2xl p-8 sm:p-12 text-slate-900 border border-[#E2E8F0] shadow-xs relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0055FF]" />
                <span className="tabular-nums">Verified Metric: {current.impact}</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#0A0D14] font-normal leading-tight tabular-nums">
                {current.metric}
              </h3>

              <p className="font-editorial text-lg sm:text-xl text-slate-700 italic leading-relaxed">
                {current.quote}
              </p>

              <div className="pt-2 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0055FF] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  {current.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{current.author}</h4>
                  <p className="text-xs text-slate-500">{current.role}, <span className="font-semibold text-slate-700">{current.company}</span></p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-xl p-6 sm:p-7 border border-[#E2E8F0] text-center space-y-4 relative overflow-hidden shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 text-amber-500 border border-amber-200/80 flex items-center justify-center shadow-2xs font-semibold text-2xl">
                <span className="leading-none select-none">★</span>
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-editorial font-normal text-[#0A0D14] block tabular-nums tracking-tight">
                  5.0 / 5.0
                </span>
                <span className="text-[11px] text-slate-500 uppercase tracking-widest font-mono font-bold mt-1 block">
                  User Satisfaction
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-600 font-medium flex items-center justify-center gap-1.5">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200/60 shadow-2xs">
                  {current.category}
                </span>
              </div>
            </div>

          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-8 bg-[#0055FF]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
