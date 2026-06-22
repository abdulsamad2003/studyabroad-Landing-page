# Grilled — Sayy Public Websites

Stress-test session for the architecture described in [CONTEXT.md](./CONTEXT.md).
Questions are asked one at a time; resolved decisions are captured here as they land.

**Started:** 2026-06-13  
**Status:** Complete — ready for PRD

---

## Open questions

_None._

---

## Reference docs

| Doc | Purpose |
|-----|---------|
| [docs/RESERVED-ROUTES.md](./docs/RESERVED-ROUTES.md) | Reserved platform routes; business agent slugs that cannot be used |
| [docs/GUIDE.md](./docs/GUIDE.md) | **Full developer guide** — local dev, domains, tools, deploy |
| [docs/PRD.md](./docs/PRD.md) | v1 product requirements (studyabroad + IVF) |
| [docs/TO-ISSUES.md](./docs/TO-ISSUES.md) | Vertical slice issues breakdown (draft) |

---

## Resolved decisions

### D1 — Per-domain lean builds (Q1)

**Decision:** **(A)** One Vercel project per domain. Build inlines a single `DomainConfig`; other domain configs are tree-shaken out. `NEXT_PUBLIC_DOMAIN` is set at build time per Vercel project.

**Implication:** `config/index.ts` must be refactored so only the active domain's config is importable at build time. Runtime Host resolution remains for local dev and preview, but production artifacts ship one domain only.

### D2 — Wrong-domain requests hard fail (Q2)

**Decision:** **(B)** If the request Host is not on this build's allowlist (apex + www + Vercel preview URLs), return 404. Never silently serve the wrong brand on the wrong domain.

**Implication:** Each domain config carries an `allowedHosts` list baked at build time. Middleware or `getDomainConfig()` enforces it in production.

### D3 — Dev loads all configs; prod stays lean (Q3)

**Decision:** **(B)** — **local development only.** When `NODE_ENV === 'development'`, all domain configs are available; switch via `NEXT_PUBLIC_DOMAIN` without restart. Production and Vercel preview builds always use the lean single-config path from D1.

**Implication:** Two code paths in `config/index.ts` — dev fat bundle, prod lean. Never ship all configs to a production deployment.

### D4 — New domain launch checklist (Q4)

**Decision:** **One codebase, separate Vercel project per domain.** To launch a new vertical (e.g. tourism):

1. Add `config/domains/tourism.ts`
2. Extend `DomainId` union and host mapping
3. Create new Vercel project with `NEXT_PUBLIC_DOMAIN=tourism`
4. Point DNS to that project
5. Reuse existing section components — only add new components when a vertical needs a UI pattern that doesn't exist yet

**Implication:** No new repo, no new page files by default. Config + Vercel project + DNS is the repeatable workflow.

### D5 — One shared backend for all domains (Q5)

**Decision:** **(A)** All domains hit the same backend API. Backend distinguishes verticals via `domain category` in the lead/request payload. Same `API_URL` / `NEXT_PUBLIC_API_URL` on every Vercel project.

**Implication:** Separate Vercel projects isolate frontend bundles and deploys; backend stays centralized.

### D6 — No payments on userside (Q6)

**Decision:** This public website codebase has no payment processing. Razorpay dependency, env vars, and `appConfig.razorpayKey` removed. Payments (if any) live in admin/business dashboards — separate codebase.

### D7 — Business agents are domain-scoped (Q7)

**Decision:** **(A) Domain-scoped.** An IVF business agent only renders on ivfguide.com; a studyabroad consultancy only on studyabroad.ai. API fetch must include domain category; wrong domain → 404.

**Implication:** `app/[agentSlug]/page.tsx` must pass current domain category to the backend (e.g. `/agents/slug/{slug}?category=ivf`).

### D8 — Provider pages are domain-scoped (Q8)

**Decision:** **(A) Domain-scoped.** Universities only on studyabroad.ai, clinics only on ivfguide.com. Wrong `providerType` or wrong domain → 404. API filters by domain category.

**Implication:** `/explore/[providerType]/[slug]` must validate `providerType` against domain config and pass category to the backend fetch.

### D9 — Influencer links are domain-scoped (Q9)

