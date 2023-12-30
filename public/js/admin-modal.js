const showUser = (Img, name, username, email, role) => {
    parsedImg = Img.toString('base64');
    console.log(parsedImg, name, username, email, role);

    console.log('user clicked');
 
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
                <form class="description">
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










// // db = dashboard
// const dbUsers = document.querySelectorAll('#content-users button');

// dbUsers.forEach(user => {
//     user.addEventListener('click', () => { 
//         console.log('user clicked');
//         const userShow = user.getAttribute('data-content');
//         console.log(userShow);
//         var parsedImg = userShow.profilePicture ? userShow.profilePicture.toString('base64') : "/pics/stray1.jpg";
//         const modal = document.getElementById('descModal');
//         const modalContent = document.getElementById('desc');
//         let userContent =
//         `
//         <div class="details-container">

//         <div class="details">
//         <div class="image">
//           <img src="data:image/png; base64,${parsedImg}" alt="${userShow.name}">
//         </div>

//         <div class="description">
//         <p>Name: ${userShow.name}</p>
//         <p>Username: ${userShow.username}</p>
//         <p>Email: ${userShow.email}</p>
//         <p>Address: ${userShow.address}</p>
//         <input type="text" name="role" value="${userShow.role}">
//         </div>
//       </div>

//     </div>`;
//     modalContent.innerHTML = userContent;
//     });
    
// });