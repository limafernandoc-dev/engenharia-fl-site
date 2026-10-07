import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_SETTINGS, getSettings } from "../lib/api";

const SiteContext = createContext(DEFAULT_SETTINGS);

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    let active = true;

    getSettings()
      .then((data) => {
        if (active) {
          setSettings({
            ...DEFAULT_SETTINGS,
            ...data,
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar configurações do site:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteContext.Provider value={settings}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
