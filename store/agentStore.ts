"use client";

import { create } from "zustand";
import type { BusinessAgent } from "@/types/agent";

type AgentState = {
  agent: BusinessAgent | null;
  setAgent: (agent: BusinessAgent | null) => void;
  clearAgent: () => void;
};

export const useAgentStore = create<AgentState>((set) => ({
  agent: null,
  setAgent: (agent) => set({ agent }),
  clearAgent: () => set({ agent: null }),
}));
