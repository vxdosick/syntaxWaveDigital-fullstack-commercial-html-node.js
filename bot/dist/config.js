"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_CHAT_ID = exports.TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.TOKEN) {
    throw new Error('TOKEN is not defined');
}
if (!process.env.ADMIN_CHAT_ID) {
    throw new Error('ADMIN_CHAT_ID is not defined');
}
// else {
//     console.log("Loaded credentials:", process.env.ADMIN_CHAT_ID, process.env.TOKEN);
// }
exports.TOKEN = process.env.TOKEN;
exports.ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
