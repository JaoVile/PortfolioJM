# Apostila — o CV linha a linha

**Leitura: ~2 h.** Cada afirmação do CV, o que ela te compromete a saber, o que
perguntam e como responder.

### Legenda de defensabilidade

| | Significa | Postura |
|---|---|---|
| 🟢 | **Sustenta** — você construiu | Pode aprofundar à vontade |
| 🟡 | **Opera** — você usa, não desenhou | Seja explícito sobre a profundidade |
| 🔴 | **Verificar** — confirme antes de usar | Se não sustentar, **tire do CV** |

Regra que vale o documento inteiro: **uma palavra no CV que você não sustenta
contamina todas as outras.** Não existe "essa parte é meio verdade".

---

# PARTE 0 — O contexto brasileiro (leia primeiro, 15 min)

Metade do seu CV pressupõe o Brasil. O entrevistador de fora não faz ideia do que é
boleto nem proteção veicular. Se você não tiver a frase pronta, gasta a entrevista
traduzindo em vez de mostrar engenharia.

**Decore estas seis.**

**Proteção veicular** — o mais importante, é o seu setor:
> "Vehicle protection associations — a Brazilian model where members pool funds to
> cover vehicle damage and theft. It works like insurance for the member, but it's a
> mutual association, not a regulated insurer, so the software is different: membership,
> monthly dues and claims rather than policies and premiums."

**Boleto:**
> "A Brazilian bank slip — a standardized payment document with a barcode. You can pay
> it at any bank, and the issuer gets confirmation. It's still one of the main payment
> methods for recurring bills."

**Segunda via (2ª via):**
> "A reissue of that slip — same debt, new document, usually because the original
> expired or was lost."

**PIX:**
> "Brazil's instant payment system, run by the central bank. Free, 24/7, settles in
> seconds. Think of it as the default way money moves in Brazil now."

**CPF:**
> "The Brazilian national ID number for individuals — like a social security number.
> It's the identifier everything is keyed on."

**LGPD:**
> "Brazil's data protection law — essentially GDPR adapted to Brazilian law: lawful
> basis, data subject rights, breach duties, security obligations."

**Associado (≠ cliente)** — a distinção importa, o modelo é outro:
> "Members, not customers — they join the association and pay monthly dues, so the
> relationship is membership-based rather than a purchase."

**Mensalidade:**
> "The monthly dues a member pays to stay covered."

**Sinistro:**
> "A claim — the event the member is covered for: a crash, a theft, damage."

**Tecnólogo (o seu diploma)** — não existe fora do Brasil, explique antes que perguntem:
> "A two-year applied bachelor's degree focused on software development — a recognized
> higher-education degree in Brazil, more hands-on and shorter than the four-year one."

**As instituições** — ninguém lá fora conhece, então dê a categoria, não o nome:
- **UNINASSAU** → *"a Brazilian private university"*
- **DIO (Digital Innovation One)** → *"a Brazilian tech-education platform; the bootcamp
  was sponsored by Santander, the bank"*
- **LNSoft** → *"the client's own management system — the source I had to poll, because
  it doesn't offer webhooks"*

**Centelha:**
> "A Brazilian federal innovation program that funds and mentors early-stage startups."

**Caruaru** — se perguntarem de onde você é:
> "A city in Pernambuco, in the Northeast of Brazil — about two hours inland from Recife,
> the state capital."

---

### 🔁 Treino dos 15 segundos

Feche o arquivo e diga em voz alta, em inglês, **sem olhar**, nesta ordem:
**vehicle protection · boleto · PIX · CPF · LGPD · member vs customer.**

Se travar em qualquer uma, é essa que você repete. Não passe para a Parte 1 antes de as
seis saírem limpas — elas vão aparecer **nos primeiros dois minutos** de qualquer
conversa sobre o seu trabalho, e gaguejar no vocabulário básico do próprio setor é o pior
começo possível.

---

# PARTE 1 — Cabeçalho

