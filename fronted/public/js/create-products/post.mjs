export default async function post(e, url, table, template, fragment, token) {
    e.preventDefault()
    const $form = document.getElementById("createForm");
        try {
            const formData = new FormData($form);
            let options = {
                method: "POST",
                headers: {
                    "x-access-token": token
                },
                body: formData
            };
            let res = await fetch(url, options);
            let json = await res.json();
            $form.reset()
            location.reload();

        } catch (error) {
            console.log(error)
        }
    }


