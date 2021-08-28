export default function goToCreateProductsLink() {
    const $link = document.getElementById("goToCreateProductsLink");

    const token = localStorage.getItem("token")
    document.addEventListener("click", async (e) => {
        if (e.target === $link) {
            e.preventDefault()
            try {
                const newOptions = {
                    method: "GET",
                    headers: { "x-access-token": token }
                }
                const res = await fetch("/admin/create-products", newOptions)
                console.log(res);
                // window.location.href = "/admin/create-products"

            } catch (error) {
                console.log(error);
            }
        }

    }
    )
}