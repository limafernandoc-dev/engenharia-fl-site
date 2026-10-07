import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useSite } from "../context/SiteContext";
import { resolveImg, waLink, waServiceMessage } from "../lib/api";

const PHASES = [
  { key: "before", label: "Antes" },
  { key: "during", label: "Durante" },
  { key: "after", label: "Depois" },
];

export const ProjectModal = ({ project, onClose }) => {
  const settings = useSite();
  const [phase, setPhase] = useState("after");

  if (!project) return null;
  const images = project.images || {};
  const available = PHASES.filter((p) => images[p.key]);
  const activePhase = available.find((p) => p.key === phase) ? phase : available[0]?.key;

  const meta = [
    ["Cidade", project.city],
    ["Tipo de serviço", project.service_type],
    ["Cliente", project.client],
    ["Área", project.area],
    ["Duração", project.duration],
    ["Status", project.status],
  ].filter(([, v]) => v);

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-testid="project-detail-modal"
        aria-describedby={undefined}
        className="max-h-[92vh] w-[94vw] max-w-4xl overflow-y-auto rounded-sm border-slate-200 p-0"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6 sm:p-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blaze-dark">
              {project.service_type}
            </p>
            <DialogTitle className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
              {project.title}
            </DialogTitle>
          </div>
          <button
            data-testid="project-modal-close"
            onClick={onClose}
            aria-label="Fechar detalhes do projeto"
            className="rounded-sm border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {available.length > 0 && (
            <>
              <div className="mb-4 flex gap-2" role="tablist" aria-label="Fases da obra">
                {available.map((p) => (
                  <button
                    key={p.key}
                    role="tab"
                    aria-selected={activePhase === p.key}
                    data-testid={`project-phase-${p.key}`}
                    onClick={() => setPhase(p.key)}
                    className={`rounded-sm px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activePhase === p.key
                        ? "bg-navy text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="overflow-hidden rounded-sm">
                <img
                  src={resolveImg(images[activePhase])}
                  alt={`${project.title} — fase ${activePhase === "before" ? "antes" : activePhase === "during" ? "durante" : "depois"}`}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            </>
          )}

          {images.gallery?.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.gallery.map((url, i) => (
                <img
                  key={i}
                  src={resolveImg(url)}
                  alt={`${project.title} — registro fotográfico ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-sm object-cover"
                />
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {meta.map(([label, value]) => (
              <div key={label} className="border-l-2 border-blaze pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          {project.description && (
            <p className="mt-8 text-base leading-relaxed text-slate-600">{project.description}</p>
          )}

          <a
            href={waLink(settings, waServiceMessage(project.service_type || "um projeto semelhante"))}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="project-modal-quote-button"
            className="mt-8 inline-flex items-center gap-3 rounded-sm bg-blaze px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-blaze-dark"
          >
            <MessageCircle className="h-4 w-4" />
            Quero um projeto como este
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
