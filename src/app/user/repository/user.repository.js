import {User} from '../model/user.model.js';

export async function updateUserByEmail(email, data) {
    return User.findOneAndUpdate({email: email}, data)
}

