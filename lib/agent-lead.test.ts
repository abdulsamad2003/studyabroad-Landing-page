import { describe, expect, it } from "vitest";
import { buildLeadPayload } from "./lead-payload";
import { buildAgentLeadSource } from "./agent-lead";

describe("buildAgentLeadSource", () => {
  it("builds an agent-scoped lead source from slug", () => {
    expect(buildAgentLeadSource("imperial-consultancy")).toBe(
      "agent:imperial-consultancy",
    );
  });

  it("includes agentSlug and domainId in agent page lead payload", () => {
    const payload = buildLeadPayload({
      domainId: "studyabroad",
      formValues: {
        name: "Rahul",
        email: "rahul@example.com",
        phone: "9876543210",
      },
      source: buildAgentLeadSource("imperial-consultancy"),
      agentSlug: "imperial-consultancy",
    });

    expect(payload).toMatchObject({
      domainId: "studyabroad",
      source: "agent:imperial-consultancy",
      agentSlug: "imperial-consultancy",
    });
  });
});
