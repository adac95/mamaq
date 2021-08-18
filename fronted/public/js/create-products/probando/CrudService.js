export default class CrudService {
    constructor(URI) {
        this.URI = URI;
    }

    async getData() {
        try {
            let res = await fetch(this.URI)
            let {body, error} = await res.json();
            return body

        } catch (error) {
            let message = `${error}, ${error.statusText}` || "Ocurrio un error al recibir los datos"
            console.log(error)
            return message;
        }
    }

    async postData(data) {
        try {
            let options = {
                method: "POST",
                body: data
            };
            let res = await fetch(this.URI, options);
            let json = await res.json();
            return json

        } catch (error) {
            let message = error.statusText || "Ocurrio un error al enviar los datos"
            console.log(error)
            return message;
        }
    }

    async patchData(data) {
        try {
            let options = {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(data)
            };
            let res = await fetch(`${this.URI}/${data._id}`, options);
            let json = await res.json();
            return json
        } catch (error) {
            let message = error.statusText || "Ocurrio un error al actualizar los datos"
            console.log(error)
            return message;
        }
    }

    async deleteData(id) {
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            };
            let res = await fetch(`${this.URI}/${id}`, options);
            let json = await res.json();
            if (!res.ok) throw { status: res.status, statusText: res.statusText }
            return json

        } catch (err) {
            let message = err.statusText || "Ocurrió un error al elimnar los datos";
            console.log(error)
            return message;
        }
    }
}

