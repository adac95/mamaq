
export default async function getCarta(url) {

    const $container = document.getElementById("cartaContainer")
    const $template = document.getElementById("cartaTemplate").content;
    const $fragment = document.createDocumentFragment();
    
    try{
        let res = await fetch(url)
        let json = await res.json();
        const { body, error } = json;
        // console.log(body);
        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        body.forEach(el => {
            $template.querySelector(".template-product").textContent = el.name;
            $template.querySelector(".template-description").textContent = el.description;
            $template.querySelector(".template-category").textContent = el.category;
            $template.querySelector(".template-price").textContent = el.price;
            let clone = document.importNode($template, true);
            $fragment.appendChild(clone);
        });

        $container.appendChild($fragment)


    }catch(error){
        let message = error.statusText || "ocurrio un error"
        console.log(error)
        document.querySelector("body").insertAdjacentText("afterend", message);
    }
}