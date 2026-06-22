# PRD — Sayy Public Websites v1 (studyabroad.ai + ivfguide.com)

**Status:** Ready for implementation  
**Inputs:** [GRILLED.md](../GRILLED.md), [CONTEXT.md](../CONTEXT.md), [RESERVED-ROUTES.md](./RESERVED-ROUTES.md)  
**Date:** 2026-06-13

---

## Problem Statement

Sayy needs multiple fully branded public websites (starting with studyabroad.ai and ivfguide.com) that feel like standalone products but share one codebase. Today the repo is an early scaffold: domain routing and layout exist, but homepage sections, tools, provider pages, blog, lead submission to the backend, domain-scoped API calls, and production-ready multi-domain builds are largely unimplemented.

Visitors cannot yet complete meaningful journeys (check eligibility, explore providers, read blog content, submit leads to the marketplace). Businesses and influencers cannot be served correctly across domains without strict domain-category isolation. The team needs a v1 plan that ships both verticals together, establishes repeatable patterns for future domains, and defers non-blocking work (full AI chat, payments) without blocking launch.

---

## Solution

Deliver v1 of the Sayy public websites codebase for **studyabroad.ai** and **ivfguide.com** in parallel:

1. **Config-driven multi-domain platform** — one repo, separate Vercel project per domain, lean production builds, shared backend API with explicit `domainId` on every request.
2. **Complete public site surfaces** — config-driven homepage, hybrid tools, domain-scoped explore/blog/agent/influencer pages, apply flow, and lead capture wired to the backend.
3. **Hero with chat placeholder** — branded hero with embedded chat UI shell; full Socket.io agent integration deferred.
4. **Domain isolation everywhere** — agents, providers, influencers, and blog content scoped per domain; wrong domain or wrong `providerType` → 404.
5. **Rendering mix per page type** — SSG for SEO pages, SSR for business agents, CSR for tools and apply.

Future verticals (tourism, real estate, etc.) add a domain config file, tool logic files, and a new Vercel project — not a new repo.

---

## User Stories

### Visitors — discovery and browsing

1. As a visitor on studyabroad.ai, I want to see a branded homepage with study-abroad-specific copy, colors, and sections, so that I immediately understand this site is for university planning abroad.
2. As a visitor on ivfguide.com, I want to see IVF-specific branding and content on the homepage, so that I trust the site is focused on fertility guidance.
3. As a visitor, I want the homepage to load quickly and be indexable by Google, so that I find the site via search.
4. As a visitor, I want a consistent navbar and footer across pages on the same domain, so that navigation feels cohesive.
5. As a visitor on mobile, I want a usable layout with a mobile bottom bar, so that I can navigate without a desktop.
6. As a visitor, I want to contact the business via WhatsApp using the number configured for this domain, so that I can reach support on my preferred channel.
7. As a visitor, I want each domain to only show content belonging to that vertical, so that I never see IVF clinics on studyabroad.ai or universities on ivfguide.com.

### Visitors — hero and chat (v1 placeholder)

8. As a visitor, I want to see a hero with a clear headline, subheadline, trust signals, and CTAs from domain config, so that I understand what to do next.
9. As a visitor, I want to see an AI chat box in the hero area, so that the product feels interactive even before full AI is connected.
10. As a visitor, I want primary and secondary CTAs in the hero to link to the right tools for my domain, so that I can start eligibility or calculator flows quickly.
11. As a visitor typing in the hero chat box (v1), I want a basic chat UI that accepts messages locally, so that the layout is ready for real AI in a later phase.

### Visitors — tools

12. As a study-abroad visitor, I want `/tools/eligibility` to ask for IELTS, GPA, target country, and budget, so that I can check my university fit.
13. As a study-abroad visitor, I want eligibility results labeled Safe, Target, and Reach, so that I understand my admission chances clearly.
14. As an IVF visitor, I want `/tools/eligibility` to ask for age, AMH level, and previous IVF attempts, so that I get fertility-relevant guidance.
15. As an IVF visitor, I want eligibility results showing success likelihood and recommended clinic tier, so that I can gauge next steps.
16. As a study-abroad visitor, I want `/tools/calculator` to estimate tuition, living costs, and visa fees, so that I can plan my budget.
17. As an IVF visitor, I want `/tools/calculator` to estimate treatment cycles, medication, and hospital stay costs, so that I understand financial commitment.
18. As a visitor on either domain, I want `/tools/predictor` to provide a domain-appropriate predictive experience driven by config and logic, so that tools stay consistent in UX but different in substance.
19. As a visitor, I want tool pages to work without requiring Google SEO, so that interactivity is prioritized over static indexing for tools.

