


//encontra a pontuacao máxima do curso
function valorMáximo(){
    var score_max = 0

    //variavel comp.dados é um array que contem todas as notas possíveis do curso. [arquivo assigments.js]
    for(var i =0; i<comp.dados.length; i++){
        score_max += comp.dados[i].points_possible
    } 
    return score_max        
}

//encontra a pontuacao atual do aluno
function pontuacaoAtual(){
    score_atual = 0

    //variavel _score é um array que contem todas as notas do aluno. [arquivo datas.js]
    for (i = 0; i < _score.length; i++) {
        if(_score[i] >0){
        score_atual += _score[i]
    } 
} 
return score_atual
}

//calcula a porcentagem concluida do curso
function calculaPontuacao(){
    concluido = (pontuacaoAtual()/valorMáximo())*10
    
    score = document.querySelector('#score_aluno')
    console.log(score)
    score = concluido
}
