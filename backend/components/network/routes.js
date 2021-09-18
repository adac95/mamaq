const express = require('express')
const products = require('../api-products/network')
const users = require('../api-user/network')
const auth = require('../api-auth/network')
const indexFrontend = require('./public_views')
const admin = require('./admin_views')
const shoppingCart = require('../api-shoppingCart/network')


const routes = (server) => {
    server.use('/api/products', products)
    server.use('/api/users', users)
    server.use('/api/auth', auth)
    server.use('/api/shoppingcart', shoppingCart)
    server.use('/admin', admin)
    server.use('/', indexFrontend)

}

module.exports = routes;