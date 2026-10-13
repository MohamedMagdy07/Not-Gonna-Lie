import {AppError} from "../../pkg/error/error.js";
import {env} from "../config/env.js";
import {OAuth2Client} from "google-auth-library";

const client = new OAuth2Client();

export async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience: [env.google.webClientId],
        });
        return ticket.getPayload();
    } catch (err) {
        throw new AppError("Invalid google token", 403);
    }
}