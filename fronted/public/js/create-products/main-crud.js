import getAll from './get.mjs'
import post from './post.mjs'
import patch from './patch.mjs'
import deleteProduct from './delete-product.mjs'


export default function crud() {
    const apiUrl = `/api/products`;
    const $table = document.querySelector(".items-table");
    const $template = document.getElementById("items-template").content;
    const $fragment = document.createDocumentFragment();

    // TOKEN
    function check_cookie_name(token) {
        const match = document.cookie.match(new RegExp('(^| )' + token + '=([^;]+)'));
        if (match) {
            console.log(match[2]);
            let token = match[2]
            return token
        }
        else {
            console.log('error al recuperar el token');
        }
    }
    const token = check_cookie_name("token");

    document.addEventListener("load", getAll(apiUrl, $table, $template, $fragment))

    document.addEventListener("submit", e => {
        post(e, apiUrl, $table, $template, $fragment, token)
    })

    document.addEventListener("click", e => {
        if (e.target.matches(".edit-btn") || e.target.matches((".delete-btn"))) {
            deleteProduct(e, apiUrl, token)
            // delete tiene que ir antes que patch porque sino al presionar cancelar patch se manda como peticion delete
            patch(e, apiUrl, token)
        }
    })

}

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
