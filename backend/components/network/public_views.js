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
    res.render('carta', { imgUploads })
})

router.get('/cart', async (req, res) => {
    const productsCart = await ShoppingCartModel.find({ "userId": req.user.id })
    if (!productsCart[0]) {
        res.render('cart')
    } else {
        const productsOfCartByUser = productsCart[0].products
        const productOfDb = await ProdcutsModel.find();
        res.render('cart', { productsOfCartByUser, productOfDb })
    }
})
module.exports = router;