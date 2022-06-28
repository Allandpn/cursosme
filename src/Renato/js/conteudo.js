


/* Abrir DIV coluna 2 */

document.getElementById("materia").addEventListener("click", openEtp);

function openEtp() {
const elemento2 = document.querySelector(".coluna2");
const elemento3 = document.querySelector(".coluna3");
const elemento4 = document.querySelector(".coluna4");
const elemento5 = document.querySelector(".coluna5");
const grupoA = document.querySelector(".grupoA");




if(grupoA.classList.contains("show")) {

    
    elemento2.classList.remove('show');
    elemento3.classList.remove('show');
    elemento4.classList.remove('show');
    elemento5.classList.remove('show');
        
    
} else {

   
elemento2.classList.toggle('show');



}
}



/* Abrir DIV coluna 3 */

document.getElementById("etapa").addEventListener("click", openMic);

function openMic() {
    
    const elemento3 = document.querySelector(".coluna3");
    const elemento4 = document.querySelector(".coluna4");
    const elemento5 = document.querySelector(".coluna5");
    const grupoB = document.querySelector(".grupoB");
    
    if(grupoB.classList.contains("show")) {
    
        
        
        elemento3.classList.remove('show');
        elemento4.classList.remove('show');
        elemento5.classList.remove('show');
            
    
    } else {


elemento3.classList.toggle('show');

}
}


/* Abrir DIV coluna 4 */

document.getElementById("microfundamento").addEventListener("click", openTem);

function openTem() {

    
    const elemento4 = document.querySelector(".coluna4");
    const elemento5 = document.querySelector(".coluna5");
    const grupoC = document.querySelector(".grupoC");
    
    if(grupoC.classList.contains("show")) {
    
        
        elemento4.classList.remove('show');
        elemento5.classList.remove('show');
            
    
    } else {

elemento4.classList.toggle('show');
}
}



/* Abrir DIV coluna 5 */

document.getElementById("tema").addEventListener("click", openAul);

function openAul() {
const elemento = document.querySelector(".coluna5");
elemento.classList.toggle('show');
}




/* Altera cor do elemento clicado */

var descendentes = document.querySelectorAll("#microfundamento li");
for (var i = 0; i < descendentes.length; i++) {
    descendentes[i].addEventListener("click", function (e) {

        
     
    alert('O elemento clicado foi o ' + this.innerHTML);
        
    const id = descendentes.id;

    console.log (id);

    }
    
    )
    
}

