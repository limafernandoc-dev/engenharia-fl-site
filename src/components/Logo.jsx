export const LogoMark = ({ className = "", light = false }) => (
  <img
    src="/logo_sem%20fundo.png"
    alt="Engenharia FL"
    className={`object-contain ${className}`}
  />
);

export const Logo = ({ light = false, compact = false }) => (
  <span
    className="inline-flex items-center"
    data-testid="brand-logo"
  >
    <img
    src="/logo_sem%20fundo.png"
      alt="Engenharia FL"
      className={
        compact
          ? "h-10 w-auto object-contain"
          : "h-12 md:h-14 w-auto object-contain"
      }
    />
  </span>
);
