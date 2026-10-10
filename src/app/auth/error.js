import {AppError} from "../../common/error/error.js";


export const wrongPassword = new AppError("invalid credentials ", 401);
export const noOtp = new AppError("Otp expired", 404);
export const invalidOtp = new AppError("Wrong Otp number", 406);

