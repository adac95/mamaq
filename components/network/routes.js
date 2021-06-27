const express = require('express')
const products = require('../products/network')
// const indexhtml = require('../../public/index.html')

const routes = (server) => {
    server.use('/products', products)
    // server.use('/admin', indexhtml)
}

module.exports = routes;