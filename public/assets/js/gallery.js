function retrieveStrayData() {
  parsedStrayData = JSON.parse(strays);
  return parsedStrayData ? parsedStrayData : [];
}

function retrieveUserData() {
  parsedUserData = JSON.parse(user);
  return parsedUserData ? parsedUserData : [];
}


// Function to display stray data images
function displayStrayImages() {
  const strayData = retrieveStrayData();
  const galleryContainer = document.querySelector('.galleryWrapper');

  strayData.forEach(stray => {
    var parsedImg = stray.imgData.toString('base64');

    // Create gallery item
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('col-xl-3', 'col-lg-4', 'col-md-6', 'mb-4');

    // Create gallery item content
    const galleryContent = `
      <div class="bg-white rounded shadow-sm stray-modal" data-stray='${JSON.stringify(stray)}'>
        <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}" class="gallery-img img-fluid card-img-top">

        <div class="p-4">
          <h5><a href="#" class="text-dark stray-detail-link" data-stray='${JSON.stringify(stray)}'>${stray.name}</a></h5>
          <p class="small text-muted mb-0">Breed: ${stray.breed}</p>

          <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
            <p class="small mb-0"></i><span class="font-weight-bold">${stray.gender.toUpperCase()}</span></p>
            <div class="badge badge-${getBadgeColor(stray.status)} px-3 rounded-pill font-weight-normal">${getBadgeText(stray.status)}</div>
          </div>

        </div>

      </div>
    `;

    // Set gallery item content
    galleryItem.innerHTML = galleryContent;

    // Append gallery item to the container
    galleryContainer.appendChild(galleryItem);
  });

  // Modify the event listener for stray detail links to attach it to the entire card container
  const galleryItems = document.querySelectorAll('.stray-modal');
  galleryItems.forEach(item => {
      item.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default link behavior
          console.log("Stray card clicked!");
          const strayData = JSON.parse(this.getAttribute('data-stray'));
          displayStrayDetails(strayData);
      });
  });
}

