import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Building2, Globe2, GraduationCap, Heart, Sparkles, TrendingUp } from "lucide-react";
import type { DomainConfig, DomainId } from "@/config/types";
import { getHomepageAssets } from "@/lib/homepage-assets";

type StatsBarProps = {
  config: DomainConfig;
};

const statIcons: Record<DomainId, LucideIcon[]> = {
  studyabroad: [GraduationCap, Building2, Globe2, Sparkles],
  ivf: [Building2, Heart, TrendingUp, BadgeCheck],
};

export default function StatsBar({ config }: StatsBarProps) {
  const stats = getHomepageAssets(config.id).stats;
  const icons = statIcons[config.id];

  return (
    <section className="relative z-20 -mt-16 px-4 pb-10 md:-mt-20 md:pb-14">
      <div className="mx-auto max-w-6xl">
        <div
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50"
          style={{ borderTopWidth: "3px", borderTopColor: config.primaryColor }}
        >
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 md:grid-cols-4 md:divide-y-0">
            {stats.map((stat, index) => {
              const Icon = icons[index];

              return (
                <div
                  key={stat.label}
                  className="flex items-start gap-4 px-5 py-6 md:px-6 md:py-8"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${config.primaryColor} 12%, white)`,
                      color: config.primaryColor,
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem]">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-snug text-slate-500">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
