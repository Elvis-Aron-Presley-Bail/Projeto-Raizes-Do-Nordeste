function sair() {
    location.href = 'login.html'
}

const cardapiosPorUnidade = {
    pinheirinho: [
        {
          categoria: "comida",
          nome: "Baião de Dois",
          descricao: "Arroz e feijão-verde preparados com queijo coalho e manteiga de garrafa.",
          preco: 28.9
        },
        {
          categoria: "comida",
          nome: "Carne de Sol com Macaxeira",
          descricao: "Carne de sol grelhada acompanhada de macaxeira cozida.",
          preco: 39.9
        },
        {
          categoria: "comida",
          nome: "Moqueca Baiana",
          descricao: "Peixe cozido com leite de coco, dendê e temperos regionais.",
          preco: 45.9
        },
        {
          categoria: "bebida",
          nome: "Suco de Cajá",
          descricao: "Suco natural de cajá servido gelado.",
          preco: 8.9
        },
        {
          categoria: "bebida",
          nome: "Suco de Umbu",
          descricao: "Bebida refrescante feita com a fruta típica do sertão.",
          preco: 9.9
        },
        {
          categoria: "bebida",
          nome: "Água de Coco",
          descricao: "Água de coco natural servida gelada.",
          preco: 7.9
        },
        {
          categoria: "sobremesa",
          nome: "Cartola",
          descricao: "Banana frita com queijo coalho, açúcar e canela.",
          preco: 14.9
        },
        {
          categoria: "sobremesa",
          nome: "Cocada",
          descricao: "Doce tradicional de coco ralado.",
          preco: 9.9
        },
        {
          categoria: "sobremesa",
          nome: "Pudim de Tapioca",
          descricao: "Pudim cremoso preparado com tapioca e leite de coco.",
          preco: 12.9
        }
    ],
    capaoRaso: [
        {
          categoria: "comida",
          nome: "Acarajé",
          descricao: "Bolinho de feijão-fradinho frito no dendê, recheado com vatapá e caruru.",
          preco: 22.0
        },
        {
          categoria: "comida",
          nome: "Sarapatel",
          descricao: "Guisado tradicional preparado com miúdos de porco e temperos fortes.",
          preco: 34.9
        },
        {
          categoria: "comida",
          nome: "Escondidinho de Carne de Sol",
          descricao: "Purê de macaxeira gratinado recheado com carne de sol desfiada.",
          preco: 36.5
        },
        {
          categoria: "bebida",
          nome: "Refrigerante Cajuína",
          descricao: "Bebida típica do Piauí feita à base de suco de caju.",
          preco: 7.5
        },
        {
          categoria: "bebida",
          nome: "Suco de Graviola",
          descricao: "Suco natural e cremoso da fruta da graviola.",
          preco: 9.5
        },
        {
          categoria: "bebida",
          nome: "Suco de Acerola",
          descricao: "Suco natural rico em vitamina C feito com acerolas frescas.",
          preco: 8.0
        },
        {
          categoria: "sobremesa",
          nome: "Bolo de Rolo",
          descricao: "Fatia de bolo fino enrolado com camadas de goiabada.",
          preco: 12.0
        },
        {
          categoria: "sobremesa",
          nome: "Rapadura",
          descricao: "Porção de doce artesanal de cana-de-açúcar.",
          preco: 6.0
        },
        {
          categoria: "sobremesa",
          nome: "Mousse de Maracujá",
          descricao: "Mousse cremosa feita com a polpa natural de maracujá.",
          preco: 10.0
        }
    ],
    sitioCercado: [
        {
          categoria: "comida",
          nome: "Rubacão",
          descricao: "Variação do baião de dois, mais cremoso, com nata e queijo de coalho.",
          preco: 32.0
        },
        {
          categoria: "comida",
          nome: "Galinha Caipira com Quiabo",
          descricao: "Pedaços de galinha cozidos lentamente com quiabo fresco e temperos.",
          preco: 38.0
        },
        {
          categoria: "comida",
          nome: "Buchada de Bode",
          descricao: "Prato tradicional feito com miúdos cozidos no bucho do animal.",
          preco: 48.0
        },
        {
          categoria: "bebida",
          nome: "Suco de Seriguela",
          descricao: "Suco feito com a fruta seriguela colhida fresca.",
          preco: 9.0
        },
        {
          categoria: "bebida",
          nome: "Caldo de Cana",
          descricao: "Garapa natural de cana-de-açúcar moída na hora.",
          preco: 8.5
        },
        {
          categoria: "bebida",
          nome: "Suco de Mangaba",
          descricao: "Suco aromático e característico da fruta do cerrado e sertão.",
          preco: 9.5
        },
        {
          categoria: "sobremesa",
          nome: "Doce de Mamão com Coco",
          descricao: "Doce caseiro de mamão ralado com flocos de coco.",
          preco: 11.0
        },
        {
          categoria: "sobremesa",
          nome: "Queijo Coalho com Mel",
          descricao: "Espeto de queijo coalho grelhado servido com mel de engenho.",
          preco: 13.5
        },
        {
          categoria: "sobremesa",
          nome: "Sorvete de Tapioca",
          descricao: "Sorvete artesanal cremoso feito com grãos de tapioca.",
          preco: 11.5
        }
    ]
};

const itensCardapio = document.getElementById("itensCardapio");
const itensCarrinho = document.getElementById("itensCarrinho");
const valorTotal = document.getElementById("valorTotal");
const opcoesUnidade = document.getElementById("opcoes");

let carrinho = [];

function renderizarCardapio(unidade) {
  const cardapioAtivo = cardapiosPorUnidade[unidade];
  let cadaItem = "";

  cardapioAtivo.forEach((item, index) => {
    cadaItem += `
      <div class="caixaItem">
        <h3>${item.nome}</h3>
        <p><strong>Categoria:</strong> ${item.categoria}</p>
        <p>${item.descricao}</p>
        <p><strong>Preço:</strong> R$ ${item.preco.toFixed(2)}</p>
        <button class="btnAdicionar" onclick="adicionarAoCarrinho('${unidade}', ${index})">Adicionar</button>
      </div>
    `;
  });

  itensCardapio.innerHTML = cadaItem;
}

function adicionarAoCarrinho(unidade, index) {
  const itemSelecionado = cardapiosPorUnidade[unidade][index];
  const itemExistente = carrinho.find(item => item.nome === itemSelecionado.nome);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      nome: itemSelecionado.nome,
      preco: itemSelecionado.preco,
      quantidade: 1
    });
  }

  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  const item = carrinho[index];
  
  if (item.quantidade > 1) {
    item.quantidade -= 1;
  } else {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  let htmlCarrinho = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    htmlCarrinho += `
      <div class="itemCarrinhoLinha">
        <span><strong>${item.nome}</strong> (x${item.quantidade})</span>
        <span>R$ ${subtotal.toFixed(2)}</span>
        <button class="btnRemover" onclick="removerDoCarrinho(${index})">Remover</button>
      </div>
    `;
  });

  itensCarrinho.innerHTML = htmlCarrinho;
  valorTotal.innerText = total.toFixed(2);
}

opcoesUnidade.addEventListener("change", function() {
  carrinho = [];
  atualizarCarrinho();
  renderizarCardapio(this.value);
});

renderizarCardapio(opcoesUnidade.value);