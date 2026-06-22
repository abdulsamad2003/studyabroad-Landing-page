import { afterEach, describe, expect, it, vi } from "vitest";
import { isHostAllowed } from "./domain-guards";
import { getBuildTimeDomainConfig } from "./build-config";

describe("production host isolation", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("studyabroad build allows studyabroad hosts and rejects ivf hosts", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "studyabroad");
    const config = getBuildTimeDomainConfig();

    expect(isHostAllowed("studyabroad.ai", config.allowedHosts)).toBe(true);
    expect(isHostAllowed("www.studyabroad.ai", config.allowedHosts)).toBe(true);
    expect(isHostAllowed("ivfguide.com", config.allowedHosts)).toBe(false);
    expect(isHostAllowed("www.ivfguide.com", config.allowedHosts)).toBe(false);
  });

  it("ivf build allows ivf hosts and rejects studyabroad hosts", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "ivf");
    const config = getBuildTimeDomainConfig();

    expect(isHostAllowed("ivfguide.com", config.allowedHosts)).toBe(true);
    expect(isHostAllowed("www.ivfguide.com", config.allowedHosts)).toBe(true);
    expect(isHostAllowed("studyabroad.ai", config.allowedHosts)).toBe(false);
    expect(isHostAllowed("www.studyabroad.ai", config.allowedHosts)).toBe(false);
  });

  it("allows vercel preview hosts during smoke testing", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "studyabroad");
    const config = getBuildTimeDomainConfig();

    expect(
      isHostAllowed("sayy-studyabroad-preview.vercel.app", config.allowedHosts, {
        allowVercelPreview: true,
      }),
    ).toBe(true);
  });
});
