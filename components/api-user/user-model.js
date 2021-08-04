const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const productSchema = new Schema({

        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
});

productSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}
const userModel = model("User", productSchema); 
module.exports =  userModel