import { Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useSite } from "../context/SiteContext";
import { waLink, WA_QUOTE_MESSAGE } from "../lib/api";
import { scrollToId } from "../lib/scroll";

export const CtaBanner = () => {
  const settings = useSite();
  return (
    <section data-testid="cta-banner-section" className="relative overflow-hidden bg-navy-deep py-24 sm:py-28">
      <div className="blueprint-grid-dark absolute inset-0" />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 h-1 w-full origin-left bg-blaze"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-blaze">
            08 / Vamos construir juntos
          </p>
          <h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tem um projeto em mente?
          </h2>
          <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
            Conte para nossa equipe o que você precisa.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              data-testid="cta-request-assessment-button"
              onClick={() => scrollToId("#contato")}
              className="inline-flex items-center justify-center rounded-sm bg-blaze px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-blaze-dark"
            >
              Solicite uma avaliação da Engenharia FL
            </button>
            <a
              href={waLink(settings, WA_QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp-button"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-white/30 px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Falar pelo WhatsApp
            </a>
            <a
              href={`mailto:${settings.email_main}`}
              data-testid="cta-email-button"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-white/30 px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Enviar E-mail
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