function displayStrayDetails(stray) {
  const modalTitle = document.querySelector('#strayModalLabel');
  modalTitle.textContent = `Meet ${stray.name}`;
  var parsedImg = stray.imgData.toString('base64');

  const submitButton = `<button class="adoptButton" type='submit'>Adopt ${stray.name}</button>`

  const strayDetailsContent = document.querySelector('#strayDetailsContent');
  // Clear existing content
  strayDetailsContent.innerHTML = '';

  // Populate modal with stray details

  // changed the surrender date to display in the format "Month Day, Year"
  const formattedSurrenderDate = new Date(stray.surrenderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

// Create gallery item content
const galleryContent = `
  <div class="bg-white rounded shadow-sm">
      <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}" class="gallery-img img-fluid card-img-top">

      <div class="p-4">
          <h5><a href="#" class="text-dark stray-detail-link" data-stray='${JSON.stringify(stray)}'>${stray.name}</a></h5>
          <p class="small text-muted mb-0">Breed: ${stray.breed}</p>
          <p class="small text-muted mb-0">Surrender Date: ${formattedSurrenderDate}</p>

          <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
              <p class="small mb-0"></i><span class="font-weight-bold">${stray.gender.toUpperCase()}</span></p>
              <div class="badge badge-${getBadgeColor(stray.status)} px-3 rounded-pill font-weight-normal">${getBadgeText(stray.status)}</div>
          </div>

      </div>

  </div>
`;

  let strayDetailContent = `
    <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}" class="gallery-img-modal img-fluid card-img-top">
    <br><br>
    <div class="badge badge-${getBadgeColor(stray.status)} px-3 rounded-pill font-weight-normal">${getBadgeTextDetail(stray.status)}</div>
    <br><br>
    <p><b>Name:</b> ${stray.name}</p>
    <p><b>Gender: </b>${stray.gender}</p>
    <p><b>Breed: </b>${stray.breed}</p>
    <p class="strayDetails"><b>Age:</b> ${stray.age}</p>
    <p class="strayDetails"><b>Color:</b> ${stray.color}</p>
    <p class="strayDetails"><b>Size:</b> ${stray.size} kg</p>
    <div class="strayDetails">
      <p><label for="temperamentProgress"><b>Temperament:</b></label></p>
    
      <div class="custom-progress">
        <progress id="temperamentProgress" value="${stray.temperament}" max="10"></progress>
      </div>

      <div class="progress-labels">
        <span>Chill</span>
        <span>Hyper</span>
      </div>
      <br>

    </div>
    <p class="strayDetails"><b>Spayed/Neutered:</b> ${stray.spayedNeutered}</p>
    <p class="strayDetails"><b>Vaccinated:</b> ${stray.vaccinated}</p>
    <p class="strayDetails"><b>Surrender Date:</b> ${formattedSurrenderDate}</p><br>
  `;

  // checks the display when a user is logged in
  if (user) {
    if(stray.status != 'evaluation for adoption ongoing') {
      const parsedUser = retrieveUserData;
      strayDetailContent += `
      <div class="adoptionForm">
        <h3>Interested in adopting ${stray.name}?</h3>

        <form action="/adopt" method="POST">
          <input type="hidden" name="strayId" value="${stray._id}">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="fullname" required>
          <input type="hidden" name="email" value="${parsedUser.email}">
          
          <label for="reason">Reason for Adoption</label>
          <input type="text" id="reason" name="reason" required>

          <label for="interviewModes">Preferred Interview Mode:</label>
            <div id="interviewModes">
              <input type="radio" id="f2f" name="interviewMode" value="face-to-face" required>
              <label for="f2f">Face-to-Face</label><br>
              <input type="radio" id="zoom" name="interviewMode" value="zoom" required>
              <label for="zoom">Zoom</label>
            </div>

          <label for="schedule">Preferred Interview Schedule:</label>
          <input type="date" id="schedule" name="interviewSchedule" required>
          <br>
          <button class="adoptButton">Adopt ${stray.name}</button>
        </form>
      </div>
      `;

      strayDetailsContent.innerHTML = strayDetailContent;
    } else {
      strayDetailsContent.innerHTML = strayDetailContent;
    }
  } 
  else {
    // modal content
    if(stray.status != 'evaluation for adoption ongoing') {
      strayDetailsContent.innerHTML = '<form>' + strayDetailContent + submitButton + '</form>';
      // handles the adoption when adopt button is clicked
      const adoptButton = document.querySelector('.adoptButton');
      const signInButton = document.querySelector('[data-toggle="modal"][data-target="#signIn"]');

      adoptButton.addEventListener('click', async (e) => {
        e.preventDefault();

        $('#strayModal').modal('hide');
        setTimeout(function () {
          signInButton.click();
        }, 300);
        
      });
    } else {
      strayDetailsContent.innerHTML = strayDetailContent;
    }
  }

  // Show the modal
  $('#strayModal').modal('show'); // Use jQuery to show the modal
  z
}

// Close modal function
function closeModal() {
  $('#strayModal').modal('hide');
}

// Call the function to display stray images
displayStrayImages();

// Helper function to get badge color based on type
function getBadgeColor(status) {
  switch (status.toLowerCase()) {
    case 'evaluation for adoption ongoing':
       return 'danger';
    case 'available for adoption':
      return 'success';
    // Add more cases
    default:
      return 'danger';
  }
}

// Helper function to get badge text based on type
function getBadgeText(status) {
  switch (status.toLowerCase()) {
    case 'evaluation for adoption ongoing':
      return 'Not available';
    case 'available for adoption':
      return 'available';
    // Add more cases
    default:
      return 'Available';
  }
}

// Helper function to get badge for stray details
function getBadgeTextDetail(status){
  switch (status.toLowerCase()) {
    case 'evaluation for adoption ongoing':
      return 'Evaluation for adoption ongoing';
    case 'available for adoption':
      return 'Available for adoption';
    // Add more cases
    default:
      return 'Available for adoption';
  }
}

//FILTERING CHURVA
document.addEventListener("DOMContentLoaded", function() {
    // Get all dropdowns
    const dropdowns = document.querySelectorAll(".dropdown");

    // Loop through each dropdown
    dropdowns.forEach(function(dropdown) {
        // Get the dropdown button and menu
        const button = dropdown.querySelector(".filterBtn");
        const menu = dropdown.querySelector(".dropdown-menu");

        // Add event listener to each dropdown menu item
        menu.querySelectorAll(".dropdown-item").forEach(function(item) {
            item.addEventListener("click", function() {
                // Get the text of the clicked item
                const newText = item.textContent.trim();
                
                // Update the text of the dropdown button
                button.textContent = newText;
            });
        });
    });
});

// for filtering strays
function showStrayData(category, color, sex, age) {
  console.log('working');
  console.log(color);

  const galleryContainer = document.querySelector('.galleryWrapper');
  const storedStrayData = retrieveStrayData();

  // clear content
  galleryContainer.innerHTML = '';

  // filter the stray data based on the category, color, and sex
  const filteredStrayData = storedStrayData.filter(stray => {
    return (category === 'all' || stray.animal === category) &&
           (color === 'all' || stray.color === color) &&
           (sex === 'all' || stray.gender === sex)&&
            (age === 'all' || stray.age === age);
  });

  if (filteredStrayData.length === 0) {
    // Display "No strays found" message
    const noStraysMessage = document.createElement('h1');
    noStraysMessage.textContent = 'No strays found.';
    galleryContainer.appendChild(noStraysMessage);
  } else {
      // Display filtered strays
      filteredStrayData.forEach(stray => {
          var parsedImg = stray.imgData.toString('base64');

          console.log('working');

          // Create gallery item
          const galleryItem = document.createElement('div');
          galleryItem.classList.add('col-xl-3', 'col-lg-4', 'col-md-6', 'mb-4');

          // Create gallery item content
          const galleryContent = `
            <div class="bg-white rounded shadow-sm strayModal">
              <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}" class="gallery-img img-fluid card-img-top">

              <div class="p-4">
                <h5><a href="#" class="text-dark stray-detail-link" data-stray='${JSON.stringify(stray)}'>${stray.name}</a></h5>
                <p class="small text-muted mb-0">Breed: ${stray.breed}</p>

                <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
                  <p class="small mb-0"></i><span class="font-weight-bold">${stray.gender.toUpperCase()}</span></p>
                  <div class="badge badge-${getBadgeColor(stray.status)} px-3 rounded-pill font-weight-normal">${getBadgeText(stray.status)}</div>
                </div>

              </div>

            </div>
          `;

          // Set gallery item content
          galleryItem.innerHTML = galleryContent;

          // Append gallery item to the container
          galleryContainer.appendChild(galleryItem);
      });
    }

  // Event listener for stray detail links
  const strayDetailLinks = document.querySelectorAll('.stray-detail-link');
  strayDetailLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();       // Prevent default link behavior
      console.log("Link clicked!"); 
      const strayData = JSON.parse(this.getAttribute('data-stray'));
      displayStrayDetails(strayData);
    });
  });
}

// Add event listeners to the dropdowns to trigger filtering on change
document.getElementById('categoryDropdown').addEventListener('change', searchStrayData);
document.getElementById('colorDropdown').addEventListener('change', searchStrayData);
document.getElementById('sexDropdown').addEventListener('change', searchStrayData);
document.getElementById('ageDropdown').addEventListener('change', searchStrayData);

// this function directly filters data
function searchStrayData() {
  const category = document.getElementById('categoryDropdown').value;
  const color = document.getElementById('colorDropdown').value;
  const sex = document.getElementById('sexDropdown').value;
  const age = document.getElementById('ageDropdown').value;

  showStrayData(category, color, sex, age);
}

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
