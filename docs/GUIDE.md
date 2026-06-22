# Developer Guide — Sayy Public Websites

Complete guide for running locally, adding domains, adding tools, and understanding how everything fits together.

**Related docs:** [CONTEXT.md](../CONTEXT.md) · [GRILLED.md](../GRILLED.md) · [PRD.md](./PRD.md) · [TO-ISSUES.md](./TO-ISSUES.md) · [RESERVED-ROUTES.md](./RESERVED-ROUTES.md)

---

## Table of contents

1. [What this repo is](#what-this-repo-is)
2. [Prerequisites](#prerequisites)
3. [Run locally](#run-locally)
4. [Switch domains in dev](#switch-domains-in-dev)
5. [Project structure](#project-structure)
6. [How multi-domain works](#how-multi-domain-works)
7. [Add a new domain](#add-a-new-domain)
8. [Add or change tools](#add-or-change-tools)
9. [Add homepage sections](#add-homepage-sections)
10. [Routes reference](#routes-reference)
11. [Leads and backend API](#leads-and-backend-api)
12. [Deploy to Vercel](#deploy-to-vercel)
13. [Environment variables](#environment-variables)
14. [Domain scoping rules](#domain-scoping-rules)
15. [Rendering strategy](#rendering-strategy)
16. [Reserved routes](#reserved-routes)
17. [What's not in this repo](#whats-not-in-this-repo)
18. [Troubleshooting](#troubleshooting)

---

## What this repo is

- **One codebase** serves many public websites (studyabroad.ai, ivfguide.com, tourism, etc.).
- Each domain is a **fully branded product** — own colors, copy, sections, tools, SEO.
- **No separate repo per domain.** New vertical = new config file + Vercel project.
- This repo is **userside only** — public sites + lead capture. Admin, business, and influencer dashboards live elsewhere.
- **No payments** on this userside.

---

## Prerequisites

| Requirement | Version / notes |
|-------------|-----------------|
| Node.js | 18+ recommended |
| npm | Comes with Node |
| Backend API | Optional for local UI; required for leads, agents, providers, blog (default `http://localhost:4000/api`) |

---

## Run locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.local.example .env.local
```

### 3. Configure `.env.local`

```env
API_URL=http://localhost:4000/api
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_DOMAIN=studyabroad
```

### 4. Start dev server

```bash
npm run dev
```

Open **http://localhost:3000**

### 5. Other commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

### 6. Production build locally

```bash
# Simulate studyabroad production build
NEXT_PUBLIC_DOMAIN=studyabroad npm run build
npm run start

# Simulate ivf production build
NEXT_PUBLIC_DOMAIN=ivf npm run build
npm run start
```

> **Note:** Lean single-domain production builds are planned (see GRILLED D1). Today both domain configs are bundled; refactor tracked in TO-ISSUES #1.

---

## Switch domains in dev

Change one line in `.env.local` — **no server restart required** (once D3 lean dev path is fully implemented; restart if hot reload does not pick up env changes):

```env
NEXT_PUBLIC_DOMAIN=studyabroad   # studyabroad.ai branding
# or
NEXT_PUBLIC_DOMAIN=ivf           # ivfguide.com branding
```

`NEXT_PUBLIC_DOMAIN` overrides host detection on localhost.

### What changes when you switch

| Changes per domain | Stays the same |
|--------------------|----------------|
| Brand name, colors, logo | Routes (`/tools/eligibility`, etc.) |
| Hero copy and CTAs | Page files |
| Homepage sections list | Component code |
| Navbar links | |
| Lead form fields | |
| SEO metadata | |

---

## Project structure

```
studyabroad/
├── app/                    # Next.js App Router pages (one per route pattern)
├── components/
│   ├── sections/           # Homepage + tool section components
│   ├── layout/             # Navbar, Footer, MobileBottomBar
│   ├── agent/              # Business agent page UI
│   └── shared/             # Chat widget, lead forms, tracking
├── config/
│   ├── domains/            # One file per domain (studyabroad.ts, ivf.ts)
│   ├── index.ts            # Domain resolution + appConfig
│   └── types.ts            # DomainConfig type
├── hooks/                  # useLeadForm, useAIChat, useInfluencerTracking, etc.
├── store/                  # Zustand: config, lead, chat, agent
├── lib/                    # axios, socket, queryClient
├── types/                  # Lead, Agent, Provider, API types
├── utils/                  # SEO, formatters, tracking
├── docs/                   # PRD, GUIDE, issues, reserved routes
├── CONTEXT.md              # Architecture overview
└── GRILLED.md              # Locked decisions
```

### How config reaches the UI

```
Request → getDomainConfig() (server, reads Host or NEXT_PUBLIC_DOMAIN)
       → DomainProvider hydrates configStore (client)
       → Components read useDomainConfig() or server config
       → CSS variables --color-primary / --color-secondary applied
```

---

## How multi-domain works

```
                    ┌─────────────────────────┐
                    │   One GitHub repo        │
                    └───────────┬─────────────┘
                                │
           ┌────────────────────┼────────────────────┐
           ▼                    ▼                    ▼
   Vercel: studyabroad    Vercel: ivf         Vercel: tourism
   NEXT_PUBLIC_DOMAIN=    NEXT_PUBLIC_DOMAIN=  (future)
   studyabroad            ivf
           │                    │
           ▼                    ▼
   studyabroad.ai         ivfguide.com
           │                    │
           └────────┬───────────┘
                    ▼
           One shared backend API
           (domainId in every payload)
```

| Environment | Config loading |
|---------------|----------------|
| **Local dev** | All domain configs loaded; switch via `NEXT_PUBLIC_DOMAIN` |
| **Production** | One domain config per Vercel project (lean build) |
| **Wrong Host** | 404 in production (allowedHosts per domain) |

---

## Add a new domain

Example: launching **tourismguide.com** as domain id `tourism`.

### Checklist

| Step | Action |
|------|--------|
| 1 | Create `config/domains/tourism.ts` |
| 2 | Extend `DomainId` in `config/types.ts` → `"studyabroad" \| "ivf" \| "tourism"` |
| 3 | Import and register in `config/index.ts` → `domainConfigs` + `hostToDomain` |
| 4 | Add logo/assets under `public/logos/` |
| 5 | Set `providerType` (e.g. `"destination"`) — **planned field, see PRD** |
| 6 | Set `allowedHosts` (e.g. `tourismguide.com`, `www.tourismguide.com`) — **planned** |
| 7 | Define `sections[]` for homepage |
| 8 | Define `navbarLinks` (explore href uses `providerType`) |
| 9 | Define `leadFormFields` and `seo` |
| 10 | Add tool config + logic files (see [Add tools](#add-or-change-tools)) |
| 11 | Create **new Vercel project** with `NEXT_PUBLIC_DOMAIN=tourism` |
| 12 | Point DNS to that Vercel project |
| 13 | Test locally: `NEXT_PUBLIC_DOMAIN=tourism` |

### Minimal domain config template

```typescript
import type { DomainConfig } from "../types";

export const tourismConfig: DomainConfig = {
  id: "tourism",
  name: "Tourism Guide",
  tagline: "Your tagline here",
  primaryColor: "#0d9488",
  secondaryColor: "#0f766e",
  logo: "/logos/tourism.svg",
  whatsappNumber: "",
  agentId: "",
  hero: {
    heading: "Hero heading",
    subheading: "Hero subheading",
    ctaPrimary: "Check eligibility",
    ctaSecondary: "Talk to advisor",
  },
  sections: [
    "Hero",
    "QuickMatcher",
    "CategoryCards",
    "HowItWorks",
    "ProviderListing",
    "SuccessStories",
    "BlogPreview",
  ],
  navbarLinks: [
    { label: "Tools", href: "/tools/eligibility" },
    { label: "Explore", href: "/explore/destination" },  // use providerType
    { label: "Blog", href: "/blog" },
    { label: "Apply", href: "/apply" },
  ],
  leadFormFields: ["name", "email", "phone", "budget", "travelDates"],
  seo: {
    title: "Tourism Guide — AI-powered travel planning",
    description: "Meta description here",
    keywords: ["tourism", "travel"],
  },
};
```

### Register in `config/index.ts`

```typescript
import { tourismConfig } from "./domains/tourism";

export const domainConfigs: Record<DomainId, DomainConfig> = {
  studyabroad: studyAbroadConfig,
  ivf: ivfConfig,
  tourism: tourismConfig,
};

const hostToDomain: Record<string, DomainId> = {
  // ...existing
  "tourismguide.com": "tourism",
  "www.tourismguide.com": "tourism",
};
```

### You do **not** need

- A new repo
- New route files (`/tools/eligibility` works for all domains)
- Duplicate page components (unless a section UI is genuinely unique)

---

## Add or change tools

Tools use a **hybrid architecture** (GRILLED D12):

```
/tools/eligibility  (same URL on every domain)
        │
        ▼
┌──────────────────────────┐
│  Shared tool shell        │  One UI: form + results card
├──────────────────────────┤
│  config.tools.*           │  Fields, labels per domain
├──────────────────────────┤
│  tools/logic/{domainId}/  │  Pure calculation functions
├──────────────────────────┤
│  Custom component         │  Only if UI is truly unique (rare)
└──────────────────────────┘
```

### Existing tool routes

| Route | Purpose |
|-------|---------|
| `/tools/eligibility` | Domain-specific eligibility check |
| `/tools/calculator` | Cost calculator |
| `/tools/predictor` | Predictive tool |

All use **CSR** rendering (no SEO requirement).

### Add tool logic for a new domain

**1. Define fields in domain config** (planned schema from PRD):

```typescript
tools: {
  eligibility: {
    fields: [
      { name: "budget", label: "Budget (USD)", type: "number" },
      { name: "travelDates", label: "Travel dates", type: "text" },
    ],
    logicKey: "eligibility",
  },
  calculator: { /* ... */ logicKey: "calculator" },
  predictor: { /* ... */ logicKey: "predictor" },
},
```

**2. Create logic file** (planned location):

```
tools/logic/tourism/eligibility.ts
tools/logic/tourism/calculator.ts
tools/logic/tourism/predictor.ts
```

**3. Logic function shape** (from PRD):

```typescript
type ToolInput = Record<string, string | number>;
type ToolResult = {
  summary: string;
  items?: { label: string; value: string; tier?: string }[];
};

export function runEligibility(input: ToolInput): ToolResult {
  // Pure function — no React, easy to unit test
  return {
    summary: "Based on your inputs...",
    items: [{ label: "Match", value: "Tier 1 packages", tier: "safe" }],
  };
}
```

**4. Register in logic registry** (planned module) mapping `(domainId, logicKey)` → function.

### Change tool behavior for an existing domain

| Change | Edit |
|--------|------|
| Different form fields | `config/domains/{domain}.ts` → `tools.*.fields` |
| Different calculation | `tools/logic/{domainId}/{tool}.ts` |
| Completely unique UI | Add custom component + set `customComponent` in tool config |

### Reference: studyabroad vs ivf (from CONTEXT)

| Tool | studyabroad | ivf |
|------|-------------|-----|
| Eligibility | IELTS, GPA, country, budget → Safe/Target/Reach | Age, AMH, attempts → likelihood + clinic tier |
| Calculator | Tuition + living + visa | Cycles + medication + hospital |
| Predictor | Domain-specific | Domain-specific |

---

## Add homepage sections

Homepage sections are **config-driven** — no new route per domain.

### Available section names

Register in `components/HomePage.tsx` section map:

| Section key | Component |
|-------------|-----------|
| `Hero` | Hero (with chat shell) |
| `QuickMatcher` | QuickMatcher |
| `CategoryCards` | CategoryCards |
| `HowItWorks` | HowItWorks |
| `ProviderListing` | ProviderListing |
| `SuccessStories` | SuccessStories |
| `IntakeTimeline` | IntakeTimeline (studyabroad) |
| `BlogPreview` | BlogPreview |

### Add a section to a domain

Edit `config/domains/{domain}.ts`:

```typescript
sections: [
  "Hero",
  "QuickMatcher",
  // add or remove section keys here
  "BlogPreview",
],
```

Order in the array = order on the page.

### Add a **new** section type (rare)

1. Create `components/sections/MyNewSection.tsx`
2. Register in `HomePage.tsx` `sectionMap`
3. Add `"MyNewSection"` to domain `sections[]` arrays that need it

---

## Routes reference

| Route | Purpose | Rendering |
|-------|---------|-----------|
| `/` | Config-driven homepage | SSG |
| `/tools/eligibility` | Eligibility tool | CSR |
| `/tools/calculator` | Calculator tool | CSR |
| `/tools/predictor` | Predictor tool | CSR |
| `/apply` | Lead application form | CSR |
| `/blog` | Blog listing | SSG |
| `/blog/[slug]` | Blog article | SSG |
| `/explore/[providerType]/[slug]` | Provider detail | SSG, revalidate 24h |
| `/i/[slug]` | Influencer tracking → homepage | SSG + client tracker |
| `/[agentSlug]` | Business agent page | SSR, cache 1h |

**Reserved slugs** (cannot be business agent URLs): `tools`, `blog`, `apply`, `explore`, `i` — see [RESERVED-ROUTES.md](./RESERVED-ROUTES.md).

---

## Leads and backend API

### Every lead must include `domainId`

```json
{
  "name": "Rahul",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "domainId": "studyabroad",
  "source": "apply",
  "influencerSlug": "optional",
  "agentSlug": "optional",
  "utm_source": "optional"
}
```

Backend is **one shared API** for all domains. It uses `domainId` to route leads — never guess from Host header.

### API endpoints (userside → backend)

| Use case | Method | Notes |
|----------|--------|-------|
| Submit lead | `POST /leads` | Always include `domainId` |
| Business agent | `GET /agents/slug/{slug}?category={domainId}` | Domain-scoped |
| Provider | `GET /providers/{type}/{slug}?category={domainId}` | Wrong type → 404 |
| Blog list | `GET /blog?category={domainId}` | |
| Blog article | `GET /blog/{slug}?category={domainId}` | |
| Influencer validate | `GET /influencers/{slug}?category={domainId}` | |

### Env vars for API

```env
API_URL=http://localhost:4000/api          # Server components (RSC)
NEXT_PUBLIC_API_URL=http://localhost:4000/api  # Client components
```

---

### Deploy to Vercel

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full dual-project setup, env templates, lean build commands, and smoke checklist.

### One Vercel project per domain

| Vercel project | `NEXT_PUBLIC_DOMAIN` | Domains |
|----------------|----------------------|---------|
| sayy-studyabroad | `studyabroad` | studyabroad.ai, www.studyabroad.ai |
| sayy-ivf | `ivf` | ivfguide.com, www.ivfguide.com |

### Steps for a new domain

1. Create Vercel project linked to **same GitHub repo**
2. Set environment variables:
   - `NEXT_PUBLIC_DOMAIN={domainId}`
   - `NEXT_PUBLIC_API_URL` (production API)
   - `API_URL` (production API)
   - `NEXT_PUBLIC_SOCKET_URL` (for future chat)
3. Add custom domains in Vercel Domains tab
4. Point DNS (A/CNAME) to Vercel
5. Deploy — build bakes in single domain config (when lean build implemented)

### Shared vs per-project env

| Variable | Same everywhere? |
|----------|------------------|
| `NEXT_PUBLIC_API_URL` | Yes — one backend |
| `API_URL` | Yes |
| `NEXT_PUBLIC_DOMAIN` | **No** — unique per Vercel project |

---

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `API_URL` | Yes (for SSR fetches) | Server-side API base URL |
| `NEXT_PUBLIC_API_URL` | Yes | Client-side API base URL |
| `NEXT_PUBLIC_SOCKET_URL` | Optional in v1 | Socket.io for future AI chat |
| `NEXT_PUBLIC_DOMAIN` | Dev + build | Override domain: `studyabroad` \| `ivf` |

Copy from `.env.local.example` to get started.

---

## Domain scoping rules

All backend-backed content is **scoped per domain**. Wrong domain or wrong category → **404**.

| Data type | Rule |
|-----------|------|
| Business agents | IVF agent only on ivfguide.com |
| Providers | `university` only on studyabroad; `clinic` only on ivf |
| Influencers | Slug valid only on its domain |
| Blog | Articles filtered by `domainId` |
| Leads | Always send `domainId` explicitly |

---

## Rendering strategy

| Page type | Strategy | Why |
|-----------|----------|-----|
| Homepage, blog | **SSG** | Fast, Google-indexable |
| Provider pages | **SSG + 24h revalidate** | Fresh listings, still fast |
| Business agents | **SSR + 1h cache** | Business data changes |
| Tools, apply | **CSR** | Interactive, no SEO need |

Hero chat placeholder is a **client island** inside SSG homepage (full Socket.io deferred to phase 2).

---

## Reserved routes

Business pages live at `/[agentSlug]`. These platform routes **always win**:

- `tools`, `blog`, `apply`, `explore`, `i`

Backend rejects reserved slugs when businesses pick agent slugs in the dashboard. Full details: [RESERVED-ROUTES.md](./RESERVED-ROUTES.md).

---

## What's not in this repo

| Out of scope | Where it lives |
|--------------|----------------|
| Payments (Razorpay, etc.) | Admin / business dashboards |
| Admin, business, influencer dashboards | Separate codebase |
| Lead scoring and marketplace auction | Backend |
| Full AI chat (Socket.io, inline lead capture) | Phase 2 (v1 = chat UI shell only) |
| Reserved slug validation at slug create | Backend API + dashboard |
| Blog CMS authoring | Backend / admin |

---

## Troubleshooting

### Wrong branding on localhost

Check `.env.local`:

```env
NEXT_PUBLIC_DOMAIN=ivf
```

### API calls fail / agent pages 404

1. Is backend running at `localhost:4000`?
2. Are `API_URL` and `NEXT_PUBLIC_API_URL` set?
3. Does the backend support `?category={domainId}` on fetches?

### Env change not reflected

Restart dev server after changing `.env.local` if hot reload does not pick it up:

```bash
# Ctrl+C then
npm run dev
```

### Build fails

```bash
npm run lint
npm run build
```

Check TypeScript errors — often a missing `DomainId` after adding a domain.

### Explore link goes to wrong provider type

Navbar `explore` href must match domain `providerType`:

- studyabroad → `/explore/university`
- ivf → `/explore/clinic`

---

## Implementation status

This guide describes **target architecture** from GRILLED + PRD. Current codebase is an **early scaffold**.

| Area | Status |
|------|--------|
| Domain config + routing | Partial |
| Homepage sections | Mostly placeholders |
| Tools | Placeholders |
| Lead POST to API | Not wired |
| Domain scoping on API | Not wired |
| Lean production builds | Planned (TO-ISSUES #1) |
| Full AI chat | Phase 2 |

Follow [TO-ISSUES.md](./TO-ISSUES.md) for implementation order.

---

## Quick reference card

```
Local dev:     npm install → cp .env.local.example .env.local → npm run dev
Switch domain: NEXT_PUBLIC_DOMAIN=studyabroad | ivf
New domain:    config/domains/X.ts → DomainId → hostToDomain → Vercel project
New tool:      config.tools + tools/logic/{domainId}/{tool}.ts
New section:   components/sections/ → sectionMap → config.sections[]
Deploy:        1 Vercel project per domain, same repo
Leads:         POST /leads with domainId always set
```
