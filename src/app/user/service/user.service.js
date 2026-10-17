import * as userRepo from "../repository/user.repository.js";
import {AppError} from "../../../pkg/error/error.js";

export async function getAllUsers() {
    const users = await userRepo.getAllUsers();
    // if (!users) {
    //     throw new AppError("No users found.",'404');
    // }
    return users;
}