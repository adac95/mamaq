const express = require('express')
const router = express.Router()
const response = require('../utils/response')
const controller = require("./controller")

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// SIGNUP
router.post('/sign-up', (req, res) => {
    const { username, email, password, roles } = req.body
    controller.signUp(username, email, password, roles)
        .then((token) => response.success(req, res, token, 200))
        .catch(error => response.error(req, res, "Error al registrarse", 500, error))
})

// SIGNIN 
router.post('/sign-in', (req, res) => {
  console.log(req.body)
    const { username, password } = req.body;
    controller.signIn(username, password)
        .then((token) => response.success(req, res, token, 200))
        .catch(error => response.error(req, res, "error al validar token", 500, error))
})

module.exports = router