import CrudService from "./probando/CrudService.mjs"

export default async function deleteProduct(e, url, token) {
    try {
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

        if (e.target.textContent === "Eliminar") {
            deleteWarning(e, $td)
        }
        else if (e.target.textContent === "No Eliminar") {
            deleteCancel(e, $td)
        }
        else if (e.target.textContent === "Sí Eliminar") {
            deleteRequest(e, url)
        }
    } catch (err) {
        console.log(err)
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
    }
};

function deleteWarning(e, $td) {
    $td.appendChild($div)
    e.target.textContent = "No Eliminar"
    $td.querySelector(".edit-btn").textContent = "Sí Eliminar"
}

function deleteCancel(e, $td) {
    e.target.textContent = "Eliminar"
    $td.querySelector(".edit-btn").textContent = "Editar"
    $td.removeChild($td.querySelector(".delete-warningMessage"))
    return false
}

function deleteRequest(e, url) {
    const crudService = new CrudService(url)
    await crudService.deleteData(e.target.dataset._id)
    location.reload();
}