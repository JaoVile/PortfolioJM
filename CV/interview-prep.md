# Interview prep — território por território do CV

Cada afirmação do CV vira: **a resposta de 30 segundos** (decore em inglês),
**a pergunta seguinte** (o entrevistador vai cavar) e **a armadilha** (onde você
erra se responder por instinto).

Regra de ouro que vale pra todas: quando não souber, diga
**"I haven't dealt with that — how would you approach it?"**. Isso soma pontos.
Mudar de assunto elimina.

---

## 1. Docker Swarm + Traefik

> *CV: "Operate a financial ERP on Docker Swarm + Traefik"*

**30s:**
> "Docker Swarm is Docker's built-in orchestrator. Instead of running containers
> by hand, you declare desired state — 'three replicas of this service' — and the
> manager keeps reality matching it. If a task dies, it spins up a replacement.
> Traefik sits in front, reads Swarm labels to auto-discover services, and handles
> routing and TLS."

**Vocabulário:** node · manager (Raft, número ímpar) · worker · service (a receita)
· task (a instância) · stack (compose deployado junto) · overlay network.

**Aprofundamento — "por que não Kubernetes?"**
> "Kubernetes' operational cost isn't justified at our scale. Swarm gives me
> desired-state reconciliation, rolling updates and secrets with almost no
> overhead. I'd move to K8s for autoscaling or the ecosystem."

Diga você mesmo: *"I know Swarm isn't the industry default anymore."* Se ele falar
primeiro, você é quem não acompanhou.

**⚠️ Armadilha — banco em Swarm.** Volume é **local ao node**. Task reagendada em
outra máquina sobe sem os dados. Tem que fixar (`constraints: node.hostname == X`)
ou usar storage compartilhado. **Confira seu compose.**

**⚠️ Réplica do Swarm ≠ replicação do Postgres.** Uma é container de aplicação,
outra é WAL entre bancos. Swarm não conserta lag.

---

## 2. Replicação do Postgres, WAL e backup

> *CV: "Postgres replication monitor (lag, apply delay, retained WAL, offline-slot
> alerting), 2-hourly backups with 24-copy rotation"*

**30s:**
> "The primary streams its WAL to a standby. Lag is how far behind the standby is,
> and that lag *is* my data-loss window — if the primary dies, whatever hasn't
> shipped is gone. I alert at 50MB of lag, 60 seconds of apply delay, and 1GB of
> retained WAL."

**Por que 1 GB de WAL retido é `crit` (mais grave que o lag):**
Se existe replication slot e o standby não consome, o primário **não recicla WAL**.
Ele acumula esperando. Disco enche → **Postgres para de aceitar escrita**.
Produção parada. O alarme de WAL existe pra pegar isso antes do disco.

**Aprofundamento — "o que você faz quando o alerta dispara?"**
1. O standby está vivo? (`pg_stat_replication` no primário)
2. É rajada de escrita ou o standby não dá conta?
3. Slot órfão de standby que não volta → **dropar o slot** antes do disco encher.

**⚠️ Armadilha — backup verde que não presta.** Você já resolveu isso: sua checagem
**aborta se o destino não bater**. A frase é ótima em entrevista:
> "A backup pointing at the wrong destination is worse than no backup — it looks green."

**Pergunta que você deve saber responder:** *"quando foi a última vez que você
restaurou?"* Backup nunca testado não é backup. Se nunca restaurou, diga isso e diga
que é a próxima coisa a fazer.

---

## 3. Multi-tenancy e RLS (Supabase)

> *CV: "Supabase row-level security proven by E2E tests asserting one user cannot
> read another's records"*

**30s:**
> "Row-level security pushes the authorization check into the database itself — a
> policy on the table, so even a query that forgets its WHERE clause can't cross
> tenants. I test it adversarially: an E2E spec logs in as user A and asserts it
> gets zero rows from user B's data."

**Aprofundamento — "o que fura RLS?"**
- A **`service_role` key** ignora RLS por design. Se ela vazar pro browser, acabou.
  Ela só pode existir no servidor.
- Tabela nova **sem policy** com RLS ligado = ninguém lê; **com RLS desligado** =
  todo mundo lê. O modo de falha perigoso é esquecer de ligar.

**⚠️ Armadilha — a mesma ameaça, fora do banco.** Você prova isolamento no Touvie
mas o bot de CPF entrega dado de qualquer associado a quem digitar o CPF. É a mesma
ameaça (A lê o dado de B) numa camada onde não há RLS pra te salvar. **Saiba dizer
isso antes que perguntem** — vira ponto forte em vez de furo.

---

## 4. Idempotência, blocklist e LGPD (sistema de disparos)

> *CV: "Dispatch system (sole developer): batching, blocklists, LGPD handling and a
> resilient cron"*

**30s:**
> "Sending is irreversible, so the design starts from the brakes. Every intended
> send is written with a unique key — batch, member, charge — before dispatch, so a
> retry conflicts and skips instead of double-charging someone. A blocklist sits in
> front of every send, and blocked recipients are counted separately from failures."

