import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Trash2 } from "lucide-react";
import { api, formatApiError } from "../../lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const STATUS = ["novo", "em atendimento", "concluído"];

export const LeadsTab = () => {
  const [leads, setLeads] = useState(null);

  const load = useCallback(() => {
    api.get("/admin/leads").then((r) => setLeads(r.data)).catch((e) => {
      toast.error("Erro ao carregar orçamentos", { description: formatApiError(e) });
      setLeads([]);
    });
  }, []);

  useEffect(load, [load]);

  const setStatus = async (lead, status) => {
    try {
      await api.patch(`/admin/leads/${lead.id}`, { status });
      setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    } catch (e) {
      toast.error("Erro ao atualizar status", { description: formatApiError(e) });
    }
  };

  const remove = async (lead) => {
    if (!window.confirm(`Excluir a solicitação de ${lead.name}?`)) return;
    try {
      await api.delete(`/admin/leads/${lead.id}`);
      setLeads((ls) => ls.filter((l) => l.id !== lead.id));
      toast.success("Solicitação excluída");
    } catch (e) {
      toast.error("Erro ao excluir", { description: formatApiError(e) });
    }
  };

  if (leads === null) return <p className="text-sm text-slate-500">Carregando...</p>;

  if (leads.length === 0) {
    return (
      <div data-testid="leads-empty-state" className="rounded-sm border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="font-heading text-lg font-semibold text-slate-700">Nenhuma solicitação recebida ainda</p>
        <p className="mt-2 text-sm text-slate-500">Os orçamentos enviados pelo formulário do site aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="leads-list">
      {leads.map((lead) => (
        <article key={lead.id} data-testid={`lead-card-${lead.id}`} className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-heading text-base font-semibold text-slate-900">
                {lead.name} {lead.company ? <span className="font-normal text-slate-500">— {lead.company}</span> : null}
              </p>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {new Date(lead.created_at).toLocaleString("pt-BR")} • {lead.service_type || "Serviço não informado"} {lead.city ? `• ${lead.city}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={lead.status} onValueChange={(v) => setStatus(lead, v)}>
                <SelectTrigger data-testid={`lead-status-${lead.id}`} className="h-9 w-40 rounded-sm text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <a
                href={`https://wa.me/55${lead.phone.replace(/\D/g, "").replace(/^55/, "")}?text=${encodeURIComponent(`Olá ${lead.name}, aqui é da Engenharia FL. Recebemos sua solicitação de orçamento pelo site.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`lead-whatsapp-${lead.id}`}
                aria-label={`Responder ${lead.name} no WhatsApp`}
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#25D366] text-white transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <button
                onClick={() => remove(lead)}
                data-testid={`lead-delete-${lead.id}`}
                aria-label={`Excluir solicitação de ${lead.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-slate-200 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{lead.description}</p>
          <p className="mt-3 font-mono text-xs text-slate-500">
            {lead.phone} • {lead.email}
          </p>
        </article>
      ))}
    </div>
  );
};
