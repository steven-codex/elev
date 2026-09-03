export default function GooeySvgDefs() {
  return (
    <svg
      className="sr-only absolute w-0 h-0 pointer-events-none -top-full -left-full overflow-hidden"
      aria-hidden="true"
      style={{ position: 'fixed', left: -9999, top: -9999 }}
    >
      <defs>
        {/* Standard Gooey Filter (Optimal for Tabs & Medium Metaballs) */}
        <filter id="gooey-effect" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Heavy Liquid Gooey (Optimal for Large Orb & Merging Blobs) */}
        <filter id="gooey-heavy" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Subtle Gooey Filter (Crisper edges for UI elements & badges) */}
        <filter id="gooey-subtle" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
