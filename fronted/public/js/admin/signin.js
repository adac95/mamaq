export default function signin() {
    document.addEventListener("submit", async e => {
        e.preventDefault()
        const $form = document.getElementById("signinForm");
        if ($form !== undefined) {
            if (e.target === $form) {
                console.log("hola");
                try {
                    const formData = new FormData(e.target)
                    const options = {
                        method: "POST",
                        body: formData
                    }
                    let res = await fetch("../api/auth/sign-in", options)
                    location.reload();

                } catch (error) {
                    console.log(error);
                }
            }
        }else return false

    })
}
