import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getBuildTimeDomainConfig } from "./build-config";
import { isHostAllowed } from "./domain-guards";
import type { DomainConfig, DomainId } from "./types";
import { studyAbroadConfig } from "./domains/studyabroad";
import { ivfConfig } from "./domains/ivf";

const allDomainConfigs: Record<DomainId, DomainConfig> = {
  studyabroad: studyAbroadConfig,
  ivf: ivfConfig,
};

const hostToDomain: Record<string, DomainId> = {
  "studyabroad.ai": "studyabroad",
  "www.studyabroad.ai": "studyabroad",
  "ivfguide.com": "ivf",
  "www.ivfguide.com": "ivf",
  localhost: "studyabroad",
};

function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getDomainConfigsRecord(): Partial<Record<DomainId, DomainConfig>> {
  if (isDevelopment()) {
    return allDomainConfigs;
  }

  const buildDomain = process.env.NEXT_PUBLIC_DOMAIN as DomainId | undefined;

  if (buildDomain === "ivf") {
    return { ivf: ivfConfig };
  }

  return { studyabroad: studyAbroadConfig };
}

/** @deprecated Use getDomainConfigsRecord() for production-aware access */
export const domainConfigs = allDomainConfigs;

export function resolveDomainId(host?: string | null): DomainId {
  if (!isDevelopment()) {
    return getBuildTimeDomainConfig().id;
  }

  const override = process.env.NEXT_PUBLIC_DOMAIN as DomainId | undefined;
  const configs = getDomainConfigsRecord();

  if (override && configs[override]) {
    return override;
  }

  const normalizedHost = host?.split(":")[0]?.toLowerCase() ?? "localhost";
  return hostToDomain[normalizedHost] ?? "studyabroad";
}

export async function getDomainConfig(): Promise<DomainConfig> {
  const headerList = await headers();
  const host = headerList.get("host");

  if (!isDevelopment()) {
    const config = getBuildTimeDomainConfig();

    if (!isHostAllowed(host, config.allowedHosts, { allowVercelPreview: true })) {
      notFound();
    }

    return config;
  }

  const domainId = resolveDomainId(host);
  const config = getDomainConfigsRecord()[domainId];

  if (!config) {
    notFound();
  }

  return config;
}

export * from "./types";
export { appConfig } from "./app-config";
