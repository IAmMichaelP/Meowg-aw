// script for admin-dashboard and user profile
// Initialize arrow state
let arrowState = "down";

function toggleArrow() {
    const arrowElement = document.getElementById('dropdown-arrow');

    if (arrowState === "down") {
        arrowElement.classList.add('fa-rotate-180'); // Add the fa-rotate-180 class for an upward arrow
        arrowState = "up";
    } else {
        arrowElement.classList.remove('fa-rotate-180'); // Remove the fa-rotate-180 class for a downward arrow
        arrowState = "down";
    }
}

function toggleModal() {
    var modal = document.getElementById('profile-modal');
    modal.style.display = 'block';
    toggleArrow(); 
}

window.addEventListener('click', function(event) {
    var modal = document.getElementById('profile-modal');
    if (event.target == modal) {
        closePop('profile-modal');
        toggleArrow();
    }
});

function closePop(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = 'none';
}

// ADMIN-DASHBOARD
const buttons = document.querySelectorAll('.buttons-container button');
const contentDivs = document.querySelectorAll('.contentStray');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const contentToShow = button.getAttribute('data-content');

        buttons.forEach(btn => btn.classList.remove('show'));
        contentDivs.forEach(contentStray => contentStray.classList.remove('show'));

        button.classList.add('show');
        document.getElementById(`content-${contentToShow}`).classList.add('show');
    });
});


// script for user-profile
function showContent(section) {

    document.getElementById('profile-blog-content').style.display = 'none';
    document.getElementById('profile-submission-content').style.display = 'none';
    document.getElementById('profile-purchases-content').style.display = 'none';
    // document.getElementById('profile-favorites-content').style.display = 'none';

    if (section === 'blogs') {
        document.getElementById('profile-blog-content').style.display = 'block';
    } else if (section === 'submissions') {
        document.getElementById('profile-submission-content').style.display = 'block';
    } else if (section === 'purchases') {
        document.getElementById('profile-purchases-content').style.display = 'block';
    }
    // else if (section === 'favorites') {
    //     document.getElementById('profile-favorites-content').style.display = 'block';
    // }
}

// admin-dashboard buttons
function showDashContent(section) {
    
    document.getElementById('users').style.display = 'none';
    document.getElementById('strays').style.display = 'none';
    document.getElementById('donations').style.display = 'none';
    document.getElementById('blogs').style.display = 'none';
    document.getElementById('shop').style.display = 'none';
    document.getElementById('faqs').style.display = 'none';
    document.getElementById('messages').style.display = 'none';

    if (section === 'users') {
        document.getElementById('users').style.display = 'block';
    } else if (section === 'strays') {
        document.getElementById('strays').style.display = 'block';
    } else if (section === 'donations') {
        document.getElementById('donations').style.display = 'block';
    }else if (section === 'blogs') {
        document.getElementById('blogs').style.display = 'block';
    }else if (section === 'shop') {
        document.getElementById('shop').style.display = 'block';
    }else if (section === 'faqs') {
        document.getElementById('faqs').style.display = 'block';
    }else if (section === 'messages') {
        document.getElementById('messages').style.display = 'block';
    }

}

