import {MailjetProvider} from "../../pkg/email/mailjet.js";
import {env} from "../config/env.js";

export const mailjetProvider = new MailjetProvider({
    apiKey: env.mailjet.key,
    apiSecret: env.mailjet.secret,
    fromEmail: env.mailjet.fromEmail,
    fromName: env.mailjet.fromName,

})