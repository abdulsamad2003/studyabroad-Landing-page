import type { BusinessAgent } from "@/types/agent";
import { getAgentChatBranding } from "@/lib/chat-branding";
import AIChatWidget from "@/components/shared/AIChatWidget";

type AgentHeroProps = {
  agent: BusinessAgent;
};

export default function AgentHero({ agent }: AgentHeroProps) {
  const chatBranding = getAgentChatBranding(agent);

  return (
    <section className="border-b border-slate-200 bg-accent-subtle py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          {agent.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agent.logo}
              alt={agent.businessName}
              className="mb-6 h-12 w-auto object-contain"
            />
          ) : (
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-lg font-semibold text-white shadow-sm">
              {agent.businessName.charAt(0)}
            </div>
          )}
          <h1 className="font-semibold tracking-tight text-slate-900">{agent.businessName}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{agent.tagline}</p>
        </div>
        <AIChatWidget
          agentId={agent.agentId || agent.slug}
          variant="embedded"
          {...chatBranding}
        />
      </div>
    </section>
  );
}
