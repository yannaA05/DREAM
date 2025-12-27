const pricePerBox = 45;
let cartQuantity = 0;

const qtyInput = document.getElementById('quantity');
const increaseBtn = document.getElementById('increase-qty');
const decreaseBtn = document.getElementById('decrease-qty');
const addToCartBtn = document.getElementById('add-to-cart');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

const reserveButtons = document.querySelectorAll('.reserve-btn');
const reservationList = document.getElementById('reservation-list');

const contactForm = document.getElementById('contact-form');

function formatTotal(quantity) {
  return `${quantity * pricePerBox}€`;
}

function updateCartDisplay() {
  cartQty.textContent = cartQuantity;
  cartTotal.textContent = formatTotal(cartQuantity);
}

function clampQuantity(value) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

increaseBtn.addEventListener('click', () => {
  qtyInput.value = clampQuantity(Number(qtyInput.value) + 1);
});

decreaseBtn.addEventListener('click', () => {
  const next = clampQuantity(qtyInput.value) - 1;
  qtyInput.value = next < 1 ? 1 : next;
});

addToCartBtn.addEventListener('click', () => {
  const qty = clampQuantity(qtyInput.value);
  cartQuantity += qty;
  updateCartDisplay();
});

clearCartBtn.addEventListener('click', () => {
  cartQuantity = 0;
  updateCartDisplay();
});

function addReservation(title, datetime) {
  const placeholder = reservationList.querySelector('.placeholder');
  if (placeholder) {
    placeholder.remove();
  }

  const item = document.createElement('li');
  item.innerHTML = `<span><strong>${title}</strong> — ${datetime}</span>`;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'btn ghost';
  removeBtn.textContent = 'Retirer';
  removeBtn.addEventListener('click', () => {
    item.remove();
    if (!reservationList.children.length) {
      const empty = document.createElement('li');
      empty.className = 'placeholder';
      empty.textContent = 'Aucune réservation pour le moment.';
      reservationList.appendChild(empty);
    }
  });

  item.appendChild(removeBtn);
  reservationList.appendChild(item);
}

reserveButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.workshop');
    const title = card?.dataset.title || 'Atelier';
    const datetime = card?.dataset.datetime || '';
    addReservation(title, datetime);
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Merci pour ton message, nous te répondrons vite !');
  contactForm.reset();
});

updateCartDisplay();
