function retrieveStrayData() {
  parsedStrayData = JSON.parse(strays);
  return parsedStrayData ? parsedStrayData : [];
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
      <div class="bg-white rounded shadow-sm">
        <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}" class="gallery-img img-fluid card-img-top">

        <div class="p-4">
          <h5><a href="#" class="text-dark stray-detail-link" data-stray='${JSON.stringify(stray)}'>${stray.name}</a></h5>
          <p class="small text-muted mb-0">${stray.gender}</p>
          <p class="small text-muted mb-0">STATUS: ${stray.status}</p>

          <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
            <p class="small mb-0"><i class="fa fa-picture-o mr-2"></i><span class="font-weight-bold">${stray.breed.toUpperCase()}</span></p>
            <div class="badge badge-${getBadgeColor(stray.animal)} px-3 rounded-pill font-weight-normal">${getBadgeText(stray.animal)}</div>
          </div>

        </div>

      </div>
    `;

    // Set gallery item content
    galleryItem.innerHTML = galleryContent;

    // Append gallery item to the container
    galleryContainer.appendChild(galleryItem);
  });

  // Event listener for stray detail links
  const strayDetailLinks = document.querySelectorAll('.stray-detail-link');
  strayDetailLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      console.log("Link clicked!"); // Check if this message is logged
      const strayData = JSON.parse(this.getAttribute('data-stray'));
      displayStrayDetails(strayData);
    });
  });
}


// for the modal
function displayStrayDetails(stray) {
  const modalTitle = document.querySelector('#strayModalLabel');
  modalTitle.textContent = `Meet ${stray.name}`;
  var parsedImg = stray.imgData.toString('base64');

  const strayDetailsContent = document.querySelector('#strayDetailsContent');
  // Clear existing content
  strayDetailsContent.innerHTML = '';

  // Populate modal with stray details
  const strayDetailContent = `

    <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}" class="gallery-img img-fluid card-img-top">

    <h5>Name: ${stray.name}</h5>
    <p>Status: ${stray.status}</p>
    <p>Gender: ${stray.gender}</p>
    <p>Breed: ${stray.breed}</p>
    <p class="strayDetails"><b>Age:</b> ${stray.age}</p>
    <p class="strayDetails"><b>Color:</b> ${stray.color}</p>
    <p class="strayDetails"><b>Size:</b> ${stray.size} kg</p>
    <div class="strayDetails">
      <label for="temperamentSlider"><b>Temperament:</b></label><br>

        <div class="custom-slider">
          <input type="range" id="temperamentSlider" name="temperament" min="1" max="10" value="${stray.temperament}" />
        </div>

        <div class="slider-labels">
          <span>Chill</span>
          <span>Hyper</span>
        </div>

    </div>
    <p class="strayDetails"><b>Spayed/Neutered:</b> ${stray.spayedNeutered}</p>
    <p class="strayDetails"><b>Vaccinated:</b> ${stray.vaccinated}</p>
    <p class="strayDetails"><b>Surrender Date:</b> ${stray.surrenderDate}</p><br>
  `;
  strayDetailsContent.innerHTML = strayDetailContent;

  // Show the modal
  $('#strayModal').modal('show'); // Use jQuery to show the modal
}


// Call the function to display stray images
displayStrayImages();


// Helper function to get badge color based on type
function getBadgeColor(breed) {
  switch (breed.toLowerCase()) {
    case 'dog':
      return 'danger';
    case 'cat':
      return 'success';
    // Add more cases
    default:
      return 'primary';
  }
}

// Helper function to get badge text based on type
function getBadgeText(breed) {
  switch (breed.toLowerCase()) {
    case 'dog':
      return 'Dog';
    case 'cat':
      return 'Cat';
    // Add more cases
    default:
      return 'Animal';
  }
}

