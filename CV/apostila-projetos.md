# Apostila — como cada projeto opera

**Leitura: ~20 min.** Um projeto por bloco. Em cada um: o que é, **o fluxo passo a
passo** (é isso que te pedem), a parte difícil e a pergunta que vem depois.

---

## ⚑ O roteiro universal (leia primeiro — 2 min)

Quando pedirem *"walk me through your project"*, a resposta tem **4 movimentos,
nessa ordem**. É o que faltou no quiz: você respondia com o inventário do sistema,
e o que pedem é o caminho de **uma coisa** atravessando ele.

1. **O problema, em uma frase.** *"People X had to do Y by hand."*
2. **O caminho de um item.** Escolha **um** — uma mensagem, um post, um agendamento —
   e siga ele do começo ao fim. Sempre no singular.
3. **A parte difícil e por que era difícil.**
4. **O que você faria diferente.** Sempre tenha uma. Quem não tem parece não ter olhado.

> Frase de abertura pronta:
> **"Let me follow a single [message/booking/post] through the system."**

---

## 1. Touvie — Life OS pessoal
`Next.js 15 · Supabase · Telegram · PWA`

**O que é:** rotina, metas, diário, finanças, treino e dieta num PWA instalável, com
bot de Telegram e um assistente que **escreve em dado real**.

**Fluxo de uma requisição:**
1. Abro o PWA. O **middleware** lê um cookie de dispositivo confiável e **verifica a
   assinatura HMAC-SHA256** no servidor.
2. Dispositivo não confiável → app entra em **modo só-leitura**. Confiável → segue.
3. Consultas vão pro Supabase, e o **RLS filtra por dono da linha** dentro do banco.
4. Peço algo ao assistente. Ele **chama uma ferramenta** (criar meta, lançar
   transação) — não devolve texto, altera o estado.
5. O bot de Telegram registra coisa de fora do app; cron do GitHub Actions manda os
   lembretes.

**Parte difícil:** assistente que **escreve** é outro problema. Só-leitura é fácil.
Quando ele muta dado, **a superfície de ferramentas vira a fronteira de autorização** —
o modelo só consegue fazer o que a ferramenta permite.

**Perguntam:** *"por que HMAC e não só um flag no banco?"*
> "The cookie is signed, so the client can't forge it, and the check runs on both the
> edge and Node runtimes without a database round-trip on every request."

**Números:** 320+ commits · 41 migrações · 25 specs Playwright.

---

## 2. Caçador de Ofertas — bot de promoções
`Next.js · Supabase · Telegram Bot`

**O que é:** lê 25 canais de promoção do Telegram e só alerta quando o produto entra
na sua faixa de preço.

**Fluxo de um post:**
1. **Cron a cada 5 minutos** raspa as páginas públicas dos canais.
2. **Parser** extrai preço, cupom e loja de texto livre em português.
3. Post é arquivado no Postgres (dedup por canal + id).
4. **Job separado** compara os posts novos com as caçadas abertas.
5. Entrou na faixa → alerta no Telegram. Não entrou → morre no arquivo, ninguém é
   acordado.

**Parte difícil — a que você conta:** `"R$30 OFF"` era lido como **produto de R$30**.
Virava a oferta mais barata do dia, puxava a mediana pra baixo e **satisfazia toda
caçada aberta**. Separar valor de cupom de preço de produto foi o que tornou o alerta
confiável.

**Segunda:** o **canário**. Se todos os canais devolvem zero post no mesmo tick, não é
dia parado — é o coletor quebrado. Pega a falha silenciosa que monitoramento não vê.

**Perguntam:** *"como você calibrou o piso de preço?"*
> "Against three months of collected posts, with a documented false-positive rate per
> threshold — a table, not a guess."

**Números:** 476 testes · 103 commits · 9 migrações · 25 canais.

---

## 3. allchats — bot de atendimento multi-tenant
`Next.js 16 · React 19 · Claude SDK`

**O que é:** automação de WhatsApp com um **simulador do WhatsApp na própria landing** —
o visitante conversa com o bot sem cadastro, sem telefone, sem API key.

