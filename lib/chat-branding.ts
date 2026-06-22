import type { DomainConfig } from "@/config/types";
import { getBrandInitials } from "@/utils/brand";

const subtitles: Record<DomainConfig["id"], string> = {
  studyabroad: "Study abroad advisor · 24/7",
  ivf: "Fertility advisor · 24/7",
};

const welcomeCopy: Record<DomainConfig["id"], string> = {
  studyabroad:
    "Hi! I'm the Study Abroad AI advisor. Ask me about universities, visas, scholarships, or our counselling packages.",
  ivf:
    "Hi! I'm the IVF Guide AI advisor. Ask me about treatments, clinics, success rates, or costs.",
};

export function getDomainChatBranding(config: DomainConfig) {
  return {
    title: `${config.name} AI`,
    subtitle: subtitles[config.id],
    welcomeMessage: welcomeCopy[config.id],
    disclaimer: `AI may make errors. Verify with ${config.name} counsellors.`,
    brandInitials: getBrandInitials(config.name),
    accentColor: config.primaryColor,
    inputPlaceholder: "Type your question here...",
  };
}

export function getAgentChatBranding(agent: {
  businessName: string;
  greeting: string;
  primaryColor: string;
  category?: string;
}) {
  const categoryLabel =
    agent.category === "study-abroad"
      ? "Study abroad advisor"
      : agent.category === "ivf"
        ? "Fertility advisor"
        : "AI advisor";

  return {
    title: `${agent.businessName} AI`,
    subtitle: `${categoryLabel} · 24/7`,
    welcomeMessage: agent.greeting,
    disclaimer: `AI may make errors. Verify with ${agent.businessName} counsellors.`,
    brandInitials: getBrandInitials(agent.businessName),
    accentColor: agent.primaryColor,
    inputPlaceholder: "Type your question here...",
  };
}
