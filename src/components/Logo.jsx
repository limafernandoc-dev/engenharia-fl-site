export const LogoMark = ({ className = "h-9 w-9", light = false }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <rect x="4" y="4" width="7.5" height="40" fill={light ? "#FFFFFF" : "#0B2545"} />
    <rect x="4" y="4" width="21" height="6.5" fill={light ? "#FFFFFF" : "#0B2545"} />
    <rect x="4" y="20" width="15.5" height="6.5" fill={light ? "#FFFFFF" : "#0B2545"} />
    <rect x="30" y="4" width="7" height="40" fill="#F97316" />
    <rect x="30" y="37" width="14" height="7" fill="#F97316" />
  </svg>
);

export const Logo = ({ light = false, compact = false }) => (
  <span className="flex items-center gap-2.5" data-testid="brand-logo">
    <LogoMark light={light} className={compact ? "h-8 w-8" : "h-9 w-9"} />
    <span className="flex flex-col leading-none">
      <span
        className={`font-heading text-[15px] font-bold tracking-[0.18em] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        ENGENHARIA
      </span>
      <span
        className={`font-heading text-[13px] font-bold tracking-[0.42em] ${
          light ? "text-blaze" : "text-blaze"
        }`}
      >
        F L
      </span>
    </span>
  </span>
);
