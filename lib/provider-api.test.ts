import { describe, expect, it } from "vitest";
import { normalizeProviderResponse } from "./provider-api";

describe("normalizeProviderResponse", () => {
  it("returns provider detail when API includes data", () => {
    const provider = normalizeProviderResponse({
      success: true,
      data: {
        id: "1",
        slug: "toronto",
        name: "University of Toronto",
        type: "university",
        description: "Leading research university",
        stats: [{ label: "World ranking", value: "#21" }],
        gallery: ["/images/campus.jpg"],
      },
    });

    expect(provider?.name).toBe("University of Toronto");
    expect(provider?.stats).toHaveLength(1);
    expect(provider?.gallery).toHaveLength(1);
  });

  it("returns null when API body has no provider data", () => {
    expect(normalizeProviderResponse(null)).toBeNull();
    expect(normalizeProviderResponse({ success: true })).toBeNull();
  });
});
