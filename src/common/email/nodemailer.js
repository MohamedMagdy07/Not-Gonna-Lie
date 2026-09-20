import 'dotenv/config';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
})

export async function sendEmail(to, subject, html) {

     await transporter.sendMail({
         from: `"Not Gonna Lie App" <${process.env.EMAIL}>`,
         to: to,
         subject: subject,
         html: html
     })
}