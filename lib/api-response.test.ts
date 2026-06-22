import { describe, expect, it } from "vitest";
import { normalizeListResponse } from "./api-response";

type Item = { id: string; name: string };

describe("normalizeListResponse", () => {
  it("returns an empty array when API body has no data", () => {
    expect(normalizeListResponse<Item>(null)).toEqual([]);
    expect(normalizeListResponse<Item>({ success: true })).toEqual([]);
  });

  it("returns list items when API body includes a data array", () => {
    expect(
      normalizeListResponse<Item>({
        success: true,
        data: [{ id: "1", name: "Example" }],
      }),
    ).toEqual([{ id: "1", name: "Example" }]);
  });
});
