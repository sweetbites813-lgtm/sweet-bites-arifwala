// Sweet Bites Arifwala - Storefront Interactive Engine & 3D Renderer

// 1. DEFAULT DATA INITIALIZATION
const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    title: "Luxury Birthday Custom Cake",
    price: 1600,
    category: "cakes",
    image: "assets/birthday_cake.webp",
    description: "An elegant custom frosted birthday cake. Rich chocolate fudge base decorated with gold sprinkles and delicate hand-crafted sugar toppings. Free delivery & candles included.",
    flavour: "Chocolate Fudge",
    leadTime: "2 Days"
  },
  {
    id: "prod-2",
    title: "Floral Wedding Custom Cake",
    price: 1800,
    category: "cakes",
    image: "assets/wedding_cake.webp",
    description: "A beautiful multi-tier classic wedding cake. Coated in premium fondant with delicate icing lace details and rose decor to elevate your reception. Free delivery & candles included.",
    flavour: "Vanilla Caramel Drip",
    leadTime: "4 Days"
  },
  {
    id: "prod-3",
    title: "Cartoon Theme Fondant Cake",
    price: 2200,
    category: "cakes",
    image: "assets/custom_cake.webp",
    description: "Customized themed cake built exactly to your references. Features colorful fondant figurines, custom messaging, and playful details. Free delivery & candles included.",
    flavour: "Red Velvet Cream Cheese",
    leadTime: "3 Days"
  },
  {
    id: "prod-4",
    title: "Anniversary Gold Drip Cake",
    price: 1700,
    category: "cakes",
    image: "assets/gallery_hero.webp",
    description: "Exquisite drip cake styled with gold accents, macarons, and elegant cream frosting. Perfect for special anniversaries. Free delivery & candles included.",
    flavour: "Lotus Biscoff Cream",
    leadTime: "2 Days"
  },
  {
    id: "prod-5",
    title: "Chocolate Fudge Overload Cake",
    price: 1500,
    category: "cakes",
    image: "assets/fudge_brownies.webp",
    description: "A dream cake for chocolate lovers. Rich moist chocolate sponge layered with heavy fudge frosting and topped with chocolate flakes. Free delivery & candles included.",
    flavour: "Belgian Chocolate Fudge",
    leadTime: "2 Days"
  },
  {
    id: "prod-6",
    title: "Elegant Engagement Custom Cake",
    price: 1900,
    category: "cakes",
    image: "assets/birthday_cake.webp",
    description: "A premium customized cake designed to match your engagement theme. Soft colors, elegant piping, and custom names. Free delivery & candles included.",
    flavour: "Cookies & Cream OREO",
    leadTime: "2 Days"
  },
  {
    id: "prod-7",
    title: "Red Roses Premium Bouquet",
    price: 1500,
    category: "bouquets",
    image: "assets/roses_bouquet.webp",
    description: "A stunning arrangement of 12 fresh red roses elegantly wrapped in premium black and gold paper. Perfect for romantic gifting. Free delivery in Arifwala.",
    flavour: "12 Red Roses",
    leadTime: "1 Day"
  },
  {
    id: "prod-8",
    title: "Pink & Lilies Pastel Bouquet",
    price: 1800,
    category: "bouquets",
    image: "assets/pastels_bouquet.webp",
    description: "A charming floral bouquet featuring fresh pink carnations, white lilies, and soft baby breath in a pastel wrapping. Free delivery in Arifwala.",
    flavour: "Pink & White Mix",
    leadTime: "1 Day"
  },
  {
    id: "prod-9",
    title: "Bright Sunflower & Lily Bouquet",
    price: 2200,
    category: "bouquets",
    image: "assets/sunflower_bouquet.webp",
    description: "A warm and cheerful arrangement of bright sunflowers and white lilies wrapped in rustic twine paper wrapper. Free delivery in Arifwala.",
    flavour: "Yellow & White Mix",
    leadTime: "1 Day"
  }
];

