
cursoInicial()

listarMicroF()


function cursoInicial() { }


//lista os microfundamentos do curso
function listarMicroF() {

    //define lista que conterá os microfundamentos    
    var relacao = ''
    var lista = []

    //Busca os microfundamentos no arquivo microfundamentos.js
    for (i = 0; i < microF.length; i++) {
        let _lista = {
            id: microF[i].id,
            nome: microF[i].name
        }
        lista.push(_lista)
    }

    //cria uma lista com os microfundamentos
    for (var i = 0; i < lista.length; i++) {
        relacao += `<li class="microSelect${i}">${lista[i].nome}</li>`
    }

    //inseri a lista de mocrofundamentos na DIV 'materia-barra'
    $('#materia-barra').html(relacao)

    //cria um evento clique para cada 'li' de microfundamento
    $("#materia-barra li").on("click", function (e) {

        //cancela evento se clicar fora do microfundamento
        if (e.target != this) return;

        let rl = "."
        var tl = e.target.classList.value
        var cl = rl + tl

        //verifica se a caixa com as unidades do microfundamento clicado esta aberta   
        if (e.target.innerHTML.includes("table")) {

            let rem = ".table"
            let ove = rem + tl
            let remov = document.querySelector(ove)
            remov.classList.toggle("unid-visivel")
        } else {

            //inseri a caixa  com as unidades abaixo do microfundamento    
            for (var i = 0; i < lista.length; i++) {
                if (lista[i].nome.includes(e.target.innerHTML)) {
                    var t = document.querySelector(cl)
                    //monta a caixa com as unidades usando a function 'buscaUnidades'
                    $(buscaUnidades(lista[i].id, tl)).appendTo(t)
                }
            }
        }
    })
}


//monta a caixa com as unidades e os botoes de Data e Etapa
function buscaUnidades(id, cl) {
    //chama a classe do Bootstrap para data 

    //  $('.input-group.date').datepicker({format: "dd/mm/yyyy"});

    var cont = ''
    var lista_habilidades = ''
    for (i = 0; i < unidadesMicro.length; i++) {
        if (unidadesMicro[i].items_url.indexOf(id) > 0 && (unidadesMicro[i].name.includes("UNIDADE") || unidadesMicro[i].name.includes("Módulo"))) {
            lista_habilidades += `<tr class="linha-unid">
            <td><select name="Etapa"" class="sel-etp custom-select">
            <option>-</option>
            <option value="1">Etapa 1</option>
            <option value="2">Etapa 2</option>
            <option value="3">Etapa 3</option>
            <option value="4">Etapa 4</option>
            <option value="5">Etapa 5</option>
            </select></td>        
            <td class="unid-name">${unidadesMicro[i].name}</td>                                 
            <td ><input class="data1 custom-select w-100 input-group date" type="date" placeholder="dd/mm/aaaa"></td>
            <td><spam>a</spam></td>
            <td ><input class="data2 custom-select w-100" type="date" placeholder="dd/mm/aaaa"></td>
            </tr>`
        }
    }
    cont = `<table class="table${cl} table-unid">${lista_habilidades}</table>`

    return cont

}




//cria array com as informaçoes das datas de cada Unidade
function criaPrograma() {

    var cad_sel = document.querySelectorAll(".sel-etp")
    var cad_unid = document.querySelectorAll(".unid-name")
    var cad_data1 = document.querySelectorAll(".data1")
    var cad_data2 = document.querySelectorAll(".data2")
    var calend = []


    for (i = 0; i < microF.length; i++) {

        for (y = 0; y < cad_unid.length; y++) {
            if (cad_unid[y].parentNode.parentNode.parentNode.parentNode.innerHTML.includes(microF[i].name)) {

                for (x = 0; x < unidadesMicro.length; x++) {
                    if (cad_unid[y].innerHTML == unidadesMicro[x].name) {
                        var _id = unidadesMicro[x].id
                        var _status = unidadesMicro[x].state
                    }
                }

                let nomeM = {
                    id: _id,
                    nome: microF[i].name,
                    unidade: cad_unid[y].innerHTML,
                    nomeUnd: microF[i].name + ' <br>' + cad_unid[y].innerHTML,
                    etapa: cad_sel[y].value,
                    dataini: cad_data1[y].valueAsDate,
                    datafin: cad_data2[y].valueAsDate
                }
                calend.push(nomeM)
            }
        }
    }
    calend.sort(function (a, b) {
        return a.dataini - b.dataini
    });


    localStorage.setItem('db_curso', JSON.stringify(calend))

    listarEtapas(calend)
}

