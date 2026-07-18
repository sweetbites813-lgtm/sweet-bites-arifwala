// Sweet Bites Arifwala - Admin Dashboard Management Engine

const SECRET_PIN = "1234"; // Baker Admin Security Pin
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
  }
];

// 1. PIN ACCESS VERIFICATION & SESSION MANAGEMENT
const loginBox = document.getElementById("login-box");
const dashboardSystem = document.getElementById("dashboard-system");
const pinInput = document.getElementById("admin-pin");
const loginBtn = document.getElementById("login-submit-btn");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout-btn");

function checkSession() {
  if (sessionStorage.getItem("admin_logged_in") === "true") {
    showDashboard();
  } else {
    showLogin();
  }
}

function showDashboard() {
  loginBox.style.display = "none";
  dashboardSystem.classList.add("active");
  logoutBtn.style.display = "block";
  loadAndDisplay();
}

function showLogin() {
  loginBox.style.display = "flex";
  dashboardSystem.classList.remove("active");
  logoutBtn.style.display = "none";
}

loginBtn.addEventListener("click", () => {
  if (pinInput.value === SECRET_PIN) {
    sessionStorage.setItem("admin_logged_in", "true");
    loginError.style.display = "none";
    pinInput.value = "";
    showDashboard();
  } else {
    loginError.style.display = "block";
    pinInput.value = "";
  }
});

pinInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    loginBtn.click();
  }
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("admin_logged_in");
  showLogin();
});

// 2. PRODUCT DATABASE LOGIC
let productsList = [];

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

function saveDatabase() {
  localStorage.setItem("sweet_bites_products", JSON.stringify(productsList));
}

// 3. STATS UPDATE LOGIC
function updateStats() {
  const total = productsList.length;
  const totalEl = document.getElementById("stat-total");
  if (totalEl) totalEl.innerText = total;
}

// 4. DISPLAY PRODUCTS TABLE
const rowsContainer = document.getElementById("admin-product-rows");

