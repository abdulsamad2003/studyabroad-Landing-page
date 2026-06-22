import { describe, expect, it } from "vitest";
import { buildLeadPayload } from "./lead-payload";
import { buildProviderLeadSource } from "./provider-lead";

describe("buildProviderLeadSource", () => {
  it("builds a provider-scoped lead source from slug", () => {
    expect(buildProviderLeadSource("toronto")).toBe("provider:toronto");
  });

  it("includes domainId and provider source in lead payload", () => {
    const payload = buildLeadPayload({
      domainId: "studyabroad",
      formValues: {
        name: "Rahul",
        email: "rahul@example.com",
        phone: "9876543210",
      },
      source: buildProviderLeadSource("toronto"),
    });

    expect(payload).toMatchObject({
      domainId: "studyabroad",
      source: "provider:toronto",
    });
  });
});
