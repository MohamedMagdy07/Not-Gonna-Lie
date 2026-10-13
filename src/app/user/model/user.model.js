import {model, Schema} from 'mongoose';
import {env} from "../../../lib/config/env.js";

const userSchema = new Schema({
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
            required: function () {
                return this.provider === 'local';
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
        provider: {
            type: String,
            default: 'local',
            enum: env.providers.split(','),
        }
    },
    {
        timestamps: true,
        strict: true
    })

export const User = model('User', userSchema);