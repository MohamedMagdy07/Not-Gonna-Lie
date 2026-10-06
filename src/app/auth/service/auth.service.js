import 'dotenv/config';
import * as authRepo from "../repository/auth.repository.js"
import * as otpRepo from "../repository/otp.repository.js"
import {generateOTP} from "../../../common/utils/OtpGenerator.js"
import {invalidOtp, noOtp, wrongPassword} from "../error.js"
import {userExists, userNotExists, userNotVerified, userVerified} from "../../user/error.js";
import {comparePassword, hashPassword} from "../utils/password.hashing.js";
import {getToken} from "../utils/token.js";
import {verifyOtp} from "../utils/otp.js";
import * as userRepo from "../../user/repository/user.repository.js";
import logger from "../../../common/logger/logger.js";


export async function register(userData) {
    const userExist = await authRepo.checkEmailExists(userData.email);
    if (userExist) throw userExists;
    userData.password = await hashPassword(userData.password)
    const newUser = await authRepo.createUser(userData);
    const otp = generateOTP();
    await otpRepo.createOtp({
        code: otp,
        email: userData.email,
    })
    //await sendEmail(userData.email, "Verify your email",`<h1>Your verification code is ${otp}<h1>`); // since the function is working, I will comment it and use Log to check the output
    console.log(otp); // This will be enough for testing
    return newUser;
}


export async function verify(code, email) {
    const userExist = await authRepo.checkEmailExists(email);
    if (!userExist) throw userNotExists;
    if (userExist.isVerified) throw userVerified
    // const otp = await otpRepo.getOtpByEmail(email);
    // if (!otp) throw noOtp;
    // if (code !== otp.code) throw invalidOtp
    await verifyOtp(code,email);
    const verifiedUser = await authRepo.verifyUser(email);
    await otpRepo.deleteOtp(email)
    return verifiedUser;
}


export async function login(email, password) {
    const user = await authRepo.checkEmailExists(email);
    if (!user) throw userNotExists;
    if (!user.isVerified) throw userNotVerified
    const match = await comparePassword(password, user.password)
    if (!match) throw wrongPassword;
    const token = getToken({email, password},"12H");
    return token;
}


export async function sendOtp(email) {
    const userExist = await authRepo.checkEmailExists(email);
    if (!userExist) throw userNotExists;
    const otp = generateOTP();
    await otpRepo.createOtp({
        code: otp,
        email,
    })
    logger.info(otp); // This will be enough for testing
}

export async function resetPassword(email,code,newPassword) {
    const userExist = await authRepo.checkEmailExists(email);
    if (!userExist) throw userNotExists;
    await verifyOtp(code,email);
    const hashedPassword = await hashPassword(newPassword);
    await userRepo.updateUserByEmail(email,{password:hashedPassword});
    await otpRepo.deleteOtp(email)
}