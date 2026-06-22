"use client";

import type { DomainConfig } from "@/config/types";
import { toolPageCopy, type ToolPageKey } from "@/lib/tool-content";
import ToolShell from "./ToolShell";

type DomainToolPageProps = {
  config: DomainConfig;
  toolKey: ToolPageKey;
};

export default function DomainToolPage({ config, toolKey }: DomainToolPageProps) {
  const copy = toolPageCopy[toolKey];

  return (
    <ToolShell
      config={config}
      toolKey={toolKey}
      title={copy.title}
      description={copy.description[config.id]}
      submitLabel={copy.submitLabel}
    />
  );
}
