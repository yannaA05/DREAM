const pricePerBox = 45;
let cartQuantity = 0;

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
const book = document.getElementById('book');
const pages = Array.from(document.querySelectorAll('.page'));
const totalPages = pages.length;
const pageIndicator = document.getElementById('pageIndicator');
const dots = document.getElementById('dots');
const leftEdge = document.querySelector('.edge-left');
const rightEdge = document.querySelector('.edge-right');
const modeToggle = document.getElementById('modeToggle');
const sparkles = document.getElementById('sparkles');
const openBookBtn = document.getElementById('openBook');
const backToCoverBtn = document.getElementById('backToCover');
let currentPage = 1;
let touchStartX = 0;
let touchEndX = 0;

function buildDots() {
  dots.innerHTML = '';
  for (let i = 1; i <= totalPages; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === currentPage) dot.classList.add('active');
    dots.appendChild(dot);
  }
}

function updateIndicator() {
  pageIndicator.textContent = `Page ${currentPage} / ${totalPages}`;
  dots.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx + 1 === currentPage);
  });
}

function setPageClasses() {
  pages.forEach((page, idx) => {
    const pageNum = idx + 1;
    page.style.zIndex = totalPages - idx;
    page.classList.remove('active', 'flipped', 'behind');
    if (pageNum === currentPage) {
      page.classList.add('active');
      page.style.transform = 'rotateY(0deg)';
    } else if (pageNum < currentPage) {
      page.classList.add('flipped');
      page.style.transform = 'rotateY(-180deg)';
    } else {
      page.classList.add('behind');
      page.style.transform = 'rotateY(0deg)';
    }
  });
}

function goToPage(target) {
  if (target < 1 || target > totalPages) return;
  currentPage = target;
  setPageClasses();
  updateIndicator();
  if (currentPage === totalPages) triggerSparkles();
}

function nextPage() {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function setupEdges() {
  leftEdge.addEventListener('click', prevPage);
  rightEdge.addEventListener('click', nextPage);
}

function setupKeys() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
  });
}

function setupTouch() {
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
}

function handleGesture() {
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) < 40) return;
  if (delta < 0) nextPage();
  else prevPage();
}

function setupButtons() {
  if (openBookBtn) openBookBtn.addEventListener('click', () => goToPage(2));
  if (backToCoverBtn) backToCoverBtn.addEventListener('click', () => goToPage(1));
}

function setupNightMode() {
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    modeToggle.textContent = document.body.classList.contains('dark') ? 'Mode jour' : 'Mode nuit';
  });
}

function setupProjectModals() {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeModal = document.getElementById('closeModal');

  function openModal(title, desc) {
    modalTitle.textContent = title;
    modalDescription.textContent = desc;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function hideModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      openModal(card.dataset.title, card.dataset.desc);
    });
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') openModal(card.dataset.title, card.dataset.desc);
    });
  });

  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });
}

function setupGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function hideLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.gallery-img').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  closeLightbox.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
  });
}

const initialFeedback = [
  { name: 'Léna', message: 'Une plume douce et un regard sincère, ça se ressent.' },
  { name: 'Thomas', message: 'Bravo pour la cohérence entre pédagogie et créativité !' },
  { name: 'Maya', message: 'Le carnet donne envie de découvrir les projets Dream Project.' },
  { name: 'Samira', message: 'Ton énergie positive est communicative, continue.' },
];

function renderFeedback(list) {
  const wrapper = document.getElementById('feedbackList');
  wrapper.innerHTML = '';
  list.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<div class="author">${item.name}</div><p>${item.message}</p>`;
    wrapper.appendChild(div);
  });
}

function setupFeedback() {
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackList = [...initialFeedback];
  renderFeedback(feedbackList);
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = feedbackForm.feedbackName.value.trim();
    const message = feedbackForm.feedbackComment.value.trim();
    if (!name || !message) return;
    feedbackList.unshift({ name, message });
    renderFeedback(feedbackList);
    feedbackForm.reset();
  });
}

function setupContact() {
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci pour ton message ! Je reviens vite vers toi.');
    contactForm.reset();
  });
}

function triggerSparkles() {
  sparkles.innerHTML = '';
  sparkles.setAttribute('aria-hidden', 'false');
  const count = 16;
  for (let i = 0; i < count; i += 1) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 30}%`;
    sparkles.appendChild(s);
  }
  setTimeout(() => {
    sparkles.innerHTML = '';
    sparkles.setAttribute('aria-hidden', 'true');
  }, 1700);
}

function animateSkills() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fill').forEach((bar) => {
          const target = bar.style.getPropertyValue('--target') || getComputedStyle(bar).getPropertyValue('--target');
          bar.style.width = target || '80%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-bars').forEach((section) => observer.observe(section));
}

function init() {
  buildDots();
  setPageClasses();
  updateIndicator();
  setupEdges();
  setupKeys();
  setupTouch();
  setupButtons();
  setupNightMode();
  setupProjectModals();
  setupGalleryLightbox();
  setupFeedback();
  setupContact();
  animateSkills();
}

init();
const pricePerBox = 13;
let cartQuantity = 0;

