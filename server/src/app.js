"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailRouter_1 = require("./routes/emailRouter");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/')));
app.use(express_1.default.json());
app.use("/api/", emailRouter_1.router);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
