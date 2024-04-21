const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = form.message.value;
    const senderEmail = form.email.value;
    const senderName = form.name.value;
    
    try {
        const res = await fetch('/about/message', { 
            method: "POST", 
            body: JSON.stringify({ body, senderEmail, senderName }),
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