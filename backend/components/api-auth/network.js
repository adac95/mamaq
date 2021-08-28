const express = require('express')
const router = express.Router()
const response = require('../utils/response')
const controller = require("./controller")
const config = require('../../config/index')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// router.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

// SIGNUP
router.post('/sign-up', (req, res) => {
  const { username, email, password, roles } = req.body
  controller.signUp(username, email, password, roles)
    .then((token) => response.success(req, res, token, 200))
    .catch(error => response.error(req, res, "Error al registrarse", 500, error))
})

// SIGNIN 

router.post('/sign-in', passport.authenticate('local', { failureRedirect: '/' }), async function (req, res) {
  const payload = await { id: req.user._id, username: req.user.username }
  const token = await jwt.sign(payload, config.secretToken, {
    expiresIn: 86400, // 24 hours
  });
  res.send({"body": token})
});

// router.post('/sign-in', (req, res) => {

//   // req.session.user = req.body
//   // console.log("sigin",req.session.user);

//   // req.session.token = token
//   // console.log(req.session.user);
//   const { username, password } = req.body;
//   controller.signIn(username, password)
//     .then((token) => {
//       response.success(req, res, token, 200)
//     })
//     .catch(error => response.error(req, res, "error al validar token", 500, error))
// })

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/admin')
})

module.exports = router