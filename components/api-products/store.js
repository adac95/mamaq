const Model = require('./model')

function allProducts() {
    const data = Model.find()
    return data
}

function addProducts(data) {
    const newProduct = new Model(data)
    newProduct.save()
}

async function patchProducts(id, name, price, category, description) {
  try{
    const foundProductById = await Model.findById(id)
    if(name || price) {
        foundProductById.name = name
        foundProductById.price = price
        foundProductById.category = category
        foundProductById.description = description
        const updateProduct = await foundProductById.save()
        return updateProduct

    }}catch(error){
        console.log(`Problemas al actualizar la BD: ${error}`)
        console.log(foundProductById.id)
    }
}

async function deleteProducts(id) {
    const eliminateProduct = await Model.findByIdAndDelete(id)
    return eliminateProduct
}

module.exports = {
    allProducts,
    addProducts,
    patchProducts,
    deleteProducts
}