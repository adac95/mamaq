const store = require('./store')

function getAllproducts() {
    return new Promise((resolve, reject) => {
         resolve(store.allProducts())
    })
}

function addProduct(name, price, category, description) {
    return new Promise((resolve, reject) => {
        if(!name || !price || !category || !description) {
            console.log('falta completar datos')
            reject('faltan completar datos para crear producto')
            return false
        }

        let data = {name,price, category, description}
        store.addProducts(data)
        return resolve(data)
    })
}

function patchProduct(id, name, price, category, description) {
    return new Promise(async (resolve, reject) => {
        if(!name || !price || !category || !description) reject('Invalid data to update') 
        
        const result = store.patchProducts(id,name,price,category, description)
        resolve(result)   
    })
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        if(!id) return reject('Invalid ID')
        resolve(store.deleteProducts(id))
    })
}

module.exports = {
    getAllproducts,
    addProduct,
    patchProduct,
    deleteProduct
}