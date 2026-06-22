import type { ToolInput, ToolResult } from "@/types/tool";

const CYCLE_PROCEDURE_COST = 3500;

function toNumber(value: string | number | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function runIvfCalculator(input: ToolInput): ToolResult {
  const cycles = toNumber(input.cycles);
  const medicationPerCycle = toNumber(input.medication);
  const hospitalStayPerCycle = toNumber(input.hospitalStay);

  const medicationTotal = cycles * medicationPerCycle;
  const hospitalStayTotal = cycles * hospitalStayPerCycle;
  const procedureTotal = cycles * CYCLE_PROCEDURE_COST;
  const total = procedureTotal + medicationTotal + hospitalStayTotal;

  return {
    summary: `Estimated treatment cost: ${formatUsd(total)}`,
    items: [
      { label: "Treatment cycles", value: String(cycles) },
      { label: "Procedure fees", value: formatUsd(procedureTotal) },
      { label: "Medication", value: formatUsd(medicationTotal) },
      { label: "Hospital stay", value: formatUsd(hospitalStayTotal) },
      { label: "Total estimate", value: formatUsd(total), tier: "total" },
    ],
  };
}
