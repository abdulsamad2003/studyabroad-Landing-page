import type { DomainId } from "@/config/types";
import type { ToolInput, ToolLogicFn, ToolResult } from "@/types/tool";
import { runStudyAbroadCalculator } from "./studyabroad/calculator";
import { runStudyAbroadEligibility } from "./studyabroad/eligibility";
import { runStudyAbroadPredictor } from "./studyabroad/predictor";
import { runIvfCalculator } from "./ivf/calculator";
import { runIvfEligibility } from "./ivf/eligibility";
import { runIvfPredictor } from "./ivf/predictor";

const registry: Record<DomainId, Partial<Record<string, ToolLogicFn>>> = {
  studyabroad: {
    eligibility: runStudyAbroadEligibility,
    calculator: runStudyAbroadCalculator,
    predictor: runStudyAbroadPredictor,
  },
  ivf: {
    eligibility: runIvfEligibility,
    calculator: runIvfCalculator,
    predictor: runIvfPredictor,
  },
};

export function runToolLogic(
  domainId: DomainId,
  logicKey: string,
  input: ToolInput,
): ToolResult {
  const runner = registry[domainId]?.[logicKey];

  if (!runner) {
    throw new Error(`No tool logic registered for ${domainId}/${logicKey}`);
  }

  return runner(input);
}
