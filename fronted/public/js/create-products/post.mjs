export default async function post(e, url, table, template, fragment, getAllFunction) {
    e.preventDefault()
    const $form = document.getElementById("createForm");
        try {
            const formData = new FormData($form);
            let options = {
                method: "POST",
                body: formData
            };
            let res = await fetch(url, options);
            let json = await res.json();
            $form.reset()
            getAllFunction(url, table, template, fragment)

        } catch (error) {
            console.log(error)
        }
    }


