import { describe, expect, it } from "vitest";
import {
  buildExploreHref,
  isHostAllowed,
  isProviderTypeValidForDomain,
} from "./domain-guards";

describe("isProviderTypeValidForDomain", () => {
  it("allows matching provider type for the domain", () => {
    expect(isProviderTypeValidForDomain("university", "university")).toBe(true);
  });

  it("rejects cross-domain provider type", () => {
    expect(isProviderTypeValidForDomain("clinic", "university")).toBe(false);
  });
});

describe("isHostAllowed", () => {
  const allowed = ["studyabroad.ai", "www.studyabroad.ai", "localhost"];

  it("allows listed host without port", () => {
    expect(isHostAllowed("studyabroad.ai", allowed)).toBe(true);
  });

  it("allows listed host with port", () => {
    expect(isHostAllowed("localhost:3000", allowed)).toBe(true);
  });

  it("rejects host not on allowlist", () => {
    expect(isHostAllowed("ivfguide.com", allowed)).toBe(false);
  });

  it("rejects missing host", () => {
    expect(isHostAllowed(null, allowed)).toBe(false);
  });

  it("allows vercel preview hosts when enabled", () => {
    expect(
      isHostAllowed("sayy-studyabroad-abc123.vercel.app", allowed, {
        allowVercelPreview: true,
      }),
    ).toBe(true);
  });
});

describe("buildExploreHref", () => {
  it("builds explore path from provider type", () => {
    expect(buildExploreHref("university")).toBe("/explore/university");
  });
});
