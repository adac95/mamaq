import mobileNav from "./js/index/mobile-nav.js";
import slider from "./js/index/slider.js";
import inputValidation from "./js/reservas/input-validation.js";
import responsiveMap from "./js/reservas/responsive-map.js"
import crud from "./js/create-products/main-crud.js";
import { addProductsToCart, setCounterDom } from "./js/carta/index.js"
import { cartBtnAddProduct, cartBtnLessProduct }from './js/cart/index.js'


document.addEventListener("DOMContentLoaded", async () => {
    mobileNav()
    await setCounterDom("cartCounterHeaderNav")
    const path = window.location.pathname;

    switch (path) {
        case "/":
            slider()
            break;

        case "/reservas":
            inputValidation()
            responsiveMap()
            break;

        case "/carta":
            addProductsToCart(".template-btn-cart")
            break;

        case "/cart":
            await setCounterDom("cartCounterCheckoutCart")
            await cartBtnAddProduct()
            await cartBtnLessProduct()
            break;

        case "/admin/create-products":
            crud()
            break;
    }

})