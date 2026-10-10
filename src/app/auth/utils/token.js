import 'dotenv/config';
import jwt from "jsonwebtoken"

export async function generateToken(data, expiresIn) {
    const token = jwt.sign({
        ...data,
    }, process.env.JWT_SECRET_KEY, {expiresIn});
    return token;
}