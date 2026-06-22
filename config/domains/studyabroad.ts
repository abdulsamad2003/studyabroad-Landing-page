import type { DomainConfig } from "../types";
import { buildExploreHref } from "../domain-guards";

export const studyAbroadConfig: DomainConfig = {
  id: "studyabroad",
  name: "Study Abroad",
  tagline: "Find your perfect study destination",
  primaryColor: "#2563eb",
  secondaryColor: "#1d4ed8",
  logo: "/logos/studyabroad.svg",
  whatsappNumber: "",
  agentId: "",
  providerType: "university",
  allowedHosts: ["studyabroad.ai", "www.studyabroad.ai", "localhost"],
  tools: {
    eligibility: {
      fields: [
        { name: "ielts", label: "IELTS score", type: "number" },
        { name: "gpa", label: "GPA (4.0 scale)", type: "number" },
        {
          name: "country",
          label: "Target country",
          type: "select",
          options: [
            "Canada",
            "United Kingdom",
            "Australia",
            "Germany",
            "United States",
          ],
        },
        { name: "budget", label: "Annual budget (USD)", type: "number" },
      ],
      logicKey: "eligibility",
    },
    calculator: {
      fields: [
        { name: "tuition", label: "Annual tuition (USD)", type: "number" },
        { name: "living", label: "Annual living costs (USD)", type: "number" },
        { name: "visa", label: "Visa fees (USD)", type: "number" },
      ],
      logicKey: "calculator",
    },
    predictor: {
      fields: [
        { name: "ielts", label: "IELTS score", type: "number" },
        { name: "gpa", label: "GPA (4.0 scale)", type: "number" },
        { name: "monthsUntilIntake", label: "Months until intake", type: "number" },
      ],
      logicKey: "predictor",
    },
  },
  hero: {
    heading: "Your global education journey starts here",
    subheading:
      "Match with top universities worldwide, check eligibility in minutes, and apply with expert counsellors by your side.",
    ctaPrimary: "Check eligibility",
    ctaSecondary: "Talk to AI advisor",
    ctaPrimaryHref: "/tools/eligibility",
  },
  sections: [
    "Hero",
    "StatsBar",
    "About",
    "HowItWorks",
    "ProductsServices",
    "QuickMatcher",
    "CategoryCards",
    "SuccessStories",
    "Reviews",
    "IntakeTimeline",
    "FAQs",
    "CTABanner",
  ],
  navbarLinks: [
    { label: "Tools", href: "/tools/eligibility" },
    { label: "Explore", href: buildExploreHref("university") },
    { label: "Blog", href: "/blog" },
    { label: "Apply", href: "/apply" },
  ],
  mobileNavLinks: [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools/eligibility" },
    { label: "Explore", href: buildExploreHref("university") },
    { label: "Apply", href: "/apply" },
  ],
  footer: {
    links: [
      { label: "Eligibility tool", href: "/tools/eligibility" },
      { label: "Cost calculator", href: "/tools/calculator" },
      { label: "Explore universities", href: buildExploreHref("university") },
      { label: "Apply", href: "/apply" },
    ],
  },
  leadFormFields: ["name", "email", "phone", "targetCountry", "intake"],
  seo: {
    title: "Study Abroad — AI-powered university matching",
    description: "Find universities, check eligibility, and connect with expert counsellors.",
    keywords: ["study abroad", "university", "IELTS", "visa"],
  },
};
