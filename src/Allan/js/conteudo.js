
//montagem do curso em ordem cronologica
var db_curso_ord = JSON.parse(localStorage.getItem('db_curso'))

listarEtapas(db_curso_ord)

console.log(db_curso_ord)

//lista as etapas do curso
function listarEtapas(db_curso_ord) {

    //define lista que conterá as etapas
    var _etapasCurso = ""
    var _microCurso = ""
    var _unidTem

    //Busca as etapas no arquivo etapas.js
    for (i = 0; i < etapas_curso.length; i++) {
        if (etapas_curso[i].name.includes("ETAPA")) {
            _etapasCurso += `<li><div>${etapas_curso[i].name}<br><i class="fa fa-2xs fa-check ${etapas_curso[i].state}"></i></div></li>`
        }
    }
    $('#cur_etapas').html(_etapasCurso)


    //cria evento para abrir a DIV Microfundamentos
    var criaEtapa = document.querySelectorAll("#etapa li");

    for (var i = 0; i < criaEtapa.length; i++) {
        criaEtapa[i].addEventListener("click", openMic);
    }



    $("#cur_etapas li").on("click", function (e) {

        db_curso_ord.forEach(element => {
            var statusUnd = ""
            
            if (element.unidade.substr(0, element.unidade.indexOf('-', 0)) == "") {
                _nomeUnd = element.unidade
            } else {
                _nomeUnd = element.unidade.substr(0, element.unidade.indexOf('-', 0))
            }

            if ('ETAPA ' + element.etapa == e.target.innerHTML.substring(0, 7)) {
                for(i=0; i<unidadesMicro.length; i++){
                  
                    if(element.id == unidadesMicro[i].id){
                        statusUnd = unidadesMicro[i].state
                    }
                }
                
                _microCurso += `<li class="list_micro"><div class=" ${element.id} ">${element.nome}<br>- ${_nomeUnd}<br><i class="fa fa-2xs fa-check ${statusUnd}"></i><br></div></li>`
            }
        });
        $('#cur_microfundamento').html(_microCurso)


        _unidTem = _microCurso

        //limpa a variavel contendo as unidades
        _microCurso = ""
        listaTemas()

        //cria evento para abrir a DIV Temas
        var criaMicro = document.querySelectorAll("#microfundamento li");

        for (var i = 0; i < criaMicro.length; i++) {
            criaMicro[i].addEventListener("click", openTem)
        }

    })



}



function listaTemas() {


    var _temas = ''
    var _aulasM = []

    $("#cur_microfundamento li").on("click", function (e) {
        unidadesMicro.forEach(element => {

            if (e.target.parentNode.innerHTML.includes(element.id)) {

                var codUnid = element.id
            }
            var cont = 1
            var contT = 0
            for (i = 0; i < temasMicro.length; i++) {
                if (temasMicro[i].module_id == codUnid) {
                    if (temasMicro[i].title.includes("- Tema")) {
                        contT++
                    }

                    if (contT == 0) {

                        _temas += `<li class="arv_mod_ind "><div><a href="${temasMicro[i].html_url}" class="arv_link_ativ" target="_blank">${temasMicro[i].title}</a><br><i class="fa fa-2xs fa-check ${temasMicro[i].completion_requirement.completed}"></i></div></li>`
                    } else if (temasMicro[i].title.includes("Tema " + cont)) {
                        _temas += `<li class="arv_tem_ind"><div>Tema ${cont}<br><i class="fa fa-2xs fa-check ${temasMicro[i].completion_requirement.completed}"></i></div></li>`
                        cont++
                    } else if (!temasMicro[i].title.includes("Tema")) {
                        _temas += `<li><div><a href="${temasMicro[i].html_url}" class="arv_link_ativ" target="_blank">${temasMicro[i].title}</a><br><i class="fa fa-2xs fa-check ${temasMicro[i].completion_requirement.completed}"></i></div></li>`

                    }


                    contMark = temasMicro[i].title.lastIndexOf('-')
                   
                    _nome = temasMicro[i].title.substring(contMark +2)
                   
                    
                    



                    let aulasM = {
                        nome: _nome,
                        title: temasMicro[i].title,
                        url: temasMicro[i].html_url,
                        status: temasMicro[i].completion_requirement.completed,
                    }

                    _aulasM.push(aulasM)
                }
            }

        })
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
        
            if (element.title.includes(e.target.textContent)) {
                _aulas += `<li class="arv_aul_ind "><div><a href="${element.url}" class="arv_link_ativ" target="_blank">${element.nome}</a><br><i class="fa fa-2xs fa-check ${element.status} "></i><i class="fa fa-2xs fa-star-o addfav"></i></div></li>`
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







function addFav(){

    var favoritos = ''

    $(".addfav").on("click", function (e) {
        
        console.log(this.parentNode)
        if (this.classList.contains("fa-star-o")) {
            this.classList.replace("fa-star-o", "fa-star");
            for (var i = 0; i < temasMicro.length; i++) {
                if(temasMicro[i].html_url == $(this).siblings('a').attr('href')){
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








