import * as authService from "../service/auth.service.js"

export async function register(req, res, next) {
    try{
        const newUser = await authService.register(req.body)
        res.status(201).json({
            message: 'User registered successfully',
            success: true,
            user: newUser,
        })
    }catch(err){
        next(err)
    }
}


export async function verify(req, res, next) {
    try{
        const {code,email} = req.body
        const verifiedUser = await authService.verify(code,email)
        res.status(201).json({
            message: 'User verified successfully',
            success: true,
            user: verifiedUser,
        })
    }catch(err){
        next(err)
    }
}