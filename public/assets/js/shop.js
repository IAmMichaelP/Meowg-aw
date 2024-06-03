// Sample shop items data
console.log("read from shop");

const merches = Merch.findAllMerch();

// const shopItems = [
//   { 
//     imgSrc: 'assets/img/shop/accessory-1.webp', 
//     name: 'Awesome dog collar', 
//     category: 'Accessories', 
//     description: "Insert short story or description.",
//     price: "$20.00" 
//   },
//   { 
//     imgSrc: 'assets/img/shop/accessory-2.png', 
//     name: 'Awesome dog collar', 
//     category: 'Accessories', 
//     description: "Insert short story or description.",
//     price: "$20.00" 
//   },
//   { 
//     imgSrc: 'assets/img/shop/accessory-1.webp', 
//     name: 'DOGOGOGOGOG COLLLOR', 
//     category: 'Bowls and Feeders', 
//     description: "Insert short story or description.",
//     price: "$20.00" 
//   },
//   { 
//     imgSrc: 'assets/img/shop/accessory-3.jpg', 
//     name: 'Cool goggles eyyy', 
//     category: 'Care and Health Supplies', 
//     description: "Insert short story or description.",
//     price: "$20.00" 
//   },
//   { 
//     imgSrc: 'assets/img/shop/accessory-3.jpg', 
//     name: 'gogogogogoooles', 
//     category: 'Toys', 
//     description: "Insert short story or description.",
//     price: "$18.00" 
//   },
//   // add more shop items here
// ];

// Function to display shop items
//  function displayShopItems(category) {
//    const shopContainer = document.querySelector('.row.gx-4.gx-lg-5.row-cols-1.row-cols-md-2.row-cols-xl-3.justify-content-center');
//    shopContainer.innerHTML = ''; // Clear previous items

//    merches.forEach(item => {

//      // Check if the item's category matches the desired category
//      if (category === 'All' || item.category === category) {
//        // Create shop item
//        const shopItem = document.createElement('div');
//        shopItem.classList.add('col', 'mb-5');

//        // Create shop item content
//        const shopContent = `
//          <div class="card h-100">
//            <!-- Product image-->
//            <img class="card-img-top" src="${item.imgSrc}" alt="${item.name}"/>
//            <!-- Sale badge (optional) -->
//            ${item.sale ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>` : ''}
//            <!-- Product details-->
//            <div class="card-body p-4">
//              <div class="text-center">
//                <!-- Product name-->
//                <h5 class="fw-bolder">${item.name}</h5>
//                <!-- Product description-->
//                <p class="text-muted">${item.description}</p>
//                <!-- Product price-->
//                <span class="text-muted">${item.price}</span>
//              </div>
//            </div>

//            <!-- Product actions-->
//            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
//               <div class="text-center">
//                <a class="btn btn-outline-dark mt-auto" href="/shop-item">${item.buttonText ? item.buttonText : 'View'}</a>
//              </div>
//            </div>
//          </div>
//        `;

//        // Set shop item content
//        shopItem.innerHTML = shopContent;

//        // Append shop item to the container
//        shopContainer.appendChild(shopItem);
//      }
//    });
// }

// Function to handle category filtering
function categoryFilter(){
  document.querySelectorAll('#menuTabs .nav-link').forEach(link => {
  link.addEventListener('click', function() {
    const category = merch.category; // Get the text content of the link
    displayShopItems(category);
  });
});
}
categoryFilter();


// function submitItem(formId){
//   const itemForm = document.querySelector(formId);

//   contactForm.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       const messageBody = contactForm.message.value;
//       const senderEmail = contactForm.email.value;
//       const senderName = contactForm.name.value;
//       const messageSubject = contactForm.subject.value;
      
//       try {
//           const res = await fetch('/about/message', { 
//               method: "POST", 
//               body: JSON.stringify({ messageBody, senderEmail, senderName, messageSubject  }),
//               headers: {'Content-Type': 'application/json'}
//           });
//           const data = await res.json();
          
//           if (data.message) {
//               location.assign('/about');
//           } else {
//               location.assign('/500');
//           }

//       }
//       catch (err) {
//           location.assign('/500');
//       }
//   });
// }

console.log("Submit merch");

