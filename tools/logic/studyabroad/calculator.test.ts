import { describe, expect, it } from "vitest";
import { runStudyAbroadCalculator } from "./calculator";

describe("runStudyAbroadCalculator", () => {
  it("returns tuition, living, visa fees, and total estimate", () => {
    const result = runStudyAbroadCalculator({
      tuition: 25000,
      living: 12000,
      visa: 500,
    });

    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Tuition", value: "$25,000" }),
        expect.objectContaining({ label: "Living costs", value: "$12,000" }),
        expect.objectContaining({ label: "Visa fees", value: "$500" }),
        expect.objectContaining({ label: "Total estimate", value: "$37,500" }),
      ]),
    );
  });
});
