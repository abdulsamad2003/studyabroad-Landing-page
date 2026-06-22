# To Issues — Sayy Public Websites v1

Vertical slices (tracer bullets) derived from [PRD.md](./PRD.md).  
Each issue cuts end-to-end through config → API → UI → verification.

**Related docs:** [GUIDE.md](./GUIDE.md) · [PRD.md](./PRD.md)

---

## Dependency overview

```
#1 Domain platform foundation
 ├── #2 Lead pipeline + apply page
 ├── #3 Hero, layout chrome, chat shell
 │    └── #4 Homepage content sections
 ├── #5 Eligibility tool (both domains)
 │    └── #6 Calculator + predictor tools
 ├── #7 Provider explore page
 ├── #8 Blog pages
 ├── #9 Business agent pages
 └── #10 Influencer tracking
      └── #11 Dual-domain Vercel deployment
```

---

## Proposed breakdown (quiz)

| # | Title | Type | Blocked by | User stories |
|---|-------|------|------------|--------------|
| 1 | Domain platform foundation | AFK | None | 43–47, 55, 57, 60 |
| 2 | Lead pipeline + apply page | AFK | #1 | 28–30, 50, 58 |
| 3 | Hero, layout chrome, chat shell | AFK | #1 | 4–6, 8–11 |
| 4 | Homepage content sections | AFK | #1, #3 | 1–3, 48, 54, 56 |
| 5 | Eligibility tool (both domains) | AFK | #1 | 12–15, 19, 49 |
| 6 | Calculator + predictor tools | AFK | #5 | 16–18, 19 |
| 7 | Provider explore page | AFK | #1, #2 | 20–24, 22, 59 |
| 8 | Blog list + article pages | AFK | #1 | 25–27, 51 |
| 9 | Business agent pages | AFK | #1, #2 | 31–34, 39 |
| 10 | Influencer tracking + attribution | AFK | #1, #2 | 35–38, 41–42 |
| 11 | Dual-domain Vercel deployment | AFK | #1–10 | 44–45, PRD success criteria |

**HITL (not a code slice):** Confirm backend API contract (`domainId` field names, endpoint paths) with backend team before or in parallel with #2. Story 40 (reserved slug dashboard validation) is backend/dashboard — out of userside scope.

---

## Quiz — please confirm

1. **Granularity** — too coarse, too fine, or about right?
2. **Dependencies** — correct order?
3. **Merge/split** — e.g. merge #5+#6 into one "all tools" issue? Split #4 per section?
4. **HITL vs AFK** — any slice needing human review before merge?

Reply with adjustments; then publish to issue tracker or keep this file as source of truth.

---

## Issue #1 — Domain platform foundation

**Type:** AFK  
**Blocked by:** None — can start immediately

### What to build

Establish the multi-domain platform layer both verticals depend on. Extend the domain config schema with `providerType`, `allowedHosts`, and a `tools` definition skeleton for studyabroad and ivf. Refactor domain resolution so production builds ship a single domain config per Vercel project while development loads all configs and switches via `NEXT_PUBLIC_DOMAIN` without restart. Enforce `allowedHosts` in production so requests with a wrong Host return 404. Update navbar explore links to use `providerType` from config instead of hardcoded paths. Introduce Vitest and a domain-scoped API fetch helper that always attaches `domainId` as a query parameter. Add unit tests for allowed-host validation and provider-type guards.

End-to-end proof: switching `NEXT_PUBLIC_DOMAIN` between studyabroad and ivf shows correct branding and explore URLs; production build mode resolves only the baked domain; wrong host returns 404.

### Acceptance criteria

- [x] `DomainConfig` includes `providerType`, `allowedHosts`, and `tools` placeholders for both domains
- [x] studyabroad `providerType` is `university`; ivf `providerType` is `clinic`
- [x] Navbar explore hrefs derive from `providerType` on each domain
- [x] Production code path tree-shakes to one domain config; dev loads both
- [x] Wrong Host on a production build returns 404
- [x] Domain-scoped fetch helper attaches `domainId` / category to API calls
- [x] Vitest runs with tests for host allowlist and provider-type guard
- [x] Both domains render distinct themed layouts when toggling `NEXT_PUBLIC_DOMAIN` in dev

### User stories covered

43, 44, 45, 46, 47, 55, 57, 60

---

## Issue #2 — Lead pipeline + apply page

**Type:** AFK  
**Blocked by:** #1

### What to build

Wire the first complete lead capture path end-to-end. Build a canonical lead payload builder that always includes `domainId` from the active domain config plus optional `influencerSlug`, UTM fields, `agentSlug`, and `source`. Connect form submission on `/apply` to `POST /leads` on the shared backend with validation (name, email, phone, domain-specific fields from config). Show success and error feedback via toast. Persist influencer and UTM context from the lead store when present. Add unit tests for the payload builder ensuring `domainId` is never omitted.

End-to-end proof: a visitor on either domain completes `/apply`, sees validation errors on bad input, and successful submit reaches the backend with correct `domainId`.

### Acceptance criteria

