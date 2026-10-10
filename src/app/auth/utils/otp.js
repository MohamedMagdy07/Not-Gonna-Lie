import * as otpRepo from "../repository/otp.repository.js";
import {invalidOtp, noOtp} from "../error.js";

export async function verifyOtp(code, email) {
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw noOtp;
    if (code !== otp.code) throw invalidOtp
}