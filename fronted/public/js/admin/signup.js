export default function signup() {
    const $form = document.getElementById("signupForm");
    $form.addEventListener("submit", async e => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const options = {
                method: "POST",
                body: formData
            }
            let res = await fetch("../api/auth/sign-up", options)
            let json = await res.json()
            console.log(json);
            location.reload();

        } catch (error) {
            console.log(error);
        }

    })
}
