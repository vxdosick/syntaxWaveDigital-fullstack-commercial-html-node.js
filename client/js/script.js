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
document.addEventListener("DOMContentLoaded", () => {
    const mainEmailform = document.querySelector(".main__emailform");
    const mainEmailinput = document.querySelector(".main__emailinput");
    const selectInput = document.querySelector(".main__selectinput");
    const textareaInput = document.querySelector(".main__textareainput");
    mainEmailform.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const email = mainEmailinput.value;
        const select = selectInput.value;
        const textarea = textareaInput.value;
        try {
            const response = yield fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, select, textarea }),
            });
            const result = yield response.json();
            if (response.ok) {
                alert('Email sent successfully');
            }
            else {
                alert(`Failed to send email: ${result.message}`);
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the email');
        }
        mainEmailinput.value = "";
        selectInput.value = "Select servise";
        textareaInput.value = "";
    }));
});
