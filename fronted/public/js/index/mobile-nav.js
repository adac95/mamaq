export default function mobileNav() {
    const $menuBtn = document.getElementById("menuBtn");
    const $nav = document.getElementById("navHeader");
    
    document.addEventListener("click", e => {
        if(e.target === $menuBtn) {
            $nav.classList.toggle("navHeader-active");
        }
        
        if(e.target.matches(".navHeader__a") || e.target.matches(".img-nav")) {
            $nav.classList.remove("navHeader-active");
        }
    })
}