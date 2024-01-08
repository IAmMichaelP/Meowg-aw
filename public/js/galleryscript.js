function retrieveStrayData() {
  parsedStrayData = JSON.parse(strays);
  return parsedStrayData ? parsedStrayData : [];
}

function displayDescModal(stray) {
  var parsedImg = stray.imgData.toString('base64');
  const modal = document.getElementById('descModal');
  const modalContent = document.getElementById('desc');
  
  const submitButton = `<button class="adoptButton" type='submit'>Adopt ${stray.name}</button>`

  let strayContent =
  `
    <div class="details-container">
      <h2>Meet ${stray.name}</h2>
      <h3 id="adoptionStatus" class="strayStatus availAdopt">${stray.status}</h3>

      <div class="details">
        <div class="image">
          <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}">
        </div>

        <div class="description">
          <p class="strayDetails"><b>Name:</b> ${stray.name}</p>
          <p class="strayDetails"><b>Sex:</b> ${stray.gender}</p>
          <p class="strayDetails"><b>Breed:</b> ${stray.breed}</p>
          <p class="strayDetails"><b>Age:</b> ${stray.age}</p>
          <p class="strayDetails"><b>Color:</b> ${stray.color}</p>
          <p class="strayDetails"><b>Size:</b> ${stray.size} kg</p>
          <div class="strayDetails">
            <label for="temperamentSlider"><b>Temperament:</b></label><br>

              <div class="custom-slider">
                <input type="range" id="temperamentSlider" name="temperament" min="1" max="100" value="${stray.temperament}" />
              </div>

              <div class="slider-labels">
                <span>Chill</span>
                <span>Hyper</span>
              </div>

          </div>
          <p class="strayDetails"><b>Spayed/Neutered:</b> ${stray.spayedNeutered}</p>
          <p class="strayDetails"><b>Vaccinated:</b> ${stray.vaccinated}</p>
          <p class="strayDetails"><b>Surrender Date:</b> ${stray.surrenderDate}</p><br>
        </div>
      </div>

      <h4>About ${stray.name}</h4>
      <p>${stray.story}</p>
    </div>`;

  const adoptionStatus = document.getElementById('adoptionStatus');

  // checks the display when a user is logged in
  if (user) {
    if(stray.status != 'evaluation for adoption ongoing') {
    const parsedUser = JSON.parse(user);
    strayContent = strayContent +
    `
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
        <button class="adoptButton">Adopt ${stray.name}</button>
      </form>
    </div>
    `;
      // modal content
      modalContent.innerHTML = strayContent;
      } else {
        // modal content
        modalContent.innerHTML = strayContent;
        adoptionStatus.classList.add('adoption-ongoing')}
  } else {
    // modal content
    if(stray.status != 'evaluation for adoption ongoing') {
    modalContent.innerHTML = '<form>' + strayContent + submitButton + '</form>';
    // handles the adoption when adopt button is clicked
    const adoptButton = document.querySelector('.adoptButton');
    adoptButton.addEventListener('click', async (e) => {
      e.preventDefault();
      modal.style.display = 'none';
      openPopup('login-popup');
    });} else {
      // modal content
      modalContent.innerHTML = strayContent
      adoptionStatus.classList.add('adoption-ongoing')
    }
  }

  modal.style.display = 'block';

  // Close the modal when the "x" is clicked
  const closeModal = document.querySelector('.close');
  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function displayStrayData() {
  console.log("working...");
  const container = document.querySelector('.strayContainer');
  const storedStrayData = retrieveStrayData();

  storedStrayData.forEach((stray, index) => {
    const strayBox = document.createElement('div');
    strayBox.classList.add('strayBox');
    strayBox.setAttribute('data-index', index + 1);
    strayBox.setAttribute('data-name', stray.name);

    const img = document.createElement('img');
    var parsedImg = stray.imgData.toString('base64');
    img.src =  `data:image/png;base64,${parsedImg}`;

    const p = document.createElement('p');
    p.textContent = stray.name;

    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fa-regular', 'fa-heart', 'fa-lg'); // Initially regular heart

    // Handle click event to change heart icon color
    heartIcon.addEventListener('click',(event) => {
      heartIcon.classList.toggle('filled');
      event.stopPropagation(); // stop click event propagation
    });

    // Handle click event to toggle heart icon style and filled class
    heartIcon.addEventListener('click', (event) => {
      const isLiked = strayBox.classList.contains('filled');

      if (isLiked) {
        strayBox.classList.remove('filled');
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
      } else {
        strayBox.classList.add('filled');
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
      }

      event.stopPropagation(); // Stop click event propagation
    });

    // Handle click event to display modal
    console.log("handler working");
    strayBox.addEventListener('click', () => displayDescModal(stray));

    if (user){
      strayBox.appendChild(img);
      strayBox.appendChild(p);
      strayBox.appendChild(heartIcon);
      container.appendChild(strayBox);
    }else{
      strayBox.appendChild(img);
      strayBox.appendChild(p);
      container.appendChild(strayBox);
    }
  });
}

// Call functions to store, retrieve, and display stray data
displayStrayData();

// showdropdown for category buttons
function showDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i] !== dropdown) {
            dropdowns[i].style.display = 'none';
        }
    }
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// for filtering strays
function showStrayData(category, color, sex) {
  console.log(strays);

  // keep buttons active when clicked
  //document.getElementById('allBtn').classList.remove('active');
  //document.getElementById('catBtn').classList.remove('active');
  //document.getElementById('dogBtn').classList.remove('active');
  //document.getElementById('otherBtn').classList.remove('active');
  
  //document.getElementById(category + 'Btn').classList.add('active');

  const container = document.querySelector('.strayContainer');
  const storedStrayData = retrieveStrayData();

  // clear content
  container.innerHTML = '';

  // filter the stray data based on the category, color, and sex
  const filteredStrayData = storedStrayData.filter(stray => {
    return (category === 'all' || stray.animal === category) &&
           (color === 'all' || stray.color === color) &&
           (sex === 'all' || stray.gender === sex);
  });

  // display the filtered stray data
  filteredStrayData.forEach((stray, index) => {
      const strayBox = document.createElement('div');
      strayBox.classList.add('strayBox');
      strayBox.setAttribute('data-index', index + 1);
      strayBox.setAttribute('data-name', stray.name);

      const img = document.createElement('img');
      var parsedImg = stray.imgData.toString('base64');
      img.src =  `data:image/png;base64,${parsedImg}`;

      const p = document.createElement('p');
      p.textContent = stray.name;

      const heartIcon = document.createElement('i');
      heartIcon.classList.add('fa-regular', 'fa-heart', 'fa-lg');

      // sandle click event to change heart icon color
      heartIcon.addEventListener('click', (event) => {
        heartIcon.classList.toggle('filled');
        event.stopPropagation(); // stop click event propagation
      });

      // Handle click event to display modal
      console.log("handler working");
      strayBox.addEventListener('click', () => displayDescModal(stray));

      if (user){
        strayBox.appendChild(img);
        strayBox.appendChild(p);
        strayBox.appendChild(heartIcon);
        container.appendChild(strayBox);
      }else{
        strayBox.appendChild(img);
        strayBox.appendChild(p);
        container.appendChild(strayBox);
      }

      // Handle click event to toggle heart icon style and filled class
      heartIcon.addEventListener('click', (event) => {
      const isLiked = strayBox.classList.contains('filled');

      if (isLiked) {
        strayBox.classList.remove('filled');
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
      } else {
        strayBox.classList.add('filled');
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
      }

      event.stopPropagation(); // Stop click event propagation
    });
  });
}

// filtering trigger
function searchStrayData() {
    const category = document.getElementById('categoryDropdown').value;
    const color = document.getElementById('colorDropdown').value;
    const sex = document.getElementById('sexDropdown').value;

    showStrayData(category, color, sex);
}

function closeDesc(popupId) {
  var popup = document.getElementById(popupId);
      popup.style.display = "none";
}

// disabling the slider functionality for temparament display
const slider = document.getElementById('temperamentSlider');
const preventSliderDrag = (event) => {
  event.preventDefault();
};
// disable slider functionality
slider.disabled = true;
// prevent default drag behavior on the thumb
slider.addEventListener('mousedown', preventSliderDrag);
slider.addEventListener('touchstart', preventSliderDrag);

