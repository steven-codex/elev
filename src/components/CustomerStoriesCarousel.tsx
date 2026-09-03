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
    <section className="py-24 bg-[#071A31] text-white relative overflow-hidden">
      {/* Subtle organic background mesh */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6BB1FF_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6BB1FF] mb-3 block">
            Customer stories
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-[3.5rem] font-normal tracking-tight text-white leading-tight">
            Real customers. Real results.
          </h2>
        </div>

        {/* Big Highlighted Story Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 text-slate-900 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Metric: {current.impact}</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#071A31] font-normal leading-tight">
                {current.metric}
              </h3>

              <p className="font-editorial text-lg sm:text-xl text-slate-700 italic leading-relaxed">
                {current.quote}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#071A31] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {current.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{current.author}</h4>
                  <p className="text-xs text-slate-500">{current.role}, <span className="font-semibold text-slate-700">{current.company}</span></p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-4">
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#071A31] block">5.0 / 5.0</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">User Satisfaction</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 font-medium">
                Category: <strong className="text-slate-900">{current.category}</strong>
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
                    currentIndex === i ? 'w-8 bg-[#071A31]' : 'w-2 bg-slate-200 hover:bg-slate-300'
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
