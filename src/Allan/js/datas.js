

//montagem do curso em ordem cronologica
var db_ord_curso = JSON.parse(localStorage.getItem('db_curso'))

//onsole.log(db_ord_curso)

//carregar datas de atividades do arquivos assigmentes.js
var db_datas_ativ = []
var _score = []

const token_Aluno = ''
const id_Aluno = ''


function iniciaLista(){

}

 function carregaDatas(token, id) {

    res =  fetch('https://pucminas.instructure.com/api/v1/courses/87896/assignments?per_page=2000',
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })

        .then((res) => res.json())
        .then((data) => {
            

           montaListaDB(data, token, id)
            
            montarListaLocal(data, token, id)            

        })
      

        .catch((error) => console.log(error.message))
        .finally()
   

}







function montaListaDB(data, token, id) {


    for (i = 0; i < db_ord_curso.length; i++) {
        idcurso = db_ord_curso[i].idCurso
        idunid = db_ord_curso[i].idUnid


        res = fetch(`https://pucminas.instructure.com/api/v1/courses/${idcurso}/modules`,
            {
                method: "get",
                headers: {

                    "Authorization": `Bearer ${token}`
                },
            })

            .then((res) => res.json())
            .then((data) => {
      
                for (y = 0; y < data.length; y++) {
                    for (i = 0; i < db_ord_curso.length; i++) {
                        if (data[y].id == db_ord_curso[i].idUnid) {
                         
                            try {
                                if (db_ord_curso[i].unidade.substr(0, db_ord_curso[i].unidade.indexOf('-', 0)) == "") {
                                    _nomeUnd = db_ord_curso[i].unidade
                                } else {
                                    _nomeUnd = db_ord_curso[i].unidade.substr(0, db_ord_curso[i].unidade.indexOf('-', 0))
                                }

                                if (data[y].state == "completed") {
                                    _nota = 10
                                } else {
                                    _nota = 0
                                }
                          

                                let atividade = {
                                    index: null,
                                    id: db_ord_curso[i].idUnid,
                                    data: new Date(db_ord_curso[i].datafin),
                                    nome: db_ord_curso[i].nome + ' - ' + _nomeUnd,
                                    unidade: db_ord_curso[i].unidade,
                                    nota: _nota,
                                    notaMax: 10,
                                    url: null,
                                    global: 0
                                }
                                db_datas_ativ.push(atividade)

                            }

                            catch { }

                        }
                    }
                }



                db_datas_ativ.sort(function (a, b) {
                    return a.data - b.data
                });

                
            })

            .catch((error) => console.log(error.message))
    }

}




function montarListaLocal(data, token, id) {
    for (i = 0; i < data.length; i++) {

        let atividade = {
            index: i + 1,
            id: data[i].id,
            data: new Date(data[i].due_at),
            nome: data[i].name,
            nota: null,
            notaMax: data[i].points_possible,
            url: data[i].html_url,
            global: 0

        }
        db_datas_ativ.push(atividade)
    }

    //ordena as atividades em ordem cronológica
    db_datas_ativ.sort(function (a, b) {
        return a.data - b.data
    });

    preencheTabela(token, id)
  
}


//preenche a tabela com as datas das atividades
function preencheTabela(token, id) {


    var score = ''


    for (i = 0; i < db_datas_ativ.length; i++) {

        BuscaNotaAPI(token, id)

    }


    return score

}



function BuscaNotaAPI(token, id) {

 
    var scor = ''

    for (i = 0; i < db_datas_ativ.length; i++) {
        scor = db_datas_ativ[i].id



        res = fetch(`https://pucminas.instructure.com/api/v1/courses/87896/assignments/${scor}/submissions/${id}?include[]=full_rubric_assessment&per_page=1000`,
            {
                method: "get",
                headers: {

                    "Authorization": `Bearer ${token}`
                },
            })



            .then((res) => res.json())
            .then((data) => {

                for (i = 0; i < db_datas_ativ.length; i++) {
                    if (data.assignment_id == db_datas_ativ[i].id) {
                        db_datas_ativ[i].nota = data.score


                    }
                }


                preencheNotas(id)
            })

            .catch((error) => console.log(error.message))

    }



}




