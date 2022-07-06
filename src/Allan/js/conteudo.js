
//montagem do curso em ordem cronologica
var db_curso_ord = JSON.parse(localStorage.getItem('db_curso'))

var db_id_unid = JSON.parse(localStorage.getItem('db_idUnids'))

console.log(db_id_unid)

const tema_cadst = []



for(i=0; i<db_curso_ord.length; i++){
    for(y=0; y<db_id_unid.length; y++){
        if(db_curso_ord[i].idUnid == db_id_unid[y].idUnid){
            db_curso_ord[i].status = db_id_unid[y].status
        }
    }
}



//listarEtapas(db_curso_ord)










//----------------------------------------------------------\\
async function cadastoTemas(token, id) {



    for (i = 0; i < db_id_unid.length; i++) {

        var idcurso = db_id_unid[i].idCurso
        var idunid = db_id_unid[i].idUnid

        res = await fetch(`https://pucminas.instructure.com/api/v1/courses/${idcurso}/modules/${idunid}/items`,
            {
                method: "get",
                headers: {

                    "Authorization": `Bearer ${token}`
                },
            })

            .then((res) => res.json())
            .then((data) => {
//console.log(data)
               

                for (y = 0; y < data.length; y++) {

                    let _tema = {
                        module_id: data[y].module_id,
                        title: data[y].title,
                        html_url: data[y].html_url,
                        status: data[y].completion_requirement.completed
                    }                   
                    tema_cadst.push(_tema)
                }
                listarEtapas(token, id)
                // return tema_cadst
            })

            .catch((error) => console.log(error.message))
    }

}




//lista as etapas do curso
function listarEtapas(token, id) {

    //define lista que conterá as etapas
    var _etapasCurso = ""
    var _microCurso = ""
    var _unidTem




    // --------id do módulo deve ser alterado cada semestre---------------\\
    res = fetch(`https://pucminas.instructure.com/api/v1/courses/87896/modules`,
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {
        //   console.log(data)

            for (i = 0; i < data.length; i++) {
                if (data[i].name.includes("ETAPA")) {
                    _etapasCurso += `<li class="arv_etp_ind"><div>${data[i].name}<br><i class="fa fa-2xs fa-check ${data[i].state}"></i><br></div></li>`
                }
            }
            $('#cur_etapas').html(_etapasCurso)


            //cria evento para abrir a DIV Microfundamentos
            var criaEtapa = document.querySelectorAll("#etapa li");

            for (var i = 0; i < criaEtapa.length; i++) {
                criaEtapa[i].addEventListener("click", openMic);
            }


//console.log(db_curso_ord)
            $("#cur_etapas li").on("click", function (e) {

                db_curso_ord.forEach(element => {

                    if (element.unidade.substr(0, element.unidade.indexOf('-', 0)) == "") {
                        _nomeUnd = element.unidade
                    } else {
                        _nomeUnd = element.unidade.substr(0, element.unidade.indexOf('-', 0))
                    }

                    if ('ETAPA ' + element.etapa == e.target.innerHTML.substring(0, 7)) {
                    

                        _microCurso += `<li class="list_micro"><div class=" ${element.idUnid} ">${element.nome}<br>- ${_nomeUnd}<br><i class="fa fa-2xs fa-check ${element.status}"></i><br></div></li>`
                    }
                });
                $('#cur_microfundamento').html(_microCurso)


                _unidTem = _microCurso

                //limpa a variavel contendo as unidades
                _microCurso = ""
                listaTemasa(token)

                //cria evento para abrir a DIV Temas
                var criaMicro = document.querySelectorAll("#microfundamento li");

                for (var i = 0; i < criaMicro.length; i++) {
                    criaMicro[i].addEventListener("click", openTem)
                }

            })

        })

        .catch((error) => console.log(error.message))

}







