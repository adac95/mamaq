export default class CrudService {
    constructor(URI) {
        this.URI = URI;   
    }

    setHeaders() {
        return {
            "Content-type": "application/json; charset=utf-8",
            "x-access-token": this.getCookie("token")
        }
    }
    // TOKEN
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    async getData() {
        try {
            let options = {
                method: "GET",
                headers: this.setHeaders()
            };
            let res = await fetch(this.URI, options)
            let json = await res.json();
            return json

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
                headers: {"x-access-token": this.getCookie("token")},
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

    async patchData(data, id) {
        try {
            let options = {
                method: "PATCH",
                headers: this.setHeaders(),
                body: JSON.stringify(data)
            };
            let res = await fetch(`${this.URI}/${id}`, options);
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
                headers: this.setHeaders(),
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

