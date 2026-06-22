import type { DomainId } from "@/config/types";
import type { BlogPost } from "@/types/blog";
import type { Provider, ProviderDetail } from "@/types/provider";

import { getHomepageAssets } from "./homepage-assets";

const studyAbroadAssets = getHomepageAssets("studyabroad");
const ivfAssets = getHomepageAssets("ivf");

const studyAbroadProviders: Provider[] = [
  {
    id: "dummy-uom",
    slug: "university-of-manchester",
    name: "University of Manchester",
    type: "university",
    location: "Manchester, UK",
    description:
      "Russell Group university with strong engineering, business, and life sciences programs.",
    rating: 4.8,
    imageUrl: studyAbroadAssets.categoryImages["United Kingdom"],
  },
  {
    id: "dummy-uot",
    slug: "university-of-toronto",
    name: "University of Toronto",
    type: "university",
    location: "Toronto, Canada",
    description:
      "Canada's top-ranked research university with co-op options and post-study work pathways.",
    rating: 4.7,
    imageUrl: studyAbroadAssets.categoryImages.Canada,
  },
  {
    id: "dummy-unsw",
    slug: "unsw-sydney",
    name: "UNSW Sydney",
    type: "university",
    location: "Sydney, Australia",
    description:
      "Globally recognised degrees in technology, design, and business with strong employability.",
    rating: 4.6,
    imageUrl: studyAbroadAssets.categoryImages.Australia,
  },
];

const ivfProviders: Provider[] = [
  {
    id: "dummy-bloom",
    slug: "bloom-fertility-centre",
    name: "Bloom Fertility Centre",
    type: "clinic",
    location: "Mumbai, India",
    description:
      "High-volume IVF clinic with transparent pricing, donor programs, and personalised planning.",
    rating: 4.9,
    imageUrl: ivfAssets.categoryImages["IVF cycles"],
  },
  {
    id: "dummy-nova",
    slug: "nova-reproductive-health",
    name: "Nova Reproductive Health",
    type: "clinic",
    location: "Bengaluru, India",
    description:
      "Egg freezing, IUI, and advanced IVF with published success-rate reporting.",
    rating: 4.8,
    imageUrl: ivfAssets.categoryImages["Egg freezing"],
  },
  {
    id: "dummy-harbor",
    slug: "harbor-fertility-institute",
    name: "Harbor Fertility Institute",
    type: "clinic",
    location: "Hyderabad, India",
    description:
      "Multidisciplinary team for IVF, surrogacy guidance, and second-opinion consultations.",
    rating: 4.7,
    imageUrl: ivfAssets.categoryImages["IUI treatment"],
  },
];

const studyAbroadBlogPosts: BlogPost[] = [
  {
    id: "dummy-sa-1",
    slug: "uk-student-visa-2026-checklist",
    title: "UK student visa checklist for 2026 intakes",
    excerpt:
      "Documents, financial proof, and CAS timelines every Indian applicant should prepare before applying.",
    publishedAt: "May 2026",
  },
  {
    id: "dummy-sa-2",
    slug: "compare-tuition-canada-vs-uk",
    title: "Canada vs UK: how to compare total tuition and living costs",
    excerpt:
      "A practical framework for families evaluating one-year masters programs across both destinations.",
    publishedAt: "April 2026",
  },
  {
    id: "dummy-sa-3",
    slug: "safe-reach-dream-universities",
    title: "Building a safe, reach, and dream university shortlist",
    excerpt:
      "Use eligibility signals and admission odds to balance ambition with realistic backup options.",
    publishedAt: "March 2026",
  },
];

const ivfBlogPosts: BlogPost[] = [
  {
    id: "dummy-ivf-1",
    slug: "first-ivf-cycle-what-to-expect",
    title: "Your first IVF cycle: what to expect week by week",
    excerpt:
      "From baseline scans to embryo transfer — a plain-language guide for couples starting treatment.",
    publishedAt: "May 2026",
  },
  {
    id: "dummy-ivf-2",
    slug: "egg-freezing-cost-breakdown-india",
    title: "Egg freezing in India: a realistic cost breakdown",
    excerpt:
      "Medication, retrieval, storage fees, and follow-up appointments explained without the fine print.",
    publishedAt: "April 2026",
  },
  {
    id: "dummy-ivf-3",
    slug: "how-to-compare-clinic-success-rates",
    title: "How to compare clinic success rates without getting misled",
    excerpt:
      "Age bands, cycle definitions, and reporting standards to check before you shortlist a clinic.",
    publishedAt: "March 2026",
  },
];

export function getDummyProviderPreviews(
  domainId: DomainId,
  providerType: string,
): Provider[] {
  const providers = domainId === "ivf" ? ivfProviders : studyAbroadProviders;
  return providers.filter((provider) => provider.type === providerType);
}

export function getDummyProviderBySlug(
  domainId: DomainId,
  providerType: string,
  slug: string,
): ProviderDetail | null {
  const provider = getDummyProviderPreviews(domainId, providerType).find(
    (item) => item.slug === slug,
  );

  if (!provider) return null;

  const clinicStats =
    provider.type === "clinic"
      ? [
          { label: "Patient rating", value: String(provider.rating ?? "—") },
          { label: "IVF success focus", value: "Age-matched reporting" },
          { label: "Consultation", value: "Free eligibility review" },
        ]
      : [
          { label: "Student rating", value: String(provider.rating ?? "—") },
          { label: "Programs", value: "Masters & research pathways" },
          { label: "Intakes", value: "Fall & Spring" },
        ];

  return {
    ...provider,
    stats: clinicStats,
    gallery: provider.imageUrl ? [provider.imageUrl] : [],
  };
}

export function getDummyBlogPreviews(domainId: DomainId): BlogPost[] {
  return domainId === "ivf" ? ivfBlogPosts : studyAbroadBlogPosts;
}
