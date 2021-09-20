const express = require('express');
const router = express.Router()
const ProdcutsModel = require('../models/Products')
const { herokuUri } = require('../../config/index')
const ShoppingCartModel = require("../models/ShoppingCart")


router.get('/', async (req, res) => {
    res.render('index', { herokuUri })
})

router.get('/reservas', (req, res) => {
    res.render('reservas')
})

router.get('/carta', async (req, res) => {
    const imgUploads = await ProdcutsModel.find();
    // const cartProducts = await ShoppingCartModel.find({ "userId": req.user.id })
    // const countTotalCartProducts = cartProducts[0].products
    // let totalCartProducts = 0
    // countTotalCartProducts.forEach(el => {
    //     totalCartProducts += el.cantidad
    //     return totalCartProducts
    // });
    // req.flash("cartCounter", totalCartProducts)
    res.render('carta', { imgUploads })
})

module.exports = router;