**Decision:** **(A) Domain-scoped.** An IVF influencer slug only works on ivfguide.com. Wrong domain or invalid slug for that category → 404. Backend validates influencer belongs to current domain category.

**Implication:** `/i/[slug]` must validate slug against domain category before persisting to `leadStore` / sessionStorage.

### D10 — Blog content is domain-scoped (Q10)

**Decision:** **(A) Domain-scoped.** Each domain has its own blog content filtered by domain/category. Cross-domain article slug → 404.

**Implication:** `/blog` and `/blog/[slug]` API fetches must include domain category from config.

### D11 — Leads always include domain category (Q11)

**Decision:** **(A) Always explicit.** Every lead POST includes `domainId` from `config.id` (e.g. `"studyabroad"`, `"ivf"`). Backend never guesses from Host header.

**Implication:** `useLeadForm`, hero chat, and all lead submission paths must attach `domainId` from `configStore` before POSTing to the API.

### D12 — Tool pages use hybrid architecture (Q12)

**Decision:** **(C) Hybrid.** Shared tool shell component + `config.tools` for fields/labels + per-domain logic files (`tools/logic/{domainId}/eligibility.ts`) + custom component escape hatch only when UI is genuinely unique.

**Implication:** New verticals default to config + logic file, not new routes or duplicate components.

### D13 — `providerType` in domain config (Q13)

**Decision:** **(A)** Each `DomainConfig` declares `providerType` (e.g. `"university"`, `"clinic"`). Navbar explore links, route validation, and API fetches all read from config. Wrong `providerType` on a domain → 404.

**Implication:** Add `providerType` to `DomainConfig` and domain files. Replace hardcoded `/explore/university` in navbar configs.

### D14 — Reserved routes beat agent slugs (Q14)

**Decision:** **(A) Reserved routes always win.** `/blog`, `/tools`, `/apply`, `/explore`, `/i` are never overridden by `[agentSlug]`. Next.js file-based routing enforces this on userside.

**Dashboard validation:** When a business picks an agent slug in the admin/business dashboard, if it collides with a reserved slug → show error ("already taken, please choose another"). Block at creation time, not at runtime.

**Implication:** Maintain reserved slug list — documented in [docs/RESERVED-ROUTES.md](./docs/RESERVED-ROUTES.md). Backend API is source of truth; dashboard shows error on collision.

### D15 — Reserved slug list: backend validates, README documents (Q15)

**Decision:** **Backend API is the source of truth** for reserved-slug validation when businesses create/update agent slugs in the admin dashboard. This userside repo documents the list in [docs/RESERVED-ROUTES.md](./docs/RESERVED-ROUTES.md) for developers. Dashboard shows *"This slug is already reserved. Please choose another."* on collision.

**Implication:** When adding new platform routes, update `docs/RESERVED-ROUTES.md` and the backend reserved-slug list together.

### D16 — MVP: studyabroad + IVF together (Q16)

**Decision:** Build **both studyabroad.ai and ivfguide.com together** in v1 — not studyabroad-only first. Both domain configs, both Vercel projects, shared codebase patterns validated across two verticals from the start.

**Implication:** PRD and implementation cover two domains in parallel. Config, tools logic, and domain-scoping rules must work for both.

### D17 — Hero AI chat: placeholder first (Q17)

**Decision:** **v1 ships a hero AI chat box UI only** — layout slot in hero, chat widget shell. Full Socket.io integration, inline lead capture, and agent intelligence come later.

**Implication:** Hero section has right-column chat component; wire up `agentId` and real-time chat in a follow-up phase. Don't block v1 on chat backend.

### D18 — Rendering strategy: follow CONTEXT.md (Q18)

**Decision:** **(A)** Per-page rendering mix:

| Page | Strategy |
|------|----------|
| Homepage, marketing | SSG |
| Provider listings (`/explore/*`) | SSG, revalidate 24h |
| Blog | SSG |
| Business agent (`/[agentSlug]`) | SSR, cache 1h |
| Tools, apply | CSR |

**Implication:** SEO-critical pages are static; agent pages stay fresh via SSR; interactive tools skip SSR overhead. Hero chat placeholder hydrates client-side inside SSG homepage.

