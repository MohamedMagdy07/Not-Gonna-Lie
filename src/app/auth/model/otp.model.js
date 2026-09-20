import mongoose, {Schema, model} from "mongoose";


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
otpSchema.pre('save',async function(){
    try{
        await mongoose.model('OTP').deleteMany({email: this.email});
    }catch(err){
        throw err;
    }
})


export const OTP = model("OTP", otpSchema);

