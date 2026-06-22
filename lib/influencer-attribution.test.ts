import { describe, expect, it } from "vitest";
import {
  parseUtmParams,
  persistAttribution,
  readStoredAttribution,
  INFLUENCER_SLUG_STORAGE_KEY,
  UTM_STORAGE_KEY,
} from "./influencer-attribution";

function createMemoryStorage() {
  const store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    store,
  };
}

describe("parseUtmParams", () => {
  it("extracts standard UTM query parameters from a URL search string", () => {
    const params = parseUtmParams(
      "?utm_source=instagram&utm_medium=story&utm_campaign=spring&utm_term=ivf&utm_content=cta",
    );

    expect(params).toEqual({
      utm_source: "instagram",
      utm_medium: "story",
      utm_campaign: "spring",
      utm_term: "ivf",
      utm_content: "cta",
    });
  });

  it("omits missing UTM keys instead of setting empty strings", () => {
    expect(parseUtmParams("?utm_source=google")).toEqual({
      utm_source: "google",
    });
  });
});

describe("persistAttribution", () => {
  it("writes influencer slug and UTM params to session storage", () => {
    const storage = createMemoryStorage();

    persistAttribution(storage, "dr-sharma", {
      utm_source: "instagram",
      utm_campaign: "spring",
    });

    expect(storage.store.get(INFLUENCER_SLUG_STORAGE_KEY)).toBe("dr-sharma");
    expect(JSON.parse(storage.store.get(UTM_STORAGE_KEY)!)).toEqual({
      utm_source: "instagram",
      utm_campaign: "spring",
    });
  });

  it("reads persisted attribution back from session storage", () => {
    const storage = createMemoryStorage();

    persistAttribution(storage, "study-guru", { utm_source: "youtube" });

    expect(readStoredAttribution(storage)).toEqual({
      influencerSlug: "study-guru",
      utm: { utm_source: "youtube" },
    });
  });
});