---

## Architecture summary (locked in)

```
GitHub (1 repo / 1 codebase)
    ├── Vercel: studyabroad  → NEXT_PUBLIC_DOMAIN=studyabroad  → studyabroad.ai
    ├── Vercel: ivf          → NEXT_PUBLIC_DOMAIN=ivf          → ivfguide.com
    └── Vercel: tourism      → (when ready)
              ↓
    One shared backend API (domain category in payload)
```

---

## Security & scalability comparison (shared vs separate Vercel)

Both options use **one codebase**. Vercel is only the deployment layer.

| Concern | 1 shared Vercel | Separate Vercel per domain |
|---------|-----------------|---------------------------|
| **Blast radius** | One bad deploy affects all brands | One brand down; others unaffected |
| **Env vars** | One set of env vars for all domains (same API URL, socket URL) | Per-project env vars if domains ever need different backends |
| **Client bundle** | All domain configs can end up in JS | Each site ships only its own config |
| **Brand leakage** | DNS mistake can show wrong brand (needs D2 middleware) | Wrong DNS blocked per D2; smaller config surface |
| **Bundle size** | Grows with every vertical | Stays flat per domain |
| **Deploy cadence** | Shipping IVF change redeploys studyabroad | Independent releases per vertical |

**Conclusion:** Separate Vercel per domain (D1/D4) — one codebase, isolated frontend deploys, one shared backend (D5).

---

## Session log

### Q1 — Multi-domain build strategy → **A** ✓

### Q2 — Wrong Host on wrong Vercel project → **B** ✓

### Q3 — Local dev switching → **B** (dev-only) ✓

### Q4 — Adding a new domain → **One codebase, diff Vercel per domain** ✓

### Q5 — Backend API → **One shared backend for all** ✓

---

### Q6 — Payments on userside

**Context:** CONTEXT.md and `.env.local.example` listed Razorpay, but no component used it. You clarified this userside has no payments.

**Question:** Does this public website codebase handle any payments?

**Your answer:** **No** — remove all payment-related code. Payments live in admin/business dashboards (separate codebase). ✓

**Action taken:** Razorpay package, env vars, and `appConfig.razorpayKey` removed.

---

### Q7 — Business agent pages scoped per domain?

Today `/[agentSlug]` fetches by slug only — no domain filter. An IVF agent could theoretically render on studyabroad.ai.

**Question:** Should business agent pages be scoped to the current domain?

- **(A) Domain-scoped** — API includes domain category; wrong domain → 404.
- **(B) Slug-global** — any active slug works on any domain.

**Recommendation:** **(A).**

**Your answer:** **A — domain-scoped.** IVF agents on IVF domains only. ✓

---

### Q8 — Provider pages (`/explore`) — same rule?

CONTEXT.md says `/explore/university/oxford` on studyabroad and `/explore/clinic/nova-ivf` on ivfguide — same page, different `providerType` from domain config.

**Question:** Should provider listing pages follow the same domain-scoping rule as business agents?

- **(A) Yes, domain-scoped** — universities only on studyabroad.ai, clinics only on ivfguide.com. Visiting `/explore/clinic/...` on studyabroad.ai → 404. API filters by domain category.
- **(B) No, slug-global** — any provider slug works on any domain if you know the URL.

**Recommendation:** **(A).** Same logic as Q7 — brands and data stay isolated per vertical.

**Your answer:** **A** ✓

---

### Q9 — Influencer tracking links (`/i/[slug]`) — same rule?

CONTEXT.md says influencers get URLs like `domainname.com/i/influencerslug`. The slug is stored in sessionStorage and attached to all lead submissions on that site.

**Question:** Are influencer slugs domain-scoped?

- **(A) Yes** — an IVF influencer link only works on ivfguide.com. `studyabroad.ai/i/ivf-influencer` → 404 or redirect home. Backend validates influencer belongs to current domain category.
- **(B) No** — any influencer slug works on any domain; attribution is slug-only regardless of brand.

**Recommendation:** **(A).** Influencers are created per vertical in the admin dashboard. An IVF influencer's traffic should not attribute to studyabroad leads.

