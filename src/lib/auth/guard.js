import {AppError} from "../../pkg/error/error.js";
import jwt from "jsonwebtoken";
import {env} from "../config/env.js";

export function guard(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token) {throw new AppError("No token provided",403);}

        const payload = jwt.verify(token, env.jwt.secret);
        req.user = payload;
        next();
    }catch(err) {
        next(err);
    }
}