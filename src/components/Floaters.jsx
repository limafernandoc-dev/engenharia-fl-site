import { Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { telLink, waLink, WA_DEFAULT_MESSAGE } from "../lib/api";

export const Floaters = () => {
  const settings = useSite();
  const whatsapp = waLink(settings, WA_DEFAULT_MESSAGE);

  return (
    <>
      <motion.a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale com a Engenharia FL no WhatsApp"
        data-testid="floating-whatsapp-trigger"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="wa-pulse fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 hover:scale-110 md:bottom-7 md:right-7"
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" />
      </motion.a>

      <div
        data-testid="mobile-contact-bar"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-navy-deep/95 backdrop-blur-md md:hidden"
      >
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="mobile-bar-whatsapp"
          className="flex items-center justify-center gap-2 bg-blaze py-4 font-mono text-xs font-bold uppercase tracking-wider text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={telLink(settings)}
          data-testid="mobile-bar-phone"
          className="flex items-center justify-center gap-2 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-slate-200"
        >
          <Phone className="h-4 w-4" />
          Ligar
        </a>
        <a
          href={`mailto:${settings.email_main}`}
          data-testid="mobile-bar-email"
          className="flex items-center justify-center gap-2 border-l border-white/10 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-slate-200"
        >
          <Mail className="h-4 w-4" />
          E-mail
        </a>
      </div>
    </>
  );
};