- [x] Lead payload always includes `domainId` from config
- [x] `/apply` renders fields from `config.leadFormFields` for each domain
- [x] Valid submit POSTs to backend and shows success toast
- [x] Invalid submit shows field-level errors without POST
- [x] Failed API call shows error toast
- [x] UTM and influencer slug merged into payload when present in lead store
- [x] Unit tests cover payload builder for studyabroad and ivf

### User stories covered

28, 29, 30, 50, 58

---

## Issue #3 — Hero, layout chrome, and chat shell

**Type:** AFK  
**Blocked by:** #1

### What to build

Polish the public shell visitors see on every page. Implement a production-ready Hero with config-driven heading, subheading, trust signals, and CTAs linking to the correct tool routes per domain. Embed the AI chat shell in the hero (local message state only — no Socket.io). Wire WhatsApp button to `config.whatsappNumber`. Ensure navbar, footer, and mobile bottom bar read from domain config and render cohesively on both domains.

End-to-end proof: homepage hero on studyabroad and ivf shows correct copy, CTAs, chat box UI, and WhatsApp link per domain config.

### Acceptance criteria

- [x] Hero displays config copy and CTAs for both domains
- [x] Chat widget accepts local messages in embedded hero variant (no socket)
- [x] Primary/secondary CTAs link to domain-appropriate tool routes
- [x] WhatsApp button uses configured number (hidden or disabled when empty)
- [x] Navbar and footer reflect domain branding and links
- [x] Mobile bottom bar works on small viewports
- [x] Homepage remains SSG with chat as client island

### User stories covered

4, 5, 6, 8, 9, 10, 11

---

## Issue #4 — Homepage content sections

**Type:** AFK  
**Blocked by:** #1, #3

### What to build

Replace all placeholder homepage sections with real UI driven by each domain's `sections` array. Implement section components: QuickMatcher, CategoryCards, HowItWorks, ProviderListing (preview), SuccessStories, IntakeTimeline (studyabroad only), BlogPreview (preview). Sections not listed in a domain config must not render. ProviderListing and BlogPreview may show empty states when API returns no data.

End-to-end proof: studyabroad homepage shows all configured sections including IntakeTimeline; ivf homepage shows its section set without study-abroad-only sections.

### Acceptance criteria

- [x] Section registry maps config `sections[]` strings to components
- [x] No placeholder "Section Name" text remains on homepage
- [x] studyabroad renders IntakeTimeline; ivf omits it per config
- [x] ProviderListing and BlogPreview handle loading and empty states
- [x] Homepage is SSG and indexable with per-domain metadata from config
- [x] Adding/removing a section name in config changes homepage without code changes

### User stories covered

1, 2, 3, 48, 54, 56, 51 (homepage portion), 59 (empty states)

---

## Issue #5 — Eligibility tool (both domains)

**Type:** AFK  
**Blocked by:** #1

### What to build

Deliver the first full hybrid tool vertical slice. Build the shared tool shell (form, submit, results card) as a CSR page. Read eligibility field definitions from `config.tools.eligibility`. Implement logic registry dispatching to studyabroad eligibility (IELTS, GPA, country, budget → Safe/Target/Reach) and ivf eligibility (age, AMH, attempts → likelihood + clinic tier). Add unit tests for both logic functions.

End-to-end proof: `/tools/eligibility` on each domain shows different fields and produces domain-appropriate results.

### Acceptance criteria

- [x] Tool shell renders fields from config per domain
- [x] studyabroad eligibility returns Safe/Target/Reach groupings
- [x] ivf eligibility returns success likelihood and clinic tier
- [x] Tool page uses CSR rendering strategy
- [x] Logic functions are pure and covered by Vitest
- [x] Invalid/missing inputs show validation errors

### User stories covered

12, 13, 14, 15, 19, 49

---

## Issue #6 — Calculator and predictor tools

**Type:** AFK  
**Blocked by:** #5

### What to build

Extend the tool engine to calculator and predictor routes using the same shell and registry pattern. Implement studyabroad calculator (tuition + living + visa) and ivf calculator (cycles + medication + hospital stay). Implement domain-appropriate predictor logic per config. Reuse validation and results UI from eligibility.

End-to-end proof: all three tool routes work on both domains with distinct inputs and outputs.

### Acceptance criteria

- [x] `/tools/calculator` works on studyabroad and ivf with distinct fields and totals
- [x] `/tools/predictor` works on both domains with distinct logic
- [x] All tool logic functions have unit tests
- [x] Custom component escape hatch documented in config types (no custom tools required in v1)

### User stories covered

16, 17, 18, 19

---

## Issue #7 — Provider explore page

**Type:** AFK  
**Blocked by:** #1, #2

### What to build

Complete the provider detail experience at `/explore/[providerType]/[slug]`. Reject requests where `providerType` does not match the active domain's `providerType` with 404. Fetch provider from backend with domain category filter; SSG with 24-hour revalidation. Render two-column layout: stats, description, gallery left; lead form and chat shell right. Stat labels driven by domain config or provider payload. Lead form submits via lead pipeline from #2.

End-to-end proof: valid university URL works on studyabroad; clinic URL on ivf; cross-type URLs 404; lead submits with `domainId`.

