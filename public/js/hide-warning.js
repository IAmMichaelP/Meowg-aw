let password = "";
let repassword = "";
		

const signinError = () => {
    const warning = document.querySelector('.signin-warning');
    warning.classList.remove('hide-warning');
    document.querySelector(`.usernameSi`).addEventListener('keyup', (e) => {
        toggleCall(e);
    });
    document.querySelector(`.emailSi`).addEventListener('keyup', (e) => {
        toggleCall(e);
    });
    document.querySelector(`.passwordSi`).addEventListener('keyup', (e) => {
        toggleCall(e);
    });
}

const toggleCall = (event) => {
    const currentKeys = event;
    let currentKeysUp = '';
    currentKeysUp = currentKeysUp ? currentKeysUp + currentKeys : currentKeys;
    if (currentKeysUp.length != 0) { warningToggle(true, 'signin-warning') }
}

function handleOnKeyUp (input, event) {
    const currentKeys = document.querySelector(`#${input}`);
    const button = document.querySelector('.submit');
    let currentKeysUp = '';
    currentKeysUp = currentKeysUp ? currentKeysUp + currentKeys : currentKeys;
    if (input === "repassword") { repassword = currentKeysUp.value } else { password = currentKeysUp.value }

    if (repassword.length == 0) { console.log("waiting"); button.disabled = true; warningToggle(true, 'warning'); } else {
        if (password === repassword) {
            button.disabled = false;
            warningToggle(true, 'warning');
        } else {
            console.log("no");
            button.disabled = true;
            warningToggle(false, 'warning');
        }
    }
                
}

function warningToggle(status, popup) {
    const warning = document.querySelector(`.${popup}`);
    if(status){
        if(!warning.classList.contains('hide-warning')){
            warning.classList.add('hide-warning');
        }
    } else {
        if(warning.classList.contains('hide-warning')){
            warning.classList.remove('hide-warning');
        }
    }
}

// login form authentication method
const form = document.querySelector('#login-form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';

    // get values
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(username, email, password);

    try {
        const res = await fetch('/signin', { 
            method: 'POST', 
            body: JSON.stringify({ username, email, password }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if (data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }
        if (data.user) {
            location.assign('/profile/' + data.user);
        }

    }
    catch (err) {
        console.log(err);
    }
});

// edit profile form authentication method
const editform = document.querySelector('#edit-profile-form');
const imageDataError = document.querySelector('.imageData.error');

editform.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    imageDataError.textContent = '';

    // get values
    const img = editform.img;
    const username = editform.username.value;
    const email = editform.email.value;
    const password = editform.password.value;

    console.log(img);

    const formData = new FormData(editform);
    // formData.append('img', img.files[0], "workingwev");
    // formData.append('username', username);
    // formData.append('email', email);
    // formData.append('password', password);

    const URLencoded = new URLSearchParams(formData).toString();

    console.log(URLencoded);

    console.log(formData);
    console.log(formData.username);
    console.log(username, email, password);
    console.log(img.files[0]);

    try {
        const res = await fetch('/profile/edit-profile', { 
            method: "PUT", 
            body: formData,
        });
        const data = await res.json();
        
        if (data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            imageDataError.textContent = data.errors.imageData;
        }
        if (data.user) {
            location.assign('/profile/' + data.user);
        }

    }
    catch (err) {
        console.log(err);
    }
});