import { afterEach, describe, expect, it, vi } from "vitest";
import { getDomainConfigsRecord, resolveDomainId } from "./index";

describe("getDomainConfigsRecord", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("loads all domain configs in development", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(Object.keys(getDomainConfigsRecord()).sort()).toEqual([
      "ivf",
      "studyabroad",
    ]);
  });

  it("loads only studyabroad config in a production studyabroad build", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "studyabroad");

    const configs = getDomainConfigsRecord();

    expect(Object.keys(configs)).toEqual(["studyabroad"]);
    expect(configs.ivf).toBeUndefined();
  });

  it("loads only ivf config in a production ivf build", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "ivf");

    const configs = getDomainConfigsRecord();

    expect(Object.keys(configs)).toEqual(["ivf"]);
    expect(configs.studyabroad).toBeUndefined();
  });
});

describe("resolveDomainId", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses baked domain id in production regardless of request host", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_DOMAIN", "ivf");

    expect(resolveDomainId("studyabroad.ai")).toBe("ivf");
    expect(resolveDomainId("ivfguide.com")).toBe("ivf");
  });
});
