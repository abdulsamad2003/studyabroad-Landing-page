import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";

type CategoryCardsProps = {
  config: DomainConfig;
};

export default function CategoryCards({ config }: CategoryCardsProps) {
  const content = getHomepageContent(config.id).categories;

  return (
    <SectionShell
      heading={content.heading}
      subheading={content.subheading}
      variant="transparent"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {content.items.map((item) => (
          <Link key={item.title} href={item.href} className="group">
            <article className="relative h-72 overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:h-80">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-200 md:text-base">
                      {item.description}
                    </span>
                  </div>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-slate-900"
                    aria-hidden
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
