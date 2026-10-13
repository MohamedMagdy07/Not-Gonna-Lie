import jwt from "jsonwebtoken"
import {env} from "../../../lib/config/env.js";

export async function generateToken(data, expiresIn) {
    const token = jwt.sign({
        ...data,
    }, env.jwt.secret, {expiresIn});
    return token;
}