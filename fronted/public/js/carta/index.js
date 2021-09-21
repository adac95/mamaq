import CrudService from "./CrudService.js";

const crudService = new CrudService()

export function addProductsToCart() {
    document.addEventListener("click", async e => {
        try {
            if (e.target.matches(".template-btn-cart")) {
                const { productid, userid, productname, productprice } = e.target.dataset
                const dataToAdd = {
                    userId: userid,
                    products: [
                        {
                            productId: productid,
                            productName: productname,
                            price: productprice,
                            cantidad: 1
                        }
                    ]
                }
                await crudService.addProductToCart(dataToAdd)
                setCounterDom()
            }
        } catch (error) {
            console.log(error)
        }
    })
}

export async function getCart() {
    try {
        if (!crudService.getCookie("token")) {
            return false
        } else {
            const res = await crudService.getCart()
            return res
        }
    } catch (error) {
        console.log(error)
    }

}

async function getCartCounter() {
    try {
        const res = await getCart()
        let totalCartProducts = 0;
        // verificar que exista un usuario logeado desde la comprobacion del token
        if(!crudService.getCookie("token")) return false
        // verificar que exista al menos un producto en el carrito o poner 0 como defecto
        if (!res.body[0]) {
            return totalCartProducts
        } else {
            res.body[0].products.forEach(el => {
                totalCartProducts += el.cantidad
                return totalCartProducts
            });
        }
        return totalCartProducts;
    } catch (error) {
        console.log(error)
    }
}

export async function setCounterDom() {
    const counter = await getCartCounter()
    const $cartCounter = document.getElementById("cartCounter")
    if ($cartCounter) {
        $cartCounter.textContent = counter
    } else return false
}