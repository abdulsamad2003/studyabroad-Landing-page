"use client";

import type { BusinessAgent } from "@/types/agent";
import { getAgentChatBranding } from "@/lib/chat-branding";
import AIChatWidget from "@/components/shared/AIChatWidget";

type AgentChatProps = {
  agent: BusinessAgent;
};

export default function AgentChat({ agent }: AgentChatProps) {
  const chatBranding = getAgentChatBranding(agent);

  return (
    <AIChatWidget
      agentId={agent.agentId || agent.slug}
      variant="embedded"
      {...chatBranding}
    />
  );
}
