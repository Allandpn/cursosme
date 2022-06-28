




/* Abri janela Recentes e ativa evento de escuta (click) */

const openRec = () => {

  let transp = document.querySelector(".transparencia");
  let mySiderec = document.getElementById("mySiderec");
  let dash = document.getElementById("dash");
  let mySidefav = document.getElementById("mySidefav");

 

  if (mySiderec.style.width > "0px") {

    document.getElementById("mySiderec").style.width = "0"

  } else {




    mySiderec.style.left = "84px";
    mySiderec.style.width = "250px";



    setTimeout(() => { document.addEventListener('click', handleCloseRec, false) }, 200);
  }
}


/* Fecha janela Recentes e remove evento escuta (click) e  */

const handleCloseRec = (event) => {

  let mySiderec = document.getElementById("mySiderec");
  let dash = document.getElementById("dash");


  if (!mySiderec.contains(event.target)) {


    mySiderec.style.width = "0px";
    mySiderec.style.zIndex = 1;

    

    document.removeEventListener('click', handleCloseRec, false);
  }
}

/* Fecha janlea Recentes - botão &times; */

function closeRec() {
  document.getElementById("mySiderec").style.width = "0";

  document.removeEventListener('click', handleCloseRec, false);

}




/* Abri janela Favoritos e ativa evento de escuta (click) */

const openFav = () => {

  let transp = document.getElementById("transparencia");
  let mySidefav = document.getElementById("mySidefav");
  let mySiderec = document.getElementById("mySiderec");

  

  if (mySidefav.style.width > "0px") {

    document.getElementById("mySidefav").style.width = "0";


  } else {


    mySidefav.style.left = "84px";
    mySidefav.style.width = "250px";

    setTimeout(() => { document.addEventListener('click', handleCloseFav, false) }, 200);
  }
}



/* Fecha janela Favoritos e remove evento escuta (click) e  */

const handleCloseFav = (event) => {

  let mySidefav = document.getElementById("mySidefav");
  if (!mySidefav.contains(event.target)) {


    mySidefav.style.width = "0px";
    mySiderec.style.zIndex = 1;



    document.removeEventListener('click', handleCloseFav, false);

  }
}


/* Fechar janela de Favoritos - botão &times; */

function closeFav() {
  document.getElementById("mySidefav").style.width = "0";
  document.getElementById("transparencia").style.width = "0%"

  document.removeEventListener('click', handleCloseFav, false);
}


/* Abrir janela de Ajuda e ativar evento de escuta (click) */

const openAju = () => {

  let transp = document.getElementById("transparencia");
  let mySideaju = document.getElementById("mySideaju");
 
  

  if (mySideaju.style.width > "0px") {

    document.getElementById("mySideaju").style.width = "0";


  } else {


    mySideaju.style.left = "84px";
    mySideaju.style.width = "250px";

    setTimeout(() => { document.addEventListener('click', handleCloseaju, false) }, 200);
  }
}

/* Fecha janela Ajuda e remove evento escuta (click) e  */

const handleCloseAju = (event) => {

  let mySideaju = document.getElementById("mySideaju");
  if (!mySideaju.contains(event.target)) {


    mySideaju.style.width = "0px";
    mySiderec.style.zIndex = 1;



    document.removeEventListener('click', handleCloseAju, false);

  }
}

/* Fechar janela de Ajuda  */

function closeAju() {
  document.getElementById("mySideaju").style.width = "0";
  document.getElementById("transparencia").style.width = "0%"

  document.removeEventListener('click', handleCloseaju, false);
}

/* Fechar janela de Ajuda - botão &times; */

function closeAju() {
  document.getElementById("mySideaju").style.width = "0";
  document.getElementById("transparencia").style.width = "0%"

  document.removeEventListener('click', handleCloseAju, false);
}
/* Abrir janela About e ativa evento de escuta (click) */

const openAbo = () => {

  let transp = document.getElementById("transparencia");
    
  let mySideabo = document.getElementById("mySideabo");
  let mySiderec = document.getElementById("mySiderec");
  let dash = document.getElementById("dash");
  let mySidefav = document.getElementById("mySideaju");

  

  

  if (mySideabo.style.width > "0px") {

    document.getElementById("mySideabo").style.width = "0";


  } else {


    mySideabo.style.left = "84px";
    mySideabo.style.width = "250px";

    setTimeout(() => { document.addEventListener('click', handleClosebo, false) }, 200);
  }
}



/* Fecha janela About e remove evento escuta (click) e  */

const handleCloseAbo = (event) => {

  let mySideabo = document.getElementById("mySideabo");
  
  if (!mySideabo.contains(event.target)) {


    mySideabo.style.width = "0px";
    mySiderec.style.zIndex = 3;



    document.removeEventListener('click', handleCloseAbo, false);

  }
}

/* Fechar janela de About - botão &times; */

function closeAbo() {
  document.getElementById("mySideabo").style.width = "0";
  document.getElementById("transparencia").style.width = "0%"

  document.removeEventListener('click', handleCloseAbo, false);
}


/* Abri janela Conta e ativa evento de escuta (click) */

const openCon = () => {

  let transp = document.getElementById("transparencia");
  let mySidecon = document.getElementById("mySidecon");
  let mySiderec = document.getElementById("mySiderec");

  

  if (mySidecon.style.width > "0px") {

    document.getElementById("mySidecon").style.width = "0";


  } else {


    mySidecon.style.left = "84px";
    mySidecon.style.width = "250px";

    setTimeout(() => { document.addEventListener('click', handleClosecon, false) }, 200);
  }
}



/* Fecha janela Conta e remove evento escuta (click) e  */

const handleCloseCon = (event) => {

  let mySidecon = document.getElementById("mySidecon");
  if (!mySidecon.contains(event.target)) {


    mySidecon.style.width = "0px";
    mySiderec.style.zIndex = 1;



    document.removeEventListener('click', handleCloseFav, false);

  }
}


/* Fechar janela de Conta - botão &times; */

function closeCon() {
  document.getElementById("mySidecon").style.width = "0";
  document.getElementById("transparencia").style.width = "0%"

  document.removeEventListener('click', handleClosecon, false);
}

