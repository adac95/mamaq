const express = require('express');
const router = express.Router()
const UserModel = require('../../../backend/components/api-user/user-model')

router.get('/', async (req, res) => {
    req.body.id = "610624e4489b2a24bf89101f"
    const user = await UserModel.findById(req.body.id)
    console.log(user)
    res.render('admin', { user })
})
router.get('/create-products', (req, res) => {
    res.render('create-products')
})

module.exports = router;