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

        const jsonData = { email, select, textarea };
        console.log('JSON to be sent:', jsonData);

        
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, select, textarea }),
            });
            const contentType = response.headers.get('Content-Type') || '';
            let result;
            if (contentType.includes('application/json')) {
                result = await response.json();
            } else {
                result = await response.text();
            }
        
            if (response.ok) {              
                alert('Email sent successfully');
            } else {
                const message = result && typeof result === 'object' ? result.message : 'Unknown error';
                alert(`Failed to send email: ${message}`);
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