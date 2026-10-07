import { useState } from "react";
import {
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Loader2,
} from "lucide-react";

import {
  api,
  waLink,
  WA_QUOTE_MESSAGE,
  formatApiError,
} from "../lib/api";

import { useSite } from "../context/SiteContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SERVICE_OPTIONS = [
  "Reforma corporativa",
  "Construção civil",
  "Manutenção predial",
  "Elétrica",
  "Drywall / Forro",
  "Pintura",
  "Pisos / Revestimentos",
  "Infraestrutura / Rede",
  "Gerenciamento de obra",
  "Laudo / Vistoria",
  "Outro",
];

const EMPTY_FORM = {
  name: "",
  company: "",
  phone: "",
  email: "",
  city: "",
  service_type: "",
  description: "",
  website: "",
};

export const Contact = () => {
  const settings = useSite();

  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.value,
    }));

  const submit = async (e) => {
    e.preventDefault();

    if (sending) return;

    setSending(true);

    try {
      /*
       * 1. REGISTRA O ORÇAMENTO NO BACKEND
       *
       * O api.js já acrescenta /api ao endereço do backend.
       * Portanto:
       *
       * api.post("/leads")
       *
       * envia para:
       *
       * https://site-build-231.preview.emergentagent.com/api/leads
       */

      await api.post("/leads", {
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        city: form.city,
        service_type: form.service_type,
        description: form.description,
        website: form.website,
      });

      /*
       * 2. MONTA A MENSAGEM DO WHATSAPP
       */

      const message = [
        "Olá, encontrei a Engenharia FL através do site e gostaria de solicitar um orçamento.",
        "",
        `Nome: ${form.name}`,
        form.company ? `Empresa: ${form.company}` : null,
        `Telefone: ${form.phone}`,
        `E-mail: ${form.email}`,
        form.city ? `Cidade: ${form.city}` : null,
        `Serviço: ${form.service_type}`,
        `Projeto: ${form.description}`,
      ]
        .filter(Boolean)
        .join("\n");

      /*
       * 3. ABRE O WHATSAPP
       */

      window.open(
        waLink(settings, message),
        "_blank",
        "noopener,noreferrer"
      );

      /*
       * 4. LIMPA O FORMULÁRIO
       */

      setForm(EMPTY_FORM);
    } catch (err) {
      console.error(
        "Erro ao registrar solicitação de orçamento:",
        formatApiError(err)
      );

      alert(
        "Não foi possível registrar sua solicitação no momento. Por favor, tente novamente."
      );
    } finally {
      setSending(false);
    }
  };

  const contactRows = [
    {
      icon: Phone,
      label: "Telefone / WhatsApp",
      value: settings.phone,
      href: waLink(settings, WA_QUOTE_MESSAGE),
      testid: "contact-phone-link",
    },
    {
      icon: Mail,
      label: "E-mail comercial",
      value: settings.email_main,
      href: `mailto:${settings.email_main}`,
      testid: "contact-email-main-link",
    },
    {
      icon: Mail,
      label: "Orçamentos",
      value: settings.email_quotes,
      href: `mailto:${settings.email_quotes}`,
      testid: "contact-email-quotes-link",
    },
    {
      icon: Mail,
      label: "Administrativo",
      value: settings.email_admin,
      href: `mailto:${settings.email_admin}`,
      testid: "contact-email-admin-link",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@engenharia_fl_brasil",
      href: settings.instagram,
      testid: "contact-instagram-link",
    },
    {
      icon: MapPin,
      label: "Atendimento",
      value: settings.location,
      href: null,
      testid: "contact-location",
    },
  ];

  return (
    <section
      id="contato"
      data-testid="contact-section"
      className="blueprint-grid-light bg-slate-50 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">

        {/* COLUNA ESQUERDA */}

        <div>
          <SectionHeading
            id="contact"
            eyebrow="09 / Contato"
            title="Solicite um orçamento"
            description="Preencha o formulário ou fale direto com nossa equipe. Respondemos com agilidade em horário comercial."
          />

          <div className="space-y-4">
            {contactRows.map((row) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-navy text-white">
                    <row.icon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {row.label}
                    </span>

                    <span className="mt-0.5 block text-sm font-semibold text-slate-800 sm:text-base">
                      {row.value}
                    </span>
                  </span>
                </>
              );

              return (
                <Reveal key={row.label} y={14}>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={
                        row.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel="noopener noreferrer"
                      data-testid={row.testid}
                      className="flex items-center gap-4 rounded-sm border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-blaze/50"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      data-testid={row.testid}
                      className="flex items-center gap-4 rounded-sm border border-slate-200 bg-white p-4"
                    >
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* FORMULÁRIO */}

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            data-testid="quote-request-form"
            className="relative rounded-sm border border-slate-200 bg-white p-6 shadow-lg sm:p-9"
          >
            <span className="absolute -left-px -top-px h-8 w-8 border-l-2 border-t-2 border-blaze" />

            <span className="absolute -bottom-px -right-px h-8 w-8 border-b-2 border-r-2 border-blaze" />

            <h3 className="font-heading text-xl font-bold text-slate-900">
              Solicite um orçamento
            </h3>

            <p className="mt-1.5 text-sm text-slate-500">
              Conte um pouco sobre o seu projeto.
            </p>

            {/* CAMPO ANTISPAM */}

            <input
              type="text"
              name="website"
              value={form.website}
              onChange={set("website")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">

              {/* NOME */}

              <div>
                <Label htmlFor="lead-name">
                  Nome *
                </Label>

                <Input
                  id="lead-name"
                  data-testid="form-name-input"
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Seu nome"
                  className="mt-1.5"
                />
              </div>

              {/* EMPRESA */}

              <div>
                <Label htmlFor="lead-company">
                  Empresa
                </Label>

                <Input
                  id="lead-company"
                  data-testid="form-company-input"
                  value={form.company}
                  onChange={set("company")}
                  placeholder="Nome da empresa"
                  className="mt-1.5"
                />
              </div>

              {/* TELEFONE */}

              <div>
                <Label htmlFor="lead-phone">
                  Telefone / WhatsApp *
                </Label>

                <Input
                  id="lead-phone"
                  data-testid="form-phone-input"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="(11) 99999-9999"
                  className="mt-1.5"
                />
              </div>

              {/* EMAIL */}

              <div>
                <Label htmlFor="lead-email">
                  E-mail *
                </Label>

                <Input
                  id="lead-email"
                  data-testid="form-email-input"
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="voce@empresa.com.br"
                  className="mt-1.5"
                />
              </div>

              {/* CIDADE */}

              <div>
                <Label htmlFor="lead-city">
                  Cidade
                </Label>

                <Input
                  id="lead-city"
                  data-testid="form-city-input"
                  value={form.city}
                  onChange={set("city")}
                  placeholder="São Paulo - SP"
                  className="mt-1.5"
                />
              </div>

              {/* SERVIÇO */}

              <div>
                <Label>
                  Tipo de serviço *
                </Label>

                <Select
                  value={form.service_type}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      service_type: v,
                    }))
                  }
                  required
                >
                  <SelectTrigger
                    data-testid="form-service-select"
                    className="mt-1.5"
                  >
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>

                  <SelectContent>
                    {SERVICE_OPTIONS.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        data-testid={`form-service-option-${option
                          .replace(/[^a-zA-Z]/g, "-")
                          .toLowerCase()}`}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* DESCRIÇÃO */}

            <div className="mt-5">
              <Label htmlFor="lead-description">
                Descrição do projeto *
              </Label>

              <Textarea
                id="lead-description"
                data-testid="form-description-textarea"
                required
                rows={5}
                value={form.description}
                onChange={set("description")}
                placeholder="Conte um pouco sobre seu projeto: local, metragem aproximada, prazos e o que precisa ser feito."
                className="mt-1.5"
              />
            </div>

            {/* BOTÕES */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <Button
                type="submit"
                disabled={sending}
                data-testid="form-submit-button"
                className="h-12 flex-1 rounded-sm bg-blaze font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-blaze-dark"
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar pelo WhatsApp"
                )}
              </Button>

              <a
                href={waLink(
                  settings,
                  WA_QUOTE_MESSAGE
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="form-whatsapp-alternative"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-sm border border-slate-300 font-mono text-xs font-semibold uppercase tracking-wider text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />

                Prefiro falar pelo WhatsApp
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