### Visitors — provider explore pages

20. As a study-abroad visitor, I want to open `/explore/university/{slug}` and see university name, key stats, description, and gallery, so that I can evaluate a institution.
21. As an IVF visitor, I want to open `/explore/clinic/{slug}` and see clinic name, stats, description, and gallery, so that I can compare clinics.
22. As a visitor, I want a lead form and chat area on provider pages, so that I can enquire without leaving the page.
23. As a visitor, I want provider stat labels and fields to match my domain (e.g. ranking vs success rate), so that information is relevant.
24. As a visitor who mistypes a provider URL with the wrong `providerType` for this domain, I want a 404, so that cross-vertical URLs never render.

### Visitors — blog

25. As a visitor, I want `/blog` to list articles for my domain only, so that I read vertical-specific content.
26. As a visitor, I want `/blog/{slug}` to show a full article for my domain, so that I can read guides and SEO content.
27. As a visitor, I want blog pages to be static and fast, so that articles rank well in search.

### Visitors — apply and lead forms

28. As a visitor, I want `/apply` to show a domain-specific lead form with fields from config, so that I can submit my interest.
29. As a visitor submitting any lead form, I want validation on required fields (name, email, phone, domain-specific fields), so that I fix mistakes before submit.
30. As a visitor, I want confirmation that my lead was submitted successfully, so that I know someone will follow up.
31. As a visitor coming from a business agent page, I want my lead to include which business agent I came from, so that the enquiry routes correctly.

### Visitors — business agent pages

32. As a visitor, I want to open `domain.com/{business-slug}` and see that business's logo, colors, tagline, and chat area, so that the page feels like their branded storefront.
33. As a visitor, I want business agent pages to only exist on the correct domain for that business category, so that an IVF clinic page never appears on studyabroad.ai.
34. As a visitor opening a non-existent or wrong-domain agent slug, I want a 404, so that broken links are obvious.

### Visitors — influencer tracking

35. As a visitor landing on `domain.com/i/{influencer-slug}`, I want to see the normal homepage immediately, so that tracking does not disrupt my experience.
36. As a visitor from an influencer link, I want my subsequent lead submissions to attribute to that influencer silently, so that the referrer gets credit.
37. As a visitor, I want UTM parameters from the URL captured and sent with my lead, so that campaign tracking is accurate.
38. As a visitor using an influencer slug from the wrong domain, I want a 404, so that cross-domain attribution cannot happen.

### Businesses (via public pages — read-only userside)

39. As a business with a registered agent slug, I want my public page to reflect my branding from the backend, so that customers see my identity.
40. As a business, I want my slug to be rejected at dashboard creation if it collides with reserved routes (`tools`, `blog`, `apply`, `explore`, `i`), so that my page URL always works.

### Influencers (via public pages)

41. As an influencer, I want a tracking URL on the correct domain only, so that my audience lands on the right brand.
42. As an influencer, I want leads generated after my link to carry my slug, so that conversions are attributed to me.

### Developers and operators

43. As a developer, I want to switch domains locally via `NEXT_PUBLIC_DOMAIN` without restarting the dev server, so that I can test both verticals quickly.
44. As a developer, I want production builds to ship only one domain's config per Vercel project, so that bundles stay lean and brands stay isolated.
45. As a developer, I want wrong Host headers on a production deploy to return 404, so that DNS mistakes fail loudly.
46. As a developer, I want adding a new vertical to require only config + tool logic + Vercel project, so that scaling domains is predictable.
47. As a developer, I want a documented list of reserved agent slugs, so that routing rules are clear across codebases.
48. As a developer, I want homepage sections driven by a `sections` array in config, so that page composition does not require new route files per domain.
49. As a developer, I want tool behavior driven by config plus per-domain logic modules, so that unique vertical math does not duplicate UI components.
50. As a developer, I want a single lead payload shape with `domainId` always set, so that the shared backend routes leads reliably.

### SEO and performance

