import nodemailer from "nodemailer";
import {env} from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: env.nodemailer.email,
        pass: env.nodemailer.password,
    }
})

export async function sendEmail(to, subject, html) {

    await transporter.sendMail({
        from: `"Not Gonna Lie App" <${env.nodemailer.email}>`,
        to: to,
        subject: subject,
        html: html
    })
}