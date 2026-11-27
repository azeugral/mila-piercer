# Mila | Body Piercing Piracicaba (prévia LRGZ)

Prévia em https://azeugral.github.io/mila-piercer/ (noindex). Feita a partir do Instagram @mila.piercerr em 27/11/2026.

- **Hero (v2, 27/11):** vitrine detalhada da loja Nuvemshop. 6 joias em destaque (produtos com a tag "destaque") trocam sozinhas a cada 5,5 s até a pessoa mexer; cada uma com foto grande reescalada + close de detalhe, preço, parcelas, variação, estoque, quantidade, "Adicionar à sacola" e ficha (material, indicação, garantia, entrega). v3 (27/11): site em 100% da largura. Hero começa direto na vitrine (lista | foto de ponta a ponta | ficha de compra); logo depois a história dela com o agendamento na mesma seção (foto fixa à esquerda); depois todas as joias, perfurações, cuidados, dúvidas (2 colunas) e estúdio (mapa de ponta a ponta).
- **Loja:** simulação de integração com a Nuvemshop. Os dados ficam em `js/loja.js`, no formato da API de produtos (variantes, estoque, preço). Tem vitrine com filtros, "Sem estoque" + "Avise-me" pelo WhatsApp, "Últimas unidades", variação prata/dourado e 14K/18K sob encomenda, e "Comprar na loja", que abre a joia na loja da Nuvemshop já na variação escolhida (`store.url` em `js/loja.js`; vazio na prévia = mostra um aviso).
- **Escopo da integração (27/11, Daniel):** só LEITURA da Nuvemshop: catálogo, preços, estoque e disponibilidade. Sem sacola, frete ou checkout no site; tudo isso fica na loja dela.
- **Formulário:** "Agendar perfuração" envia para wa.me/5519982014669.

## CONFIRMAR
- Catálogo, preços e estoque reais da loja. Os de hoje são ilustrativos, tirados das fotos das joias do perfil.
- Parcelamento (4x sem juros?): a simulação usa valor de exemplo.
- Endereço da loja Nuvemshop dela (para `store.url`).
- Se a loja vende só para perfuração cicatrizada (texto atual) e se faz envio.
- Horários de atendimento.
- Nome no site: "Mila", "Mila Piercer" ou "Mila Piercing".
- Quais joias ficam em destaque no topo e o "Indicada para" de cada uma.
- Uso das fotos de clientes (todas já publicadas no perfil dela).

## v4 (27/11)
- Hero enxuto: título + "Comprar na loja" / "Agendar perfuração" à esquerda, foto emoldurada no centro passando 12 joias a cada 2,4 s (pausa com o mouse em cima), nome + preço + "Comprar esta joia" (abre a joia) à direita.
- História + agendamento logo acima de Dúvidas, com o retrato da pinça (post 001, fundo limpo).
- Todas as fotos com moldura (passe-partout branco + filete dourado).
