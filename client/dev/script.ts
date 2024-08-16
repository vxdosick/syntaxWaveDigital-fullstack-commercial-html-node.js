document.addEventListener( "DOMContentLoaded", () => {
    const mainEmailform = document.querySelector(".main__emailform") as HTMLFormElement;
    const mainEmailinput = document.querySelector(".main__emailinput") as HTMLInputElement;
    const selectInput = document.querySelector(".main__selectinput") as HTMLInputElement;
    const textareaInput = document.querySelector(".main__textareainput") as HTMLInputElement;
    mainEmailform.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = mainEmailinput.value;
        const select = selectInput.value;
        const textarea = textareaInput.value;
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, select, textarea }),
            })

            const result = await response.json();
            if (response.ok) {
                alert('Email sent successfully');
            } else {
                alert(`Failed to send email: ${result.message}`);
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the email');
        }
        mainEmailinput.value = "";
        selectInput.value = "Select servise";
        textareaInput.value = "";
    });
})