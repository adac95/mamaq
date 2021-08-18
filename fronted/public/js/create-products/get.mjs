        export default async function getAll(url,table,template,fragment) {
                try {
                    let res = await fetch(url)
                    let json = await res.json();
                    const { body, error } = json;
    
                    if (!res.ok) throw { status: res.status, statusText: res.statusText }
    
                    body.forEach(el => {
                        template.querySelector(".item-name").textContent = el.name;
                        template.querySelector(".item-price").textContent = el.price;
                        template.querySelector(".item-category").textContent = el.category;
                        template.querySelector(".item-description").textContent = el.description;
                        template.querySelector(".edit-btn").dataset._id = el._id;
                        template.querySelector(".item-tr-fetch").dataset._id = el._id;
                        template.querySelector(".item-tr-fetch").dataset.name = el.name;
                        template.querySelector(".item-tr-fetch").dataset.price = el.price;
                        template.querySelector(".item-tr-fetch").dataset.category = el.category;
                        template.querySelector(".item-tr-fetch").dataset.description = el.description;
                        template.querySelector(".delete-btn").dataset._id = el._id;
    
                        let clone = document.importNode(template, true);
                        fragment.appendChild(clone);
                    });
    
                    table.querySelector("tbody").appendChild(fragment);
    
    
                } catch (error) {
                    let message = error.statusText || "ocurrio un error"
                    console.log(error)
                    table.textContent = message
                }
            }