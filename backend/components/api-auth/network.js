const express = require('express')
const router = express.Router()
const response = require('../utils/response')
const controller = require("./controller")
const config = require('../../config/index')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// SIGNUP
router.post('/sign-up', (req, res) => {
  const { username, email, password, confirmPassword, roles } = req.body
  controller.signUp(username, email, password, confirmPassword, roles)
    .then((data) => {
      const { token, userRegister } = data
      if (token) {
        passport.authenticate('local',{ failureFlash: true})(req, res, () => {
          res.status(200).cookie("token", token, {
            // httpOnly: config.nodeEnv === "production" ? true : false,
            // secure: config.nodeEnv === "production" ? true : false
          }).json({ "body": "Usuario creado" })
        })
      } else {
        req.flash("error_msg", data)
        res.json({"error": data})
      }
    })
    .catch(error => response.error(req, res, "Error al registrarse", 500, error))
})

// SIGNIN 
router.post('/sign-in', passport.authenticate('local', {successRedirect: '/admin' ,failureRedirect: '/admin', failureFlash: true }), async function (req, res) {
  try {
    const user = req.user
    const payload = { id: req.user._id, username: req.user.username, email: req.user.email }
    const token = jwt.sign(payload, config.secretToken, {
      expiresIn: 30000000,
    });
    res.cookie("token", token, {
      // httpOnly: config.nodeEnv === "production" ? true : false,
      // secure: config.nodeEnv === "production" ? true : false
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