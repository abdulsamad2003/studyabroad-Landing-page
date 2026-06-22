import { describe, expect, it } from "vitest";
import { buildToolSchema } from "./tool-validation";

describe("buildToolSchema", () => {
  it("rejects missing required tool inputs", () => {
    const schema = buildToolSchema([
      { name: "ielts", label: "IELTS score", type: "number" },
      { name: "country", label: "Target country", type: "select", options: ["Canada"] },
    ]);

    const result = schema.safeParse({ ielts: "", country: "" });
    expect(result.success).toBe(false);
  });

  it("accepts valid tool inputs", () => {
    const schema = buildToolSchema([
      { name: "age", label: "Age", type: "number" },
      { name: "attempts", label: "Previous IVF attempts", type: "number" },
    ]);

    const result = schema.safeParse({ age: "32", attempts: "1" });
    expect(result.success).toBe(true);
  });
});
