
export default function post(url) {

    document.addEventListener("submit", async e => {
        const $form = document.getElementById("createForm");
        if (e.target == $form) { 
            e.preventDefault() 
            
            try {
            const formData = new FormData($form);

            let options = {
                method: "POST",
                // headers: {
                    // "content-type": "multipart/form-data;"
                // },
                body: formData
            };

            let res =  await fetch(url, options);
            let json = await res.json();
            console.log(json);

            $form.reset()
            // location.reload();
            // getAll();


        } catch (error) {
            console.log(error)
        }
    }
    })

}