JOÃO MARCOS FERREIRA VILELA

Full-Stack Developer & Technical Operations Analyst · WhatsApp Automation, ERP Integrations & Multi-Agent AI
Location: Caruaru, PE — Brazil | Phone: +55 (87) 99609-3326 | Email: jaomarfervil@gmail.com

LinkedIn: linkedin.com/in/joao-marcos-ferreira-vilela · GitHub: github.com/JaoVile · Portfolio: joaovilela.vercel.app

Languages: Portuguese (Native) · English — Advanced C1 (Duolingo English Test: 130, 2026) · Spanish & French (basic reading)

PROFESSIONAL SUMMARY
Full-stack developer and technical operations analyst with an Oracle Generative AI certification, building the integrations that connect business systems to WhatsApp and the multi-agent AI that answers through them. In production today: ERP-to-WhatsApp integrations (Hinova SGA, South, DevSul, Conta Azul) automating billing, PIX/boletos and invoice notices; a multi-tenant fleet-management SaaS delivering daily WhatsApp reports; and a 24/7 WhatsApp support architecture with 8+ specialized AI agents and a routing supervisor (LLMs, RAG). I also own the operations layer behind these systems — container orchestration, database replication monitoring, automated backups and health checks — not just the application code. Main stack: TypeScript/Next.js, Node.js (Hono/Express), Python (FastAPI), PostgreSQL/Supabase, Prisma, Docker.

PROFESSIONAL EXPERIENCE

Technical Operations Analyst — Mar 2026 – Present
Átomo Soluções e Gestão — B2B services & automation · Full-time | Caruaru, Brazil

• ERP–WhatsApp integrations: build and maintain in production integrations between vehicle-protection ERPs (Hinova SGA, South, DevSul) and Conta Azul and WhatsApp — automated billing, boleto/PIX delivery, invoice and tax notices (Node.js, TypeScript, Hono, Supabase).
• Multi-tenant SaaS: built a platform that extracts fleet-management data daily and dispatches personalized WhatsApp reports (Node.js, Express, PostgreSQL, Prisma).
• Conta Azul WhatsApp: architected an integration for an accounting firm — automatic poller + billing panel with PDF preview and a dunning sequence (new invoice, reminder, overdue, paid).
• Multi-agent AI support: designed a 24/7 WhatsApp support architecture (8+ specialized agents + a routing supervisor) with a knowledge base and safety guardrails (LLMs, RAG).
• Operations & reliability: wrote a Postgres replication monitor (lag, WAL retention, offline-slot alerting), automated backup rotation to S3, and health-check endpoints consumed by load balancers — the same operational discipline applied to a financial ERP (.NET, Postgres/TimescaleDB, Docker Swarm + Traefik) and a customer-facing app running in PM2 cluster mode.
• Internal automation: Python automations for bulk conversation management in Chatwoot, with CSV auditing and a safe preview mode.

Co-Founder & Full-Stack Engineer — Oct 2025 – Jun 2026
Gnomon — Indoor-navigation startup · Caruaru, Brazil (Hybrid)

• Sole developer of the system's core: routing algorithms, API and React UI for an indoor-wayfinding PWA covering university campuses, hospitals and event venues.
• Full TypeScript architecture across front-end and back-end; end-to-end testing with Cypress.
• Mobile-first UI and interactive maps overcoming traditional GPS limitations indoors.
• Recognition: ranked 1st among all ADS cohorts and advanced through the Centelha 3 government innovation program.

Freelance Web Developer — 2023 – 2025
Independent · Front-End & Web Solutions

• Delivered production sites for paying clients, including SolarTech (energy-savings platform with simulation dashboards, React + Vite) and Renova Aesthetic (full e-commerce for an aesthetics clinic, Next.js + Stripe).
• All projects delivered on time and approved on first review.

SYSTEMS I BUILT AND OPERATE (personal projects, running in production)

