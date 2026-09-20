import 'dotenv/config';
import * as authRepo from "../repository/auth.repository.js"
import * as otpRepo from "../repository/otp.repository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {generateOTP} from "../../../common/utils/OtpGenerator.js"
import {invalidOtp, noOtp, wrongPassword} from "../error.js"
import {userExists, userNotExists, userNotVerified, userVerified} from "../../user/error.js";


export async function register(userData) {
    const userExist = await authRepo.checkEmailExists(userData.email);
    if (userExist) throw userExists;
    userData.password = await bcrypt.hash(userData.password, 10);
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
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw noOtp;
    if (code !== otp.code) throw invalidOtp
    const verifiedUser = await authRepo.verifyUser(email);
    await otpRepo.deleteOtp(email)
    return verifiedUser;
}


export async function login(email, password) {
    const user = await authRepo.checkEmailExists(email);
    if (!user) throw userNotExists;
    if (!user.isVerified) throw userNotVerified
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw wrongPassword;
    const token =  jwt.sign({
        email,
        password,
    }, process.env.JWT_SECRET_KEY, {expiresIn: '12H'});
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
    console.log(otp); // This will be enough for testing
}