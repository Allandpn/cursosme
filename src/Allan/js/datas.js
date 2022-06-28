

//montagem do curso em ordem cronologica
var db_ord_curso = JSON.parse(localStorage.getItem('db_curso'))



//carregar datas de atividades do arquivos assigmentes.js
var db_datas_ativ = []
var _score = []



function carregaDatas() {

    try{
    for (i = 0; i < db_ord_curso.length; i++) {
        if(db_ord_curso[i].unidade.substr(0, db_ord_curso[i].unidade.indexOf('-', 0)) == ""){
            _nomeUnd = db_ord_curso[i].unidade
        } else {
            _nomeUnd = db_ord_curso[i].unidade.substr(0, db_ord_curso[i].unidade.indexOf('-', 0))
        }
        
        let atividade = {
            index: null,
            id: db_ord_curso[i].id,
            data: new Date(db_ord_curso[i].datafin),
            nome: db_ord_curso[i].nome + ' - ' + _nomeUnd,
            unidade: db_ord_curso[i].unidade,
            nota: null,
            url: null,
            global: 0
        }
        db_datas_ativ.push(atividade)
      
    }
    }
    catch{}


    for (i = 0; i < comp.dados.length; i++) {

        let atividade = {
            index: i+1,
            id: comp.dados[i].id,
            data: new Date(comp.dados[i].due_at),
            nome: comp.dados[i].name,
            nota: null,
            url: comp.dados[i].html_url,
            global: 0
        }
        db_datas_ativ.push(atividade)
    }

    //ordena as atividades em ordem cronológica
    db_datas_ativ.sort(function (a, b) {
        return a.data - b.data
    });




    //preenche a tabela com as datas das atividades
    var atividade = ''
    var score = ''
    var score_turma = []

    for (i = 0; i < db_datas_ativ.length; i++) {

        //formata objeto Data para ""/""/""
        var data_red = new Intl.DateTimeFormat('pt-BR').format(db_datas_ativ[i].data)
        var dataAtual = new Date()

        score = (BuscaNota(db_datas_ativ[i].id, db_datas_ativ[i].unidade))

        _score.push(score)



        if (score != "N/A") {
            score_turma.push(score)
            score = score + "%"
        } else {
            score_turma.push(0)
        }

        // <a href="${db_datas_ativ[i].url}">${db_datas_ativ[i].nome}</a>
        // formata a linha caso a data atual seja menor ou igual à da atividade
        if (db_datas_ativ[i].data <= dataAtual) {

            atividade += `<tr class="crono pass">        
        <td>${data_red}</td>
        <td class="cont"><div class="turma turma${db_datas_ativ[i].id}"></div>
        <div class="progress-bar ">
        <div class="valor valor${db_datas_ativ[i].id}"></div>
        </div>
        <a href="${db_datas_ativ[i].url}" class="link_ativ" target="_blank">${db_datas_ativ[i].nome}</a></td>
        <td class="notA"><strong>${score}</strong></td>
        </tr>`;
        } else {

            atividade += `<tr class="crono">        
        <td>${data_red}</td>
        <td class="cont">
        <div class="turma turma${db_datas_ativ[i].id}"></div><div class="progress-bar">
        <div class="valor valor${db_datas_ativ[i].id}"></div>
        </div><strong><a href="${db_datas_ativ[i].url}" class="link_ativ" target="_blank">${db_datas_ativ[i].nome}</a></strong></td>
        <td class="notA"><strong>${score}</strong></td>
        </tr>`;
        }

    }

    //inseri tabela com as ativiades na pagina html 
    $('#datas').html('<table>' + '<tr class="crono"><th>Data</th><th class="cont">Atividade</th><th></th></tr>' + atividade + '</table>')

    BarraProgresso(_score)
    ProgressoTurma(score_turma)


}

//busca a nota da atividade no arquivo grades.js
function BuscaNota(scor, unidade) {
 
    var score = "N/A"
    for (var i = 0; i < db_nota_ativ.length; i++) {
       
        if (db_nota_ativ[i].assignment_id == scor) {
            score = db_nota_ativ[i].score
        }
    }

 
    if (score == "N/A") {
        for (var i = 0; i < unidadesMicro.length; i++) {

            try {
          
                if (unidadesMicro[i].name == unidade) {
                    if (unidadesMicro[i].state == "completed") {
 
                        score = 10.0
                    } else {
                        score = 0
                    }

                }


            } catch {
                score = 0
            }
        }
    }

 
    score_max = BuscaNotaMax(scor)

    if(score !=0){
    if (score == null) { score = "N/A" }else{  score = score / score_max * 100} 
    }
    return score
}







// busca a nota máxima da atividade no arquivo assigments.js
function BuscaNotaMax(scorM) {
  
    var score_mac = ""
    for (var i = 0; i < comp.dados.length; i++) {
        if (comp.dados[i].id == scorM) {
            score_mac = comp.dados[i].points_possible
        }
    }
   
    if(score_mac == ""){
        score_mac = 10  
    }
   
    return score_mac
}





//altera o valor da propriedade css(arquivo datas.css) que define a cor da barra de progresso
function BarraProgresso(scor) {
    

    for (i = 0; i < db_datas_ativ.length; i++) {
        ind = db_datas_ativ[i].id
        table = document.querySelector(".valor" + ind)
        table.style.setProperty('--progress', scor[i])

        table.style.setProperty('width', 'calc(var(--progress) * 1%)' )
        table.style.setProperty('background-color', 'hsl( calc(var(--progress) * 1.2) , 80%, 50%)' )

    }

}


function ProgressoTurma(scor) {

    for (i = 0; i < db_datas_ativ.length; i++) {
        ind = db_datas_ativ[i].id
        table = document.querySelector(".turma" + ind)
        table.style.setProperty('--progress', scor[i])

        table.style.setProperty('width', 'calc(var(--progress) * 1%)' )
       // table.style.setProperty('background-color', 'hsl( calc(var(--progress) * 1.2) , 80%, 50%)' )
    }

}


/*
width: calc(var(--progress) * 1%);
     ; 
    */














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