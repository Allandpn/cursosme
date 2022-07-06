


async function dropdown_ative(token, id) {



    
    res = await fetch('https://pucminas.instructure.com/api/v1/courses/87896/assignments?per_page=2000',
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })



        .then((res) => res.json())
        .then((data) => {

        

            var name = '';
            var cont = 0

            for (var i = 0; i < data.length; i++) {
                if (data[i].rubric != undefined) {
                    name += `<li class="act">${data[i].name}</li>`;
                }
                if(data[i].name.includes('etapa 1')){
                  
                    cont = cont + i
                }
            }

          
            $('#li_dropdown').html(name)
            $('#ativado').html(data[cont].name)

            carregaAtri(data, id)




            const dropdowns = document.querySelectorAll(".dropdown");

            var set;


            dropdowns.forEach(dropdown => {
                const ativo = dropdown.querySelector(".ativo");
                const caret = dropdown.querySelector(".caret");
                const menu = dropdown.querySelector(".menu");
                const options = dropdown.querySelectorAll(".act");
                const ativado = dropdown.querySelector(".ativado");



                ativo.addEventListener("click", () => {

                    ativo.classList.toggle("ativo-clicked");
                    caret.classList.toggle("caret-rotate");
                    menu.classList.toggle("menu-open")

                });

                options.forEach(option => {


                    option.addEventListener('click', () => {


                        ativado.textContent = option.textContent;
                        ativo.classList.remove("ativo-clicked");
                        caret.classList.remove("caret-rotate");
                        menu.classList.remove("menu-open");

                        options.forEach(option => {
                            option.classList.remove("active");
                        });

                        carregaAtri(data, id)
                    });

                });
            });

        })

        .catch((error) => console.log(error.message))



}



//Busca a lista de rúbricas no arquivo API_Canvas/assigments.js
function carregaAtri(data, id) {

    var compet = []
    var ind = 0
    rubricas_etp = []

    var select = document.querySelector("#ativado").textContent

    rubricas_etp = retornaRubrica(data, select, id)

}




//retorna os habilidades de cada etapa [arquivo assgments.js]
function retornaRubrica(data, select, id) {
//console.log(data)

    myarray = []
    var _score = []
    var score = ''

    for (i = 0; i < data.length; i++) {
        if (data[i].name == select) {

            for (y = 0; y < data[i].rubric.length; y++) {

                let rubric = {
                    id_curse: data[i].id,
                    id_rubric: data[i].rubric[y].id,
                    curta_descri: data[i].rubric[y].description,
                    loga_descri: data[i].rubric[y].long_description
                }

                _score.push(rubric)

            }
        }
    }


    score = retornaAvaliaRubrica(_score, data, id)


    return score
}



//retorna avaliacao das habilidades do arquivo grades.js
function retornaAvaliaRubrica(score, data, id) {

    var token = JSON.parse(localStorage.getItem('token'))


    var dados = data

    var idcurso = score[0].id_curse

    var pointRub = []

    res = fetch(`https://pucminas.instructure.com/api/v1/courses/87896/assignments/${idcurso}/submissions/${id}?include[]=full_rubric_assessment&per_page=1000`,
        {
            method: "get",
            headers: {

                "Authorization": `Bearer ${token}`
            },
        })



        .then((res) => res.json())
        .then((data) => {

           

            try {

                for (y = 0; y < score.length; y++) {
                    for (i = 0; i < data.full_rubric_assessment.data.length; i++) {
                        if (score[y].id_rubric === data.full_rubric_assessment.data[i].criterion_id) {
                            let nota = {

                                'id': idcurso,
                                'description': score[y].curta_descri,
                                'long_description': score[y].loga_descri,
                                'points': data.full_rubric_assessment.data[y].points,
                                'ratings': {
                                    'id': score[y].id_rubric,

                                    'index': y
                                }

                            }
                            pointRub.push(nota)

                        }

                    }
                }
                if (pointRub.length != score.length) {
                    for (i = data.full_rubric_assessment.data.length; i < score.length; i++) {

                        let nota = {

                            id: idcurso,
                            description: score[i].curta_descri,
                            long_description: score[i].loga_descri,
                            points: null,
                            ratings: {
                                id: null,

                                index: y
                            }


                        }

                        pointRub.push(nota)
                    }
                }

            } catch {

                console.log('2 catch')
                for (i = 0; i < score.length; i++) {
                    let nota = {

                        id: idcurso,
                        description: score[i].curta_descri,
                        long_description: score[i].loga_descri,
                        points: null,
                        ratings: {
                            id: null,

                            index: y
                        }


                    }

                    pointRub.push(nota)
                }
            }

            montaCurso(pointRub, dados)
        })

        .catch((error) => console.log(error.message))
}




function montaCurso(rubricas_etp, data) {

    var compet = []
    var ind = 0


    var select = document.querySelector("#ativado").textContent

    for (v = 0; v < data.length; v++) {
        if (data[v].name == select) {

            id_curso = data[v].id
            ind_dados = v



            let atividade = {
                index: ind + 1,
                id: data[v].id,
                nome: data[v].name,
                nota: null,
                url: data[v].html_url,
                rubrica: rubricas_etp
            }
            ind++

            compet.push(atividade)
        }
    }


    var lista_habilidades = ''
    objeto = compet[0]



    for (y = 0; y < compet[0].rubrica.length; y++) {





        switch (compet[0].rubrica[y].points) {
            case 0:
                lista_habilidades += `<tr>        
                       <td class="habil">${compet[0].rubrica[y].description}-${compet[0].rubrica[y].long_description}</td>                                 
                       <td ><div><i class="fa fa-2x fa-battery-empty"></i></div><spam class="descri">${compet[0].rubrica[y].description}</spam></td>                    
                       </tr>`

                break
            case 6:
                lista_habilidades += `<tr>        
                       <td class="habil">${compet[0].rubrica[y].description}-${compet[0].rubrica[y].long_description}</td>                                 
                       <td ><div><i class="fa fa-2x fa-battery-quarter"></i></div><spam class="descri">${compet[0].rubrica[y].description}</spam></td>                    
                       </tr>`

                break
            case 10:
                lista_habilidades += `<tr>        
                       <td class="habil">${compet[0].rubrica[y].description}-${compet[0].rubrica[y].long_description}</td>                                 
                       <td ><div><i class="fa fa-2x fa-battery-three-quarters"></i></div><spam class="descri">${compet[0].rubrica[y].description}</spam></td>                    
                       </tr>`

                break
            case 12:
                lista_habilidades += `<tr>        
                       <td class="habil">${compet[0].rubrica[y].description}-${compet[0].rubrica[y].long_description}</td>                                 
                       <td ><div><i class="fa fa-2x fa-battery-full"></i></div><spam class="descri">${compet[0].rubrica[y].description}</spam></td>                    
                       </tr>`
                break
            default:
                lista_habilidades += `<tr>        
                       <td class="habil">${compet[0].rubrica[y].description}-${compet[0].rubrica[y].long_description}</td>                                 
                       <td ><div><i class="fa fa-2x fa-battery-empty empty-na"></i></div><spam class="descri">${compet[0].rubrica[y].description}</spam></td>                    
                       </tr>`
                break
        }
    }




    document.getElementById('habilidade').innerHTML = lista_habilidades;


}