export default function mobileNav() {
    const $menuBtn = document.getElementById("menuBtn");
    const $nav = document.getElementById("nav");
    
    document.addEventListener("click", e => {
        if(e.target === $menuBtn) {
            $nav.classList.toggle("nav-active");
        }
        
        if(e.target.matches(".nav__a") || e.target.matches(".img-nav")) {
            $nav.classList.remove("nav-active");
        }
    })
}