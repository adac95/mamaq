export default function slider() {
    const $prev = document.getElementById("slideArrowLBtn");
    const $next = document.getElementById("slideArrowRBtn");
    const $slide = document.querySelectorAll(".slide");
    
    let i = 0;

    document.addEventListener("click", e => {
        if(e.target === $prev) {
            $slide[i].classList.remove("slide-active");
            i--;
            
            if(i<0) i = $slide.length -1;
            $slide[i].classList.add("slide-active");
        };

        if(e.target === $next) {
            $slide[i].classList.remove("slide-active");
            i++;
            
            if(i > $slide.length -1) i= 0;
            $slide[i].classList.add("slide-active");
        }
    })
}

