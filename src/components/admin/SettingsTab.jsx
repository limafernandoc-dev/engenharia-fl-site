import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api, DEFAULT_SETTINGS, formatApiError, refreshSettings } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FIELDS = [
  { key: "whatsapp", label: "WhatsApp (somente números, com DDI e DDD)", testid: "settings-whatsapp" },
  { key: "phone", label: "Telefone exibido no site", testid: "settings-phone" },
  { key: "email_main", label: "E-mail comercial", testid: "settings-email-main" },
  { key: "email_quotes", label: "E-mail de orçamentos", testid: "settings-email-quotes" },
  { key: "email_admin", label: "E-mail administrativo", testid: "settings-email-admin" },
  { key: "instagram", label: "Instagram (URL)", testid: "settings-instagram" },
  { key: "linkedin", label: "LinkedIn (URL, opcional)", testid: "settings-linkedin" },
  { key: "facebook", label: "Facebook (URL, opcional)", testid: "settings-facebook" },
  { key: "youtube", label: "YouTube (URL, opcional)", testid: "settings-youtube" },
  { key: "location", label: "Localização exibida", testid: "settings-location" },
];

export const SettingsTab = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/settings").then((r) => setForm({ ...DEFAULT_SETTINGS, ...r.data })).catch(() => setForm(DEFAULT_SETTINGS));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/admin/settings", form);
      refreshSettings();
      toast.success("Configurações salvas", { description: "O site já está usando os novos dados de contato." });
    } catch (err) {
      toast.error("Erro ao salvar", { description: formatApiError(err) });
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="text-sm text-slate-500">Carregando...</p>;

  return (
    <form onSubmit={save} data-testid="settings-form" className="max-w-3xl rounded-sm border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="font-heading text-lg font-bold text-slate-900">Dados de contato e redes sociais</h3>
      <p className="mt-1 text-sm text-slate-500">
        Estas informações alimentam os botões de WhatsApp, e-mails clicáveis e o rodapé do site.
      </p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.testid}>{field.label}</Label>
            <Input
              id={field.testid}
              data-testid={field.testid}
              value={form[field.key] || ""}
              onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              className="mt-1.5"
            />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={saving} data-testid="settings-save-button" className="mt-8 h-11 rounded-sm bg-navy font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-light">
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Salvar configurações
      </Button>
    </form>
  );
};
