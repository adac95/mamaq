
export default function post(url) {

    document.addEventListener("submit", async e => {
        // const $formImg = document.getElementById("product-image")
        const $form = document.getElementById("createForm");
        if (e.target == $form) { 
            e.preventDefault() 
            
            try {
            const formData = new FormData($form);
            let options = {
                method: "POST",
                // headers: {
                //     "content-type": "multipart/form-data;"
                // },
                body: formData
                // body: JSON.stringify({
                    // name: e.target.name.value,
                    // price: e.target.price.value,
                    // category: e.target.category.value,
                    // description: e.target.description.value,
                    // createProductImg: e.target.createProductImg.file
                // }),
                // file: formData
            };

             await fetch(url, options);
            // let json = await res.json();

            $form.reset()
            location.reload();
            // getAll();


        } catch (error) {
            console.log(error)
        }
    }
    })

}