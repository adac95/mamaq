const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

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

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

userSchema.methods.comparePassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

// productSchema.statics.encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
// };

// userSchema.statics.comparePassword = async (password, receivedPassword) => {
//     return await bcrypt.compare(password, receivedPassword)
// }
const userModel = model("User", userSchema); 
module.exports =  userModel