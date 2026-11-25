const menuGrid = document.getElementById("menu-grid");
const cartList = document.getElementById("cart-list");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartCountEl = document.getElementById("cart-count");
const cartMsgEl = document.getElementById("cart-msg");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("campus_cart")) || [];

function renderMenu(items) {
  menuGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-header">
        <span class="category-tag">${item.category}</span>
        <span class="price">₹${item.price}</span>
      </div>
      <h3>${item.name}</h3>
      <p style="font-size: 0.85rem; color: #6b7280;">${item.description}</p>
      <button class="btn btn-primary add-btn" data-id="${item.id}">Add to Cart</button>
    `;
    menuGrid.appendChild(card);
  });

  // Wire up add-to-cart button
  const addButton = document.querySelector(".add-btn");
  if (addButton) {
    addButton.addEventListener("click", () => {
      const id = Number(addButton.dataset.id);
      addToCart(id);
    });
  }
}

function addToCart(itemId) {
  const found = MENU_ITEMS.find((item) => item.id === itemId);
  if (!found) return;

  // TODO: Increment quantity if item already exists in cart instead of pushing duplicates
  cart.push({
    id: found.id,
    name: found.name,
    price: found.price,
    qty: 1
  });

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("campus_cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-state">Your cart is empty.</li>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-row";
      li.innerHTML = `
        <span>${item.name} (x${item.qty})</span>
        <span>₹${item.price * item.qty}</span>
      `;
      cartList.appendChild(li);
    });
  }

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal = subtotal + item.price;
  });

  cartSubtotalEl.textContent = subtotal;
  cartCountEl.textContent = cart.length;
}

// TODO: Add category filter button logic & search input filtering

checkoutBtn.addEventListener("click", () => {
  // TODO: Prevent checkout if cart is empty and show message in cartMsgEl
  window.location.href = "pages/checkout.html";
});

// Initialize page
renderMenu(MENU_ITEMS);
renderCart();
