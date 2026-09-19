import * as errors from "../error.js"
import * as authRepo from "../repository/auth.repository.js"
import * as otpRepo from "../repository/otp.repository.js"
import * as bcrypt from "bcrypt"
import {generateOTP} from "../../../common/utils/OtpGenerator.js"

export async function register(userData) {
    const userExist = await authRepo.checkEmailExists(userData.email);
    if (userExist) throw errors.userExists;
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = await authRepo.createUser(userData);
    const otp = generateOTP();
    await otpRepo.createOtp({
        code: otp,
        email: userData.email,
    })
    return newUser;
}