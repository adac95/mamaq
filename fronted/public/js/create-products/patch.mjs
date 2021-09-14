import CrudService from "./CrudService.mjs";

export default async function patch(e, url) {
    try {
        // VARIABLES GLOBALES
        const globals = {}
        // identificar el id
        const id = e.target.dataset._id;
        // Traer todas las filas ()
        const trs = Array.from(document.querySelectorAll(".item-tr-fetch"));
        // encontrar la fila del id que necesitamos
        const tr = trs.find(el => el.dataset._id == id)
        // Agregando las variables globales
        globals.tr = tr
        globals.e = e
        globals.url = url

        // crear inputs para editar
        createInputs(globals)

        // BOTON EDITAR
        if (e.target.textContent === "Editar") {
            setInputsAndValues(globals)
        }
        // BOTON CANCELAR 
        else if (e.target.textContent === "Cancelar") {
            cancelRequest(globals)
        }
        // BOTON ACEPTAR
        else if (e.target.textContent === "Aceptar") {
            // SI NO SE LLEGA A ESCRIBIR NADA PARA ENVIAR PETICION PATCH SETEAR LOS VALORES YA PUESTOS Y NO HACER PETICION
            validateEmptyFields(globals)
            // MANDAR PETICION
            sendRequest(globals)
            // CAMBIAR LOS INPUTS POR LOS VALORES ACTUALIZADOS
            updateInputsAndValues(globals)
        }
    } catch (error) {
        console.log(error, "error al actualizar")
    }
}

function createInputs(globals) {
    // name
    const $input = document.createElement("input");
    // price
    const $input1 = document.createElement("input");
    // Select y sus options
    const $input2 = document.createElement("select");
    const $veggieOption = document.createElement("option");
    const $veganOption = document.createElement("option");
    const $meatOption = document.createElement("option");
    // description
    const $input3 = document.createElement("input");
    // img
    const $input4 = document.createElement("input")
    $input.type = "text"
    $input1.type = "number"
    $input3.type = "text"
    $input4.type = "file"
    $veggieOption.value = "Vegetariano"
    $veggieOption.text = "Vegetariano"
    $veganOption.value = "Vegano"
    $veganOption.text = "Vegano"
    $meatOption.value = "Carnivoro"
    $meatOption.text = "Carnivoro"
    // Crear div para mensaje de error en caso quieran mandar un input vacio
    const $divMessage = document.createElement("div");
    $divMessage.classList.add("divMessage")
    globals.$input = $input;
    globals.$input1 = $input1;
    globals.$input2 = $input2;
    globals.$input3 = $input3;
    globals.$input4 = $input4;
    globals.$veggieOption = $veggieOption;
    globals.$veganOption = $veganOption;
    globals.$meatOption = $meatOption;
    return globals
}

function setInputsAndValues(globals) {
    const { tr, e, $input, $input1, $input2, $input3, $meatOption, $veganOption, $veggieOption } = globals
    tr.querySelector(".item-name").textContent = ""
    tr.querySelector(".item-name").appendChild($input).value = tr.dataset.name
    tr.querySelector(".item-price").textContent = ""
    tr.querySelector(".item-price").appendChild($input1).value = tr.dataset.price
    tr.querySelector(".item-category").textContent = ""
    tr.querySelector(".item-category").appendChild($input2).value = tr.dataset.category
    tr.querySelector(".item-description").textContent = ""
    tr.querySelector(".item-description").appendChild($input3).value = tr.dataset.description
    // tr.querySelector(".item-description").appendChild($input3).value = tr.dataset.description
    $input2.appendChild($veggieOption)
    $input2.appendChild($veganOption)
    $input2.appendChild($meatOption)

    addEventListener("input", el => {
        e.target.dataset.name = $input.value
        e.target.dataset.price = $input1.value
        e.target.dataset.category = $input2.value
        e.target.dataset.description = $input3.value
    })

    // VALOR DE LOS BOTNOTES
    e.target.textContent = "Aceptar"
    tr.querySelector(".delete-btn").textContent = "Cancelar"
}

function cancelRequest(globals) {
    const { tr, e } = globals;
    tr.querySelector(".item-name").textContent = tr.dataset.name
    tr.querySelector(".item-price").textContent = tr.dataset.price
    tr.querySelector(".item-category").textContent = tr.dataset.category
    tr.querySelector(".item-description").textContent = tr.dataset.description
    // VALOR DE LOS BOTNOTES
    tr.querySelector(".edit-btn").textContent = "Editar"
    tr.querySelector(".edit-btn").disabled = false;
    e.target.textContent = "Eliminar"
    // Eliminar mensaje de error
    if (tr.querySelector(".divMessage")) {
        tr.removeChild(tr.querySelector(".divMessage"))
    }
}

function validateEmptyFields(globals) {
    const { tr, e, $divMessage } = globals;
    if (!e.target.dataset.name && !e.target.dataset.price && !e.target.dataset.category && !e.target.dataset.description) {
        console.log("vacio");
        tr.querySelector(".item-name").textContent = tr.dataset.name
        tr.querySelector(".item-price").textContent = tr.dataset.price
        tr.querySelector(".item-category").textContent = tr.dataset.category
        tr.querySelector(".item-description").textContent = tr.dataset.description
        // VALOR DE LOS BOTNOTES
        e.target.textContent = "Editar"
        tr.querySelector(".delete-btn").textContent = "Eliminar"

        return false
    }
    // Desabilitar boton y crear mensaje de error por si se envia un input vacio
    if (e.target.dataset.name === "" || e.target.dataset.price === "" || e.target.dataset.category === "" || e.target.dataset.description === "") {

        $divMessage.textContent = "no se pueden enviar campos vacios";
        tr.appendChild($divMessage);
        e.target.disabled = true;
        // Habilitar boton y eliminar mensaje de error al escribir sobre el input
        tr.addEventListener("input", el => {
            e.target.disabled = false;
            $divMessage.textContent = ""
        })
        return
    }
}

async function sendRequest(globals) {
    const { e, url } = globals;
    const body = {
        name: e.target.dataset.name,
        price: e.target.dataset.price,
        category: e.target.dataset.category,
        description: e.target.dataset.description
    }
    const crudService = new CrudService(url)
    const res = await crudService.patchData(body, e.target.dataset._id)
}

function updateInputsAndValues(globals) {
    const { tr, e } = globals;
    tr.querySelector(".item-name").textContent = e.target.dataset.name
    tr.querySelector(".item-price").textContent = e.target.dataset.price
    tr.querySelector(".item-category").textContent = e.target.dataset.category
    tr.querySelector(".item-description").textContent = e.target.dataset.description
    // ACTUALIZAR LOS DATASETS
    tr.dataset.name = e.target.dataset.name
    tr.dataset.price = e.target.dataset.price
    tr.dataset.category = e.target.dataset.category
    tr.dataset.description = e.target.dataset.description
    // VALOR DE LOS BOTNOTES
    e.target.textContent = "Editar"
    tr.querySelector(".delete-btn").textContent = "Eliminar"
}