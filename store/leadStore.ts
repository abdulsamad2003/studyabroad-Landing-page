import { create } from "zustand";
import type { Lead } from "@/types/lead";

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

type LeadState = {
  lead: Partial<Lead>;
  influencerSlug?: string;
  utm: UtmParams;
  setLead: (data: Partial<Lead>) => void;
  setInfluencerSlug: (slug: string) => void;
  setUtm: (utm: UtmParams) => void;
  resetLead: () => void;
};

export const useLeadStore = create<LeadState>((set) => ({
  lead: {},
  influencerSlug: undefined,
  utm: {},
  setLead: (data) => set((state) => ({ lead: { ...state.lead, ...data } })),
  setInfluencerSlug: (influencerSlug) => set({ influencerSlug }),
  setUtm: (utm) => set({ utm }),
  resetLead: () => set({ lead: {}, influencerSlug: undefined, utm: {} }),
}));
