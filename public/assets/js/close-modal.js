/**
 * 
 * This js file is used for closing any modals that exist
 */

function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    var backdrop = document.querySelector('.modal-backdrop'); 
  
    // Animate modal close
    popup.querySelector('.popup-content').style.opacity = '0';
    popup.querySelector('.popup-content').style.transform = 'translateY(-50px)';
    
    setTimeout(function () {
        popup.classList.remove('show');
        popup.style.display = "none";
        
        if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
        }
        
        // // Optionally remove the 'modal-open' class from the body if it exists
        // document.body.classList.remove('modal-open');
    }, 200);
  }

  function swapAuthModal() {
    console.log("swap auth");
    const signInButton = document.querySelector('#swap-signup');
    const signUpButton = document.querySelector('#swap-login');

    signUpButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("sign in auth");

      setTimeout(() => {
        $('#signIn').modal('hide');
        $('#signUp').modal('show');
      }, 500);  // Adjust the timeout duration if needed
    });
  
    signInButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("sign up auth");

      setTimeout(() => {
        $('#signUp').modal('hide');
        $('#signIn').modal('show');
      }, 500);  // Adjust the timeout duration if needed
    });
  }
  
  // Call the function to attach the event listeners
  swapAuthModal();