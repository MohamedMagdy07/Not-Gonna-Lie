import {User} from '../model/user.model.js';

export async function updateUserByEmail(email, data) {
    return await User.findOneAndUpdate({email: email}, data)
}

export async function getAllUsers() {
    return await User.find();
}

export async function findUserById(id) {
    return await User.findOne({_id:id,isDeleted : false}, {password:0});
}