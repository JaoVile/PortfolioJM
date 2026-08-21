

/**
 * Como o trabalho anda. Cada artefato citado existe em disco — as contagens
 * de linha são de arquivos reais, não de um diagrama idealizado.
 */

export const pipeline = [
  {
    n: "01",
    phase: { en: "Spec", pt: "Spec" },
    output: "docs/superpowers/specs/*.md",
    detail: {
      en: "Before any code: the problem, what the system does, the key decisions, the data model — and an explicit non-goals section. Writing down what I am not building is what keeps the build finite.",
      pt: "Antes de qualquer código: o problema, o que o sistema faz, as decisões-chave, o modelo de dados — e uma seção explícita de fora de escopo. Escrever o que eu não vou construir é o que mantém a construção finita.",
    },
  },
  {
    n: "02",
    phase: { en: "Plan", pt: "Plano" },
    output: "docs/superpowers/plans/*.md",
    detail: {
      en: "The spec becomes numbered tasks, each with its own done-when condition — a check someone else could run, not a feeling. Plans routinely pass a thousand lines; that is where the thinking goes, so the code does not have to carry it.",
      pt: "A spec vira tarefas numeradas, cada uma com sua condição de pronto — um teste que outra pessoa poderia rodar, não uma sensação. Os planos passam de mil linhas com frequência; é onde o pensamento fica, pra que o código não precise carregá-lo.",
    },
  },
  {
    n: "03",
    phase: { en: "Build", pt: "Construção" },
    output: ".superpowers/sdd/",
    detail: {
      en: "One task at a time, each with a brief going in and a report coming out. The brief is scoped so it can be handed off without the rest of the repository in context.",
      pt: "Uma tarefa por vez, cada uma com um briefing na entrada e um relatório na saída. O briefing é escopado pra poder ser passado adiante sem o resto do repositório em contexto.",
    },
  },
  {
    n: "04",
    phase: { en: "Test", pt: "Teste" },
    output: "tests/ · e2e/ · CI",
    detail: {
      en: "Test cases come out of the spec's acceptance criteria, not out of the code. Tests written from the implementation only prove the code does what it does; written from the criteria, they prove it does what was asked.",
      pt: "Os casos de teste saem dos critérios de aceite da spec, não do código. Teste escrito a partir da implementação só prova que o código faz o que faz; escrito a partir do critério, prova que faz o que foi pedido.",
    },
  },
  {
    n: "05",
    phase: { en: "Review", pt: "Revisão" },
    output: "review-<sha>..<sha>.diff",
    detail: {
      en: "A diff-review artifact at every task boundary, which I read myself. The plan closes with a self-review: spec coverage, deviations flagged on purpose, a placeholder scan. On the last project that pass produced three blocking findings before anything shipped.",
      pt: "Um artefato de revisão de diff em cada fronteira de tarefa, que eu leio. O plano fecha com uma auto-revisão: cobertura da spec, desvios sinalizados de propósito, varredura de placeholder. No último projeto essa passada gerou três achados bloqueantes antes de qualquer entrega.",
    },
  },
  {
    n: "06",
    phase: { en: "Clean up", pt: "Limpeza" },
    output: "chore: remove scaffolding",
    detail: {
      en: "Specs and plans are scaffolding, not documentation. Once verified, the spec is deleted in its own commit — recoverable from history, gone from the working tree. A repository full of stale plans teaches the next reader to distrust all of it.",
      pt: "Spec e plano são andaime, não documentação. Depois de verificado, a spec é apagada num commit próprio — recuperável no histórico, fora da árvore de trabalho. Repositório cheio de plano velho ensina o próximo leitor a desconfiar de tudo.",
    },
  },
] as const;

export const agents = [
  { name: "analista", scope: "read-only", role: { en: "Surveys a codebase, returns a briefing", pt: "Varre um código e devolve um briefing" } },
  { name: "pesquisador", scope: "web", role: { en: "External research, with citations", pt: "Pesquisa externa, com fontes" } },
  { name: "revisor", scope: "read-only", role: { en: "Senior review before I commit", pt: "Revisão sênior antes de eu commitar" } },
  { name: "depurador", scope: "read-only", role: { en: "Root cause, with evidence, before any fix", pt: "Causa raiz, com evidência, antes de qualquer conserto" } },
  { name: "doc-writer", scope: "write", role: { en: "Docs written from the code itself", pt: "Documentação escrita a partir do próprio código" } },
  { name: "commits", scope: "read + git", role: { en: "Conventional commit message from the diff", pt: "Mensagem de commit convencional a partir do diff" } },
  { name: "auditor-supabase-rls", scope: "read-only", role: { en: "Row-level security never silently off", pt: "Row-level security nunca desligada em silêncio" } },
  { name: "verificador-de-diff", scope: "read-only", role: { en: "Refactors that pass lint but changed behaviour", pt: "Refatoração que passa no lint mas mudou o comportamento" } },
  { name: "testador", scope: "test runner", role: { en: "Runs Playwright and reads the failures", pt: "Roda Playwright e interpreta as falhas" } },
  { name: "component-builder", scope: "write", role: { en: "Components matching existing conventions", pt: "Componentes seguindo as convenções que já existem" } },
] as const;

export const agentThesis = {
  en: "Ten narrow roles, most of them read-only on purpose — because the expensive mistakes are writes. It is the dry-run rule, applied to my own tooling.",
  pt: "Dez papéis estreitos, a maioria só-leitura de propósito — porque os erros caros são de escrita. É a regra do dry run, aplicada às minhas próprias ferramentas.",
};