**Fluxo de uma mensagem:**
1. Mensagem entra pelo **`WhatsAppAdapter`** — hoje o simulador, amanhã a Cloud API.
   A interface é a mesma, a lógica do bot não sabe a diferença.
2. **Tem API key?**
   - **Sim:** busca na base de conhecimento (**RAG**) → Claude responde **só a partir do
     que foi recuperado** (guardrail) → se não tiver confiança, **chama a ferramenta de
     transferência** pro humano.
   - **Não:** cai num **bot de menu determinístico**, e responde igual.
3. Dados passam pela interface `Db` — memória agora, Postgres depois.

**Parte difícil — a sua melhor história:** **o CI roda o caminho sem API key de
propósito.** Ou seja, queda de provedor **degrada** em vez de quebrar, e isso é testado
toda vez. Muita gente sênior não faz isso.

**Perguntam:** *"por que duas interfaces (adapter e Db)?"*
> "So transport and storage stay out of the bot logic. I can swap the simulator for the
> real Cloud API without touching a single decision the bot makes."

---

## 4. cobraflow — disparo de cobrança
`Next.js 16 · SSE · WhatsApp Cloud API`

**O que é:** painel de disparo de cobrança em lote por WhatsApp. Clean-room, dado
sintético.

**Fluxo de um lote:**
1. Operador cria o lote **ou** o cron dispara — **a mesma função de execução** nos dois
   casos.
2. Para cada destinatário: **blocklist em duas camadas** antes do envio.
3. Bloqueado → registra como **bloqueado**, não como falha. Liberado → envia pela
   Cloud API.
4. Progresso ao vivo pro painel via **SSE**.
5. O runner **relê o status do lote a cada iteração** — cancelar para limpo e deixa o
   não-tocado como **pendente**, nunca meio-enviado.
6. Fecha a conta: enviados · bloqueados · falhas.

**As três decisões (decore):**
- **Um motor, dois gatilhos.** Caminho agendado que diverge do manual é bug esperando o
  fim de semana.
- **Bloqueado ≠ falho.** Somar os dois esconde justamente que o freio funcionou.
- **Cancelar que cancela de verdade**, relendo status a cada volta.

**Perguntam:** *"por que SSE e não WebSocket?"*
> "It's one-way — the browser never needs to talk back. WebSockets would be more
> machinery than the problem deserves, and SSE reconnects on its own."

---

## 5. agendapp — agendamento com Google Meet
`Next.js 16 · Supabase · Google APIs`

**O que é:** visitante escolhe um horário livre e recebe o link do Meet na hora e por
e-mail. Sem login.

**Fluxo de um agendamento:**
1. Visitante abre a **grade da semana** (verde = livre).
2. Escolhe o horário e preenche os dados.
3. Servidor cria o **evento no Google Calendar com Meet** na agenda do anfitrião.
4. Link aparece na tela e vai por e-mail (**Resend**). Cron manda lembrete ~15 min antes.
5. Todo agendamento ganha **link de cancelamento com token assinado** (`/cancelar/[token]`),
   sem login.
6. **Sincronização nos dois sentidos:** job importa os eventos "ocupado" do anfitrião e
   marca os slots como `BLOCKED` — a grade pública nunca dá choque.

**Parte difícil:** dois visitantes clicando no mesmo horário no mesmo instante. O teste
dispara os dois **concorrentes** e exige que **exatamente um** ganhe.
> "The guarantee lives in the database — a unique constraint — not in application code,
> because check-then-insert is a race."

**Detalhe bom:** sem variável de ambiente nenhuma ele sobe em **modo preview** com dado
de demonstração. É por isso que o link do portfólio funciona pra qualquer visitante.

---

## 6. Zaptutor — extensão do Chrome
`Chrome MV3 · JavaScript`

**O que é:** vários atendentes num número só de WhatsApp Web. A extensão assina cada
mensagem com o nome de quem escreveu.

**Fluxo de uma mensagem:**
1. **Content script** observa a caixa de texto do WhatsApp Web.
2. No envio, lê o conteúdo e **colapsa as quebras de linha duplicadas**.
3. Prefixa o nome (negrito ou itálico, mesma linha ou acima) e **capitaliza o início das
   frases**.
