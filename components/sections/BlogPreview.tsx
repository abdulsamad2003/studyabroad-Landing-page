import { Suspense } from "react";
import Link from "next/link";
import type { DomainConfig } from "@/config/types";
import { fetchBlogPreview } from "@/lib/homepage-api";
import { getHomepageContent } from "@/lib/homepage-content";
import Card from "@/components/ui/Card";
import PreviewEmptyState from "./PreviewEmptyState";
import PreviewSkeleton from "./PreviewSkeleton";
import SectionShell from "./SectionShell";

type BlogPreviewProps = {
  config: DomainConfig;
};

async function BlogPreviewContent({ config }: BlogPreviewProps) {
  const content = getHomepageContent(config.id).blogPreview;
  const posts = await fetchBlogPreview(config.id);

  if (posts.length === 0) {
    return <PreviewEmptyState message={content.emptyMessage} />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <Card className="h-full transition-shadow hover:shadow-md">
            <h3 className="font-semibold tracking-tight text-slate-900">{post.title}</h3>
            {post.excerpt && (
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {post.excerpt}
              </p>
            )}
            {post.publishedAt && (
              <p className="mt-3 text-xs text-slate-500">{post.publishedAt}</p>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function BlogPreview({ config }: BlogPreviewProps) {
  const content = getHomepageContent(config.id).blogPreview;

  return (
    <SectionShell heading={content.heading}>
      <Suspense fallback={<PreviewSkeleton label="Loading blog previews..." />}>
        <BlogPreviewContent config={config} />
      </Suspense>
      <div className="mt-6">
        <Link
          href="/blog"
          className="text-sm font-medium text-accent transition-colors hover:underline"
        >
          Read all articles →
        </Link>
      </div>
    </SectionShell>
  );
}
