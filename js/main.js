(function () {
  var NUM = '5519982014669';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var brl = function (v) { return 'R$ ' + Number(v).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  var wa = function (t) { return 'https://wa.me/' + NUM + '?text=' + encodeURIComponent(t); };

  /* ---------- entrada ao rolar ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function revela(els) { els.forEach(function (r) { io ? io.observe(r) : r.classList.add('vis'); }); }
  revela($$('.rev'));

  /* ---------- perfurações ---------- */
  var OBRAS = [["o01","orelha","Projeto de orelha: hélix, conch, daith e lóbulos"],["o02","nariz","Aba nasal com ponto de luz"],["o03","umbigo","Floating com joia de 10 pétalas"],["o04","micro","Surface facial em titânio"],["o05","orelha","Trágus + hélix, projeto em andamento"],["o06","nariz","Septo com segmento Chuva"],["o07","umbigo","Umbigo invertido em composição"],["o08","micro","Microdermal no tórax"],["o09","orelha","Orelha da Ana, feita e atualizada"],["o10","nariz","D-ring cravejada no gold"],["o11","umbigo","Umbigo com borboleta pendurada"],["o12","micro","Microdermal com topo de flor, 5 anos depois"],["o13","orelha","Trágus com coração liso em ouro 18K"],["o14","nariz","Aba nasal delicada"],["o15","umbigo","Floating navel"],["o16","micro","Surface na maçã do rosto"],["o17","orelha","Uma orelha, infinitas possibilidades"],["o18","nariz","Argola clicker D 3 face slim"],["o19","umbigo","Umbigo clássico no gold"],["o20","micro","Surface no tórax"],["o21","orelha","Australianos + composição completa"],["o22","nariz","Septo com argola segmentada"],["o23","umbigo","Umbigo da Rawani"],["o24","micro","Microdermal na maçã do rosto"],["o25","orelha","Orelha da Ju, projeto completo"],["o26","nariz","D-ring cravejada, a queridinha"],["o27","orelha","Quatro pétalas em titânio"],["o28","nariz","Vertical labret + septo"],["o29","micro","Microdermal no tórax"],["o30","orelha","Hélix + daith cravejados"],["o31","nariz","Aba nasal com argola cravejada"],["o32","orelha","Hélix com labret de borboleta"],["o33","nariz","Aba nasal com D-ring cravejada"],["o34","orelha","Triplo mid hélix (australianos)"],["o35","orelha","Midi-hélix e hélix dourados"],["o36","orelha","Mix de brilho em titânio"],["o37","orelha","Hélix, conch e lóbulos"],["o38","orelha","Conch rim + hélix"],["o39","orelha","Hélix e atualização de conch"],["o40","orelha","Composição delicada"]];
  var grade = $('[data-grade]'), mais = $('[data-mais]'), filtro = 'todas', limite = 24, lista = [];
  function pinta() {
    lista = OBRAS.filter(function (o) { return filtro === 'todas' || o[1] === filtro; });
    grade.innerHTML = '';
    lista.forEach(function (o, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'peca rev'; if (i >= limite) b.hidden = true;
      b.innerHTML = '<img src="img/obra/' + o[0] + '.webp" alt="' + o[2] + '" width="640" height="800" draggable="false">';
      b.addEventListener('click', function () { abreLb(i); });
      grade.appendChild(b);
    });
    mais.parentNode.hidden = lista.length <= limite;
    revela($$('.peca', grade));
  }
  $$('#perfuracoes .filtros button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('#perfuracoes .filtros button').forEach(function (x) { x.classList.toggle('on', x === b); });
      filtro = b.getAttribute('data-f'); limite = 24; pinta();
    });
  });
  mais.addEventListener('click', function () { limite = 999; $$('.peca', grade).forEach(function (p) { p.hidden = false; }); mais.parentNode.hidden = true; });
  pinta();

  /* lightbox */
  var lb = $('[data-lb]'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]'), atual = 0;
  function mostra(i) { atual = (i + lista.length) % lista.length; var o = lista[atual]; lbImg.src = 'img/obra/' + o[0] + 'g.webp'; lbImg.alt = o[2]; lbCap.textContent = o[2]; }
  function abreLb(i) { mostra(i); lb.hidden = false; document.body.classList.add('trava'); }
  function fechaLb() { lb.hidden = true; document.body.classList.remove('trava'); }
  $('[data-lb-x]').addEventListener('click', fechaLb);
  $('[data-lb-p]').addEventListener('click', function () { mostra(atual - 1); });
  $('[data-lb-n]').addEventListener('click', function () { mostra(atual + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) fechaLb(); });
  $('[data-lb-q]').addEventListener('click', function () {
    var o = lista[atual]; fechaLb();
    var mapa = { orelha: 'Orelha', nariz: 'Nariz', umbigo: 'Umbigo', micro: 'Microdermal ou surface' };
    $$('input[name=local]').forEach(function (i) { i.checked = i.value === mapa[o[1]]; });
    $('#form textarea').value = 'Quero algo como: ' + o[2];
    $('#agendar').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- loja (Nuvemshop) ---------- */
  var NS = window.NUVEMSHOP, vit = $('[data-vitrine]'), cats = $('[data-cats]'), cat = 'todas', todas = false, vmais = $('[data-vmais]');
  var parc = NS.store.installments;
  function estoque(p) { return p.variants.reduce(function (s, v) { return s + v.stock; }, 0); }
  function menor(p) { return Math.min.apply(null, p.variants.map(function (v) { return +v.price; })); }
  [{ id: 'todas', name: { pt: 'Todas' } }].concat(NS.categories).forEach(function (c) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = c.name.pt; if (c.id === 'todas') b.className = 'on';
    b.addEventListener('click', function () { $$('button', cats).forEach(function (x) { x.classList.toggle('on', x === b); }); cat = c.id; todas = false; vitrine(); });
    cats.appendChild(b);
  });
  function vitrine() {
    vit.innerHTML = '';
    var ps = NS.products.filter(function (p) { return cat === 'todas' || p.categories.indexOf(cat) > -1; });
    var lim = innerWidth >= 1400 ? 10 : 8;
    vmais.parentNode.hidden = todas || ps.length <= lim;
    vmais.textContent = 'Ver todas as ' + ps.length + ' joias';
    ps.forEach(function (p, i) {
      if (!todas && i >= lim) return;
      var est = estoque(p), v = menor(p), varios = p.variants.length > 1 && p.variants.some(function (x) { return +x.price !== v; });
      var a = document.createElement('button'); a.type = 'button'; a.className = 'prod rev' + (est ? '' : ' esgotado');
      var selo = !est ? '<span class="selo">Sem estoque</span>' : (est <= 2 ? '<span class="selo selo-l">Últimas unidades</span>' : '');
      a.innerHTML = '<span class="prod-f"><img src="' + p.images[0].src + '" alt="' + p.name.pt + '" width="640" height="800" draggable="false">' + selo + '</span>' +
        '<span class="prod-n">' + p.name.pt + '</span>' +
        '<span class="prod-p">' + (varios ? 'a partir de ' : '') + brl(v) + '</span>' +
        '<span class="prod-x">' + parc + 'x de ' + brl(v / parc) + ' sem juros</span>';
      a.addEventListener('click', function () { abreProd(p); });
      vit.appendChild(a);
    });
    revela($$('.prod', vit));
  }
  vmais.addEventListener('click', function () { todas = true; vitrine(); });
  vitrine();

  /* produto */
  var md = $('[data-prod]'), pv = null, pp = null;
  function abreProd(p) {
    pp = p;
    $('[data-p-img]').src = p.images[0].src; $('[data-p-img]').alt = p.name.pt;
    $('[data-p-nome]').textContent = p.name.pt;
    $('[data-p-cat]').textContent = NS.categories.filter(function (c) { return c.id === p.categories[0]; })[0].name.pt;
    $('[data-p-desc]').textContent = p.description.pt;
    var box = $('[data-p-var]'); box.innerHTML = '';
    var primeiro = p.variants.filter(function (v) { return v.stock > 0; })[0] || p.variants[0];
    if (p.variants.length > 1) p.variants.forEach(function (v) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = v.values[0].pt; b.disabled = !v.stock;
      b.addEventListener('click', function () { escolhe(v); });
      box.appendChild(b); v._b = b;
    });
    escolhe(primeiro);
    md.hidden = false; document.body.classList.add('trava');
  }
  function escolhe(v) {
    pv = v;
    pp.variants.forEach(function (x) { if (x._b) x._b.classList.toggle('on', x === v); });
    $('[data-p-preco]').textContent = brl(v.price);
    $('[data-p-parc]').textContent = parc + 'x de ' + brl(v.price / parc) + ' sem juros ou Pix';
    var add = $('[data-add]'), av = $('[data-avise]'), est = $('[data-p-est]');
    add.href = NS.store.url ? NS.store.url + '/produtos/' + pp.handle.pt + '/?variant=' + v.id : '#';
    if (!v.stock) {
      add.classList.add('off'); add.setAttribute('aria-disabled', 'true'); add.textContent = 'Sem estoque'; est.textContent = 'Esgotada no momento.';
      av.hidden = false; av.href = wa('Oi, Mila! Quero ser avisada quando a joia ' + pp.name.pt + ' voltar ao estoque.');
    } else {
      add.classList.remove('off'); add.removeAttribute('aria-disabled'); add.textContent = 'Comprar na loja'; av.hidden = true;
      est.textContent = /encomenda/.test(v.values[0].pt) ? 'Sob encomenda: prazo confirmado no pedido.' : (v.stock === 1 ? 'Última unidade.' : v.stock <= 2 ? 'Últimas ' + v.stock + ' unidades.' : 'Pronta entrega.');
    }
  }
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m || e.target.hasAttribute('data-fecha')) { m.hidden = true; document.body.classList.remove('trava'); } });
  });

  /* comprar: abre a joia na loja da Nuvemshop (na prévia, sem loja ligada, mostra o aviso) */
  $('[data-add]').addEventListener('click', function (e) {
    if (this.classList.contains('off')) { e.preventDefault(); return; }
    if (NS.store.url) return;
    e.preventDefault();
    $('[data-ck-nome]').textContent = pp.name.pt + (pp.variants.length > 1 ? ' (' + pv.values[0].pt + ')' : '');
    md.hidden = true; $('[data-ck]').hidden = false;
  });

  /* ---------- hero: vitrine enxuta, joias passando rápido ---------- */
  var H = $('[data-h]'), hImg = $('[data-h-img]'), hImg2 = $('[data-h-img2]'), hPts = $('[data-h-pontos]');
  var DEST = NS.featured.map(function (h) { return NS.products.filter(function (p) { return p.handle.pt === h; })[0]; });
  var hi = 0, hp = null, tAuto = null, CICLO = 2400, pausa = false;
  function hsrc(p) { return 'img/loja/h/' + p.handle.pt + '.webp'; }
  $('[data-h-todas]').textContent = 'Ver todas as ' + NS.products.length + ' joias';
  DEST.forEach(function (p, i) {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-label', p.name.pt);
    b.innerHTML = '<i></i>';
    b.addEventListener('click', function () { mostraH(i); });
    hPts.appendChild(b);
    var pre = new Image(); pre.src = hsrc(p);
  });
  function foto(src, alt) {
    if (!hImg.getAttribute('src')) { hImg.src = src; hImg.alt = alt; return; }
    hImg2.src = hImg.src; hImg2.classList.remove('sai'); void hImg2.offsetWidth;
    hImg.src = src; hImg.alt = alt; hImg2.classList.add('sai');
  }
  function mostraH(i) {
    hi = (i + DEST.length) % DEST.length; hp = DEST[hi];
    $$('button', hPts).forEach(function (b, j) { b.classList.toggle('on', j === hi); b.setAttribute('aria-selected', j === hi); });
    foto(hsrc(hp), hp.name.pt);
    $('[data-h-cat]').textContent = NS.categories.filter(function (c) { return c.id === hp.categories[0]; })[0].name.pt;
    $('[data-h-nome]').textContent = hp.name.pt;
    var v = menor(hp), varios = hp.variants.some(function (x) { return +x.price !== v; });
    $('[data-h-preco]').textContent = (varios ? 'a partir de ' : '') + brl(v);
    $('[data-h-parc]').textContent = parc + 'x de ' + brl(v / parc) + ' sem juros ou Pix';
    H.classList.remove('troca'); void H.offsetWidth; H.classList.add('troca');
    ciclo();
  }
  function ciclo() { clearTimeout(tAuto); if (!pausa) tAuto = setTimeout(function () { mostraH(hi + 1); }, CICLO); }
  $('[data-h-comprar]').addEventListener('click', function () { pausa = true; clearTimeout(tAuto); H.classList.add('pausa'); abreProd(hp); });
  $$('.modal').forEach(function (m) {
    new MutationObserver(function () { if (m.hidden && pausa && !H.matches(':hover')) { pausa = false; H.classList.remove('pausa'); ciclo(); } }).observe(m, { attributes: true, attributeFilter: ['hidden'] });
  });
  var foco = $('.h-foto', H), info = $('.h-info', H);
  [foco, info].forEach(function (el) {
    el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { pausa = true; clearTimeout(tAuto); H.classList.add('pausa'); } });
    el.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && $('[data-prod]').hidden) { pausa = false; H.classList.remove('pausa'); mostraH(hi); } });
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) {
    if (!es[0].isIntersecting) clearTimeout(tAuto); else ciclo();
  }).observe(H);
  mostraH(0);
  requestAnimationFrame(function () { $('.hero').classList.add('on'); });

  addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) fechaLb();
    $$('.modal').forEach(function (m) { m.hidden = true; });
    document.body.classList.remove('trava');
  });
  addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'ArrowLeft') mostra(atual - 1); if (e.key === 'ArrowRight') mostra(atual + 1);
  });

  /* ---------- formulário → WhatsApp ---------- */
  var form = $('#form'), nome = $('input[name=nome]', form), erro = $('.erro', form);
  nome.addEventListener('input', function () { if (nome.value.trim()) erro.hidden = true; });
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var n = nome.value.trim();
    if (!n) { erro.hidden = false; nome.focus(); return; }
    var val = function (s) { var e = $(s, form); return e ? e.value.trim() : ''; };
    var l = ['Olá, Mila! Sou *' + n + '* e quero agendar um horário.', ''];
    var local = val('input[name=local]:checked'), tipo = val('input[name=tipo]:checked'), joia = val('select[name=joia]'), per = val('select[name=per]'), ideia = val('textarea');
    if (local) l.push('*Onde:* ' + local);
    if (tipo) l.push('*Tipo:* ' + tipo);
    if (joia) l.push('*Joia:* ' + joia);
    if (per) l.push('*Melhor período:* ' + per);
    if (ideia) l.push('*Ideia:* ' + ideia);
    l.push('', '(pedido enviado pelo site)');
    window.open(wa(l.join('\n')), '_blank');
  });
})();
