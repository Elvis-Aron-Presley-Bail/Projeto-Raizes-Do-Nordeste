const carrinho = JSON.parse(localStorage.getItem("carrinhoRaizes")) || [];
const unidade = localStorage.getItem("unidadeRaizes") || "";
const total = localStorage.getItem("totalRaizes") || "0.00";

const listaItensResumo = document.querySelector("#listaItensResumo");
const subtotalResumo = document.querySelector("#subtotalResumo");
const linhaDesconto = document.querySelector("#linhaDesconto");
const descontoResumo = document.querySelector("#descontoResumo");
const totalResumo = document.querySelector("#totalResumo");
const unidadeSelecionadaText = document.querySelector("#unidadeSelecionadaText");

const nomesUnidades = {
    pinheirinho: "Unidade Pinheirinho",
    capaoRaso: "Unidade Capão Raso",
    sitioCercado: "Unidade Sítio Cercado"
};



let cuponsDisponiveis = parseInt(localStorage.getItem("cuponsDisponiveisRaizes")) || 0;
let valorDescontoAplicado = 0;
let valorFinalPedido = parseFloat(total);
let usouCupom = false;

function carregarResumo() {
    if (unidade) {
        unidadeSelecionadaText.innerText = `Unidade: ${nomesUnidades[unidade]}`;
    }

    let htmlItens = "";
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        htmlItens += `
            <div class="itemResumoLinha">
                <span>${item.nome} (x${item.quantidade})</span>
                <span>R$ ${subtotal.toFixed(2)}</span>
            </div>
        `;
    });

    listaItensResumo.innerHTML = htmlItens;

    const valorSubtotal = parseFloat(total);
    subtotalResumo.innerText = valorSubtotal.toFixed(2);

    if (cuponsDisponiveis > 0) {
        valorDescontoAplicado = valorSubtotal * 0.10;
        valorFinalPedido = valorSubtotal - valorDescontoAplicado;
        usouCupom = true;

        descontoResumo.innerText = valorDescontoAplicado.toFixed(2);
        linhaDesconto.classList.remove("escondido");
    } else {
        valorDescontoAplicado = 0;
        valorFinalPedido = valorSubtotal;
        usouCupom = false;
        linhaDesconto.classList.add("escondido");
    }

    totalResumo.innerText = valorFinalPedido.toFixed(2);
}

function voltar() {
    location.href = 'home.html';
}

function alternarEntrega(metodo) {
    const secaoEndereco = document.querySelector("#secaoEndereco");
    if (metodo === "retirada") {
        secaoEndereco.classList.add("escondido");
    } else {
        secaoEndereco.classList.remove("escondido");
    }
}

function alternarMetodoPagamento(metodo) {
    const secaoPix = document.querySelector("#secaoPix");
    const secaoCartao = document.querySelector("#secaoCartao");
    const secaoTroco = document.querySelector("#secaoTroco");

    secaoPix.classList.add("escondido");
    secaoCartao.classList.add("escondido");
    secaoTroco.classList.add("escondido");

    if (metodo === "pix") {
        secaoPix.classList.remove("escondido");
    } else if (metodo === "cartaoDebito" || metodo === "cartaoCredito") {
        secaoCartao.classList.remove("escondido");
    } else if (metodo === "dinheiro") {
        secaoTroco.classList.remove("escondido");
    }
}

function iniciarAcompanhamento(metodoEntrega, novosCuponsGanhos) {
    const modal = document.querySelector("#modalAcompanhamento");
    const passo1 = document.querySelector("#passo1");
    const passo2 = document.querySelector("#passo2");
    const passo3 = document.querySelector("#passo3");
    const textoPasso2 = document.querySelector("#textoPasso2");
    const textoPasso3 = document.querySelector("#textoPasso3");
    const btnFechar = document.querySelector("#btnFecharModal");
    const infoFidelidade = document.querySelector("#infoFidelidadeAcumulado");

    if (metodoEntrega === "retirada") {
        textoPasso2.innerText = "Pronto para retirada!";
        passo2.querySelector(".icone-passo").innerText = "🛍️";
        textoPasso3.innerText = "Pedido retirado com sucesso!";
    } else {
        textoPasso2.innerText = "Saiu para entrega...";
        passo2.querySelector(".icone-passo").innerText = "🛵";
        textoPasso3.innerText = "Pedido chegou! Bom apetite!";
    }

    if (novosCuponsGanhos > 0) {
        infoFidelidade.innerHTML = `🎉 Parabéns! Esta compra gerou <strong>${novosCuponsGanhos} cupom(ns) de 10% de desconto</strong> para o seu próximo pedido!`;
        infoFidelidade.classList.remove("escondido");
    } else {
        infoFidelidade.classList.add("escondido");
    }

    modal.classList.remove("escondido");
    passo1.classList.add("ativo");
    passo2.classList.remove("ativo");
    passo3.classList.remove("ativo");
    btnFechar.classList.add("escondido");

    setTimeout(() => {
        passo1.classList.remove("ativo");
        passo2.classList.add("ativo");
    }, 3500);

    setTimeout(() => {
        passo2.classList.remove("ativo");
        passo3.classList.add("ativo");
        btnFechar.classList.remove("escondido");
    }, 7000);
}

