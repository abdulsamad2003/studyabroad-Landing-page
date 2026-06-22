import type { DomainId } from "@/config/types";
import type { ApiResponse } from "@/types/api";
import type { BusinessAgent } from "@/types/agent";
import { buildDomainApiUrl } from "./domain-api";

export function normalizeAgentResponse(body: unknown): BusinessAgent | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as ApiResponse<BusinessAgent>;
  const data = payload.data;

  if (
    !data ||
    typeof data !== "object" ||
    !data.slug ||
    !data.businessName ||
    data.isActive === false
  ) {
    return null;
  }

  return data;
}

export function isAgentInDomain(
  agent: BusinessAgent,
  domainId: DomainId,
): boolean {
  return agent.category === domainId;
}

function getServerApiUrl(): string {
  return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
}

export async function fetchAgentBySlug(
  domainId: DomainId,
  slug: string,
): Promise<BusinessAgent | null> {
  const baseUrl = getServerApiUrl();
  if (!baseUrl) return null;

  try {
    const url = buildDomainApiUrl(baseUrl, `/agents/slug/${slug}`, domainId);
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return null;
    }

    const body = await response.json();
    const agent = normalizeAgentResponse(body);

    if (!agent || !isAgentInDomain(agent, domainId)) {
      return null;
    }

    return agent;
  } catch {
    return null;
  }
}
