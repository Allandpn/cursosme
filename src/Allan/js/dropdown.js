

const dropdowns = document.querySelectorAll(".dropdown");

var set ;


dropdowns.forEach(dropdown => {
    const ativo = dropdown.querySelector(".ativo");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
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
            
            carregaAtri()
        });
            
    }); 
});















