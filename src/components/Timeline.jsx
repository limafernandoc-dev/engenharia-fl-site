import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";

const STEPS = [
  { step: "01", name: "Contato", desc: "Cliente entra em contato e apresenta a necessidade do projeto." },
  { step: "02", name: "Visita Técnica", desc: "Realizamos o levantamento das necessidades no local." },
  { step: "03", name: "Proposta", desc: "Elaboramos o escopo e a proposta comercial detalhada." },
  { step: "04", name: "Planejamento", desc: "Definimos equipe, materiais e cronograma de execução." },
  { step: "05", name: "Execução", desc: "Executamos e acompanhamos os serviços de perto." },
  { step: "06", name: "Entrega", desc: "Vistoria final e entrega da obra ao cliente." },
];

export const Timeline = () => (
  <section data-testid="timeline-section" className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        id="timeline"
        eyebrow="07 / Como Trabalhamos"
        title="Do primeiro contato à entrega das chaves"
      />
      <div className="relative">
        <div className="absolute left-[19px] top-0 h-full w-px bg-slate-200 lg:left-0 lg:top-[19px] lg:h-px lg:w-full" />
        <div className="grid gap-10 lg:grid-cols-6 lg:gap-6">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.1} y={22}>
              <div data-testid={`timeline-step-${item.step}`} className="relative flex gap-6 lg:flex-col lg:gap-0">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy font-mono text-xs font-bold text-white lg:mb-6">
                  {item.step}
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-blaze" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold uppercase tracking-wide text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
