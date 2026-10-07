import { Award, BadgeCheck, Building2, ClipboardList, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";

const HIGHLIGHTS = [
  { icon: Award, title: "+15 anos de experiência", desc: "Atuação consolidada em engenharia e construção civil." },
  { icon: Users, title: "Gestão técnica especializada", desc: "Equipe técnica dedicada em todas as etapas da obra." },
  { icon: ClipboardList, title: "Planejamento e controle de obras", desc: "Cronogramas e relatórios de acompanhamento transparentes." },
  { icon: BadgeCheck, title: "Compromisso com prazo e qualidade", desc: "Execução dentro dos prazos e padrões estabelecidos." },
  { icon: Building2, title: "Atendimento corporativo", desc: "Escritórios, varejo, instituições financeiras e empresas." },
];

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85";

export const About = () => (
  <section id="quem-somos" data-testid="about-section" className="relative bg-white py-24 sm:py-32">
    <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
      <Reveal className="relative">
        <div className="relative">
          <span className="absolute -left-3 -top-3 h-10 w-10 border-l-2 border-t-2 border-blaze" />
          <span className="absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-blaze" />
          <img
            src={ABOUT_IMG}
            alt="Equipe de engenharia em planejamento de obra corporativa"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-sm object-cover sm:aspect-[5/6]"
          />
        </div>
        <div className="absolute -bottom-8 left-6 hidden rounded-sm bg-navy px-8 py-6 text-white shadow-xl sm:block">
          <p className="font-heading text-4xl font-bold text-blaze">+15</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300">
            anos de experiência
          </p>
        </div>
      </Reveal>

      <div className="lg:pl-4">
        <SectionHeading
          id="about"
          eyebrow="01 / Quem Somos"
          title="Engenharia técnica com organização, segurança e cumprimento de prazos"
        />
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-slate-600" data-testid="about-text">
            A Engenharia FL atua no mercado de engenharia, construção civil, reformas e manutenção
            predial, oferecendo soluções completas para clientes corporativos, comerciais e
            residenciais. Nossa atuação envolve desde o planejamento e levantamento técnico até o
            gerenciamento e execução dos serviços, buscando sempre qualidade, organização, segurança
            e cumprimento dos prazos estabelecidos. A empresa possui experiência em reformas
            corporativas, varejo, escritórios, instituições financeiras, manutenção predial e
            adequação de ambientes.
          </p>
        </Reveal>
        <ul className="mt-10 space-y-5">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.title} delay={0.08 * i} y={16}>
              <li className="flex items-start gap-4" data-testid={`about-highlight-${i}`}>
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-orange-200 bg-blaze-soft text-blaze-dark">
                  <h.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-heading text-base font-semibold text-slate-900">
                    {h.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-500">{h.desc}</span>
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