Touvie — Personal Life OS · Next.js 15, Supabase (RLS), Telegram Bot, PWA · 2026 – Present
Personal life-management system — routines, goals, journal, finances, workouts and diet in one installable PWA, with a Telegram bot for logging and an AI assistant that calls real tools against real data (create/edit/complete goals, log transactions) rather than just answering questions. Device-trust middleware via signed HMAC-SHA256 cookies, Supabase row-level security enforced and proven with E2E tests, documented fallbacks for LLM provider outages. 320+ commits, 40+ SQL migrations, Playwright test suite.

Caçador de Ofertas — Deal-Hunting Bot · Next.js, Supabase, Telegram Bot · 2026 – Present
Scrapes Brazilian Telegram deal channels, parses price/coupon/store from free-form Portuguese text, and alerts via Telegram only when a tracked product enters its price range. Includes a price-floor heuristic calibrated on real collected data and a dead-man's-switch canary to detect a broken scraper. 470+ passing tests.

cobraflow — WhatsApp Collections Dashboard · Next.js 16, SSE, WhatsApp Cloud API · 2026 – Present
Collections dispatch dashboard over WhatsApp: batch engine with live progress via Server-Sent Events, cron scheduling, a two-layer blocklist in front of every send, and a full audit log on mutating actions. Built clean-room on synthetic data.

allchats — Multi-Tenant WhatsApp Support Bot · Next.js 16, React 19, Claude SDK · 2026 – Present
Multi-tenant WhatsApp automation answering from a knowledge base with safety guardrails, escalating to a human via tool use. Runs safely with no API key configured — CI exercises that deterministic fallback on purpose.

Zaptutor — Chrome Extension · Chrome MV3, JavaScript · 2026
Prefixes the attendant's name onto every outgoing message on a WhatsApp Web number shared by multiple people, so customers always know who they're talking to. Zero network calls, formatting logic covered by unit tests.

agendapp — Appointment Scheduling PWA · Next.js 16, Supabase, Google APIs · 2026
Instant Google Meet booking with two-way Google Calendar sync; concurrency-tested to guarantee two people can never win the same slot.

Gnomon — Indoor Wayfinding PWA · TypeScript, React, PWA · 2025
Interactive-map wayfinding for complex venues, built during the Gnomon startup.

TECHNICAL SKILLS

• Languages: TypeScript, JavaScript, Python, SQL, C#.
• Front-end: React, Next.js (App Router, SSR), Tailwind CSS, Framer Motion.
• Back-end: Node.js (Hono, Express), Python (FastAPI), .NET, REST API design, OOP.
• AI & Automation: Claude & GPT APIs (applied, tool-calling), multi-agent systems, RAG with guardrails, prompt engineering, n8n, Typebot.
• Data & Databases: PostgreSQL, TimescaleDB, Supabase (RLS enforced with E2E tests), Prisma, Alembic.
• Integrations & Messaging: ERP integrations (Hinova SGA, South, DevSul, Conta Azul), WhatsApp Business API & Cloud API (Meta-approved templates), Chatwoot, Helena CRM, Google Calendar API.
• DevOps & Cloud: Docker Swarm + Traefik, PM2 (cluster mode), systemd, AWS (S3, EC2), Oracle Cloud (OCI), Vercel, Fly.io.
• Reliability engineering: database replication monitoring, automated backup rotation, health-check endpoints, dry-run/blocklist patterns for irreversible actions.
• Tools: Git/GitHub, Cypress & Playwright (E2E), CI/CD, Scrum/Kanban, Linux.

EDUCATION & CERTIFICATIONS

Associate Degree in Systems Analysis and Development — Jan 2024 – Dec 2025
UNINASSAU — Caruaru, Brazil · GPA 8.6/10
• Perfect scores (10.0) in Software Architecture, Cloud Computing and Machine Learning. Gnomon ranked 1st among all ADS cohorts (2025).

• Harvard CS50 (2026, in progress) — Introduction to Computer Science, studied fully in English.
• Python Back-End Bootcamp — DIO & Santander (2025, 58h) — FastAPI, Docker, SQL, MongoDB.
• Oracle 2025 Certified Generative AI Professional — Oracle, Sep 2025 (LLMs, Generative AI).
• AWS Educate — Introduction to Cloud 101 — Amazon Web Services, Jul 2025.