function listaTemasa(token) {


  console.log( db_id_unid)


    var _temas = ''
    var _aulasM = []




    $("#cur_microfundamento li").on("click", function (e) {
        db_id_unid.forEach(element => {
           
            if (e.target.parentNode.innerHTML.includes(element.idUnid)) {
                var codUnid = element.idUnid
            }
       
            var cont = 1
            var contT = 0
            for (i = 0; i < tema_cadst.length; i++) {
                if (tema_cadst[i].module_id == codUnid) {
                    if (tema_cadst[i].title.includes("- Tema")) {
                        contT++
                    }
               
                    if (contT == 0) {
                      
                        _temas += `<li class="arv_mod_ind "><div><a href="${tema_cadst[i].html_url}" class="arv_link_ativ" target="_blank">${tema_cadst[i].title}</a><br><i class="fa fa-2xs fa-check ${tema_cadst[i].status}"></i></div></li>`
                    } else if (tema_cadst[i].title.includes("Tema " + cont)) {
                        _temas += `<li class="arv_tem_ind"><div>Tema ${cont}<br><i class="fa fa-2xs fa-check ${tema_cadst[i].status}"></i></div></li>`
                        cont++
                    } else if (!temasMicro[i].title.includes("Tema")) {
                        _temas += `<li><div><a href="${tema_cadst[i].html_url}" class="arv_link_ativ" target="_blank">${tema_cadst[i].title}</a><br><i class="fa fa-2xs fa-check ${tema_cadst[i].status}"></i></div></li>`

                    }




                    contMark = temasMicro[i].title.lastIndexOf('-')

                    _nome = temasMicro[i].title.substring(contMark + 2)


                    let aulasM = {
                        nome: tema_cadst[i].title,
                        url: tema_cadst[i].html_url,
                        status: tema_cadst[i].status
                    }


                    _aulasM.push(aulasM)
                }
            }

        })
        //    console.log(_temas)
        $('#cur_temas').html(_temas)


        //limpa a variavel contendo as unidades

        _temas = ""
        listaAulas(_aulasM)
        _aulasM = []
        var criaTema = document.querySelectorAll(".arv_tem_ind");

        for (var i = 0; i < criaTema.length; i++) {
            criaTema[i].addEventListener("click", openAul)
        }
    })
}


function listaAulas(aulas) {


    var _aulas = ''
    $(".arv_tem_ind").on("click", function (e) {

        aulas.forEach(element => {
           
            if (element.nome.includes(e.target.textContent)) {

                var cont = element.nome.lastIndexOf("-")
         
                _nomeUnd = element.nome.substr(element.nome.indexOf('-', cont)+1)


                _aulas += `<li class="arv_aul_ind "><div><a href="${element.url}" class="arv_link_ativ" target="_blank">${_nomeUnd}</a><br><i class="fa fa-2xs fa-check ${element.status}"></i><i class="fa fa-2xs "></i></div></li>`



            }
        });

        $('#arv_aulas').html(_aulas)

     
        //limpa a variavel contendo as unidades
        _aulas = ""
    })

}








//funcao para alterar visibilidade des elementos li

var criaMat = document.querySelectorAll("#materia li");
for (var i = 0; i < criaMat.length; i++) {
    criaMat[i].addEventListener("click", openEtp);
}

function openEtp() {



    const elemento2 = document.querySelector(".coluna2");
    const elemento3 = document.querySelector(".coluna3");
    const elemento4 = document.querySelector(".coluna4");
    const elemento5 = document.querySelector(".coluna5");
    const grupoA = document.querySelector(".grupoA");
    var remMat = document.querySelectorAll("#materia li");
    var remAll = document.querySelectorAll(".grupoA li");

    if (grupoA.classList.contains("show")) {


        elemento2.classList.remove('show');
        elemento3.classList.remove('show');
        elemento4.classList.remove('show');
        elemento5.classList.remove('show');

        for (var i = 0; i < remMat.length; i++) {
            if (remMat[i].classList.contains("select")) {
                remMat[i].classList.remove("select")
            }
        }

        for (var i = 0; i < remAll.length; i++) {
            if (remAll[i].classList.contains("select")) {
                remAll[i].classList.remove("select")
            }
        }



    }

    else {


        elemento2.classList.toggle('show');
        this.classList.add("select");

    }


}





/* Abrir DIV coluna 3 */

