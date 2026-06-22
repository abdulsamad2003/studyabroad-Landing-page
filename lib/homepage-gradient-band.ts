import type { HomeSectionName } from "./homepage-sections";

export const HOME_GRADIENT_BAND_START: HomeSectionName = "StatsBar";

/** Last section included in the band — CTABanner when present, otherwise FAQs. */
const HOME_GRADIENT_BAND_END_CANDIDATES: HomeSectionName[] = [
  "CTABanner",
  "FAQs",
];

export type HomepageSectionGroup =
  | { type: "section"; name: HomeSectionName }
  | { type: "gradient-band"; sections: HomeSectionName[] };

function resolveBandEndIndex(sections: HomeSectionName[]): number {
  let endIdx = -1;

  for (const name of HOME_GRADIENT_BAND_END_CANDIDATES) {
    const idx = sections.indexOf(name);
    if (idx > endIdx) {
      endIdx = idx;
    }
  }

  return endIdx;
}

/**
 * Groups homepage sections from StatsBar through CTABanner (or FAQs) into one
 * gradient band so the background is seamless behind stats, content, and CTA.
 */
export function groupHomepageSections(
  sections: HomeSectionName[],
): HomepageSectionGroup[] {
  const startIdx = sections.indexOf(HOME_GRADIENT_BAND_START);
  const endIdx = resolveBandEndIndex(sections);

  if (startIdx === -1 || endIdx === -1 || startIdx > endIdx) {
    return sections.map((name) => ({ type: "section", name }));
  }

  const groups: HomepageSectionGroup[] = [];

  if (startIdx > 0) {
    groups.push(
      ...sections.slice(0, startIdx).map((name) => ({ type: "section" as const, name })),
    );
  }

  groups.push({
    type: "gradient-band",
    sections: sections.slice(startIdx, endIdx + 1),
  });

  if (endIdx + 1 < sections.length) {
    groups.push(
      ...sections.slice(endIdx + 1).map((name) => ({ type: "section" as const, name })),
    );
  }

  return groups;
}
