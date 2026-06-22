import type { DomainConfig } from "../types";
import { buildExploreHref } from "../domain-guards";

export const ivfConfig: DomainConfig = {
  id: "ivf",
  name: "IVF Guide",
  tagline: "Your journey to parenthood starts here",
  primaryColor: "#db2777",
  secondaryColor: "#be185d",
  logo: "/logos/ivf.svg",
  whatsappNumber: "",
  agentId: "",
  providerType: "clinic",
  allowedHosts: ["ivfguide.com", "www.ivfguide.com", "localhost"],
  tools: {
    eligibility: {
      fields: [
        { name: "age", label: "Age", type: "number" },
        { name: "amh", label: "AMH level (ng/mL)", type: "number" },
        { name: "attempts", label: "Previous IVF attempts", type: "number" },
      ],
      logicKey: "eligibility",
    },
    calculator: {
      fields: [
        { name: "cycles", label: "Expected treatment cycles", type: "number" },
        { name: "medication", label: "Medication cost per cycle (USD)", type: "number" },
        { name: "hospitalStay", label: "Hospital stay cost per cycle (USD)", type: "number" },
      ],
      logicKey: "calculator",
    },
    predictor: {
      fields: [
        { name: "age", label: "Age", type: "number" },
        { name: "amh", label: "AMH level (ng/mL)", type: "number" },
        { name: "previousAttempts", label: "Previous IVF attempts", type: "number" },
      ],
      logicKey: "predictor",
    },
  },
  hero: {
    heading: "Expert fertility guidance, personalised for you",
    subheading:
      "Compare trusted IVF clinics, understand your treatment options, and connect with specialists who care about your journey.",
    ctaPrimary: "Check eligibility",
    ctaSecondary: "Talk to AI advisor",
    ctaPrimaryHref: "/tools/eligibility",
  },
  sections: [
    "Hero",
    "StatsBar",
    "About",
    "HowItWorks",
    "QuickMatcher",
    "CategoryCards",
    "ProviderListing",
    "SuccessStories",
    "CTABanner",
    "BlogPreview",
  ],
  navbarLinks: [
    { label: "Tools", href: "/tools/eligibility" },
    { label: "Explore", href: buildExploreHref("clinic") },
    { label: "Blog", href: "/blog" },
    { label: "Apply", href: "/apply" },
  ],
  mobileNavLinks: [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools/eligibility" },
    { label: "Explore", href: buildExploreHref("clinic") },
    { label: "Apply", href: "/apply" },
  ],
  footer: {
    links: [
      { label: "Eligibility tool", href: "/tools/eligibility" },
      { label: "Cost calculator", href: "/tools/calculator" },
      { label: "Explore clinics", href: buildExploreHref("clinic") },
      { label: "Apply", href: "/apply" },
    ],
  },
  leadFormFields: ["name", "email", "phone", "age", "city"],
  seo: {
    title: "IVF Guide — AI-powered fertility guidance",
    description: "Compare IVF clinics, check treatment eligibility, and connect with experts.",
    keywords: ["IVF", "fertility", "clinic"],
  },
};
