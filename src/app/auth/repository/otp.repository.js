import {OTP} from '../model/otp.model.js';

export async function createOtp(otpData) {
    return await OTP.create(otpData)
}