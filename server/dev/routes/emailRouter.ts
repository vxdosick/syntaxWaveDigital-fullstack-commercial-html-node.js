import { Router } from "express";
import { sendEmailController } from "../controllers/emailController";
export const router = Router();
router.post('/send-email', sendEmailController);