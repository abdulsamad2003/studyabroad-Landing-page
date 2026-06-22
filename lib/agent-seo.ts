import type { Metadata } from "next";
import type { DomainConfig } from "@/config/types";
import type { BusinessAgent } from "@/types/agent";
import { buildPageTitle } from "@/utils/seo";

export function buildAgentPageMetadata(
  agent: BusinessAgent,
  config: DomainConfig,
): Metadata {
  return {
    title: buildPageTitle(agent.businessName, config.name),
    description: agent.tagline || config.seo.description,
  };
}
