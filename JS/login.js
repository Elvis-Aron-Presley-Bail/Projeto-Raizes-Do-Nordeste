function acessar() {
    let email = document.querySelector("#email").value;
    let senha = document.querySelector("#senha").value;
    let aceiteLgpd = document.querySelector("#aceiteLgpd").checked;
    let alerta = document.querySelector(".alerta");
    let textoAlerta = document.querySelector(".alerta p");

    if (!aceiteLgpd) {
        textoAlerta.innerText = "Você deve aceitar o tratamento de dados pessoais (LGPD) para prosseguir.";
        alerta.style.display = 'block';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3500);
        return;
    }

    if(email == 'teste123@gmail.com' && senha == 'Senha123') {
        location.href = 'home.html';
    } else {
        textoAlerta.innerText = "Usuário não encontrado ou senha incorreta.";
        alerta.style.display = 'block';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);
    }
}

function alternarVisibilidadeSenha(idInput) {
    const campo = document.querySelector(`#${idInput}`);
    const icone = campo.nextElementSibling;

    if (campo.type === "password") {
        campo.type = "text";
        icone.innerText = "☀️"; 
    } else {
        campo.type = "password";
        icone.innerText = "🌑";
    }
}

function alternarFormularios() {
    let formLogin = document.querySelector("#formLogin");
    let formCadastro = document.querySelector("#formCadastro");
    let alerta = document.querySelector(".alerta");

    alerta.style.display = 'none';

    if (formLogin.classList.contains("escondido")) {
        formLogin.classList.remove("escondido");
        formCadastro.classList.add("escondido");
    } else {
        formLogin.classList.add("escondido");
        formCadastro.classList.remove("escondido");
    }
}

function criarConta() {
    let nome = document.querySelector("#cadNome").value;
    let email = document.querySelector("#cadEmail").value;
    let senha = document.querySelector("#cadSenha").value;
    let alerta = document.querySelector(".alerta");
    let textoAlerta = document.querySelector(".alerta p");

    if (nome == '' || email == '' || senha == '') {
        textoAlerta.innerText = "Preencha todos os campos!";
        alerta.style.display = 'block';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);
    } else {
        document.querySelector("#cadNome").value = '';
        document.querySelector("#cadEmail").value = '';
        document.querySelector("#cadSenha").value = '';
        
        alternarFormularios();
    }
}