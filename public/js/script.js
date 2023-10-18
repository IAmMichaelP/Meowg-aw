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
sr.reveal('.reveal', {
    interval: 130, 
    origin: 'top' 
});


/********change bg color on scroll*********/
function changeBg() {
  var header = document.getElementById('header');
  var scrollValue = window.scrollY;

  if (scrollValue < 550) {
    header.classList.remove('headerOnScroll');
    header.classList.add('header');
  } else {
    header.classList.remove('header');
    header.classList.add('headerOnScroll');
  }
}

window.addEventListener('scroll', changeBg);


/*************scroll down button***********/
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


// Show and hide popups
function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = "block";
}

function closePopup(popupId) {
    var popup = document.getElementById(popupId);
        popup.style.display = "none";
}

// heart
function toggleHeart(element) {
  element.classList.toggle('liked');
}