### `Full-Stack Engineer — AI Integrations, Messaging Automation & Production Operations`

Cada palavra é uma promessa. Saiba o que cada uma te obriga a defender:

- **Full-Stack** → precisa mostrar front e back. Você tem (Next.js + Node/Python).
- **AI Integrations** → LLM com ferramenta, RAG, guardrail. **Não** treinar modelo.
  Se perguntarem sobre treino/fine-tuning: *"I work at the application layer — tool
  calling, retrieval, guardrails. I haven't trained models."* Isso é uma **resposta
  forte**, não uma desculpa: é a função que o mercado procura.
- **Messaging Automation** → WhatsApp, Telegram, fluxo, template.
- **Production Operations** → é o que te separa do júnior. Monitor, backup, health check.

### `Open to remote — full US/EU morning overlap`

Saiba explicar o fuso sem gaguejar. **Caruaru é UTC−3.**
- Nova York (EST, UTC−5): você está **2 h à frente**. 9h lá = 11h aqui. Sobreposição
  total no horário comercial deles.
- Londres (UTC+0): você está **3 h atrás**. A manhã deles é sua madrugada/manhã cedo.
- Lisboa/Madri: 3–4 h. Manhã deles pega o seu começo de dia.

> "I'm UTC−3, so I overlap the entire US working day and the European morning."

### `English — C1 Advanced (Duolingo English Test 130, 2026)` 🟢

**130 no DET ≈ C1**, faixa de 120–140. Muitas universidades americanas aceitam 120+.

⚠️ **A prova do inglês é a entrevista, não o número.** Se você travar em inglês depois
de escrever C1, o número vira mentira. É por isso que treinar em voz alta importa mais
que qualquer conteúdo desta apostila.

---

# PARTE 2 — Summary, frase por frase

> *"I build the integrations that connect business systems to WhatsApp, the automated
> support that runs on top of them, and the operations layer that keeps both alive."*

Três camadas, de propósito: **integração** (dado entra e sai) → **automação** (bot
responde) → **operação** (continua no ar). Se te pedirem para resumir sua carreira em
uma frase, é esta.

> *"Currently shipping ERP↔WhatsApp automation across the vehicle-protection and
> accounting sectors."*

Dois setores = mostra que não é um cliente só. Tenha o exemplo pronto de cada: proteção
veicular (as associações) e contábil (a Amora, no escritório).

> *"Oracle-certified in Generative AI"* 🟡

⚠️ **Perguntam o que caiu na prova.** Saiba dizer: fundamentos de LLM, embeddings e
busca vetorial, RAG, e os serviços de IA da OCI. Se não lembrar do conteúdo, **revise o
ementário antes da entrevista** — certificação que o candidato não sabe descrever pega
mal pior do que não ter.

> *"I use an LLM agent workflow as part of how I develop"* 🟢

É a sua frota de subagentes. **Diga como método, nunca como produto:**
> "I run a set of scoped subagents while I build — one researches the codebase, one
> reviews before commit, one debugs, one writes commit messages. Each has explicit tool
> permissions, so the permission boundary is the guardrail, not the prompt wording. I
> use AI the way I use a linter: the architecture decisions stay mine."

A última frase é a que impressiona. **Decore.**

> *"I own what happens after deploy — replication monitoring, backup verification,
> health checks"* 🟢

É a sua maior diferença contra outro candidato de 21 anos. Cave à vontade aqui.

---

# PARTE 3 — Átomo, bullet por bullet

## Bullet 1 — Plataforma de chatbot

> *"23 associations running WhatsApp bots in production, 14 onboarded within a single
> 4-month window after I standardized the base flow… 73 of 102 platform tasks; 32 were
> payment and API integrations."* 🟢

**Os números, e de onde vêm:**
- **23 em produção** de **25** na carteira. As duas fora: uma sem bot por falta de
  funções, outra desativada por bug de chat ativando durante atendimento humano.
  **Saiba dizer isso** — é o que mostra que você acompanha.
