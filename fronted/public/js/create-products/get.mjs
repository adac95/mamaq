import CrudService from "./CrudService.mjs";

export default async function getAll(url, table, template, fragment) {
    try {
        // Peticion GET
        const crudService = new CrudService(url)
        const res = await crudService.getData()
        const { body, error } = res;

        if (error) throw { error: `error al solicitar productos: ${error}` }
        // Seteando el contenido del template
        body.forEach(el => {
            setTextContent(el, template)
            setDataset(el, template)
            cloneTemplate(fragment, template)
        });
        // Insertando el template al DOM
        table.querySelector("tbody").appendChild(fragment);

    } catch (error) {
        let message = error.statusText || "ocurrio un error"
        console.log(error)
        table.textContent = message
    }
}

function setTextContent(el, template) {
    template.querySelector(".item-name").textContent = el.name;
    template.querySelector(".item-price").textContent = el.price;
    template.querySelector(".item-category").textContent = el.category;
    template.querySelector(".item-description").textContent = el.description;
    // DANDOLE EL SRC Y ALT A LAS IMAGENES (SI ES QUE EXISTEN)
    if (el.imagen.path) {
        template.querySelector(".item-image__img").src = `../${el.imagen.path}`
        template.querySelector(".item-image__img").alt = el.imagen.originalname;
    } else {
        template.querySelector(".item-image__img").src = ""
        template.querySelector(".item-image__img").alt = "sin imagen"
    }
}

function setDataset(el, template) {
    template.querySelector(".edit-btn").dataset._id = el._id;
    template.querySelector(".item-tr-fetch").dataset._id = el._id;
    template.querySelector(".item-tr-fetch").dataset.name = el.name;
    template.querySelector(".item-tr-fetch").dataset.price = el.price;
    template.querySelector(".item-tr-fetch").dataset.category = el.category;
    template.querySelector(".item-tr-fetch").dataset.description = el.description;
    template.querySelector(".delete-btn").dataset._id = el._id;
}

function cloneTemplate(fragment, template) {
    const clone = document.importNode(template, true);
    fragment.appendChild(clone);
}