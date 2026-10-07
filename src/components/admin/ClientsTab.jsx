import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { api, formatApiError, resolveImg } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImagePicker } from "./ImagePicker";

export const ClientsTab = () => {
  const [clients, setClients] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", logo_url: "" });
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api.get("/clients").then((r) => setClients(r.data)).catch(() => setClients([]));
  }, []);

  useEffect(load, [load]);

  const add = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/admin/clients", { ...form, logo_url: form.logo_url || null });
      toast.success("Cliente adicionado");
      setForm({ name: "", category: "", logo_url: "" });
      load();
    } catch (err) {
      toast.error("Erro ao adicionar cliente", { description: formatApiError(err) });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (client) => {
    if (!window.confirm(`Remover o cliente "${client.name}"?`)) return;
    try {
      await api.delete(`/admin/clients/${client.id}`);
      toast.success("Cliente removido");
      load();
    } catch (err) {
      toast.error("Erro ao remover", { description: formatApiError(err) });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]" data-testid="clients-admin">
      <form onSubmit={add} className="h-fit rounded-sm border border-slate-200 bg-white p-6 shadow-sm" data-testid="client-add-form">
        <h3 className="font-heading text-lg font-bold text-slate-900">Adicionar cliente</h3>
        <p className="mt-1 text-xs text-slate-500">Publique logotipos apenas com autorização da empresa.</p>
        <div className="mt-5 space-y-4">
          <div><Label>Nome da empresa *</Label><Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} data-testid="client-form-name" className="mt-1.5" /></div>
          <div><Label>Segmento</Label><Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} data-testid="client-form-category" className="mt-1.5" placeholder="Instituição financeira" /></div>
          <ImagePicker
            label="Logotipo (upload do arquivo)"
            value={form.logo_url}
            onChange={(v) => setForm((f) => ({ ...f, logo_url: v }))}
            testid="client-form-logo"
          />
          <Button type="submit" disabled={saving} data-testid="client-form-save" className="h-11 w-full rounded-sm bg-blaze font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-blaze-dark">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Adicionar
          </Button>
        </div>
      </form>

      <div data-testid="clients-admin-list" className="space-y-3">
        {clients === null ? (
          <p className="text-sm text-slate-500">Carregando...</p>
        ) : clients.length === 0 ? (
          <div className="rounded-sm border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-heading text-base font-semibold text-slate-700">Nenhum cliente publicado</p>
            <p className="mt-1 text-sm text-slate-500">Enquanto isso, o site exibe espaços reservados na seção Clientes.</p>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} data-testid={`admin-client-${client.id}`} className="flex items-center justify-between gap-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                {client.logo_url ? (
                  <img src={resolveImg(client.logo_url)} alt={client.name} className="h-10 w-16 rounded-sm object-contain" />
                ) : (
                  <span className="flex h-10 w-16 items-center justify-center rounded-sm bg-navy font-mono text-[10px] font-bold uppercase text-white">Logo</span>
                )}
                <div>
                  <p className="font-heading text-sm font-semibold text-slate-900">{client.name}</p>
                  {client.category && <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{client.category}</p>}
                </div>
              </div>
              <button onClick={() => remove(client)} data-testid={`client-delete-${client.id}`} aria-label={`Remover ${client.name}`} className="flex h-9 w-9 items-center justify-center rounded-sm border border-slate-200 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
