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

router.get('/login', (req, res) => {
    res.render('loginout')
})

router.get('/carta', async (req, res) => {
    const imgUploads = await ProdcutsModel.find();
    res.render('carta', { imgUploads })
})

router.get('/cart', async (req, res) => {
    let productsCart
    req.user ? productsCart = await ShoppingCartModel.find({ "userId": req.user.id }) : productsCart = ""
    if (!productsCart[0]) {
        const productsOfCartByUser = productsCart
        res.render('cart', { productsOfCartByUser })
    } else {
        const productsOfCartByUser = productsCart[0].products
        res.render('cart', { productsOfCartByUser })
    }
})
module.exports = router;