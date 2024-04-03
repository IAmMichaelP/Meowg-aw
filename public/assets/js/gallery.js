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
          <h5><a href="#" class="text-dark">${stray.name}</a></h5>
          <p class="small text-muted mb-0">${stray.gender}</p>
          <p class="small text-muted mb-0">STATUS: ${stray.status}</p>

          <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
            <p class="small mb-0"><i class="fa fa-picture-o mr-2"></i><span class="font-weight-bold">${stray.breed.toUpperCase()}</span></p>
            <div class="badge badge-${getBadgeColor(stray.animal)} px-3 rounded-pill font-weight-normal">${getBadgeText(stray.animal)}</div>
          </div>

        </div>

      </div>
    `;

    //Set gallery item content
    galleryItem.innerHTML = galleryContent;

    // Append gallery item to the container
    galleryContainer.appendChild(galleryItem);
  });
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
    // Add more cases for other types if needed
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
    // Add more cases for other types if needed
    default:
      return 'Animal';
  }
}

