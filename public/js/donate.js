let valueDisplays = document.querySelectorAll(".num");
let duration = 2000; // Total duration in milliseconds

valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = (timestamp - startTime) / duration;
        startValue = Math.min(progress * endValue, endValue);

        valueDisplay.textContent = Math.round(startValue);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
});

// Get references to the buttons
const buttons = document.querySelectorAll('.money-btn');
const otherAmountButton = document.getElementById('otherAmountButton');

// Add click event listeners to the buttons
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove the "clicked" class from all buttons
    buttons.forEach(btn => btn.classList.remove('clicked'));

    // Add the "clicked" class to the clicked button
    button.classList.add('clicked');
  });
});

// Add click event listener to the "Other Amount" button
otherAmountButton.addEventListener('click', function() {
  // Remove the "clicked" class from all buttons
  buttons.forEach(button => button.classList.remove('clicked'));
});

function showContent(section) {

    // Hide all text sections
    document.getElementById('text1000').style.display = 'none';
    document.getElementById('text750').style.display = 'none';
    document.getElementById('text500').style.display = 'none';

    // Hide the input field
    document.getElementById('inputFieldContainer').style.display = 'none';

    // Show the selected text section
    document.getElementById('text' + section).style.display = 'block';
}

document.getElementById("otherAmountButton").addEventListener("click", function(event) {
    var inputFieldContainer = document.getElementById("inputFieldContainer");
    inputFieldContainer.style.display = "block";
    event.preventDefault(); // Prevent the default form submission behavior
    document.getElementById('text1000').style.display = 'none';
    document.getElementById('text750').style.display = 'none';
    document.getElementById('text500').style.display = 'none';
});

// Add event listeners for predefined amount buttons
document.getElementById("button1000").addEventListener("click", function() {
    showContent("1000");
});

document.getElementById("button750").addEventListener("click", function() {
    showContent("750");
});

document.getElementById("button500").addEventListener("click", function() {
    showContent("500");
});

window.onload = function() {
      fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
          const countrySelect = document.getElementById('country');
          data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.text = country.name;
            countrySelect.add(option);
          });
        });
    };

function confirmDonation() {
    alert("Thank you for your donation!");
    window.location.href = "donate.html";
}