export default function signin() {
    document.addEventListener("submit", async e => {
        e.preventDefault()
        try {
            const $form = document.getElementById("signinForm");
            const formData = new FormData(e.target)
            const options = {
                method: "POST",
                body: formData
            }
            let res = await fetch("../api/auth/sign-in", options)
            let json = await res.json()
            console.log(res);
            location.reload();
            
        } catch (error) {  
            console.log(error);
        }
    
    })
}
