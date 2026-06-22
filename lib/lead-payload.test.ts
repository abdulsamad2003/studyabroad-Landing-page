import { describe, expect, it } from "vitest";
import { studyAbroadConfig } from "@/config/domains/studyabroad";
import { ivfConfig } from "@/config/domains/ivf";
import { buildLeadPayload } from "./lead-payload";

describe("buildLeadPayload", () => {
  it("always includes domainId from config", () => {
    const payload = buildLeadPayload({
      domainId: "studyabroad",
      formValues: { name: "Rahul", email: "rahul@example.com", phone: "9876543210" },
    });

    expect(payload.domainId).toBe("studyabroad");
  });

  it("merges influencer slug, UTM params, agentSlug, and source when present", () => {
    const payload = buildLeadPayload({
      domainId: "ivf",
      formValues: { name: "Priya", email: "priya@example.com", phone: "9123456780" },
      source: "apply",
      influencerSlug: "dr-sharma",
      agentSlug: "fertility-hub",
      utm: { utm_source: "instagram", utm_campaign: "spring" },
    });

    expect(payload).toMatchObject({
      domainId: "ivf",
      source: "apply",
      influencerSlug: "dr-sharma",
      agentSlug: "fertility-hub",
      utm_source: "instagram",
      utm_campaign: "spring",
    });
  });

  it("includes studyabroad domain-specific form fields", () => {
    const formValues = Object.fromEntries(
      studyAbroadConfig.leadFormFields.map((field) => [field, `${field}-value`]),
    );

    const payload = buildLeadPayload({
      domainId: studyAbroadConfig.id,
      formValues,
    });

    expect(payload).toMatchObject({
      domainId: "studyabroad",
      targetCountry: "targetCountry-value",
      intake: "intake-value",
    });
  });

  it("includes ivf domain-specific form fields", () => {
    const formValues = Object.fromEntries(
      ivfConfig.leadFormFields.map((field) => [field, `${field}-value`]),
    );

    const payload = buildLeadPayload({
      domainId: ivfConfig.id,
      formValues,
    });

    expect(payload).toMatchObject({
      domainId: "ivf",
      age: "age-value",
      city: "city-value",
    });
  });
});
