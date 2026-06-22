import type { DomainId } from "@/config/types";

export function buildDomainApiUrl(
  baseUrl: string,
  path: string,
  domainId: DomainId,
): string {
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${normalizedBase}${normalizedPath}`);

  url.searchParams.set("category", domainId);

  return url.toString();
}
