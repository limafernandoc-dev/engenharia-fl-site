export const DEFAULT_SETTINGS = {
  whatsapp: "5511976224838",
  phone: "(11) 97622-4838",
  email_main: "fernando.lima@engenhariafl.com.br",
  email_quotes: "fernando.lima@engenhariafl.com.br",
  email_admin: "fernando.lima@engenhariafl.com.br",
  instagram: "https://www.instagram.com/engenharia_fl_brasil",
  linkedin: "",
  facebook: "",
  youtube: "",
  location: "São Paulo – SP",
};

export const getSettings = async () => DEFAULT_SETTINGS;
export const refreshSettings = async () => DEFAULT_SETTINGS;

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

export const resolveImg = (url) => url || "";
