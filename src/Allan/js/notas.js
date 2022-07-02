




//Preenche o Dropdown com a Lista de Etapas do aarquivo API_Canvas/assigments.js
function preencDrop() {

    var db_assigments = ''
    const token = "11748~KMkhyKZmmpxczIIaViCererBxWNW4uWPC1wOxhsgelK5RPcpHSRjsnvgMs3BvdgL"
         db_assigments = fetch('https://pucminas.instructure.com/api/v1/courses/87896/assignments?per_page=2000',
            {
                method: "get",
                headers: {
                  //  'Content-Type' : 'application/json',
                  //  'Content-Type' : 'application/json',
                  //  'Access-Control-Allow-Origin' : '*',
                  //  'Access-Control-Allow-Headers' : '*',
                  //  'Access-Control-Allow-Credentials' :  'true',
                    "Authorization": `Bearer ${token}`
                },
            })
            .then((db_assigments) => db_assigments.json())
            .then((data) => {
               // db_assigments = data;
                console.log(data)
            })
            .catch((error) => console.log(error.message))


    var name = '';
    var cont = document.querySelectorAll(".menu li")
    var inic = document.getElementById("ativado");
    var ind = 0;


    for (var i = 0; i < comp.dados.length; i++) {
        if (comp.dados[i].rubric != undefined) {
            name = `<li class="act">${comp.dados[i].name}</li>`;
            cont[ind].innerHTML = name
            ind++
        }
    }
    //Define o valor inicial da caixa dropdrwon
    inic.innerHTML = cont[0].innerHTML
    inic.style.listStyle = 'none';
}




//Busca a lista de rúbricas no arquivo API_Canvas/assigments.js
function carregaAtri() {
    var compet = []
    var ind = 0
    
    var select = document.querySelector("#ativado").textContent
    for (v = 0; v < comp.dados.length; v++) {
        if (comp.dados[v].rubric != undefined) {
            id_curso = comp.dados[v].id
            ind_dados = v

            rubricas_etp = retornaRubrica(id_curso, ind_dados)

            let atividade = {
                index: ind + 1,
                id: comp.dados[v].id,
                nome: comp.dados[v].name,
                nota: null,
                url: comp.dados[v].html_url,
                rubrica: rubricas_etp
            }
            ind++
            compet.push(atividade)
        }
    }

    //preenche a tabela com as habilidades da caixa de seleçao
    var lista_habilidades = ''

    for (i = 0; i < compet.length; i++) {
        if (compet[i].nome == select) {
            for (y = 0; y < compet[i].rubrica.length; y++) {
                for (x = 0; x < compet[i].rubrica[y].ratings.length; x++) {
                    switch (compet[i].rubrica[y].ratings[x].points) {
                        case 0:
                            lista_habilidades += `<tr>        
                    <td class="habil">${compet[i].rubrica[y].description}-${compet[i].rubrica[y].long_description}</td>                                 
                    <td ><div><i class="fa fa-2x fa-battery-empty"></i></div><spam class="descri">${compet[i].rubrica[y].ratings[x].description}</spam></td>                    
                    </tr>`
                            break
                        case 6:
                            lista_habilidades += `<tr>        
                    <td class="habil">${compet[i].rubrica[y].description}-${compet[i].rubrica[y].long_description}</td>                                 
                    <td ><div><i class="fa fa-2x fa-battery-quarter"></i></div><spam class="descri">${compet[i].rubrica[y].ratings[x].description}</spam></td>                    
                    </tr>`
                            break
                        case 10:
                            lista_habilidades += `<tr>        
                    <td class="habil">${compet[i].rubrica[y].description}-${compet[i].rubrica[y].long_description}</td>                                 
                    <td ><div><i class="fa fa-2x fa-battery-three-quarters"></i></div><spam class="descri">${compet[i].rubrica[y].ratings[x].description}</spam></td>                    
                    </tr>`
                            break
                        case 12:
                            lista_habilidades += `<tr>        
                    <td class="habil">${compet[i].rubrica[y].description}-${compet[i].rubrica[y].long_description}</td>                                 
                    <td ><div><i class="fa fa-2x fa-battery-full"></i></div><spam class="descri">${compet[i].rubrica[y].ratings[x].description}</spam></td>                    
                    </tr>`
                            break
                        default:
                            lista_habilidades += `<tr>        
                    <td class="habil">${compet[i].rubrica[y].description}-${compet[i].rubrica[y].long_description}</td>                                 
                    <td ><div><i class="fa fa-2x fa-battery-empty empty-na"></i></div><spam class="descri">${compet[i].rubrica[y].ratings[x].description}</spam></td>                    
                    </tr>`
                            break
                    }
                }
            }
        }
    }
    document.getElementById('habilidade').innerHTML = lista_habilidades;
}




//retorna os habilidades de cada etapa [arquivo assgments.js]
function retornaRubrica(id, ind) {
    myarray = []
    var score = []

    for (h = 0; h < comp.dados[ind].rubric.length; h++) {
        score = retornaAvaliaRubrica(id, comp.dados[ind].rubric[h].id)
        if (score.length > 0) {
            let habil = {
                id: comp.dados[ind].rubric[h].id,
                description: comp.dados[ind].rubric[h].description,
                long_description: comp.dados[ind].rubric[h].long_description,
                ratings: score
            }
            myarray.push(habil)
        } else {
            let habil = {
                id: comp.dados[ind].rubric[h].id,
                description: comp.dados[ind].rubric[h].description,
                long_description: comp.dados[ind].rubric[h].long_description,
                ratings: [{
                    id: null,
                    description: "N/A",
                    points: null,
                    index: null
                }]
            }
            myarray.push(habil)
        }
    }
    return myarray
}



//retorna avaliacao das habilidades do arquivo grades.js
function retornaAvaliaRubrica(idCurso, idRubrica) {
    pointRub = []

    try {
        for (i = 0; i < db_nota_ativ.length; i++) {
            if (db_nota_ativ[i].assignment_id == idCurso) {
                // console.log(db_nota_ativ[i].assignment_id)
                for (y = 0; y < db_nota_ativ[i].full_rubric_assessment.data.length; y++) {
                    if (db_nota_ativ[i].full_rubric_assessment.data[y].criterion_id == idRubrica) {
                        let nota = {
                            id: db_nota_ativ[i].full_rubric_assessment.data[y].id,
                            description: db_nota_ativ[i].full_rubric_assessment.data[y].description,
                            points: db_nota_ativ[i].full_rubric_assessment.data[y].points,
                            index: y
                        }
                        pointRub.push(nota)
                    }
                }
            }
        }
    } catch {
        let nota = {
            id: null,
            description: "N/A",
            points: null
        }
        pointRub.push(nota)
    }
    return pointRub
}







