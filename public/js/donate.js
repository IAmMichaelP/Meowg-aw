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
  button.addEventListener('click', function(event) {
    // Prevent the default behavior (page refresh)
    event.preventDefault();

    // Remove the "clicked" class from all buttons
    buttons.forEach(btn => btn.classList.remove('clicked'));

    // Add the "clicked" class to the clicked button
    button.classList.add('clicked');
  });
});

// Add click event listener to the "Other Amount" button
otherAmountButton.addEventListener('click', function(event) {
  // Prevent the default behavior (page refresh)
  event.preventDefault();

  // Remove the "clicked" class from all buttons
  buttons.forEach(button => button.classList.remove('clicked'));
});

document.getElementById("otherAmountButton").addEventListener("click", function(event) {
  var inputFieldContainer = document.getElementById("inputFieldContainer");
  inputFieldContainer.style.display = "block";
  event.preventDefault(); // Prevent the default form submission behavior
  document.getElementById('text1000').style.display = 'none';
  document.getElementById('text750').style.display = 'none';
  document.getElementById('text500').style.display = 'none';
});

// Add event listeners for predefined amount buttons
document.getElementById("button1000").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default behavior (page refresh)
  document.getElementById('text1000').style.display = 'block';
  document.getElementById('text750').style.display = 'none';
  document.getElementById('text500').style.display = 'none';

  // Hide the input field
  document.getElementById('inputFieldContainer').style.display = 'none';
});

document.getElementById("button750").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior (page refresh)
    document.getElementById('text750').style.display = 'block';
    document.getElementById('text1000').style.display = 'none';
    document.getElementById('text500').style.display = 'none';

    // Hide the input field
    document.getElementById('inputFieldContainer').style.display = 'none';
});

document.getElementById("button500").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default behavior (page refresh)
  document.getElementById('text1000').style.display = 'none';
  document.getElementById('text750').style.display = 'none';
  document.getElementById('text500').style.display = 'block';

  // Hide the input field
  document.getElementById('inputFieldContainer').style.display = 'none';
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

document.getElementById("DonateButton").addEventListener("click", async function() {
    const selectCountry = document.getElementById('country');

    try {
        const response = await fetch('https://restcountries.com/v2/all');
        const data = await response.json();

        // Populate select input with countries fetched from the API
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = country.name;
            selectCountry.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
});

document.addEventListener('DOMContentLoaded', function() {
  let currentSection = 'donate1'; // Keep track of the current section

  function hideAllSections() {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }

  function showSection(sectionId) {
    hideAllSections();
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.display = 'block';
      currentSection = sectionId; // Update current section
    }
  }

  hideAllSections();
  showSection('donate1');

  document.getElementById('DonateButton').addEventListener('click', function() {
    showSection('donate3');
  });

  // document.getElementById('myinfoButton').addEventListener('click', function() {
  //   showSection('donate3');
  // });

  document.getElementById('paymentButton').addEventListener('click', function() {
    showSection('donate4');
  });

  document.getElementById('confirmButton').addEventListener('click', function() {
    showSection('donate5');
  });

  // Event listener for the Back buttons
  const backButtons = document.querySelectorAll('.back');
      backButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentSection === 'donate2') {
                showSection('donate1');
            } else if (currentSection === 'donate3') {
                showSection('donate2');
            } else if (currentSection === 'donate4') {
                showSection('donate3');
            } else if (currentSection === 'donate5') {
                showSection('donate4');
            }
        });
    });

    document.getElementById('doneButton').addEventListener('click', function() {
    // Reload the current page
    window.location.reload();
  });
});



function confirmDonation() {
    alert("Thank you for your donation!");
    window.location.href = "/donate";
}