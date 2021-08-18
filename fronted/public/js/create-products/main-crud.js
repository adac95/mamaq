import getAll from './get.mjs'
import post from './post.mjs'
import patch from './patch.mjs'
import deleteProduct from './delete-product.mjs'

const apiUrl = `/api/products`;
const $table = document.querySelector(".items-table");
const $template = document.getElementById("items-template").content;
const $fragment = document.createDocumentFragment();


document.addEventListener("load", getAll(apiUrl, $table, $template, $fragment)) 

document.addEventListener("submit",e=> {
    post(e,apiUrl, $table, $template, $fragment,getAll)
} ) 

document.addEventListener("click", e=> {
    if(e.target.matches(".edit-btn") || e.target.matches((".delete-btn"))){
        deleteProduct(e, apiUrl)
        // delete tiene que ir antes que patch porque sino al presionar cancelar patch se manda como peticion delete
        patch(e, apiUrl)
    }
})

// PROBANDO... CON CLASES EN LA CARPETA DE PROBANDO 
// import RenderProducts from './probando/Render.js'
// const render = new RenderProducts();
// const $form = document.getElementById("createForm");
//     render.getProducts($table, $template, $fragment)
//     document.addEventListener("submit", async e => {
//         if (e.target == $form) { 
//             e.preventDefault() 
//             render.addProduct()
//         }})
            