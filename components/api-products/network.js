const express = require('express')
const router = express.Router()
const response = require('../network/response')
const controller = require("./controller")

router.get('/', (req, res) => {
    controller.getAllproducts().then((data) => {
        response.success(req, res, data, 200)
    }).catch((err) => {
        response.error(req, res, 'error al mostrar productos', err.status, err)
    })
})

router.post('/', (req, res) => {
    controller.addProduct(req.body.name, req.body.price, req.body.category, req.body.description).then((data) => {
        response.success(req, res, data, 200)
    }).catch((err) => {
        response.error(req, res, 'problemas al crear product', 500, err)
    })
})

router.patch('/:id', (req, res) => {
    controller.patchProduct(req.params.id, req.body.name, req.body.price, req.body.category, req.body.description).then((data) => {
        response.success(req, res, data, 200)
    }).catch((err) => {
        response.error(req, res, 'problemas al actualizar producto', 500, err)
    })
})

router.delete('/:id', (req, res) => {
    controller.deleteProduct(req.params.id).then(() => {
        response.success(req, res, 'Producto eliminado exitosamente', 200)
    }).catch((err) => {
        response.error(req, res, 'problemas al eliminar producto', 500, err)
    })
})

module.exports = router;