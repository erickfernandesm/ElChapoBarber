// Dados do site. WhatsApp no formato 55 + DDD + numero (apenas digitos).
const CONFIG = {
  whatsappPrincipal: "5532988565053",
  whatsappSecundario: "5532984036401",

  // foto: caminho relativo a Assets; vazio usa fallback com iniciais.
  // whatsapp: numero proprio do barbeiro; vazio usa o principal.
  barbeiros: [
    { nome: "Barbeiro 1",  especialidade: "Fade & Freestyle",        bio: "Especialista em degradês e cortes na régua. Precisão e estilo em cada detalhe.", foto: "Assets/barbeiro1.jpg",  whatsapp: "5532988565053", tag: "Top" },
    { nome: "Barbeiro 2",  especialidade: "Barba & Navalha",         bio: "Mestre da barba desenhada e do acabamento na navalha. Visual impecável garantido.", foto: "Assets/barbeiro2.jpg",  whatsapp: "5532984036401", tag: "" },
    { nome: "Barbeiro 3",  especialidade: "Coloração & Platinado",   bio: "Do platinado ao colorido ousado. Transforma o visual mantendo a saúde do fio.", foto: "Assets/barbeiro3.jpg",  whatsapp: "", tag: "" },
    { nome: "Barbeiro 4",  especialidade: "Cortes Clássicos",        bio: "Atendimento de primeira, do clássico ao moderno. Bom papo e cadeira impecável.", foto: "Assets/barbeiro4.jpg",  whatsapp: "", tag: "" },
    { nome: "Barbeiro 5",  especialidade: "Low Fade & Disfarçado",   bio: "Transições suaves e acabamento limpo. O disfarçado é a sua marca registrada.", foto: "Assets/barbeiro5.jpg",  whatsapp: "", tag: "" },
    { nome: "Barbeiro 6",  especialidade: "Cortes Infantis",         bio: "Paciência e jeito com a criançada. A primeira cadeira já vira tradição.", foto: "Assets/barbeiro6.jpg",  whatsapp: "", tag: "" },
    { nome: "Barbeiro 7",  especialidade: "Cabelo Afro & Cacheado",  bio: "Valoriza a textura natural com cortes e definição que respeitam o seu cabelo.", foto: "Assets/barbeiro7.jpg",  whatsapp: "", tag: "" },
    { nome: "Barbeiro 8",  especialidade: "Desenhos & Riscos",       bio: "Freestyle na máquina: riscos, desenhos e detalhes que chamam atenção.", foto: "Assets/barbeiro8.jpg",  whatsapp: "", tag: "Novo" },
    { nome: "Barbeiro 9",  especialidade: "Social & Executivo",      bio: "Cortes alinhados e discretos pra quem quer estilo no dia a dia e no trabalho.", foto: "Assets/barbeiro9.jpg",  whatsapp: "", tag: "" },
    { nome: "Barbeiro 10", especialidade: "Barboterapia",            bio: "Toalha quente, hidratação e relaxamento. A experiência completa de barbearia.", foto: "Assets/barbeiro10.jpg", whatsapp: "", tag: "" },
  ],

  depoimentos: [
    { texto: "Os caras são os mais brabos, só barbeiro bom! Não tem erro, nem como reclamar.", autor: "Heitor M." },
    { texto: "Excelentes profissionais e muito atenciosos. Recomendo demais!", autor: "Sérgio R." },
    { texto: "Ambiente top, atendimento nota mil e o corte sempre impecável. Virei cliente fiel.", autor: "Cliente El Chapo" },
    { texto: "Melhor barbearia de Juiz de Fora! Sempre saio de lá outra pessoa.", autor: "Lucas F." },
    { texto: "Atendimento de primeira e estacionamento do lado. Comodidade total.", autor: "André P." },
  ],

  servicos: [
    { ico: "✂️", nome: "Corte", desc: "Corte na tesoura ou máquina, do clássico ao degradê.", preco: "R$ 40" },
    { ico: "🧔", nome: "Barba", desc: "Barba desenhada, toalha quente e acabamento na navalha.", preco: "R$ 30" },
    { ico: "💈", nome: "Corte + Barba", desc: "O combo completo pra você sair impecável.", preco: "R$ 60" },
    { ico: "👁️", nome: "Sobrancelha", desc: "Design e limpeza pra valorizar o olhar.", preco: "R$ 10" },
    { ico: "🎨", nome: "Coloração / Platinado", desc: "Da cor discreta ao platinado ousado.", preco: "Sob consulta" },
    { ico: "🧒", nome: "Corte Infantil", desc: "Paciência e capricho com a criançada.", preco: "R$ 35" },
  ],

  // posicoes sem arquivo correspondente viram placeholder automaticamente.
  galeria: [
    "Assets/corte1.jpg",
    "Assets/corte2.jpg",
    "Assets/corte3.jpg",
    "Assets/corte4.jpg",
    "Assets/corte5.jpg",
    "Assets/corte6.jpg",
    "Assets/corte7.jpg",
    "Assets/corte8.jpg",
  ],

  horarios: [
    "08:00", "09:00", "10:00", "11:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  ],
};

function linkWhats(numero, mensagem) {
  const fone = (numero || CONFIG.whatsappPrincipal).replace(/\D/g, "");
  return `https://wa.me/${fone}?text=${encodeURIComponent(mensagem)}`;
}

// Iniciais para o placeholder do barbeiro
function iniciais(nome) {
  return nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

// Render dos cards de serviço
function renderServicos() {
  const grid = document.getElementById("servicosGrid");
  const msgBase = "Olá! Vim pelo site da El Chapo Barber e quero agendar:";
  grid.innerHTML = CONFIG.servicos.map((s) => {
    const msg = `${msgBase} *${s.nome}*. Qual a disponibilidade?`;
    return `
      <article class="servico-card reveal">
        <div class="servico-card__ico">${s.ico}</div>
        <h3>${s.nome}</h3>
        <p>${s.desc}</p>
        <div class="servico-card__price">${s.preco}</div>
        <a class="btn btn--ghost" target="_blank" rel="noopener" href="${linkWhats(CONFIG.whatsappPrincipal, msg)}">Agendar</a>
      </article>`;
  }).join("");
}

// Render dos cards de barbeiro
function renderBarbeiros() {
  const grid = document.getElementById("barbeirosGrid");
  grid.innerHTML = CONFIG.barbeiros.map((b) => {
    const msg = `Olá! Quero reservar com o(a) *${b.nome}*. Dia: ____ / Horário: ____.`;
    const numero = b.whatsapp || CONFIG.whatsappPrincipal;
    const tag = b.tag ? `<span class="barbeiro-card__tag">${b.tag}</span>` : "";
    const foto = b.foto
      ? `<img src="${b.foto}" alt="${b.nome}" loading="lazy"
           onerror="this.outerHTML='<div class=\\'barbeiro-card__placeholder\\'>${iniciais(b.nome)}</div>'">`
      : `<div class="barbeiro-card__placeholder">${iniciais(b.nome)}</div>`;
    return `
      <article class="barbeiro-card">
        <div class="barbeiro-card__photo">${tag}${foto}</div>
        <div class="barbeiro-card__body">
          <h3>${b.nome}</h3>
          <div class="barbeiro-card__role">${b.especialidade}</div>
          <p class="barbeiro-card__bio">${b.bio}</p>
          <a class="btn btn--whatsapp" target="_blank" rel="noopener" href="${linkWhats(numero, msg)}">
            Reservar com ${b.nome.split(" ")[0]}
          </a>
        </div>
      </article>`;
  }).join("");
}

// Render da galeria
function renderGaleria() {
  const grid = document.getElementById("galeriaGrid");
  grid.innerHTML = CONFIG.galeria.map((src, i) => {
    if (!src) return `<div class="galeria__item galeria__item--ph"></div>`;
    return `
      <div class="galeria__item">
        <img src="${src}" alt="Trabalho El Chapo Barber ${i + 1}" loading="lazy"
          onerror="this.parentElement.classList.add('galeria__item--ph'); this.remove();">
      </div>`;
  }).join("");
}

// Render e rotacao automatica dos depoimentos
function renderDepoimentos() {
  const track = document.getElementById("depoTrack");
  const dots = document.getElementById("depoDots");
  if (!track) return;

  track.innerHTML = CONFIG.depoimentos.map((d) => `
    <blockquote class="depo">
      <div class="depo__stars">★★★★★</div>
      <p>"${d.texto}"</p>
      <footer>— ${d.autor}</footer>
    </blockquote>`).join("");

  dots.innerHTML = CONFIG.depoimentos.map((_, i) =>
    `<button aria-label="Depoimento ${i + 1}" data-i="${i}"></button>`).join("");

  let atual = 0;
  const total = CONFIG.depoimentos.length;
  const botoes = [...dots.children];

  function ir(i) {
    atual = (i + total) % total;
    track.style.transform = `translateX(-${atual * 100}%)`;
    botoes.forEach((b, j) => b.classList.toggle("active", j === atual));
  }

  botoes.forEach((b) => b.addEventListener("click", () => { ir(Number(b.dataset.i)); reiniciar(); }));

  let timer = setInterval(() => ir(atual + 1), 5000);
  function reiniciar() { clearInterval(timer); timer = setInterval(() => ir(atual + 1), 5000); }

  // pausa ao passar o mouse
  const car = document.getElementById("depoCarousel");
  car.addEventListener("mouseenter", () => clearInterval(timer));
  car.addEventListener("mouseleave", reiniciar);

  ir(0);
}

// Carrossel de barbeiros: setas e arrasto com o mouse
function setupCarrosselBarbeiros() {
  const track = document.getElementById("barbeirosGrid");
  const prev = document.getElementById("barbPrev");
  const next = document.getElementById("barbNext");
  if (!track || !prev || !next) return;

  function passo() {
    const card = track.querySelector(".barbeiro-card");
    const gap = parseFloat(getComputedStyle(track).columnGap || "24") || 24;
    return card ? card.offsetWidth + gap : 300;
  }

  function atualizarBotoes() {
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }

  prev.addEventListener("click", () => track.scrollBy({ left: -passo(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: passo(), behavior: "smooth" }));
  track.addEventListener("scroll", atualizarBotoes, { passive: true });
  window.addEventListener("resize", atualizarBotoes);

  // arrastar com o mouse (desktop)
  let down = false, startX = 0, startScroll = 0;
  track.addEventListener("mousedown", (e) => { down = true; startX = e.pageX; startScroll = track.scrollLeft; track.style.cursor = "grabbing"; });
  window.addEventListener("mouseup", () => { down = false; track.style.cursor = ""; });
  track.addEventListener("mouseleave", () => { down = false; track.style.cursor = ""; });
  track.addEventListener("mousemove", (e) => { if (!down) return; e.preventDefault(); track.scrollLeft = startScroll - (e.pageX - startX); });

  atualizarBotoes();
}

// Agendamento: monta a mensagem e abre o WhatsApp
function setupAgendador() {
  const selBarbeiro = document.getElementById("fBarbeiro");
  const selServico = document.getElementById("fServico");
  const selHora = document.getElementById("fHora");
  const inputData = document.getElementById("fData");

  // popular barbeiros
  CONFIG.barbeiros.forEach((b, i) => {
    selBarbeiro.insertAdjacentHTML("beforeend", `<option value="${i}">${b.nome}</option>`);
  });
  selBarbeiro.insertAdjacentHTML("beforeend", `<option value="qualquer">Tanto faz / o primeiro disponível</option>`);

  // popular serviços
  CONFIG.servicos.forEach((s) => {
    selServico.insertAdjacentHTML("beforeend", `<option value="${s.nome}">${s.nome} — ${s.preco}</option>`);
  });

  // popular horários
  CONFIG.horarios.forEach((h) => {
    selHora.insertAdjacentHTML("beforeend", `<option value="${h}">${h}</option>`);
  });

  // data mínima = hoje
  const hoje = new Date().toISOString().split("T")[0];
  inputData.min = hoje;

  // formatar data dd/mm
  function formatarData(iso) {
    if (!iso) return "____";
    const [a, m, d] = iso.split("-");
    return `${d}/${m}/${a}`;
  }

  // submit -> WhatsApp
  document.getElementById("formAgendar").addEventListener("submit", (e) => {
    e.preventDefault();

    const idx = selBarbeiro.value;
    if (idx === "") { selBarbeiro.focus(); selBarbeiro.style.borderColor = "var(--gold)"; return; }
    if (!inputData.value) { inputData.focus(); return; }
    if (!selHora.value) { selHora.focus(); return; }

    const nome = document.getElementById("fNome").value.trim();
    const servico = selServico.value;
    const data = formatarData(inputData.value);
    const hora = selHora.value;

    let barbeiroNome, numero;
    if (idx === "qualquer") {
      barbeiroNome = "qualquer barbeiro disponível";
      numero = CONFIG.whatsappPrincipal;
    } else {
      const b = CONFIG.barbeiros[Number(idx)];
      barbeiroNome = b.nome;
      numero = b.whatsapp || CONFIG.whatsappPrincipal;
    }

    let msg = `Olá! Quero reservar com o(a) *${barbeiroNome}*`;
    msg += `, dia *${data}* às *${hora}*`;
    if (servico) msg += `, serviço: *${servico}*`;
    msg += `.`;
    if (nome) msg += ` Meu nome é ${nome}.`;

    window.open(linkWhats(numero, msg), "_blank");
  });
}

// Links de WhatsApp fixos (flutuante, topo e rodape)
function setupLinksGerais() {
  const msgGeral = "Olá! Vim pelo site da El Chapo Barber e quero agendar um horário. 💈";
  const msgGeral2 = "Olá! Vim pelo site da El Chapo Barber e quero mais informações. 💈";

  const set = (id, numero, msg) => {
    const el = document.getElementById(id);
    if (el) el.href = linkWhats(numero, msg);
  };

  set("whatsFloat", CONFIG.whatsappPrincipal, msgGeral);
  set("ctaWhatsTopo", CONFIG.whatsappPrincipal, msgGeral);
  set("footerWhats1", CONFIG.whatsappPrincipal, msgGeral2);
  set("footerWhats2", CONFIG.whatsappSecundario, msgGeral2);
}

// Estado do header ao rolar a pagina
function setupHeader() {
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Menu mobile
function setupMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Animacao de entrada ao rolar
function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

// Inicializacao
document.addEventListener("DOMContentLoaded", () => {
  renderServicos();
  renderBarbeiros();
  renderGaleria();
  renderDepoimentos();
  setupCarrosselBarbeiros();
  setupAgendador();
  setupLinksGerais();
  setupHeader();
  setupMenu();
  document.getElementById("year").textContent = new Date().getFullYear();
  // reveal precisa rodar depois de inserir os cards dinâmicos
  setupReveal();
});
