import CrudService from "./CrudService.js";

const crudService = new CrudService()

export function addProductsToCart(classOrId, setCounterDomIdOne, setCounterDomIdTwo) {
    document.addEventListener("click", async e => {
        try {
            if (e.target.matches(classOrId)) {
                const { productid, userid, productname, productprice, productimagenpath } = e.target.dataset
                const dataToAdd = {
                    userId: userid,
                    products: [
                        {
                            productId: productid,
                            productName: productname,
                            productImagenPath: productimagenpath,
                            price: productprice,
                            cantidad: 1
                        }
                    ]
                }

                await crudService.addProductToCart(dataToAdd)
                // if(setCounterDomIdOne){
                //     await setCounterDom(setCounterDomIdOne)
                // }
                // if(setCounterDomIdTwo){
                //     await setCounterDom(setCounterDomIdTwo)
                // }

                location.reload()
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

export async function setCounterDom(setCounterDomId) {
    try {
        const counter = await getCartCounter()
        const $cartCounter = document.getElementById(setCounterDomId)
        if ($cartCounter) {
            $cartCounter.textContent = counter
        } else return false
    } catch (error) {
        console.log(error)
    }
}