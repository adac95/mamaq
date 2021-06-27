const store = require('./store')

function getAllproducts() {
    return new Promise((resolve, reject) => {
         resolve(store.allProducts())
    })
}

function addProduct(name, price, category) {
    return new Promise((resolve, reject) => {
        if(!name || !price || !category) {
            console.log('falta completar datos')
            reject('faltan completar datos para crear producto')
            return false
        }

        let data = {name,price, category}
        store.addProducts(data)
        return resolve(data)
    })
}

function patchProduct(id, name, price, category) {
    return new Promise(async (resolve, reject) => {
        if(!name || !price || !category) reject('Invalid data to update') 
        
        const result = store.patchProducts(id,name,price,category)
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