51. As a marketing stakeholder, I want homepage and blog content served as static HTML, so that Core Web Vitals and SEO are strong.
52. As a marketing stakeholder, I want provider pages to revalidate every 24 hours, so that listings stay fresh without full SSR on every hit.
53. As a marketing stakeholder, I want per-page metadata (title, description, keywords) from domain config, so that each domain ranks with correct messaging.

### Study-abroad-specific

54. As a study-abroad visitor, I want homepage sections such as Quick Matcher, Category Cards, How It Works, Provider Listing, Success Stories, Intake Timeline, and Blog Preview, so that the page answers common planning questions.
55. As a study-abroad visitor, I want explore links to use `university` as the provider type, so that URLs match my mental model.

### IVF-specific

56. As an IVF visitor, I want homepage sections appropriate to fertility (without study-abroad-only sections like Intake Timeline if omitted from config), so that the page does not feel misaligned.
57. As an IVF visitor, I want explore links to use `clinic` as the provider type, so that URLs match clinic discovery.

### Accessibility and UX polish

58. As a visitor, I want form errors shown clearly on invalid input, so that I can correct fields easily.
59. As a visitor, I want loading and empty states on API-driven pages, so that I understand when data is fetching or unavailable.
60. As a visitor, I want the site themed with each domain's primary and secondary colors via CSS variables, so that branding is consistent without per-domain CSS files.

---

## Implementation Decisions

### Major modules to build or modify

| Module | Responsibility | Depth |
|--------|----------------|-------|
| **Domain resolution** | Resolve `domainId` from Host / env; enforce `allowedHosts` in production; lean single-config builds in prod, all configs in dev | Deep — central gate for all server rendering |
| **Domain config schema** | Extend `DomainConfig` with `providerType`, `allowedHosts`, `tools` definitions; populate studyabroad + ivf configs | Deep — single vocabulary per vertical |
| **Domain provider / theme** | Hydrate client store from server config; apply CSS variables | Shallow wrapper |
| **Section registry** | Map `config.sections[]` strings to React section components; escape hatch for custom section names | Deep — homepage composition engine |
| **Lead pipeline** | Build canonical lead payload (`domainId`, form fields, `influencerSlug`, UTM, `agentSlug`, `source`); POST to backend; handle success/error UI | Deep — all monetization flows through this |
| **Domain-scoped API access** | Server and client fetch helpers that always attach `domainId` / category query param; normalize 404 on mismatch | Deep — enforces D7–D10 |
| **Tool engine** | Shared tool shell; read `config.tools`; dispatch to per-domain logic registry; optional custom component override | Deep — scales to many verticals |
| **Tool logic registry** | Pure functions per domain per tool (`eligibility`, `calculator`, `predictor`); no React inside logic | Deep — unit-testable |
| **Influencer attribution** | Validate slug via API on `/i/[slug]`; persist to store + sessionStorage; merge into lead payload | Medium |
| **Business agent page loader** | SSR fetch with domain category; cache 1h; render branded agent layout | Medium |
| **Provider page loader** | Validate `providerType` against config; SSG fetch with 24h revalidate; full detail layout | Medium |
| **Blog loader** | Domain-scoped list and article fetch; SSG | Medium |
| **Hero chat shell** | Embedded + floating chat UI; local message state only in v1; slot for future socket integration | Shallow in v1 |
| **Layout chrome** | Navbar from config links (dynamic explore href); Footer; MobileBottomBar; WhatsApp from `whatsappNumber` | Medium |

### Architectural decisions (from grilling)

- **One codebase, separate Vercel project per domain** with `NEXT_PUBLIC_DOMAIN` baked at build time (D1, D4).
- **Production lean bundle** — one `DomainConfig` per deploy; dev loads all configs (D3).
- **Wrong Host → 404** via per-domain `allowedHosts` (D2).
- **One shared backend API**; frontend always sends explicit `domainId` (D5, D11).
- **No payments** on userside (D6).
- **Domain-scoped data** for agents, providers, influencers, blog (D7–D10).
- **Hybrid tools** — shared shell + `config.tools` + per-domain logic files + rare custom component (D12).
- **`providerType` on domain config** — navbar and explore validation use it (D13).
- **Reserved routes beat `[agentSlug]`**; backend validates slugs at dashboard creation (D14, D15). See RESERVED-ROUTES doc.
- **v1 ships studyabroad + IVF together** (D16).
- **Hero chat = UI placeholder only** in v1; Socket.io and inline lead capture later (D17).
- **Rendering:** SSG homepage/blog; SSG + 24h revalidate providers; SSR agents (1h cache); CSR tools/apply (D18).

