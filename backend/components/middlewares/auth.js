const jwt = require('jsonwebtoken')
const config = require('../../config/index')
const RoleModel = require('../models/Roles')
const UserModel = require('../models/Users')

const verifyToken = async (req, res, next) => {
    try {

        // let token = req.headers["x-access-token"];
        // req.session.token = token
        // console.log("auth", token, req.session.user);

        if (!token) return res.status(403).json({ message: "No token provided", token });

        const decoded = await jwt.verify(token, config.secretToken);
        req.userId = decoded.id;
        const user = await UserModel.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin')
}

const isAdmin = async (req, res, next) => {
    try {

        const user = await UserModel.findById(req.user._id);
        const roles = await RoleModel.roleModel.find({ _id: { $in: user.roles } });
        // console.log(user);
        // console.log(roles);

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                return next()
            }
        }
        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

module.exports = { verifyToken, isAuthenticated, isAdmin }