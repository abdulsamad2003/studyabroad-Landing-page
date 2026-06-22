"use client";

import { useEffect, useMemo, useRef } from "react";
import { useChatStore } from "@/store/chatStore";

const PLACEHOLDER_REPLY =
  "Thanks for your message! Full AI guidance is coming soon. Try our eligibility tool or apply form in the meantime.";

type UseAIChatOptions = {
  agentId?: string;
  welcomeMessage?: string;
};

export function useAIChat(options: UseAIChatOptions = {}) {
  const { agentId, welcomeMessage } = options;
  const {
    messages,
    isOpen,
    activeAgentId,
    addMessage,
    setOpen,
    setActiveAgentId,
    clearMessages,
    getMessagesForAgent,
  } = useChatStore();

  const resolvedAgentId = agentId ?? activeAgentId ?? "default";
  const welcomeSeededRef = useRef(false);

  useEffect(() => {
    if (agentId) {
      setActiveAgentId(agentId);
    }
  }, [agentId, setActiveAgentId]);

  useEffect(() => {
    if (!welcomeMessage || welcomeSeededRef.current) return;

    const agentMessages = getMessagesForAgent(resolvedAgentId);
    if (agentMessages.length > 0) {
      welcomeSeededRef.current = true;
      return;
    }

    welcomeSeededRef.current = true;
    addMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      content: welcomeMessage,
      agentId: resolvedAgentId,
    });
  }, [welcomeMessage, resolvedAgentId, getMessagesForAgent, addMessage]);

  const scopedMessages = useMemo(() => {
    if (!agentId) return messages;
    return getMessagesForAgent(agentId);
  }, [agentId, messages, getMessagesForAgent]);

  const sendMessage = (content: string) => {
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content,
      agentId: resolvedAgentId,
    });

    addMessage({
      id: crypto.randomUUID(),
      role: "assistant",
      content: PLACEHOLDER_REPLY,
      agentId: resolvedAgentId,
    });
  };

  return {
    messages: scopedMessages,
    isOpen,
    setOpen,
    sendMessage,
    clearMessages: () => clearMessages(agentId),
  };
}
