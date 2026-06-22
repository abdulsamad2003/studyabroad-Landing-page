import type { DomainId } from "@/config/types";
import type { BlogArticle } from "@/types/blog";
import type { ApiResponse } from "@/types/api";
import { buildDomainApiUrl } from "./domain-api";
import { normalizeListResponse } from "./api-response";

export function normalizeBlogArticleResponse(body: unknown): BlogArticle | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as ApiResponse<BlogArticle>;
  const data = payload.data;

  if (!data || typeof data !== "object" || !data.slug || !data.title) {
    return null;
  }

  return data;
}

export function isArticleInDomain(
  article: BlogArticle,
  domainId: DomainId,
): boolean {
  if (!article.domainId) {
    return true;
  }

  return article.domainId === domainId;
}

function getServerApiUrl(): string {
  return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
}

export async function fetchBlogArticles(
  domainId: DomainId,
): Promise<BlogArticle[]> {
  const baseUrl = getServerApiUrl();
  if (!baseUrl) return [];

  try {
    const url = buildDomainApiUrl(baseUrl, "/blog", domainId);
    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) return [];

    const body = await response.json();
    return normalizeListResponse<BlogArticle>(body).filter((article) =>
      isArticleInDomain(article, domainId),
    );
  } catch {
    return [];
  }
}

export async function fetchBlogArticleBySlug(
  domainId: DomainId,
  slug: string,
): Promise<BlogArticle | null> {
  const baseUrl = getServerApiUrl();
  if (!baseUrl) return null;

  try {
    const url = buildDomainApiUrl(baseUrl, `/blog/${slug}`, domainId);
    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) {
      return null;
    }

    const body = await response.json();
    const article = normalizeBlogArticleResponse(body);

    if (!article || !isArticleInDomain(article, domainId)) {
      return null;
    }

    return article;
  } catch {
    return null;
  }
}
