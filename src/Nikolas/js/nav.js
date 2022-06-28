

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


/* Fecha janlea Favoritos - botão &times; */

function closeFav() {
  document.getElementById("mySidefav").style.width = "0";
  document.getElementById("transparencia").style.width = "0%"

  document.removeEventListener('click', handleCloseFav, false);
}





