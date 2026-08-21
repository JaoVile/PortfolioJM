/**
 * Sistemas em produção e o monitoramento por baixo deles.
 *
 * Tudo aqui foi lido do repositório que descreve, não estimado: contagem de
 * commit veio de `git log`, teste veio de rodar a suíte, migração veio de
 * contar arquivo. Número que eu não consegui verificar não entrou.
 */

export type Bi = { en: string; pt: string };

export const systems = [
  {
    host: "api.atomosgestao.com.br",
    what: { en: "Financial management ERP", pt: "ERP de gestão financeira" },
    runtime: ".NET · Postgres / TimescaleDB",
    platform: "Docker Swarm + Traefik",
  },
  {
    host: "centraldoconsultor",
    what: {
      en: "Multi-tenant SaaS over a fleet management API",
      pt: "SaaS multi-tenant sobre uma API de gestão de frota",
    },
    runtime: "TypeScript · Postgres",
    platform: "Docker Swarm + Traefik",
  },
  {
    host: "nacional",
    what: { en: "Customer-facing web application", pt: "Aplicação web voltada ao cliente" },
    runtime: "Next.js",
    platform: "PM2 cluster mode",
  },
  {
    host: "aguides",
    what: { en: "In-product guided tours", pt: "Tours guiados dentro do produto" },
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
