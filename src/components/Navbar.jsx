import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { scrollToId } from "../lib/scroll";

export const NAV_LINKS = [
  { label: "Início", href: "#inicio", testid: "nav-link-inicio" },
  { label: "Quem Somos", href: "#quem-somos", testid: "nav-link-quem-somos" },
  { label: "Serviços", href: "#servicos", testid: "nav-link-servicos" },
  { label: "Projetos / Obras", href: "#projetos", testid: "nav-link-projetos" },
  { label: "Clientes", href: "#clientes", testid: "nav-link-clientes" },
  { label: "Por que a FL", href: "#diferenciais", testid: "nav-link-diferenciais" },
  { label: "Contato", href: "#contato", testid: "nav-link-contato" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(href), open ? 250 : 0);
  };

  return (
    <>
      <nav
        data-testid="main-navbar"
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-b border-white/10 bg-navy-deep/40 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#inicio"
            data-testid="nav-logo-link"
            onClick={(e) => go(e, "#inicio")}
            aria-label="Engenharia FL — Início"
          >
            <Logo light={!scrolled} compact />
          </a>
          <div className="hidden items-center gap-6 xl:gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={link.testid}
                onClick={(e) => go(e, link.href)}
                className={`text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                  scrolled ? "text-slate-700 hover:text-blaze-dark" : "text-slate-200 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              data-testid="header-cta-budget-button"
              onClick={(e) => go(e, "#contato")}
              className="rounded-sm bg-blaze px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors duration-200 hover:bg-blaze-dark"
            >
              Solicitar Orçamento
            </a>
          </div>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={`rounded-sm p-2 lg:hidden ${scrolled ? "text-navy" : "text-white"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-navy-deep/98 px-8 backdrop-blur-lg lg:hidden"
            data-testid="mobile-menu-overlay"
          >
            <div className="blueprint-grid-dark pointer-events-none absolute inset-0" />
            <div className="relative flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  data-testid={`mobile-${link.testid}`}
                  onClick={(e) => go(e, link.href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/10 py-4 font-heading text-2xl font-bold text-white transition-colors hover:text-blaze"
                >
                  <span className="mr-4 font-mono text-xs text-blaze">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                data-testid="mobile-header-cta-budget-button"
                onClick={(e) => go(e, "#contato")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 inline-flex w-fit rounded-sm bg-blaze px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wider text-white"
              >
                Solicitar Orçamento
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
