import { describe, expect, it } from "vitest";
import { runStudyAbroadEligibility } from "./eligibility";

describe("runStudyAbroadEligibility", () => {
  it("returns Safe, Target, and Reach groupings", () => {
    const result = runStudyAbroadEligibility({
      ielts: 7.5,
      gpa: 3.6,
      country: "Canada",
      budget: 45000,
    });

    const tiers = result.items?.map((item) => item.tier) ?? [];
    expect(tiers).toEqual(expect.arrayContaining(["safe", "target", "reach"]));
    expect(result.summary).toContain("Canada");
  });
});
