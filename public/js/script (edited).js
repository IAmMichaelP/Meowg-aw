/********menu icon toggle*********/
let menu= document.querySelector("#menu-icon");
let navlist = document.querySelector('.navlist');

menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

/********transition*********/
const sr= ScrollReveal ({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});

sr.reveal('.menu-text', {delay: 200, origin:'top'});
sr.reveal('.menu-img', {delay: 450, origin:'top'});
sr.reveal('.icons', {delay: 500, origin:'left'});
sr.reveal('.infosection h2', {delay: 200, origin:'top'});
sr.reveal('.infosection', {delay: 500, origin:'left'});
sr.reveal('.slider-container h2', {delay: 100, origin:'top'});
sr.reveal('.wrapper', {delay: 70, origin:'left'});
sr.reveal('.donate-text', {delay: 70, origin:'left'});
sr.reveal('.donation-form', {delay: 70, origin:'top'});
sr.reveal('.reveal', {
    interval: 130, 
    origin: 'top' 
});

// ABOUT PAGE
function showContent(section) {
    const buttons = document.querySelectorAll('.misvis-btn');

    // Remove 'active' class from all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the clicked button
    event.currentTarget.classList.add('active');

    document.getElementById('missionContent').style.display = 'none';
    document.getElementById('visionContent').style.display = 'none';
    document.getElementById('membersContent').style.display = 'none';

    if (section === 'mission') {
        document.getElementById('missionContent').style.display = 'block';
        document.querySelector('.misvis-btn.active').classList.remove('active');
        event.currentTarget.classList.add('active');
    } else if (section === 'vision') {
        document.getElementById('visionContent').style.display = 'block';
    } else if (section === 'members') {
        document.getElementById('membersContent').style.display = 'block';
    }
}

// Initially show the "Mission" content and activate the button
document.getElementById('missionContent').style.display = 'block';
document.querySelector('.misvis-btn[onclick="showContent(\'mission\')"]').classList.add('active');

// POP UPS
// Show and hide popups
function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = "flex";
    setTimeout(function () {
        popup.classList.add('show');
        popup.querySelector('.popup-content').style.opacity = '1';
        popup.querySelector('.popup-content').style.transform = 'translateY(0)';
    }, 0);
}

// switching pop-up
function switchPopup(currentPopupId, newPopupId) {
    event.preventDefault();

    var currentPopup = document.getElementById(currentPopupId);
    var newPopup = document.getElementById(newPopupId);

    currentPopup.querySelector('.popup-content').style.opacity = '0';
    currentPopup.querySelector('.popup-content').style.transform = 'translateY(-50px)';

    setTimeout(function () {
        currentPopup.classList.remove('show');
        currentPopup.style.display = "none";

        newPopup.style.display = "flex";

        setTimeout(function () {
            newPopup.classList.add('show');
            newPopup.querySelector('.popup-content').style.opacity = '1';
            newPopup.querySelector('.popup-content').style.transform = 'translateY(0)';
        }, 50); 
    }, 500); 
}

function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.querySelector('.popup-content').style.opacity = '0';
    popup.querySelector('.popup-content').style.transform = 'translateY(-50px)';
    setTimeout(function () {
        popup.classList.remove('show');
        popup.style.display = "none";
    }, 500);
}

// when clicked outside of modal
function clickOutside(event) {
    var popupContents = document.querySelectorAll('.popup-content');
    for (var i = 0; i < popupContents.length; i++) {
        if (event.target == popupContents[i]) {
            return; 
        }
    }
    var popups = document.querySelectorAll('.popup');
    for (var i = 0; i < popups.length; i++) {
        if (popups[i].classList.contains('show')) {
            closePopup(popups[i].id);
            break;
        }
    }
}

document.addEventListener('click', clickOutside);

// HEART REACT FOR GALLERY PAGE
// heart
function toggleHeart(element) {
  element.classList.toggle('liked');
}
