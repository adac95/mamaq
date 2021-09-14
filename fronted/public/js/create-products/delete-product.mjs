import CrudService from "./CrudService.mjs"

export default async function deleteProduct(e, url) {
    try {
        // Variables Globales
        const globals = {}
        // ENCONTRANDO EL ID DEL PRODUCTO PRESIONADO
        const id = e.target.dataset._id

        // ENCONTRANDO EL TR CORRESPONDIENTE AL BOTON ID
        const $tr = [...document.querySelectorAll(".item-tr-fetch")].find(el => el.dataset._id == id)

        // ESCOGIENDO EL TD DE LOS BOTONES
        const $td = $tr.querySelector(".td-btn")

        // CREANDO UN DIV E INGRESANDO EL MENSAJE 
        const $div = document.createElement("DIV")
        $div.classList.add("delete-warningMessage")
        $div.textContent = "SEGURO QUE DESEA ELIMINAR?"

        // Agregando variables globales
        globals.e = e
        globals.url = url
        globals.$td = $td
        globals.$div = $div
        
        if (e.target.textContent === "Eliminar") {
            deleteWarning(globals)
        }
        else if (e.target.textContent === "No Eliminar") {
            deleteCancel(globals)
        }
        else if (e.target.textContent === "Sí Eliminar") {
            deleteRequest(globals)
        }
    } catch (err) {
        console.log(err)
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
    }
};

function deleteWarning(globals) {
    const {$td, $div, e} = globals 
    $td.appendChild($div)
    e.target.textContent = "No Eliminar"
    $td.querySelector(".edit-btn").textContent = "Sí Eliminar"
}

function deleteCancel(globals) {
    const {$td, e} = globals 
    e.target.textContent = "Eliminar"
    $td.querySelector(".edit-btn").textContent = "Editar"
    $td.removeChild($td.querySelector(".delete-warningMessage"))
    return false
}

async function deleteRequest(globals) {
    const {url, e} = globals 
    const crudService = new CrudService(url)
    await crudService.deleteData(e.target.dataset._id)
    location.reload();
}