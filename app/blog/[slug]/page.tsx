import { notFound } from "next/navigation";
import { getDomainConfig } from "@/config";
import { fetchBlogArticleBySlug } from "@/lib/blog-api";
import { buildBlogArticleMetadata } from "@/lib/blog-seo";
import BlogArticleView from "@/components/blog/BlogArticleView";

export const revalidate = 86400;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const config = await getDomainConfig();
  const article = await fetchBlogArticleBySlug(config.id, slug);

  if (!article) {
    return { title: "Not found" };
  }

  return buildBlogArticleMetadata(article, config);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const config = await getDomainConfig();
  const article = await fetchBlogArticleBySlug(config.id, slug);

  if (!article) {
    notFound();
  }

  return <BlogArticleView config={config} article={article} />;
}
