import { describe, expect, it } from "vitest";
import { getHomepageContent, hasIntakeTimeline } from "./homepage-content";

describe("getHomepageContent", () => {
  it("includes intake timeline content for studyabroad only", () => {
    expect(hasIntakeTimeline("studyabroad")).toBe(true);
    expect(hasIntakeTimeline("ivf")).toBe(false);
  });

  it("returns domain-specific provider listing headings", () => {
    expect(getHomepageContent("studyabroad").providerListing.heading).toBe(
      "Featured universities",
    );
    expect(getHomepageContent("ivf").providerListing.heading).toBe(
      "Featured clinics",
    );
  });
});
