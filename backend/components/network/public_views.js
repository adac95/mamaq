const express = require('express');
const router = express.Router()
const Model = require('../api-products/model')
const {herokuUri} = require('../../config/index')
const UserModel = require('../api-user/user-model')


router.get('/', async (req, res) => {
    req.body.id = "610624e4489b2a24bf89101f"
    const user = await UserModel.findById(req.body.id)
    res.render('index', { herokuUri, user })
})

router.get('/reservas', (req, res) => {
    res.render('reservas')
})

router.get('/carta', async (req, res) => {
    const imgUploads = await Model.find();
    // console.log(imgUploads);
    res.render('carta', { imgUploads })
})

module.exports = router;