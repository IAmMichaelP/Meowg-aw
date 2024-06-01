
// function closeDesc(popupId) {
//     var popup = document.getElementById(popupId);
//         popup.style.display = "none";
// }

// function openPopup(popupId) {
//     var popup = document.getElementById(popupId);
//     popup.style.display = "flex";
//     setTimeout(function () {
//         popup.classList.add('show');
//         popup.querySelector('.popup-content').style.opacity = '1';
//         popup.querySelector('.popup-content').style.transform = 'translateY(0)';
//     }, 0);
               
//     window.onclick = function(event) {
//         if (event.target == popup) {
//             closeDesc(popupId);
//         }
//     };
// }

function editFaqs(faqs) {
    console.log("reading edit faqs");
    faqs = JSON.parse(faqs);
    const modal = document.getElementById('edit-faqs-popup');
    const modalContent = document.querySelector('.edit-faqs-popup');
    console.log(modal);

    let faqsContent = `
        <span class="close" onclick="closeDesc('edit-faqs-popup')">&times;</span>
        <h3>Edit an FAQs Component</h3>
        <form class="faqEdit" id="faqEdit">

            <input type="hidden" name="faqUploader" id="faqUploader" value="${faqs.uploader}">
            <label for="question">Question</label><br>
            <input type="text" name="question" id="question" value="${faqs.question}" required>
            <label for="answer">Answer</label><br>
            <input type="text" name="answer" id="answer" value="${faqs.answer}" required>
            <button type="submit" class="submit">Edit</button>
        </form>
        `;
    modalContent.innerHTML = faqsContent;
    modal.style.display = 'block';
    openPopup('edit-faqs-popup');


};

