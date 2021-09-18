const store = require('./store');
const ShoppingCartModel = require('../models/ShoppingCart');
const UserModel = require('../models/Users')

async function getCarts() {
    const carts = await store.getCarts()
    return carts;
}

async function getOneCart(id) {
    const cart = await store.getOneOfCart(id);
    return cart;
}

async function deleteCart(id) {
    const cart = await store.deleteCart(id);
    return cart;
}

async function patchCart({cartId, products_id, cantidad}) {
    // valida que llegue el id y la data para actualizar
    if (!cartId || !products_id || !cantidad) {
        const message = "faltan datos para actualizar tu carrito de compras"
        console.log(message)
        return message
    }
    const cart = await ShoppingCartModel.findById(cartId)
    const findingIdProductToPatch = cart.products.find(e => e._id == products_id)
    findingIdProductToPatch.cantidad = cantidad;
    const cartUpdated = await cart.save()
    return cartUpdated
}

async function deleteOneProductOfCart({ cartId, products_id }) {
    const cart = await ShoppingCartModel.findById(cartId)
    const findingIdProduct = cart.products.find(e => e._id == products_id)
    const index = cart.products.indexOf(findingIdProduct)
    if (index > -1) {
        cart.products.splice(index, 1);
    }
    const deleteCart = await cart.save()

    return deleteCart;
}

async function addProductToCart({ userId, productId, cantidad, price }) {
    try {
        // verificar que vengan todos los datos
        if (!userId || !productId || !cantidad || !price) {
            const message = "faltan datos"
            console.log(message)
            console.log(object)
            return message
        }
        // verificar que el usuario exista
        const user = await UserModel.findById(userId)
        if (!user) {
            const message = "El usuario no existe"
            console.log(message);
            return message
        }
        // verificar que exista el carrito o crear uno
        const userCart = await ShoppingCartModel.findOne({ "userId": userId });
        if (!userCart) {
            const newCart = await ShoppingCartModel({ userId, products: [{ productId, cantidad, price }] })
            await newCart.save()
            return newCart;
        } else {
            await userCart.products.push({ productId, cantidad, price })
            await userCart.save()
            return userCart
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCarts,
    getOneCart,
    addProductToCart,
    patchCart,
    deleteOneProductOfCart,
    deleteCart,
}