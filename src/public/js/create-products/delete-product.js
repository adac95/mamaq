export default function deleteProduct(table, url) {
    table.addEventListener("click", async e => {

        if (e.target.textContent === "Eliminar") {
            try {

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
                
            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                alert(`Error ${err.status}: ${message}`);
            }
        };

    })
}