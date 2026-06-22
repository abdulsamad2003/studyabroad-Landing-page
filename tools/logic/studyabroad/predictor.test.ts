import { describe, expect, it } from "vitest";
import { runStudyAbroadPredictor } from "./predictor";

describe("runStudyAbroadPredictor", () => {
  it("returns readiness score and recommended application window", () => {
    const result = runStudyAbroadPredictor({
      ielts: 7,
      gpa: 3.5,
      monthsUntilIntake: 8,
    });

    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Readiness score" }),
        expect.objectContaining({ label: "Recommended window" }),
      ]),
    );
  });
});
