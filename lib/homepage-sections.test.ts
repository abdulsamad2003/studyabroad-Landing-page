import { describe, expect, it } from "vitest";
import { ivfConfig } from "@/config/domains/ivf";
import { studyAbroadConfig } from "@/config/domains/studyabroad";
import { resolveHomepageSections } from "./homepage-sections";

describe("resolveHomepageSections", () => {
  it("keeps only known section names in config order", () => {
    expect(
      resolveHomepageSections([
        "Hero",
        "UnknownSection",
        "QuickMatcher",
        "AlsoUnknown",
      ]),
    ).toEqual(["Hero", "QuickMatcher"]);
  });

  it("includes IntakeTimeline for studyabroad config", () => {
    expect(resolveHomepageSections(studyAbroadConfig.sections)).toContain(
      "IntakeTimeline",
    );
  });

  it("omits IntakeTimeline for ivf config", () => {
    expect(resolveHomepageSections(ivfConfig.sections)).not.toContain(
      "IntakeTimeline",
    );
  });
});