async function faqChange (id) {
    console.log("entering faqs");
    const faqsForm = document.getElementById('faqEdit');

    faqsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("faqs reading");
        const question = faqsForm.question.value;
        const answer = faqsForm.answer.value;
        console.log(question, answer);

        try {
            const res = await fetch('/admin/edit-faqs', { 
                method: "PUT", 
                body: JSON.stringify({ id, question, answer }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            
            if (data.user) {
                console.log(data);
                const modal = document.getElementById('descModal');
                modal.style.display = 'none';
                const resultPopup = document.getElementById('result-popup');
                resultPopup.style.color = 'white';
                document.getElementById('result').innerHTML = "FAQS COMPONENT EDITED SUCCESSFULLY";
                closePopup('edit-faqs-popup')
                openPopup('result-popup');
                location.reload();
            }
    
        }
        catch (err) {
            location.assign('/500');
        }
    });
};

const viewDonation = (donation) => {
    donation = JSON.parse(donation);
 
    // const parsedImg = user.parsedImg; 
    const modal = document.getElementById('descModal');
    const modalContent = document.getElementById('desc');
    let donateContent = `
    <div class="details-container">
      <h2>Donation Details</h2>

      <div class="details">
        

        <div class="description">
            <p class="strayDetails">Donor: ${donation.donor}</p>
            <p class="strayDetails">Donation Amount: ${donation.donation.amount}</p>
            <p class="strayDetails">Transaction Type: ${donation.donation.paymentType}</p>
            <p class="strayDetails">Account Number: ${donation.donation.accountNumber}</p>
            <p class="strayDetails">Account Name: ${donation.donation.accountNumber}</p>
            <p class="strayDetails">Phone Number: ${donation.phoneNumber}</p>
            <p class="strayDetails">Transaction Date: ${donation.createdAt}</p>
        </div>
      </div>
    </div>`;
    modalContent.innerHTML = donateContent;
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

const deleteDonation = async (id) => {
    try {
        const res = await fetch('/admin/delete-donation', { 
            method: "DELETE", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "DONATION DELETED SUCCESSFULLY";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
};

const approveBlog = async (id) => {
    try {
        const res = await fetch('/admin/user/approve-blog', { 
            method: "PUT", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "BLOG APPROVED SUCCESSFULLY";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
};

const deleteBlog = async (id) => {
    try {
        const res = await fetch('/admin/user/delete-blog', { 
            method: "DELETE", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "BLOG DELETED SUCCESSFULLY";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
};

const acknowledgeMessage = async (id) => {
    try {
        const res = await fetch('/admin/user/acknowledge-message', { 
            method: "PUT", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "MESSAGE ACKNOWLEDGED";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
};

const deleteMessage = async (id) => {
    try {
        const res = await fetch('/admin/user/delete-message', { 
            method: "DELETE", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "MESSAGE DELETED";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
};

const deleteInventory = async (id) => {
    try {
        const res = await fetch('/admin/delete-inventory', { 
            method: "DELETE", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "INVENTORY DELETED SUCCESSFULLY";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
};

const deleteFaqs = async (id) => {
    try {
        const res = await fetch('/admin/delete-faqs', { 
            method: "DELETE", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "FAQS COMPONENT DELETED SUCCESSFULLY";
            openPopup('result-popup');
            location.reload();
        } else {
            location.assign('/500');
        }

    }
    catch (err) {
        location.assign('/500');
    }
};

const addInventory = () => {
    const inventoryForm = document.getElementById('inventoryCreate');

    const uploader = inventoryForm.uploader.value;
    const amount = inventoryForm.amount.value;
    const weeklyExpenses = inventoryForm.weeklyExpenses.value;
    const weekStart = inventoryForm.weekStart.value;
    const weekEnd = inventoryForm.weekEnd.value;
    const rescuedAnimals = inventoryForm.rescuedAnimals.value;


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/admin/donate/add-inventory', { 
                method: "POST", 
                body: JSON.stringify({ uploader, amount, weeklyExpenses, weekStart, weekEnd, rescuedAnimals }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            
            if (data.user) {

                const modal = document.getElementById('descModal');
                modal.style.display = 'none';
                const resultPopup = document.getElementById('result-popup');
                resultPopup.style.color = 'white';
                switchPopup("add-inventory-popup", "result-popup");
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

const addFaqs = () => {
    console.log("entering faqs");
    const faqsForm = document.getElementById('faqCreate');

    

    faqsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const uploader = faqsForm.faqUploader.value;
        const question = faqsForm.question.value;
        const answer = faqsForm.answer.value;

        try {
            const res = await fetch('/admin/nav/add-faqs', { 
                method: "POST", 
                body: JSON.stringify({ uploader, question, answer }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            
            if (data.user) {

                const modal = document.getElementById('descModal');
                modal.style.display = 'none';
                const resultPopup = document.getElementById('result-popup');
                resultPopup.style.color = 'white';
                document.getElementById('result').innerHTML = "FAQS COMPONENT ADDED SUCCESSFULLY";
                closePopup('add-faqs-popup')
                openPopup('result-popup');
                location.reload();
            }
    
        }
        catch (err) {
            location.assign('/500');
        }
    });
};

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
                    <button class="adoptButton" id="edit">Save</button>
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

const approveAdoption = async (id) => {
    console.log("adopting stray option");
    try {
        const res = await fetch('/admin/stray/approve-adoption', { 
            method: "PUT", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "STRAY ADOPTION APPROVED SUCCESSFULLY";
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

const approveStray = async (id) => {
    console.log("adopting stray option");
    try {
        const res = await fetch('/admin/stray/approve-stray', { 
            method: "PUT", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.user) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "STRAY NOW OFFICIALLY AVAILABLE FOR ADOPTION";
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

const strayDelete = async (id) => {
    console.log("Deleting user")
    try {
        const res = await fetch('/admin/stray/delete', { 
            method: "DELETE", 
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        
        if (data.stray) {
            const modal = document.getElementById('descModal');
            modal.style.display = 'none';
            document.getElementById('result').innerHTML = "STRAY SUCCESSFULLY DELETED FROM DATABASE";
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