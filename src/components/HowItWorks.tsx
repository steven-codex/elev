import { Calendar, Link2, Zap, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenDemo: () => void;
}

export default function HowItWorks({ onOpenDemo }: HowItWorksProps) {
  const steps = [
    {
      step: '01',
      title: 'Create simple rules',
      description: 'Connect your Google, Outlook, or iCloud calendars. Set your working hours, daily meeting caps, and 15-minute buffers so you never get overwhelmed.',
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      tag: 'Setup in 2 mins'
    },
    {
      step: '02',
      title: 'Share your link or embed',
      description: 'Share your personalized elev link via email, LinkedIn, or text, or embed a booking widget right into your website or demo request page with one line of code.',
      icon: <Link2 className="w-6 h-6 text-blue-600" />,
      tag: 'Zero friction'
    },
    {
      step: '03',
      title: 'Get booked & automated',
      description: 'Guests pick an open slot that fits both schedules. Automated video links, calendar events, reminder texts, and CRM records update without touching a button.',
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      tag: 'Fully automated'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-normal text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Effortless scheduling in three simple steps
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600">
            Set up once and let automated scheduling reclaim hours of productive focus time every single week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center group-hover:scale-105 group-hover:border-blue-200 transition-all">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-normal text-slate-300 group-hover:text-blue-600 transition-colors">
                    {step.step}
                  </span>
                </div>

                <div className="inline-block text-[11px] font-normal text-blue-700 bg-blue-100/60 px-2.5 py-0.5 rounded-full mb-3">
                  {step.tag}
                </div>

                <h3 className="text-xl font-normal text-slate-900 mb-2.5">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {idx < 2 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 text-sm font-normal text-blue-600 hover:text-blue-700 underline underline-offset-4 cursor-pointer"
          >
            <span>See live video walkthrough and setup guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
