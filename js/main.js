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
    vmais.parentNode.hidden = todas || ps.length <= 8;
    vmais.textContent = 'Ver todas as ' + ps.length + ' joias';
    ps.forEach(function (p, i) {
      if (!todas && i >= 8) return;
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
  var md = $('[data-prod]'), pv = null, pp = null, pq = 1;
  function abreProd(p) {
    pp = p; pq = 1; $('[data-p-q]').textContent = 1;
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
    if (!v.stock) {
      add.disabled = true; add.textContent = 'Sem estoque'; est.textContent = 'Esgotada no momento.';
      av.hidden = false; av.href = wa('Oi, Mila! Quero ser avisada quando a joia ' + pp.name.pt + ' voltar ao estoque.');
    } else {
      add.disabled = false; add.textContent = 'Adicionar à sacola'; av.hidden = true;
      est.textContent = /encomenda/.test(v.values[0].pt) ? 'Sob encomenda: prazo confirmado no pedido.' : (v.stock === 1 ? 'Última unidade.' : v.stock <= 2 ? 'Últimas ' + v.stock + ' unidades.' : 'Pronta entrega.');
    }
  }
  $$('[data-q]').forEach(function (b) {
    b.addEventListener('click', function () {
      var max = pv && !/encomenda/.test(pv.values[0].pt) ? pv.stock : 9;
      pq = Math.max(1, Math.min(max || 1, pq + +b.getAttribute('data-q'))); $('[data-p-q]').textContent = pq;
    });
  });
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m || e.target.hasAttribute('data-fecha')) { m.hidden = true; document.body.classList.remove('trava'); } });
  });

  /* sacola */
  var sac = $('[data-sacola]'), itens = [];
  try { itens = JSON.parse(localStorage.getItem('mila-sacola') || '[]'); } catch (e) { itens = []; }
  var frete = null;
  function acha(vid) { for (var i = 0; i < NS.products.length; i++) for (var j = 0; j < NS.products[i].variants.length; j++) if (NS.products[i].variants[j].id === vid) return [NS.products[i], NS.products[i].variants[j]]; }
  function salva() { try { localStorage.setItem('mila-sacola', JSON.stringify(itens)); } catch (e) {} }
  function sub() { return itens.reduce(function (s, it) { return s + acha(it.v)[1].price * it.q; }, 0); }
  function desenha() {
    var n = itens.reduce(function (s, it) { return s + it.q; }, 0);
    $('[data-conta]').textContent = n;
    var box = $('[data-itens]'); box.innerHTML = '';
    itens.forEach(function (it, i) {
      var pv2 = acha(it.v), p = pv2[0], v = pv2[1];
      var d = document.createElement('div'); d.className = 's-item';
      d.innerHTML = '<img src="' + p.images[0].src + '" alt="" width="64" height="80"><div><p class="s-n">' + p.name.pt + '</p><p class="s-v">' + v.values[0].pt + '</p>' +
        '<div class="qtd"><button type="button" aria-label="Menos">−</button><span>' + it.q + '</span><button type="button" aria-label="Mais">+</button></div></div>' +
        '<div class="s-dir"><p>' + brl(v.price * it.q) + '</p><button type="button" class="s-rm">Remover</button></div>';
      var bs = $$('button', d);
      bs[0].addEventListener('click', function () { if (it.q > 1) { it.q--; atualiza(); } });
      bs[1].addEventListener('click', function () { var mx = /encomenda/.test(v.values[0].pt) ? 9 : v.stock; if (it.q < mx) { it.q++; atualiza(); } });
      bs[2].addEventListener('click', function () { itens.splice(i, 1); atualiza(); });
      box.appendChild(d);
    });
    $('[data-vazia]').hidden = itens.length > 0; $('[data-fim]').hidden = itens.length === 0;
    var s = sub(); $('[data-sub]').textContent = brl(s + (frete ? frete.v : 0));
    if (frete) $('[data-sub]').previousElementSibling.textContent = 'Total com frete'; else $('[data-sub]').previousElementSibling.textContent = 'Subtotal';
  }
  function atualiza() { salva(); desenha(); if ($('[data-fretes]').children.length) calc(); }
  function abreSac() { desenha(); sac.hidden = false; document.body.classList.add('trava'); }
  function fechaSac() { sac.hidden = true; document.body.classList.remove('trava'); }
  $$('[data-abre-sacola]').forEach(function (b) { b.addEventListener('click', abreSac); });
  $$('[data-fecha-s]').forEach(function (b) { b.addEventListener('click', fechaSac); });
  sac.addEventListener('click', function (e) { if (e.target === sac) fechaSac(); });
  function poe(vid, q) {
    var ja = itens.filter(function (it) { return it.v === vid; })[0];
    if (ja) ja.q += q; else itens.push({ v: vid, q: q });
    salva();
  }
  $('[data-add]').addEventListener('click', function () { poe(pv.id, pq); md.hidden = true; abreSac(); });

  /* frete (simulação do Nuvem Envio) */
  var cep = $('[data-cep]');
  cep.addEventListener('input', function () { var d = cep.value.replace(/\D/g, '').slice(0, 8); cep.value = d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d; });
  function calc() {
    var d = cep.value.replace(/\D/g, ''), box = $('[data-fretes]');
    if (d.length !== 8) { box.innerHTML = '<p class="f-erro">Digite um CEP com 8 números.</p>'; return; }
    var reg = +d.slice(0, 2), perto = reg === 13, sp = reg <= 19;
    var ops = [
      { n: 'Nuvem Envio PAC', p: perto ? '2 a 4 dias úteis' : (sp ? '3 a 6 dias úteis' : '6 a 10 dias úteis'), v: perto ? 14.9 : (sp ? 18.9 : 27.9) },
      { n: 'Nuvem Envio Sedex', p: perto ? '1 a 2 dias úteis' : (sp ? '1 a 3 dias úteis' : '3 a 5 dias úteis'), v: perto ? 19.9 : (sp ? 24.9 : 39.9) }
    ];
    if (perto) ops.unshift({ n: 'Retirar no estúdio', p: 'Piracicaba, com horário combinado', v: 0 });
    box.innerHTML = '';
    ops.forEach(function (o, i) {
      var l = document.createElement('label'); l.className = 'frete';
      l.innerHTML = '<input type="radio" name="frete"' + (frete && frete.n === o.n ? ' checked' : '') + '><span><b>' + o.n + '</b><i>' + o.p + '</i></span><em>' + (o.v ? brl(o.v) : 'Grátis') + '</em>';
      $('input', l).addEventListener('change', function () { frete = o; desenha(); });
      box.appendChild(l);
    });
  }
  $('[data-calc]').addEventListener('click', calc);
  cep.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); calc(); } });

  /* checkout (simulação) */
  $('[data-checkout]').addEventListener('click', function () {
    var r = itens.map(function (it) { var a = acha(it.v); return '<p><span>' + it.q + '× ' + a[0].name.pt + ' (' + a[1].values[0].pt + ')</span><b>' + brl(a[1].price * it.q) + '</b></p>'; }).join('');
    if (frete) r += '<p><span>' + frete.n + '</span><b>' + (frete.v ? brl(frete.v) : 'Grátis') + '</b></p>';
    r += '<p class="tot"><span>Total</span><b>' + brl(sub() + (frete ? frete.v : 0)) + '</b></p>';
    $('[data-ck-resumo]').innerHTML = r;
    sac.hidden = true; $('[data-ck]').hidden = false;
  });
  desenha();

  /* ---------- hero: vitrine detalhada dos destaques ---------- */
  var H = $('[data-h]'), hLista = $('[data-h-lista]'), hImg = $('[data-h-img]'), hImg2 = $('[data-h-img2]');
  var DEST = NS.featured.map(function (h) { return NS.products.filter(function (p) { return p.handle.pt === h; })[0]; });
  var hi = 0, hp = null, hv = null, hq = 1, auto = true, tAuto = null, CICLO = 5500;
  function nomeCat(p) { return NS.categories.filter(function (c) { return c.id === p.categories[0]; })[0].name.pt; }
  function attr(p) { return /K/.test(p.variants[0].values[0].pt) ? 'Ouro' : 'Cor'; }
  DEST.forEach(function (p, i) {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab');
    b.innerHTML = '<span class="hl-n">' + p.name.pt + '</span><span class="hl-p">' + (estoque(p) ? brl(menor(p)) : 'Sem estoque') + '</span><i></i>';
    b.addEventListener('click', function () { para(); mostraH(i); });
    hLista.appendChild(b);
    p.images.forEach(function (im) { var pre = new Image(); pre.src = im.src; });
  });
  function foto(src, alt) {
    if (hImg.getAttribute('src') === src) return;
    if (!hImg.getAttribute('src')) { hImg.src = src; hImg.alt = alt; return; }
    hImg2.src = hImg.src; hImg2.classList.remove('sai'); void hImg2.offsetWidth;
    hImg.src = src; hImg.alt = alt; hImg2.classList.add('sai');
  }
  function mostraH(i) {
    hi = (i + DEST.length) % DEST.length; hp = DEST[hi];
    $$('button', hLista).forEach(function (b, j) { b.classList.toggle('on', j === hi); b.setAttribute('aria-selected', j === hi); });
    $$('[data-v]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-v') === '0'); });
    foto(hp.images[0].src, hp.name.pt);
    $('[data-h-cat]').textContent = nomeCat(hp);
    $('[data-h-nome]').textContent = hp.name.pt;
    var est = estoque(hp), selo = $('[data-h-selo]');
    selo.hidden = est > 2; selo.textContent = est ? 'Últimas unidades' : 'Sem estoque'; selo.classList.toggle('selo-l', !!est);
    var box = $('[data-h-var]'); box.innerHTML = '';
    $('[data-h-attr]').textContent = hp.variants.length > 1 ? attr(hp) : '';
    if (hp.variants.length > 1) hp.variants.forEach(function (v) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = v.values[0].pt; b.disabled = !v.stock;
      b.addEventListener('click', function () { para(); escolheH(v); });
      box.appendChild(b); v._h = b;
    });
    var f = [['Material', hp.categories[0] === 'ouro' ? 'Ouro 14K com certificação Amagold' : 'Titânio ASTM F136'],
      ['Indicada para', hp.uso], ['Garantia', 'Vitalícia do fabricante'], ['Entrega', 'Retirada no estúdio ou Nuvem Envio']];
    $('[data-h-ficha]').innerHTML = f.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('');
    escolheH(hp.variants.filter(function (v) { return v.stock > 0; })[0] || hp.variants[0]);
    H.classList.remove('troca', 'corre'); void H.offsetWidth; H.classList.add('troca', 'corre');
    if (auto) ciclo();
  }
  function escolheH(v) {
    hv = v; hq = 1; $('[data-h-q]').textContent = 1;
    hp.variants.forEach(function (x) { if (x._h) x._h.classList.toggle('on', x === v); });
    $('[data-h-preco]').textContent = brl(v.price);
    $('[data-h-parc]').textContent = parc + 'x de ' + brl(v.price / parc) + ' sem juros ou Pix';
    var add = $('[data-h-add]'), av = $('[data-h-avise]'), est = $('[data-h-est]');
    if (!v.stock) {
      add.disabled = true; add.textContent = 'Sem estoque'; est.textContent = 'Esgotada no momento.';
      av.hidden = false; av.href = wa('Oi, Mila! Quero ser avisada quando a joia ' + hp.name.pt + ' voltar ao estoque.');
    } else {
      add.disabled = false; add.textContent = 'Adicionar à sacola'; av.hidden = true;
      est.textContent = /encomenda/.test(v.values[0].pt) ? 'Sob encomenda: prazo confirmado no pedido.' : (v.stock === 1 ? 'Última unidade em estoque.' : v.stock <= 2 ? 'Últimas ' + v.stock + ' unidades em estoque.' : v.stock + ' em estoque, pronta entrega.');
    }
  }
  $$('[data-v]').forEach(function (b) {
    b.addEventListener('click', function () {
      para(); var k = +b.getAttribute('data-v');
      $$('[data-v]').forEach(function (x) { x.classList.toggle('on', x === b); });
      foto(hp.images[k].src, hp.name.pt + (k ? ', detalhe' : ''));
    });
  });
  $$('[data-hq]').forEach(function (b) {
    b.addEventListener('click', function () {
      para(); var max = hv && !/encomenda/.test(hv.values[0].pt) ? hv.stock : 9;
      hq = Math.max(1, Math.min(max || 1, hq + +b.getAttribute('data-hq'))); $('[data-h-q]').textContent = hq;
    });
  });
  $('[data-h-add]').addEventListener('click', function () { para(); poe(hv.id, hq); abreSac(); });
  function ciclo() { clearTimeout(tAuto); tAuto = setTimeout(function () { if (auto) mostraH(hi + 1); }, CICLO); }
  function para() { if (!auto) return; auto = false; clearTimeout(tAuto); H.classList.add('parado'); }
  H.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && auto) { clearTimeout(tAuto); H.classList.add('pausa'); } });
  H.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && auto) { H.classList.remove('pausa', 'corre'); void H.offsetWidth; H.classList.add('corre'); ciclo(); } });
  H.addEventListener('touchstart', para, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) {
    if (!es[0].isIntersecting) { clearTimeout(tAuto); H.classList.add('fora'); }
    else if (H.classList.contains('fora')) { H.classList.remove('fora'); if (auto) ciclo(); }
  }).observe(H);
  mostraH(0);
  requestAnimationFrame(function () { $('.hero').classList.add('on'); });

  addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) fechaLb();
    $$('.modal').forEach(function (m) { m.hidden = true; });
    if (!sac.hidden) fechaSac();
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
