const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
})

const model = mongoose.model('products', mySchema)

module.exports = model