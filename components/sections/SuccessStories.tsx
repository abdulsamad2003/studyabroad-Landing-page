import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageAssets } from "@/lib/homepage-assets";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";

type SuccessStoriesProps = {
  config: DomainConfig;
};

export default function SuccessStories({ config }: SuccessStoriesProps) {
  const content = getHomepageContent(config.id).successStories;
  const fallbackImage = getHomepageAssets(config.id).heroImage;
  const gridClass =
    content.stories.length >= 4
      ? "grid gap-6 md:grid-cols-2"
      : "grid gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      subheading={content.subheading}
    >
      <div className={gridClass}>
        {content.stories.map((story) => (
          <article
            key={story.title}
            className="group relative h-80 overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm"
          >
            <Image
              src={story.image ?? fallbackImage}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/15" />

            <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
              {story.year && (
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {story.year}
                </span>
              )}
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                Success story
              </span>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                    {story.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
                    {story.description}
                  </p>
                </div>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm"
                  aria-hidden
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
