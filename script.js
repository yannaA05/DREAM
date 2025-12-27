<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dream Project | Dreambox & Formations</title>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="top-bar">
    <div class="logo-block">
      <div class="logo-placeholder">
        <!-- Remplacer par notre vrai logo -->
        <img src="https://via.placeholder.com/120x60.png?text=Logo" alt="Logo Dream Project">
      </div>
      <div class="logo-text">
        <span class="logo-title">Dream Project</span>
        <p class="logo-subtitle">Développement personnel & missions humanitaires</p>
      </div>
    </div>
    <nav class="nav-links">
      <a href="#accueil">Accueil</a>
      <a href="#dreambox">Dreambox</a>
      <a href="#formations">Formations</a>
      <a href="#valeurs">À propos</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="accueil" class="hero">
      <div class="hero-content">
        <p class="eyebrow">Alliance unique</p>
        <h1>Développe-toi en finançant des missions humanitaires</h1>
        <p class="hero-text">Dream Project accompagne les jeunes pour gagner confiance en eux, découvrir des parcours inspirants et soutenir des actions solidaires concrètes.</p>
        <div class="hero-actions">
          <a class="btn gradient" href="#dreambox">Découvrir la Dreambox</a>
          <a class="btn ghost" href="#formations">Explorer les formations</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="aquarelle-circle"></div>
        <img src="https://via.placeholder.com/400x320.png?text=Visual+Dreambox" alt="Illustration Dreambox" class="hero-img">
        <div class="badge">30 jours de boost</div>
      </div>
    </section>

    <section id="dreambox" class="section dreambox">
      <div class="section-header">
        <p class="eyebrow">Dreambox</p>
        <h2>30 jours, 30 cartes pour te révéler</h2>
        <p class="section-desc">1 box, 30 cartes pour avancer : <strong>10 citations</strong>, <strong>10 parcours inspirants</strong>, <strong>10 challenges</strong>. Une routine douce, ludique et engagée.</p>
      </div>

      <div class="cards-grid">
        <article class="card">
          <h3 class="script">Citations</h3>
          <p class="tag">10 cartes</p>
          <ul class="mini-list">
            <li>« Ose le premier pas, il t’ouvrira des horizons. »</li>
            <li>« La confiance est un muscle qui se travaille. »</li>
            <li>« Chaque défi est une occasion de grandir. »</li>
          </ul>
        </article>
        <article class="card">
          <h3 class="script">Parcours inspirants</h3>
          <p class="tag">10 cartes</p>
          <ul class="mini-list">
            <li>Emma : de l’échec scolaire à la mission au Népal.</li>
            <li>Malik : un podcast pour financer une école.</li>
            <li>Sofia : une junior entreprise solidaire.</li>
          </ul>
        </article>
        <article class="card">
          <h3 class="script">Challenges</h3>
          <p class="tag">10 cartes</p>
          <ul class="mini-list">
            <li>Challenge gratitude : 3 kifs par jour.</li>
            <li>Challenge action : un mail d’audace.</li>
            <li>Challenge solidarité : 1h pour une asso locale.</li>
          </ul>
        </article>
      </div>

      <div class="order-panel">
        <div class="order-info">
          <h3>Commander la Dreambox</h3>
          <p>Une box pour 30 jours de motivation et d’impact. Idéale pour progresser en douceur et soutenir nos missions humanitaires.</p>
          <p class="price">Prix solidaire : <strong>45€</strong></p>
          <div class="quantity">
            <button class="btn round" id="decrease-qty" aria-label="Diminuer la quantité">-</button>
            <input type="number" id="quantity" value="1" min="1" aria-label="Quantité">
            <button class="btn round" id="increase-qty" aria-label="Augmenter la quantité">+</button>
          </div>
          <button class="btn gradient" id="add-to-cart">Ajouter au panier</button>
        </div>
        <div class="cart" aria-live="polite">
          <h4>Panier</h4>
          <p><span class="label">Quantité :</span> <span id="cart-qty">0</span></p>
          <p><span class="label">Total :</span> <span id="cart-total">0€</span></p>
          <button class="btn ghost" id="clear-cart">Vider le panier</button>
        </div>
      </div>
    </section>

    <section id="formations" class="section formations">
      <div class="section-header">
        <p class="eyebrow">Formations développement personnel</p>
        <h2>Choisis ton atelier</h2>
        <p class="section-desc">Des formats courts, concrets, en ligne ou en présentiel, pour passer à l’action et renforcer ta confiance.</p>
      </div>

      <div class="cards-grid workshops">
        <article class="card workshop" data-title="Confiance en soi express" data-datetime="12 mai · 18h30 · en ligne">
          <div class="card-top">
            <p class="tag">En ligne</p>
            <p class="date">12 mai · 18h30</p>
          </div>
          <h3 class="script">Confiance en soi express</h3>
          <p>Outils concrets pour mieux te présenter, pitcher tes projets et oser demander de l’aide.</p>
          <button class="btn gradient reserve-btn">Réserver ce créneau</button>
        </article>
        <article class="card workshop" data-title="Leadership bienveillant" data-datetime="16 mai · 19h · présentiel Paris">
          <div class="card-top">
            <p class="tag">Présentiel</p>
            <p class="date">16 mai · 19h</p>
          </div>
          <h3 class="script">Leadership bienveillant</h3>
          <p>Prendre la parole, motiver une équipe et garder un climat positif, même sous pression.</p>
          <button class="btn gradient reserve-btn">Réserver ce créneau</button>
        </article>
        <article class="card workshop" data-title="Gestion du stress avant un oral" data-datetime="23 mai · 18h · en ligne">
          <div class="card-top">
            <p class="tag">En ligne</p>
            <p class="date">23 mai · 18h</p>
          </div>
          <h3 class="script">Gestion du stress avant un oral</h3>
          <p>Respiration, visualisation et routine minute pour transformer le trac en énergie.</p>
          <button class="btn gradient reserve-btn">Réserver ce créneau</button>
        </article>
      </div>

      <div class="reservations">
        <h4>Mes réservations</h4>
        <ul id="reservation-list" class="reservation-list">
          <li class="placeholder">Aucune réservation pour le moment.</li>
        </ul>
      </div>
    </section>

    <section id="valeurs" class="section about">
      <div class="section-header">
        <p class="eyebrow">Nos valeurs</p>
        <h2>À propos de Dream Project</h2>
      </div>
      <div class="about-content">
        <img src="https://via.placeholder.com/360x260.png?text=Jeunes+en+mission" alt="Jeunes en mission humanitaire" class="about-img">
        <div class="text">
          <p>Dream Project aide les jeunes à grandir en confiance grâce à des programmes de développement personnel mêlés à des missions humanitaires. Chaque Dreambox et chaque atelier financent des actions de terrain : mentorat local, kits scolaires, soutien à des associations partenaires.</p>
          <p>Notre pédagogie est douce, positive et engagée : nous créons des expériences concrètes pour que chacun puisse passer à l’action, progresser et contribuer à un monde plus solidaire.</p>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact">
      <div class="section-header">
        <p class="eyebrow">Contact</p>
        <h2>Discutons de ton projet</h2>
      </div>
      <form id="contact-form" class="contact-form">
        <div class="form-row">
          <label for="name">Nom</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-row">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-row">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn gradient">Envoyer</button>
      </form>
    </section>
  </main>

  <footer class="footer">
    <p>Dream Project — Développe ton potentiel et soutiens des missions humanitaires</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
