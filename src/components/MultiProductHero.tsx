import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BorderBeam } from 'border-beam';
import {
  Calendar,
  Sparkles,
  FileText,
  CreditCard,
  ArrowRight,
  Check,
  Clock,
  Video,
  User,
  Send,
  Play,
  Pause,
  CheckSquare,
  DollarSign,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MultiProductHeroProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  onOpenDemo: () => void;
}

export default function MultiProductHero({ onOpenAuth, onOpenDemo }: MultiProductHeroProps) {
  const [activeTab, setActiveTab] = useState<'scheduling' | 'callie' | 'notetaker' | 'payments'>('scheduling');

  // Interactive state for Callie Simulator
  const [callieState, setCallieState] = useState<'idle' | 'analyzing' | 'drafted' | 'booked'>('drafted');
  // Interactive state for Notetaker Simulator
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({ 0: true });
  // Interactive state for Payments Simulator
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'bundle'>('single');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Interactive state for Scheduling Simulator
  const [selectedDate, setSelectedDate] = useState('Oct 14');
  const [selectedTime, setSelectedTime] = useState('2:00 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = () => {
    setBookingConfirmed(true);
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 }
      });
    } catch {}
  };

  const toggleAction = (index: number) => {
    setCheckedActions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="flex w-full justify-center p-2 sm:p-4 lg:p-6 bg-[#FAF7F2]">
      <div className="relative flex flex-col items-center w-full max-w-[1500px] overflow-clip rounded-3xl bg-[#F6F3EE] border border-stone-200/70 py-12 sm:py-16 px-4 sm:px-8">
        
        {/* Ambient Liquid Gooey Blobs in background */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden filter-gooey-subtle opacity-35 -z-0"
          aria-hidden="true"
        >
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-blue-300/40 animate-gooey-morph" />
          <div className="absolute -top-8 left-36 w-52 h-52 rounded-full bg-indigo-300/30 animate-gooey-orbit" />
          <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-amber-200/35 animate-gooey-orbit-reverse" />
        </div>

        {/* Top Header Block */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12 relative z-10">
          
          {/* Brand Identity Eyebrow with Liquid Gooey Dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-stone-300/80 shadow-2xs mb-5 backdrop-blur-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#071A31] font-bricolage">
              elev • Intelligence OS
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-xs font-semibold text-slate-600">
              One Fluid Flow for All Meeting Work
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.65rem] text-[#071A31] font-normal leading-[1.12] tracking-tight">
            All the work around meetings, handled.
          </h1>
          <p className="font-heading text-base sm:text-lg text-slate-600 mt-4 sm:mt-5 max-w-2xl leading-relaxed">
            From AI-powered scheduling to automated meeting recaps and follow-ups, get the busywork done with fewer tools and less effort.
          </p>

          {/* Direct OAuth CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
            {/* Google Signup */}
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 bg-[#071A31] hover:bg-[#112D4E] active:scale-[0.98] text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
            >
              <span>Sign up with Google</span>
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </span>
            </button>

            {/* Microsoft Signup */}
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 bg-[#071A31] hover:bg-[#112D4E] active:scale-[0.98] text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
            >
              <span>Sign up with Microsoft</span>
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#F25022" d="M1 1h10v10H1z" />
                  <path fill="#00A4EF" d="M1 13h10v10H1z" />
                  <path fill="#7FBA00" d="M13 1h10v10H13z" />
                  <path fill="#FFB900" d="M13 13h10v10H13z" />
                </svg>
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-500 mt-4 flex items-center gap-2">
            <button
              onClick={() => onOpenAuth('signup')}
              className="underline text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Sign up with email
            </button>
            <span className="text-slate-300">•</span>
            <span>No credit card required</span>
          </div>
        </div>

        {/* Multi-Product Hero Interactive Stage */}
        <div className="w-full max-w-[1140px] mx-auto bg-stone-100/90 rounded-[2rem] p-3 sm:p-6 lg:p-8 shadow-md border border-stone-200 relative z-10">
          
          {/* Tab Selection Bar with Squircle icons & Emil Kowalski Spring Layout Indicator */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-1" role="tablist">
            
            {/* Tab 1: Scheduling */}
            <button
              role="tab"
              aria-selected={activeTab === 'scheduling'}
              onClick={() => { setActiveTab('scheduling'); setBookingConfirmed(false); }}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-[0.97] ${
                activeTab === 'scheduling' ? 'text-[#071A31]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTab === 'scheduling' && (
                <motion.div
                  layoutId="heroTabIndicator"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/90 -z-10"
                />
              )}
              <div className="w-6 h-6 rounded-lg bg-[#6BB1FF] flex items-center justify-center text-[#071A31] shadow-xs">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="font-bricolage">elev Schedule</span>
            </button>

            {/* Tab 2: Callie (AI assistant) */}
            <button
              role="tab"
              aria-selected={activeTab === 'callie'}
              onClick={() => setActiveTab('callie')}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-[0.97] ${
                activeTab === 'callie' ? 'text-[#071A31]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTab === 'callie' && (
                <motion.div
                  layoutId="heroTabIndicator"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/90 -z-10"
                />
              )}
              <div className="w-6 h-6 rounded-lg bg-[#DBEE9F] flex items-center justify-center text-[#071A31] shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bricolage">elev Callie</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900">
                AI Beta
              </span>
            </button>

            {/* Tab 3: Notetaker */}
            <button
              role="tab"
              aria-selected={activeTab === 'notetaker'}
              onClick={() => setActiveTab('notetaker')}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-[0.97] ${
                activeTab === 'notetaker' ? 'text-[#071A31]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTab === 'notetaker' && (
                <motion.div
                  layoutId="heroTabIndicator"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/90 -z-10"
                />
              )}
              <div className="w-6 h-6 rounded-lg bg-[#B89FFA] flex items-center justify-center text-[#071A31] shadow-xs">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="font-bricolage">elev Notetaker</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800">
                2.0
              </span>
            </button>

            {/* Tab 4: Payments */}
            <button
              role="tab"
              aria-selected={activeTab === 'payments'}
              onClick={() => setActiveTab('payments')}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-[0.97] ${
                activeTab === 'payments' ? 'text-[#071A31]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeTab === 'payments' && (
                <motion.div
                  layoutId="heroTabIndicator"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/90 -z-10"
                />
              )}
              <div className="w-6 h-6 rounded-lg bg-[#5DDFD7] flex items-center justify-center text-[#071A31] shadow-xs">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <span className="font-bricolage">elev Pay</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                New
              </span>
            </button>

          </div>

          {/* Inner Stage Card with BorderBeam Effect */}
          <BorderBeam
            size="md"
            colorVariant={
              activeTab === 'callie' ? 'sunset' :
              activeTab === 'notetaker' ? 'colorful' :
              'ocean'
            }
            strength={0.7}
            theme="light"
            borderRadius={24}
            className="w-full"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs border border-stone-200/80">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Product Context */}
              <div className="lg:col-span-5 space-y-4 text-left">
                {activeTab === 'scheduling' && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#071A31]">
                      <div className="w-5 h-5 rounded-md bg-[#6BB1FF] flex items-center justify-center">
                        <Calendar className="w-3 h-3 text-[#071A31]" />
                      </div>
                      <span>elev Scheduling</span>
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#071A31] font-normal leading-snug">
                      Book meetings with the world’s #1 scheduling tool
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      Giving you complete control and total customization, elev is the easiest and most powerful way to find time to connect without ping-pong emails.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onOpenDemo}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#071A31] hover:text-blue-600 border-b border-[#071A31] pb-0.5 transition-colors cursor-pointer"
                      >
                        <span>Explore scheduling features</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'callie' && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#071A31]">
                      <div className="w-5 h-5 rounded-md bg-[#DBEE9F] flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-[#071A31]" />
                      </div>
                      <span>elev Callie</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900">Beta</span>
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#071A31] font-normal leading-snug">
                      Introducing your 24/7 AI scheduling assistant
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      Add Callie to any email thread to coordinate scheduling on your behalf without switching tools, sacrificing control, or revealing private conflicts.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onOpenDemo}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#071A31] hover:text-blue-600 border-b border-[#071A31] pb-0.5 transition-colors cursor-pointer"
                      >
                        <span>Learn how Callie works</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'notetaker' && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#071A31]">
                      <div className="w-5 h-5 rounded-md bg-[#B89FFA] flex items-center justify-center">
                        <FileText className="w-3 h-3 text-[#071A31]" />
                      </div>
                      <span>elev Notetaker</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">New</span>
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#071A31] font-normal leading-snug">
                      Actionable, shareable recaps for every meeting
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      Finish the day knowing every meeting was captured, key discussion themes were synthesized, and next-step follow-ups were handled automatically.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onOpenDemo}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#071A31] hover:text-blue-600 border-b border-[#071A31] pb-0.5 transition-colors cursor-pointer"
                      >
                        <span>See Notetaker recaps</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'payments' && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#071A31]">
                      <div className="w-5 h-5 rounded-md bg-[#5DDFD7] flex items-center justify-center">
                        <CreditCard className="w-3 h-3 text-[#071A31]" />
                      </div>
                      <span>elev Payments</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">New</span>
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#071A31] font-normal leading-snug">
                      Flexible, built-in payment tools
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      Charge upfront for meetings, sell multi-session client packages, and send automated invoices with payment tools engineered to protect your time.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onOpenDemo}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#071A31] hover:text-blue-600 border-b border-[#071A31] pb-0.5 transition-colors cursor-pointer"
                      >
                        <span>Explore payment options</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Live Interactive Product Simulator */}
              <div className="lg:col-span-7 bg-[#F9FAFB] rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-inner">
                
                {/* 1. SCHEDULING SIMULATOR */}
                {activeTab === 'scheduling' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Host</span>
                        <h4 className="text-sm font-extrabold text-slate-900">Sarah Connor · 30 Min Discovery</h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                        <Video className="w-3 h-3 text-blue-600" />
                        <span>Google Meet</span>
                      </div>
                    </div>

                    {bookingConfirmed ? (
                      <div className="bg-emerald-50 rounded-xl p-5 text-center border border-emerald-200 space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-emerald-900">You are scheduled!</h4>
                        <p className="text-xs text-emerald-700">
                          Tuesday, {selectedDate} at {selectedTime} (30 mins)
                        </p>
                        <p className="text-[11px] text-emerald-600">
                          Calendar invitation and Google Meet link dispatched to your inbox.
                        </p>
                        <button
                          onClick={() => setBookingConfirmed(false)}
                          className="mt-2 text-xs font-bold text-emerald-800 underline cursor-pointer"
                        >
                          Book another test slot
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Dates */}
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Select Date</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['Oct 14', 'Oct 15', 'Oct 16', 'Oct 17', 'Oct 20', 'Oct 21'].map(date => (
                              <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                  selectedDate === date
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                                }`}
                              >
                                {date}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Times */}
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Available Slots ({selectedDate})</label>
                          <div className="space-y-1.5">
                            {['9:30 AM', '11:00 AM', '2:00 PM', '4:30 PM'].map(time => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                                  selectedTime === time
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                <span>{time}</span>
                                {selectedTime === time && <Check className="w-3.5 h-3.5 text-blue-600" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {!bookingConfirmed && (
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>Time zone: Pacific Time (PT)</span>
                        </div>
                        <button
                          onClick={handleBooking}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-full cursor-pointer shadow-xs transition-colors"
                        >
                          Confirm {selectedTime}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CALLIE AI ASSISTANT SIMULATOR */}
                {activeTab === 'callie' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">Email Thread:</span>
                        <span className="text-slate-500 truncate max-w-[200px]">Quarterly Review & Next Steps</span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#DBEE9F] text-[#071A31] px-2 py-0.5 rounded-full">
                        Callie Active
                      </span>
                    </div>

                    {/* Email Message 1 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span className="font-bold text-slate-600">Client (David Miller):</span>
                        <span>Today, 10:14 AM</span>
                      </div>
                      <p className="text-slate-700">
                        "Hey Alex, would love to hop on a call this Thursday to finalize our contract. Can you do anytime between 1pm and 4pm?"
                      </p>
                    </div>

                    {/* Email Message 2: Callie's Autonomous Draft */}
                    <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                          <span>Callie (AI Assistant on behalf of Alex)</span>
                        </div>
                        <span className="text-amber-700 font-bold uppercase text-[9px] tracking-wider">Automated Coordination</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        "Hi David! Alex has availability this Thursday, Oct 16th. Here are three open slots that fit both of your working hours:"
                      </p>
                      <div className="grid grid-cols-3 gap-1.5 my-1.5">
                        <span className="bg-white px-2 py-1 rounded-md border border-amber-200 text-[11px] font-bold text-center text-slate-800">
                          1:30 PM PT
                        </span>
                        <span className="bg-white px-2 py-1 rounded-md border border-amber-200 text-[11px] font-bold text-center text-slate-800">
                          2:15 PM PT
                        </span>
                        <span className="bg-white px-2 py-1 rounded-md border border-amber-200 text-[11px] font-bold text-center text-slate-800">
                          3:30 PM PT
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 italic">
                        Reply with your preference or let me know if Friday works better!
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-500">
                        Callie automatically buffers 15m focus time between calls.
                      </span>
                      <button
                        onClick={() => {
                          setCallieState(callieState === 'drafted' ? 'booked' : 'drafted');
                          if (callieState === 'drafted') {
                            try {
                              confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                            } catch {}
                          }
                        }}
                        className="bg-[#071A31] text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {callieState === 'drafted' ? 'Simulate 1-Click Confirm' : 'Reset Thread'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. NOTETAKER SIMULATOR */}
                {activeTab === 'notetaker' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Meeting Recap</span>
                        <h4 className="text-xs font-bold text-slate-900">Sprint Sync · Product & Design Team</h4>
                      </div>
                      <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-[11px] font-bold border border-purple-200">
                        <FileText className="w-3 h-3 text-purple-600" />
                        <span>Recap Ready</span>
                      </div>
                    </div>

                    {/* Audio Preview bar */}
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 cursor-pointer hover:bg-blue-700 transition-colors"
                        aria-label="Play recording"
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>04:12</span>
                          <span>28:45</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-blue-600 rounded-full ${isPlayingAudio ? 'w-1/2 animate-pulse' : 'w-1/6'}`} />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded-sm">
                        Recorded
                      </span>
                    </div>

                    {/* Summary and Checkable Action Items */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <span className="text-[11px] font-bold text-slate-800 block">AI Summary & Action Items</span>
                      <p className="text-slate-600 text-xs">
                        Discussed Q4 mobile release scope. Team agreed to prioritize booking widget latency and postpone custom branding tabs to v2.1.
                      </p>

                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        {[
                          'Elena to deliver high-res SVG connector assets by Wednesday',
                          'Dev team to enable webhook sync with HubSpot pipelines',
                          'Schedule follow-up demo with sales engineering team'
                        ].map((action, i) => (
                          <div
                            key={i}
                            onClick={() => toggleAction(i)}
                            className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900"
                          >
                            <div className={`w-4 h-4 rounded-sm flex items-center justify-center text-xs border ${
                              checkedActions[i]
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}>
                              {checkedActions[i] && <Check className="w-3 h-3" />}
                            </div>
                            <span className={`text-xs ${checkedActions[i] ? 'line-through text-slate-400' : ''}`}>
                              {action}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span>Recap automatically synced to Slack & Notion</span>
                      <span className="font-bold text-blue-600 cursor-pointer hover:underline">Copy full transcript</span>
                    </div>
                  </div>
                )}

                {/* 4. PAYMENTS SIMULATOR */}
                {activeTab === 'payments' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Checkout</span>
                        <h4 className="text-xs font-bold text-slate-900">1:1 Executive Coaching Session</h4>
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Stripe Verified</span>
                      </div>
                    </div>

                    {paymentSuccess ? (
                      <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 text-center space-y-2 animate-in fade-in zoom-in-95">
                        <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                          <Check className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-emerald-900">Payment Processed Successfully!</h4>
                        <p className="text-[11px] text-emerald-700">
                          {selectedPackage === 'single' ? '$150.00' : '$400.00'} paid via Stripe. Calendar slot reserved.
                        </p>
                        <button
                          onClick={() => setPaymentSuccess(false)}
                          className="text-[11px] font-bold text-emerald-800 underline cursor-pointer"
                        >
                          Reset payment demo
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Package selection toggle */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setSelectedPackage('single')}
                            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                              selectedPackage === 'single'
                                ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <span className="block text-[11px] font-bold text-slate-900">Single Consultation</span>
                            <span className="text-xs font-extrabold text-emerald-700">$150.00</span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">Pay once at booking</span>
                          </button>

                          <button
                            onClick={() => setSelectedPackage('bundle')}
                            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                              selectedPackage === 'bundle'
                                ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="block text-[11px] font-bold text-slate-900">3-Session Bundle</span>
                              <span className="text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-xs">Save $50</span>
                            </div>
                            <span className="text-xs font-extrabold text-emerald-700">$400.00</span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">3 credits to use anytime</span>
                          </button>
                        </div>

                        {/* Card mock inputs */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600 text-[11px]">
                            <span className="font-semibold">Payment Details</span>
                            <span className="text-slate-400">Card ending in 4242</span>
                          </div>
                          <div className="flex items-center justify-between pt-1 text-slate-800 font-bold">
                            <span>Total Due Today:</span>
                            <span className="text-sm text-emerald-700 font-extrabold">
                              {selectedPackage === 'single' ? '$150.00' : '$400.00'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-slate-400">
                            Zero no-show risk with upfront payment
                          </span>
                          <button
                            onClick={handlePayment}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-full cursor-pointer shadow-xs transition-colors"
                          >
                            Pay & Confirm Slot
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

              </div>

            </div>
          </div>
          </BorderBeam>
        </div>

      </div>
    </section>
  );
}
