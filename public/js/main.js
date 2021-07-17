import mobileNav from "./index/mobile-nav.js";
import slider from "./index/slider.js";
import inputValidation from "./reservas/input-validation.js";
import responsiveMap from "./reservas/responsive-map.js"

document.addEventListener("DOMContentLoaded", () => {
    mobileNav(),
    slider(),
    inputValidation(),
    responsiveMap()
})