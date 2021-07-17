const express = require('express')
const products = require('../api-products/network')
const index = require('./views')
// const indexhtml = require('../../public/index.html')

const routes = (server) => {
    server.use('/api/products', products)
    server.use('/', index)
    // server.use('/admin', indexhtml)
}

module.exports = routes;