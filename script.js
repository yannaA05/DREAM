const PRICE = 13;

const quantityInput = document.getElementById('quantity');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const addToCart = document.getElementById('addToCart');
const clearCart = document.getElementById('clearCart');
const cartQty = document.getElementById('cartQty');
const cartTotal = document.getElementById('cartTotal');
const reserveButtons = document.querySelectorAll('.reserve');
const reservationList = document.getElementById('reservationList');
const contactForm = document.getElementById('contactForm');

let cartCount = 0;

const updateCartDisplay = () => {
  cartQty.textContent = cartCount;
  cartTotal.textContent = `${cartCount * PRICE} €`;
};

const clampQuantity = () => {
  const value = parseInt(quantityInput.value, 10) || 1;
  quantityInput.value = Math.max(1, value);
};

qtyMinus.addEventListener('click', () => {
  clampQuantity();
  quantityInput.value = Math.max(1, parseInt(quantityInput.value, 10) - 1);
});

qtyPlus.addEventListener('click', () => {
  clampQuantity();
  quantityInput.value = parseInt(quantityInput.value, 10) + 1;
});

quantityInput.addEventListener('change', clampQuantity);

addToCart.addEventListener('click', () => {
  clampQuantity();
  cartCount += parseInt(quantityInput.value, 10);
  updateCartDisplay();
});

clearCart.addEventListener('click', () => {
  cartCount = 0;
  updateCartDisplay();
});

const updateReservationEmptyState = () => {
  const emptyItem = reservationList.querySelector('.empty');
  if (emptyItem) {
    emptyItem.remove();
  }
  if (reservationList.children.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'Aucune réservation pour le moment.';
    reservationList.appendChild(li);
  }
};

reserveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const title = button.dataset.title;
    const li = document.createElement('li');
    li.textContent = title;
    reservationList.appendChild(li);
    updateReservationEmptyState();
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Merci pour ton message, nous te répondrons vite !');
  contactForm.reset();
});

updateCartDisplay();
