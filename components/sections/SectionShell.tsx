import type { ReactNode } from "react";

type SectionShellProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  action?: ReactNode;
  children: ReactNode;
  variant?: "default" | "muted";
  compact?: boolean;
};

export default function SectionShell({
  eyebrow,
  heading,
  subheading,
  action,
  children,
  variant = "default",
  compact = false,
}: SectionShellProps) {
  const sectionPadding = compact ? "py-12 md:py-14" : "py-20";
  const headerMargin = compact ? "mb-6" : "mb-10";

  return (
    <section
      className={
        variant === "muted"
          ? `bg-slate-50/80 ${sectionPadding}`
          : sectionPadding
      }
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`${headerMargin} flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between`}
        >
          <div className="max-w-2xl">
            {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
            <h2 className={`font-semibold tracking-tight text-slate-900 ${eyebrow ? "mt-3" : ""}`}>
              {heading}
            </h2>
            {subheading && (
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {subheading}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
