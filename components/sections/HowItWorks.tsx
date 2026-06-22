import Image from "next/image";
import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";

type HowItWorksProps = {
  config: DomainConfig;
};

type Step = {
  title: string;
  description: string;
  image?: string;
};

function SimpleStepCard({
  step,
  index,
  primaryColor,
}: {
  step: Step;
  index: number;
  primaryColor: string;
}) {
  const stepLabel = String(index + 1).padStart(2, "0");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      {step.image && (
        <div className="relative h-36 shrink-0 border-b border-slate-100">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <span
          className="inline-flex w-fit rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {stepLabel}
        </span>
        <h3 className="mt-3 text-base font-semibold tracking-tight text-slate-900">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
      </div>
    </article>
  );
}

export default function HowItWorks({ config }: HowItWorksProps) {
  const content = getHomepageContent(config.id).howItWorks;
  const columnCount = content.steps.length;
  const gridClass =
    columnCount >= 4
      ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      : columnCount === 3
        ? "grid gap-5 md:grid-cols-3"
        : "grid gap-5 sm:grid-cols-2";

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      subheading={content.subheading}
      variant="default"
      compact
    >
      <ol className={gridClass}>
        {content.steps.map((step, index) => (
          <li key={step.title} className="h-full">
            <SimpleStepCard
              step={step}
              index={index}
              primaryColor={config.primaryColor}
            />
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
