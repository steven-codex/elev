import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function Footer() {
  const [lang, setLang] = useState('English (United States)');

  return (
    <footer className="w-full bg-[#FAFCFF] py-10 sm:py-14 px-4 select-none">
      {/* FLOATING ROUNDED CARD CONTAINER (Reference Match: media_1789474288000.png) */}
      <div className="max-w-[1360px] w-[95vw] lg:w-[88vw] mx-auto rounded-[32px] sm:rounded-[40px] bg-[#0A0D18] border border-slate-800/80 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4)] p-8 sm:p-12 lg:p-14 text-white">
        
        {/* TOP ROW: BRAND, HEADLINE & BADGES */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12">
          {/* Left Brand & Title */}
          <div className="space-y-4 max-w-xl">
            {/* Logo */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <img 
                src="/elev-infinity-logo.png" 
                alt="elev" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain" 
              />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
                elev
              </span>
            </div>

            {/* Headline with Instrument Serif Accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] text-white font-normal tracking-tight leading-[1.12]">
              Where ambitious teams <br />
              <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">reclaim their focus</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-normal">
              The scheduling and AI meeting platform engineered to eliminate busywork and keep team momentum high.
            </p>
          </div>
        </div>

        {/* MIDDLE ROW: 3 COLUMN LINKS GRID */}
        <div className="pt-10 pb-12 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
          {/* Col 1: PRODUCT */}
          <div>
            <h4 className="text-xs font-normal uppercase tracking-wider text-slate-400 mb-4">
              PRODUCT
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#meetings" className="hover:text-white transition-colors">Meetings</a></li>
              <li><a href="#calendar" className="hover:text-white transition-colors">Calendar</a></li>
              <li><a href="#contacts" className="hover:text-white transition-colors">Contacts</a></li>
              <li><a href="#payments" className="hover:text-white transition-colors">Payments</a></li>
              <li><a href="#ai-notes" className="hover:text-white transition-colors">AI Notes</a></li>
              <li><a href="#follow-ups" className="hover:text-white transition-colors">Follow-ups</a></li>
            </ul>
          </div>

          {/* Col 2: COMPANY */}
          <div>
            <h4 className="text-xs font-normal uppercase tracking-wider text-slate-400 mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>Careers</span>
                  <span className="bg-[#0055FF] text-white text-[10px] font-normal px-2 py-0.5 rounded-full">Hiring</span>
                </a>
              </li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: RESOURCES */}
          <div>
            <h4 className="text-xs font-normal uppercase tracking-wider text-slate-400 mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT, LEGAL, SOCIALS & LANGUAGE */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-xs text-slate-400">
          {/* Left copyright & legal links */}
          <div className="flex flex-wrap items-center gap-3">
            <span>by steve.codex</span>
            <span className="text-slate-700">|</span>
            <a href="#privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-slate-200 transition-colors">Cookie Settings</a>
          </div>

          {/* Right Socials & Language */}
          <div className="flex items-center gap-5">
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-slate-400">
              {/* X / Twitter */}
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>

            <span className="text-slate-800">|</span>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent border-0 text-slate-300 font-normal focus:outline-none cursor-pointer text-xs pr-1"
              >
                <option value="English (United States)" className="bg-[#0A0D18] text-white">English (United States)</option>
                <option value="Español" className="bg-[#0A0D18] text-white">Español</option>
                <option value="Français" className="bg-[#0A0D18] text-white">Français</option>
                <option value="Deutsch" className="bg-[#0A0D18] text-white">Deutsch</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
