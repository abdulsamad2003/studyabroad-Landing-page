export function isProviderTypeValidForDomain(
  requestedProviderType: string,
  domainProviderType: string,
): boolean {
  return requestedProviderType === domainProviderType;
}

export function isHostAllowed(
  host: string | null | undefined,
  allowedHosts: string[],
  options?: { allowVercelPreview?: boolean },
): boolean {
  if (!host) return false;

  const normalized = host.split(":")[0]?.toLowerCase() ?? "";

  if (options?.allowVercelPreview && normalized.endsWith(".vercel.app")) {
    return true;
  }

  return allowedHosts.some(
    (allowed) => allowed.toLowerCase() === normalized,
  );
}

export function buildExploreHref(providerType: string): string {
  return `/explore/${providerType}`;
}
