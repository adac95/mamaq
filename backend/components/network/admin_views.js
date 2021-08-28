const express = require('express');
const router = express.Router()
const authJwt = require('../middlewares/auth')
const passport = require('passport')

router.get('/',(req, res) => {
    // const token =  req.headers["x-access-token"]
    // req.session.token = token
    // console.log("admin",token, req.session.token, req.session.user);
    // console.log(req.session.user);
    // res.cookie("token", token)
    res.render('admin')
    // req.session.token = req.headers["x-access-token"]
})
router.get('/create-products',
authJwt.isAuthenticated
// passport.authenticate('jwt', { session: true })
// authJwt.verifyToken 
,async (req, res) => {
    res.render('create-products')
    
})

module.exports = router;