const qtyInput = document.getElementById('quantity');
const increaseBtn = document.getElementById('increase-qty');
const decreaseBtn = document.getElementById('decrease-qty');
const addToCartBtn = document.getElementById('add-to-cart');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const cartRecap = document.getElementById('cart-recap');

const reserveButtons = document.querySelectorAll('.reserve-btn');
const reservationList = document.getElementById('reservation-list');

const contactForm = document.getElementById('contact-form');

function formatTotal(quantity) {
  return `${quantity * pricePerBox}€`;
const feedbackForm = document.getElementById('feedback-form');
const reviewList = document.getElementById('review-list');

function formatTotal(quantity) {
  const total = (quantity * pricePerBox).toFixed(2).replace(/\.00$/, '');
  return `${total}€`;
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
  if (cartQuantity === 0) {
    cartRecap.textContent = 'Ajoute une Dreambox pour voir ton récapitulatif.';
  } else {
    cartRecap.textContent = `Tu as ${cartQuantity} Dreambox${cartQuantity > 1 ? 's' : ''} pour un total de ${formatTotal(cartQuantity)}.`;
  }
}

function updateIndicator() {
  pageIndicator.textContent = `Page ${currentPage} / ${totalPages}`;
  dots.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx + 1 === currentPage);
  });
}

function setPageClasses() {
  pages.forEach((page, idx) => {
    const pageNum = idx + 1;
    page.style.zIndex = totalPages - idx;
    page.classList.remove('active', 'flipped', 'behind');
    if (pageNum === currentPage) {
      page.classList.add('active');
      page.style.transform = 'rotateY(0deg)';
    } else if (pageNum < currentPage) {
      page.classList.add('flipped');
      page.style.transform = 'rotateY(-180deg)';
    } else {
      page.classList.add('behind');
      page.style.transform = 'rotateY(0deg)';
    }
  });
}

function goToPage(target) {
  if (target < 1 || target > totalPages) return;
  currentPage = target;
  setPageClasses();
  updateIndicator();
  if (currentPage === totalPages) triggerSparkles();
}

function nextPage() {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function setupEdges() {
  leftEdge.addEventListener('click', prevPage);
  rightEdge.addEventListener('click', nextPage);
}

function setupKeys() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
  });
}

function setupTouch() {
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
}

function handleGesture() {
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) < 40) return;
  if (delta < 0) nextPage();
  else prevPage();
}

function setupButtons() {
  if (openBookBtn) openBookBtn.addEventListener('click', () => goToPage(2));
  if (backToCoverBtn) backToCoverBtn.addEventListener('click', () => goToPage(1));
}

function setupNightMode() {
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    modeToggle.textContent = document.body.classList.contains('dark') ? 'Mode jour' : 'Mode nuit';
  });
}

function setupProjectModals() {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeModal = document.getElementById('closeModal');

  function openModal(title, desc) {
    modalTitle.textContent = title;
    modalDescription.textContent = desc;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function hideModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      openModal(card.dataset.title, card.dataset.desc);
    });
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') openModal(card.dataset.title, card.dataset.desc);
    });
  });

  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });
}

function setupGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function hideLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.gallery-img').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  closeLightbox.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
  });
}

const initialFeedback = [
  { name: 'Léna', message: 'Une plume douce et un regard sincère, ça se ressent.' },
  { name: 'Thomas', message: 'Bravo pour la cohérence entre pédagogie et créativité !' },
  { name: 'Maya', message: 'Le carnet donne envie de découvrir les projets Dream Project.' },
  { name: 'Samira', message: 'Ton énergie positive est communicative, continue.' },
];

function renderFeedback(list) {
  const wrapper = document.getElementById('feedbackList');
  wrapper.innerHTML = '';
  list.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<div class="author">${item.name}</div><p>${item.message}</p>`;
    wrapper.appendChild(div);
  });
}

function setupFeedback() {
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackList = [...initialFeedback];
  renderFeedback(feedbackList);
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = feedbackForm.feedbackName.value.trim();
    const message = feedbackForm.feedbackComment.value.trim();
    if (!name || !message) return;
    feedbackList.unshift({ name, message });
    renderFeedback(feedbackList);
    feedbackForm.reset();
  });
}

function setupContact() {
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci pour ton message ! Je reviens vite vers toi.');
    contactForm.reset();
  });
}

function triggerSparkles() {
  sparkles.innerHTML = '';
  sparkles.setAttribute('aria-hidden', 'false');
  const count = 16;
  for (let i = 0; i < count; i += 1) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 30}%`;
    sparkles.appendChild(s);
  }
  setTimeout(() => {
    sparkles.innerHTML = '';
    sparkles.setAttribute('aria-hidden', 'true');
  }, 1700);
}

function animateSkills() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fill').forEach((bar) => {
          const target = bar.style.getPropertyValue('--target') || getComputedStyle(bar).getPropertyValue('--target');
          bar.style.width = target || '80%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-bars').forEach((section) => observer.observe(section));
}

function init() {
  buildDots();
  setPageClasses();
  updateIndicator();
  setupEdges();
  setupKeys();
  setupTouch();
  setupButtons();
  setupNightMode();
  setupProjectModals();
  setupGalleryLightbox();
  setupFeedback();
  setupContact();
  animateSkills();
}

init();
