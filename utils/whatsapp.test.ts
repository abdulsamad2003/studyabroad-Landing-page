import { describe, expect, it } from "vitest";
import { buildWhatsAppHref } from "./whatsapp";

describe("buildWhatsAppHref", () => {
  it("returns null when number is empty", () => {
    expect(buildWhatsAppHref("")).toBeNull();
  });

  it("builds wa.me link from formatted number", () => {
    expect(buildWhatsAppHref("+91 98765 43210")).toBe("https://wa.me/919876543210");
  });
});