**Idempotência ≠ cooldown.** Cooldown é tempo; idempotência é identidade.
Cooldown falha em três casos: retry após a janela, duas execuções simultâneas
(*check-then-act*), e lote parcial (300 de 500 enviados).

**Aprofundamento — "bloqueado conta como falha?"**
> "No. Blocked is a successful filter, not a delivery failure. Merging them into one
> error column hides the thing you most need to see — that the brake worked."

**LGPD, em uma frase:**
> "Opt-out has to be honored at dispatch time, every send is logged with who and
> when, and I keep only the data the message needs."

---

## 5. Amora — agente de IA com escalonamento autônomo

> *CV: "answers accounting and tax questions and escalates to the right human team
> on its own. Prompts versioned in Git across 6 refinement cycles."*

**30s:**
> "Amora answers from a knowledge base and decides on her own when to hand off to a
> human team. The escalation is a tool call, not a keyword match — the model decides
> it can't answer and calls the transfer tool. Prompts live in Git, so every
> behaviour change is a reviewable diff. Six refinement cycles are recorded."

**Por que versionar prompt em Git impressiona:** a maioria edita prompt numa caixa de
texto e perde o histórico. Diff de prompt = mudança de comportamento revisável.

**Aprofundamento — "e quando ela alucina?"**
Fale de **guardrails**: responder só a partir da base de conhecimento, escalar quando
não tiver confiança, e nunca inventar valor ou prazo. A regra que vale ouro:
> "Anything that touches money or a deadline gets escalated, not answered."

**⚠️ Armadilha — nunca diga "multi-agent system"** se for um agente com ferramentas.
Diga o que é: *"one agent with tools, including a transfer tool."* Preciso vale mais
que grandioso — e sustenta o follow-up.

---

## 6. RAG com guardrails e degradação (allchats)

> *CV: "Runs correctly with no API key configured — CI exercises that deterministic
> fallback path on purpose."*

**30s:**
> "RAG means the model answers from retrieved documents instead of memory, so answers
> are grounded and I can show the source. The part I'm proud of is degradation: with
> no API key the app falls back to a deterministic menu bot, and CI runs that path on
> purpose — so a provider outage degrades instead of breaking."

Essa é uma das suas melhores histórias. **Testar o caminho degradado no CI de
propósito** é maturidade que muita gente sênior não tem.

**Aprofundamento — "como você sabe que o RAG trouxe o documento certo?"**
Se não mede, diga: *"I don't measure retrieval quality yet — that's the gap."*
Honestidade aqui vale mais que inventar métrica.

---

## 7. PM2 cluster mode

> *CV: "a customer-facing app in PM2 cluster mode"*

**30s:**
> "Node is single-threaded, so one process uses one core. PM2 cluster mode forks one
> worker per core and load-balances across them. If a worker crashes, PM2 restarts it
> and the others keep serving — a crash stops being an outage."

**⚠️ Armadilha — estado em memória.** Com N workers, sessão ou cache em memória local
**não é compartilhado** — o usuário cai num worker que não tem o dado dele. Estado
compartilhado vai pra Redis ou pro banco.

---

## 8. SSE (cobraflow)

> *CV: "SSE batch engine with live progress"*

**30s:**
> "Server-Sent Events is a one-way stream from server to browser over plain HTTP.
> For batch progress that's exactly right — the client never needs to talk back, so
> WebSockets would be more machinery than the problem deserves. It reconnects
> automatically."

**Aprofundamento — "por que não WebSocket?"** Porque é unidirecional. Escolher a
ferramenta menor pelo motivo certo é sinal de senioridade.

---

## 9. TimescaleDB

> *CV: "financial ERP (.NET, PostgreSQL/TimescaleDB)"*

**30s:**
> "TimescaleDB is a Postgres extension for time-series. It partitions a table into
> chunks by time automatically, so queries over a date range only touch the relevant
> chunks, and old chunks can be compressed or dropped by policy."

**⚠️ Se você não configurou isso**, diga: *"I operate it; I didn't design the
hypertable strategy."* Nunca assuma autoria de decisão que não foi sua — é o erro que
te derruba no follow-up.

---

## 10. Teste de concorrência (agendapp)

> *CV: "concurrency-tested so two people can never win the same slot"*

**30s:**
> "Two visitors can hit the same slot at the same instant. The test fires both
> bookings concurrently and asserts exactly one wins and one gets a clean rejection.
> The guarantee comes from the database — a unique constraint on the slot — not from
> checking availability in application code, because check-then-insert is a race."

Essa resposta é forte porque mostra que você sabe **onde** a garantia mora: no banco,
não no `if`.

---

## Como estudar isto

Você mesmo disse: lê uma vez na hora de implementar e esquece. Ler de novo não
resolve — **falar resolve**. Pegue um território por dia, leia a resposta de 30
segundos, feche o arquivo e **diga em voz alta, em inglês, sem olhar**. Se travar,
é esse que você revisa. Dez territórios, dez dias.
