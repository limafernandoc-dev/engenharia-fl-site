import { createContext, useContext } from "react";
import { DEFAULT_SETTINGS } from "../lib/api";

const SiteContext = createContext(DEFAULT_SETTINGS);

export const SiteProvider = ({ children }) => (
  <SiteContext.Provider value={DEFAULT_SETTINGS}>{children}</SiteContext.Provider>
);

export const useSite = () => useContext(SiteContext);
