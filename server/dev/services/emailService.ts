import nodemailer from 'nodemailer';
import { PERSONAL_MAIL, MAIL_PASS } from '../config';
export async function sendEmail(recipientEmail: string, typeOfWork: string, description: string) {
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: PERSONAL_MAIL,
            pass: MAIL_PASS,
        },
    });

    const mailOptions: nodemailer.SendMailOptions = {
        from: PERSONAL_MAIL,
        to: PERSONAL_MAIL,
        subject: `${recipientEmail} + ${typeOfWork}`,
        text: `
            Mail: ${recipientEmail}.
            Type of work: ${typeOfWork}.
            Description: ${description}.
        `,
    };

    try {
        const info: nodemailer.SentMessageInfo = await transporter.sendMail(mailOptions);
        console.log("email sent good");
        return info;
    } catch (err) {
        console.log("email sent bad " + err);
        throw err;
    }
}