function openMic() {

    const elemento3 = document.querySelector(".coluna3");
    const elemento4 = document.querySelector(".coluna4");
    const elemento5 = document.querySelector(".coluna5");
    const grupoB = document.querySelector(".grupoB");
    var remEtapa = document.querySelectorAll(".grupoA li");

    if (grupoB.classList.contains("show")) {



        elemento3.classList.remove('show');
        elemento4.classList.remove('show');
        elemento5.classList.remove('show');

        for (var i = 0; i < remEtapa.length; i++) {
            if (remEtapa[i].classList.contains("select")) {
                remEtapa[i].classList.remove("select")
            }
        }



    } else {


        elemento3.classList.toggle('show');
        this.classList.add("select");



    }
}


/* Abrir DIV coluna 4 */

function openTem() {


    const elemento4 = document.querySelector(".coluna4");
    const elemento5 = document.querySelector(".coluna5");
    const grupoC = document.querySelector(".grupoC");
    var remMic = document.querySelectorAll(".grupoB li");

    if (grupoC.classList.contains("show")) {


        elemento4.classList.remove('show');
        elemento5.classList.remove('show');

        for (var i = 0; i < remMic.length; i++) {
            if (remMic[i].classList.contains("select")) {
                remMic[i].classList.remove("select")
            }
        }




    } else {

        elemento4.classList.toggle('show');
        this.classList.add("select");

    }
}



/* Abrir DIV coluna 5 */

function openAul() {
    const elemento5 = document.querySelector(".coluna5");
    var remTema = document.querySelectorAll("#tema li");

    if (elemento5.classList.contains("show")) {

        elemento5.classList.toggle('show');

        for (var i = 0; i < remTema.length; i++) {
            if (remTema[i].classList.contains("select")) {
                remTema[i].classList.remove("select")
            }
        }




    } else {

        elemento5.classList.toggle('show');
        this.classList.add("select");

    }
    //cria evento adicionar aos favoritos

    addFav()
}


//Cria evento Coluna 5 

var criaAula = document.querySelectorAll("#aula li");
for (var i = 0; i < criaAula.length; i++) {
    criaAula[i].addEventListener("click", addAula)
}

function addAula() {


}






















function addFav() {

    var list_inport = JSON.parse(localStorage.getItem('lista_fav'))

    if (!list_inport) {
        var list_inport = []
    }


    $(".addfav").on("click", function (e) {


        if (this.classList.contains("fa-star-o")) {
            this.classList.replace("fa-star-o", "fa-star");
            for (var i = 0; i < temasMicro.length; i++) {
                if (temasMicro[i].html_url == $(this).siblings('a').attr('href')) {
                    let favlist = {
                        nome: temasMicro[i].title,
                        link: `${$(this).siblings('a').attr('href')}`,
                        class: "fa-star-o"
                    }
                    list_inport.unshift(favlist)
                }
            }
            localStorage.setItem('lista_fav', JSON.stringify(list_inport))


        } else {

            this.classList.replace("fa-star", "fa-star-o");
            for (i = 0; i < list_inport.length; i++) {
                if (list_inport[i].link == `${$(this).siblings('a').attr('href')}`) {
                    list_inport.splice(i, 1)
                }
            }
            localStorage.setItem('lista_fav', JSON.stringify(list_inport))

        }



    })


}








/*
function addFav(){

    var favoritos = ''

    $(".addfav").on("click", function (e) {
        
        console.log(this.parentNode)
        if (this.classList.contains("fa-star-o")) {
            this.classList.replace("fa-star-o", "fa-star");
            for (var i = 0; i < temasMicro.length; i++) {
                if(temasMicro[i].html_url == $(this).siblings('a').attr('href')){
                    let favlist ={
                        nome : temasMicro[i].title,
                        link: `${$(this).siblings('a').attr('href')}`
                    }
                    favoritos += `<li ><a class="link_fav" href="${$(this).siblings('a').attr('href')}" target="_blank">${temasMicro[i].title}</a></li>`
                    console.log($(this).siblings('a').attr('href'))
                    console.log(temasMicro[i].title)
                }
            }
            
        } else {
            this.classList.replace("fa-star", "fa-star-o");
            
        }

        $('#myafav').html(favoritos)
    
})
    

}
*/