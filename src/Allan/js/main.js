

function init(){



  //Carrega a lista de atributos
  //carregaAtri()

  //Preenche caixa DropDown com as Etapas
  preencDrop ()

  carregaDatas ()

  carregaAtri()

 // _token = '11748~KMkhyKZmmpxczIIaViCererBxWNW4uWPC1wOxhsgelK5RPcpHSRjsnvgMs3BvdgL'

 
   
}




var puc = new XMLHttpRequest();
    var urlPuc = 'https://pucminas.instructure.com/api/v1/users/189649/courses';

    function pucDados() {
        var dadosPuc = JSON.parse (puc.responseText);
        var saida1 = '';
        for (i = 0; i < dadosPuc.length; i++) {
            saida1 += `<div class="lista-puc">
            <p>${dadosPuc[i].name}</p>
            <p>Fone: ${dadosPuc.results[i].course_code}</p>
            
            </div>`
        }
        document.getElementById('lista-puc').innerHTML = saida1;
    }

    function getPuc() {


      console.log(window.fetch);
        fetch('https://pucminas.instructure.com/api/v1/users/189649/courses', { 
         method: 'GET',        
         headers: {
                 Authorization: `Bearer ${'11748~KMkhyKZmmpxczIIaViCererBxWNW4uWPC1wOxhsgelK5RPcpHSRjsnvgMs3BvdgL'}`}})     
     
           



        req.onload = pucDados;
        req.open('GET', urlPuc, true);
        req.send();
    } 



















let savedTheme = localStorage.getItem("theme");
let saveTheme = document.getElementById("save-theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  saveTheme.checked = true;
} else {
  let browserTheme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "dark"
    : "light";
  document.documentElement.setAttribute("data-theme", browserTheme);
}

saveTheme.addEventListener("change", (evt) => {
  if (evt.target.checked) {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    localStorage.setItem("theme", currentTheme);
  } else {
    localStorage.removeItem("theme");
  }
});

let themeToggler = document.getElementById("theme-toggler");
themeToggler.addEventListener("click", () => {
  let targetTheme;
  let currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    targetTheme = "dark";
  } else {
    targetTheme = "light";
  }
  if (saveTheme.checked) {
    localStorage.setItem("theme", targetTheme);
  }
  document.documentElement.setAttribute("data-theme", targetTheme);
});