export const testMatrix = [
  { repo: "Touvie", e2e: "25 Playwright", unit: "—", focus: { en: "accessibility + row-level security", pt: "acessibilidade + row-level security" }, ci: false },
  { repo: "Caçador de Ofertas", e2e: "—", unit: "476", focus: { en: "parsers, matching, cron, bot flows", pt: "parsers, casamento, cron, fluxos do bot" }, ci: true },
  { repo: "cobraflow", e2e: "1 Playwright", unit: "7", focus: { en: "scheduler determinism, LGPD route", pt: "determinismo do agendador, rota de LGPD" }, ci: true },
  { repo: "allchats", e2e: "1 Playwright", unit: "24", focus: { en: "runs the no-API-key path in CI on purpose", pt: "roda o caminho sem chave de API no CI de propósito" }, ci: true },
] as const;

export const notableTests = [
  {
    kind: { en: "Security", pt: "Segurança" },
    file: "Touvie · e2e/security/rls-cross-user.spec.ts",
    asserts: {
      en: "User A cannot read user B's notes, goals, finances or diet.",
      pt: "O usuário A não lê notas, metas, finanças nem dieta do usuário B.",
    },
    why: {
      en: "Row-level security is a policy until something proves it. Four cross-tenant leakage tests do the proving.",
      pt: "Row-level security é política até algo provar. Quatro testes de vazamento entre inquilinos fazem a prova.",
    },
  },
  {
    kind: { en: "Accessibility", pt: "Acessibilidade" },
    file: "Touvie · e2e/a11y/a11y.spec.ts",
    asserts: {
      en: "No critical or serious axe violation on any audited route.",
      pt: "Nenhuma violação crítica ou séria do axe em qualquer rota auditada.",
    },
    why: {
      en: "Accessibility regressions are silent. A test is the only thing that notices.",
      pt: "Regressão de acessibilidade é silenciosa. Um teste é a única coisa que percebe.",
    },
  },
  {
    kind: { en: "Concurrency", pt: "Concorrência" },
    file: "agendapp · tests/concurrency.spec.ts",
    asserts: {
      en: "Two visitors racing for the same slot: exactly one booking wins.",
      pt: "Dois visitantes disputando o mesmo horário: exatamente um agendamento vence.",
    },
    why: {
      en: "The double-booking bug only appears under real contention, so the test creates real contention.",
      pt: "O bug de agendamento duplo só aparece sob disputa real, então o teste cria disputa real.",
    },
  },
  {
    kind: { en: "Degradation", pt: "Degradação" },
    file: "allchats · lib/ai/agent.test.ts",
    asserts: {
      en: "With no AI client present, the agent falls back to the deterministic menu bot.",
      pt: "Sem cliente de IA, o agente cai pro bot de menu determinístico.",
    },
    why: {
      en: "The fallback path is the one nobody exercises, so CI runs it with the key deliberately blank.",
      pt: "O caminho de fallback é o que ninguém exercita, então o CI o roda com a chave vazia de propósito.",
    },
  },
] as const;

export const linux = {
  headline: {
    en: "Three months ago I moved off Windows. The machine is now part of how I work, not something I work around.",
    pt: "Há três meses saí do Windows. A máquina agora faz parte de como eu trabalho, não é algo que eu contorno.",
  },
  detail: {
    en: "Everything I operate in production runs on Linux — Docker Swarm, PM2, systemd, journalctl. Running the same system locally removed the whole class of problems that start with \"it works on my machine\". The first weeks cost me speed. What I got back is that debugging production and debugging my laptop are now the same skill.",
    pt: "Tudo que eu opero em produção roda em Linux — Docker Swarm, PM2, systemd, journalctl. Rodar o mesmo sistema localmente eliminou a classe inteira de problema que começa com \"na minha máquina funciona\". As primeiras semanas me custaram velocidade. O que voltou é que depurar produção e depurar o meu notebook viraram a mesma habilidade.",
  },
  facts: [
    { k: { en: "Distribution", pt: "Distribuição" }, v: "Pop!_OS" },
    { k: { en: "Since", pt: "Desde" }, v: "05/2026" },
    { k: { en: "Process manager", pt: "Gerenciador de processo" }, v: "PM2 · systemd" },
    { k: { en: "Editor", pt: "Editor" }, v: { en: "terminal-first", pt: "terminal primeiro" } },
  ],
} as const;

export const aiPosition = {
  headline: {
    en: "I use AI tools the way I use a linter or a debugger.",
    pt: "Eu uso ferramentas de IA do mesmo jeito que uso um linter ou um debugger.",
  },
  body: {
    en: "It lets me ship automation and fixes faster and with better quality. The technical decisions are still mine — I define the architecture, I choose the trade-offs, and I validate the result. What it removes is the mechanical part.",
    pt: "Elas me deixam entregar automação e conserto mais rápido e com mais qualidade. As decisões técnicas continuam minhas — eu defino a arquitetura, escolho os trade-offs e valido o resultado. O que elas tiram é a parte mecânica.",
  },
  evidence: [
    { en: "Choosing event-driven over polling in the audio fix.", pt: "Escolher evento em vez de polling no conserto do áudio." },
    { en: "Requiring a dry run before any destructive command.", pt: "Exigir dry run antes de qualquer comando destrutivo." },
    { en: "Setting the replication thresholds at 50 MB and 60 seconds.", pt: "Definir os limiares de replicação em 50 MB e 60 segundos." },
    { en: "Deciding a blocked recipient must not count as a failed send.", pt: "Decidir que destinatário bloqueado não conta como envio falho." },
  ],
  close: {
    en: "Those are judgment calls. No tool makes them for you, and a system that ships without them is the one that pages you at 3am.",
    pt: "Isso é julgamento. Nenhuma ferramenta faz por você, e o sistema que sobe sem isso é o que te acorda às 3h.",
  },
} as const;
