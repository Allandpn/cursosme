
const token = JSON.parse(localStorage.getItem('token'))

//array com od IDs dos cursos e unidades cadastrados
const db_id_unid = []

//array com os temas das unidades cadastradas
const tema_cadst = []

buscaID()

function buscaID() {
    res = fetch('https://pucminas.instructure.com/api/v1/users/self',
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {

            listarMicroFnd(data.id)

            return data.id

        })

        .catch((error) => console.log(error.message))
}

// -----------------\\

function cursoInicial() { }

//----------------\\


async function listarMicroFnd(id) {
    res = fetch(`https://pucminas.instructure.com/api/v1/users/${id}/courses?per_page=1000&include[]=favorites`,
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {

            //define lista que conterĂ¡ os microfundamentos    
            var relacao = ''
            var lista = []

            //Busca os microfundamentos no arquivo microfundamentos.js
            for (i = 0; i < data.length; i++) {
                let _lista = {
                    id: data[i].id,
                    nome: data[i].name
                }
                lista.push(_lista)
            }

            //cria uma lista com os microfundamentos
            for (var i = 0; i < lista.length; i++) {
                relacao += `<li class="microSelect${i}">${lista[i].nome}</li>`
            }


            //inseri a lista de mocrofundamentos na DIV 'materia-barra'
            $('#materia-barra').html(relacao)

            //buscaUnidadesMicro(lista)

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
                            buscaUnidadesMicro(lista[i].id, tl, t)
                            // console.log(unid)
                            //  $(unid).appendTo(t)
                        }
                    }
                }
            })



        })

        .catch((error) => console.log(error.message))


}



function buscaUnidadesMicro(id, cl, t) {



    res = fetch(`https://pucminas.instructure.com/api/v1/courses/${id}/modules`,
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {


            var cont = ''
            var lista_habilidades = ''
            for (i = 0; i < data.length; i++) {
                if (data[i].name.includes("UNIDADE") || data[i].name.includes("MĂ³dulo")) {

                    let list_id = {
                        idCurso: id,
                        idUnid: data[i].id,
                        nameUnid: data[i].name,
                        status: data[i].state
                    }

                    db_id_unid.push(list_id)


                    lista_habilidades += `<tr class="linha-unid">
            <td><select name="Etapa"" class="sel-etp custom-select">
            <option>-</option>
            <option value="1">Etapa 1</option>
            <option value="2">Etapa 2</option>
            <option value="3">Etapa 3</option>
            <option value="4">Etapa 4</option>
            <option value="5">Etapa 5</option>
            </select></td>        
            <td class="unid-name">${data[i].name}</td>                                 
            <td ><input class="data1 custom-select w-100 input-group date" type="date" placeholder="dd/mm/aaaa"></td>
            <td><spam>a</spam></td>
            <td ><input class="data2 custom-select w-100" type="date" placeholder="dd/mm/aaaa"></td>
            </tr>`
                }
            }
            cont = `<table class="table${cl} table-unid">${lista_habilidades}</table>`

            $(cont).appendTo(t)

            cadastoTemas()
        })

        .catch((error) => console.log(error.message))
}






//cria array com as informaĂ§oes das datas de cada Unidade para a visualizaĂ§Ă£o previa do cronograma
function criaPrograma() {
    res = fetch('https://pucminas.instructure.com/api/v1/users/self',
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {

            criaPrograma_ctn(data.id)

        })

        .catch((error) => console.log(error.message))
}

//cria array com as informaĂ§oes das datas de cada Unidade para a visualizaĂ§Ă£o previa do cronograma
function criaPrograma_ctn(id) {


   

    var cad_sel = document.querySelectorAll(".sel-etp")
    var cad_unid = document.querySelectorAll(".unid-name")
    var cad_data1 = document.querySelectorAll(".data1")
    var cad_data2 = document.querySelectorAll(".data2")
    var calend = []





    res = fetch(`https://pucminas.instructure.com/api/v1/users/${id}/courses?per_page=1000&include[]=favorites`,
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {
            
            for (i = 0; i < data.length; i++) {
                

                for (y = 0; y < cad_unid.length; y++) {
                    if (cad_unid[y].parentNode.parentNode.parentNode.parentNode.innerHTML.includes(data[i].name)) {

                        for (x = 0; x < db_id_unid.length; x++) {

                            if (cad_unid[y].innerHTML == db_id_unid[x].nameUnid) {
                                var _idCurso = db_id_unid[x].idCurso
                                var _idUnid = db_id_unid[x].idUnid
                                var _status = null
                            }
                        }

                        let nomeM = {
                            idCurso: _idCurso,
                            idUnid: _idUnid,
                            nome: data[i].name,
                            unidade: cad_unid[y].innerHTML,
                            nomeUnd: data[i].name + ' <br>' + cad_unid[y].innerHTML,
                            etapa: cad_sel[y].value,
                            dataini: cad_data1[y].valueAsDate,
                            datafin: cad_data2[y].valueAsDate,
                            status: null
                        }
                        calend.push(nomeM)
                    }
                }
            }
            calend.sort(function (a, b) {
                return a.dataini - b.dataini
            });

            // console.log(calend)
            localStorage.setItem('db_curso', JSON.stringify(calend))

            localStorage.setItem('db_idUnids', JSON.stringify(db_id_unid))

            listarEtapas(calend)



        })

        .catch((error) => console.log(error.message))

}