4. Escreve de volta e envia. O nome vai como **conteúdo real da mensagem** — todo
   destinatário vê, em qualquer aparelho, inclusive em grupo.
5. Nome sincroniza pela conta Google via `chrome.storage.sync`.

**Parte difícil — ótima história:** o editor do WhatsApp é o **Lexical**, que renderiza
cada linha como parágrafo próprio. `innerText` devolve **duas quebras onde há uma** —
ler ingênuo duplicava toda mensagem.

**Segunda:** a **prévia passa pela mesma função** que monta a mensagem real. Prévia com
caminho próprio diverge, e você descobre na frente do cliente. E **escapa antes de
estilizar**, senão a prévia vira ponto de injeção.

**Números:** 24 testes unitários · **1 permissão pedida** · **0 chamadas de rede**.

---

## 7. ezguide — tour de produto clicável
`React 19 · Vite · Express · SQLite`

**O que é:** transforma screenshots de produto num tour clicável e compartilhável, sem
gravar vídeo e sem escrever código.

**Fluxo:**
1. Sobe os screenshots e marca os pontos — **tooltip** ou área **só de clique**.
2. Aplica a marca própria e, se quiser, **captura de lead**.
3. Publica e compartilha o link.
4. Visitante clica pelo tour; cada passo emite evento.
5. Painel mostra **funil de verdade**: iniciados, visualizações por etapa, concluídos,
   cliques no CTA.

**Perguntam:** *"por que SQLite?"*
> "Single-writer workload, one deployable, no separate database to operate. I'd move to
> Postgres when I need concurrent writers or multi-instance."

---

## 8. Trabalho de cliente

| Projeto | Stack | Uma frase |
|---|---|---|
| **SolarTech** | React + Vite | Plataforma de economia de energia com simulação e dashboards |
| **Renova Aesthetic** | Next.js + Stripe | E-commerce completo para clínica de estética |
| **Gnomon** | TypeScript · React · PWA | Wayfinding indoor para campus, hospital e evento |

**Gnomon merece narrativa** — é startup, você foi co-fundador e único dev do núcleo:
algoritmo de rotas, API e UI, com E2E em Cypress. **1º lugar entre todas as turmas de
ADS** e avanço no **Centelha 3**. GPS não funciona dentro de prédio — esse era o
problema.

---

## ⚑ Base mínima (glossário de 3 min)

**Next.js App Router** — componentes são **server** por padrão (rodam no servidor, não
vão pro bundle); `"use client"` marca os que precisam de interatividade. `dynamic =
"force-dynamic"` desliga cache quando o dado tem que ser fresco.

**Supabase** — Postgres gerenciado + auth + storage. O valor está no **RLS**: a
autorização vive **no banco**, então query que esquece o `WHERE` não vaza inquilino.
A chave `service_role` **ignora RLS** — só no servidor, nunca no browser.

**PWA** — `manifest.json` (instalar na tela inicial) + **service worker** (casca
offline). É por isso que Touvie e agendapp instalam como app.

**Cron** — trabalho agendado. GitHub Actions é grátis e serve pro plano free da Vercel.
Regra: cron **tem que ser idempotente**, porque vai rodar duas vezes um dia.

**Chrome MV3** — `manifest.json` declara **permissões** (peça o mínimo); **content
script** roda dentro da página; **service worker** substituiu a background page e
**morre quando ocioso** — não guarde estado nele.

**RAG** — o modelo responde a partir de documento **recuperado**, não de memória.
Resposta ancorada, fonte citável, menos alucinação.

**Tool calling** — o modelo chama uma função sua em vez de escrever texto. É assim que
o assistente do Touvie muda dado e a Amora transfere pra humano. **A ferramenta é a
fronteira de permissão.**

---

## Como usar estes 20 minutos

Não leia tudo. **Escolha 3 projetos** — Touvie, Caçador e cobraflow são os mais fortes —
e, para cada um, leia só **o fluxo numerado**. Feche o arquivo e **narre em voz alta, em
inglês, seguindo um item só**. Se travar num passo, é esse passo que você não sabe.
