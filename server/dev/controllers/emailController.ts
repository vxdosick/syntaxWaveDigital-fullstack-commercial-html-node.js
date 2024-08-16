import { Request, Response } from "express";
import { sendEmail } from "../services/emailService";

export async function sendEmailController(req: Request, res: Response) {
    const {email, select, textarea}: {email: string, select: string, textarea: string} = req.body;

    if (!email || !select || !textarea) {
        return res.status(400).send({ message: 'Email is required' });
    }

    try {
        const info = await sendEmail(email, select, textarea);
        return res.status(200).send({ message: 'Email sent', info });
    } catch (err) {
        res.status(500).send({ message: 'Failed to send email', err });
    }
}