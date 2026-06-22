import { describe, expect, it } from "vitest";
import { studyAbroadConfig } from "@/config/domains/studyabroad";
import {
  buildBlogArticleMetadata,
  buildBlogListingMetadata,
} from "./blog-seo";

describe("buildBlogListingMetadata", () => {
  it("uses domain config SEO for the listing page", () => {
    const metadata = buildBlogListingMetadata(studyAbroadConfig);

    expect(metadata.title).toContain("Study Abroad");
    expect(metadata.description).toBe(studyAbroadConfig.seo.description);
  });
});

describe("buildBlogArticleMetadata", () => {
  it("uses article title and excerpt for article metadata", () => {
    const metadata = buildBlogArticleMetadata(
      {
        id: "1",
        slug: "visa-guide",
        title: "Student visa checklist",
        excerpt: "Everything you need before applying.",
      },
      studyAbroadConfig,
    );

    expect(metadata.title).toContain("Student visa checklist");
    expect(metadata.description).toBe("Everything you need before applying.");
  });
});
