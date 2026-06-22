"use client";

import { useEffect } from "react";
import type { DomainConfig } from "@/config/types";
import { useConfigStore } from "@/store/configStore";

export function useDomainConfig(initialConfig?: DomainConfig) {
  const { domain, setDomain } = useConfigStore();

  useEffect(() => {
    if (initialConfig) {
      setDomain(initialConfig);
    }
  }, [initialConfig, setDomain]);

  return { config: domain ?? initialConfig ?? null, setDomain };
}
