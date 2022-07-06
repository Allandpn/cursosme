

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

  
  let mySidefav = document.getElementById("mySidefav");
  let mySiderec = document.getElementById("mySiderec");

  

  if (mySidefav.style.width > "0px") {

    document.getElementById("mySidefav").style.width = "0";


  } else {


    mySidefav.style.left = "84px";
    mySidefav.style.width = "250px";

    setTimeout(() => { document.addEventListener('click', handleCloseFav, false) }, 200);
  }

  try{
  list_fav = JSON.parse(localStorage.getItem('lista_fav'))
  _list_fav = ""
 

  for (i = 0; i < list_fav.length; i++) {   
        _list_fav += `<a class="link_fav" href="${list_fav[i].link}" target="_blank">${list_fav[i].nome}</a>`    
}

$('#myafav').html(_list_fav)

  } catch{}

  
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
 

  document.removeEventListener('click', handleCloseFav, false);
}



function eraseFav(){

let list = document.getElementById('myafav')

console.log(list)

if(list.parentNode){
  list.parentNode.removeChild(list)
}

star = document.querySelectorAll('.fa-star-o')
star.forEach(element => {
  element.classList.replace("fa-star", "fa-star-o")
});

  localStorage.removeItem('lista_fav')

}