- **14 onboarded** em 4 meses (relatório 14/03 → 14/07/2026).
- **73 de 102** tarefas da frente. **32** foram integração/pagamento.

**A frase que vale mais que os números:**
> "Onboarding stopped being a project and became a process."

Isso é pensamento de produto, não de tarefa. É o que te promove.

**Perguntam: "o que exatamente você padronizou?"** Prepare: o fluxo-base (menu, consulta
por CPF, financeiro, transferência) que é replicado e adaptado por cliente. Sem ele, cada
cliente era um projeto do zero.

⚠️ **Vão perguntar do bug da BRAVO.** Chat ativando durante atendimento humano é
**corrida entre dois atores no mesmo canal** — mesma família do teste de concorrência do
agendapp. Trate como história técnica, não como defeito.

## Bullet 2 — Amora 🟢

> *"AI agent in production (built with one other engineer): answers accounting and tax
> questions and escalates to the right human team on its own. Prompts versioned in Git
> across 6 documented refinement cycles."*

- **"built with one other engineer"** está aí de propósito. **Nunca tire.** Crédito
  correto é o que te protege quando conferirem.
- **"escalates on its own"** = transferência por **tool call**, não por palavra-chave.
- **Prompt versionado em Git** = mudança de comportamento vira diff revisável. A maioria
  edita numa caixa de texto e perde histórico.

**Perguntam: "e quando ela erra / alucina?"**
> "Anything that touches money or a deadline gets escalated, not answered."

⚠️ **Nunca diga "multi-agent system".** Diga *"one agent with tools, including a transfer
tool."* Preciso sustenta o follow-up; grandioso desmorona nele.

## Bullet 3 — Cobrança self-service

> *"members request a boleto, a duplicate invoice or a PIX and the bot pulls it from the
> ERP and delivers it — 28 tasks."* 🟢

O fluxo, se pedirem:
1. Associado pede no WhatsApp e se identifica pelo CPF.
2. Bot consulta o ERP.
3. Devolve boleto, 2ª via ou código PIX.

⚠️ **A pergunta de segurança vem aqui.** É a que te peguei: *"o que impede eu digitar o
CPF de outro?"* A resposta honesta e forte:
> "Today the CPF alone is enough, and that's a real weakness — CPFs leak constantly in
> Brazil. The fix I'm proposing is to match the sender's WhatsApp number against the
> phone on record, since WhatsApp already proves phone ownership, and fall back to a
> challenge only the real member can answer — like the value of their last payment.
> Rate-limit lookups and log every one."

**Levantar você mesmo transforma o furo em ponto forte.** Se ele descobrir sozinho, é o
contrário.

## Bullet 4 — Sistema de disparos (solo) 🟢

> *"Dispatch system for a 24h roadside-assistance company (sole developer): LNSoft
> polling, Supabase, PM2, batching, blocklists, LGPD handling and a resilient cron."*

**É o seu trabalho solo mais forte do período.** Cave aqui.

- **Polling do LNSoft** — o sistema do cliente não tem webhook, então você consulta em
  intervalo. Saiba dizer **por que polling e não webhook**: porque a origem não oferece.
- **Blocklist** — antes do envio, sempre.
- **LGPD** — opt-out honrado no disparo, log de quem recebeu o quê e quando, e só o dado
  que a mensagem precisa.
- **Cron resiliente** — sobrevive a falha e a reexecução.

⚠️ **"Resilient" te obriga a saber idempotência.** Cron **vai** rodar duas vezes um dia.
Chave única `(batch, member, charge)` gravada **antes** do disparo; no retry o insert
conflita e pula. **Cooldown não é idempotência** — falha em retry tardio, em corrida e em
lote parcial.

## Bullet 5 — Integrações de ERP 🟢

> *"across 6 platforms — Hinova SGA, South, DevSul, EPTA, Conta Azul and Asaas"*

**Saiba o que é cada um** (uma frase basta):
- **Hinova SGA / South / DevSul / EPTA** — ERPs de gestão de associação de proteção
  veicular: cadastro de associado, veículo, mensalidade, sinistro.
