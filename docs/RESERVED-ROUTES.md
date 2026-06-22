# Reserved Routes & Agent Slugs

Business agent pages use the catch-all route `/[agentSlug]` (e.g. `studyabroad.ai/imperial-consultancy`). These **fixed platform routes always take priority** over any business agent slug.

## Reserved top-level slugs

A business **cannot** register any of these as their agent slug:

| Slug | Route | Purpose |
|------|-------|---------|
| `tools` | `/tools/*` | Eligibility, calculator, predictor |
| `blog` | `/blog`, `/blog/[slug]` | Blog listing and articles |
| `apply` | `/apply` | Application flow |
| `explore` | `/explore/[providerType]/[slug]` | Provider listing pages |
| `i` | `/i/[slug]` | Influencer tracking links |

## How routing works (userside)

Next.js App Router resolves **file-based routes first**. A request to `/blog` always hits `app/blog/page.tsx`, never `app/[agentSlug]/page.tsx` — even if a business agent with slug `blog` exists in the database.

## Validation (source of truth)

| Layer | Responsibility |
|-------|----------------|
| **Backend API** | **Source of truth.** Rejects reserved slugs when a business creates or updates their agent slug. Returns an error the dashboard can show. |
| **Admin / business dashboard** | Calls the API on slug save. If reserved → show error: *"This slug is already reserved. Please choose another."* |
| **Userside (this repo)** | Does not validate slugs. Routing is handled by Next.js file priority. This doc is the reference list for developers. |

## Adding a new reserved route

When a new top-level platform route is added to this codebase:

1. Add it to the table above.
2. Update the reserved-slug list in the **backend API** (source of truth).
3. Ensure the dashboard error message covers the new slug.

## Related decisions

See [GRILLED.md](../GRILLED.md) — **D14** (reserved routes beat agent slugs), **D15** (backend validates, this doc references).