**Your answer:** **A** ✓

---

### Q10 — Blog content — same rule?

Blog routes (`/blog`, `/blog/[slug]`) exist once in the codebase. Studyabroad might publish "Top 10 UK Universities"; IVF might publish "Understanding AMH Levels".

**Question:** Is blog content domain-scoped?

- **(A) Yes** — studyabroad blog posts only on studyabroad.ai; IVF posts only on ivfguide.com. API fetches filtered by domain category. Cross-domain article slug → 404.
- **(B) No** — shared blog pool; any article can appear on any domain.

**Recommendation:** **(A).** Content is vertical-specific. Same domain-scoping pattern as agents, providers, and influencers.

**Your answer:** **A** — each domain has its own blogs per domain/category. ✓

---

### Q11 — Leads always carry domain category?

CONTEXT.md says every lead POST includes `domain category`. The `Lead` type has `domainId` but `useLeadForm` doesn't set it yet — leads only go to Zustand, not the API.

**Question:** When a lead is submitted (hero chat, form, tool page, provider page), should the payload **always** include the current domain's category?

- **(A) Yes, always explicit** — frontend reads `config.id` (e.g. `"studyabroad"`, `"ivf"`) and sends it on every lead POST. Backend does not guess from Host.
- **(B) Backend infers** — frontend sends lead data only; backend figures out category from request origin/Host.

**Recommendation:** **(A).** One shared API (D5) needs an explicit category field to route leads correctly. Host header is unreliable if API is called client-side.

**Your answer:** **A** ✓

---

### Q12 — Tool pages: config-driven or separate components? (revised)

`/tools/eligibility`, `/tools/calculator`, `/tools/predictor` are the **same routes** on every domain. But studyabroad asks IELTS/GPA/country; IVF asks age/AMH/attempts. With many unique verticals ahead, pure config or pure separate components both break down.

**Question:** How should each domain get different tool behaviour?

- **(A) Pure config** — `config.tools` defines inputs/labels/outputs. One shared component renders everything. Works when tools are "different fields, same shape."
- **(B) Separate components per domain** — `StudyAbroadEligibility`, `IvfEligibility`, `TourismEligibility`… Does not scale; 10 domains × 3 tools = 30 components.
- **(C) Hybrid (recommended)** — three layers:
  1. **Shared tool shell** — one `EligibilityCheck` layout (steps, form, results card)
  2. **Config for simple cases** — `config.tools.eligibility.fields` for standard inputs/labels
  3. **Per-domain logic file** — `tools/logic/studyabroad/eligibility.ts`, `tools/logic/ivf/eligibility.ts` for scoring/calculation
  4. **Escape hatch only** — if a vertical needs a totally unique UI (e.g. hair transplant before/after slider), register a custom component in config — same pattern as homepage `sections`

**Recommendation:** **(C) Hybrid.** Config handles 80% of verticals (different fields, same form shape). Per-domain logic files handle unique calculations without duplicating React components. Custom component only when the UI itself is genuinely different.

**Your answer:** **C** ✓

---

### Q13 — `providerType` in domain config?

Provider URLs differ per domain:
- `studyabroad.ai/explore/university/oxford`
- `ivfguide.com/explore/clinic/nova-ivf`

Today the navbar hardcodes `/explore/university`. CONTEXT.md says `providerType` comes from domain config.

**Question:** Should each `DomainConfig` declare its `providerType`?

- **(A) Yes** — `studyabroad` config has `providerType: "university"`, IVF has `providerType: "clinic"`. Navbar links, explore routes, and API calls all read from config. Visiting `/explore/clinic/...` on studyabroad.ai → 404 (per D8).
- **(B) No** — `providerType` is just part of the URL; no config field needed.

**Recommendation:** **(A).** One source of truth per domain. New verticals (tourism → `"destination"`, real estate → `"property"`) just set it in config.

**Your answer:** **A** ✓

---

### Q14 — Reserved routes vs business agent slugs

Business agents live at `/[agentSlug]` — e.g. `studyabroad.ai/imperial-consultancy`. But the codebase also has fixed routes: `/tools`, `/blog`, `/apply`, `/explore`, `/i`.

