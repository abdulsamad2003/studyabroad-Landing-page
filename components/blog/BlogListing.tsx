import Link from "next/link";
import type { DomainConfig } from "@/config/types";
import type { BlogArticle } from "@/types/blog";
import Card from "@/components/ui/Card";

type BlogEmptyStateProps = {
  config: DomainConfig;
};

export function BlogEmptyState({ config }: BlogEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <p className="text-lg font-medium text-slate-900">No articles yet</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        New guides and articles for {config.name} will appear here soon.
      </p>
    </div>
  );
}

type BlogListingProps = {
  config: DomainConfig;
  articles: BlogArticle[];
};

export default function BlogListing({ config, articles }: BlogListingProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="page-eyebrow">{config.name}</p>
        <h1 className="mt-2 font-semibold tracking-tight text-slate-900">Blog</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {config.seo.description}
        </p>
      </div>

      {articles.length === 0 ? (
        <BlogEmptyState config={config} />
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <Card className="transition-shadow hover:shadow-md">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {article.excerpt}
                  </p>
                )}
                {article.publishedAt && (
                  <p className="mt-3 text-xs text-slate-500">{article.publishedAt}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
