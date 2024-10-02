let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listproduct");

let listProducts = [];

// Fetch the data and initialize the app
const initApp = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML(); // Call the function to add products to the DOM
    });
};

initApp();

// Add product data to the HTML
const addDataToHTML = () => {
  listProductHTML.innerHTML = ""; // Clear the existing content
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("products-card");
      newProduct.innerHTML = `
                          <img class="image-product" src="${
                            product.image.desktop
                          }" alt="product">
                         
                          <button class="addToCart"> 
                            <img src="assets/images/icon-add-to-cart.svg" alt="cart icon"> Add to cart  
                          </button>

                          <!-- Counter for increment and decrement, initially hidden -->
                          <div class="counter hidden">
                            <button class="icon-decrement">-</button>
                            <span>0</span>
                            <button class="icon-increment">+</button>
                          </div>

                          <p class="toLeft">${product.category}</p>
                          <h2 class="product-name">${product.name}</h2>
                          <h3 class="price">$ ${product.price.toFixed(2)}</h3>
                      `;

      listProductHTML.appendChild(newProduct);
    });

    addEventListenersToButtons(); // Attach event listeners after the DOM is updated
  }
};

// Function to handle the addToCart button click event
const handleAddToCartClick = (event) => {
  const addToCartButton = event.target;
  const productCard = addToCartButton.closest(".products-card");
  const counterDiv = productCard.querySelector(".counter");
  const span = counterDiv.querySelector("span");
  const image = productCard.querySelector(".image-product");

  // Hide the addToCart button and show the counter
  addToCartButton.style.display = "none";
  counterDiv.classList.remove("hidden");

  // Set the span value to 1
  span.textContent = 1;

  // Add a border by adding the CSS class
  image.classList.add("image-border");
};

// Function to handle increment and decrement button clicks
const handleCounterClick = (event) => {
  const button = event.target; // Get the clicked button (either increment or decrement)
  const counterDiv = button.closest(".counter"); // Get the counter div
  const span = counterDiv.querySelector("span"); // Get the span element
  const addToCartButton = counterDiv.parentElement.querySelector(".addToCart"); // Get the associated addToCart button
  const image = counterDiv.parentElement.querySelector(".image-product");
  let currentValue = parseInt(span.textContent); // Get the current value in the span

  if (button.classList.contains("icon-increment")) {
    // If the increment button is clicked, increase the span value
    span.textContent = currentValue + 1;
  }

  if (button.classList.contains("icon-decrement")) {
    // If the decrement button is clicked, decrease the span value
    if (currentValue > 0) {
      span.textContent = currentValue - 1;
    }
    // If the value reaches 0, hide the counter and show the addToCart button
    if (currentValue - 1 === 0) {
      counterDiv.classList.add("hidden");
      addToCartButton.style.display = "block";
      image.classList.remove("image-border");
    }
  }
};

// Function to add event listeners to the buttons
const addEventListenersToButtons = () => {
  // Add click event listeners to all addToCart buttons
  let addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCartClick);
  });

  // Add click event listeners to all increment and decrement buttons
  let incrementButtons = document.querySelectorAll(".icon-increment");
  let decrementButtons = document.querySelectorAll(".icon-decrement");

  incrementButtons.forEach((button) => {
    button.addEventListener("click", handleCounterClick);
  });

  decrementButtons.forEach((button) => {
    button.addEventListener("click", handleCounterClick);
  });
};
