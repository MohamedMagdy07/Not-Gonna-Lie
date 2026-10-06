import {AppError} from "../../common/error/error.js";

export const userExists = new AppError("User already exists",409);
export const userNotExists = new AppError("User don't exists",406);
export const userVerified = new AppError("User already verified",409);
export const userNotVerified = new AppError("User not verified",403);