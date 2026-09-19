import {Schema, model} from "mongoose";


const otpSchema = new Schema({
    code: {
        type: String,
        required: true,
        length:6,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
    }
});

otpSchema.index({createdAt: 1}, {expireAfterSeconds: 300});


export const OTP = model("OTP", otpSchema);