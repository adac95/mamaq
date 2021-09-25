import { addProductsToCart, getCart } from '../carta/index.js'
import CrudService from '../carta/CrudService.js'
const crudService = new CrudService()

export async function cartBtnAddProduct() {
    try {
        addProductsToCart(".cartAddBtn", "cartCounterCheckoutCart", "cartCounterHeaderNav")
    } catch (error) {
        console.log(error)
    }
}

export async function cartBtnLessProduct() {
    try {
        document.addEventListener("click", async e => {
            if (e.target.matches(".cartLessBtn")) {
                const cart = await getCart()
                const cartid = cart.body[0]._id

                const { productcantidad, products_id } = e.target.dataset
                const cantidad = parseFloat(productcantidad) - 1
                const dataToPatch = {
                    cartId: cartid,
                    products: [
                        {
                            products_id,
                            cantidad
                        }
                    ]
                }
                const res = await crudService.patchCart(dataToPatch)
                location.reload()
            }
        })
    } catch (error) {
        console.log(error)
    }
}