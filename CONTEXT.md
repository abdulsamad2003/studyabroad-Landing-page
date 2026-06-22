# Sayy Platform — Public Websites Codebase

## What This Codebase Is
This is a single Next.js 14 App Router codebase that powers multiple
public-facing websites across different verticals — starting with
studyabroad.ai and ivfguide.com, expanding later into tourism, real
estate, hair transplant, courses, and any other category. Each website
is a fully branded standalone product in the eyes of the user but is
entirely powered by the same underlying code. No domain has its own
codebase, its own repo, or its own components. One codebase serves all
domains forever.

This codebase handles two things only:
1. The public website for each domain with an AI agent embedded in the hero
2. Business agent pages accessible via slug on each domain
The separate admin dashboard, business dashboard, and influencer dashboard
live in a completely different codebase and are not part of this repo.

## How Multi-Domain Works

Every domain has a TypeScript config file inside /config/domains/. This
config defines everything about that website — brand name, logo, colors,
font, navbar links, which homepage sections appear and in what order,
hero heading and subheading, quick matcher inputs and output logic, lead
form fields, which Sayy AI agent powers the hero chat, and all SEO
metadata. The config is resolved on the server in layout.tsx using the
HTTP Host header. The resolved config is passed to a SectionRenderer
client component which hydrates Zustand configStore, sets CSS variables
for theming using the domain's primary and secondary colors, then maps
the config sections array to real React components and renders them in
order. The homepage is entirely config-driven. No page file contains any
domain-specific logic. Every section component reads what it needs from
Zustand configStore.

For local development, NEXT_PUBLIC_DOMAIN environment variable overrides
host detection so any domain can be simulated instantly without DNS setup.
For deployment, each domain gets its own Vercel project. The build is run
with the domain env variable set so the output contains only that domain's
config, keeping bundles lean and deployments isolated from each other.

## The Hero Section

Every domain's homepage hero has two columns. Left side shows the heading,
subheading, trust numbers, and CTAs from config. Right side shows a live
AI chat widget powered by the domain's Sayy AI agent specified in
config.aiAgent.agentId. The agent for studyabroad.ai understands
universities, visa rules, IELTS requirements, costs, intakes, and
scholarships. The agent for ivfguide.com understands IVF treatments,
clinic success rates, medication protocols, costs, and recovery. The
agent can capture the user's name and phone number inline inside the
conversation, which creates a lead without the user finding a separate
form. This is the primary lead capture mechanism.

## Business Agent Pages

Businesses registered on the Sayy Marketplace can optionally create their
own AI agent and get a public-facing page on the domain. The URL pattern
is domainname.com/agentslug — for example studyabroad.ai/imperial-consultancy
or ivfguide.com/nova-ivf-mumbai. These pages are powered by the
/app/[agentSlug]/page.tsx route which fetches the business agent data from
the backend API by slug. If the slug exists in the database as an active
business agent, a fully branded agent page renders showing that business's
logo, colors, tagline, and their own Sayy AI agent in a chat interface
with their own lead form. If the slug does not exist, Next.js returns a
404. Real application routes like /tools, /blog, /apply, /explore, and /i
always take priority over the [agentSlug] catch-all route so there is no
conflict. Business agents are created and managed entirely from the admin
and business dashboards in the separate codebase. This frontend only reads
and displays them.

## Tools Pages

The tools routes — /tools/eligibility, /tools/calculator, /tools/predictor
— exist once in the codebase but render completely different experiences
per domain based on config.tools configuration. For studyabroad.ai the
eligibility check asks IELTS score, GPA, target country, and budget and
outputs university matches labeled Safe, Target, and Reach. For ivfguide.com
the same route asks age, AMH level, and previous IVF attempts and outputs
treatment success likelihood and recommended clinic tier. The calculator
on studyabroad.ai computes tuition plus living costs plus visa fees. The
same route on ivfguide.com computes treatment cycles plus medication plus
hospital stay costs. Config drives what inputs appear, what logic runs,
and what output is shown.

## Provider Pages

The route /explore/[providerType]/[slug] handles all listing detail pages.
The providerType comes from the domain config so studyabroad.ai generates
URLs like /explore/university/oxford-university and ivfguide.com generates
/explore/clinic/nova-ivf-mumbai. Both are rendered by the same page.tsx
file fetching from the backend API with the domain category as a filter.
The page layout is identical — name, key stats, description, gallery on
the left, lead form and AI chat on the right — but the stat labels and
data fields differ per domain based on config.

## Influencer Tracking

Influencers are created and managed in the admin dashboard in the separate
codebase. Each influencer gets a unique slug and a tracking URL in the
format domainname.com/i/influencerslug. When a user lands on this route,
the useInfluencerTracking hook reads the slug from URL params and persists
it to Zustand leadStore and sessionStorage. All subsequent lead form
submissions anywhere on the site include the influencer slug and UTM
parameters in the POST body. The /i/[slug] page renders the full homepage
so the user sees the normal site immediately. Tracking is completely silent.

## Lead Flow

Every lead created on this codebase — whether from the hero chat, a tool
page, a provider page, or a business agent page — is posted to the backend
API with a consistent payload: name, phone, email, domain category, form
fields specific to that domain, influencer slug if present, UTM parameters,
and the agent slug if the lead came from a business agent page. The backend
processes the lead, runs AI scoring, and routes it into the Sayy Marketplace
auction system. This frontend never handles lead storage, scoring, or
auction logic. It only collects and submits.

## Rendering Strategy

Homepage and marketing pages use SSG for maximum performance and SEO.
Provider listing pages use SSG with 24 hour revalidation. Blog articles
use SSG. Business agent pages use SSR with 1 hour cache because agent
data changes more frequently. Tool pages and the apply page use CSR
because they are fully interactive with no SEO requirement. The
[agentSlug] catch-all uses SSR. All metadata is generated server-side
using Next.js generateMetadata per page using config.seo.titleTemplate
and page-specific data.

## Tech Stack

Framework: Next.js 14 App Router
Language: TypeScript
Styling: TailwindCSS with CSS variables for per-domain theming
Client State: Zustand
Server State: TanStack Query
Forms: React Hook Form with Zod validation
Animation: Framer Motion
Charts: Recharts
Real-time: Socket.io Client
HTTP: Axios with interceptors
Icons: Lucide React
Notifications: React Hot Toast