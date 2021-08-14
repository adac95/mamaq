import mobileNav from "./js/index/mobile-nav.js";
import slider from "./js/index/slider.js";
import inputValidation from "./js/reservas/input-validation.js";
import responsiveMap from "./js/reservas/responsive-map.js"
// import getCarta from "./carta/get-carta.js"


// CSS
// import './css/inicio.css'
// import './css/reservas.css'
// import './css/carta.css'
// import './css/header_MQ.css'
// import './css/inicio_MQ.css'
// import './css/footer_MQ.css'
// import './css/reservas_MQ.css'

const apiUrl = `/api/products`

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