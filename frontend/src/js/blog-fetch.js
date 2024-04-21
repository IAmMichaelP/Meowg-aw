const form = document.querySelector('.post-blog');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = form.body.value;
    const title = form.title.value;
    const uploader = form.uploader.value;
    
    try {
        const res = await fetch('/profile/blog', { 
            method: "POST", 
            body: JSON.stringify({ body, title, uploader }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        
        if (data.user) {
            location.assign('/profile/' + data.user);
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
});