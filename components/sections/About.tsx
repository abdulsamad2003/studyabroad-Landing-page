import { Check } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";

type AboutProps = {
  config: DomainConfig;
};

export default function About({ config }: AboutProps) {
  const content = getHomepageContent(config.id).about;

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      variant="transparent"
      compact
    >
      <div className="max-w-3xl space-y-4">
        {content.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="text-[0.9375rem] leading-7 text-slate-600 md:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="mt-8 grid gap-x-10 gap-y-3.5 sm:grid-cols-2 lg:mt-10">
        {content.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <Check
              className="mt-1 h-4 w-4 shrink-0"
              style={{ color: config.primaryColor }}
              strokeWidth={2.5}
              aria-hidden
            />
            <span className="text-sm leading-relaxed text-slate-700">{point}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
