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