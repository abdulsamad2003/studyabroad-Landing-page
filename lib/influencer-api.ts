import type { DomainId } from "@/config/types";
import type { ApiResponse } from "@/types/api";
import type { Influencer } from "@/types/influencer";
import { buildDomainApiUrl } from "./domain-api";

export function normalizeInfluencerResponse(body: unknown): Influencer | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as ApiResponse<Influencer>;
  const data = payload.data;

  if (
    !data ||
    typeof data !== "object" ||
    !data.slug ||
    !data.category ||
    data.isActive === false
  ) {
    return null;
  }

  return data;
}

export function isInfluencerInDomain(
  influencer: Influencer,
  domainId: DomainId,
): boolean {
  return influencer.category === domainId;
}

function getServerApiUrl(): string {
  return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
}

export async function fetchInfluencerBySlug(
  domainId: DomainId,
  slug: string,
): Promise<Influencer | null> {
  const baseUrl = getServerApiUrl();
  if (!baseUrl) return null;

  try {
    const url = buildDomainApiUrl(baseUrl, `/influencers/${slug}`, domainId);
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return null;
    }

    const body = await response.json();
    const influencer = normalizeInfluencerResponse(body);

    if (!influencer || !isInfluencerInDomain(influencer, domainId)) {
      return null;
    }

    return influencer;
  } catch {
    return null;
  }
}