### Domain config schema extensions

```typescript
type DomainConfig = {
  id: DomainId;                    // "studyabroad" | "ivf" — sent as domainId on leads/API
  providerType: string;            // "university" | "clinic"
  allowedHosts: string[];          // apex + www + preview patterns
  tools: {
    eligibility: ToolDefinition;
    calculator: ToolDefinition;
    predictor: ToolDefinition;
  };
  // existing: name, tagline, colors, logo, hero, sections, navbarLinks,
  // leadFormFields, seo, whatsappNumber, agentId
};

type ToolDefinition = {
  fields: ToolField[];
  logicKey: string;               // maps to tools/logic/{domainId}/{logicKey}
  customComponent?: string;         // escape hatch — section-style component name
};
```

### API contracts (userside → shared backend)

All requests include domain category. Exact paths may match existing backend; userside must send:

**Lead submission**

```
POST /leads
{
  name, phone, email,
  domainId: "studyabroad" | "ivf",
  source?: string,
  influencerSlug?: string,
  agentSlug?: string,
  utm_source?, utm_medium?, utm_campaign?, utm_term?, utm_content?,
  ...domainSpecificFields
}
```

**Business agent**

```
GET /agents/slug/{slug}?category={domainId}
→ BusinessAgent | 404
```

**Provider detail**

```
GET /providers/{providerType}/{slug}?category={domainId}
→ Provider | 404
(revalidate: 86400)
```

**Blog list / article**

```
GET /blog?category={domainId}
GET /blog/{slug}?category={domainId}
```

**Influencer validation**

```
GET /influencers/{slug}?category={domainId}
→ { valid: true } | 404
```

**Reserved slug validation** — backend only (admin dashboard); not called from userside.

### Tool logic interface

```typescript
type ToolInput = Record<string, string | number>;
type ToolResult = {
  summary: string;
  items?: { label: string; value: string; tier?: string }[];
};

type ToolLogicFn = (input: ToolInput, config: ToolDefinition) => ToolResult;
```

Registry maps `(domainId, logicKey)` → `ToolLogicFn`. Study-abroad eligibility returns Safe/Target/Reach buckets; IVF eligibility returns likelihood + clinic tier.

### Rendering per route

| Route | Strategy | Notes |
|-------|----------|-------|
| `/` | SSG | Server `getDomainConfig`; sections from config; hero chat client island |
| `/blog`, `/blog/[slug]` | SSG | Domain-filtered API at build time |
| `/explore/[providerType]/[slug]` | SSG, `revalidate: 86400` | Reject wrong `providerType` before fetch |
| `/[agentSlug]` | SSR, `revalidate: 3600` | Domain-scoped fetch |
| `/tools/*`, `/apply` | CSR | `"use client"` tool shell and forms |
| `/i/[slug]` | SSG shell + client tracker | Validate influencer server-side when API available |

### Homepage sections (v1 implementation priority)

Replace placeholder sections with real UI for both domains:

1. Hero (with chat shell)
2. QuickMatcher
3. CategoryCards
4. HowItWorks
5. ProviderListing (API-driven preview)
6. SuccessStories
7. IntakeTimeline (studyabroad config only)
8. BlogPreview (API-driven preview)

Sections not in a domain's `sections` array are not rendered.

### Deployment

