import type { ToolInput, ToolResult } from "@/types/tool";

function toNumber(value: string | number | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function readinessScore(ielts: number, gpa: number, monthsUntilIntake: number): string {
  let score = 0;

  if (ielts >= 7) score += 2;
  else if (ielts >= 6.5) score += 1;

  if (gpa >= 3.5) score += 2;
  else if (gpa >= 3.0) score += 1;

  if (monthsUntilIntake >= 6) score += 1;

  if (score >= 4) return "High";
  if (score >= 2) return "Moderate";
  return "Low";
}

function recommendedWindow(monthsUntilIntake: number, readiness: string): string {
  if (readiness === "Low" || monthsUntilIntake < 4) {
    return "Prepare for the next intake cycle";
  }

  if (monthsUntilIntake >= 8) {
    return "Start applications now";
  }

  return "Finalize shortlist and submit within 60 days";
}

export function runStudyAbroadPredictor(input: ToolInput): ToolResult {
  const ielts = toNumber(input.ielts);
  const gpa = toNumber(input.gpa);
  const monthsUntilIntake = toNumber(input.monthsUntilIntake);
  const readiness = readinessScore(ielts, gpa, monthsUntilIntake);

  return {
    summary: "Admission readiness forecast based on your academic profile.",
    items: [
      {
        label: "Readiness score",
        value: readiness,
        tier: readiness.toLowerCase(),
      },
      {
        label: "Recommended window",
        value: recommendedWindow(monthsUntilIntake, readiness),
      },
    ],
  };
}
