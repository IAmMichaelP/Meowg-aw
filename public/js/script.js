console.log("Read from start");
/********menu icon toggle*********/
let menu= document.querySelector("#menu-icon");
let navlist = document.querySelector('.navlist');
console.log("4");
menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}
console.log("5");
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
sr.reveal('.reveal', {interval: 130, origin: 'top'});

// ABOUT PAGE
function showContent(section) {
    const buttons = document.querySelectorAll('.misvis-btn');

    // Remove 'toggled' class from all buttons
    buttons.forEach(button => {
        button.classList.remove('toggled');
    });

    // Add 'toggled' class to the clicked button
    event.currentTarget.classList.add('toggled');

    document.getElementById('missionContent').style.display = 'none';
    document.getElementById('visionContent').style.display = 'none';
    document.getElementById('membersContent').style.display = 'none';

    if (section === 'mission') {
        document.getElementById('missionContent').style.display = 'block';
        document.querySelector('.misvis-btn.toggled').classList.remove('toggled');
        event.currentTarget.classList.add('toggled');
    } else if (section === 'vision') {
        document.getElementById('visionContent').style.display = 'block';
    } else if (section === 'members') {
        document.getElementById('membersContent').style.display = 'block';
    }
}

// Initially show the "Mission" content and activate the button
document.getElementById('missionContent').style.display = 'block';
document.querySelector('.misvis-btn[onclick="showContent(\'mission\')"]').classList.add('toggled');

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
               
    window.onclick = function(event) {
        if (event.target == popup) {
            closePopup(popupId);
        }
    };
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

// go to specific section in about us for buttons in footer
 function showContentFooter(contentId) {
    // Hide all content sections
    var contents = document.querySelectorAll('.abt-content-container > div');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });

    // Show the specific content section
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

// checkout button
document.getElementById('checkoutButton').addEventListener('click', function() {
    window.location.href = 'checkout.ejs';
  });