- Vercel project `sayy-studyabroad`: `NEXT_PUBLIC_DOMAIN=studyabroad`, domains `studyabroad.ai` + `www.studyabroad.ai`
- Vercel project `sayy-ivf`: `NEXT_PUBLIC_DOMAIN=ivf`, domains `ivfguide.com` + `www.ivfguide.com`
- Shared env: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL` (socket unused in v1)
- Local dev: `NEXT_PUBLIC_DOMAIN` toggle; all configs loaded

### Specific interactions

- **Lead form submit:** validate → build payload with `domainId` from `configStore` → POST → toast success/failure → optional modal close.
- **Influencer land:** server validates slug (or client on mount if SSR unavailable) → if invalid 404 → else persist slug + parse UTM → render homepage.
- **Explore page:** if `params.providerType !== config.providerType` → `notFound()` → else fetch provider → render two-column layout.
- **Tool submit:** collect form values → run logic registry function → render results card; optional CTA to lead form with prefilled context.

---

## Testing Decisions

### What makes a good test

- Test **external behavior** and **pure logic**, not implementation details or React internals.
- Prefer testing **deep modules** in isolation: tool logic functions, lead payload builder, domain validation helpers, `providerType` guard.
- Do not snapshot entire pages in v1; focus on contracts that prevent cross-domain leakage and lost leads.

### Modules to test (recommended)

| Module | What to test | Priority |
|--------|--------------|----------|
| **Tool logic registry** | Study-abroad eligibility bucketing; IVF eligibility output shape; calculator totals | High |
| **Lead payload builder** | Always includes `domainId`; merges UTM, influencer, agent; omits undefined keys | High |
| **Domain resolution** | `allowedHosts` allow/block; dev vs prod config loading behavior | High |
| **Provider type guard** | Wrong `providerType` for domain rejected | Medium |
| **Reserved slugs doc parity** | Optional smoke test that doc list matches backend contract when API spec is published | Low |

### Prior art

**None.** No jest, vitest, or playwright setup exists. PRD assumes introducing a test runner (recommend **Vitest** for tool logic and payload pure functions) as part of v1 foundation work.

### Not required in v1

- E2E browser tests across both domains (manual QA acceptable for v1).
- Socket.io integration tests (deferred with D17).
- Visual regression tests.

---

## Out of Scope

- **Payment processing** (Razorpay or any checkout) on userside
- **Admin dashboard, business dashboard, influencer dashboard** (separate codebase)
- **Full hero AI chat** — Socket.io connection, live agent responses, inline conversational lead capture (phase 2)
- **Backend lead scoring, storage, auction routing** — userside only POSTs leads
- **Reserved slug enforcement in userside** — backend + dashboard responsibility
- **Analytics integration** (Google Analytics, etc.)
- **Additional verticals** beyond studyabroad and ivf (tourism, real estate, hair transplant, courses) — patterns established, not implemented
- **Blog CMS authoring** — content assumed to come from backend/API
- **User accounts / login** on public sites
- **i18n / multi-language**
- **Email notifications** from userside

---

## Further Notes

### Implementation phasing (suggested build order)

1. **Foundation** — extend `DomainConfig`; domain resolution + `allowedHosts`; lean prod build path; lead payload builder + `POST /leads`
2. **Homepage** — real section components; hero + chat shell; dynamic navbar explore links
3. **Tools** — tool engine + studyabroad/ivf logic for eligibility, calculator, predictor
4. **Explore** — provider page layout + domain-scoped API + lead form
5. **Blog** — listing + article pages
6. **Agents** — domain-scoped SSR + branded page polish
7. **Influencer** — API validation + attribution on leads
8. **Deploy** — two Vercel projects; smoke test both domains

### Dependencies on backend

Userside v1 assumes backend endpoints exist or will be built in parallel for:

- `POST /leads` with `domainId`
- `GET /agents/slug/{slug}?category=`
- `GET /providers/{type}/{slug}?category=`
- `GET /blog` and `GET /blog/{slug}` with category filter
- `GET /influencers/{slug}?category=`
- Reserved slug rejection on agent slug create/update (dashboard)

Coordinate payload field names (`domainId` vs `category`) with backend team before integration.

### Docs to keep in sync

- [GRILLED.md](../GRILLED.md) — architectural decisions (reference, do not duplicate changes)
- [CONTEXT.md](../CONTEXT.md) — should be updated to reflect grilled decisions (payments removed, hybrid tools, domain scoping rules consolidated)
- [RESERVED-ROUTES.md](./RESERVED-ROUTES.md) — update when new top-level routes are added
- [GUIDE.md](./GUIDE.md) — full developer guide (local dev, domains, tools, deploy)
- [TO-ISSUES.md](./TO-ISSUES.md) — vertical slice implementation issues

### Success criteria for v1

- [ ] studyabroad.ai and ivfguide.com deploy from separate Vercel projects with correct branding
- [ ] Wrong Host on either project returns 404
- [ ] Homepage sections render real content from config for both domains
- [ ] Hero shows chat placeholder; tools run domain-specific logic
- [ ] Leads submit to backend with `domainId` from all form entry points
- [ ] Provider, blog, agent, and influencer URLs enforce domain scope
- [ ] Reserved route behavior documented; no agent slug collisions in dashboard (backend)

---

*Derived from grilling session (D1–D18) and codebase audit. Hero AI full integration tracked as phase 2 per D17.*
