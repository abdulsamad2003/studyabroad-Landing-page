import type { DomainId } from "@/config/types";
import type { BlogPost } from "@/types/blog";
import type { Provider } from "@/types/provider";
import {
  getDummyBlogPreviews,
  getDummyProviderPreviews,
} from "./homepage-dummy-data";

const PREVIEW_LIMIT = 3;

// Homepage and explore listings use dummy data until backend listings are wired up.

export async function fetchProviderListing(
  domainId: DomainId,
  providerType: string,
): Promise<Provider[]> {
  return getDummyProviderPreviews(domainId, providerType);
}

export async function fetchProviderPreview(
  domainId: DomainId,
  providerType: string,
): Promise<Provider[]> {
  return (await fetchProviderListing(domainId, providerType)).slice(
    0,
    PREVIEW_LIMIT,
  );
}

export async function fetchBlogPreview(domainId: DomainId): Promise<BlogPost[]> {
  return getDummyBlogPreviews(domainId).slice(0, PREVIEW_LIMIT);
}
