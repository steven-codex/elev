import { useState } from 'react';
import { Globe, ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [lang, setLang] = useState('English');

  return (
    <footer className="bg-[#0B1222] text-white pt-20 pb-12 text-xs border-t border-slate-900 selection:bg-blue-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-14 border-b border-[#1E293B]">
          <div className="space-y-3">
            {/* elev Brand Emblem */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5h10a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5" className="opacity-70" />
                  <path d="M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5" strokeWidth="2.6" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  elev
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/60 font-sans">
                  Enterprise Suite
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl text-white font-bold tracking-tight text-balance">
              Make space for <span className="font-editorial italic font-normal text-[#0055FF]">what matters.</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md text-pretty">
              The scheduling and AI meeting platform engineered to eliminate busywork and keep team momentum high.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-800/80 text-emerald-400 text-xs font-semibold border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800/80 text-slate-300 text-xs border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>SOC 2 Type II Certified</span>
            </div>
          </div>
        </div>

        {/* 7-Column Nav Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 py-14 border-b border-[#1E293B]">
          
          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Products
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#scheduling" className="hover:text-white transition-colors">Scheduling</a></li>
              <li><a href="#velie" className="hover:text-white transition-colors flex items-center gap-1.5">Velie AI <span className="bg-amber-400/20 text-amber-300 text-[9px] font-bold px-1 rounded-sm">Beta</span></a></li>
              <li><a href="#notetaker" className="hover:text-white transition-colors flex items-center gap-1.5">Notetaker <span className="bg-purple-400/20 text-purple-300 text-[9px] font-bold px-1 rounded-sm">New</span></a></li>
              <li><a href="#contacts" className="hover:text-white transition-colors">Contacts</a></li>
              <li><a href="#payments" className="hover:text-white transition-colors flex items-center gap-1.5">Payments <span className="bg-emerald-400/20 text-emerald-300 text-[9px] font-bold px-1 rounded-sm">New</span></a></li>
            </ul>
          </div>

          {/* Column 2: Features */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Features
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#scheduling" className="hover:text-white transition-colors">Availability Rules</a></li>
              <li><a href="#scheduling" className="hover:text-white transition-colors">Event Templates</a></li>
              <li><a href="#scheduling" className="hover:text-white transition-colors">Meeting Polls</a></li>
              <li><a href="#scheduling" className="hover:text-white transition-colors">SMS & Email Reminders</a></li>
              <li><a href="#scheduling" className="hover:text-white transition-colors">Meeting Routing</a></li>
              <li><a href="#scheduling" className="hover:text-white transition-colors">Admin Controls</a></li>
            </ul>
          </div>

          {/* Column 3: Integrations */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Integrations
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#integrations" className="hover:text-white transition-colors">Google Ecosystem</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Microsoft Ecosystem</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Zoom & Meet</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Salesforce & HubSpot</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Stripe & PayPal</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Zapier & Webhooks</a></li>
            </ul>
          </div>

          {/* Column 4: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Solutions
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#solutions" className="hover:text-white transition-colors">For Individuals</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">For Small Business</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">For Enterprise</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Sales & Revenue</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Customer Success</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Recruiting & HR</a></li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Resources
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Details</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Product Tour</a></li>
              <li><a href="#roi" className="hover:text-white transition-colors">ROI Calculator</a></li>
              <li><a href="#customer-stories" className="hover:text-white transition-colors">Customer Stories</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security & Trust</a></li>
            </ul>
          </div>

          {/* Column 6: Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Support
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Help Articles</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Developer API Docs</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Community Forum</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Talk to Sales</a></li>
            </ul>
          </div>

          {/* Column 7: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Company
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Careers <span className="bg-blue-500/20 text-blue-300 text-[9px] font-bold px-1 rounded-sm">Hiring</span></a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Notice</a></li>
            </ul>
          </div>

        </div>

        {/* Apps Downloads & Social Row */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1E293B]">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="text-slate-400 font-medium">Download apps & extensions:</span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {['iOS', 'Android', 'Chrome', 'Safari', 'Outlook', 'Firefox'].map(app => (
                <span
                  key={app}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition-colors cursor-pointer"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Languages */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-start">
            <span>© 2026 elev Technologies, Inc. All rights reserved.</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Settings</a>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-0 text-slate-300 font-semibold focus:outline-hidden cursor-pointer text-xs"
            >
              <option value="English" className="bg-[#0B1222] text-white">English (United States)</option>
              <option value="Español" className="bg-[#0B1222] text-white">Español</option>
              <option value="Français" className="bg-[#0B1222] text-white">Français</option>
              <option value="Deutsch" className="bg-[#0B1222] text-white">Deutsch</option>
              <option value="Português" className="bg-[#0B1222] text-white">Português</option>
            </select>
          </div>
        </div>

      </div>
    </footer>
  );
}
