import CrudService from "./probando/CrudService.mjs";

export default async function post(e, url) {
    e.preventDefault()
    const $form = document.getElementById("createForm");
        try {
            const formData = new FormData($form);
            const crudService = new CrudService(url)
            const res = await crudService.postData(formData)
            // let options = {
            //     method: "POST",
            //     headers: {
            //         "x-access-token": token
            //     },
            //     body: formData
            // };
            // let res = await fetch(url, options);
            // let json = await res.json();
            $form.reset()
            location.reload();

        } catch (error) {
            console.log(error)
        }
    }


