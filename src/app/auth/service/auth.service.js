import * as errors from "../error.js"
import * as authRepo from "../repository/auth.repository.js"
import * as otpRepo from "../repository/otp.repository.js"
import * as bcrypt from "bcrypt"
import {generateOTP} from "../../../common/utils/OtpGenerator.js"
import {sendEmail} from "../../../common/email/nodemailer.js";

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
    //await sendEmail(userData.email, "Verify your email",`<h1>Your verification code is ${otp}<h1>`); // since the function is working, I will comment it and use Log to check the output
    console.log(otp); // This will be enough for testing
    return newUser;
}


export async function verify(code, email) {
    const userExist = await authRepo.checkEmailExists(email);
    if (!userExist) throw errors.userNotExists;
    if (userExist.isVerified) throw errors.userVerified
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw errors.noOtp;
    if(code !== otp.code) throw errors.invalidOtp
    const verifiedUser = await authRepo.verifyUser(email);
    await otpRepo.deleteOtp(email)
    return verifiedUser;
}