import { describe, expect, it } from "vitest";
import { buildDomainApiUrl } from "./domain-api";

describe("buildDomainApiUrl", () => {
  it("appends category query param from domainId", () => {
    expect(
      buildDomainApiUrl("http://localhost:4000/api", "/blog", "studyabroad"),
    ).toBe("http://localhost:4000/api/blog?category=studyabroad");
  });

  it("preserves existing query params", () => {
    expect(
      buildDomainApiUrl(
        "http://localhost:4000/api",
        "/agents/slug/foo?active=true",
        "ivf",
      ),
    ).toBe("http://localhost:4000/api/agents/slug/foo?active=true&category=ivf");
  });
});
