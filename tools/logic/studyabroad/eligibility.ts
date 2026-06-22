import type { ToolInput, ToolResult } from "@/types/tool";

function toNumber(value: string | number | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function scoreProfile(ielts: number, gpa: number, budget: number): number {
  let score = 0;

  if (ielts >= 7.5) score += 3;
  else if (ielts >= 6.5) score += 2;
  else if (ielts >= 6.0) score += 1;

  if (gpa >= 3.5) score += 2;
  else if (gpa >= 3.0) score += 1;

  if (budget >= 40000) score += 2;
  else if (budget >= 25000) score += 1;

  return score;
}

function universitiesForCountry(country: string) {
  const catalog: Record<string, { safe: string; target: string; reach: string }> = {
    Canada: {
      safe: "University of Alberta, Concordia University",
      target: "University of Toronto, McGill University",
      reach: "University of British Columbia, McMaster University",
    },
    "United Kingdom": {
      safe: "Coventry University, University of Hertfordshire",
      target: "University of Manchester, King's College London",
      reach: "University of Oxford, Imperial College London",
    },
    Australia: {
      safe: "Griffith University, Deakin University",
      target: "Monash University, University of Queensland",
      reach: "University of Melbourne, University of Sydney",
    },
    Germany: {
      safe: "University of Stuttgart, TU Dresden",
      target: "RWTH Aachen, University of Hamburg",
      reach: "TU Munich, Heidelberg University",
    },
    "United States": {
      safe: "Arizona State University, University of Cincinnati",
      target: "Northeastern University, Penn State University",
      reach: "Columbia University, UCLA",
    },
  };

  return (
    catalog[country] ?? {
      safe: "Regional public universities",
      target: "Mid-tier national universities",
      reach: "Highly selective universities",
    }
  );
}

export function runStudyAbroadEligibility(input: ToolInput): ToolResult {
  const ielts = toNumber(input.ielts);
  const gpa = toNumber(input.gpa);
  const budget = toNumber(input.budget);
  const country = String(input.country ?? "your target country").trim();

  const profileScore = scoreProfile(ielts, gpa, budget);
  const matches = universitiesForCountry(country);

  return {
    summary: `Based on your profile for ${country}, here are suggested university tiers.`,
    items: [
      {
        label: "Safe",
        value: matches.safe,
        tier: "safe",
      },
      {
        label: "Target",
        value:
          profileScore >= 4
            ? matches.target
            : `${matches.target} — strengthen IELTS or GPA to improve odds`,
        tier: "target",
      },
      {
        label: "Reach",
        value:
          profileScore >= 6
            ? matches.reach
            : `${matches.reach} — consider after improving test scores`,
        tier: "reach",
      },
    ],
  };
}
