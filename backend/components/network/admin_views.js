const express = require('express');
const router = express.Router()
const authJwt = require('../middlewares/auth')

router.get('/', authJwt.isAuthenticated, authJwt.isAdmin, (req, res) => {
    res.render('admin')
})

router.get('/create-products', authJwt.isAuthenticated, authJwt.isAdmin, async (req, res) => {
    res.render('create-products')
})

module.exports = router;