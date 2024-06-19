
console.log("read from admin chunk");
async function straysSection() {
    console.log('read here somewhere from strays');
    try {
        const res = await fetch('/admin-dashboard/strays', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        console.log(data);
        console.log(typeof(data));

        const straysChunk = document.getElementById('strays');

        let approvedStraysHTML = '';
        if (data.approvedStrays.length > 0) {
            data.approvedStrays.forEach(stray => {
                approvedStraysHTML += `
                    <div class="dash-container col-md-3">
                        <div class="dash-image">
                            <img src="data:image/png; base64,${stray.imgData.toString('base64')}" alt="${stray.name}">
                        </div>
                        <div class="dash-info">
                            <p>Submitted by: ${stray.uploader.username}</p>
                            <p>Name: ${stray.name}</p>
                            <p>Age: ${stray.age}</p>
                            <p>Gender: ${stray.gender}</p>
                            <p>Breed: ${stray.breed}</p>
                            <p>Status: ${stray.status}</p>
                        </div>
                        <div class="crud-btns">
                            <button class="standard-button" onclick="showStray('${JSON.stringify(stray)}')">View</button>
                            <button class="danger" onclick="strayDelete('${stray._id}');">Delete</button>
                        </div>
                    </div>
                `;
            });
        } else {
            approvedStraysHTML = 'There are no strays to display';
        }

        let pendingStraysHTML = '';
        if (data.pendingStrays.length > 0) {
            data.pendingStrays.forEach(stray => {
                pendingStraysHTML += `
                    <div class="dash-container col-md-2 m-2">
                        <div class="dash-image">
                            <img src="data:image/png; base64,${stray.imgData.toString('base64')}" alt="${stray.name}">
                        </div>
                        <div class="dash-info">
                            <p>Submitted by: ${stray.uploader.username}</p>
                            <p>Name: ${stray.name}</p>
                            <p>Age: ${stray.age}</p>
                            <p>Gender: ${stray.gender}</p>
                            <p>Breed: ${stray.breed}</p>
                            <p>Status: ${stray.status}</p>
                        </div>
                        <div class="crud-btns">
                            <button class="standard-button" onclick="approveStray('${stray._id}');">Approve</button>
                            <button class="danger" onclick="strayDelete('${stray._id}');">Delete</button>
                        </div>
                    </div>
                `;
            });
        } else {
            pendingStraysHTML = 'There are no strays to display';
        }

        straysChunk.innerHTML = `
            <div class="row justify-content-between">
                <button class="add-stray" onclick="location.href='/create'">Add a Stray</button>
                <h3>APPROVED</h3>
                ${approvedStraysHTML}
                <h3>PENDING</h3>
                ${pendingStraysHTML}
            </div>
        `;

        // Show the strays section
        straysChunk.style.display = 'block';

    } catch (err) {
        location.assign('/500');
        console.log("there is an error: " + err.message);
        
    }
}

async function donationsSection () {
    try {
        const res = await fetch('/admin-dashboard/donations', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        const donationsChunk = document.getElementById('donations');
        let donationsHTML = '';
        if(data.donations.length > 0) {
            data.donations.forEach(donate => {
                donationsHTML += `<div class="dash-container">
                    <div class="dash-info">
                        <p>Donor: ${donate.donor}
                        </p>
                        <p>Donation Amount: ${donate.donation.amount}
                        </p>
                        <p>Transaction Type: ${donate.donation.paymentType}
                        </p>
                        <p>Account Number: ${ donate.donation.accountNumber}
                        </p>
                        <p>Account Name: ${ donate.donation.accountName }
                        </p>
                        <p>Phone Number: ${ donate.phoneNumber }
                        </p>
                        <p>Transaction Date: ${ donate.createdAt }
                        </p>
                    </div>
    
                    <div class="crud-btns">
                        <button onclick="viewDonation('${ JSON.stringify(donate) }')"
                            class="standard-button">View</button>
                        <button onclick="deleteDonation('${ donate._id }');" class="danger">Delete</button>
                    </div>
                </div>
                <br>
                <hr>
                <br>`
            });
        } else {
            donationsHTML = 'There is no donation report to display'
        }

        donationsChunk.innerHTML = donationsHTML;

    } catch (err) {
        location.assign('/500');
        console.log("there is an error: " + err.message);
        
    }
}