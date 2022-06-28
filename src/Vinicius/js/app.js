

// quando queremos exigir que um form seja preenchido, podemos utilizar o atributo required na própria tag <input> do html

const email = document.getElementById('email');
const senha = document.getElementById('senha');
const form = document.getElementById('form');
const errorElement = document.getElementById('erro');
const logo = document.getElementById('logo');


form.addEventListener('submit', (event) => {
    let messages = [];
    console.log(event);
    
    if (email.value === '' || email.value == null ) {
        messages.push('Digite um e-mail válido');
    }

    if (senha.value === '' || senha.value == null ) {
        messages.push('Digite uma senha válida');
    }

    // if (senha.value.lenght <= 6) {
    //     messages.push('A senha tem de ter 6 ou mais caracteres');
    // }

        // if (senha.value.lenght > 20) {
    //     messages.push('A senha tem de ter menos de 20 caracteres');
    // }


    if (messages.length > 0) {
        event.preventDefault(); // previne que a página faça um submit, para que chequemos eventuais erros
        errorElement.innerText = messages.join(', ');
    }

}

);



logo.addEventListener('click', (e) => {
    console.log('click');
} )



// let logoBig = document.getElementById('logoBig');
// let screenWidth = window.matchMedia("(max-width: 640px)");

// function removerLogoBig(screenWidth) {
//     if (screenWidth.matches) { 
//         logoBig.remove();
//         console.log('a função está rodando');
//     } else {
//         document.createElement(logoBig);
//     }
// };

// removerLogoBig(screenWidth); 
// screenWidth.addListener(removerLogoBig); 


// scroll automático

window.onbeforeunload = function () {
    window.scrollTo(0,0);
};