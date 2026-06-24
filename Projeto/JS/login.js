function acessar() {
    let email = document.querySelector("#email").value 
    let senha = document.querySelector("#senha").value
    let alerta = document.querySelector(".alerta")

    if(email == 'teste123@gmail.com' && senha == 'Senha123') {
        location.href = 'home.html'
    } else {
        alerta.style.display = 'block'
        setTimeout(() => {
            alerta.style.display = 'none'
        }, 3000);
    }
}