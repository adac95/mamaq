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
    .then((token) => response.success(req, res, token, 200))
    .catch(error => response.error(req, res, "Error al registrarse", 500, error))
})

// SIGNIN 
router.post('/sign-in', passport.authenticate('local', { failureRedirect: '/' }), async function (req, res) {
  const user = {...req.user}
  const payload = await { id: req.user._id, username: req.user.username, email: req.user.email }
  const token = await jwt.sign(payload, config.secretToken, {
    expiresIn: config.expireTimeCookieToken,
  });
  res.cookie("token", token, {
    httpOnly: !config.dev,
    secure: !config.dev
  })
  res.json({"body": user})
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout()
  res.clearCookie("token")
  res.redirect('/admin')
})

module.exports = router