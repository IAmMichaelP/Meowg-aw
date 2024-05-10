// Sample shop items data
const shopItems = [
  { 
    imgSrc: 'assets/img/shop/accessory-1.webp', 
    name: 'Awesome dog collar', 
    category: 'Accessories', 
    description: "Insert short story or description.",
    price: "$20.00" 
  },
  { 
    imgSrc: 'assets/img/shop/accessory-2.png', 
    name: 'Awesome dog collar', 
    category: 'Accessories', 
    description: "Insert short story or description.",
    price: "$20.00" 
  },
  { 
    imgSrc: 'assets/img/shop/accessory-1.webp', 
    name: 'DOGOGOGOGOG COLLLOR', 
    category: 'Bowls and Feeders', 
    description: "Insert short story or description.",
    price: "$20.00" 
  },
  { 
    imgSrc: 'assets/img/shop/accessory-3.jpg', 
    name: 'Cool goggles eyyy', 
    category: 'Care and Health Supplies', 
    description: "Insert short story or description.",
    price: "$20.00" 
  },
  { 
    imgSrc: 'assets/img/shop/accessory-3.jpg', 
    name: 'gogogogogoooles', 
    category: 'Toys', 
    description: "Insert short story or description.",
    price: "$18.00" 
  },
  // add more shop items here
];

<% user = JSON.parse(user) %>

// Function to display shop items
function displayShopItems(category) {
  const shopContainer = document.querySelector('.row.gx-4.gx-lg-5.row-cols-1.row-cols-md-2.row-cols-xl-3.justify-content-center');
  shopContainer.innerHTML = ''; // Clear previous items

  shopItems.forEach(item => {
    // Check if the item's category matches the desired category
    if (category === 'All' || item.category === category) {
      // Create shop item
      const shopItem = document.createElement('div');
      shopItem.classList.add('col', 'mb-5');

      // Create shop item content
      const shopContent = `
        <div class="card h-100">
          <!-- Product image-->
          <img class="card-img-top" src="${item.imgSrc}" alt="${item.name}"/>
          <!-- Sale badge (optional) -->
          ${item.sale ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>` : ''}
          <!-- Product details-->
          <div class="card-body p-4">
            <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">${item.name}</h5>
              <!-- Product description-->
              <p class="text-muted">${item.description}</p>
              <!-- Product price-->
              <span class="text-muted">${item.price}</span>
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn btn-outline-dark mt-auto" href="#">${item.buttonText ? item.buttonText : 'View'}</a>
            </div>
          </div>
        </div>
      `;

      // Set shop item content
      shopItem.innerHTML = shopContent;

      // Append shop item to the container
      shopContainer.appendChild(shopItem);
    }
  });
}

// Call the function initially to display all items
displayShopItems('All');

// Function to handle category filtering
document.querySelectorAll('#menuTabs .nav-link').forEach(link => {
  link.addEventListener('click', function() {
    const category = this.innerText.trim(); // Get the text content of the link
    displayShopItems(category);
  });
});

