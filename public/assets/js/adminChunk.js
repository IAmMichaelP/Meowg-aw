
console.log("read from admin chunk");
async function straysSection() {
    const straysChunk = document.getElementById('strays');
    
    
    console.log('read here somewhere from strays');
    try {
        if (!straysChunk.innerHTML.trim()) {
        straysChunk.innerHTML = `<div class="row justify-content-between">
                <button class="add-stray" onclick="location.href='/create'">Add a Stray</button>
                <p>Loading...</p>
            </div>`;
        }
        const res = await fetch('/admin-dashboard/strays', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        console.log(data);
        console.log(typeof(data));

        

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
    const donationsChunk = document.getElementById('donations');
    try {
        if (!donationsChunk.innerHTML.trim()) {
            donationsChunk.innerHTML = `<div class="row justify-content-between">
                    <p>Loading...</p>
                </div>`;
        }
        const res = await fetch('/admin-dashboard/donations', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        
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

async function blogsSection () {
    const blogsChunk = document.getElementById('blogs');
    try {
        if (!blogsChunk.innerHTML.trim()) {
            blogsChunk.innerHTML = '<p>Loading...</p>';
        }
        const res = await fetch('/admin-dashboard/blogs', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        
        let blogsHTML = '';
        if(data.pendingBlogs.length > 0) {
            data.pendingBlogs.forEach(blog => {
                blogsHTML += `<div class="dash-container">

                <div class="dash-info">
                    <p>Posted by: ${ blog.uploader.name }
                    </p>
                    <p>Title: ${ blog.title }
                    </p>
                    <p>Content: ${ blog.body }
                    </p>
                    <p>Status: ${ blog.status }
                    </p>
                </div>

                <div class="crud-btns">
                    <button class="standard-button" onclick="approveBlog('${ blog._id }');">Approve</button>
                    <button class="danger" onclick="deleteBlog('${ blog._id }');">Delete</button>
                </div>

            </div>`
            });
        } else {
            blogsHTML = 'There are no pending blogs to display'
        }

        blogsChunk.innerHTML = blogsHTML;

    } catch (err) {
        location.assign('/500');
        console.log("there is an error: " + err.message);
        
    }
}

async function shopSection () {
    const shopChunk = document.getElementById('shop');
    try {
        if (!shopChunk.innerHTML.trim()) {
            shopChunk.innerHTML = '<p>Loading...</p>';
        }
        const res = await fetch('/admin-dashboard/shop', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        shopChunk.innerHTML = `<button class="sellItemBtn" onclick="location.href='/sell-item'">Add an item</button>`;

    } catch (err) {
        location.assign('/500');
        console.log("there is an error: " + err.message);
        
    }
}

async function faqsSection () {
    const faqsChunk = document.getElementById('faqs');
    try {
        if (!faqsChunk.innerHTML.trim()) {
            faqsChunk.innerHTML = '<p>Loading...</p>';
        }
        const res = await fetch('/admin-dashboard/faqs', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        
        let faqsHTML = '';
        if(data.faqs.length > 0) {
            data.faqs.forEach(faqs => {
                faqsHTML += `<div class="dash-container">

                <div class="dash-info">
                    <h4>Question: ${ faqs.question }
                    </h4>
                    <h5>Answer: ${ faqs.answer }
                    </h5><br>
                    <p>Uploaded by: ${ faqs.uploader.username }
                    </p>

                </div>

                <div class="crud-btns">
                    <button class="standard-button" onclick="
                      editFaqs('${ JSON.stringify(faqs) }');
                      faqChange('${ faqs._id }');">Edit</button>
                    <button class="danger" onclick="deleteFaqs('${ faqs._id }');">Delete</button>
                </div>

                <br>
                <hr>
                <br>

            </div>`
            });
        } else {
            faqsHTML = 'There are no approved faqs to display'
        }

        faqsChunk.innerHTML = `<button class="add-stray" onclick="openPopup('add-faqs-popup'); addFaqs();">Add an faqs</button>
            ${faqsHTML}`;

    } catch (err) {
        location.assign('/500');
        console.log("there is an error: " + err.message);
        
    }
}

async function messagesSection () {
    const messagesChunk = document.getElementById('messages');
    try {
        if (!messagesChunk.innerHTML.trim()) {
            messagesChunk.innerHTML = '<p>Loading...</p>';
        }
        const res = await fetch('/admin-dashboard/messages', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        
        let messagesHTML = '';
        if(data.messages.length > 0) {
            data.messages.forEach(message => {
                messagesHTML += `<div class="dash-container">

                <div class="dash-info">
                    <h5>Sent by: ${ message.senderName } | ${ message.senderEmail }
                    </h5>
                    <h6>Subject: ${ message.messageSubject }
                    </h6><br>
                    <p>Content: ${ message.messageBody }
                    </p><br>
                    <h6>Status: ${ message.status }
                    </h6>
                </div>

                <div class="crud-btns">
                    <button class="standard-button" onclick="acknowledgeMessage('${ message._id }');"
                        class="standard-button">Acknowledge</button>
                    <button class="danger" onclick="deleteMessage('${ message._id }');" class="danger">Delete</button>
                </div>
            </div>`
            });
        } else {
            messagesHTML = 'There are no messages to display'
        }

        messagesChunk.innerHTML = messagesHTML;

    } catch (err) {
        location.assign('/500');
        console.log("there is an error: " + err.message);
        
    }
}

async function adoptSection () {
    const adoptChunk = document.getElementById('adopt');
    try {
        if (!adoptChunk.innerHTML.trim()) {
            adoptChunk.innerHTML = '<p>Loading...</p>';
        }
        const res = await fetch('/admin-dashboard/adopt', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        
        let adoptHTML = '';
        if(data.evaluees.length > 0) {
            data.evaluees.forEach(evaluee => {
                adoptHTML += `<div class="dash-container">

                    <div class="dash-image">
                        <img src="data:image/png; base64,${ evaluee.imgData.toString('base64') }"
                            alt="${ evaluee.name }">
                    </div>

                    <div class="dash-info">
                        <p>Name: ${ evaluee.name }
                        </p>
                        <p>Age: ${ evaluee.age }
                        </p>
                        <p>Gender: ${ evaluee.gender }
                        </p>
                        <p>Breed: ${ evaluee.breed }
                        </p>
                        <p>Status: ${ evaluee.status }
                        </p>
                    </div>

                    <div class="crud-btns">
                        <button class="standard-button" onclick="approveAdoption('${ evaluee._id }');">Approve</button>
                        <button class="danger" class="danger">Delete</button>
                    </div>

                </div>`
            });
        } else {
            adoptHTML = 'There are no strays to display'
        }

        adoptChunk.innerHTML = `<div class="row justify-content-between">
            ${adoptHTML}
        </div>`;

    } catch (err) {
        location.assign('/500');
        console.log("there is an error: " + err.message);
        
    }
}