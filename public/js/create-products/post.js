
export default function post(url) {

    document.addEventListener("submit", async e => {
    
        const $form = document.getElementById("createForm");
        if (e.target == $form) { e.preventDefault() }
        try {
            let options = {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    name: e.target.name.value,
                    price: e.target.price.value,
                    category: e.target.category.value,
                })
            };

            let res = await fetch(url, options);

            let json = await res.json();

            $form.reset()
            location.reload();
            // getAll();


        } catch (error) {
            console.log(e.error)
        }
    })

}