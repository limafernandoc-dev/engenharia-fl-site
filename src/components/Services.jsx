import {
  Building2,
  ClipboardCheck,
  Construction,
  FileCheck,
  LayoutGrid,
  Layers,
  MessageCircle,
  Network,
  Paintbrush,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { useSite } from "../context/SiteContext";
import { waLink, waServiceMessage } from "../lib/api";

export const SERVICES = [
  { num: "01", name: "Reformas Corporativas", desc: "Reformas completas de escritórios, lojas, agências, ambientes comerciais e corporativos.", icon: Building2, img: "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "02", name: "Construção Civil", desc: "Execução de serviços civis, alvenaria, revestimentos, pisos, estruturas e adequações.", icon: Construction, img: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "03", name: "Instalações Elétricas", desc: "Infraestrutura elétrica, iluminação, quadros, circuitos, tomadas e adequações.", icon: Zap, img: "https://images.unsplash.com/photo-1551649081-39f820bb2d3e?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "04", name: "Drywall e Forros", desc: "Paredes, divisórias, fechamentos, forros e soluções acústicas.", icon: Layers, img: "https://images.unsplash.com/photo-1706074797611-a02f9ed06439?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "05", name: "Pintura", desc: "Pintura interna e externa para ambientes comerciais, corporativos e residenciais.", icon: Paintbrush, img: "https://images.unsplash.com/photo-1531972111231-7482a960e109?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "06", name: "Pisos e Revestimentos", desc: "Instalação de porcelanato, granito, revestimentos e acabamentos.", icon: LayoutGrid, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "07", name: "Manutenção Predial", desc: "Manutenção preventiva e corretiva de instalações e edificações.", icon: Wrench, img: "https://images.unsplash.com/photo-1549637642-90187f64f420?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "08", name: "Rede e Infraestrutura", desc: "Infraestrutura para rede lógica, racks, Wi-Fi, CFTV, cabeamento e sistemas relacionados.", icon: Network, img: "https://images.unsplash.com/photo-1716703373229-b0e43de7dd5c?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "09", name: "Gerenciamento de Obras", desc: "Planejamento, acompanhamento, controle de custos, cronograma e gestão da execução.", icon: ClipboardCheck, img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
  { num: "10", name: "Laudos e Vistorias Técnicas", desc: "Vistorias, relatórios fotográficos, levantamentos técnicos e documentação de engenharia.", icon: FileCheck, img: "https://images.unsplash.com/photo-1686100511314-7d4a52987f2f?crop=entropy&cs=srgb&fm=jpg&w=800&q=80" },
];

const ServiceCard = ({ service, index }) => {
  const settings = useSite();
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
      data-testid={`service-card-${service.num}`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={service.img}
          alt={`Serviço de ${service.name} — Engenharia FL`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-xs font-semibold tracking-widest text-white/80">
          / {service.num}
        </span>
        <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-sm bg-blaze text-white">
          <service.icon className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-semibold text-slate-900">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.desc}</p>
        <a
          href={waLink(settings, waServiceMessage(service.name))}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`service-quote-button-${service.num}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-sm border border-orange-200 bg-blaze-soft px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-blaze-dark transition-colors duration-200 hover:bg-blaze hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Solicitar Orçamento
        </a>
      </div>
    </motion.article>
  );
};

export const Services = () => (
  <section id="servicos" data-testid="services-section" className="blueprint-grid-light relative bg-slate-50 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        id="services"
        eyebrow="02 / Nossos Serviços"
        title="Soluções completas de engenharia para ambientes corporativos"
        description="Do levantamento técnico à entrega final: execução própria, gestão especializada e um canal direto de orçamento para cada serviço."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SERVICES.slice(0, 8).map((s, i) => (
          <ServiceCard key={s.num} service={s} index={i} />
        ))}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
        {SERVICES.slice(8).map((s, i) => (
          <ServiceCard key={s.num} service={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);