function fecharStatusPedido() {
    document.querySelector("#modalAcompanhamento").classList.add("escondido");
    
    localStorage.removeItem("carrinhoRaizes");
    localStorage.removeItem("totalRaizes");
    
    location.href = "home.html";
}

function confirmarPedido() {
    const metodoEntrega = document.querySelector("#metodoEntrega").value;
    const metodoPagamento = document.querySelector("#metodoPagamento").value;
    const alerta = document.querySelector("#alertaPagamento");
    const textoAlerta = document.querySelector("#alertaPagamento p");

    if (metodoEntrega === "entrega") {
        const nome = document.querySelector("#nomeCliente").value.trim();
        const rua = document.querySelector("#rua").value.trim();
        const numero = document.querySelector("#numeroCasa").value.trim();

        if (nome === "" || rua === "" || numero === "") {
            textoAlerta.innerText = "Por favor, preencha Nome, Rua e Número para a entrega.";
            alerta.style.display = 'block';
            setTimeout(() => { alerta.style.display = 'none'; }, 4000);
            return;
        }
    }
    

    if (metodoPagamento === "cartaoDebito" || metodoPagamento === "cartaoCredito") {
        const numCartao = document.querySelector("#numeroCartao").value.trim();
        const nomeCartao = document.querySelector("#nomeCartao").value.trim();
        const validade = document.querySelector("#validadeCartao").value.trim();
        const cvv = document.querySelector("#cvvCartao").value.trim();

        if (numCartao === "" || nomeCartao === "" || validade === "" || cvv === "") {
            textoAlerta.innerText = "Por favor, preencha todos os dados do cartão de pagamento.";
            alerta.style.display = 'block';
            setTimeout(() => { alerta.style.display = 'none'; }, 4000);
            return;
        }
    }

    if (metodoPagamento === "dinheiro") {
        const troco = document.querySelector("#trocoPara").value.trim();
        if (troco === "") {
            textoAlerta.innerText = "Informe se precisa de troco ou digite 'Não preciso'.";
            alerta.style.display = 'block';
            setTimeout(() => { alerta.style.display = 'none'; }, 4000);
            return;
        }
    }

    const valorSubtotal = parseFloat(total);
    
    let saldoCuponsRestante = cuponsDisponiveis;
    if (usouCupom) {
        saldoCuponsRestante = cuponsDisponiveis - 1;
    }

    const novosCuponsGanhos = Math.floor(valorSubtotal / 100);
    const novoSaldoCupons = saldoCuponsRestante + novosCuponsGanhos;

    localStorage.setItem("cuponsDisponiveisRaizes", novoSaldoCupons);

    const dadosPedido = {
        carrinho: carrinho,
        unidade: nomesUnidades[unidade],
        subtotal: valorSubtotal.toFixed(2),
        descontoAplicado: valorDescontoAplicado.toFixed(2),
        totalPago: valorFinalPedido.toFixed(2),
        entrega: metodoEntrega,
        pagamento: metodoPagamento,
        nome: metodoEntrega === "entrega" ? document.querySelector("#nomeCliente").value : "Retirada em Loja",
        endereco: metodoEntrega === "entrega" ? `${document.querySelector("#rua").value}, Nº ${document.querySelector("#numeroCasa").value}` : "N/A",
        dadosCartao: (metodoPagamento === "cartaoDebito" || metodoPagamento === "cartaoCredito") ? {
            titular: document.querySelector("#nomeCartao").value,
            finalCartao: document.querySelector("#numeroCartao").value.slice(-4)
        } : "N/A",
        troco: metodoPagamento === "dinheiro" ? document.querySelector("#trocoPara").value : "Não necessário"
    };

    localStorage.setItem("dadosPedidoFinalizado", JSON.stringify(dadosPedido));
    iniciarAcompanhamento(metodoEntrega, novosCuponsGanhos);
}

carregarResumo();