// Load dataset with .png to .webp migration
function loadDatabase() {
  const localData = localStorage.getItem("sweet_bites_products");
  if (!localData) {
    localStorage.setItem("sweet_bites_products", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  let list = JSON.parse(localData);
  let updated = false;
  list.forEach(p => {
    if (p.image && p.image.endsWith(".png") && !p.image.endsWith("logo.png")) {
      p.image = p.image.replace(".png", ".webp");
      updated = true;
    }
  });
  if (updated) {
    localStorage.setItem("sweet_bites_products", JSON.stringify(list));
  }
  return list;
}

let products = loadDatabase();

// 1b. DYNAMIC SETTINGS & SOCIAL LINKS INITIALIZATION
const DEFAULT_SETTINGS = {
  whatsappPhone: "923217337801",
  instagramUrl: "https://www.instagram.com/sweetbitesarifwala?igsh=MTB1Nnd1OHJrcnBjcA==",
  facebookUrl: "https://www.facebook.com/share/18uBoeR6QQ/",
  tiktokUrl: "https://www.tiktok.com/@sweetbitesarifwala?_r=1&_t=ZS-984c8QtwRU2"
};

function loadSettings() {
  const localSettings = localStorage.getItem("sweet_bites_settings");
  if (!localSettings) {
    localStorage.setItem("sweet_bites_settings", JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  let settings = JSON.parse(localSettings);
  // Migrate old default settings to new real ones
  if (settings.whatsappPhone === "923001234567" || !settings.instagramUrl.includes("sweetbitesarifwala")) {
    settings = DEFAULT_SETTINGS;
    localStorage.setItem("sweet_bites_settings", JSON.stringify(settings));
  }
  return settings;
}

let settings = loadSettings();

function applySocialLinks() {
  const navInsta = document.getElementById("nav-link-instagram");
  const navFb = document.getElementById("nav-link-facebook");
  const navTiktok = document.getElementById("nav-link-tiktok");

  if (navInsta) navInsta.href = settings.instagramUrl;
  if (navFb) navFb.href = settings.facebookUrl;
  if (navTiktok) navTiktok.href = settings.tiktokUrl;

  const footInsta = document.getElementById("footer-link-instagram");
  const footFb = document.getElementById("footer-link-facebook");
  const footTiktok = document.getElementById("footer-link-tiktok");
  const footWa = document.getElementById("footer-link-whatsapp");

  if (footInsta) footInsta.href = settings.instagramUrl;
  if (footFb) footFb.href = settings.facebookUrl;
  if (footTiktok) footTiktok.href = settings.tiktokUrl;
  if (footWa) footWa.href = `https://wa.me/${settings.whatsappPhone}`;

  const footPhoneText = document.getElementById("footer-phone-text");
  if (footPhoneText) {
    let rawPhone = settings.whatsappPhone;
    let formattedPhone = rawPhone;
    if (rawPhone.startsWith("92") && rawPhone.length === 12) {
      formattedPhone = "+92 " + rawPhone.substring(2, 5) + " " + rawPhone.substring(5);
    } else if (rawPhone.startsWith("0") && rawPhone.length === 11) {
      formattedPhone = "+92 " + rawPhone.substring(1, 4) + " " + rawPhone.substring(4);
    }
    footPhoneText.innerHTML = `<i class="fab fa-whatsapp"></i> ${formattedPhone}`;
  }
}

function refreshStorefrontData() {
  products = loadDatabase();
  settings = loadSettings();
  applySocialLinks();
  renderAllCatalogs();
}

// Sync edits instantly when switching tabs or when localstorage changes
window.addEventListener("focus", refreshStorefrontData);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshStorefrontData();
  }
});
window.addEventListener("storage", refreshStorefrontData);

document.addEventListener("DOMContentLoaded", () => {
  applySocialLinks();
});

// 2. BACKGROUND FLOUR PARTICLE SYSTEM
const particleCanvas = document.getElementById("particle-canvas");
const ctx = particleCanvas.getContext("2d");

let particles = [];
function resizeCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class FlourParticle {
  constructor() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.4 + 0.1;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > particleCanvas.height) {
      this.y = 0;
      this.x = Math.random() * particleCanvas.width;
    }
  }
  draw() {
    ctx.fillStyle = `rgba(54, 31, 20, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push(new FlourParticle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// 3. RESPONSIVE NAVBAR SCROLL AND TOGGLE
const mainHeader = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    mainHeader.classList.add("scrolled");
  } else {
    mainHeader.classList.remove("scrolled");
  }
});

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");
mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuBtn.querySelectorAll("span").forEach((bar, index) => {
    if (navMenu.classList.contains("active")) {
      if (index === 0) bar.style.transform = "rotate(45deg) translate(6px, 6px)";
      if (index === 1) bar.style.opacity = "0";
      if (index === 2) bar.style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    }
  });
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuBtn.querySelectorAll("span").forEach(bar => {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    });
  });
});

// 4. DYNAMIC HERO SLIDER ENGINE
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".slider-nav-dot");
let heroSliderInterval;

function showHeroSlide(index) {
  if (heroSlides.length === 0) return;
  heroSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
      if (heroDots[i]) heroDots[i].classList.add("active");
    } else {
      slide.classList.remove("active");
      if (heroDots[i]) heroDots[i].classList.remove("active");
    }
  });
  currentHeroSlide = index;
}

window.setHeroSlide = function(index) {
  clearInterval(heroSliderInterval);
  showHeroSlide(index);
  startHeroAutoplay();
};

function startHeroAutoplay() {
  if (heroSlides.length === 0) return;
  heroSliderInterval = setInterval(() => {
    let nextSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(nextSlide);
  }, 4000);
}

// Start autoplay on page load
if (heroSlides.length > 0) {
  startHeroAutoplay();
}

// 5. RENDER MENU AND DYNAMIC BINDINGS
const shopGrid = document.getElementById("shop-grid");
const bouquetsGrid = document.getElementById("bouquets-grid");

function renderMenuGrid(items, gridElement) {
  if (!gridElement) return;
  gridElement.innerHTML = "";
  if (items.length === 0) {
    gridElement.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-style: italic; padding: 40px 0;">No items found. Add some from the Dashboard!</div>`;
    return;
  }

  items.forEach(product => {
    const unitLabel = product.category === 'cakes' ? 'Pound' : 'Bouquet';
    const productHtml = `
      <div class="product-card-3d" data-id="${product.id}">
        <div class="product-card-inner">
          
          <!-- Card Front -->
          <div class="product-card-front">
            <div class="product-img-wrapper">
              <span class="product-category-tag">${product.category === 'cakes' ? 'Cake' : 'Bouquet'}</span>
              <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
            </div>
            <div class="product-info-front">
              <h3>${product.title}</h3>
              <div class="product-price">Rs. ${product.price.toLocaleString()} / ${unitLabel}</div>
              <p class="product-hint"><i class="fas fa-sync-alt"></i> Hover / Tap to flip & details</p>
            </div>
          </div>

          <!-- Card Back -->
          <div class="product-card-back">
            <h3>${product.title}</h3>
            <p class="product-desc">${product.description || 'Deliciously hand-crafted premium treat baked fresh using gourmet ingredients.'}</p>
            <ul class="product-details-list">
              <li><span>Default Variant:</span> <strong>${product.flavour || 'Baker Special'}</strong></li>
              <li><span>Required Lead Time:</span> <strong>${product.leadTime || '1 Day'}</strong></li>
              <li><span>Order Method:</span> <strong>WhatsApp</strong></li>
            </ul>
            <button class="btn-card-order" onclick="openQuickOrderModal('${product.id}')">
              <i class="fab fa-whatsapp"></i> Quick WhatsApp Order
            </button>
          </div>

        </div>
      </div>
    `;
    gridElement.innerHTML += productHtml;
  });
}

