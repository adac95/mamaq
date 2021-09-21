export default class CrudService {
    constructor() {
        this.URI = "/api/shoppingcart";
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

    // PARSE TOKEN
    parseJwt(token) {
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }else return false
    };

    async getCart() {
        try {
            let options = {
                method: "GET",
                headers: this.setHeaders()
            };
            const userId = this.parseJwt(this.getCookie("token")).id
            let res = await fetch(`${this.URI}/${userId}`, options)
            let json = await res.json();
            return json

        } catch (error) {
            let message = `${error}, ${error.statusText}` || "Ocurrio un error al recibir los datos"
            console.log(error)
            return message;
        }
    }

    async addProductToCart(data) {
        try {
            let options = {
                method: "POST",
                headers: this.setHeaders(),
                body: JSON.stringify(data)
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

    async patchCart(data, id) {
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

    async deleteCart(id) {
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
            console.log(err)
            return message;
        }
    }

    async deleteOneProductOfCart({ cartId, products_id }) {
        try {
            let options = {
                method: "DELETE",
                headers: this.setHeaders(),
            };
            let res = await fetch(`${this.URI}/${cartId}/${products_id}`, options);
            let json = await res.json();
            if (!res.ok) throw { status: res.status, statusText: res.statusText }
            return json

        } catch (err) {
            let message = err.statusText || "Ocurrió un error al elimnar los datos";
            console.log(err)
            return message;
        }
    }
}