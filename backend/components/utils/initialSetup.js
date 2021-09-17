const Role = require('../models/Roles');
const User = require('../models/Users');

const bcrypt = require('bcryptjs');

const createRoles = async () => {
    try {
        // Metodo para saber cuantos documentos hay en el modelo
        const count = await Role.roleModel.estimatedDocumentCount();

        // Verificar si ya existen los roles
        if (count > 0) return;

        // Crear roles por defecto
        const values = await Promise.all([
            new Role.roleModel({ name: "user" }).save(),
            new Role.roleModel({ name: "admin" }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

const createAdmin = async () => {
    // revisando si existe un admin
    const user = await User.findOne({ email: "admin@localhost" });
    // get roles _id
    const roles = await Role.roleModel.find({ name: { $in: "admin" } });

    if (!user) {
        // create a new admin user
        await User.create({
            username: "admin",
            email: "admin@localhost",
            password: "admin",
            roles: roles.map((role) => role._id),
        });
        console.log('Admin User Created!')
    }
};

module.exports = { createRoles, createAdmin };