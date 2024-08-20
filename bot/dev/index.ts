import TelegramBot = require("node-telegram-bot-api");
import { TOKEN, ADMIN_CHAT_ID } from "./config";
const bot = new TelegramBot(TOKEN, { polling: true });


import { IOrder } from "./types.interfaces";

const orders = new Map<number, IOrder>();

bot.setMyCommands([
    { command: "/start", description: "Start" },
    { command: "/new_order", description: "Make new order" }
]);

bot.on("message", async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    
    switch (msg.text) {
        case "/start":
            orders.delete(chatId);
            await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/364/159/364159a8-d72f-4a04-8aa1-3272dd144b06/3.webp");
            bot.sendMessage(chatId, "Hi, you are welcomed by SyntaxWaveDigital. In the menu you have several useful commands, the main of which is /new_order. Thanks to it you can create and send a new order. Good luck! And make yourself at home.");
            break;
        case "/new_order":
            startNewOrder(chatId);
            break;
        default:
            bot.sendMessage(chatId, "Please use /start or /new_order to interact with the bot.");
            break;
    }
});

const startNewOrder = async (chatId: number) => {
    orders.set(chatId, { email: "", description: "", service: "" });
    await askForEmail(chatId);
};

const askForEmail = (chatId: number): Promise<void> => {
    return bot.sendMessage(chatId, "Let's start creating a new order.\nPlease, write your Email.")
        .then(() => new Promise<void>((resolve) => {
            bot.once("text", (msg: TelegramBot.Message) => {
                const email = msg.text;
                if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    const order = orders.get(chatId);
                    if (order) {
                        order.email = email;
                        orders.set(chatId, order);
                    }
                    bot.sendMessage(chatId, "Email accepted.").then(() => resolve(askForDescription(chatId)));
                } else {
                    bot.sendMessage(chatId, "Please enter a valid Email.").then(() => resolve(askForEmail(chatId)));
                }
            });
        }));
};

const askForDescription = (chatId: number): Promise<void> => {
    return bot.sendMessage(chatId, "All right. Now write a description of your order.")
        .then(() => new Promise<void>((resolve) => {
            bot.once("text", (msg: TelegramBot.Message) => {
                const description = msg.text;
                if (description && description.trim() !== "") {
                    const order = orders.get(chatId);
                    if (order) {
                        order.description = description;
                        orders.set(chatId, order);
                    }
                    bot.sendMessage(chatId, "Description accepted.").then(() => resolve(askForService(chatId)));
                } else {
                    bot.sendMessage(chatId, "Please write a valid description.").then(() => resolve(askForDescription(chatId)));
                }
            });
        }));
};

const askForService = (chatId: number): Promise<void> => {
    return bot.sendMessage(chatId, "Now choose which type of service you are interested in.", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Advertising site", callback_data: "advertising-site" }],
                [{ text: "Online shop", callback_data: "online-shop" }],
                [{ text: "Landing pages layout", callback_data: "landing-pages-layout" }],
                [{ text: "Mail layout", callback_data: "mail-layout" }],
                [{ text: "Other", callback_data: "other" }],
            ]
        }
    }).then(() => new Promise<void>((resolve) => {
        bot.once("callback_query", (callbackQuery) => {
            const service = callbackQuery.data;
            if (service) {
                const order = orders.get(chatId);
                if (order) {
                    order.service = service;
                    orders.set(chatId, order);
                }
                bot.sendMessage(chatId, `Service selected: ${service}`).then(() => resolve(confirmOrder(chatId)));
            }
        });
    }));
};

const confirmOrder = async (chatId: number) => {
    const order = orders.get(chatId);
    if (!order) return;

    await bot.sendMessage(chatId, `Thank you for your order. We will contact you soon.

        Here are the details of your order:
        - Email: ${order.email}
        - Description: ${order.description}
        - Service: ${order.service}`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Confirm", callback_data: "confirm" }],
                    [{ text: "Cancel", callback_data: "cancel" }],
                ]
            }
        });
};

bot.on("callback_query", async (callbackQuery: TelegramBot.CallbackQuery) => {
    const data: string | undefined = callbackQuery.data;
    const chatId = callbackQuery.message?.chat.id;

    if (!chatId) return;

    if (data === 'confirm') {
        await bot.sendMessage(chatId, "Thank you for your order. We will contact you soon.");
        
        const order = orders.get(chatId);
        if (!order) return;

        const orderDetails = `
        New Order Received:
        - Email: ${order.email}
        - Description: ${order.description}
        - Service: ${order.service}
        `;

        await bot.sendMessage(ADMIN_CHAT_ID, orderDetails);
        orders.delete(chatId);
    } else if (data === 'cancel') {
        await bot.sendMessage(chatId, "Order canceled.");
        orders.delete(chatId);
    }

    await bot.answerCallbackQuery(callbackQuery.id);
});
