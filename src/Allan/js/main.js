

function init(){



  //Carrega a lista de atributos
  //carregaAtri()

  //Preenche caixa DropDown com as Etapas
  preencDrop ()

  carregaDatas ()

  carregaAtri()

 // _token = '11748~KMkhyKZmmpxczIIaViCererBxWNW4uWPC1wOxhsgelK5RPcpHSRjsnvgMs3BvdgL'

 
   
}
/*
const token = "11748~KMkhyKZmmpxczIIaViCererBxWNW4uWPC1wOxhsgelK5RPcpHSRjsnvgMs3BvdgL"
    const res = fetch( 'https://pucminas.instructure.com/api/v1/courses/48974/modules/222399/items',
    {
        method: "get",
        headers: {
           //Content-type: 'application/json',
           Authorization: `Bearer ${token}`
       },
    })
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("dados").innerHTML = data;
        console.log(data)
    })
    .catch((error) => console.log(error.message))
*/

var req = new XMLHttpRequest();
        var url = 'https://randomuser.me/api/?results=10';

        function processaDados() {
            var dados = JSON.parse (req.responseText);
            var saida = '';
            for (i = 0; i < dados.results.length; i++) {
                saida += `<div class="box-cliente">
                <img src="${dados.results[i].picture.medium}" alt="">
                <p>${dados.results[i].name.first} ${dados.results[i].name.first} </p>
                <p>Fone: ${dados.results[i].phone}</p>
                <p>${dados.results[i].location.city} - ${dados.results[i].location.state}</p>
                </div>`
            }
            document.getElementById('lista-clientes').innerHTML = saida;
        }

        function getData() {
            req.onload = processaDados;
            req.open('GET', url, true);
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



