const Model = require('./model')
const { unlink } = require('fs-extra');
const path = require('path');

function allProducts() {
    const data = Model.find()
    return data
}

function addProducts(data) {
    data.imagen.path = 'public/assets/uploads/' + data.imagen.filename;
    const newProduct = new Model(data)
    // console.log(data);
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
    await unlink(path.resolve('./' + eliminateProduct.imagen.path));
    return eliminateProduct
}

module.exports = {
    allProducts,
    addProducts,
    patchProducts,
    deleteProducts
}