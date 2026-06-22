import { describe, expect, it } from "vitest";
import { runToolLogic } from "./registry";

describe("runToolLogic", () => {
  it("dispatches studyabroad eligibility logic", () => {
    const result = runToolLogic("studyabroad", "eligibility", {
      ielts: 7,
      gpa: 3.4,
      country: "Australia",
      budget: 30000,
    });

    expect(result.items?.some((item) => item.tier === "safe")).toBe(true);
  });

  it("dispatches ivf eligibility logic", () => {
    const result = runToolLogic("ivf", "eligibility", {
      age: 34,
      amh: 1.8,
      attempts: 1,
    });

    expect(result.items?.find((item) => item.label === "Success likelihood")?.value).toBe(
      "Moderate",
    );
  });

  it("dispatches studyabroad calculator logic", () => {
    const result = runToolLogic("studyabroad", "calculator", {
      tuition: 20000,
      living: 10000,
      visa: 400,
    });

    expect(result.items?.find((item) => item.label === "Total estimate")?.value).toBe(
      "$30,400",
    );
  });

  it("dispatches ivf predictor logic", () => {
    const result = runToolLogic("ivf", "predictor", {
      age: 39,
      amh: 0.7,
      previousAttempts: 2,
    });

    expect(
      result.items?.find((item) => item.label === "Estimated cycles to success")?.value,
    ).toBe("3+ cycles");
  });
});
