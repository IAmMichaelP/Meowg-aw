// // sample stray data
// const strayData = [
//   { imgSrc: 'pics/cat/1.jpg', name: 'Cool Cat', type: 'cat', gender:'female', story:"Insert short story of description."},
//   { imgSrc: 'pics/cat/2.jpg', name: 'Cute Cat', type: 'cat', gender:'female', story:"Insert short story of description."},
//   { imgSrc: 'pics/dog/1.jpg', name: 'Cute Dog', type: 'dog', gender:'male', story:"Insert short story of description."},
//   // can add more stray here
// ];

// // function to store stray data in localStorage
// function storeStrayData() {
//   localStorage.setItem('strayData', JSON.stringify(strayData));
// }

// function to retrieve stray data from localStorage
function retrieveStrayData() {
  const straysDataElement = document.getElementById('straysData');  
  const straysDataString = straysDataElement.getAttribute('data-strays');
  console.log('retrieved');
  console.log(straysDataString);
  return straysDataString ? JSON.parse(straysDataString) : [];
}

function displayDescModal(stray) {
  const modal = document.getElementById('descModal');
  const modalContent = document.getElementById('desc');


  // modal content
  modalContent.innerHTML = `
    <div class="details-container">
      <h3>Meet ${stray.name}</h3>

      <div class="details">
        <div class="image">
          <img src="${stray.imgSrc}" alt="${stray.name}">
        </div>

        <div class="description">
          <p>Name: ${stray.name}</p>
          <p>Gender: ${stray.gender}</p>
          <p>Breed: ${stray.breed}</p>
          <p>Status: ${stray.status}</p><br>
        </div>
      </div>

      <h4>About ${stray.name}</h4>
      <p>${stray.story}</p>
    </div>

    <div class="adoptionForm">
      <h3>Interested in adopting ${stray.name}?</h3>

      <form action="/adopt" method="POST">
        <input type="hidden" name="strayId" value="${stray._id}">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="fullname" required>
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
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
        <button class="adoptButton" type="submit">Adopt ${stray.name}</button>
      </form>
    </div>
    `;

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
  const container = document.querySelector('.strayContainer');
  const storedStrayData = retrieveStrayData();

  storedStrayData.forEach((stray, index) => {
    const strayBox = document.createElement('div');
    strayBox.classList.add('strayBox');
    strayBox.setAttribute('data-index', index + 1);
    strayBox.setAttribute('data-name', stray.name);

    const img = document.createElement('img');
    img.src = stray.imgSrc;

    const p = document.createElement('p');
    p.textContent = stray.name;

    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fa-regular', 'fa-heart', 'fa-lg');

    // Handle click event to display modal
    strayBox.addEventListener('click', () => displayDescModal(stray));

    strayBox.appendChild(heartIcon);
    strayBox.appendChild(img);
    strayBox.appendChild(p);
    container.appendChild(strayBox);
  });
}

// Call functions to store, retrieve, and display stray data
// storeStrayData();
displayStrayData();

// for filtering strays
function showStrayData(category) {

  // keep buttons active when clicked
  document.getElementById('allBtn').classList.remove('active');
  document.getElementById('catBtn').classList.remove('active');
  document.getElementById('dogBtn').classList.remove('active');
  document.getElementById('otherBtn').classList.remove('active');
  
  document.getElementById(category + 'Btn').classList.add('active');

  const container = document.querySelector('.strayContainer');
  const storedStrayData = retrieveStrayData();

  // clear content
  container.innerHTML = '';

  // filter the stray data based on the category
  const filteredStrayData = category === 'all' ? storedStrayData : storedStrayData.filter(stray => stray.animal === category);

  // display the filtered stray data
  filteredStrayData.forEach((stray, index) => {
      const strayBox = document.createElement('div');
      strayBox.classList.add('strayBox');
      strayBox.setAttribute('data-index', index + 1);
      strayBox.setAttribute('data-name', stray.name);

      const img = document.createElement('img');
      img.src = stray.imgSrc;

      const p = document.createElement('p');
      p.textContent = stray.name;

      const heartIcon = document.createElement('i');
      heartIcon.classList.add('fa-regular', 'fa-heart', 'fa-lg');

      strayBox.addEventListener('click', () => displayDescModal(stray));

      strayBox.appendChild(img);
      strayBox.appendChild(p);
      container.appendChild(strayBox);
      strayBox.appendChild(heartIcon);
  });
}

function closeDesc(popupId) {
  var popup = document.getElementById(popupId);
      popup.style.display = "none";
}