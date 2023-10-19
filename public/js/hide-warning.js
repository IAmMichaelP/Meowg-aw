let password = "";
let repassword = "";
		

    function handleOnKeyUp(input, event) {
        const currentKeys = document.querySelector(`#${input}`);
        const button = document.querySelector('.submit');
        let currentKeysUp = '';
        currentKeysUp = currentKeysUp ? currentKeysUp + currentKeys : currentKeys;
		if (input === "repassword") { repassword = currentKeysUp.value } else { password = currentKeysUp.value }

		if (repassword.length == 0) { console.log("waiting"); button.disabled = true; warningToggle(true); } else {
			if (password === repassword) {
                button.disabled = false;
                warningToggle(true);
			} else {
				console.log("no");
                button.disabled = true;
                warningToggle(false);
			}
		}
                    
    }

    function warningToggle(status) {
        const warning = document.querySelector('.warning');
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