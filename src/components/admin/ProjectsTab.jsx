import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { api, formatApiError, resolveImg } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { GalleryPicker, ImagePicker } from "./ImagePicker";

const EMPTY = {
  title: "",
  service_type: "",
  city: "São Paulo - SP",
  client: "",
  area: "",
  duration: "",
  status: "Entregue",
  description: "",
  before: "",
  during: "",
  after: "",
  gallery: [],
  featured: false,
};

const toForm = (project) => ({
  title: project.title || "",
  service_type: project.service_type || "",
  city: project.city || "",
  client: project.client || "",
  area: project.area || "",
  duration: project.duration || "",
  status: project.status || "Entregue",
  description: project.description || "",
  before: project.images?.before || "",
  during: project.images?.during || "",
  after: project.images?.after || "",
  gallery: project.images?.gallery || [],
  featured: !!project.featured,
});

const toPayload = (form) => ({
  title: form.title,
  service_type: form.service_type,
  city: form.city,
  client: form.client,
  area: form.area,
  duration: form.duration,
  status: form.status,
  description: form.description,
  featured: form.featured,
  images: {
    before: form.before || null,
    during: form.during || null,
    after: form.after || null,
    gallery: form.gallery,
  },
});

export const ProjectsTab = () => {
  const [projects, setProjects] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api.get("/projects").then((r) => setProjects(r.data)).catch(() => setProjects([]));
  }, []);

  useEffect(load, [load]);

  const openNew = () => {
    setEditing("new");
    setForm(EMPTY);
  };

  const openEdit = (project) => {
    setEditing(project.id);
    setForm(toForm(project));
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing === "new") {
        await api.post("/admin/projects", toPayload(form));
        toast.success("Projeto criado");
      } else {
        await api.put(`/admin/projects/${editing}`, toPayload(form));
        toast.success("Projeto atualizado");
      }
      setEditing(null);
      load();
    } catch (err) {
      toast.error("Erro ao salvar projeto", { description: formatApiError(err) });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (project) => {
    if (!window.confirm(`Excluir o projeto "${project.title}"?`)) return;
    try {
      await api.delete(`/admin/projects/${project.id}`);
      toast.success("Projeto excluído");
      load();
    } catch (err) {
      toast.error("Erro ao excluir", { description: formatApiError(err) });
    }
  };

  if (projects === null) return <p className="text-sm text-slate-500">Carregando...</p>;

  if (editing) {
    return (
      <form onSubmit={save} data-testid="project-edit-form" className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {editing === "new" ? "Novo projeto" : "Editar projeto"}
          </h3>
          <button type="button" onClick={() => setEditing(null)} data-testid="project-form-cancel" aria-label="Cancelar edição" className="rounded-sm border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><Label>Título *</Label><Input required value={form.title} onChange={set("title")} data-testid="project-form-title" className="mt-1.5" /></div>
          <div><Label>Tipo de serviço</Label><Input value={form.service_type} onChange={set("service_type")} data-testid="project-form-type" className="mt-1.5" placeholder="Reforma Corporativa" /></div>
          <div><Label>Cidade</Label><Input value={form.city} onChange={set("city")} data-testid="project-form-city" className="mt-1.5" /></div>
          <div><Label>Cliente</Label><Input value={form.client} onChange={set("client")} data-testid="project-form-client" className="mt-1.5" /></div>
          <div><Label>Área</Label><Input value={form.area} onChange={set("area")} data-testid="project-form-area" className="mt-1.5" placeholder="1.450 m²" /></div>
          <div><Label>Duração</Label><Input value={form.duration} onChange={set("duration")} data-testid="project-form-duration" className="mt-1.5" placeholder="90 dias" /></div>
          <div><Label>Status</Label><Input value={form.status} onChange={set("status")} data-testid="project-form-status" className="mt-1.5" placeholder="Entregue" /></div>
          <label className="mt-7 flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.featured} onChange={set("featured")} data-testid="project-form-featured" className="h-4 w-4 accent-blaze" />
            Projeto em destaque
          </label>
        </div>
        <div className="mt-5">
          <Label>Descrição</Label>
          <Textarea rows={4} value={form.description} onChange={set("description")} data-testid="project-form-description" className="mt-1.5" />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <ImagePicker label="Foto — Antes" value={form.before} onChange={(v) => setForm((f) => ({ ...f, before: v }))} testid="project-form-img-before" />
          <ImagePicker label="Foto — Durante" value={form.during} onChange={(v) => setForm((f) => ({ ...f, during: v }))} testid="project-form-img-during" />
          <ImagePicker label="Foto — Depois" value={form.after} onChange={(v) => setForm((f) => ({ ...f, after: v }))} testid="project-form-img-after" />
        </div>
        <div className="mt-6">
          <GalleryPicker label="Galeria de fotos" values={form.gallery} onChange={(v) => setForm((f) => ({ ...f, gallery: v }))} testid="project-form-gallery" />
        </div>
        <Button type="submit" disabled={saving} data-testid="project-form-save" className="mt-7 h-11 rounded-sm bg-navy font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-light">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Salvar projeto
        </Button>
      </form>
    );
  }

  return (
    <div data-testid="projects-admin-list">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">{projects.length} projeto(s) no portfólio</p>
        <Button onClick={openNew} data-testid="project-new-button" className="rounded-sm bg-blaze font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-blaze-dark">
          <Plus className="mr-2 h-4 w-4" /> Novo projeto
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} data-testid={`admin-project-${project.slug}`} className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
            {(project.images?.after || project.images?.during || project.images?.before) && (
              <img src={resolveImg(project.images.after || project.images.during || project.images.before)} alt={project.title} loading="lazy" className="h-36 w-full object-cover" />
            )}
            <div className="p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blaze-dark">{project.service_type}</p>
              <h3 className="mt-1 font-heading text-base font-semibold text-slate-900">{project.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{project.city} {project.area ? `• ${project.area}` : ""}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(project)} data-testid={`project-edit-${project.slug}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-slate-200 py-2 font-mono text-xs uppercase tracking-wider text-navy transition-colors hover:bg-slate-50">
                  <Pencil className="h-3.5 w-3.5" /> Editar
                </button>
                <button onClick={() => remove(project)} data-testid={`project-delete-${project.slug}`} aria-label={`Excluir ${project.title}`} className="flex h-9 w-9 items-center justify-center rounded-sm border border-slate-200 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
