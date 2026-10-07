import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { waLink, WA_QUOTE_MESSAGE } from "../lib/api";
import { scrollToId } from "../lib/scroll";

const HERO_IMG =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=srgb&fm=jpg&w=1920&q=85";

const LINES = [
  <>Engenharia que</>,
  <>transforma espaços</>,
  <>
    e entrega <span className="text-blaze">resultados.</span>
  </>,
];

export const Hero = () => {
  const settings = useSite();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 900], [0, 170]);
  const fade = useTransform(scrollY, [0, 650], [1, 0.2]);

  return (
    <header
      id="inicio"
      data-testid="hero-section"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep text-white"
    >
      <motion.div style={{ y: yBg }} className="absolute inset-0 will-change-transform">
        <img
          src={HERO_IMG}
          alt="Obra corporativa em execução pela Engenharia FL em São Paulo"
          className="h-[115%] w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/35" />
      <div className="blueprint-grid-dark absolute inset-0" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-14 pt-40 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-slate-300 sm:text-xs"
          data-testid="hero-technical-badge"
        >
          <span className="inline-block h-[2px] w-10 bg-blaze" />
          Engenharia • Reformas • Manutenção Predial — São Paulo / SP
        </motion.p>

        <h1 className="max-w-5xl font-heading text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className="block will-change-transform"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.95, delay: 0.22 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          data-testid="hero-subtitle"
        >
          Soluções completas em engenharia, reformas, manutenção predial e execução de obras
          corporativas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href={waLink(settings, WA_QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-primary-whatsapp-button"
            className="group inline-flex items-center justify-center gap-3 rounded-sm bg-blaze px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(249,115,22,0.35)] transition-colors duration-200 hover:bg-blaze-dark"
          >
            <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
            Solicitar Orçamento
          </a>
          <a
            href="#servicos"
            data-testid="hero-secondary-services-button"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#servicos");
            }}
            className="group inline-flex items-center justify-center gap-3 rounded-sm border border-white/30 px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            Conheça Nossos Serviços
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 border-t border-white/10"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 sm:px-8 sm:text-xs">
          <span data-testid="hero-ribbon-experience">+15 anos de experiência</span>
          <span className="hidden md:inline">Atendimento corporativo</span>
          <span className="hidden sm:inline">São Paulo e região</span>
          <button
            data-testid="hero-scroll-indicator"
            onClick={() => scrollToId("#quem-somos")}
            aria-label="Rolar para a próxima seção"
            className="flex items-center gap-2 text-blaze transition-colors hover:text-white"
          >
            <span className="hidden sm:inline">Role para explorar</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </button>
        </div>
      </motion.div>
    </header>
  );
};
