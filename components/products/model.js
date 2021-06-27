const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    price: Number,
    category: String,
})

const model = mongoose.model('products', mySchema)

module.exports = model