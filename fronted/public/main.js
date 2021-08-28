import mobileNav from "./js/index/mobile-nav.js";
import slider from "./js/index/slider.js";
import inputValidation from "./js/reservas/input-validation.js";
import responsiveMap from "./js/reservas/responsive-map.js"
import crud from "./js/create-products/main-crud.js";
import signin from "./js/admin/signin.js"
import goToCreateProductsLink from "./js/admin/goToCreateProductsLink.js";


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

        case "/admin":
            signin()
            // goToCreateProductsLink()
            break;

        case "/admin/create-products":
            crud()
            break;
    }

})