function renderAllCatalogs() {
  const cakeItems = products.filter(p => p.category === 'cakes');
  const bouquetItems = products.filter(p => p.category === 'bouquets');
  
  renderMenuGrid(cakeItems, shopGrid);
  renderMenuGrid(bouquetItems, bouquetsGrid);
}

// Load the default shop items
renderAllCatalogs();

// 6. WHATSAPP CUSTOM ORDER GENERATOR
const orderForm = document.getElementById("whatsapp-order-form");
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("order-name").value;
  const whatsappInput = document.getElementById("order-whatsapp").value;
  const type = document.getElementById("order-item-type").value;
  const weight = document.getElementById("order-weight").value;
  const flavor = document.getElementById("order-flavor").value;
  const deliveryDate = document.getElementById("order-date").value;
  const flowers = document.getElementById("order-flowers").value;
  const packing = document.getElementById("order-packing").value;
  const details = document.getElementById("order-details").value;

  // Format details for WhatsApp string
  const customMessage = `Hello Sweet Bites Arifwala! 🍰
I want to request a custom order:

👤 Name: ${name}
📞 Contact: ${whatsappInput}
🎂 Product Type: ${type}
⚖️ Size / Qty: ${weight}
🍫 Flavor: ${flavor}
📅 Date of Delivery: ${deliveryDate}
🌸 Flower Bouquet: ${flowers}
🎁 Gift Packaging: ${packing}
📋 Custom Details: ${details ? details : 'None'}

Please confirm this request and guide me on payment details. Thank you!`;

  const encodedMsg = encodeURIComponent(customMessage);
  // Using dynamic baker custom number loaded from settings
  const bakerPhone = settings.whatsappPhone;
  window.open(`https://wa.me/${bakerPhone}?text=${encodedMsg}`, "_blank");
});

