import { describe, expect, it } from "vitest";
import { runIvfPredictor } from "./predictor";

describe("runIvfPredictor", () => {
  it("returns estimated cycles and treatment start recommendation", () => {
    const result = runIvfPredictor({
      age: 36,
      amh: 1.6,
      previousAttempts: 1,
    });

    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Estimated cycles to success" }),
        expect.objectContaining({ label: "Recommended start" }),
      ]),
    );
  });

  it("recommends earlier start for lower ovarian reserve", () => {
    const result = runIvfPredictor({
      age: 39,
      amh: 0.7,
      previousAttempts: 2,
    });

    expect(
      result.items?.find((item) => item.label === "Estimated cycles to success")?.value,
    ).toBe("3+ cycles");
    expect(
      result.items?.find((item) => item.label === "Recommended start")?.value,
    ).toContain("within 4 weeks");
  });
});
