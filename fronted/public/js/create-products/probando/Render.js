import CrudService from "./CrudService.js";
import getAll from "../get.js";

const crudService = new CrudService(`/api/products`);

export default class RenderProducts {
    async getProducts(table, template, fragment) {
        try {
            const products = await crudService.getData()
            await products.forEach(el => {
                template.querySelector(".item-name").textContent = el.name;
                template.querySelector(".item-price").textContent = el.price;
                template.querySelector(".item-category").textContent = el.category;
                template.querySelector(".item-description").textContent = el.description;
                template.querySelector(".edit-btn").dataset._id = el._id;
                template.querySelector(".item-tr").dataset._id = el._id;
                template.querySelector(".item-tr").dataset.name = el.name;
                template.querySelector(".item-tr").dataset.price = el.price;
                template.querySelector(".item-tr").dataset.category = el.category;
                template.querySelector(".item-tr").dataset.description = el.description;
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

    async addProduct() {

        try {
            const $form = document.getElementById("createForm");
            const formData = new FormData($form);

            await crudService.postData(formData);
            this.getProducts();
            $form.reset()
            

        } catch (error) {
            console.log(error)
        }

    }
}