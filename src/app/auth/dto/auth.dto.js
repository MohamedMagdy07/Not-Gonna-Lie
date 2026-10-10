import 'dotenv/config';
import {z} from "zod"

export const registerDTO = z.object({
    email:z.email().toLowerCase().trim(),
    name:z.string().trim().min(2).max(25),
    password:z.string().trim().min(6).max(16),
    provider:z.enum(process.env.EMAIL_PROVIDERS.split(',')).default("local"),
    dateOfBirth:z.date().optional(),
    gender:z.enum(['male', 'female']).default("male"),
});

export const loginDTO = z.object({
    email:z.email().toLowerCase().trim(),
    password:z.string().trim().min(6).max(16),
});

export const verifyAccountDTO = z.object({
    email:z.email().lowercase().trim(),
    code:z.string().trim().length(6),
});

export const resetPasswordDTO = z.object({
    email:z.email().lowercase().trim(),
    code:z.string().trim().length(6),
    password:z.string().trim().min(6).max(16),
});

export const sendOTPDTO = z.object({
    email:z.email().lowercase().trim(),
});