// 6b. QUICK ORDER CALCULATOR MODAL LOGIC
let currentOrderProduct = null;
const qomModal = document.getElementById("quick-order-modal");
const qomName = document.getElementById("qom-product-name");
const qomDesc = document.getElementById("qom-product-desc");
const qomQtyLabel = document.getElementById("qom-qty-label");
const qomQtySelect = document.getElementById("qom-qty");
const qomTotalPrice = document.getElementById("qom-total-price");

window.openQuickOrderModal = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentOrderProduct = product;
  qomName.innerText = product.title;
  qomDesc.innerText = product.description || "";

  // Configure quantity dropdown options based on category
  qomQtySelect.innerHTML = "";
  if (product.category === "cakes") {
    qomQtyLabel.innerText = "Select Weight (Pounds)";
    for (let i = 1; i <= 10; i++) {
      qomQtySelect.innerHTML += `<option value="${i}">${i} ${i === 1 ? 'Pound' : 'Pounds'}</option>`;
    }
  } else if (product.category === "cookies") {
    qomQtyLabel.innerText = "Select Quantity (Boxes)";
    for (let i = 1; i <= 5; i++) {
      qomQtySelect.innerHTML += `<option value="${i}">${i} ${i === 1 ? 'Box' : 'Boxes'}</option>`;
    }
  } else {
    qomQtyLabel.innerText = "Select Quantity (Loaves/Pieces)";
    for (let i = 1; i <= 5; i++) {
      qomQtySelect.innerHTML += `<option value="${i}">${i} ${i === 1 ? 'Loaf' : 'Loaves'}</option>`;
    }
  }

  updateQuickOrderTotal();
  qomModal.classList.add("active");
};

window.closeQuickOrderModal = function() {
  qomModal.classList.remove("active");
  currentOrderProduct = null;
};

window.updateQuickOrderTotal = function() {
  if (!currentOrderProduct) return;
  const qty = Number(qomQtySelect.value);
  const total = currentOrderProduct.price * qty;
  qomTotalPrice.innerText = `Rs. ${total.toLocaleString()}`;
};

window.submitQuickOrderModal = function() {
  if (!currentOrderProduct) return;
  const qty = Number(qomQtySelect.value);
  const total = currentOrderProduct.price * qty;
  const unit = currentOrderProduct.category === "cakes" ? (qty === 1 ? "Pound" : "Pounds") : (currentOrderProduct.category === "cookies" ? (qty === 1 ? "Box" : "Boxes") : (qty === 1 ? "Loaf" : "Loaves"));

  const orderMsg = `Hello Sweet Bites Arifwala! 🍰
I am interested in ordering:

🎂 Product: ${currentOrderProduct.title}
⚖️ Selected Size/Qty: ${qty} ${unit}
💵 Price per Unit: Rs. ${currentOrderProduct.price.toLocaleString()}
💰 Total Price: Rs. ${total.toLocaleString()}

Please tell me the availability and confirm my order request. Thanks!`;

  const encodedMsg = encodeURIComponent(orderMsg);
  const bakerPhone = settings.whatsappPhone;
  window.open(`https://wa.me/${bakerPhone}?text=${encodedMsg}`, "_blank");

  // Save to customer order history if logged in
  saveOrderToCustomerProfile(currentOrderProduct.title, qty + " " + unit, total);

  closeQuickOrderModal();
};

// 7. LIGHTBOX CONTROLS
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