### Acceptance criteria

- [x] Wrong `providerType` for domain returns 404
- [x] Valid slug fetches and renders provider detail for correct domain
- [x] Page uses SSG with `revalidate: 86400`
- [x] Lead form on provider page POSTs with `domainId` and `source`
- [x] Loading and not-found states handled
- [x] Chat shell present (placeholder, no socket)

### User stories covered

20, 21, 22, 23, 24, 52, 59

---

## Issue #8 — Blog list and article pages

**Type:** AFK  
**Blocked by:** #1

### What to build

Implement domain-scoped blog at `/blog` and `/blog/[slug]`. Fetch articles filtered by `domainId` from backend. Render listing and article layouts as SSG. Return 404 for articles not belonging to the active domain. Include per-article and listing metadata for SEO.

End-to-end proof: studyabroad blog shows only studyabroad articles; ivf blog shows only ivf articles.

### Acceptance criteria

- [x] `/blog` lists articles for active domain only
- [x] `/blog/[slug]` renders article or 404 if wrong domain
- [x] Pages use SSG rendering
- [x] Metadata uses domain config SEO templates
- [x] Empty blog state handled gracefully

### User stories covered

25, 26, 27, 51

---

## Issue #9 — Business agent pages

**Type:** AFK  
**Blocked by:** #1, #2

### What to build

Harden business agent pages at `/[agentSlug]`. Fetch agent via backend with `category={domainId}`; SSR with 1-hour cache. Return 404 for wrong domain or missing slug. Render branded layout with agent logo, colors, tagline, chat shell, and lead form. Agent lead form POSTs include `agentSlug` and `domainId`. Reserved platform routes continue to take priority over agent slugs (no userside validation — documented behavior).

End-to-end proof: valid agent slug on correct domain renders branded page and submits lead with agent attribution; wrong domain 404.

### Acceptance criteria

- [x] Agent fetch includes domain category query param
- [x] Wrong-domain or unknown slug returns 404
- [x] SSR with `revalidate: 3600`
- [x] Agent lead form fields driven by agent payload
- [x] Lead POST includes `agentSlug` and `domainId`
- [x] Chat shell present (placeholder)

### User stories covered

31, 32, 33, 34, 39

---

## Issue #10 — Influencer tracking and attribution

**Type:** AFK  
**Blocked by:** #1, #2

### What to build

Complete influencer flow at `/i/[slug]`. Validate influencer slug against backend with domain category; 404 if invalid or wrong domain. On valid slug, persist to lead store and sessionStorage; parse UTM params from URL. Render full homepage (silent tracking). Ensure all subsequent lead submissions from #2 include `influencerSlug` and UTM fields.

End-to-end proof: valid influencer link on correct domain shows homepage and attributes next lead submit; invalid slug 404.

### Acceptance criteria

- [x] Invalid or cross-domain influencer slug returns 404
- [x] Valid slug persists to lead store and sessionStorage
- [x] UTM parameters captured from URL
- [x] Homepage renders immediately after valid influencer land
- [x] Lead from `/apply` or other forms includes influencer + UTM after visit
- [x] Tracking is silent (no visible tracking UI)

### User stories covered

35, 36, 37, 38, 41, 42

---

## Issue #11 — Dual-domain Vercel deployment

**Type:** AFK  
**Blocked by:** #1–#10

### What to build

Deploy studyabroad.ai and ivfguide.com from separate Vercel projects sharing one repo. Configure `NEXT_PUBLIC_DOMAIN` per project, apex + www domains, shared API env vars, and production allowed-host lists. Smoke test both domains: branding, 404 on wrong host, lead submit, tools, and one API-driven page each.

End-to-end proof: both production URLs serve correct isolated brands from lean builds.

### Acceptance criteria

- [x] Vercel project config for studyabroad with `NEXT_PUBLIC_DOMAIN=studyabroad` (`env/vercel-studyabroad.env.example`)
- [x] Vercel project config for ivf with `NEXT_PUBLIC_DOMAIN=ivf` (`env/vercel-ivf.env.example`)
- [x] Wrong host on each project returns 404
- [x] Each deploy bundle contains only its domain config
- [x] Smoke test checklist documented in `docs/DEPLOYMENT.md` (run on both domains after Vercel deploy)
- [x] Deployment steps documented in repo README and `docs/DEPLOYMENT.md`

### User stories covered

44, 45, PRD success criteria (all checkboxes verifiable)

---

## Out of scope for these issues

- Full Socket.io hero/agent chat (phase 2 per D17)
- Payments on userside
- Admin/business/influencer dashboards
- Backend reserved-slug validation (backend team; see RESERVED-ROUTES.md)
- Additional verticals beyond studyabroad + ivf
- E2E Playwright suite (manual smoke test in #11)

---

## Publishing checklist

When breakdown is approved:

- [ ] Create issues in dependency order (#1 first)
- [ ] Apply `ready-for-agent` triage label to AFK issues
- [ ] Link each issue to parent PRD / epic
- [ ] Replace `#N` blocked-by references with real issue IDs

---

*Generated from [PRD.md](./PRD.md). Iterate via quiz above before publishing.*
