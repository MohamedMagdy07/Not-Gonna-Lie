import {Schema,model} from "mongoose";


const OtpSchema = new Schema({
    code:{
        type:String,
        required:true,
        length:6
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    expireAt:{
        type:Date,
    }
},{
    timestamps: {
        createdAt: true,
    }
})