window.openLightbox = function(item) {
  const imgElement = item.querySelector("img");
  const captionTitle = item.querySelector("h4").innerText;
  
  lightboxImg.src = imgElement.src;
  lightboxCaption.innerText = captionTitle;
  
  lightbox.classList.add("active");
};

window.closeLightbox = function() {
  lightbox.classList.remove("active");
};

// 8. TESTIMONIALS SLIDER
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;
let slideInterval;

window.setSlide = function(index) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
};

function autoSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  setSlide(currentSlide);
}

function startSlider() {
  slideInterval = setInterval(autoSlide, 5000);
}

function stopSlider() {
  clearInterval(slideInterval);
}

startSlider();

// Pause sliding when mouse is hovering over slider section
document.querySelector(".testimonials").addEventListener("mouseenter", stopSlider);
document.querySelector(".testimonials").addEventListener("mouseleave", startSlider);

// ============================================================
// 9. CUSTOMER AUTHENTICATION SYSTEM
// ============================================================

const CUSTOMERS_KEY = "sweet_bites_customers";
const CURRENT_CUSTOMER_KEY = "sweet_bites_current_customer";

// --- Helper Functions ---
function getCustomers() {
  return JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || "[]");
}
function saveCustomers(list) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(list));
}
function getCurrentCustomer() {
  return JSON.parse(localStorage.getItem(CURRENT_CUSTOMER_KEY) || "null");
}
function setCurrentCustomer(customer) {
  localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(customer));
}

// --- Show Auth Message ---
function showAuthMessage(msg, isError = false) {
  const el = document.getElementById("auth-message");
  el.style.display = "block";
  el.style.background = isError ? "rgba(220,60,60,0.1)" : "rgba(70,160,70,0.1)";
  el.style.color = isError ? "#c0392b" : "#27ae60";
  el.style.border = isError ? "1px solid rgba(220,60,60,0.3)" : "1px solid rgba(70,160,70,0.3)";
  el.textContent = msg;
}

// --- Open / Close Login Modal ---
function openCustomerLoginModal() {
  const cur = getCurrentCustomer();
  if (cur) {
    // Already logged in → open profile panel instead
    openProfilePanel();
    return;
  }
  switchAuthTab("login");
  document.getElementById("auth-message").style.display = "none";
  document.getElementById("customer-auth-modal").classList.add("active");
}

function closeCustomerLoginModal() {
  document.getElementById("customer-auth-modal").classList.remove("active");
}

// --- Tab Switching ---
function switchAuthTab(tab) {
  const loginForm   = document.getElementById("login-form");
  const signupForm  = document.getElementById("signup-form");
  const tabLogin    = document.getElementById("tab-login");
  const tabSignup   = document.getElementById("tab-signup");
  const subtitle    = document.getElementById("auth-subtitle");
  document.getElementById("auth-message").style.display = "none";

  if (tab === "login") {
    loginForm.style.display  = "block";
    signupForm.style.display = "none";
    tabLogin.style.background  = "var(--gold-primary)";
    tabLogin.style.color       = "var(--text-light)";
    tabSignup.style.background = "var(--cream-bg)";
    tabSignup.style.color      = "var(--text-muted)";
    subtitle.textContent = "Welcome back! Login to track your orders.";
  } else {
    loginForm.style.display  = "none";
    signupForm.style.display = "block";
    tabSignup.style.background = "var(--gold-primary)";
    tabSignup.style.color      = "var(--text-light)";
    tabLogin.style.background  = "var(--cream-bg)";
    tabLogin.style.color       = "var(--text-muted)";
    subtitle.textContent = "Naya account banayein — bilkul free!";
  }
}

// --- Sign Up Handler ---
function handleCustomerSignup(e) {
  e.preventDefault();
  const name     = document.getElementById("signup-name").value.trim();
  const phone    = document.getElementById("signup-phone").value.trim();
  const email    = document.getElementById("signup-email").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;

  const customers = getCustomers();
  if (customers.find(c => c.email === email)) {
    showAuthMessage("❌ Yeh email pehle se registered hai! Login karein.", true);
    return;
  }

  const newCustomer = {
    id: "cust-" + Date.now(),
    name,
    phone,
    email,
    password, // NOTE: Plain text for demo — use hashing on real servers
    joinedDate: new Date().toLocaleDateString("ur-PK"),
    orders: []
  };

  customers.push(newCustomer);
  saveCustomers(customers);
  setCurrentCustomer(newCustomer);
  showAuthMessage("✅ Account ban gaya! Khush aamdeed, " + name + "! 🎂");
  
  setTimeout(() => {
    closeCustomerLoginModal();
    updateNavForCustomer(newCustomer);
  }, 1200);
}

