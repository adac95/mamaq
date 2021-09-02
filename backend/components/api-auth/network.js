const express = require('express')
const router = express.Router()
const response = require('../utils/response')
const controller = require("./controller")
const config = require('../../config/index')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// SIGNUP
router.post('/sign-up', (req, res) => {
  const { username, email, password, roles } = req.body
  controller.signUp(username, email, password, roles)
    .then((data) => {
      const { token, userRegister } = data
      passport.authenticate('local')(req, res, () => {
        res.status(200).cookie("token", token, {
          httpOnly: config.nodeEnv === "production" ? true : false,
          secure: config.nodeEnv === "production" ? true : false
        }).json({ "body": "Usuario creado" })
      })
    })
    .catch(error => response.error(req, res, "Error al registrarse", 500, error))
})

// SIGNIN 
router.post('/sign-in', passport.authenticate('local', { failureRedirect: '/' }), async function (req, res) {
  try {
    const user = req.user
    const payload = await { id: req.user._id, username: req.user.username, email: req.user.email }
    const token = await jwt.sign(payload, config.secretToken, {
      expiresIn: 300000,
    });
    res.cookie("token", token, {
      httpOnly: config.nodeEnv === "production" ? true : false,
      secure: config.nodeEnv === "production" ? true : false
    })
    res.json({ "body": user })
  } catch (error) {
    res.send(error)
  }
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout()
  res.clearCookie("token")
  res.redirect('/admin')
})

module.exports = router