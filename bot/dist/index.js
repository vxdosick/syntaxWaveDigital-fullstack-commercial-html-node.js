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
const TelegramBot = require("node-telegram-bot-api");
const config_1 = require("./config");
const bot = new TelegramBot(config_1.TOKEN, { polling: true });
const orders = new Map();
bot.setMyCommands([
    { command: "/start", description: "Start" },
    { command: "/new_order", description: "Make new order" }
]);
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    switch (msg.text) {
        case "/start":
            orders.delete(chatId);
            yield bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/364/159/364159a8-d72f-4a04-8aa1-3272dd144b06/3.webp");
            bot.sendMessage(chatId, "Hi, you are welcomed by SyntaxWaveDigital. In the menu you have several useful commands, the main of which is /new_order. Thanks to it you can create and send a new order. Good luck! And make yourself at home.");
            break;
        case "/new_order":
            startNewOrder(chatId);
            break;
        default:
            bot.sendMessage(chatId, "Please use /start or /new_order to interact with the bot.");
            break;
    }
}));
const startNewOrder = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    orders.set(chatId, { email: "", description: "", service: "" });
    yield askForEmail(chatId);
});
const askForEmail = (chatId) => {
    return bot.sendMessage(chatId, "Let's start creating a new order.\nPlease, write your Email.")
        .then(() => new Promise((resolve) => {
        bot.once("text", (msg) => {
            const email = msg.text;
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                const order = orders.get(chatId);
                if (order) {
                    order.email = email;
                    orders.set(chatId, order);
                }
                bot.sendMessage(chatId, "Email accepted.").then(() => resolve(askForDescription(chatId)));
            }
            else {
                bot.sendMessage(chatId, "Please enter a valid Email.").then(() => resolve(askForEmail(chatId)));
            }
        });
    }));
};
const askForDescription = (chatId) => {
    return bot.sendMessage(chatId, "All right. Now write a description of your order.")
        .then(() => new Promise((resolve) => {
        bot.once("text", (msg) => {
            const description = msg.text;
            if (description && description.trim() !== "") {
                const order = orders.get(chatId);
                if (order) {
                    order.description = description;
                    orders.set(chatId, order);
                }
                bot.sendMessage(chatId, "Description accepted.").then(() => resolve(askForService(chatId)));
            }
            else {
                bot.sendMessage(chatId, "Please write a valid description.").then(() => resolve(askForDescription(chatId)));
            }
        });
    }));
};
const askForService = (chatId) => {
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
    }).then(() => new Promise((resolve) => {
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
const confirmOrder = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = orders.get(chatId);
    if (!order)
        return;
    yield bot.sendMessage(chatId, `Thank you for your order. We will contact you soon.

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
});
bot.on("callback_query", (callbackQuery) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = callbackQuery.data;
    const chatId = (_a = callbackQuery.message) === null || _a === void 0 ? void 0 : _a.chat.id;
    if (!chatId)
        return;
    if (data === 'confirm') {
        yield bot.sendMessage(chatId, "Thank you for your order. We will contact you soon.");
        const order = orders.get(chatId);
        if (!order)
            return;
        const orderDetails = `
        New Order Received:
        - Email: ${order.email}
        - Description: ${order.description}
        - Service: ${order.service}
        `;
        yield bot.sendMessage(config_1.ADMIN_CHAT_ID, orderDetails);
        orders.delete(chatId);
    }
    else if (data === 'cancel') {
        yield bot.sendMessage(chatId, "Order canceled.");
        orders.delete(chatId);
    }
    yield bot.answerCallbackQuery(callbackQuery.id);
}));
