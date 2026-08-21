import type { Bi } from "./operations";

/**
 * Trabalho, em duas naturezas que não competem: sistema que eu opero/construí
 * de ponta a ponta, e site entregue pra cliente pagante. Os dois provam coisas
 * diferentes — misturar num grid só apagaria a diferença.
 */

export type Metric = { label: Bi; value: string; unit?: string };

export type CaseStudy = {
  slug: string;
  name: string;
  year: string;
  tech: string;
  tagline: Bi;
  problem: Bi;
  approach: Bi;
  metrics: Metric[];
  hard: { title: Bi; detail: Bi }[];
  repo?: string;
  live?: string;
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "touvie",
    name: "Touvie",
    year: "2026",
    tech: "Next.js 15 · Supabase · Telegram",
    repo: "https://github.com/JaoVile/Touvie",
    live: "https://touvie.vercel.app",
    tagline: {
      en: "A personal life operating system, running in production for its only demanding user: me.",
      pt: "Um sistema operacional de vida pessoal, em produção para o único usuário exigente que ele tem: eu.",
    },
    problem: {
      en: "Routine, goals, journal, finance, workout and diet were spread across five apps that did not talk to each other, and none of them could answer a question about my own data.",
      pt: "Rotina, metas, diário, finanças, treino e dieta viviam em cinco apps que não conversavam, e nenhum deles respondia uma pergunta sobre os meus próprios dados.",
    },
    approach: {
      en: "One installable PWA on Next.js 15 and Supabase Postgres, row-level security on every table, a Telegram bot for logging outside the app, and an assistant that calls real tools against real data instead of guessing.",
      pt: "Um PWA instalável em Next.js 15 e Supabase Postgres, row-level security em toda tabela, um bot de Telegram pra registrar fora do app, e um assistente que chama ferramentas de verdade contra dados de verdade em vez de chutar.",
    },
    metrics: [
      { label: { en: "Commits", pt: "Commits" }, value: "320" },
      { label: { en: "Lines of TypeScript", pt: "Linhas de TypeScript" }, value: "71,422" },
      { label: { en: "SQL migrations", pt: "Migrações SQL" }, value: "41" },
      { label: { en: "Playwright specs", pt: "Specs de Playwright" }, value: "25" },
    ],
    hard: [
      {
        title: { en: "Device trust, enforced at the edge", pt: "Confiança de dispositivo, imposta na borda" },
        detail: {
          en: "Middleware locks the app to read-only on any device I have not trusted. The marker is an HMAC-SHA256 signed cookie verified server-side, written so the same code path works on both the edge and Node runtimes.",
          pt: "O middleware trava o app em só-leitura em qualquer dispositivo que eu não tenha confiado. A marca é um cookie assinado com HMAC-SHA256 verificado no servidor, escrito pra que o mesmo caminho funcione no runtime de edge e no de Node.",
        },
      },
      {
        title: { en: "An assistant that mutates state", pt: "Um assistente que altera estado" },
        detail: {
          en: "It creates, edits, completes and deletes goals and logs transactions through tool calling. Read-only assistants are easy; one that writes needs the tool surface to be the authorization boundary.",
          pt: "Ele cria, edita, conclui e apaga metas e registra transações via tool calling. Assistente só-leitura é fácil; um que escreve exige que a superfície de ferramentas seja a fronteira de autorização.",
        },
      },
      {
        title: { en: "Surviving provider churn", pt: "Sobreviver à rotatividade de provedor" },
        detail: {
          en: "Groq silently 404'd a deprecated model and a paid tier degraded mid-flight. Both incidents are documented in the code, next to the fallback that now handles them.",
          pt: "A Groq devolveu 404 em silêncio num modelo descontinuado e um tier pago degradou em pleno voo. Os dois incidentes estão documentados no código, ao lado do fallback que hoje os cobre.",
        },
      },
    ],
  },
  {
    slug: "cacador",
    name: "Caçador de Ofertas",
    year: "2026",
    tech: "Next.js · Supabase · Telegram Bot",
    repo: "https://github.com/JaoVile/VaiGerar",
    tagline: {
      en: "A deal hunter that reads Brazilian Telegram channels and only wakes you when the price is actually right.",
      pt: "Um caçador de ofertas que lê canais de promoção do Telegram e só te acorda quando o preço está de fato certo.",
    },
    problem: {
      en: "Deal channels post thousands of items a day, and every off-the-shelf alert bot fires on the product name — so it fires constantly and you stop reading it.",
      pt: "Canais de promoção publicam milhares de itens por dia, e todo bot de alerta pronto dispara pelo nome do produto — então dispara sempre e você para de ler.",
    },
    approach: {
      en: "A cron collector scrapes public channel pages every five minutes and parses price, coupon and store out of free-form Portuguese. You describe a hunt to a Telegram bot; a separate job matches new posts and only then alerts.",
      pt: "Um coletor em cron raspa as páginas públicas dos canais a cada cinco minutos e extrai preço, cupom e loja de texto livre em português. Você descreve uma caçada pro bot de Telegram; um job separado casa os posts novos e só então alerta.",
    },
    metrics: [
      { label: { en: "Passing tests", pt: "Testes passando" }, value: "476" },
      { label: { en: "Commits", pt: "Commits" }, value: "103" },
      { label: { en: "SQL migrations", pt: "Migrações SQL" }, value: "9" },
      { label: { en: "Active channels", pt: "Canais ativos" }, value: "25" },
    ],
    hard: [
      {
        title: { en: "Coupons were poisoning the price signal", pt: "Cupons envenenavam o sinal de preço" },
        detail: {
          en: '"R$30 OFF" was being parsed as a R$30 product, which dragged the median down and made every hunt look satisfied. Separating coupon values from prices is the single fix that made the alerts trustworthy.',
          pt: '"R$30 OFF" era lido como produto de R$30, o que puxava a mediana pra baixo e fazia toda caçada parecer satisfeita. Separar valor de cupom de preço foi o conserto que tornou o alerta confiável.',
        },
      },
      {
        title: { en: "A sanity floor, tuned on real data", pt: "Um piso de sanidade, calibrado com dado real" },
        detail: {
          en: "A phone case is not a phone. The price-floor heuristic was calibrated against three months of collected posts with a documented false-positive rate per threshold — a judgment call backed by a table, not a guess.",
          pt: "Capinha não é celular. A heurística de piso foi calibrada contra três meses de posts coletados, com taxa de falso positivo documentada por limiar — decisão embasada numa tabela, não em chute.",
        },
      },
      {
        title: { en: "A dead-man's switch", pt: "Um canário" },
        detail: {
          en: "If every channel returns zero posts in the same tick, that is not a quiet day — that is the scraper being broken. The canary catches the silent failure that monitoring usually misses.",
          pt: "Se todo canal devolve zero post no mesmo tick, isso não é dia parado — é o coletor quebrado. O canário pega a falha silenciosa que o monitoramento costuma deixar passar.",
        },
      },
    ],
  },
  {
    slug: "zaptutor",
    name: "Zaptutor",
    year: "2026",
    tech: "Chrome MV3 · JavaScript",
    repo: "https://github.com/JaoVile/zaptutor",
    tagline: {
      en: "One WhatsApp number, several attendants, and nobody on the other side knew who was talking.",
      pt: "Um número de WhatsApp, vários atendentes, e ninguém do outro lado sabia com quem estava falando.",
    },
    problem: {
      en: "Support ran on a single shared WhatsApp Web login. Customers got a thread with no idea which person answered, and attendants kept typing their own name by hand — which meant they forgot, or spelled it differently every time.",
      pt: "O atendimento rodava num único login compartilhado do WhatsApp Web. O cliente recebia uma conversa sem saber quem respondeu, e os atendentes digitavam o próprio nome na mão — ou seja, esqueciam, ou escreviam diferente toda vez.",
    },
    approach: {
      en: "A Manifest V3 extension that prefixes every outgoing message with the attendant's name and capitalises the start of each sentence. The name can be bold or italic, on the same line or the one above. The whole formatting layer is a pure module with no browser dependency, so it runs under node:test as well as inside the page.",
      pt: "Uma extensão Manifest V3 que prefixa toda mensagem enviada com o nome do atendente e coloca maiúscula no começo de cada frase. O nome pode sair em negrito ou itálico, na mesma linha ou na de cima. A camada de formatação inteira é um módulo puro, sem dependência de navegador, então roda no node:test tanto quanto dentro da página.",
    },
    metrics: [
      { label: { en: "Commits", pt: "Commits" }, value: "28" },
      { label: { en: "Unit tests", pt: "Testes unitários" }, value: "24" },
      { label: { en: "Permissions asked", pt: "Permissões pedidas" }, value: "1" },
      { label: { en: "Network calls", pt: "Chamadas de rede" }, value: "0" },
    ],
    hard: [
      {
        title: { en: "One line break arrives as two", pt: "Uma quebra de linha chega como duas" },
        detail: {
          en: "WhatsApp's composer is Lexical, which renders every line as its own paragraph — so innerText returns a pair of newlines for a single visual break. Reading the box naively doubled every line. The fix collapses each pair back into one logical break.",
          pt: "O editor do WhatsApp é o Lexical, que renderiza cada linha como um parágrafo próprio — então o innerText devolve um par de quebras para uma única quebra visual. Ler a caixa de forma ingênua duplicava toda linha. O conserto reduz cada par de volta a uma quebra lógica.",
        },
      },
      {
        title: { en: "The preview is never allowed to lie", pt: "A prévia nunca pode mentir" },
        detail: {
          en: "The popup preview renders through the exact same function that builds the real message, then converts WhatsApp markup to HTML. A preview with its own rendering path is a preview that drifts, and you only find out in front of a customer.",
          pt: "A prévia do popup passa exatamente pela mesma função que monta a mensagem real, e só então converte a marcação do WhatsApp em HTML. Prévia com caminho de renderização próprio é prévia que diverge, e você só descobre na frente do cliente.",
        },
      },
      {
        title: { en: "Escape before you style", pt: "Escapar antes de estilizar" },
        detail: {
          en: "The preview turns *x* into bold and _x_ into italic, but the text is escaped first, so a message containing a tag renders as characters and never as markup. Order matters here, and getting it backwards is how a preview becomes an injection point.",
          pt: "A prévia transforma *x* em negrito e _x_ em itálico, mas o texto é escapado antes, então uma mensagem que contém uma tag aparece como caractere e nunca como marcação. A ordem importa, e invertê-la é como uma prévia vira ponto de injeção.",
        },
      },
    ],
  },
  {
    slug: "slidecoop",
    name: "slidecoop",
    year: "2026",
    tech: "Next.js · Zod · Supabase",
    tagline: {
      en: "Present a deck with private speaker notes, then hand clients a revocable link where they comment slide by slide.",
      pt: "Apresente um deck com notas privadas de orador e entregue ao cliente um link revogável onde ele comenta slide a slide.",
    },
    problem: {
      en: "Feedback on a deck arrives as a message saying \"slide 4 is confusing\" three days later, detached from the slide. And the notes the presenter needs must never reach the audience.",
      pt: "Retorno sobre um deck chega como mensagem dizendo \"o slide 4 está confuso\" três dias depois, solto do slide. E as notas que o apresentador precisa não podem chegar à plateia.",
    },
    approach: {
      en: "One deck, two surfaces: the producer view carries the private notes, and a token URL exposes only the slides plus a per-slide comment box. The token is revocable, so access ends when the engagement does. With no Supabase credentials the whole thing runs on a seeded in-memory deck, which means the demo path is the same code as production.",
      pt: "Um deck, duas superfícies: a visão do produtor carrega as notas privadas, e uma URL com token expõe só os slides mais uma caixa de comentário por slide. O token é revogável, então o acesso acaba quando o trabalho acaba. Sem credencial de Supabase tudo roda num deck em memória, ou seja, o caminho de demonstração é o mesmo código da produção.",
    },
    metrics: [
      { label: { en: "Passing tests", pt: "Testes passando" }, value: "52" },
      { label: { en: "Test files", pt: "Arquivos de teste" }, value: "10" },
      { label: { en: "Commits", pt: "Commits" }, value: "16" },
      { label: { en: "Credentials to demo", pt: "Credencial pra demonstrar" }, value: "0" },
    ],
    hard: [
      {
        title: { en: "The rate limiter fails closed", pt: "O rate limit falha fechado" },
        detail: {
          en: "A request with no identifiable IP has no bucket to charge, so the naive branch lets it through — and that is exactly the request an abuser sends. It is refused instead. Failing open is the default you get by accident; failing closed is the one you have to write.",
          pt: "Uma requisição sem IP identificável não tem balde pra debitar, então o caminho ingênuo deixa passar — e é exatamente a requisição que um abusador manda. Ela é recusada. Falhar aberto é o padrão que você ganha por acidente; falhar fechado é o que você precisa escrever.",
        },
      },
      {
        title: { en: "A wrong token gets a plain 404", pt: "Token errado recebe um 404 seco" },
        detail: {
          en: "Not \"expired\", not \"revoked\", not \"no such deck\". Distinguishing those tells someone probing tokens which guesses were close, which turns a share link into an enumeration oracle.",
          pt: "Não \"expirado\", não \"revogado\", não \"deck inexistente\". Distinguir isso conta a quem sonda tokens quais palpites chegaram perto, o que transforma um link de compartilhamento num oráculo de enumeração.",
        },
      },
      {
        title: { en: "Typing must not trigger the deck", pt: "Digitar não pode acionar o deck" },
        detail: {
          en: "Arrow keys navigate slides — until the visitor is writing a comment, when the same keys have to move the caret instead. A presenter shortcut that hijacks a text field looks like the app eating your feedback.",
          pt: "As setas navegam entre slides — até o visitante estar escrevendo um comentário, quando as mesmas teclas precisam mover o cursor. Um atalho de apresentação que sequestra um campo de texto parece que o app está comendo o seu comentário.",
        },
      },
    ],
  },
  {
    slug: "cobraflow",
    name: "cobraflow",
    year: "2026",
    tech: "Next.js 16 · SSE · WhatsApp Cloud API",
    repo: "https://github.com/JaoVile/cobraflow",
    tagline: {
      en: "Collections dispatch over WhatsApp, with the brakes built in before the accelerator.",
      pt: "Disparo de cobrança por WhatsApp, com o freio construído antes do acelerador.",
    },
    problem: {
      en: "A finance team was chasing overdue payments one customer at a time. Bulk messaging solves the throughput and creates a worse problem: one wrong batch and you have messaged people who asked you not to.",
      pt: "Um time financeiro cobrava inadimplência um cliente por vez. Disparo em massa resolve a vazão e cria um problema pior: um lote errado e você mandou mensagem pra quem pediu pra não receber.",
    },
    approach: {
      en: "A batch engine with an operator dashboard. Batches run manually with live progress or automatically on a cron — the same engine either way. Every mutating action lands in an audit log, and a two-layer blocklist sits in front of the send.",
      pt: "Um motor de lote com painel de operador. O lote roda manual com progresso ao vivo ou automático por cron — o mesmo motor nos dois casos. Toda ação que altera dado cai num log de auditoria, e uma blocklist em duas camadas fica na frente do envio.",
    },
    metrics: [
      { label: { en: "Blocklist layers", pt: "Camadas de bloqueio" }, value: "2" },
      { label: { en: "CI stages", pt: "Etapas de CI" }, value: "6" },
      { label: { en: "API routes", pt: "Rotas de API" }, value: "8" },
      { label: { en: "Real customer data", pt: "Dado real de cliente" }, value: "0" },
    ],
    hard: [
      {
        title: { en: "One engine, two triggers", pt: "Um motor, dois gatilhos" },
        detail: {
          en: "The manual dashboard and the cron scheduler call the identical run function. A scheduling path that drifts from the manual path is a bug waiting for the weekend.",
          pt: "O painel manual e o agendador chamam a mesma função. Um caminho agendado que diverge do manual é um bug esperando o fim de semana.",
        },
      },
      {
        title: { en: "Blocked is not the same as failed", pt: "Bloqueado não é o mesmo que falho" },
        detail: {
          en: "Recipients filtered by the blocklist are accounted separately from real send failures, so the failure rate stays honest.",
          pt: "Destinatário filtrado pela blocklist é contabilizado à parte de falha real de envio, pra taxa de falha continuar honesta.",
        },
      },
      {
        title: { en: "Cancel that actually cancels", pt: "Cancelar que cancela de verdade" },
        detail: {
          en: "The runner re-reads batch status every iteration, so cancelling stops cleanly and leaves untouched items pending rather than half-sent.",
          pt: "O runner relê o status do lote a cada iteração, então cancelar para limpo e deixa o que não foi tocado como pendente, não como meio-enviado.",
        },
      },
    ],
  },
];

/** Sites entregues a cliente pagante. Provam outra coisa: prazo e escopo de terceiro. */
export const clientWork = [
  {
    title: "SolarTech",
    desc: {
      en: "Energy savings platform with simulation and dashboards.",
      pt: "Plataforma de economia de energia com simulação e dashboards.",
    },
    image: "/projects/solar.png",
    tech: "React + Vite",
    url: "https://joaovilela-solar.vercel.app",
    year: "2025",
  },
  {
    title: "Renova Aesthetic",
    desc: {
      en: "Full e-commerce for an aesthetics clinic.",
      pt: "E-commerce completo para clínica de estética.",
    },
    image: "/projects/renova.png",
    tech: "Next.js + Stripe",
    url: "https://joaovilela-web.vercel.app",
    year: "2025",
  },
  {
    title: "Gnomon",
    desc: {
      en: "Indoor wayfinding PWA with interactive maps for complex venues.",
      pt: "PWA de wayfinding indoor com mapas interativos para espaços complexos.",
    },
    image: "/projects/gnomon.png",
    tech: "TypeScript + PWA",
    url: "https://white-gate-478903-h3.web.app/mapa",
    year: "2025",
  },
] as const;
