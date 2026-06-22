import type { ToolInput, ToolResult } from "@/types/tool";

function toNumber(value: string | number | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function successLikelihood(age: number, amh: number, attempts: number): string {
  if (age > 40 || amh < 1 || attempts >= 3) {
    return "Lower";
  }

  if (age <= 35 && amh >= 2 && attempts <= 1) {
    return "High";
  }

  return "Moderate";
}

function clinicTier(age: number, amh: number, attempts: number): string {
  if (age > 42 || attempts >= 3) {
    return "Specialist";
  }

  if (age <= 38 && amh >= 1.5 && attempts <= 1) {
    return "Premium";
  }

  return "Standard";
}

export function runIvfEligibility(input: ToolInput): ToolResult {
  const age = toNumber(input.age);
  const amh = toNumber(input.amh);
  const attempts = toNumber(input.attempts);

  const likelihood = successLikelihood(age, amh, attempts);
  const tier = clinicTier(age, amh, attempts);

  return {
    summary: "Here is an initial assessment based on your fertility profile.",
    items: [
      {
        label: "Success likelihood",
        value: likelihood,
      },
      {
        label: "Recommended clinic tier",
        value: tier,
        tier: tier.toLowerCase(),
      },
    ],
  };
}
