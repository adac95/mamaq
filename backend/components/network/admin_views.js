const express = require('express');
const router = express.Router()
const authJwt = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/create-products', authJwt.isAuthenticated, async (req, res) => {
    res.render('create-products')
})

module.exports = router;