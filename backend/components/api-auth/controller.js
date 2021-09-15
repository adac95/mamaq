const store = require('./store');
const UserModel = require('../models/Users');
const Role = require('../models/Roles')
const config = require('../../config/index')
const jwt = require('jsonwebtoken')

async function signUp(username, email, password, confirmPassword, roles) {
    let message;
    try {
        // verificando que vengan todos los datos
        if (!username || !email || !password || !confirmPassword) {
            message = "Faltan llenar campos requeridos"
            console.log(message);
            return message;
        }
        // COMPARAR LAS PASSWRODS
        if(password != confirmPassword) {
            message = "Las contraseñas no coinciden"
            console.log(message);
            return message;
        }
        // verificar que no exista el usuario
        const user = await UserModel.findOne({ username });
        const userMail = await UserModel.findOne({ email });
        if (user || userMail) {
            message = "The user already exists"
            console.log(message);
            return message
        }
        // Verificar que el rol exista
        if (roles) {
            for (let i = 0; i < roles.length; i++) {
                if (!Role.ROLES.includes(roles[i])) {
                    message = `Role ${roles[i]} does not exist`;
                    console.log(message);
                    return message
                } else {// Si llegan roles que existen sacar su ID
                    const foundRoles = await Role.roleModel.find({ name: { $in: roles } });
                    roles = foundRoles.map((role) => role._id);
                }
            }
        } else {
            const role = await Role.roleModel.findOne({ name: "user" });
            roles = role._id;
        }
        // Actualizar los nuevos datos para enviar a la BD
        const newUser = {
            username,
            email,
            password,
            roles,
        }
        // Guardando usuario en la BD
        const userRegister = await store.signUp(newUser)
        // crear Token de acceso
        const token = jwt.sign({ id: userRegister._id }, config.secretToken, {
            expiresIn: 86400, // 24 hours
        });
        data = {token, userRegister}
        return data
    } catch (error) {
        console.log(error);
        message = "Error desde el servidor al crear usuario"
        return message
    }

}

async function signIn(username, password) {
    try {
        let message;
        // verificando que vengan todos los datos
        if (!username || !password) {
            message = "Faltan llenar campos requeridos"
            console.log(message);
            return message;
        }
        // verificar si existe usuario
        const foundUser = await store.signIn(username);
        if (!foundUser) {
            message = "No se encontro al usuario";
            return message;
        }
        // verificando el password
        const matchPassword = await UserModel.comparePassword(password);
        if (!matchPassword) {
            message = "Sin Permisos";
            return message;
        };
        //  Si todo esta bien creamos y devolvemos el token
        const token = jwt.sign({ id: foundUser._id, username: foundUser.username }, config.secretToken, {
            expiresIn: 86400, // 24 hours
        });
        return token;

    } catch (error) {
        console.log(error);
    }
}
module.exports = { signUp, signIn }
