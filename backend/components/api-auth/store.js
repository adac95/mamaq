const UserModel = require('../api-user/user-model')

async function signUp(data) {
    const {username, email, password, roles} = data
    const newUser = await new UserModel(data);
    await newUser.save();
    return newUser
}

async function signIn(username, password) {
    const foundUser = await UserModel.findOne({username}).populate("roles");
    return foundUser
}

module.exports = { signUp, signIn }