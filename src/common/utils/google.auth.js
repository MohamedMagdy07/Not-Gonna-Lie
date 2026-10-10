import {AppError} from "../error/error.js";

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client();

export async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience: [process.env.GOOGLE_OAUTH_WEB_CLIENT_ID],
        });
        return ticket.getPayload();
    } catch (err) {
        throw new AppError("Invalid google token", 403);
    }
}