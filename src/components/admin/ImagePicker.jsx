import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { formatApiError, resolveImg, uploadImageFile } from "../../lib/api";

export const ImagePicker = ({ label, value, onChange, testid }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadImageFile(file));
      toast.success("Foto enviada");
    } catch (err) {
      toast.error("Falha no upload", { description: formatApiError(err) });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div data-testid={testid}>
      <p className="mb-1.5 text-sm font-medium leading-none text-slate-700">{label}</p>
      <input ref={inputRef} type="file" accept="image/*" onChange={handle} className="hidden" data-testid={`${testid}-input`} />
      {value ? (
        <div className="relative overflow-hidden rounded-sm border border-slate-200">
          <img src={resolveImg(value)} alt={label} className="h-36 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1.5 bg-gradient-to-t from-black/60 to-transparent p-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              data-testid={`${testid}-replace`}
              aria-label={`Trocar ${label}`}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/90 text-navy transition-colors hover:bg-white"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              data-testid={`${testid}-remove`}
              aria-label={`Remover ${label}`}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/90 text-red-600 transition-colors hover:bg-white"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          data-testid={`${testid}-upload`}
          className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-slate-300 bg-slate-50 text-slate-500 transition-colors hover:border-blaze hover:bg-blaze-soft hover:text-blaze-dark"
        >
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
          <span className="font-mono text-[11px] uppercase tracking-wider">
            {uploading ? "Enviando..." : "Enviar foto"}
          </span>
        </button>
      )}
    </div>
  );
};

export const GalleryPicker = ({ label, values, onChange, testid }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) urls.push(await uploadImageFile(file));
      onChange([...values, ...urls]);
      toast.success(`${urls.length} foto(s) enviada(s)`);
    } catch (err) {
      toast.error("Falha no upload", { description: formatApiError(err) });
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div data-testid={testid}>
      <p className="mb-1.5 text-sm font-medium leading-none text-slate-700">{label}</p>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handle} className="hidden" data-testid={`${testid}-input`} />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {values.map((url, i) => (
          <div key={`${url}-${i}`} className="group relative overflow-hidden rounded-sm border border-slate-200">
            <img src={resolveImg(url)} alt={`Foto da galeria ${i + 1}`} className="h-24 w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              data-testid={`${testid}-remove-${i}`}
              aria-label={`Remover foto ${i + 1}`}
              className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-sm bg-white/90 text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          data-testid={`${testid}-add`}
          className="flex h-24 flex-col items-center justify-center gap-1.5 rounded-sm border border-dashed border-slate-300 bg-slate-50 text-slate-500 transition-colors hover:border-blaze hover:bg-blaze-soft hover:text-blaze-dark"
        >
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
          <span className="font-mono text-[10px] uppercase tracking-wider">{uploading ? "Enviando..." : "Adicionar"}</span>
        </button>
      </div>
    </div>
  );
};
