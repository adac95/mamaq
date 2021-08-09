const express = require('express');
const router = express.Router()
const Model = require('../api-products/model')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/reservas', (req, res) => {
    res.render('reservas')
})

router.get('/carta', async (req, res) => {
    const imgUploads = await Model.find();
    // console.log(imgUploads);
    res.render('carta', { imgUploads })
})

router.get('/create-products', (req, res) => {
    res.render('create-products')
})

module.exports = router;