- **Conta Azul** — ERP contábil/financeiro brasileiro para PME.
- **Asaas** — **não é ERP**, é gateway de pagamento e cobrança. Se disser "6 ERPs" e ele
  pesquisar, pega mal. Diga **"6 platforms"**, como está no CV.

**Perguntam: "qual foi a mais difícil e por quê?"** Tenha uma escolhida, com o motivo
técnico (documentação, autenticação, limite de requisição, formato do dado).

## Bullet 6 — Confiabilidade 🟢🟡

> *"Postgres replication monitor… 2-hourly backups with 24-copy rotation and S3
> mirroring… target-verification check… Operate a financial ERP (.NET,
> PostgreSQL/TimescaleDB) on Docker Swarm + Traefik and a customer-facing app in PM2
> cluster mode."*

🟢 **Monitor, backup e verificação de destino** — você escreveu. Domine (ver
`interview-prep.md`, seções 1 e 2).

🟡 **.NET e TimescaleDB** — você **opera**, não desenhou. A frase honesta:
> "I operate it — I didn't design the hypertable strategy."

⚠️ Nunca assuma autoria de decisão alheia. É o erro que derruba no follow-up.

**A frase de ouro desta bullet:**
> "A backup pointing at the wrong destination is worse than no backup — it looks green."

**Perguntam: "quando você restaurou pela última vez?"** Backup nunca testado não é
backup. Se nunca restaurou, diga e diga que é o próximo passo.

## Bullet 7 — 126 entregas 🟢

> *"126 verified technical deliveries in 4 months, 47 outside the ticket system"*

O relatório é auditado, com fonte declarada. **A parte que impressiona não é o número, é
o critério:**
> "Counted by project-day, never by commit — inflating that number would be trivial."

Mostra que você conta com honestidade, e isso vale mais que o número.

---

# PARTE 4 — Gnomon 🟢

> *"Sole developer of the system core: routing algorithms, API and React UI… Ranked 1st
> among all Systems Analysis cohorts and advanced through Centelha 3."*

**O problema, em uma frase:** GPS não funciona dentro de prédio.

**Saiba explicar o algoritmo de rota** — é o que perguntam. Se foi grafo de pontos com
menor caminho, diga o nome (A*, Dijkstra) e como modelou os nós (salas, corredores,
escadas). Se não lembra, **revise o código antes da entrevista**.

⚠️ **Datas:** Out/2025 – **Jun/2026**. Encerrou. O CV antigo dizia "Atual" e estava
errado. Se perguntarem por que acabou, responda sem drama.

**"Co-founder" vai puxar pergunta de negócio:** quem eram os sócios, qual era o modelo,
por que parou. Tenha resposta curta e sem mágoa.

---

# PARTE 5 — Freelance 🟢

> *"SolarTech (React + Vite) and Renova Aesthetic (Next.js + Stripe)"*

Provam coisa diferente do resto: **prazo e escopo de terceiro**. Se perguntarem por que
estão no CV sendo simples:
> "They prove something the personal projects can't — delivering to someone else's
> deadline and scope."

**Stripe** te obriga a saber o básico: checkout, webhook de confirmação, e por que
**nunca** se confia no redirect do cliente para confirmar pagamento (o webhook é a
verdade).

---

# PARTE 6 — Projetos selecionados

Fluxo completo de cada um está em `apostila-projetos.md`. Aqui, só o que o **CV** afirma
e você tem que sustentar:

**Touvie** 🟢
- *"AI assistant that writes to real data through tool calls"* → a ferramenta é a
  fronteira de autorização.
- *"HMAC-SHA256 signed cookies"* → assinado, cliente não forja, verifica sem ida ao banco.
- *"E2E tests asserting one user cannot read another's records"* → **é a sua melhor prova
  de segurança**, e liga direto com o furo do CPF.
- *"320+ commits, 40+ migrations"* → números conferíveis no GitHub. Não arredonde pra
  cima.

