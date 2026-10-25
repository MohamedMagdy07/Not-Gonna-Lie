import {User} from '../../user/model/user.model.js';

export async function checkEmailExists(email) {
    return await User.findOne({email}, null);
}

export async function createUser(userData) {
    const user = new User(userData)
    return await user.save();
}

export async function verifyUser(email) {
    return await User.updateOne({email: email}, {
        isVerified: true
    },)
}