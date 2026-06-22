export const KNOWN_HOME_SECTIONS = [
  "Hero",
  "StatsBar",
  "About",
  "HowItWorks",
  "ProductsServices",
  "QuickMatcher",
  "CategoryCards",
  "ProviderListing",
  "SuccessStories",
  "Reviews",
  "IntakeTimeline",
  "FAQs",
  "CTABanner",
  "BlogPreview",
] as const;

export type HomeSectionName = (typeof KNOWN_HOME_SECTIONS)[number];

export function resolveHomepageSections(
  configuredSections: string[],
): HomeSectionName[] {
  const known = new Set<string>(KNOWN_HOME_SECTIONS);

  return configuredSections.filter((name): name is HomeSectionName =>
    known.has(name),
  );
}
