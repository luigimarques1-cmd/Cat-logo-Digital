/* Lógica de exibição da seção de clubes. Edite os dados em configuracao.js. */
const DADOS_DA_LIGA = window.DADOS_DA_LIGA;
if (!DADOS_DA_LIGA) console.error("configuracao.js não foi carregado: inclua-o antes de secao-liga.js");

(function iniciarVitrine() {
  function renderizar() {
    if (!DADOS_DA_LIGA) return;
    const secao = document.querySelector('.vitrine-liga');
    if (!secao) return;
    const titulo = secao.querySelector('.vitrine-liga__titulo');
    const descricao = secao.querySelector('.vitrine-liga__descricao');
    const imagemBanner = secao.querySelector('.vitrine-liga__banner-imagem');
    const lista = secao.querySelector('.vitrine-liga__lista');
    const viewport = secao.querySelector('.vitrine-liga__viewport');
    const aviso = secao.querySelector('.vitrine-liga__aviso');
    titulo.textContent = DADOS_DA_LIGA.titulo;
    descricao.textContent = DADOS_DA_LIGA.descricao;
    if (DADOS_DA_LIGA.bannerImagem) {
      imagemBanner.src = DADOS_DA_LIGA.bannerImagem;
      imagemBanner.hidden = false;
    }

    DADOS_DA_LIGA.clubes.forEach((clube) => {
      const card = document.createElement('a');
      card.className = 'vitrine-liga__card';
      card.href = clube.link || '#';
      card.setAttribute('aria-label', 'Ver camisas de ' + clube.nome);
      if (!clube.link) {
        card.addEventListener('click', (evento) => {
          evento.preventDefault();
          aviso.textContent = 'Adicione o link da coleção de ' + clube.nome + ' no arquivo secao-liga.js.';
        });
      }

      const envoltorio = document.createElement('span');
      envoltorio.className = 'vitrine-liga__escudo';
      if (clube.imagem) {
        const img = document.createElement('img');
        img.src = clube.imagem;
        img.alt = 'Escudo do ' + clube.nome;
        img.loading = 'lazy';
        img.decoding = 'async';
        envoltorio.appendChild(img);
      } else {
        const desenho = document.createElement('span');
        desenho.className = 'vitrine-liga__escudo-falso';
        desenho.style.setProperty('--escudo-cor', clube.cor || '#23344b');
        desenho.textContent = clube.sigla || clube.nome.slice(0, 3).toUpperCase();
        desenho.setAttribute('aria-hidden', 'true');
        envoltorio.appendChild(desenho);
      }

      const nome = document.createElement('span');
      nome.className = 'vitrine-liga__nome';
      nome.textContent = clube.nome;
      card.append(envoltorio, nome);
      lista.appendChild(card);
    });

    // Movimento lateral suave a cada 2,8 segundos, com setas e toque.
    // Para não atrapalhar, pausa quando alguém interage com o carrossel.
    const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pausa = false;
    let pausaTemporariaAte = 0;

    function deslocar(direcao) {
      const card = lista.querySelector('.vitrine-liga__card');
      if (!card) return;
      const intervalo = parseFloat(getComputedStyle(lista).gap) || 14;
      const passo = card.getBoundingClientRect().width + intervalo;
      const fim = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      let proxima = viewport.scrollLeft + direcao * passo;
      if (direcao > 0 && proxima > fim - 2) proxima = 0;
      if (direcao < 0 && proxima < -2) proxima = fim;
      viewport.scrollTo({ left: proxima, behavior: reduzMovimento.matches ? 'instant' : 'smooth' });
    }

    secao.querySelectorAll('.vitrine-liga__seta').forEach((botao) => {
      botao.addEventListener('click', () => {
        pausaTemporariaAte = Date.now() + 5000;
        deslocar(Number(botao.dataset.direcao));
      });
    });
    viewport.addEventListener('mouseenter', () => { pausa = true; });
    viewport.addEventListener('mouseleave', () => { pausa = false; });
    viewport.addEventListener('focusin', () => { pausa = true; });
    viewport.addEventListener('focusout', (e) => { if (!viewport.contains(e.relatedTarget)) pausa = false; });
    viewport.addEventListener('pointerdown', () => { pausaTemporariaAte = Date.now() + 6000; });
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        pausaTemporariaAte = Date.now() + 5000;
        deslocar(e.key === 'ArrowRight' ? 1 : -1);
      }
    });
    const relogio = window.setInterval(() => {
      if (!pausa && !reduzMovimento.matches && !document.hidden && Date.now() >= pausaTemporariaAte) deslocar(1);
    }, 2800);
    window.addEventListener('pagehide', () => window.clearInterval(relogio), { once: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderizar, { once: true });
  else renderizar();
})();
