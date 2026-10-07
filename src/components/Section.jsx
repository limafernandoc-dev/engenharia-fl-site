import { Reveal } from "./Reveal";

export const SectionHeading = ({ eyebrow, title, description, dark = false, id }) => (
  <Reveal className="mb-12 max-w-3xl sm:mb-16">
    <p
      className={`font-mono text-xs font-semibold uppercase tracking-[0.25em] ${
        dark ? "text-blaze" : "text-blaze-dark"
      }`}
      data-testid={id ? `${id}-eyebrow` : undefined}
    >
      {eyebrow}
    </p>
    <h2
      className={`mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
        dark ? "text-white" : "text-slate-900"
      }`}
    >
      {title}
    </h2>
    {description && (
      <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>
        {description}
      </p>
    )}
  </Reveal>
);
