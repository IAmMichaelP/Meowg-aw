// script for admin-dashboard and user profile
window.addEventListener('click', function(event) {
    var modal = document.getElementById('profile-modal');
    if (event.target == modal) {
        closePopup('profile-modal');
    }
});

function openPopup() {
    var modal = document.getElementById('profile-modal');
    modal.style.display = 'block';
}

function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = 'none';
}

// ADMIN-DASHBOARD
const buttons = document.querySelectorAll('.buttons-container button');
const contentDivs = document.querySelectorAll('.contentStray');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const contentToShow = button.getAttribute('data-content');

        buttons.forEach(btn => btn.classList.remove('active'));
        contentDivs.forEach(contentStray => contentStray.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(`content-${contentToShow}`).classList.add('active');
    });
});

