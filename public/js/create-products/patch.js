export default function patch(table, url) {
    table.addEventListener("click", async e => {

        try {
            let id = e.target.dataset._id;
            const trs = [...document.querySelectorAll(".item-tr")];

            let $input, $input1, $input2;

            // PATCH

            const tr = trs.find(el => el.dataset._id == id)

            if (e.target.textContent === "Editar") {



                const $input = document.createElement("input");
                const $input1 = document.createElement("input");
                const $input2 = document.createElement("input");
                $input.type = "text"
                $input1.type = "text"
                $input2.type = "text"
                // console.log(tr)

                tr.querySelector(".item-name").textContent = ""
                tr.querySelector(".item-name").appendChild($input).value = tr.dataset.name
                tr.querySelector(".item-price").textContent = ""
                tr.querySelector(".item-price").appendChild($input1).value = tr.dataset.price
                tr.querySelector(".item-category").textContent = ""
                tr.querySelector(".item-category").appendChild($input2).value = tr.dataset.category


                addEventListener("keyup", el => {

                    e.target.dataset.name = $input.value
                    e.target.dataset.price = $input1.value
                    e.target.dataset.category = $input2.value
                })

                e.target.textContent = "Aceptar"
                tr.querySelector(".delete-btn").textContent = "Cancelar"
            } else if (e.target.textContent === "Cancelar") {


                // console.log("object")
                tr.querySelector(".item-name").textContent = tr.dataset.name
                tr.querySelector(".item-price").textContent = tr.dataset.price
                tr.querySelector(".item-category").textContent = tr.dataset.category
                tr.querySelector(".edit-btn").textContent = "Editar"
                e.target.textContent = "Eliminar"
            } else if (e.target.textContent === "Aceptar") {

                let options = {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        name: e.target.dataset.name,
                        price: e.target.dataset.price,
                        category: e.target.dataset.category
                    })
                };
                // console.log(options.body)

                let res = await fetch(`${url}/${e.target.dataset._id}`, options);
                let json = await res.json();
                tr.querySelector(".item-name").textContent = e.target.dataset.name
                tr.querySelector(".item-price").textContent = e.target.dataset.price
                tr.querySelector(".item-category").textContent = e.target.dataset.category
                tr.dataset.name = e.target.dataset.name
                tr.dataset.price = e.target.dataset.price
                tr.dataset.category = e.target.dataset.category

                e.target.textContent = "Editar"
                
                tr.querySelector(".delete-btn").textContent = "Eliminar"

            }
        } catch (error) {
            console.log(error, "error al actualizar")
        }

    }
    )
}