/**
 * Sistemas em produção, descritos pela função e não pelo nome.
 *
 * Os nomes reais saíram de propósito: um deles é cliente, outro é produto
 * interno, e hostname de produção num portfólio público é detalhe de
 * infraestrutura que não ajuda o leitor e ajuda quem procura superfície.
 * O que prova competência é a arquitetura e o que a guarda — isso ficou.
 */

export type Bi = { en: string; pt: string };

export const systems = [
  {
    role: { en: "Financial management ERP", pt: "ERP de gestão financeira" },
    detail: {
      en: "Accounting core with time-series data, serving daily operations.",
      pt: "Núcleo contábil com dados de série temporal, servindo a operação diária.",
    },
    runtime: ".NET · Postgres / TimescaleDB",
    platform: "Docker Swarm + Traefik",
  },
  {
    role: { en: "Multi-tenant fleet management SaaS", pt: "SaaS multi-tenant de gestão de frota" },
    detail: {
      en: "Integrates a third-party fleet API and delivers daily reports over WhatsApp, with per-tenant credentials encrypted at rest.",
      pt: "Integra uma API de frota de terceiro e entrega relatórios diários por WhatsApp, com credencial por inquilino criptografada em repouso.",
    },
    runtime: "TypeScript · Postgres · Prisma",
    platform: "Docker Swarm + Traefik",
  },
  {
    role: { en: "Customer-facing web application", pt: "Aplicação web voltada ao cliente" },
    detail: {
      en: "Public product surface, running clustered so a single worker crash is not an outage.",
      pt: "Superfície pública do produto, rodando em cluster pra que a queda de um worker não seja uma queda.",
    },
    runtime: "Next.js · Node",
    platform: "PM2 cluster mode",
  },
  {
    role: { en: "In-product guided tours", pt: "Tours guiados dentro do produto" },
    detail: {
      en: "Onboarding walkthroughs embedded into other products.",
      pt: "Passo a passo de onboarding embarcado em outros produtos.",
    },
    runtime: "Node · PM2",
    platform: "Fly.io",
  },
] as const;

export const monitors = [
  {
    id: "repl",
    name: { en: "Postgres replication monitor", pt: "Monitor de replicação do Postgres" },
    cadence: { en: "every 5 min", pt: "a cada 5 min" },
    detail: {
      en: "Watches replication lag, apply delay and retained WAL. Detects offline replication slots. Structured logging with webhook alerting.",
      pt: "Observa atraso de replicação, delay de aplicação e WAL retido. Detecta slot de replicação offline. Log estruturado com alerta por webhook.",
    },
    thresholds: [
      { label: { en: "Lag", pt: "Atraso" }, value: "50", unit: "MB", level: "warn" },
      { label: { en: "Delay", pt: "Delay" }, value: "60", unit: "s", level: "warn" },
      { label: { en: "Retained WAL", pt: "WAL retido" }, value: "1", unit: "GB", level: "crit" },
    ],
  },
  {
    id: "backup",
    name: { en: "Automated backup with rotation", pt: "Backup automático com rotação" },
    cadence: { en: "every 2 h", pt: "a cada 2 h" },
    detail: {
      en: "pg_dump straight out of the container, 24 rotating copies kept on disk, mirrored offsite to S3.",
      pt: "pg_dump direto do contêiner, 24 cópias rotativas em disco, espelhadas fora do servidor no S3.",
    },
    thresholds: [
      { label: { en: "Interval", pt: "Intervalo" }, value: "2", unit: "h", level: "ok" },
      { label: { en: "Copies kept", pt: "Cópias mantidas" }, value: "24", unit: "", level: "ok" },
      { label: { en: "Offsite", pt: "Fora do servidor" }, value: "S3", unit: "", level: "ok" },
    ],
  },
  {
    id: "target",
    name: { en: "Backup target verification", pt: "Verificação do destino do backup" },
    cadence: { en: "every run", pt: "toda execução" },
    detail: {
      en: "A backup pointing at the wrong destination is worse than no backup — it looks green. This check refuses the run if the target does not match.",
      pt: "Backup apontando pro destino errado é pior que backup nenhum — ele parece verde. Esta checagem recusa a execução se o destino não bater.",
    },
    thresholds: [
      { label: { en: "Wrong target", pt: "Destino errado" }, value: "abort", unit: "", level: "crit" },
    ],
  },
  {
    id: "healthz",
    name: { en: "/api/healthz endpoint", pt: "Endpoint /api/healthz" },
    cadence: { en: "on demand", pt: "sob demanda" },
    detail: {
      en: "Returns 200 when the database answers, 503 when it does not. Rate limited per IP, measures latency. Built to be consumed by PM2 and load balancers.",
      pt: "Devolve 200 quando o banco responde, 503 quando não. Rate limit por IP, mede latência. Feito pra ser consumido por PM2 e load balancer.",
    },
    thresholds: [
      { label: { en: "DB up", pt: "Banco ok" }, value: "200", unit: "", level: "ok" },
      { label: { en: "DB down", pt: "Banco fora" }, value: "503", unit: "", level: "crit" },
    ],
  },
] as const;

export const safetyRules = [
  {
    rule: {
      en: "Nothing destructive runs without a dry run first",
      pt: "Nada destrutivo roda sem um dry run antes",
    },
    example: {
      en: "The CLI that removes an agent from our support platform enforces the order: read-only scan → dry run → --execute. JSONL logs, tokens kept out of git.",
      pt: "A CLI que remove um agente da nossa plataforma de atendimento impõe a ordem: varredura só-leitura → dry run → --execute. Log em JSONL, token fora do git.",
    },
  },
  {
    rule: {
      en: "Anticipate the failure mode before it bills you",
      pt: "Antecipar o modo de falha antes que ele cobre a conta",
    },
    example: {
      en: "The billing cascade got a keep-alive workflow every two days purely to stop the free-tier database from being paused — written before it ever happened.",
      pt: "A cascata de cobrança ganhou um workflow de keep-alive a cada dois dias só pra impedir o banco no plano gratuito de ser pausado — escrito antes de acontecer.",
    },
  },
  {
    rule: {
      en: "Event-driven over polling when the fix will live for years",
      pt: "Orientado a evento em vez de polling quando o conserto vai viver anos",
    },
    example: {
      en: "A USB audio device reported an invalid decibel value and the system jumped to maximum volume. I sampled the boot window at 100 ms to catch it, then shipped an event-driven systemd service instead of a polling loop. Months in production, zero recurrence.",
      pt: "Um dispositivo de áudio USB reportava um valor de decibel inválido e o sistema pulava pro volume máximo. Amostrei a janela de boot a cada 100 ms pra pegar o instante, e entreguei um serviço systemd orientado a evento em vez de um laço de polling. Meses em produção, zero recorrência.",
    },
  },
] as const;
