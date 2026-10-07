import {
  BadgeCheck,
  Calculator,
  ClipboardList,
  Clock,
  Eye,
  FileSearch,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";

const ITEMS = [
  { icon: ClipboardList, title: "Planejamento", desc: "Escopo, cronograma e orçamento detalhados antes do início da obra." },
  { icon: Clock, title: "Gestão de Prazos", desc: "Acompanhamento contínuo para entregar dentro do prazo combinado." },
  { icon: Calculator, title: "Controle de Custos", desc: "Orçamento transparente e medições claras, sem surpresas no caminho." },
  { icon: BadgeCheck, title: "Qualidade de Execução", desc: "Padrão rigoroso de acabamento conferido em cada etapa do serviço." },
  { icon: ShieldCheck, title: "Segurança", desc: "Cumprimento das normas de segurança e organização do canteiro." },
  { icon: Users, title: "Gestão de Equipes", desc: "Equipes qualificadas, coordenadas e preparadas para ambientes corporativos." },
  { icon: FileSearch, title: "Acompanhamento Técnico", desc: "Responsável técnico presente, com registros e relatórios fotográficos." },
  { icon: Eye, title: "Transparência", desc: "Visibilidade total do andamento, das medições e dos documentos da obra." },
  { icon: MessageSquare, title: "Comunicação com o Cliente", desc: "Canal direto e respostas ágeis do primeiro contato à entrega final." },
];

export const Diferenciais = () => (
  <section
    id="diferenciais"
    data-testid="diferenciais-section"
    className="blueprint-grid-light bg-slate-50 py-24 sm:py-32"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        id="diferenciais"
        eyebrow="06 / Diferenciais"
        title="Por que escolher a Engenharia FL?"
        description="Método, técnica e comunicação: a combinação que transforma uma obra em uma entrega confiável."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.08} y={20}>
            <div
              data-testid={`diferencial-card-${i}`}
              className="group h-full rounded-sm border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blaze/50 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy text-white transition-colors duration-300 group-hover:bg-blaze">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
