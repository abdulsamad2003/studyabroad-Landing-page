import type { Metadata } from "next";
import type { DomainConfig } from "@/config/types";
import type { BlogArticle } from "@/types/blog";
import { buildMetaTags, buildPageTitle } from "@/utils/seo";

export function buildBlogListingMetadata(config: DomainConfig): Metadata {
  const title = buildPageTitle(`Blog — ${config.seo.title}`, config.name);

  return buildMetaTags({
    title,
    description: config.seo.description,
    keywords: config.seo.keywords,
  });
}

export function buildBlogArticleMetadata(
  article: BlogArticle,
  config: DomainConfig,
): Metadata {
  const title = buildPageTitle(article.title, config.name);
  const description =
    article.excerpt ?? article.content?.slice(0, 160) ?? config.seo.description;

  return buildMetaTags({
    title,
    description,
    keywords: config.seo.keywords,
    ogImage: article.imageUrl,
  });
}
