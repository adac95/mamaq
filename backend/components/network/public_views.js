const express = require('express');
const router = express.Router()
const Model = require('../models/Products')
const {herokuUri} = require('../../config/index')
const UserModel = require('../models/Users')


router.get('/', async (req, res) => {
    res.render('index', { herokuUri })
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