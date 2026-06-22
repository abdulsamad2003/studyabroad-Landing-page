import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  ClipboardCheck,
  Clock,
  LineChart,
  type LucideIcon,
  Sparkles,
} from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";

type QuickMatcherProps = {
  config: DomainConfig;
};

const toolIcons: Record<string, LucideIcon> = {
  "/tools/eligibility": ClipboardCheck,
  "/tools/calculator": Calculator,
  "/tools/predictor": LineChart,
};

const toolCtaLabels: Record<string, string> = {
  "/tools/eligibility": "Check eligibility",
  "/tools/calculator": "Calculate costs",
  "/tools/predictor": "Run predictor",
};

export default function QuickMatcher({ config }: QuickMatcherProps) {
  const content = getHomepageContent(config.id).quickMatcher;

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      subheading={content.subheading}
      variant="transparent"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {content.tools.map((tool) => {
          const Icon = toolIcons[tool.href] ?? Sparkles;
          const ctaLabel = toolCtaLabels[tool.href] ?? "Open tool";

          return (
            <Link key={tool.href} href={tool.href} className="group">
              <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-primary)_35%,white)] hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${config.primaryColor} 12%, white)`,
                      color: config.primaryColor,
                    }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    <Clock className="h-3 w-3" aria-hidden />
                    {tool.duration}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                  {tool.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {tool.description}
                </p>

                <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors group-hover:border-transparent group-hover:bg-[var(--color-primary)] group-hover:text-white">
                  {ctaLabel}
                  <ArrowRight
                    className="h-4 w-4 text-current transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </article>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