function renderTable() {
  rowsContainer.innerHTML = "";
  if (productsList.length === 0) {
    rowsContainer.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #8c7365; font-style: italic;">No products cataloged. Add a new item to get started!</td></tr>`;
    return;
  }

  productsList.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" class="admin-thumbnail" alt="Product Image"></td>
      <td style="font-weight: 600; color: #25140b;">${product.title}</td>
      <td><span class="badge" style="background: rgba(37, 20, 11, 0.08); color: #25140b; border: 1px solid rgba(0,0,0,0.1); padding: 3px 10px; font-size: 0.75rem;">${product.category}</span></td>
      <td>${product.flavour || 'Baker Special'}</td>
      <td style="font-family: monospace; font-size: 1.0rem; font-weight: 700;">Rs. ${Number(product.price).toLocaleString()} / ${product.category === 'cakes' ? 'Pound' : 'Bouquet'}</td>
      <td>
        <div class="admin-action-btns">
          <button class="btn-edit" onclick="openEditModal('${product.id}')"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-delete" onclick="deleteProduct('${product.id}')"><i class="fas fa-trash-alt"></i> Delete</button>
        </div>
      </td>
    `;
    rowsContainer.appendChild(row);
  });
}

function loadAndDisplay() {
  productsList = loadDatabase();
  updateStats();
  renderTable();
  displaySettings();
}

// 5. MODAL FORM MANAGEMENT (ADD / EDIT)
const productModal = document.getElementById("product-modal");
const productForm = document.getElementById("product-form");
const modalTitle = document.getElementById("modal-title");
const openAddModalBtn = document.getElementById("open-add-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelFormBtn = document.getElementById("cancel-form-btn");

const formProductId = document.getElementById("form-product-id");
const formTitle = document.getElementById("form-title");
const formCategory = document.getElementById("form-category");
const formPrice = document.getElementById("form-price");
const formFlavour = document.getElementById("form-flavour");
const formLead = document.getElementById("form-lead");
const formDesc = document.getElementById("form-desc");
const formImageUrl = document.getElementById("form-image-url");
const formImageFile = document.getElementById("form-image-file");
const previewBox = document.getElementById("preview-box");

let selectedImageBase64 = "";

// Image selectors behavior
formImageUrl.addEventListener("input", () => {
  const url = formImageUrl.value.trim();
  if (url) {
    previewBox.innerHTML = `<img src="${url}" onerror="this.src=''; this.parentElement.innerHTML='Invalid URL';">`;
    selectedImageBase64 = url;
    formImageFile.value = ""; // Clear file selector
  } else {
    previewBox.innerHTML = `<span>No Image Selected</span>`;
    selectedImageBase64 = "";
  }
});

formImageFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      selectedImageBase64 = event.target.result;
      previewBox.innerHTML = `<img src="${selectedImageBase64}">`;
      formImageUrl.value = ""; // Clear text field
    };
    reader.readAsDataURL(file);
  }
});

function openAddModal() {
  modalTitle.innerText = "Add New Product";
  productForm.reset();
  formProductId.value = "";
  selectedImageBase64 = "";
  previewBox.innerHTML = `<span>No Image Selected</span>`;
  productModal.classList.add("active");
}

window.openEditModal = function(id) {
  const p = productsList.find(item => item.id === id);
  if (!p) return;

  modalTitle.innerText = `Edit: ${p.title}`;
  formProductId.value = p.id;
  formTitle.value = p.title;
  formCategory.value = p.category;
  formPrice.value = p.price;
  formFlavour.value = p.flavour || "";
  formLead.value = p.leadTime || "";
  formDesc.value = p.description || "";
  
  if (p.image.startsWith("data:") || p.image.startsWith("assets/")) {
    formImageUrl.value = p.image.startsWith("assets/") ? p.image : "";
    selectedImageBase64 = p.image;
    previewBox.innerHTML = `<img src="${p.image}">`;
  } else {
    formImageUrl.value = p.image;
    selectedImageBase64 = p.image;
    previewBox.innerHTML = `<img src="${p.image}">`;
  }

  formImageFile.value = "";
  productModal.classList.add("active");
};

function closeModal() {
  productModal.classList.remove("active");
}

openAddModalBtn.addEventListener("click", openAddModal);
closeModalBtn.addEventListener("click", closeModal);
cancelFormBtn.addEventListener("click", closeModal);

// Form Save Handling
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = formProductId.value;
  const title = formTitle.value.trim();
  const category = formCategory.value;
  const price = Number(formPrice.value);
  const flavour = formFlavour.value.trim();
  const leadTime = formLead.value.trim();
  const description = formDesc.value.trim();

  // Validate image selection
  if (!selectedImageBase64) {
    alert("Please upload an image or provide an image link first!");
    return;
  }

  if (id) {
    // Edit existing product
    const pIndex = productsList.findIndex(item => item.id === id);
    if (pIndex !== -1) {
      productsList[pIndex] = {
        id,
        title,
        category,
        price,
        flavour,
        leadTime,
        description,
        image: selectedImageBase64
      };
    }
  } else {
    // Create new product
    const newProduct = {
      id: `prod-${Date.now()}`,
      title,
      category,
      price,
      flavour,
      leadTime,
      description,
      image: selectedImageBase64
    };
    productsList.push(newProduct);
  }

  saveDatabase();
  closeModal();
  loadAndDisplay();
});

// 6. DELETE PRODUCT
window.deleteProduct = function(id) {
  const p = productsList.find(item => item.id === id);
  if (!p) return;

  if (confirm(`Are you sure you want to delete the product: "${p.title}"?`)) {
    productsList = productsList.filter(item => item.id !== id);
    saveDatabase();
    loadAndDisplay();
  }
};

// 7. RESET DATA TO DEFAULTS
const resetDefaultsBtn = document.getElementById("reset-defaults-btn");
resetDefaultsBtn.addEventListener("click", () => {
  if (confirm("This will erase all changes you have made and restore the default bakery product list. Are you sure?")) {
    localStorage.removeItem("sweet_bites_products");
    loadAndDisplay();
  }
});

// 8. SETTINGS MANAGEMENT
const settingsForm = document.getElementById("settings-form");
const DEFAULT_SETTINGS = {
  whatsappPhone: "923217337801",
  instagramUrl: "https://www.instagram.com/sweetbitesarifwala?igsh=MTB1Nnd1OHJrcnBjcA==",
  facebookUrl: "https://www.facebook.com/share/18uBoeR6QQ/",
  facebookProfileUrl: "https://www.facebook.com/share/1BaDZs7Lps/",
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
  // Ensure facebookProfileUrl is present in old settings
  if (!settings.facebookProfileUrl) {
    settings.facebookProfileUrl = DEFAULT_SETTINGS.facebookProfileUrl;
    localStorage.setItem("sweet_bites_settings", JSON.stringify(settings));
  }
  return settings;
}

function displaySettings() {
  const settings = loadSettings();
  const settingsWa = document.getElementById("settings-whatsapp");
  const settingsInsta = document.getElementById("settings-instagram");
  const settingsFb = document.getElementById("settings-facebook");
  const settingsFbProfile = document.getElementById("settings-facebook-profile");
  const settingsTiktok = document.getElementById("settings-tiktok");

  if (settingsWa) settingsWa.value = settings.whatsappPhone;
  if (settingsInsta) settingsInsta.value = settings.instagramUrl || "";
  if (settingsFb) settingsFb.value = settings.facebookUrl || "";
  if (settingsFbProfile) settingsFbProfile.value = settings.facebookProfileUrl || "";
  if (settingsTiktok) settingsTiktok.value = settings.tiktokUrl || "";
}

if (settingsForm) {
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let rawPhone = document.getElementById("settings-whatsapp").value.trim();
    // Clean phone number: remove +, spaces, dashes, brackets, etc.
    let cleanPhone = rawPhone.replace(/[^0-9]/g, "");
    
    // Auto-convert Pakistani phone format: 03xxxxxxxxx -> 923xxxxxxxxx
    if (cleanPhone.startsWith("03") && cleanPhone.length === 11) {
      cleanPhone = "92" + cleanPhone.substring(1);
    }
    
    // Fallback if empty
    if (!cleanPhone) {
      alert("Please enter a valid phone number!");
      return;
    }
    
    const updatedSettings = {
      whatsappPhone: cleanPhone,
      instagramUrl: document.getElementById("settings-instagram").value.trim(),
      facebookUrl: document.getElementById("settings-facebook").value.trim(),
      facebookProfileUrl: document.getElementById("settings-facebook-profile").value.trim(),
      tiktokUrl: document.getElementById("settings-tiktok").value.trim()
    };
    localStorage.setItem("sweet_bites_settings", JSON.stringify(updatedSettings));
    alert("Settings & Social links saved successfully!");
    
    // Reload fields to display cleaned value
    displaySettings();
  });
}

// Run session check on load
checkSession();