**Question:** If a business registers slug `blog` or `tools`, what wins?

- **(A) Reserved routes always win** — `/blog` always shows the blog page, never a business agent. Agent must pick a slug that doesn't collide. Next.js file-based routing already prioritises fixed routes over `[agentSlug]`.
- **(B) Agent slug wins** — business can claim any slug; reserved routes get overridden.

**Recommendation:** **(A).** Platform routes are sacred. Businesses choose unique slugs. Already how Next.js App Router works — just document it as a rule for slug validation in admin dashboard.

**Your answer:** **A** — reserved routes win; dashboard shows error if business picks a reserved slug. ✓

---

### Q15 — Where does the reserved slug list live?

Reserved slugs: `tools`, `blog`, `apply`, `explore`, `i`, plus maybe `api`, `admin`, `_next`, etc.

**Question:** Where is this list defined and enforced?

- **(A) Backend API validates** — reserved list lives in the backend. Dashboard calls API on slug create; API returns error if reserved. Userside doesn't need the list (Next.js routing handles it).
- **(B) Shared constant in userside + duplicated in dashboard** — `config/reservedSlugs.ts` here; dashboard copies or shares via package.
- **(C) Backend validates + userside documents** — API is source of truth for dashboard validation; userside keeps a read-only copy for docs/tests only.

**Recommendation:** **(C).** Backend API rejects reserved slugs (single source of truth for dashboard). Userside keeps a `RESERVED_SLUGS` constant for documentation and optional extra safety — but routing already works via Next.js file priority.

**Your answer:** **Backend validates (source of truth) + README in codebase** — see [docs/RESERVED-ROUTES.md](./docs/RESERVED-ROUTES.md). ✓

---

### Q16 — MVP scope: one domain or both?

**Your answer:** **Both together** — studyabroad + IVF in v1. ✓

---

### Q17 — Hero AI chat depth for v1?

**Your answer:** **Chat box UI only for now** — full agent integration later. ✓

---

### Q18 — Rendering strategy (SSG / SSR / CSR)

**Plain English:** How each page type is built affects **speed**, **Google SEO**, and **how fresh the data is**.

| Term | What it means | Good for |
|------|---------------|----------|
| **SSG** (Static) | HTML built **at deploy time**. Same file served to everyone. Fastest. Google loves it. | Homepage, blog, marketing pages — content rarely changes |
| **SSG + revalidate** | Static, but **refreshes every X hours** (e.g. 24h). Still fast; data stays reasonably fresh. | Provider pages (`/explore/...`) — listings update daily |
| **SSR** (Server) | HTML built **on each request** (can cache 1h). Slower than static but always current. | Business agent pages — business updates logo/tagline |
| **CSR** (Client) | Browser gets a shell; **JavaScript builds the page**. Weak SEO; fine for logged-in-style tools. | Tools (`/tools/*`), apply page — interactive, no SEO need |

**CONTEXT.md already proposes:**

| Page | Strategy |
|------|----------|
| Homepage, marketing | SSG |
| Provider listings | SSG, revalidate every 24h |
| Blog | SSG |
| Business agent `/[agentSlug]` | SSR, cache 1h |
| Tools, apply | CSR |

**Question:** For v1, which rendering approach?

- **(A) Follow CONTEXT.md** — SSG for SEO pages, SSR for agents, CSR for tools. Best long-term; slightly more setup.
- **(B) Simple v1** — build everything as client components first (CSR); add SSG/SSR optimization in v2.
- **(C) Maximum SEO** — SSG everywhere possible, even tool pages get a static shell with client hydration.

**Recommendation:** **(A).** Homepage and blog need Google. Tools don't. Matches what you already documented; v1 can still ship placeholder hero chat inside an SSG homepage (chat hydrates client-side).

**Your answer:** **A** — follow CONTEXT.md rendering mix. ✓

---

## Grilling complete

**18 decisions locked.** Inputs for PRD:

- [GRILLED.md](./GRILLED.md) — all architectural decisions (D1–D18)
- [CONTEXT.md](./CONTEXT.md) — domain overview (sync grilled changes before PRD)
- [docs/PRD.md](./docs/PRD.md) — v1 product requirements
