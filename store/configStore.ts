import { create } from "zustand";
import type { DomainConfig } from "@/config/types";

type ConfigState = {
  domain: DomainConfig | null;
  setDomain: (domain: DomainConfig) => void;
};

export const useConfigStore = create<ConfigState>((set) => ({
  domain: null,
  setDomain: (domain) => set({ domain }),
}));
