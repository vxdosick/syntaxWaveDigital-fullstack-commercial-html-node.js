"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
exports.router = (0, express_1.Router)();
exports.router.post('/send-email', emailController_1.sendEmailController);
