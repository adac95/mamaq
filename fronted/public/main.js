import mobileNav from "./js/index/mobile-nav.js";
import slider from "./js/index/slider.js";
import inputValidation from "./js/reservas/input-validation.js";
import responsiveMap from "./js/reservas/responsive-map.js"
import crud from "./js/create-products/main-crud.js";
import addProductsToCart from "./js/carta/index.js"


document.addEventListener("DOMContentLoaded", () => {
    mobileNav()
    let path = window.location.pathname;

    switch (path) {
        case "/":
            slider()
            break;

        case "/reservas":
            inputValidation()
            responsiveMap()
            break;

        case "/carta":
            addProductsToCart()
            break;

        case "/admin/create-products":
            crud()
            break;
    }

})