import { describe, expect, it } from "vitest";
import {
  isArticleInDomain,
  normalizeBlogArticleResponse,
} from "./blog-api";

describe("normalizeBlogArticleResponse", () => {
  it("returns article when API includes data", () => {
    const article = normalizeBlogArticleResponse({
      success: true,
      data: {
        id: "1",
        slug: "visa-guide",
        title: "Student visa guide",
        content: "Full article body",
        domainId: "studyabroad",
      },
    });

    expect(article?.title).toBe("Student visa guide");
    expect(article?.domainId).toBe("studyabroad");
  });

  it("returns null when API body has no article data", () => {
    expect(normalizeBlogArticleResponse(null)).toBeNull();
    expect(normalizeBlogArticleResponse({ success: true })).toBeNull();
  });
});

describe("isArticleInDomain", () => {
  it("accepts article when domainId matches active domain", () => {
    expect(
      isArticleInDomain(
        {
          id: "1",
          slug: "guide",
          title: "Guide",
          domainId: "ivf",
        },
        "ivf",
      ),
    ).toBe(true);
  });

  it("rejects article when domainId does not match active domain", () => {
    expect(
      isArticleInDomain(
        {
          id: "1",
          slug: "guide",
          title: "Guide",
          domainId: "studyabroad",
        },
        "ivf",
      ),
    ).toBe(false);
  });
});
