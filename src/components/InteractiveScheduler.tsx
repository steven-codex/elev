import { useState, FormEvent } from 'react';
import { BorderBeam } from 'border-beam';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Globe,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveSchedulerProps {
  compact?: boolean;
}

export default function InteractiveScheduler({ compact = false }: InteractiveSchedulerProps) {
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [selectedTime, setSelectedTime] = useState<string | null>('1:30pm');
  const [step, setStep] = useState<'pick-time' | 'form' | 'confirmed'>('pick-time');

  // Form fields
  const [name, setName] = useState('Alex Taylor');
  const [email, setEmail] = useState('alex@acme-corp.com');
  const [goal, setGoal] = useState('Shorten inbound sales cycle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available days in September 2026 (working days)
  const availableDays = [14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28, 29, 30];

  const timeSlots = [
    '9:00am',
    '9:30am',
    '11:00am',
    '1:30pm',
    '2:30pm',
    '4:00pm'
  ];

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleProceedToForm = () => {
    if (!selectedTime) return;
    setStep('form');
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmed');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback if confetti isn't supported in container
      }
    }, 450);
  };

  const handleReset = () => {
    setStep('pick-time');
    setSelectedTime('1:30pm');
  };

  return (
    <BorderBeam
      size="md"
      colorVariant="ocean"
      strength={0.65}
      theme="light"
      borderRadius={24}
      className="w-full"
    >
      <div
        id="hero-scheduler-card"
        className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-200/90 overflow-hidden text-slate-800 transition-all"
      >
      {/* Top Header Strip */}
      <div className="bg-slate-50/90 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" title="Online now" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">Sarah Jenkins</h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                <ShieldCheck className="w-3 h-3" />
                Verified Host
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Principal Solutions Consultant at elev</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span>Pacific Time (US & Canada)</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6">
        {step === 'pick-time' && (
          <div>
            {/* Event Description */}
            <div className="mb-6 pb-5 border-b border-slate-100">
              <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">
                30 Min Discovery & Platform Tour
              </h4>
              <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>30 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-emerald-600" />
                  <span>Google Meet web conferencing</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                Learn how high-growth teams automate lead routing, shorten sales cycles, and eliminate email back-and-forth with elev.
              </p>
            </div>

            {/* Split Calendar & Time Picker */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Calendar Column */}
              <div className="md:col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-sm text-slate-800">September 2026</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled
                      aria-label="Previous month"
                      className="p-1.5 rounded-lg text-slate-300 cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Calendar Days Matrix */}
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                  {/* Empty padding days for month offset */}
                  <span className="p-2 text-slate-300">30</span>
                  <span className="p-2 text-slate-300">31</span>
                  {[1, 2, 3, 4, 5].map((d) => (
                    <span key={d} className="p-2 text-slate-300">{d}</span>
                  ))}

                  {[6, 7, 8, 9, 10, 11, 12, 13].map((d) => (
                    <span key={d} className="p-2 text-slate-300">{d}</span>
                  ))}

                  {/* Active 3rd and 4th weeks */}
                  {[14, 15, 16, 17, 18, 19, 20].map((d) => {
                    const isAvailable = availableDays.includes(d);
                    const isSelected = selectedDay === d;

                    if (!isAvailable) {
                      return <span key={d} className="p-2 text-slate-300">{d}</span>;
                    }

                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleDayClick(d)}
                        className={`p-2 rounded-xl font-bold transition-all relative cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-blue-50/70 text-blue-900 hover:bg-blue-100 hover:text-blue-950 font-semibold'
                        }`}
                      >
                        {d}
                        <span className={`block mx-auto mt-0.5 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                      </button>
                    );
                  })}

                  {[21, 22, 23, 24, 25, 26, 27].map((d) => {
                    const isAvailable = availableDays.includes(d);
                    const isSelected = selectedDay === d;

                    if (!isAvailable) {
                      return <span key={d} className="p-2 text-slate-300">{d}</span>;
                    }

                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleDayClick(d)}
                        className={`p-2 rounded-xl font-bold transition-all relative cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-blue-50/70 text-blue-900 hover:bg-blue-100 hover:text-blue-950 font-semibold'
                        }`}
                      >
                        {d}
                        <span className={`block mx-auto mt-0.5 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                      </button>
                    );
                  })}

                  {[28, 29, 30].map((d) => {
                    const isAvailable = availableDays.includes(d);
                    const isSelected = selectedDay === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleDayClick(d)}
                        className={`p-2 rounded-xl font-bold transition-all relative cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-blue-50/70 text-blue-900 hover:bg-blue-100 font-semibold'
                        }`}
                      >
                        {d}
                        <span className={`block mx-auto mt-0.5 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Column */}
              <div className="md:col-span-5 md:border-l md:border-slate-100 md:pl-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-3 flex items-center justify-between">
                    <span>Thursday, Sep {selectedDay}</span>
                    <span className="text-[11px] text-blue-600 font-semibold">6 available</span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {timeSlots.map((time) => {
                      const isChosen = selectedTime === time;

                      return (
                        <div key={time} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelectTime(time)}
                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              isChosen
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-white text-blue-700 border-blue-200/80 hover:border-blue-500 hover:bg-blue-50/50'
                            }`}
                          >
                            {time}
                          </button>

                          {isChosen && (
                            <button
                              type="button"
                              onClick={handleProceedToForm}
                              className="py-2.5 px-3 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer animate-in fade-in zoom-in-95 duration-150"
                            >
                              <span>Next</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Powered by elev Automation</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Real-time sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Attendee Details Form */}
        {step === 'form' && (
          <form onSubmit={handleSubmitBooking} className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Step 2 of 2</span>
                <h4 className="text-lg font-bold text-slate-900">Enter your details</h4>
              </div>
              <button
                type="button"
                onClick={() => setStep('pick-time')}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
                Change time
              </button>
            </div>

            <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
              <CalendarIcon className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>30 Min Discovery</strong> on <strong>Thursday, September {selectedDay}, 2026</strong> at <strong>{selectedTime}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                What is your primary scheduling goal?
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700"
              >
                <option>Shorten inbound sales cycle & speed to lead</option>
                <option>Automate recruiting panel interviews</option>
                <option>Customer onboarding & VIP scheduling</option>
                <option>Replace manual email back-and-forth</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <p className="text-[11px] text-slate-400">
                By scheduling, you agree to elev Terms & Privacy Policy.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Scheduling...</span>
                ) : (
                  <>
                    <span>Schedule Event</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmed State */}
        {step === 'confirmed' && (
          <div className="py-4 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h4 className="text-xl font-extrabold text-slate-900">You are scheduled!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              A calendar invitation with Google Meet details has been sent to <strong>{email}</strong>.
            </p>

            {/* Meeting Summary Box */}
            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left max-w-md mx-auto space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900">30 Min Discovery & Platform Tour</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Confirmed
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Thursday, September {selectedDay}, 2026 · {selectedTime} (PT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
                    meet.google.com/elv-zpk-xrq
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Automated Workflows Trigger Indicator */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Automated Workflows Triggered:
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Salesforce Lead #8491 created and assigned</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Calendar invite + SMS reminder queued (24h before)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Test another booking flow</span>
            </button>
          </div>
        )}
      </div>
    </div>
    </BorderBeam>
  );
}
