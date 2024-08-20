import dotenv from "dotenv";

dotenv.config();

export const PERSONAL_MAIL: string | undefined = process.env.PERSONAL_MAIL;
export const MAIL_PASS: string | undefined = process.env.MAIL_PASS;

console.log("Loaded credentials:", PERSONAL_MAIL, MAIL_PASS);