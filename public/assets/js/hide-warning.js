/*** 
    This js file handles the edit-profile, signup, and signin fetching and sending data to the server.
    The associated errors during the events are also handled and rendered to the ui here. 
***/

let password = "";
let repassword = "";

// handles the obvious errors during signin
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

// handles the password and confirm password event in signup
function handleOnKeyUp (input, event) {
    const currentKeys = document.querySelector(`#${input}`);
    const button = document.querySelector('.submit');
    let currentKeysUp = '';
    currentKeysUp = currentKeysUp ? currentKeysUp + currentKeys : currentKeys;

    // checks if the current keys in confirm password matches the current keys in password field
    if (input === "repassword") { repassword = currentKeysUp.value } else { password = currentKeysUp.value }

    // disables the signup buttons until password and confirm password matches
    if (repassword.length == 0) { button.disabled = true; warningToggle(true, 'warning'); } else {
        if (password === repassword) {
            button.disabled = false;
            warningToggle(true, 'warning');
        } else {
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

// this listens to signin and signup events and lets the backend send the error message when it exists.
function listenForm(formId) {
    const form = document.querySelector(formId);
    let signToggle = 'signin';
    if (formId == "#signup-form"){
        signToggle = 'signup';
    }
    const emailError = document.querySelector(`.email.error.${signToggle}`);
    const passwordError = document.querySelector(`.password.error.${signToggle}`);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // reset errors
        emailError.textContent = '';
        passwordError.textContent = '';

        // get values
        const email = form.email.value;
        const password = form.password.value;

        try {
            if (formId == "#signup-form") {
                const role = form.role.value;
                const username = form.username.value;
                const res = await fetch('/signup', { 
                    method: 'POST', 
                    body: JSON.stringify({ username, email, password, role }),
                    headers: {'Content-Type': 'application/json'}
                });
                
                const data = await res.json();
                console.log(data);
                if (data.errors) {
                    emailError.textContent = data.errors.email;
                    passwordError.textContent = data.errors.password;
                }
                if (data.user) {
                    location.assign('/profile/' + data.user);
                }
            } else {
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
        }
        catch (err) {
            console.log(err);
        }
    });
}

// this listens the edit profile event and sends the error message when it exists
listenEditProfile = () => {
    // edit profile form authentication method
    const editform = document.querySelector('#edit-profile-form');
    const imageDataError = document.querySelector('#image-data-error');
    const emailError = document.querySelector('#email-error');
    const passwordError = document.querySelector('#password-error');
    console.log(imageDataError, emailError, passwordError);

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

        const formData = new FormData(editform);

        // const URLencoded = new URLSearchParams(formData).toString();

        try {
            const res = await fetch('/profile/edit-profile', { 
                method: "PUT", 
                body: formData,
            });
            const data = await res.json();
            
            // renders the error to email when it exists
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
};

function uploadPic() {
    console.log("Uploading picture...");
    const imgInput = document.querySelector('.img-input');
    const imgError = document.querySelector('#image-data-error');
    const editButton = document.querySelector('.submit-button');
    console.log(editButton);

   
        let img = imgInput.files;

        if(img.length > 0) {
            if(img[0].size > 2 * 1024 * 1024){
                imgError.innerText = 'Uploaded image must not exceed 2 MB';
                imgError.style.color = 'red';
                editButton.disabled = true;
                editButton.style.opacity = '0.5';
                
                console.log("reading error: " + imgError);
            } else {
                imgError.innerText = ''; // Clear any previous error message
                editButton.disabled = false; // Re-enable the button if the file is valid
                console.log("reading error: " + imgError);
                editButton.style.opacity = '1.0';
            }
        }
}