//cria array com as informaçoes das datas de cada Unidade para a visualização previa do cronograma
function verPrograma() {

    var cad_sel = document.querySelectorAll(".sel-etp")
    var cad_unid = document.querySelectorAll(".unid-name")
    var cad_data1 = document.querySelectorAll(".data1")
    var cad_data2 = document.querySelectorAll(".data2")
    var calend = []


    for (i = 0; i < microF.length; i++) {

        for (y = 0; y < cad_unid.length; y++) {
            if (cad_unid[y].parentNode.parentNode.parentNode.parentNode.innerHTML.includes(microF[i].name)) {

                for (x = 0; x < unidadesMicro.length; x++) {
                    if (cad_unid[y].innerHTML == unidadesMicro[x].name) {
                        var _id = unidadesMicro[x].id
                        var _status = unidadesMicro[x].state
                    }
                }

                let nomeM = {
                    id: _id,
                    nome: microF[i].name,
                    unidade: cad_unid[y].innerHTML,
                    nomeUnd: microF[i].name + ' <br>' + cad_unid[y].innerHTML,
                    etapa: cad_sel[y].value,
                    dataini: cad_data1[y].valueAsDate,
                    datafin: cad_data2[y].valueAsDate
                }
                calend.push(nomeM)
            }
        }
    }
    calend.sort(function (a, b) {
        return a.dataini - b.dataini
    });


    localStorage.setItem('db_curso_visualisacao', JSON.stringify(calend))

    listarEtapas(calend)
}




//lista as etapas do curso
function listarEtapas(cronograma) {

    //define lista que conterá as etapas
    var _etapasCurso = ""
    var _microCurso = ""
    var _unidTem

    //Busca as etapas no arquivo etapas.js
    for (i = 0; i < etapas_curso.length; i++) {
        if (etapas_curso[i].name.includes("ETAPA")) {
            _etapasCurso += `<li class="arv_etp_ind">${etapas_curso[i].name}</li>`
        }
    }
    $('#arv_etapas').html(_etapasCurso)
    document.getElementById('li_etp').style.display = 'none'

    $("#arv_etapas li").on("click", function (e) {

        cronograma.forEach(element => {
            if ('ETAPA ' + element.etapa == e.target.innerHTML.substring(0, 7)) {
                _microCurso += `<li class="arv_mic_ind">${element.nomeUnd}</li>`
            }
        });
        $('#arv_microfundamento').html(_microCurso)

        //altera a propriedade display do primeiro li 
        if (_microCurso.length > 0) {
            document.getElementById('li_mic').style.display = 'none'
        } else {
            document.getElementById('li_mic').style.display = 'block'
        }
        _unidTem = _microCurso

        //limpa a variavel contendo as unidades
        _microCurso = ""
        listaTemas()
    })


}



function listaTemas() {

    var _temas = ''
    var _aulasM = []

    $("#arv_microfundamento li").on("click", function (e) {
        unidadesMicro.forEach(element => {
            if (e.target.innerHTML.includes(element.name)) {
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

                        _temas += `<li class="arv_mod_ind "><a href="${temasMicro[i].html_url}" class="link_aula" target="_blank">${temasMicro[i].title}</a></li>`
                    } else if (temasMicro[i].title.includes("Tema " + cont)) {
                        _temas += `<li class="arv_tem_ind">Tema ${cont}</li>`
                        cont++
                    } else if (!temasMicro[i].title.includes("Tema")) {
                        _temas += `<li><a href="${temasMicro[i].html_url}" class="link_aula" target="_blank">${temasMicro[i].title}</a></li>`

                    }

                    let aulasM = {
                        nome: temasMicro[i].title,
                        url: temasMicro[i].html_url
                    }
                    _aulasM.push(aulasM)
                }
            }

        })
        $('#arv_temas').html(_temas)

        //altera a propriedade display do primeiro li 
        if (_temas.length > 0) {
            document.getElementById('li_tem').style.display = 'none'
        } else {
            document.getElementById('li_tem').style.display = 'block'
        }

        //limpa a variavel contendo as unidades
        _temas = ""
        listaAulas(_aulasM)
        _aulasM = []
    })




}


function listaAulas(aulas) {


    var _aulas = ''
    $(".arv_tem_ind").on("click", function (e) {

        aulas.forEach(element => {
            if (element.nome.includes(e.target.innerHTML)) {
                _aulas += `<li class="arv_aul_ind "><a href="${element.url}" class="link_aula" target="_blank">${element.nome}</a></li>`
            }
        });

        $('#arv_aulas').html(_aulas)

        //altera a propriedade display do primeiro li 
        if (_aulas.length > 0) {
            document.getElementById('li_aul').style.display = 'none'
        } else {
            document.getElementById('li_aul').style.display = 'block'
        }

        //limpa a variavel contendo as unidades
        _aulas = ""
    })

}