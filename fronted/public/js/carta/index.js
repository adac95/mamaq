import CrudService from "./CrudService.js";

const crudService = new CrudService()

export default function addProductsToCart() {
    document.addEventListener("click", async e => {
        try {
            if (e.target.matches(".template-btn-cart")) {
                const { productid, userid, productprice } = e.target.dataset
                const dataToAdd = {
                    userId: userid,
                    products: [
                        {
                            productId: productid,
                            price: productprice,
                            cantidad: 1
                        }
                    ]
                }
                await crudService.addProductToCart(dataToAdd)
            }
        } catch (error) {
            console.log(error)
        }
    })

}
