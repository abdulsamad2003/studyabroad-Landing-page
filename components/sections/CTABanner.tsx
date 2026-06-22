import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import Button from "@/components/ui/Button";

type CTABannerProps = {
  config: DomainConfig;
};

export default function CTABanner({ config }: CTABannerProps) {
  const content = getHomepageContent(config.id).ctaBanner;

  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="overflow-hidden rounded-2xl px-8 py-10 shadow-lg md:px-10 md:py-12"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor ?? config.primaryColor} 100%)`,
          }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_280px] lg:gap-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/85">
                {content.eyebrow}
              </p>
              <h2 className="mt-3 font-semibold tracking-tight text-white">
                {content.heading}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/90">
                {content.subheading}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80">
                {content.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <Link href={content.ctaHref} className="block">
                <Button className="w-full">{content.ctaLabel}</Button>
              </Link>
              <Link
                href={content.secondaryCtaHref}
                className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm font-medium transition-colors hover:gap-2"
                style={{ color: config.primaryColor }}
              >
                {content.secondaryCtaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