**Caçador de Ofertas** 🟢
- *"470+ passing tests"* → conferível.
- *"dead-man's-switch canary"* → saiba explicar: todos os canais com zero post no mesmo
  tick não é dia parado, é coletor quebrado.
- A história do cupom é a sua melhor narrativa técnica. **Conte sempre que puder.**

**allchats** 🟢
- *"Runs correctly with no API key configured — CI exercises that fallback on purpose"* →
  sua melhor prova de maturidade.
- *"RAG-grounded with guardrails"* → responde só a partir do recuperado.
- ⚠️ Se perguntarem **como você mede a qualidade do retrieval**: se não mede, diga que não
  mede. Inventar métrica é o pior caminho possível.

**Também citados:** cobraflow (SSE, blocklist em duas camadas, audit log) · agendapp
(teste de concorrência) · Zaptutor (MV3, zero rede).

---

# PARTE 7 — Skills, item por item

**Esta é a parte mais perigosa do CV.** Skill é lista de convite: o entrevistador escolhe
uma e pergunta. Auditoria honesta:

### Languages
- **TypeScript** 🟢 — domine. Saiba: tipo vs interface, generics, `unknown` vs `any`,
  narrowing.
- **JavaScript** 🟢
- **Python** 🟢 — FastAPI, automações do Chatwoot.
- **SQL** 🟢 — saiba join, index e por que uma query ficou lenta.
- **C#** 🔴 — **VERIFIQUE.** Você *opera* um ERP .NET. **Você escreve C#?** Se só opera,
  tire de "Languages" e deixe só a menção em contexto na bullet de operação. Um
  entrevistador pode abrir C# e pedir código.

### AI Engineering 🟢
Tool calling, RAG, guardrails, prompt engineering, workflow com agentes. Tudo seu.
⚠️ Nada de treino/fine-tuning aqui — e está certo assim.

### Back-end
- **Node (Hono, Express)** 🟢 — saiba dizer por que Hono onde performance importa.
- **FastAPI** 🟢 — tipagem com Pydantic, docs automática (Swagger), async.
- **.NET** 🟡 — opera. Seja explícito.
- **REST API design** 🟢 — verbos, status code, idempotência de `PUT` vs `POST`.
- **Server-Sent Events** 🟢 — unidirecional, reconecta sozinho, HTTP puro.

### Front-end 🟢
React, Next.js (App Router, SSR), Tailwind. Saiba **server vs client component** — é a
pergunta mais provável de Next.js hoje.

### Data
- **PostgreSQL** 🟢
- **TimescaleDB** 🟡 — opera.
- **Supabase (RLS)** 🟢 — e a armadilha da `service_role`.
- **Prisma** 🟢 — migração versionada, cliente tipado.
- **Alembic** 🔴 — **VERIFIQUE.** Veio do bootcamp/Workout_API. Se usou uma vez e não
  lembra como resolver conflito de migração, considere tirar.

### Integrations 🟢
WhatsApp Business/Cloud API (⚠️ saiba **template aprovado pela Meta** e a **janela de 24 h**
— pergunta clássica), ERP APIs, Google Calendar API, Chatwoot, n8n.

⚠️ **Janela de 24 h:** fora dela você só pode iniciar conversa com **template aprovado**.
É por isso que cobrança usa template. Isso **vai** cair se falarem de WhatsApp.

### Infrastructure
- **Docker Swarm + Traefik** 🟢 — ver `interview-prep.md` §1.
- **PM2 cluster mode** 🟢 — um worker por core, estado em memória **não** é compartilhado.
- **systemd** 🟢 — você tem a história do áudio USB: trocou polling por serviço orientado
  a evento. Ótima narrativa.
- **AWS (S3, EC2)** 🟡 — S3 pro espelho de backup. Seja honesto no escopo.
- **Oracle Cloud** 🟡 — da certificação.
- **Vercel / Fly.io** 🟢

### Reliability 🟢
Sua seção mais forte. Monitor de replicação, rotação e **verificação** de backup,
health check, dry-run e blocklist para ação irreversível.

