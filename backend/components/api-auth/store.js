const UserModel = require('../api-user/user-model')

async function signUp(data) {
    const newUser = await new UserModel(data);
    await newUser.save();
    const {_id, username, email, password, roles} = newUser
    const userNoPass = {_id, username, email, roles}
    return userNoPass
}

async function signIn(username) {
    const foundUser = await UserModel.findOne({username}).populate("roles");
    return foundUser
}

module.exports = { signUp, signIn }