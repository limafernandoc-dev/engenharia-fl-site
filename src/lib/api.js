import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  withCredentials: true,
});

let refreshing = null;
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original?._retry &&
      original &&
      !original.url.includes("/auth/")
    ) {
      original._retry = true;
      try {
        refreshing =
          refreshing ||
          api.post("/auth/refresh").finally(() => {
            refreshing = null;
          });
        await refreshing;
        return api(original);
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const DEFAULT_SETTINGS = {
  whatsapp: "5511999999999",
  phone: "(11) 99999-9999",
  email_main: "contato@engenhariafl.com.br",
  email_quotes: "orcamentos@engenhariafl.com.br",
  email_admin: "adm@engenhariafl.com.br",
  instagram: "https://www.instagram.com/engenharia_fl_brasil",
  linkedin: "",
  facebook: "",
  youtube: "",
  location: "São Paulo – SP",
};

let settingsPromise = null;
export const getSettings = () => {
  if (!settingsPromise) {
    settingsPromise = api
      .get("/settings")
      .then((r) => ({ ...DEFAULT_SETTINGS, ...r.data }))
      .catch(() => DEFAULT_SETTINGS);
  }
  return settingsPromise;
};
export const refreshSettings = () => {
  settingsPromise = null;
  return getSettings();
};

export const waLink = (settings, message) => {
  const number = (settings?.whatsapp || DEFAULT_SETTINGS.whatsapp).replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const WA_DEFAULT_MESSAGE =
  "Olá! Encontrei a Engenharia FL através do site engenhariafl.com.br e gostaria de solicitar informações sobre um projeto.";
export const WA_QUOTE_MESSAGE =
  "Olá, encontrei a Engenharia FL através do site e gostaria de solicitar um orçamento.";
export const waServiceMessage = (serviceName) =>
  `Olá, encontrei a Engenharia FL pelo site e gostaria de solicitar informações sobre ${serviceName}.`;

export const telLink = (settings) =>
  `tel:+55${(settings?.whatsapp || DEFAULT_SETTINGS.whatsapp).replace(/\D/g, "")}`;

export function formatApiError(e, fallback = "Algo deu errado. Tente novamente.") {
  const detail = e?.response?.data?.detail;
  if (detail == null) return e?.message || fallback;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((err) => (err && typeof err.msg === "string" ? err.msg : JSON.stringify(err)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export const resolveImg = (url) => {
  if (!url) return "";
  if (url.startsWith("/api/")) return `${process.env.REACT_APP_BACKEND_URL}${url}`;
  return url;
};

export const uploadImageFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/admin/upload", formData);
  return data.url;
};
