"use client";

import { useEffect } from "react";
import type { DomainConfig } from "@/config/types";
import { useConfigStore } from "@/store/configStore";

type DomainProviderProps = {
  config: DomainConfig;
  children: React.ReactNode;
};

export default function DomainProvider({ config, children }: DomainProviderProps) {
  const setDomain = useConfigStore((state) => state.setDomain);

  useEffect(() => {
    setDomain(config);

    document.documentElement.style.setProperty(
      "--color-primary",
      config.primaryColor,
    );

    if (config.secondaryColor) {
      document.documentElement.style.setProperty(
        "--color-secondary",
        config.secondaryColor,
      );
    }
  }, [config, setDomain]);

  return <>{children}</>;
}
