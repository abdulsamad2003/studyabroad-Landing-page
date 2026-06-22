import { getDomainConfig } from "@/config";
import { fetchBlogArticles } from "@/lib/blog-api";
import { buildBlogListingMetadata } from "@/lib/blog-seo";
import BlogListing from "@/components/blog/BlogListing";

export const revalidate = 86400;

export async function generateMetadata() {
  const config = await getDomainConfig();
  return buildBlogListingMetadata(config);
}

export default async function BlogPage() {
  const config = await getDomainConfig();
  const articles = await fetchBlogArticles(config.id);

  return <BlogListing config={config} articles={articles} />;
}
