

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

*/









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



