import type { ToolInput, ToolResult } from "@/types/tool";

function toNumber(value: string | number | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function runStudyAbroadCalculator(input: ToolInput): ToolResult {
  const tuition = toNumber(input.tuition);
  const living = toNumber(input.living);
  const visa = toNumber(input.visa);
  const total = tuition + living + visa;

  return {
    summary: `Estimated first-year cost: ${formatUsd(total)}`,
    items: [
      { label: "Tuition", value: formatUsd(tuition) },
      { label: "Living costs", value: formatUsd(living) },
      { label: "Visa fees", value: formatUsd(visa) },
      { label: "Total estimate", value: formatUsd(total), tier: "total" },
    ],
  };
}
