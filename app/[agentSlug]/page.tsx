import { notFound } from "next/navigation";
import AgentPage from "@/components/agent/AgentPage";
import { getDomainConfig } from "@/config";
import { fetchAgentBySlug } from "@/lib/agent-api";
import { buildAgentPageMetadata } from "@/lib/agent-seo";

export const revalidate = 3600;

type AgentSlugPageProps = {
  params: Promise<{ agentSlug: string }>;
};

export async function generateMetadata({ params }: AgentSlugPageProps) {
  const { agentSlug } = await params;
  const config = await getDomainConfig();
  const agent = await fetchAgentBySlug(config.id, agentSlug);

  if (!agent) {
    return { title: "Not found" };
  }

  return buildAgentPageMetadata(agent, config);
}

export default async function AgentSlugPage({ params }: AgentSlugPageProps) {
  const { agentSlug } = await params;
  const config = await getDomainConfig();
  const agent = await fetchAgentBySlug(config.id, agentSlug);

  if (!agent) {
    notFound();
  }

  return <AgentPage agent={agent} config={config} />;
}
