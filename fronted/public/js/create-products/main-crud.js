import getAll from './get.js'
import post from './post.js'
import patch from './patch.js'
import deleteProduct from './delete-product.js'
// import {port} from "../../../backend/config/index.js"

const apiUrl = `/api/products`

const d = document,
    $table = d.querySelector(".items-table"),
    $template = d.getElementById("items-template").content,
    $fragment = d.createDocumentFragment();


post(apiUrl)
getAll(apiUrl, $table, $template, $fragment);
// delete tiene que ir antes que patch porque sino al presionar cancelar patch se manda como peticion delete
deleteProduct($table, apiUrl)
patch($table, apiUrl)
