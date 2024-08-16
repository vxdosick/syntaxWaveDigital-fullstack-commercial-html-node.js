"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailController = sendEmailController;
const emailService_1 = require("../services/emailService");
function sendEmailController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, select, textarea } = req.body;
        if (!email || !select || !textarea) {
            return res.status(400).send({ message: 'Email is required' });
        }
        try {
            const info = yield (0, emailService_1.sendEmail)(email, select, textarea);
            return res.status(200).send({ message: 'Email sent', info });
        }
        catch (err) {
            res.status(500).send({ message: 'Failed to send email', err });
        }
    });
}
