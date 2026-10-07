export const LogoMark = ({ className = "", light = false }) => (
  <img
    src="/logo_sem_fundo.png"
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
    src="/logo_sem_fundo.png"
      alt="Engenharia FL"
      className={
        compact
          ? "h-24 w-auto object-contain"
          : "h-32 md:h-36 w-auto object-contain"
      }
    />
  </span>
);
