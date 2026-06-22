import { create } from "zustand";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentId?: string;
};

type ChatState = {
  messages: ChatMessage[];
  isOpen: boolean;
  activeAgentId: string | null;
  addMessage: (message: ChatMessage) => void;
  setOpen: (open: boolean) => void;
  setActiveAgentId: (agentId: string | null) => void;
  clearMessages: (agentId?: string) => void;
  getMessagesForAgent: (agentId: string) => ChatMessage[];
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isOpen: false,
  activeAgentId: null,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setOpen: (isOpen) => set({ isOpen }),
  setActiveAgentId: (activeAgentId) => set({ activeAgentId }),
  clearMessages: (agentId) =>
    set((state) => ({
      messages: agentId
        ? state.messages.filter((message) => message.agentId !== agentId)
        : [],
    })),
  getMessagesForAgent: (agentId) =>
    get().messages.filter((message) => message.agentId === agentId),
}));
