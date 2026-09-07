const LOGOS = [
  {
    name: 'Dropbox',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 100 24">
        <path d="M7.4 0L0 4.8 4.9 8.8l7.4-4.8L7.4 0zM17.2 4.8L9.8 0 4.9 4 12.3 8.8l4.9-4zM0 13.6l7.4 4.8 4.9-4-7.4-4.8L0 13.6zm17.2 0l-4.9-4-7.4 4.8 7.4 4.8 4.9-4.8zM7.4 19.4L2.5 22.6 7.4 24l4.9-1.4-4.9-3.2z" />
        <text x="24" y="18" fontFamily="system-ui, sans-serif" fontWeight="bold" fontSize="16" letterSpacing="-0.5">Dropbox</text>
      </svg>
    )
  },
  {
    name: 'eBay',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 80 24">
        <text x="0" y="19" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" letterSpacing="-1">ebay</text>
      </svg>
    )
  },
  {
    name: 'Compass',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 110 24">
        <circle cx="10" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text x="26" y="18" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="15" letterSpacing="1">COMPASS</text>
      </svg>
    )
  },
  {
    name: 'Twilio',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 95 24">
        <circle cx="10" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="10" cy="12" r="2.5" fill="currentColor" />
        <text x="24" y="18" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16">twilio</text>
      </svg>
    )
  },
  {
    name: 'Zendesk',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 110 24">
        <rect x="2" y="5" width="7" height="14" rx="3.5" />
        <polygon points="12,5 21,19 12,19" />
        <text x="26" y="18" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="15">zendesk</text>
      </svg>
    )
  },
  {
    name: 'Lyft',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 70 24">
        <text x="2" y="19" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" letterSpacing="-1">lyft</text>
      </svg>
    )
  },
  {
    name: 'Bitly',
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 75 24">
        <text x="2" y="18" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">bitly</text>
      </svg>
    )
  }
];

export default function LogoTicker() {
  return (
    <section className="py-12 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
          Simplified scheduling for more than <span className="text-slate-900 font-bold">100,000</span> high-growth companies worldwide
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 text-slate-400 opacity-80 hover:opacity-100 transition-opacity">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="hover:text-slate-700 transition-colors cursor-default"
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

