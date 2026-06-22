import { describe, expect, it } from "vitest";
import { runIvfCalculator } from "./calculator";

describe("runIvfCalculator", () => {
  it("returns cycle, medication, hospital stay, and total treatment estimate", () => {
    const result = runIvfCalculator({
      cycles: 2,
      medication: 3000,
      hospitalStay: 1500,
    });

    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Treatment cycles", value: "2" }),
        expect.objectContaining({ label: "Medication", value: "$6,000" }),
        expect.objectContaining({ label: "Hospital stay", value: "$3,000" }),
        expect.objectContaining({ label: "Total estimate", value: "$16,000" }),
      ]),
    );
  });
});
