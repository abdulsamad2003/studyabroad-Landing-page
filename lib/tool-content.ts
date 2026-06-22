import type { DomainConfig, DomainId } from "@/config/types";

export type ToolPageKey = keyof DomainConfig["tools"];

type ToolPageCopy = {
  title: string;
  description: Record<DomainId, string>;
  submitLabel: string;
};

export const toolPageCopy: Record<ToolPageKey, ToolPageCopy> = {
  eligibility: {
    title: "Eligibility check",
    description: {
      studyabroad:
        "Enter your academic profile to see Safe, Target, and Reach university options.",
      ivf: "Enter your fertility profile to estimate success likelihood and clinic tier.",
    },
    submitLabel: "Check eligibility",
  },
  calculator: {
    title: "Cost calculator",
    description: {
      studyabroad:
        "Estimate your first-year study abroad costs including tuition, living, and visa fees.",
      ivf: "Estimate IVF treatment costs across cycles, medication, and hospital stay.",
    },
    submitLabel: "Calculate costs",
  },
  predictor: {
    title: "Predictor",
    description: {
      studyabroad:
        "Forecast admission readiness and when to start your application timeline.",
      ivf: "Forecast likely treatment cycles and when to start based on your fertility profile.",
    },
    submitLabel: "Get prediction",
  },
};
