function closeDesc(popupId) {
    var popup = document.getElementById(popupId);
        popup.style.display = "none";
}

const showUser = (Img, name, username, email, role) => {
    parsedImg = Img.toString('base64');
 
    // const parsedImg = user.parsedImg; 
    const modal = document.getElementById('descModal');
    const modalContent = document.getElementById('desc');
    let userContent = Img ? `
        <div class="details-container">
            <div class="details">
                <div class="image">
                    <img src="data:image/png; base64,${parsedImg}" alt="${name}">
                </div>` : `
        <div class="details-container">
            <div class="details">
                <div class="image">
                    <img src="/pics/stray1.jpg" alt="${name}">
                </div>`;

    userContent = userContent + `
                <form class="description" id="userForm">
                    <p>Name: ${name}</p>
                    <p>Username: ${username}</p>
                    <p>Email: ${email}</p>`;
    userContent = role === 'admin' ? userContent + `
                    <label for="role">Role: </label><br>
                    <select id="role" name="role">
                        <option value="user">user</option>
                        <option value="admin" selected>admin</option>
                    </select>
                    <br>
                    <button class="adoptButton">Save</button>
                </form>
            </div>
        </div>` : userContent + `
                    <label for="role">Role: </label><br>
                    <select id="role" name="role">
                        <option value="user" selected>user</option>
                        <option value="admin">admin</option>
                    </select>
                    <br>
                    <button class="adoptButton">Save</button>
                </form>
            </div>
        </div>`;
    modalContent.innerHTML = userContent;
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

const showStray = (stray) => {
    stray = JSON.parse(stray);
    parsedImg = stray.imgData.toString('base64');
 
    // const parsedImg = user.parsedImg; 
    const modal = document.getElementById('descModal');
    const modalContent = document.getElementById('desc');
    let userContent = `
    <div class="details-container">
      <h2>Meet ${stray.name}</h2>
      <h3 id="adoptionStatus" class="strayStatus availAdopt">${stray.status}</h3>

      <div class="details">
        <div class="image">
          <img src="data:image/png; base64,${parsedImg}" alt="${stray.name}">
        </div>

        <div class="description">
          <p class="strayDetails"><b>Name:</b> ${stray.name}</p>
          <p class="strayDetails"><b>Gender:</b> ${stray.gender}</p>
          <p class="strayDetails"><b>Breed:</b> ${stray.breed}</p>
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
        </div>
      </div>

      <h4>About ${stray.name}</h4>
      <p>${stray.story}</p>
    </div>`;
    modalContent.innerHTML = userContent;
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

const editRole = (id) => {
    const roleSelect = document.getElementById('role');
    
    console.log('editing role');
    const form = document.getElementById('userForm');
    let role = form.role.value;
    roleSelect.addEventListener('change', (e) => { role = e.target.value; });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("editing role clicked");
        try {
            const res = await fetch('/admin/user/edit-role', { 
                method: "PUT", 
                body: JSON.stringify({ id, role }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            
            if (data.user) {
                const modal = document.getElementById('descModal');
                modal.style.display = 'none';
                const resultPopup = document.getElementById('result-popup');
                resultPopup.style.color = 'white';
                openPopup('result-popup');
                location.reload();
            } else {
                location.assign('/500');
            }
    
        }
        catch (err) {
            location.assign('/500');
        }
    });
};

const userDelete = async (id) => {
    console.log("Deleting user")
    try {
        const res = await fetch('/admin/user/delete', { 
            method: "DELETE", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "USER SUCCESSFULLY BLOCKED ACCESS";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
}