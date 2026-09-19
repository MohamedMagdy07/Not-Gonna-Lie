import {Schema,model} from 'mongoose';

const UserSchema = new Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: () => {
                if (!this.provider === 'local') {
                    return true
                }
            },

        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        dateOfBirth: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            default: 'male',
        },
        provider:{
            type: String,
            enum: ['local','google','facebook'],
            default: 'local',
        }
    },
    {
        timestamps: true
    })

export const User = model('User', UserSchema);