### Testing 🟢
Playwright, Cypress, Vitest, concorrência e isolamento entre inquilinos.
⚠️ Saiba a diferença: **unit** (função pura) · **E2E** (usuário de verdade no navegador)
· **concorrência** (dois atores no mesmo instante).

---

# PARTE 8 — Formação e certificações

**Tecnólogo em ADS — UNINASSAU, Jan/2024 – Dez/2025, GPA 8,6/10** 🟢

⚠️ **Explique o "tecnólogo" pro gringo**, porque não existe lá:
> "A two-year applied bachelor's degree focused on software development — it's a
> recognized higher-education degree in Brazil, more hands-on and shorter than the
> four-year program."

Isso importa de verdade: **para visto europeu (Blue Card) o diploma precisa ser
reconhecido**, e curso de 2 anos costuma exigir validação. Saiba que essa conversa
existe.

**Notas máximas em Arquitetura de Software, Cloud Computing e Machine Learning** — se
citar ML, esteja pronto pra falar do que fez lá (o `mlproject`, notebooks de análise).
🟡 — foi cadeira, não profissão.

**Certificações:**
- **Oracle Generative AI Professional** (Set/2025) 🟡 — revise o ementário.
- **CS50 — Harvard, em andamento** 🟢 — ótimo sinal, e você estuda **em inglês**. Diga:
  linguagem C, estrutura de dados, algoritmo.
- **Bootcamp Python DIO & Santander** (58 h) 🟢 — FastAPI, Docker, SQL, MongoDB.
- **AWS Educate Cloud 101** 🟡 — é badge introdutório. Não venda como certificação AWS
  de verdade; se perguntarem, seja o primeiro a dizer que é introdutório.

---

# PARTE 9 — As 6 perguntas que você VAI levar

1. **"Walk me through a project you're proud of."**
   → Touvie ou Caçador. **Siga um item só**, não descreva o sistema.

2. **"Tell me about something that broke in production."**
   → A BRAVO (bot ativando durante atendimento humano) ou o incidente do provedor de LLM
   no Touvie, documentado no código ao lado do fallback.

3. **"What would you do differently?"**
   → A verificação do CPF. Você já sabe o conserto. **Tenha sempre uma resposta aqui** —
   quem não tem parece não ter olhado pro próprio trabalho.

4. **"How do you use AI in your work?"**
   → A resposta do linter. *"The architecture decisions stay mine."*

5. **"Why should we hire someone with less than a year of formal experience?"**
   → A resposta honesta e forte:
   > "Because I don't just build — I operate. I've written replication monitoring,
   > backup verification and health checks that a load balancer consumes. Most people at
   > my level have never had to keep something alive at 3am."

6. **"Do you have questions for us?"** — **sempre tenha três.** Sugestões: como é o
   processo de code review; o que quebrou em produção nos últimos 3 meses e o que
   mudaram depois; como fica a comunicação assíncrona com alguém em UTC−3.

---

# Plano das 2 horas

| Tempo | O quê |
|---|---|
| **0:00–0:15** | Parte 0 — o contexto brasileiro. **Diga as 6 em voz alta, em inglês.** |
| **0:15–0:30** | Partes 1 e 2 — cabeçalho e summary. Narre o summary sem olhar. |
| **0:30–1:15** | Parte 3 — as 7 bullets da Átomo. É o coração do CV. Uma por vez, em voz alta. |
| **1:15–1:35** | Partes 4, 5 e 6 — Gnomon, freelance, projetos. |
| **1:35–1:50** | **Parte 7 — e decida os 🔴.** C# e Alembic: sustenta ou sai? Decida hoje. |
| **1:50–2:00** | Parte 9 — as 6 perguntas. Responda as 6 em voz alta, cronometrando 60 s cada. |

**Não leia em silêncio.** O seu gargalo não é saber, é narrar. Só conta o que você disser
em voz alta, em inglês, sem olhar o arquivo.
