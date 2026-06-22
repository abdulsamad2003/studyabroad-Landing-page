# Sayy Public Websites

One Next.js codebase powering multiple branded domains (studyabroad.ai, ivfguide.com, and future verticals).

## Quick start

```bash
npm install
cp .env.local.example .env.local
npm run dev
```
use in env
NEXT_PUBLIC_DOMAIN=studyabroad
Open [http://localhost:3000](http://localhost:3000). Switch domains via `NEXT_PUBLIC_DOMAIN` in `.env.local`.

## Documentation

| Doc | Purpose |
|-----|---------|
| [**GUIDE.md**](./docs/GUIDE.md) | **Full developer guide** — local dev, new domains, tools, deployment |
| [**DEPLOYMENT.md**](./docs/DEPLOYMENT.md) | **Dual-domain Vercel setup** — env vars, lean builds, smoke checklist |
| [CONTEXT.md](./CONTEXT.md) | Domain overview and architecture intent |
| [GRILLED.md](./GRILLED.md) | Locked architectural decisions (D1–D18) |
| [PRD.md](./docs/PRD.md) | v1 product requirements |
| [TO-ISSUES.md](./docs/TO-ISSUES.md) | Implementation issues (vertical slices) |
| [RESERVED-ROUTES.md](./docs/RESERVED-ROUTES.md) | Routes that cannot be business agent slugs |
