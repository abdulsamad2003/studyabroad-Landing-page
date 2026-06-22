import { describe, expect, it } from "vitest";
import { isAgentInDomain, normalizeAgentResponse } from "./agent-api";

describe("normalizeAgentResponse", () => {
  it("returns agent when API includes active agent data", () => {
    const agent = normalizeAgentResponse({
      success: true,
      data: {
        id: "1",
        slug: "imperial-consultancy",
        businessName: "Imperial Consultancy",
        logo: "/logo.png",
        primaryColor: "#2563eb",
        agentId: "agent-1",
        greeting: "Hello",
        tagline: "Your study abroad partner",
        leadFormFields: ["name", "email", "phone"],
        category: "studyabroad",
        isActive: true,
      },
    });

    expect(agent?.slug).toBe("imperial-consultancy");
    expect(agent?.businessName).toBe("Imperial Consultancy");
  });

  it("returns null for inactive or missing agent data", () => {
    expect(normalizeAgentResponse(null)).toBeNull();
    expect(
      normalizeAgentResponse({
        success: true,
        data: {
          id: "1",
          slug: "inactive",
          businessName: "Inactive",
          logo: "",
          primaryColor: "#000",
          agentId: "a",
          greeting: "",
          tagline: "",
          leadFormFields: [],
          category: "studyabroad",
          isActive: false,
        },
      }),
    ).toBeNull();
  });
});

describe("isAgentInDomain", () => {
  it("accepts agent when category matches active domain", () => {
    expect(
      isAgentInDomain(
        {
          id: "1",
          slug: "agent",
          businessName: "Agent",
          logo: "",
          primaryColor: "#000",
          agentId: "a",
          greeting: "",
          tagline: "",
          leadFormFields: [],
          category: "ivf",
          isActive: true,
        },
        "ivf",
      ),
    ).toBe(true);
  });

  it("rejects agent when category does not match active domain", () => {
    expect(
      isAgentInDomain(
        {
          id: "1",
          slug: "agent",
          businessName: "Agent",
          logo: "",
          primaryColor: "#000",
          agentId: "a",
          greeting: "",
          tagline: "",
          leadFormFields: [],
          category: "studyabroad",
          isActive: true,
        },
        "ivf",
      ),
    ).toBe(false);
  });
});
