function contactFormSubmit(formId){
    const contactForm = document.querySelector(formId);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const messageBody = contactForm.message.value;
        const senderEmail = contactForm.email.value;
        const senderName = contactForm.name.value;
        const messageSubject = contactForm.subject.value;
        
        try {
            const res = await fetch('/about/message', { 
                method: "POST", 
                body: JSON.stringify({ messageBody, senderEmail, senderName, messageSubject  }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            
            if (data.message) {
                location.assign('/about');
            } else {
                location.assign('/500');
            }

        }
        catch (err) {
            location.assign('/500');
        }
    });
}
