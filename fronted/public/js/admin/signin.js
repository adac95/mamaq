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
            let json = await res.json();

            
            const token = json.body
            await localStorage.setItem("token", token)
            await location.reload();
            
        } catch (error) {  
            console.log(error);
        }

    })
    // document.addEventListener("click", async ()=> {
    //     try {
    //         let token = localStorage.getItem("token")
    //         const newOptions = {
    //             method: "GET",
    //             headers: { "x-access-token": token }
    //         }
    //         await fetch("/admin", newOptions)
    //     } catch (error) {
            
    //     }

    // })
}