submitMerch = async () => {
  console.log("run");
  const itemForm = document.querySelector('#add-item-form');

      const formData = new FormData(itemForm);

      try {
        console.log("trying to submit merch");
          const res = await fetch('/shop/add-item', { 
              method: "POST", 
              body: formData,
          });
          const data = await res.json();
          
          // renders the error to email when it exists
          if (data.errors) {
              // emailError.textContent = data.errors.email;
              // passwordError.textContent = data.errors.password;
              // imageDataError.textContent = data.errors.imageData;
          }
          if (data.user) {
            console.log("submitted");
            alert("Successfully added an item");
          }
      }
      catch (err) {
        // location.assign('/500');
      }
  };

const addItemToCart = async (userId, merchId, amount) => {
  console.log("addItemToCart function called");
    try {
        const response = await fetch('/add-to-cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, merchId, amount })
        });

        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }

        const data = await response.text();
        console.log(data); // "Item added to cart successfully"
        if(data) {
          alert('Item added to cart successfully');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

checkoutMerch = async () => {
  console.log("run");
  const itemForm = document.querySelector('#checkout-form');
  const user = itemForm.user.value;
  const selectedItems = [];

  const checkoutButton = document.querySelector('#checkout-button');
  checkoutButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get all checked checkboxes
    const checkboxes = itemForm.querySelectorAll('input[name="selectedItems"]:checked');
    
    // Check if any checkboxes are selected
    if (checkboxes.length === 0) {
      alert("The checklist is empty. Please select at least one item.");
      return; // Exit the function early
    }
    checkboxes.forEach(checkbox => {
      const itemId = checkbox.value; // Get the item ID from the checkbox value
      const hiddenInput = document.querySelector(`input[type="hidden"][id="${itemId}"]`); // Find the corresponding hidden input
      const amount = hiddenInput ? hiddenInput.value : null; // Get the amount from the hidden input if found
  
      // Push an object containing the item ID and amount to the selectedItems array
      selectedItems.push({ itemId: itemId, amount: amount });
    });

    // Create a new FormData object
    const formData = new FormData(itemForm);
    
    // Append the checked checkboxes to formData
    // checkboxes.forEach(checkbox => {
    //   formData.append('selectedItems', checkbox.value);
    // });

    console.log([...formData.entries()]); // Log formData entries to the console for debugging
    console.log(selectedItems);

    try {
      console.log("Trying to submit merch");
      const res = await fetch('/checkout-item', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedItems, user })
      });

      console.log("Trying to submit merch1");
      let data = await res.text();
        console.log(data); 
        data = JSON.parse(data);
        if (data.user) {
          location.assign('/checkout/' + data.user);
      }
      
      
    } catch (err) {
      console.error(err);
      // Handle error (e.g., show an error message)
      alert('An error occurred. Please try again.');
    }
  });
};

placeOrder = async () => {
  console.log("place order");
  const itemForm = document.querySelector('#deliveryAddressForm');
  console.log(itemForm);
  const user = itemForm.user.value;
  const checkout = itemForm.checkout.value;
  
  
  const orderButton = document.querySelector('#place-order-button');
  itemForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fullName = itemForm.fullName.value;
  const contactNumber = itemForm.contactNumber.value;
  const region_text = itemForm.region_text.value;
  const province_text = itemForm.province_text.value;
  const city_text = itemForm.city_text.value;
  const barangay_text = itemForm.barangay_text.value;
  const zipCode = itemForm.zipCode.value;
  const street = itemForm.street.value;

    try {
      console.log("Trying to place order");
      const res = await fetch('/place-order', { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checkout, user, fullName, contactNumber, region_text, province_text, city_text, barangay_text, zipCode, street })
      });

      console.log("Trying to submit merch1");
      let data = await res.text();
        console.log(data); 
        data = JSON.parse(data);
        if (data.user) {
          console.log(data);
          alert("Your order is pending for approval");
      }
      
      
    } catch (err) {
      console.error(err);
      // Handle error (e.g., show an error message)
      alert('An error occurred. Please try again.');
    }
  });
};
// Call the function initially to display all items


checkoutMerch();
placeOrder();

function clickSignIn (){
  const signInButton = document.querySelector('[data-toggle="modal"][data-target="#signIn"]');
  signInButton.click();
}

// Call the function initially to display all items
displayShopItems('All');
function showSuccessPopup(message) {
  alert(message);
}
displayShopItems('All');

// limit text

var descriptionElement = document.getElementById("description");

  // Get the full description
  var fullDescription = descriptionElement.innerHTML;

  // Check if the description exceeds the limit
  if (fullDescription.length > 150) {
    // Truncate the description
    var truncatedDescription = fullDescription.substring(0, 150) + "...";

    // Update the description in the HTML
    descriptionElement.innerHTML = truncatedDescription;
  }