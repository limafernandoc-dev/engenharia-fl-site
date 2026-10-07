const ITEMS = [
  "Reformas Corporativas",
  "Construção Civil",
  "Manutenção Predial",
  "Instalações Elétricas",
  "Drywall & Forros",
  "Pisos & Revestimentos",
  "Infraestrutura de Rede",
  "Gerenciamento de Obras",
  "Laudos & Vistorias Técnicas",
  "Pintura Corporativa",
];

const Row = ({ ariaHidden }) => (
  <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
    {ITEMS.map((item) => (
      <span
        key={item}
        className="flex items-center font-mono text-xs font-medium uppercase tracking-[0.3em] text-slate-400 sm:text-sm"
      >
        <span className="px-6 sm:px-10">{item}</span>
        <span className="text-blaze">✕</span>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    className="overflow-hidden border-y border-slate-200 bg-white py-5"
  >
    <div className="marquee-track flex w-max">
      <Row ariaHidden={false} />
      <Row ariaHidden={true} />
    </div>
  </div>
);
