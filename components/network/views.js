const express = require('express');

const router = express.Router()


router.get('/', (req, res) => {
    res.render('inicio')
})

router.get('/reservas', (req, res) => {
    res.render('reservas')
})

router.get('/carta', (req, res) => {
    res.render('carta')
})

router.get('/create-products', (req, res) => {
    res.render('create-products')
})

module.exports = router;