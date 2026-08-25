# JOÃO MARCOS FERREIRA VILELA

**Full-Stack Engineer — AI Integrations, Messaging Automation & Production Operations**

Caruaru, Brazil (UTC−3) · **Open to remote — full US/EU morning overlap**
jaomarfervil@gmail.com · +55 87 99609-3326
[linkedin.com/in/joao-marcos-ferreira-vilela](https://linkedin.com/in/joao-marcos-ferreira-vilela) · [github.com/JaoVile](https://github.com/JaoVile) · [joaovilela.vercel.app](https://joaovilela.vercel.app)

English — C1 Advanced (Duolingo English Test 130, 2026) · Portuguese — Native

---

## SUMMARY

I build the integrations that connect business systems to WhatsApp, the automated support that runs on top of them, and the operations layer that keeps both alive. Currently shipping ERP↔WhatsApp automation for the vehicle-protection and accounting sectors. Oracle-certified in Generative AI, and I use an LLM agent workflow as part of how I develop. I own what happens after deploy — replication monitoring, backup verification, health checks — not just application code.

**Stack:** TypeScript · Next.js · Node.js · Python/FastAPI · PostgreSQL · Docker · LLM tool-calling & RAG

---

## EXPERIENCE

### Technical Operations Analyst · Átomo Soluções e Gestão
*Mar 2026 – Present · Full-time · Caruaru, Brazil — B2B services & automation*

- **WhatsApp support automation:** build and run the chatbots that answer members of vehicle-protection associations, mapping the questions that actually recur into deterministic flows. Prototyped an identity-aware layer — CPF lookup against the ERP — so the bot answers with the member's real situation instead of a generic script. `‹impact: messages handled/month or minutes saved per ticket›`
- **ERP↔WhatsApp integrations:** built and maintain in production the integrations between 4 ERPs (Hinova SGA, South, DevSul, Conta Azul) and WhatsApp, automating billing, boleto/PIX delivery and invoice notices. `‹impact: messages/month or manual hours removed›` *(Node.js, TypeScript, Hono, Supabase)*
- **Multi-tenant SaaS:** built a platform that pulls fleet-management data daily and dispatches personalized WhatsApp reports, with per-tenant credentials encrypted at rest. *(Node.js, Express, PostgreSQL, Prisma)*
- **Reliability engineering:** wrote a Postgres replication monitor (lag, apply delay, retained WAL, offline-slot alerting), automated 2-hourly backups with 24-copy rotation and S3 mirroring, and a target-verification check that aborts a backup pointing at the wrong destination.
- **Production platform:** operate a financial ERP (.NET, PostgreSQL/TimescaleDB) on Docker Swarm + Traefik and a customer-facing app in PM2 cluster mode, with `/healthz` endpoints consumed by the load balancer.
- **Internal automation:** Python tooling for bulk conversation management in Chatwoot, with CSV audit trails and a mandatory dry-run before any destructive action.

### Co-Founder & Full-Stack Engineer · Gnomon
*Oct 2025 – Jun 2026 · Indoor-navigation startup · Caruaru, Brazil*

- Sole developer of the system core: routing algorithms, API and React UI for an indoor-wayfinding PWA for campuses, hospitals and event venues.
- Full-TypeScript architecture front to back, with end-to-end coverage in Cypress.
- Ranked **1st among all Systems Analysis cohorts** and advanced through **Centelha 3**, a Brazilian government innovation program.

### Freelance Web Developer
*2023 – 2025 · Independent*

- Delivered production sites for paying clients: **SolarTech** (energy-savings platform with simulation dashboards, React + Vite) and **Renova Aesthetic** (e-commerce for an aesthetics clinic, Next.js + Stripe).

---

## SELECTED PROJECTS

Systems I built and operate in production. Full catalogue with live demos at [joaovilela.vercel.app](https://joaovilela.vercel.app).

**Touvie** — Personal life OS · *Next.js 15, Supabase, Telegram, PWA*
An AI assistant that **writes to real data** through tool calls — creating goals, logging transactions — not just answering questions. Device-trust middleware on signed HMAC-SHA256 cookies; Supabase row-level security proven by E2E tests that assert one user cannot read another's records. 320+ commits, 40+ migrations, Playwright suite.

**Caçador de Ofertas** — Deal-hunting bot · *Next.js, Supabase, Telegram*
Parses price, coupon and store out of free-form Portuguese across 25 Telegram channels every 5 minutes. Separating coupon values from product prices is what made the alerts trustworthy — read naively, "R$30 OFF" becomes a R$30 product and satisfies every hunt. Ships a dead-man's-switch canary that catches a silently broken scraper. **470+ passing tests.**

**allchats** — Multi-tenant WhatsApp support bot · *Next.js 16, React 19, Claude SDK*
RAG-grounded answers with guardrails and human escalation via tool use. Runs correctly with **no API key configured** — CI exercises that deterministic fallback path on purpose, so a provider outage degrades instead of breaking.

*Also:* **cobraflow** (WhatsApp collections dispatch — SSE batch engine, two-layer blocklist, audit log) · **agendapp** (booking PWA, concurrency-tested so two people can never win the same slot) · **Zaptutor** (Chrome MV3 extension, zero network calls).

---

## TECHNICAL SKILLS

**Languages** TypeScript · JavaScript · Python · SQL · C#
**AI Engineering** LLM tool-calling (Claude, GPT) · RAG with guardrails · prompt engineering · agent-assisted development workflow
**Back-end** Node.js (Hono, Express) · FastAPI · .NET · REST API design · Server-Sent Events
**Front-end** React · Next.js (App Router, SSR) · Tailwind CSS
**Data** PostgreSQL · TimescaleDB · Supabase (RLS) · Prisma · Alembic
**Integrations** WhatsApp Business & Cloud API (Meta templates) · ERP APIs · Google Calendar API · Chatwoot · n8n
**Infrastructure** Docker Swarm + Traefik · PM2 cluster mode · systemd · AWS (S3, EC2) · Oracle Cloud · Vercel · Fly.io
**Reliability** replication monitoring · backup rotation & verification · health-check endpoints · dry-run and blocklist patterns for irreversible actions
**Testing** Playwright · Cypress · Vitest · concurrency and cross-tenant isolation testing

---

## EDUCATION & CERTIFICATIONS

**Associate Degree, Systems Analysis and Development** — UNINASSAU, Brazil · *Jan 2024 – Dec 2025* · GPA 8.6/10
Perfect scores in Software Architecture, Cloud Computing and Machine Learning.

- **Oracle Certified Generative AI Professional** — Oracle, Sep 2025
- **CS50: Introduction to Computer Science** — Harvard, 2026 *(in progress)*
- **Python Back-End Bootcamp** — DIO & Santander, 2025 (58h)
- **AWS Educate: Introduction to Cloud 101** — AWS, Jul 2025
