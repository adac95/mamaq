import getAll from './get.mjs'
import post from './post.mjs'
import patch from './patch.mjs'
import deleteProduct from './delete-product.mjs'


export default async function crud() {
    const apiUrl = `/api/products`;
    const $table = document.querySelector(".items-table");
    const $template = document.getElementById("items-template").content;
    const $fragment = document.createDocumentFragment();

    document.addEventListener("load", getAll(apiUrl, $table, $template, $fragment))
    document.addEventListener("submit", e => {
        post(e, apiUrl)
    })
    document.addEventListener("click", e => {
        if (e.target.matches(".edit-btn") || e.target.matches((".delete-btn"))) {
            deleteProduct(e, apiUrl)
            // delete tiene que ir antes que patch porque sino al presionar cancelar patch se manda como peticion delete
            patch(e, apiUrl)
        }
    })

}
