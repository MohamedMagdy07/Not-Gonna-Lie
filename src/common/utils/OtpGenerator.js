import crypto from "crypto"

export function generateOTP() {

    const otp = crypto.randomInt(0, 100000);

    return otp.toString().padStart(6, '0');
}