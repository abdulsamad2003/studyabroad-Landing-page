import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import Card from "@/components/ui/Card";
import SectionShell from "./SectionShell";

type IntakeTimelineProps = {
  config: DomainConfig;
};

export default function IntakeTimeline({ config }: IntakeTimelineProps) {
  const content = getHomepageContent(config.id).intakeTimeline;

  if (!content) {
    return null;
  }

  return (
    <SectionShell heading={content.heading}>
      <div className="grid gap-4 md:grid-cols-3">
        {content.intakes.map((window) => (
          <Card key={window.intake}>
            <p className="text-sm font-medium text-slate-500">Intake</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
              {window.intake}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Apply by <span className="font-medium text-slate-900">{window.deadline}</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">{window.note}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
