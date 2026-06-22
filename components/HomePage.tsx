import type { ComponentType } from "react";
import { getDomainConfig } from "@/config";
import type { DomainConfig } from "@/config/types";
import type { HomeSectionName } from "@/lib/homepage-sections";
import { resolveHomepageSections } from "@/lib/homepage-sections";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import StatsBar from "@/components/sections/StatsBar";
import QuickMatcher from "@/components/sections/QuickMatcher";
import CategoryCards from "@/components/sections/CategoryCards";
import HowItWorks from "@/components/sections/HowItWorks";
import ProductsServices from "@/components/sections/ProductsServices";
import ProviderListing from "@/components/sections/ProviderListing";
import SuccessStories from "@/components/sections/SuccessStories";
import Reviews from "@/components/sections/Reviews";
import IntakeTimeline from "@/components/sections/IntakeTimeline";
import CTABanner from "@/components/sections/CTABanner";
import FAQs from "@/components/sections/FAQs";
import BlogPreview from "@/components/sections/BlogPreview";

const sectionComponents: Record<
  HomeSectionName,
  ComponentType<{ config: DomainConfig }>
> = {
  Hero,
  About,
  StatsBar,
  QuickMatcher,
  CategoryCards,
  HowItWorks,
  ProductsServices,
  ProviderListing,
  SuccessStories,
  Reviews,
  IntakeTimeline,
  CTABanner,
  FAQs,
  BlogPreview,
};

export function renderHomepageSection(
  sectionName: HomeSectionName,
  config: DomainConfig,
) {
  const Section = sectionComponents[sectionName];
  return <Section key={sectionName} config={config} />;
}

export default async function HomePage() {
  const config = await getDomainConfig();
  const sections = resolveHomepageSections(config.sections);

  return (
    <>
      {sections.map((sectionName) => renderHomepageSection(sectionName, config))}
    </>
  );
}
