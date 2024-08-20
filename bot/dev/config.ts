import dotenv from "dotenv";

dotenv.config();

if (!process.env.TOKEN) {
    throw new Error('TOKEN is not defined');
}

if (!process.env.ADMIN_CHAT_ID) {    
    throw new Error('ADMIN_CHAT_ID is not defined');
} 
// else {
//     console.log("Loaded credentials:", process.env.ADMIN_CHAT_ID, process.env.TOKEN);
// }

export const TOKEN = process.env.TOKEN;
export const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;