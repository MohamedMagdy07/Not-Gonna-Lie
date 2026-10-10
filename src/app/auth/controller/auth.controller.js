import * as authService from "../service/auth.service.js"
import {validationBody} from "../../../common/validation/validation.js";
import {loginDTO, registerDTO, resetPasswordDTO, sendOTPDTO, verifyAccountDTO} from "../dto/auth.dto.js";
import logger from "../../../common/logger/logger.js";
import {convertToMs} from "../../../common/utils/TimeConversion.js";

export async function register(req, res, next) {
    try {
        const data = validationBody(registerDTO, req.body);
        logger.info(data);
        const newUser = await authService.register(data)
        res.status(201).json({
            message: 'User registered successfully',
            success: true,
            user: newUser,
        })
    } catch (err) {
        next(err)
    }
}


export async function verify(req, res, next) {
    try {
        const data = validationBody(verifyAccountDTO, req.body);
        const {code, email} = data
        const verifiedUser = await authService.verify(code, email)
        res.status(201).json({
            message: 'User verified successfully',
            success: true,
            user: verifiedUser,
        })
    } catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    try {
        const data = validationBody(loginDTO, req.body);
        const {password, email} = data
        const token = await authService.login(email, password)
        res.cookie('token', token, {
            httpOnly: true,
        })
        res.status(200).json({
            message: 'User logged successfully',
            success: true,
        })
    } catch (err) {
        next(err)
    }
}

export async function sendOtp(req, res, next) {
    try {
        const data = validationBody(sendOTPDTO, req.body);
        const {email} = data
        await authService.sendOtp(email)
        res.status(201).json({
            message: 'New Otp generated successfully',
            success: true,
        })
    } catch (err) {
        next(err)
    }
}


export async function resetPassword(req, res, next) {
    try {
        const data = validationBody(resetPasswordDTO, req.body);
        const {email, code, password} = data
        await authService.resetPassword(email, code, password);
        res.status(204).json();
    } catch (err) {
        next(err)
    }
}

export async function loginWithGoogle(req, res, next) {
    try {
        const token = await authService.loginWithGoogle(req.body.idToken);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: convertToMs(1,"hours"),
        })
        res.status(200).json({
            message: 'User logged successfully',
            success: true,
        })
    } catch (error) {
        next(error)
    }
}