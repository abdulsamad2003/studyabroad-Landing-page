# Dual-domain Vercel deployment

One GitHub repo, **two Vercel projects**. Each project bakes a single domain at build time via `NEXT_PUBLIC_DOMAIN`. Middleware and `getDomainConfig()` return **404** when the request `Host` is not on that domain's `allowedHosts` list.

## Projects

| Vercel project | `NEXT_PUBLIC_DOMAIN` | Custom domains |
|----------------|------------------------|----------------|
| `sayy-studyabroad` | `studyabroad` | `studyabroad.ai`, `www.studyabroad.ai` |
| `sayy-ivf` | `ivf` | `ivfguide.com`, `www.ivfguide.com` |

Env templates: [`env/vercel-studyabroad.env.example`](../env/vercel-studyabroad.env.example), [`env/vercel-ivf.env.example`](../env/vercel-ivf.env.example).

## Setup (per project)

1. In Vercel, **Add New Project** → import this repo (same repo for both projects).
2. **Settings → Environment Variables** — copy from the matching `env/vercel-*.env.example` and set production API URLs.
3. **Settings → Domains** — add apex + `www` for that vertical.
4. Point DNS (A/CNAME) to Vercel per their dashboard instructions.
5. Deploy. Confirm build logs show the correct `NEXT_PUBLIC_DOMAIN`.

### Shared vs per-project env

| Variable | Per project? | Notes |
|----------|--------------|-------|
| `NEXT_PUBLIC_DOMAIN` | **Yes** | `studyabroad` or `ivf` — baked at build time |
| `API_URL` | Shared value | Server-side fetches (RSC) |
| `NEXT_PUBLIC_API_URL` | Shared value | Client-side fetches |
| `NEXT_PUBLIC_SOCKET_URL` | Shared value | Future AI chat |

## Lean builds (local verification)

Each production build should expose **only one** domain config:

```bash
npm run build:studyabroad
npm run build:ivf
```

Automated checks: `npm run test` includes `config/index.test.ts` and `config/production-deploy.test.ts`.

After a lean build, start and spot-check branding:

```bash
# PowerShell
$env:NEXT_PUBLIC_DOMAIN="ivf"; npm run start
```

## Host isolation

| Build | Allowed hosts | Blocked (404) |
|-------|---------------|---------------|
| `studyabroad` | `studyabroad.ai`, `www.studyabroad.ai`, `*.vercel.app` (preview) | `ivfguide.com`, wrong apex |
| `ivf` | `ivfguide.com`, `www.ivfguide.com`, `*.vercel.app` (preview) | `studyabroad.ai`, wrong apex |

Wrong-host behavior is enforced in **middleware** (production) and **`getDomainConfig()`** (server components).

## Smoke test checklist

Run on **each** production URL (and once on a Vercel preview URL before go-live).

### Branding & isolation

- [ ] Homepage shows correct name, colors, and navbar links for the domain
- [ ] Explore link points to correct `providerType` (`/explore/university` vs `/explore/clinic`)
- [ ] Request with wrong `Host` header returns 404 (or use the other domain's URL on this deploy — should not show the other brand)

### Tools (CSR)

- [ ] `/tools/eligibility` loads and returns domain-specific results
- [ ] `/tools/calculator` runs without errors
- [ ] `/tools/predictor` runs without errors

### Lead capture

- [ ] `/apply` form submits successfully (toast + network `POST /leads` with correct `domainId`)
- [ ] After `/i/{valid-influencer-slug}?utm_source=test`, `/apply` submit includes `influencerSlug` + UTM fields

### API-driven pages (one per domain)

- [ ] **Studyabroad:** `/blog` or `/explore/university/{slug}` loads (or empty state, not 500)
- [ ] **IVF:** `/blog` or `/explore/clinic/{slug}` loads (or empty state, not 500)

### PRD v1 success criteria (deploy verification)

- [ ] Both domains deploy from separate Vercel projects with correct branding
- [ ] Wrong host on either project returns 404
- [ ] Homepage sections render from config
- [ ] Hero shows chat placeholder; tools use domain logic
- [ ] Leads include `domainId` from all form entry points
- [ ] Provider, blog, agent, influencer URLs enforce domain scope

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Wrong brand on production | `NEXT_PUBLIC_DOMAIN` not set on that Vercel project, or redeploy needed after env change |
| Everything 404 on custom domain | DNS not propagated, or domain not added in Vercel |
| API pages empty / 404 | Backend not reachable; check `API_URL` / `NEXT_PUBLIC_API_URL` |
| Preview works, custom domain 404 | `allowedHosts` mismatch — confirm apex + `www` in domain config |

## Related docs

- [GUIDE.md](./GUIDE.md) — full developer guide
- [GRILLED.md](../GRILLED.md) — D1 (one Vercel project per domain), D2 (allowedHosts)
