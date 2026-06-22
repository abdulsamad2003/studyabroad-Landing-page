import type { DomainId } from "@/config/types";

export type HomepageStat = {
  value: string;
  label: string;
};

export type HomepageAssets = {
  heroImage: string;
  heroImageAlt: string;
  categoryImages: Record<string, string>;
  productImages: {
    shortlist: string;
    application: string;
    visa: string;
  };
  stats: HomepageStat[];
};

const studyAbroadAssets: HomepageAssets = {
  heroImage: "/images/studyabroad/hero.png",
  heroImageAlt: "International students on a modern university campus",
  categoryImages: {
    "United Kingdom": "/images/studyabroad/uk.png",
    Canada: "/images/studyabroad/canada.png",
    Australia: "/images/studyabroad/australia.png",
    Germany: "/images/studyabroad/germany.png",
  },
  productImages: {
    shortlist: "/images/studyabroad/uk.png",
    application: "/images/studyabroad/canada.png",
    visa: "/images/studyabroad/australia.png",
  },
  stats: [
    { value: "10,000+", label: "Students guided" },
    { value: "500+", label: "Partner universities" },
    { value: "40+", label: "Countries covered" },
    { value: "98%", label: "Satisfaction rate" },
  ],
};

const ivfAssets: HomepageAssets = {
  heroImage: "/images/ivf/hero.png",
  heroImageAlt: "Fertility specialist consulting a couple in a modern clinic",
  categoryImages: {
    "IVF cycles": "/images/ivf/ivf-cycles.png",
    "Egg freezing": "/images/ivf/egg-freezing.png",
    "IUI treatment": "/images/ivf/iui.png",
    "Donor programs": "/images/ivf/donor.png",
  },
  productImages: {
    shortlist: "/images/ivf/ivf-cycles.png",
    application: "/images/ivf/egg-freezing.png",
    visa: "/images/ivf/iui.png",
  },
  stats: [
    { value: "200+", label: "Partner clinics" },
    { value: "15,000+", label: "Families supported" },
    { value: "72%", label: "Avg. success rate" },
    { value: "Free", label: "Eligibility check" },
  ],
};

export function getHomepageAssets(domainId: DomainId): HomepageAssets {
  return domainId === "ivf" ? ivfAssets : studyAbroadAssets;
}
