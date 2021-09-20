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
        const res = await crudService.getCart()
        return res
    } catch (error) {
        console.log(error)
    }

}

async function getCartCounter() {
    try {
        const res = await getCart()
        let totalCartProducts = 0;
        res.body[0].products.forEach(el => {
            totalCartProducts += el.cantidad
            return totalCartProducts
        });
        return totalCartProducts;
    } catch (error) {
        console.log(error)
    }
}

export async function setCounterDom() {
    const counter = await getCartCounter()
    const $cartCounter = document.getElementById("cartCounter")
    
    $cartCounter.textContent = counter   
}