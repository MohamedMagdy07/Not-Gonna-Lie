import 'dotenv/config';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD,
    }
})

export async function sendEmail(to, subject, html) {

    await transporter.sendMail({
        from: `"Not Gonna Lie App" <${process.env.NODE_MAILER_EMAIL}>`,
        to: to,
        subject: subject,
        html: html
    })
}