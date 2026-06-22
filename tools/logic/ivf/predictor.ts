import type { ToolInput, ToolResult } from "@/types/tool";

function toNumber(value: string | number | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function estimatedCycles(age: number, amh: number, previousAttempts: number): string {
  if (age > 40 || amh < 1 || previousAttempts >= 2) {
    return "3+ cycles";
  }

  if (age <= 35 && amh >= 2 && previousAttempts === 0) {
    return "1-2 cycles";
  }

  return "2-3 cycles";
}

function recommendedStart(age: number, amh: number, previousAttempts: number): string {
  if (age > 38 || amh < 1 || previousAttempts >= 2) {
    return "Consult a specialist within 4 weeks";
  }

  if (age <= 34 && amh >= 2) {
    return "Good window — start planning within 2-3 months";
  }

  return "Begin treatment planning within 6-8 weeks";
}

export function runIvfPredictor(input: ToolInput): ToolResult {
  const age = toNumber(input.age);
  const amh = toNumber(input.amh);
  const previousAttempts = toNumber(input.previousAttempts);

  return {
    summary: "Treatment outlook based on age, ovarian reserve, and prior attempts.",
    items: [
      {
        label: "Estimated cycles to success",
        value: estimatedCycles(age, amh, previousAttempts),
      },
      {
        label: "Recommended start",
        value: recommendedStart(age, amh, previousAttempts),
      },
    ],
  };
}
