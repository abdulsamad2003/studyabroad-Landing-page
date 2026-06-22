import { describe, expect, it } from "vitest";
import { isInfluencerInDomain, normalizeInfluencerResponse } from "./influencer-api";

describe("normalizeInfluencerResponse", () => {
  it("returns influencer when API includes active influencer data", () => {
    const influencer = normalizeInfluencerResponse({
      success: true,
      data: {
        id: "1",
        slug: "dr-sharma",
        category: "ivf",
        isActive: true,
      },
    });

    expect(influencer?.slug).toBe("dr-sharma");
    expect(influencer?.category).toBe("ivf");
  });

  it("returns null for inactive or missing influencer data", () => {
    expect(normalizeInfluencerResponse(null)).toBeNull();
    expect(
      normalizeInfluencerResponse({
        success: true,
        data: {
          id: "1",
          slug: "inactive",
          category: "studyabroad",
          isActive: false,
        },
      }),
    ).toBeNull();
  });
});

describe("isInfluencerInDomain", () => {
  it("accepts influencer when category matches active domain", () => {
    expect(
      isInfluencerInDomain(
        {
          id: "1",
          slug: "dr-sharma",
          category: "ivf",
          isActive: true,
        },
        "ivf",
      ),
    ).toBe(true);
  });

  it("rejects influencer when category does not match active domain", () => {
    expect(
      isInfluencerInDomain(
        {
          id: "1",
          slug: "dr-sharma",
          category: "studyabroad",
          isActive: true,
        },
        "ivf",
      ),
    ).toBe(false);
  });
});
