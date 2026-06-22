import { Star } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";

type ReviewsProps = {
  config: DomainConfig;
};

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function Reviews({ config }: ReviewsProps) {
  const content = getHomepageContent(config.id).reviews;

  if (!content) {
    return null;
  }

  const gridClass =
    content.items.length >= 4
      ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      : content.items.length === 3
        ? "grid gap-5 md:grid-cols-3"
        : "grid gap-5 sm:grid-cols-2";

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      variant="transparent"
      compact
    >
      <div className={gridClass}>
        {content.items.map((review) => (
          <article
            key={review.name}
            className="flex h-full flex-col rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <StarRating />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <footer className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-900">{review.name}</p>
              <p className="mt-0.5 text-xs text-slate-600">{review.credential}</p>
              <p className="mt-2 text-xs text-slate-500">{review.timeAgo}</p>
            </footer>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
