import type { UtmParams } from "@/store/leadStore";

export function parseUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(
    search.startsWith("?") ? search : `?${search}`,
  );

  const utm: UtmParams = {};

  const utm_source = params.get("utm_source");
  const utm_medium = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");
  const utm_term = params.get("utm_term");
  const utm_content = params.get("utm_content");

  if (utm_source) utm.utm_source = utm_source;
  if (utm_medium) utm.utm_medium = utm_medium;
  if (utm_campaign) utm.utm_campaign = utm_campaign;
  if (utm_term) utm.utm_term = utm_term;
  if (utm_content) utm.utm_content = utm_content;

  return utm;
}

export const INFLUENCER_SLUG_STORAGE_KEY = "influencerSlug";
export const UTM_STORAGE_KEY = "utmParams";

export type AttributionStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

export function persistAttribution(
  storage: AttributionStorage,
  slug: string,
  utm: UtmParams,
): void {
  storage.setItem(INFLUENCER_SLUG_STORAGE_KEY, slug);

  if (Object.keys(utm).length > 0) {
    storage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  }
}

export function readStoredAttribution(storage: AttributionStorage): {
  influencerSlug?: string;
  utm: UtmParams;
} {
  const influencerSlug = storage.getItem(INFLUENCER_SLUG_STORAGE_KEY) ?? undefined;
  const rawUtm = storage.getItem(UTM_STORAGE_KEY);

  if (!rawUtm) {
    return { influencerSlug, utm: {} };
  }

  try {
    const parsed = JSON.parse(rawUtm) as UtmParams;
    return { influencerSlug, utm: parsed };
  } catch {
    return { influencerSlug, utm: {} };
  }
}
