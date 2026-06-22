import { describe, expect, it } from "vitest";
import type { ProviderDetail } from "@/types/provider";
import { buildProviderDisplayStats } from "./provider-stats";

const baseProvider: ProviderDetail = {
  id: "1",
  slug: "example",
  name: "Example Provider",
  type: "university",
  location: "Toronto",
  rating: 4.5,
};

describe("buildProviderDisplayStats", () => {
  it("uses provider stats when present", () => {
    const stats = buildProviderDisplayStats(
      {
        ...baseProvider,
        stats: [{ label: "World ranking", value: "#21" }],
      },
      "university",
    );

    expect(stats).toEqual([{ label: "World ranking", value: "#21" }]);
  });

  it("returns university-specific fallback stat labels", () => {
    const stats = buildProviderDisplayStats(baseProvider, "university");

    expect(stats.map((stat) => stat.label)).toEqual(
      expect.arrayContaining(["Location", "Rating"]),
    );
  });

  it("returns clinic-specific fallback stat labels", () => {
    const stats = buildProviderDisplayStats(
      { ...baseProvider, type: "clinic" },
      "clinic",
    );

    expect(stats.map((stat) => stat.label)).toEqual(
      expect.arrayContaining(["Location", "Success rate focus"]),
    );
  });
});
