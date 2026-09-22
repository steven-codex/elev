import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/landingData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
            <span className="text-[11px] font-normal uppercase tracking-widest text-[#0A0D14]">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-tight tracking-tight text-balance">
            Everything you need to know <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">about elev</span>
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 text-pretty">
            Have questions about calendar synchronization, security, or team routing? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-normal text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#0055FF] text-white shadow-xs' : 'bg-white text-slate-500 border border-[#E2E8F0]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#E2E8F0] bg-white/60">
                    <p className="text-pretty">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help box */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Have a question not listed here?</span>
          <a href="#demo" className="font-normal text-blue-600 hover:underline">
            Contact our product team
          </a>
        </div>

      </div>
    </section>
  );
}
