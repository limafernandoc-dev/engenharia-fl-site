import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Logo } from "./Logo";
import { useSite } from "../context/SiteContext";
import { waLink, WA_DEFAULT_MESSAGE } from "../lib/api";
import { scrollToId } from "../lib/scroll";
import { NAV_LINKS } from "./Navbar";

const PRIVACY_TEXT =
  "A Engenharia FL respeita a sua privacidade. Os dados enviados pelo formulário de contato (nome, empresa, telefone, e-mail, cidade e descrição do projeto) são utilizados exclusivamente para responder à sua solicitação de orçamento e não são compartilhados com terceiros, conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Para solicitar a remoção dos seus dados, entre em contato pelos canais oficiais informados neste site.";

const COOKIES_TEXT =
  "Este site utiliza apenas cookies estritamente necessários ao seu funcionamento e cookies de análise de navegação para melhorar a experiência do visitante. Nenhum dado pessoal é vendido ou compartilhado. Ao continuar navegando, você concorda com o uso de cookies conforme descrito nesta política.";

export const Footer = () => {
  const settings = useSite();

  const socials = [
    { icon: Instagram, href: settings.instagram, label: "Instagram", testid: "footer-instagram-link" },
    settings.linkedin && { icon: Linkedin, href: settings.linkedin, label: "LinkedIn", testid: "footer-linkedin-link" },
    settings.facebook && { icon: Facebook, href: settings.facebook, label: "Facebook", testid: "footer-facebook-link" },
    settings.youtube && { icon: Youtube, href: settings.youtube, label: "YouTube", testid: "footer-youtube-link" },
  ].filter(Boolean);

  return (
    <footer data-testid="site-footer" className="bg-navy-deep text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
            Engenharia | Reformas | Manutenção | Gerenciamento
          </p>
          <p className="mt-3 text-sm text-slate-400">São Paulo – SP</p>
          <div className="mt-6 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-testid={social.testid}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-slate-300 transition-colors duration-200 hover:border-blaze hover:bg-blaze hover:text-white"
              >
                <social.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white">Navegação</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-testid={`footer-${link.testid}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(link.href);
                  }}
                  className="text-sm text-slate-400 transition-colors hover:text-blaze"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white">Contato</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={waLink(settings, WA_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp-link" className="text-slate-400 transition-colors hover:text-blaze">
                WhatsApp: {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email_main}`} data-testid="footer-email-link" className="text-slate-400 transition-colors hover:text-blaze">
                {settings.email_main}
              </a>
            </li>
            <li>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-blaze">
                @engenharia_fl_brasil
              </a>
            </li>
            <li className="text-slate-500">engenhariafl.com.br</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-6 font-mono text-[11px] uppercase tracking-wider text-slate-500 sm:flex-row sm:items-center sm:px-8">
          <p>© Engenharia FL — Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Dialog>
              <DialogTrigger data-testid="footer-privacy-policy-link" className="transition-colors hover:text-blaze">
                Política de Privacidade
              </DialogTrigger>
              <DialogContent className="rounded-sm" aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle className="font-heading">Política de Privacidade</DialogTitle>
                </DialogHeader>
                <p className="text-sm leading-relaxed text-slate-600">{PRIVACY_TEXT}</p>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger data-testid="footer-cookies-policy-link" className="transition-colors hover:text-blaze">
                Política de Cookies
              </DialogTrigger>
              <DialogContent className="rounded-sm" aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle className="font-heading">Política de Cookies</DialogTitle>
                </DialogHeader>
                <p className="text-sm leading-relaxed text-slate-600">{COOKIES_TEXT}</p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
};
