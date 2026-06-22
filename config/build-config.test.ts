import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getBuildTimeDomainConfig,
  getBuildTimeDomainId,
} from "./build-config";

describe("getBuildTimeDomainId", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns studyabroad when NEXT_PUBLIC_DOMAIN is studyabroad", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "studyabroad");

    expect(getBuildTimeDomainId()).toBe("studyabroad");
  });

  it("returns ivf when NEXT_PUBLIC_DOMAIN is ivf", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "ivf");

    expect(getBuildTimeDomainId()).toBe("ivf");
  });

  it("defaults to studyabroad when NEXT_PUBLIC_DOMAIN is unset", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "");

    expect(getBuildTimeDomainId()).toBe("studyabroad");
  });
});

describe("getBuildTimeDomainConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns studyabroad branding for studyabroad builds", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "studyabroad");

    expect(getBuildTimeDomainConfig().name).toBe("Study Abroad");
    expect(getBuildTimeDomainConfig().providerType).toBe("university");
  });

  it("returns ivf branding for ivf builds", () => {
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "ivf");

    expect(getBuildTimeDomainConfig().name).toBe("IVF Guide");
    expect(getBuildTimeDomainConfig().providerType).toBe("clinic");
  });
});
