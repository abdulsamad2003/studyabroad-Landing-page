"use client";

import { useEffect } from "react";
import type { DomainConfig } from "@/config/types";
import type { BusinessAgent } from "@/types/agent";
import { useAgentStore } from "@/store/agentStore";
import AgentHero from "./AgentHero";
import AgentChat from "./AgentChat";
import AgentLeadForm from "./AgentLeadForm";

type AgentPageProps = {
  agent: BusinessAgent;
  config: DomainConfig;
};

export default function AgentPage({ agent, config }: AgentPageProps) {
  const setAgent = useAgentStore((state) => state.setAgent);

  useEffect(() => {
    setAgent(agent);
    document.documentElement.style.setProperty("--color-primary", agent.primaryColor);

    return () => {
      useAgentStore.getState().clearAgent();
      document.documentElement.style.setProperty("--color-primary", config.primaryColor);
    };
  }, [agent, config.primaryColor, setAgent]);

  return (
    <div
      className="min-h-screen"
      style={{ "--agent-primary": agent.primaryColor } as React.CSSProperties}
    >
      <AgentHero agent={agent} />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-2">
        <AgentChat agent={agent} />
        <AgentLeadForm agent={agent} domainId={config.id} />
      </section>
    </div>
  );
}
