import mobileNav from "./index/mobile-nav.js";
import slider from "./index/slider.js";
import inputValidation from "./reservas/input-validation.js";
import responsiveMap from "./reservas/responsive-map.js"
import getCarta from "./carta/get-carta.js"

const apiUrl = "http://localhost:3001/api/products"

document.addEventListener("DOMContentLoaded", () => {
    mobileNav()
    let path = window.location.pathname;

    switch (path) {
        case "/":
            slider()
            break;
    
        case "/reservas":
            inputValidation(),
            responsiveMap()
            break;

        // case "/carta":
        //     getCarta(apiUrl)
        //     break;
    }

})