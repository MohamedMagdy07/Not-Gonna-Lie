import {User} from '../../user/model/user.model.js';
import {OTP} from "../model/otp.model.js";

export async function checkEmailExists(email) {
    return await User.findOne({email})
}

export async function createUser(userData) {
    return await User.create(userData);
}

export async function verifyUser(email) {
    return await User.updateOne({email: email}, {
        isVerified: true
    },)
}