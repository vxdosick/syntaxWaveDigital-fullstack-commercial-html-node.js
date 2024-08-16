"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_PASS = exports.PERSONAL_MAIL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PERSONAL_MAIL = process.env.PERSONAL_MAIL;
exports.MAIL_PASS = process.env.MAIL_PASS;
