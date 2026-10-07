import { useEffect, useState } from "react";
import { api, resolveImg } from "../lib/api";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";

export const Clients = () => {
  const [clients, setClients] = useState(null);

  useEffect(() => {
    api
      .get("/clients")
      .then((r) => setClients(r.data))
      .catch(() => setClients([]));
  }, []);

  const hasClients = clients && clients.length > 0;

  return (
    <section id="clientes" data-testid="clients-section" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="clients"
          eyebrow="05 / Clientes"
          title="Empresas que confiam em nosso trabalho"
        />
        {hasClients ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((client, i) => (
              <Reveal key={client.id} delay={(i % 4) * 0.07} y={18}>
                <div
                  data-testid={`client-logo-${i}`}
                  className="flex h-28 flex-col items-center justify-center gap-2 rounded-sm border border-slate-200 bg-slate-50 px-4 text-center transition-colors duration-300 hover:border-blaze/40 hover:bg-blaze-soft"
                >
                  {client.logo_url ? (
                    <img
                      src={resolveImg(client.logo_url)}
                      alt={`Logotipo de ${client.name}`}
                      loading="lazy"
                      className="max-h-12 max-w-[70%] object-contain"
                    />
                  ) : (
                    <span className="font-heading text-lg font-bold tracking-wide text-navy">
                      {client.name}
                    </span>
                  )}
                  {client.category && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      {client.category}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" data-testid="clients-placeholder-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-28 items-center justify-center rounded-sm border border-dashed border-slate-300 bg-slate-50/60"
                >
                  <span className="px-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    Espaço reservado
                    <br />
                    logotipo {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-slate-400">
              * Logotipos de clientes são publicados somente mediante autorização expressa de cada empresa.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
