#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const domain = process.argv[2];

if (domain !== "studyabroad" && domain !== "ivf") {
  console.error("Usage: node scripts/build-domain.mjs <studyabroad|ivf>");
  process.exit(1);
}

const result = spawnSync("npx", ["next", "build"], {
  env: {
    ...process.env,
    NODE_ENV: "production",
    NEXT_PUBLIC_DOMAIN: domain,
  },
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
