import type { DomainId } from "@/config/types";
import type { ApiResponse } from "@/types/api";
import type { ProviderDetail } from "@/types/provider";
import { getDummyProviderBySlug } from "./homepage-dummy-data";

export function normalizeProviderResponse(body: unknown): ProviderDetail | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as ApiResponse<ProviderDetail>;
  const data = payload.data;

  if (!data || typeof data !== "object" || !data.slug || !data.name) {
    return null;
  }

  return {
    ...data,
    stats: Array.isArray(data.stats) ? data.stats : [],
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
  };
}

// Provider detail pages use dummy data until backend listings are wired up.

export async function fetchProviderBySlug(
  domainId: DomainId,
  providerType: string,
  slug: string,
): Promise<ProviderDetail | null> {
  return getDummyProviderBySlug(domainId, providerType, slug);
}
