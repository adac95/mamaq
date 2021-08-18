export default async function deleteProduct(e, url) {
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
            $td.appendChild($div)
            console.log(e.target)
            e.target.textContent = "No Eliminar"
            $td.querySelector(".edit-btn").textContent = "Sí Eliminar"

        }
        else if (e.target.textContent === "No Eliminar") {
            e.target.textContent = "Eliminar"
            $td.querySelector(".edit-btn").textContent = "Editar"
            $td.removeChild($td.querySelector(".delete-warningMessage"))
            return false
        }
        else if (e.target.textContent === "Sí Eliminar") {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            };
            let res = await fetch(`${url}/${e.target.dataset._id}`, options);
            let json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText }

            location.reload();
        }
    } catch (err) {
        console.log(err)
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
    }
};