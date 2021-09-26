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
        passport.authenticate('local', { failureRedirect: '/', failureFlash: true })(req, res, () => {
          res.status(200).cookie("token", token, {
            maxAge: config.expireTimeCookieToken,
            // httpOnly: config.nodeEnv === "production" ? true : false,
            // secure: config.nodeEnv === "production" ? true : false
          }).redirect("../../")
        })
      } else {
        req.flash("error_msg", data)
        res.redirect('/admin')
      }
    })
    .catch(error => response.error(req, res, "Error al registrarse", 500, error))
})

// SIGNIN 
router.post('/sign-in', passport.authenticate('local', { failureRedirect: '/admin', failureFlash: true }), async function (req, res) {
  try {
    const payload = { id: req.user._id, username: req.user.username, email: req.user.email }
    const token = jwt.sign(payload, config.secretToken, {
      expiresIn: config.expireTimeCookieToken,
    });
    res.cookie("token", token, {
      maxAge: config.expireTimeCookieToken,
      //   // httpOnly: config.nodeEnv === "production" ? true : false,
      //   // secure: config.nodeEnv === "production" ? true : false
    }
    )
    res.redirect("../../")
  } catch (error) {
    res.send(error)
  }
});

// LOGOUT
router.get('/logout', async (req, res) => {
  await req.logout()
  await res.clearCookie("token")
  res.redirect('/')
})

module.exports = router