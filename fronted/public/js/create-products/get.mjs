import CrudService from "./probando/CrudService.mjs";


export default async function getAll(url, table, template, fragment) {
    try {
        const crudService = new CrudService(url)
        let res = await crudService.getData()
        const { body, error } = res;

        if (error) throw { error: `error al solicitar productos: ${error}` }

        body.forEach(el => {
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
            template.querySelector(".edit-btn").dataset._id = el._id;
            template.querySelector(".item-tr-fetch").dataset._id = el._id;
            template.querySelector(".item-tr-fetch").dataset.name = el.name;
            template.querySelector(".item-tr-fetch").dataset.price = el.price;
            template.querySelector(".item-tr-fetch").dataset.category = el.category;
            template.querySelector(".item-tr-fetch").dataset.description = el.description;
            template.querySelector(".delete-btn").dataset._id = el._id;

            let clone = document.importNode(template, true);
            fragment.appendChild(clone);
        });

        table.querySelector("tbody").appendChild(fragment);


    } catch (error) {
        let message = error.statusText || "ocurrio un error"
        console.log(error)
        table.textContent = message
    }
}