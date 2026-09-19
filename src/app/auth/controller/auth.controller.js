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