// --- Login Handler ---
function handleCustomerLogin(e) {
  e.preventDefault();
  const email    = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  const customers = getCustomers();
  const customer  = customers.find(c => c.email === email && c.password === password);

  if (!customer) {
    showAuthMessage("❌ Email ya password galat hai!", true);
    return;
  }

  setCurrentCustomer(customer);
  showAuthMessage("✅ Login kamyab! Khush aamdeed, " + customer.name + "! 🎂");

  setTimeout(() => {
    closeCustomerLoginModal();
    updateNavForCustomer(customer);
  }, 1000);
}

// --- Logout ---
function customerLogout() {
  localStorage.removeItem(CURRENT_CUSTOMER_KEY);
  // Restore login button
  document.getElementById("nav-login-btn").style.display = "flex";
  document.getElementById("nav-user-badge").style.display = "none";
  closeProfilePanel();
}

// --- Update Navbar after Login ---
function updateNavForCustomer(customer) {
  document.getElementById("nav-login-btn").style.display = "none";
  const badge = document.getElementById("nav-user-badge");
  badge.style.display = "flex";
  // Show first name only
  const firstName = customer.name.split(" ")[0];
  document.getElementById("nav-user-name").textContent = "👋 " + firstName;

  // Make name clickable to open profile
  badge.querySelector("i").style.cursor = "pointer";
  badge.querySelector("i").onclick = openProfilePanel;
  document.getElementById("nav-user-name").style.cursor = "pointer";
  document.getElementById("nav-user-name").onclick = openProfilePanel;
}

// --- Profile Panel ---
function openProfilePanel() {
  const customer = getCurrentCustomer();
  if (!customer) return;
  
  document.getElementById("profile-name").textContent  = customer.name;
  document.getElementById("profile-email").textContent = "📧 " + customer.email;
  document.getElementById("profile-phone").innerHTML   = "<i class='fab fa-whatsapp'></i> " + customer.phone;
  
  // Load orders
  const ordersList = document.getElementById("customer-orders-list");
  if (customer.orders && customer.orders.length > 0) {
    ordersList.innerHTML = customer.orders.map(o => `
      <div style="background:var(--cream-bg); border-radius:8px; padding:15px; margin-bottom:12px; border:1px solid rgba(197,160,89,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
          <strong style="color:var(--text-light); font-size:0.95rem;">${o.product}</strong>
          <span style="color:var(--gold-primary); font-weight:700;">Rs. ${Number(o.total).toLocaleString()}</span>
        </div>
        <div style="font-size:0.8rem; color:var(--text-muted);">${o.weight} • ${o.date}</div>
      </div>
    `).join("");
  } else {
    ordersList.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:30px 0; font-style:italic;">Abhi tak koi order nahi. Abhi order karein! 🍰</p>`;
  }

  document.getElementById("customer-profile-panel").style.right = "0";
  document.getElementById("profile-overlay").style.display = "block";
}

function closeProfilePanel() {
  document.getElementById("customer-profile-panel").style.right = "-420px";
  document.getElementById("profile-overlay").style.display = "none";
}

// --- Save order to customer profile after WhatsApp order ---
function saveOrderToCustomerProfile(productTitle, weight, total) {
  const customer = getCurrentCustomer();
  if (!customer) return;
  
  customer.orders = customer.orders || [];
  customer.orders.unshift({
    product: productTitle,
    weight: weight,
    total: total,
    date: new Date().toLocaleDateString("ur-PK")
  });

  // Update in localStorage list
  const customers = getCustomers();
  const idx = customers.findIndex(c => c.id === customer.id);
  if (idx !== -1) {
    customers[idx] = customer;
    saveCustomers(customers);
    setCurrentCustomer(customer);
  }
}

// --- On Page Load: restore session ---
(function restoreCustomerSession() {
  const customer = getCurrentCustomer();
  if (customer) {
    updateNavForCustomer(customer);
  }
})();
