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