import type { ProviderDetail, ProviderStat } from "@/types/provider";

export function buildProviderDisplayStats(
  provider: ProviderDetail,
  providerType: string,
): ProviderStat[] {
  if (provider.stats && provider.stats.length > 0) {
    return provider.stats;
  }

  const stats: ProviderStat[] = [];

  if (provider.location) {
    stats.push({ label: "Location", value: provider.location });
  }

  if (provider.rating !== undefined) {
    stats.push({
      label: providerType === "clinic" ? "Patient rating" : "Rating",
      value: String(provider.rating),
    });
  }

  if (providerType === "clinic") {
    stats.push({
      label: "Success rate focus",
      value: "Personalised IVF pathways",
    });
  } else {
    stats.push({
      label: "Institution type",
      value: provider.type,
    });
  }

  return stats;
}