//cria array com as informaĂ§oes das datas de cada Unidade para a visualizaĂ§Ă£o previa do cronograma
function verPrograma() {
    res = fetch('https://pucminas.instructure.com/api/v1/users/self',
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {

            montaPrograma(data.id)

        })

        .catch((error) => console.log(error.message))
}

//cria array com as informaĂ§oes das datas de cada Unidade para a visualizaĂ§Ă£o previa do cronograma
function montaPrograma(id) {


    // console.log(id)

    var cad_sel = document.querySelectorAll(".sel-etp")
    var cad_unid = document.querySelectorAll(".unid-name")
    var cad_data1 = document.querySelectorAll(".data1")
    var cad_data2 = document.querySelectorAll(".data2")
    var calend = []





    res = fetch(`https://pucminas.instructure.com/api/v1/users/${id}/courses?per_page=1000&include[]=favorites`,
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {

            for (i = 0; i < data.length; i++) {
              

                for (y = 0; y < cad_unid.length; y++) {
                    if (cad_unid[y].parentNode.parentNode.parentNode.parentNode.innerHTML.includes(data[i].name)) {

                        for (x = 0; x < db_id_unid.length; x++) {

                            if (cad_unid[y].innerHTML == db_id_unid[x].nameUnid) {
                                var _idCurso = db_id_unid[x].idCurso
                                var _idUnid = db_id_unid[x].idUnid
                                var _status = null
                            }
                        }

                        let nomeM = {
                            idCurso: _idCurso,
                            idUnid: _idUnid,
                            nome: data[i].name,
                            unidade: cad_unid[y].innerHTML,
                            nomeUnd: data[i].name + ' <br>' + cad_unid[y].innerHTML,
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

            // console.log(calend)
            localStorage.setItem('db_curso_visualisacao', JSON.stringify(calend))

            localStorage.setItem('db_idUnids', JSON.stringify(db_id_unid))

            listarEtapas(calend)



        })

        .catch((error) => console.log(error.message))

}



//lista as etapas do curso
function listarEtapas(cronograma) {

    //define lista que conterĂ¡ as etapas
    var _etapasCurso = ""
    var _microCurso = ""
    var _unidTem




    // --------id do mĂ³dulo deve ser alterado cada semestre---------------\\
    res = fetch(`https://pucminas.instructure.com/api/v1/courses/87896/modules`,
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {


            for (i = 0; i < data.length; i++) {
                if (data[i].name.includes("ETAPA")) {
                    _etapasCurso += `<li class="arv_etp_ind">${data[i].name}</li>`
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


        })

        .catch((error) => console.log(error.message))

}



function cadastoTemas() {



    for (i = 0; i < db_id_unid.length; i++) {

        var idcurso = db_id_unid[i].idCurso
        var idunid = db_id_unid[i].idUnid




        res = fetch(`https://pucminas.instructure.com/api/v1/courses/${idcurso}/modules/${idunid}/items`,
            {
                method: "get",
                headers: {

                    "Authorization": `Bearer ${token}`
                },
            })

            .then((res) => res.json())
            .then((data) => {
          
               

                for (y = 0; y < data.length; y++) {

                    let _tema = {
                        module_id: data[y].module_id,
                        title: data[y].title,
                        html_url: data[y].html_url
                    }

                    tema_cadst.push(_tema)
                  
                }
             
                return tema_cadst

            })

            .catch((error) => console.log(error.message))

    }

}



function listaTemas() {


 


    var _temas = ''
    var _aulasM = []


    res = fetch('https://pucminas.instructure.com/api/v1/users/self',
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {



            $("#arv_microfundamento li").on("click", function (e) {
                db_id_unid.forEach(element => {

                    if (e.target.innerHTML.includes(element.nameUnid)) {
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

                                _temas += `<li class="arv_mod_ind "><a href="${tema_cadst[i].html_url}" class="link_aula" target="_blank">${tema_cadst[i].title}</a></li>`
                            } else if (tema_cadst[i].title.includes("Tema " + cont)) {
                                _temas += `<li class="arv_tem_ind">Tema ${cont}</li>`
                                cont++
                            } else if (!tema_cadst[i].title.includes("Tema")) {
                                _temas += `<li><a href="${tema_cadst[i].html_url}" class="link_aula" target="_blank">${tema_cadst[i].title}</a></li>`

                            }

                            let aulasM = {
                                nome: tema_cadst[i].title,
                                url: tema_cadst[i].html_url
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





        })

        .catch((error) => console.log(error.message))




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