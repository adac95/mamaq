const express = require('express');
const router = express.Router()
const Model = require('../api-products/model')
const {herokuUri} = require('../../config/index')


router.get('/', (req, res) => {
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