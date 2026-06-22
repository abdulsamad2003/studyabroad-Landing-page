import type { DomainConfig, DomainId } from "./types";
import { studyAbroadConfig } from "./domains/studyabroad";
import { ivfConfig } from "./domains/ivf";

export function getBuildTimeDomainId(): DomainId {
  const buildDomain = process.env.NEXT_PUBLIC_DOMAIN as DomainId | undefined;

  if (buildDomain === "ivf") return "ivf";
  return "studyabroad";
}

export function getBuildTimeDomainConfig(): DomainConfig {
  return getBuildTimeDomainId() === "ivf" ? ivfConfig : studyAbroadConfig;
}
