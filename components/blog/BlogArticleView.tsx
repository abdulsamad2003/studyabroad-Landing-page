import Link from "next/link";
import type { DomainConfig } from "@/config/types";
import type { BlogArticle } from "@/types/blog";
import Card from "@/components/ui/Card";

type BlogArticleViewProps = {
  config: DomainConfig;
  article: BlogArticle;
};

export default function BlogArticleView({
  config,
  article,
}: BlogArticleViewProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <Link
        href="/blog"
        className="text-sm font-medium text-accent transition-colors hover:underline"
      >
        ← Back to blog
      </Link>

      <article className="mt-8">
        <p className="page-eyebrow">{config.name}</p>
        <h1 className="mt-2 font-semibold tracking-tight text-slate-900">
          {article.title}
        </h1>

        {(article.publishedAt || article.author) && (
          <p className="mt-3 text-sm text-slate-500">
            {[article.publishedAt, article.author].filter(Boolean).join(" · ")}
          </p>
        )}

        <Card className="mt-8">
          <div className="prose-content max-w-none">
            {article.content ? (
              article.content.split("\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            ) : (
              <p>
                {article.excerpt ??
                  "Full article content will appear here once available from the backend."}
              </p>
            )}
          </div>
        </Card>
      </article>
    </main>
  );
}
