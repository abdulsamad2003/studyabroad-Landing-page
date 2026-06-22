import { describe, expect, it } from "vitest";
import { runIvfEligibility } from "./eligibility";

describe("runIvfEligibility", () => {
  it("returns success likelihood and recommended clinic tier", () => {
    const result = runIvfEligibility({
      age: 32,
      amh: 2.4,
      attempts: 0,
    });

    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Success likelihood" }),
        expect.objectContaining({ label: "Recommended clinic tier" }),
      ]),
    );
  });

  it("recommends specialist tier for advanced maternal age", () => {
    const result = runIvfEligibility({
      age: 43,
      amh: 0.8,
      attempts: 2,
    });

    const clinicTier = result.items?.find(
      (item) => item.label === "Recommended clinic tier",
    );

    expect(clinicTier?.value).toBe("Specialist");
    expect(result.items?.find((item) => item.label === "Success likelihood")?.value).toBe(
      "Lower",
    );
  });
});
