export default function logout() {
    const $btn = document.getElementById("logoutBtn")
    document.addEventListener("click", async e => {
        try {
            
            if(e.target === $btn) {
                let options = {
                    method: "GET",
                    "content-type": "application/json"
                }
                const res = await fetch("../api/auth/logout",options)
                // location.reload()
                console.log(json);
            }
        } catch (error) {
            console.log(error);
        }
    })
}