function preencheNotas() {


    atividade = ''

   

    for (i = 0; i < db_datas_ativ.length; i++) {

        //formata objeto Data para ""/""/""
        var data_red = new Intl.DateTimeFormat('pt-BR').format(db_datas_ativ[i].data)
        var dataAtual = new Date()


        if (db_datas_ativ[i].data <= dataAtual) {
            if (db_datas_ativ[i].nota != null || db_datas_ativ[i].nota != undefined) {
                var nota = (db_datas_ativ[i].nota / db_datas_ativ[i].notaMax) * 100
                nota = nota.toFixed(0) + '%'
            } else {
                var nota = "N/A"
            }


            atividade += `<tr class="crono pass">        
           <td>${data_red}</td>
           <td class="cont"><div class="turma turma${db_datas_ativ[i].id}"></div>
           <div class="progress-bar ">
           <div class="valor valor${db_datas_ativ[i].id}"></div>
           </div>
           <a href="${db_datas_ativ[i].url}" class="link_ativ" target="_blank">${db_datas_ativ[i].nome}</a></td>
           <td class="notA"><strong>${nota}</strong></td>
           </tr>`;
        } else {


            if (db_datas_ativ[i].nota != null || db_datas_ativ[i].nota != undefined) {
                var nota = (db_datas_ativ[i].nota / db_datas_ativ[i].notaMax) * 100
                nota = nota.toFixed(0) + '%'
            } else {
                var nota = "N/A"
            }


            atividade += `<tr class="crono">        
           <td>${data_red}</td>
           <td class="cont">
           <div class="turma turma${db_datas_ativ[i].id}"></div><div class="progress-bar">
           <div class="valor valor${db_datas_ativ[i].id}"></div>
           </div><strong><a href="${db_datas_ativ[i].url}" class="link_ativ" target="_blank">${db_datas_ativ[i].nome}</a></strong></td>
           <td class="notA"><strong>${nota}</strong></td>
           </tr>`;
        }

    }

    //inseri tabela com as ativiades na pagina html 
    $('#datas').html('<table>' + '<tr class="crono"><th>Data</th><th class="cont">Atividade</th><th></th></tr>' + atividade + '</table>')





    BarraProgresso()
    ProgressoTurma()


}


//altera o valor da propriedade css(arquivo datas.css) que define a cor da barra de progresso
function BarraProgresso() {


    for (i = 0; i < db_datas_ativ.length; i++) {
        nota = (db_datas_ativ[i].nota / db_datas_ativ[i].notaMax) * 100
        ind = db_datas_ativ[i].id
        table = document.querySelector(".valor" + ind)
        table.style.setProperty('--progress', nota)

        table.style.setProperty('width', 'calc(var(--progress) * 1%)')
        table.style.setProperty('background-color', 'hsl( calc(var(--progress) * 1.2) , 80%, 50%)')

    }

}


function ProgressoTurma() {

    for (i = 0; i < db_datas_ativ.length; i++) {
        nota = (db_datas_ativ[i].nota / db_datas_ativ[i].notaMax) * 100
        ind = db_datas_ativ[i].id
        table = document.querySelector(".turma" + ind)
        table.style.setProperty('--progress', nota)

        table.style.setProperty('width', 'calc(var(--progress) * 1%)')
        // table.style.setProperty('background-color', 'hsl( calc(var(--progress) * 1.2) , 80%, 50%)' )
    }

}



//BARRA DE PROGRESSO DO MENU DE NAVEGAÇÃO

//encontra a pontuacao máxima do curso
function valorMáximo() {
    var score_max = 0

    //variavel comp.dados é um array que contem todas as notas possíveis do curso. [arquivo assigments.js]
    for (var i = 0; i < comp.dados.length; i++) {
        score_max += comp.dados[i].points_possible
    }
    return score_max
}

//encontra a pontuacao atual do aluno
function pontuacaoAtual() {
    score_atual = 0

    //variavel _score é um array que contem todas as notas do aluno. [arquivo datas.js]
    for (i = 0; i < _score.length; i++) {
        if (_score[i] > 0) {
            score_atual += _score[i]
        }
    }
    return score_atual
}

//calcula a porcentagem concluida do curso
function calculaPontuacao() {
    concluido = (pontuacaoAtual() / valorMáximo()) * 10

}