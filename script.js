const products = [
  // Smartphone catalogue — sample prices only; confirm model, storage and stock before purchase.
  {id:1,name:"Samsung Galaxy A05",category:"Phones",price:8999,description:"Everyday Samsung smartphone. Ask about storage and color options.",emoji:"📱",bg:"#e7edff",tag:"Samsung"},
  {id:2,name:"Samsung Galaxy A13",category:"Phones",price:10999,description:"Galaxy A-series phone for everyday calls, apps and photos.",emoji:"📱",bg:"#e8f5f2",tag:"Samsung"},
  {id:3,name:"Samsung Galaxy A14",category:"Phones",price:12499,description:"A versatile Galaxy phone for daily use.",emoji:"📱",bg:"#fff0e7",tag:"Samsung"},
  {id:4,name:"Samsung Galaxy A15",category:"Phones",price:14999,description:"A modern Galaxy phone for work and entertainment.",emoji:"📱",bg:"#f2eaff",tag:"Popular"},
  {id:5,name:"Samsung Galaxy A16",category:"Phones",price:16999,description:"A Galaxy option for everyday tasks. Confirm configuration.",emoji:"📲",bg:"#fff1f5",tag:"Samsung"},
  {id:6,name:"Samsung Galaxy A17",category:"Phones",price:18999,description:"Ask Yite about availability and exact specifications.",emoji:"📲",bg:"#eaf5ff",tag:"Check availability"},
  // Laptop range
  {id:7,name:"HP Laptop",category:"Computers",price:42999,description:"HP laptops for school, office and home. Model varies by stock.",emoji:"💻",bg:"#e8f5f2",tag:"HP"},
  {id:8,name:"Toshiba Laptop",category:"Computers",price:38999,description:"Browse available Toshiba models and specifications.",emoji:"💻",bg:"#e7edff",tag:"Toshiba"},
  {id:9,name:"Laptop Mouse",category:"Computers",price:799,description:"Wired or wireless mouse options for compatible laptops.",emoji:"🖱️",bg:"#eaf5ff",tag:"Accessory"},
  {id:10,name:"Laptop Keyboard",category:"Computers",price:1499,description:"External keyboard options for home, school or office.",emoji:"⌨️",bg:"#f2eaff",tag:"Accessory"},
  {id:11,name:"Laptop Bag",category:"Computers",price:1999,description:"Carry and protect your laptop while travelling.",emoji:"💼",bg:"#fff0e7",tag:"Everyday"},
  {id:12,name:"USB Flash Drive",category:"Computers",price:499,description:"Portable storage; available capacity may vary.",emoji:"💾",bg:"#fff7df",tag:"Storage"},
  // Chargers, cables and everyday electronics
  {id:13,name:"Phone Charger Adapter",category:"Accessories",price:899,description:"Charging adapters for compatible devices. Confirm wattage and connector.",emoji:"🔌",bg:"#fff7df",tag:"Everyday"},
  {id:14,name:"USB Charging Cable",category:"Accessories",price:299,description:"USB cable for charging and data transfer.",emoji:"〰️",bg:"#fff0e7",tag:"Essential"},
  {id:15,name:"USB-C Cable",category:"Accessories",price:399,description:"USB-C cable; check device and charging compatibility.",emoji:"🔗",bg:"#f2eaff",tag:"Popular"},
  {id:16,name:"Power Bank",category:"Accessories",price:1999,description:"Portable power for compatible devices. Capacity varies by model.",emoji:"🔋",bg:"#e9eaff",tag:"Travel"},
  {id:17,name:"Phone Case",category:"Accessories",price:299,description:"Protective cases for selected phone models.",emoji:"📱",bg:"#eaf5ff",tag:"Protection"},
  {id:18,name:"Screen Protector",category:"Accessories",price:199,description:"Screen protection; choose the correct phone model.",emoji:"🛡️",bg:"#e8f5f2",tag:"Protection"},
  {id:19,name:"HDMI Cable",category:"Accessories",price:499,description:"Connect compatible laptops, monitors and TVs.",emoji:"🔌",bg:"#fff0e7",tag:"Connectivity"},
  {id:20,name:"Memory Card",category:"Accessories",price:599,description:"Portable storage for compatible phones and devices.",emoji:"💾",bg:"#f2eaff",tag:"Storage"},
  {id:21,name:"Universal Power Adapter",category:"Accessories",price:1299,description:"Adapter options for compatible electronics. Confirm device requirements.",emoji:"🔋",bg:"#fff7df",tag:"Essentials"},
  // Audio
  {id:22,name:"Wired Earphones",category:"Audio",price:399,description:"Everyday wired listening; connector type may vary.",emoji:"🎧",bg:"#fff1f5",tag:"Audio"},
  {id:23,name:"Bluetooth Earbuds",category:"Audio",price:1799,description:"Wireless listening for compatible devices.",emoji:"🎧",bg:"#e7edff",tag:"Wireless"},
  {id:24,name:"Bluetooth Speaker",category:"Audio",price:3299,description:"Portable speaker options for music on the go.",emoji:"🔊",bg:"#fff1f5",tag:"Audio"},
  // More electronics categories; all displayed prices are illustrative estimates.
  {id:25,name:"Android Tablet",category:"Tablets",price:12999,description:"Tablet options for reading, study, video and everyday apps.",emoji:"📟",bg:"#e7edff",tag:"Tablet"},
  {id:26,name:"Tablet Case",category:"Tablets",price:899,description:"Protective cases for selected tablet sizes.",emoji:"🛡️",bg:"#e8f5f2",tag:"Protection"},
  {id:27,name:"Smart TV",category:"TV & Home",price:24999,description:"Ask about available screen sizes, brands and smart features.",emoji:"📺",bg:"#e7edff",tag:"TV"},
  {id:28,name:"TV Wall Mount",category:"TV & Home",price:1499,description:"Mounting options; check TV size and weight compatibility.",emoji:"🖼️",bg:"#fff0e7",tag:"Home"},
  {id:29,name:"Electric Kettle",category:"TV & Home",price:1799,description:"Everyday kitchen appliance. Confirm available model and capacity.",emoji:"🫖",bg:"#fff7df",tag:"Appliance"},
  {id:30,name:"Extension Power Strip",category:"TV & Home",price:999,description:"Multi-outlet power strip for compatible household electronics.",emoji:"🔌",bg:"#e8f5f2",tag:"Home"},
  {id:31,name:"Game Controller",category:"Gaming",price:2499,description:"Controller options; confirm console and device compatibility.",emoji:"🎮",bg:"#f2eaff",tag:"Gaming"},
  {id:32,name:"Gaming Headset",category:"Gaming",price:2299,description:"Headset options for gaming and online calls.",emoji:"🎧",bg:"#fff1f5",tag:"Gaming"},
  {id:33,name:"Wireless Router",category:"Networking",price:1999,description:"Wi-Fi router options; coverage and speed depend on model.",emoji:"📡",bg:"#eaf5ff",tag:"Wi-Fi"},
  {id:34,name:"Ethernet Cable",category:"Networking",price:299,description:"Wired network cable in selected lengths.",emoji:"🔗",bg:"#fff7df",tag:"Networking"},
  {id:35,name:"USB Wi-Fi Adapter",category:"Networking",price:799,description:"Wireless network adapter for compatible computers.",emoji:"📶",bg:"#e8f5f2",tag:"Connectivity"},
  {id:36,name:"Computer Monitor",category:"Office & Cameras",price:10999,description:"Monitor options for office, study and home setups.",emoji:"🖥️",bg:"#e7edff",tag:"Office"},
  {id:37,name:"Printer",category:"Office & Cameras",price:8999,description:"Ask about inkjet or laser printer availability and supplies.",emoji:"🖨️",bg:"#fff0e7",tag:"Office"},
  {id:38,name:"Webcam",category:"Office & Cameras",price:1499,description:"USB webcam options for meetings and online learning.",emoji:"📷",bg:"#f2eaff",tag:"Office"},
  {id:39,name:"Digital Camera",category:"Office & Cameras",price:18999,description:"Ask about camera models, lens options and stock.",emoji:"📸",bg:"#fff1f5",tag:"Camera"},
  {id:40,name:"Smart Watch",category:"Wearables",price:2499,description:"Smart watch options; features vary by model and phone compatibility.",emoji:"⌚",bg:"#e7edff",tag:"Wearable"},
  {id:41,name:"Fitness Band",category:"Wearables",price:1499,description:"Activity band options; confirm supported features before purchase.",emoji:"⌚",bg:"#e8f5f2",tag:"Wearable"},
  {id:42,name:"Car Phone Holder",category:"Accessories",price:499,description:"Phone holder options for compatible vehicle interiors.",emoji:"🚗",bg:"#fff7df",tag:"Accessory"},
  {id:43,name:"Laptop Cooling Pad",category:"Computers",price:1299,description:"Cooling pad options for supported laptop sizes.",emoji:"💻",bg:"#eaf5ff",tag:"Computer"},
  {id:44,name:"External SSD Drive",category:"Computers",price:3999,description:"Portable storage; confirm capacity and connection type.",emoji:"💾",bg:"#f2eaff",tag:"Storage"},
  {id:45,name:"Microphone",category:"Audio",price:1799,description:"Microphone options for calls, recording and content creation.",emoji:"🎙️",bg:"#fff1f5",tag:"Audio"},
  {id:46,name:"Surge Protector",category:"TV & Home",price:1199,description:"Protection accessories; confirm ratings and local requirements.",emoji:"⚡",bg:"#fff7df",tag:"Power"}
];

const CART_STORAGE_KEY = "yite-electronics-cart-v1";

function loadSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return Object.fromEntries(Object.entries(saved).filter(([id, quantity]) =>
      products.some(product => product.id === Number(id)) &&
      Number.isSafeInteger(quantity) && quantity > 0 && quantity <= 99
    ));
  } catch {
    return {};
  }
}

const state = {category:"All", search:"", cart:loadSavedCart()};

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  } catch {
    // The cart still works for this page session if storage is unavailable.
  }
}
const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");
let toastTimer;

function money(amount) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency", currency: "ETB", maximumFractionDigits: 0
  }).format(amount).replace("ETB", "ETB");
}

function renderProducts() {
  const filtered = products.filter(product => {
    const matchesCategory = state.category === "All" || product.category === state.category;
    const searchable = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesCategory && searchable.includes(state.search.toLowerCase().trim());
  });

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-visual" style="background:${product.bg}">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
        <span class="emoji" aria-hidden="true">${product.emoji}</span>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${money(product.price)}</span>
          <button class="add-button" data-add="${product.id}" aria-label="Add ${product.name} to cart" title="Add to cart">+</button>
        </div>
      </div>
    </article>`).join("");
  emptyState.hidden = filtered.length !== 0;
}

function cartQuantity() {
  return Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0);
}

function renderCart() {
  const entries = Object.entries(state.cart).filter(([, quantity]) => quantity > 0);
  cartCount.textContent = cartQuantity();
  saveCart();
  if (entries.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty"><span>🛒</span><strong>Your cart is empty</strong><p>Add a product to get started.</p></div>';
  } else {
    cartItems.innerHTML = entries.map(([id, quantity]) => {
      const product = products.find(item => item.id === Number(id));
      if (!product) return "";
      return `<div class="cart-item">
        <div class="cart-item-emoji" style="background:${product.bg}">${product.emoji}</div>
        <div><h3>${product.name}</h3><span class="cart-item-price">${money(product.price)} each</span>
          <div class="quantity-controls">
            <button data-quantity="${product.id}" data-change="-1" aria-label="Decrease ${product.name} quantity">−</button>
            <span>${quantity}</span>
            <button data-quantity="${product.id}" data-change="1" aria-label="Increase ${product.name} quantity">+</button>
          </div>
        </div>
        <button class="remove-item" data-remove="${product.id}" aria-label="Remove ${product.name}">✕</button>
      </div>`;
    }).join("");
  }
  const total = entries.reduce((sum, [id, quantity]) => {
    const product = products.find(item => item.id === Number(id));
    return sum + (product ? product.price * quantity : 0);
  }, 0);
  cartTotal.textContent = money(total);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function openCart() {
  cartOverlay.hidden = false;
  document.body.classList.add("cart-open");
  document.getElementById("closeCart").focus();
}
function closeCart() {
  cartOverlay.hidden = true;
  document.body.classList.remove("cart-open");
  document.getElementById("cartButton").focus();
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = Number(button.dataset.add);
  if (!products.some(product => product.id === id)) return;
  if ((state.cart[id] || 0) >= 99) {
    showToast("Maximum quantity per product is 99");
    return;
  }
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
  const product = products.find(item => item.id === id);
  showToast(`${product.name} added to your cart`);
});

document.getElementById("categoryFilters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  document.querySelectorAll(".category-pill").forEach(pill => {
    const active = pill === button;
    pill.classList.toggle("active", active);
    pill.setAttribute("aria-pressed", String(active));
  });
  renderProducts();
});

searchInput.addEventListener("input", event => {
  state.search = event.target.value;
  renderProducts();
});

// Quick-search shortcut: Ctrl/Cmd + K focuses the product search field.
document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("closeCartBackdrop").addEventListener("click", closeCart);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !cartOverlay.hidden) closeCart();
});

// Keep category state accessible even before the first interaction.
document.querySelectorAll(".category-pill").forEach(pill => {
  pill.setAttribute("aria-pressed", String(pill.dataset.category === state.category));
});

cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) {
    const id = Number(quantityButton.dataset.quantity);
    const nextQuantity = (state.cart[id] || 0) + Number(quantityButton.dataset.change);
    if (nextQuantity <= 0) delete state.cart[id];
    else if (nextQuantity > 99) {
      showToast("Maximum quantity per product is 99");
      return;
    } else state.cart[id] = nextQuantity;
    renderCart();
  }
  if (removeButton) {
    delete state.cart[Number(removeButton.dataset.remove)];
    renderCart();
    showToast("Product removed from cart");
  }
});

document.getElementById("clearCart").addEventListener("click", () => {
  state.cart = {};
  renderCart();
  showToast("Cart cleared");
});

const deliveryOverlay = document.getElementById("deliveryOverlay");
const deliveryForm = document.getElementById("deliveryForm");
const deliveryTotal = document.getElementById("deliveryTotal");
function openDeliveryForm() {
  if (cartQuantity() === 0) {
    showToast("Your cart is empty. Add a product first.");
    return;
  }
  const subtotal = Object.entries(state.cart).reduce((sum, [id, qty]) => {
    const product = products.find(item => item.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);
  deliveryTotal.textContent = money(subtotal);
  deliveryOverlay.hidden = false;
  document.body.classList.add("cart-open");
  deliveryForm.elements.customerName.focus();
}
function closeDeliveryForm() {
  deliveryOverlay.hidden = true;
  if (cartOverlay.hidden) document.body.classList.remove("cart-open");
  document.getElementById("checkoutButton").focus();
}
document.getElementById("checkoutButton").addEventListener("click", openDeliveryForm);
document.getElementById("closeDelivery").addEventListener("click", closeDeliveryForm);
document.getElementById("closeDeliveryBackdrop").addEventListener("click", closeDeliveryForm);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !deliveryOverlay.hidden) closeDeliveryForm();
});
deliveryForm.addEventListener("submit", event => {
  event.preventDefault();
  if (cartQuantity() === 0) {
    closeDeliveryForm();
    showToast("Your cart is empty. Add a product first.");
    return;
  }
  const form = event.currentTarget;
  const value = name => String(form.elements[name].value || "").trim();
  const orderLines = Object.entries(state.cart).map(([id, qty]) => {
    const product = products.find(item => item.id === Number(id));
    return product ? `- ${product.name} x${qty}: ${money(product.price * qty)}` : "";
  }).filter(Boolean);
  const subtotal = Object.entries(state.cart).reduce((sum, [id, qty]) => {
    const product = products.find(item => item.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);
  const message = [
    "Hello Yite Electronics! I would like to request a home-delivery order.", "",
    "CUSTOMER DETAILS", `Name: ${value("customerName")}`, `Phone: ${value("customerPhone")}`,
    `Delivery address: ${value("deliveryAddress")}`, `City/area: ${value("deliveryCity")}`,
    `Payment preference: ${value("paymentMethod")}`,
    value("deliveryNotes") ? `Extra instructions: ${value("deliveryNotes")}` : "",
    "", "ORDER ITEMS", ...orderLines, "", `Estimated subtotal: ${money(subtotal)}`,
    "Please confirm stock, final prices, delivery fee and delivery time before I pay."
  ].filter(line => line !== undefined).join("\n");
  // Opens a prepared message; the customer reviews and sends it themselves.
  const whatsappUrl = `https://wa.me/251937571832?text=${encodeURIComponent(message)}`;
  const popup = window.open(whatsappUrl, "_blank");
  if (!popup) {
    document.getElementById("deliveryMessage").textContent = "Your browser blocked the WhatsApp window. Please allow pop-ups, or copy the order details and contact the store by phone.";
    return;
  }
  document.getElementById("deliveryMessage").textContent = "WhatsApp opened with your order details. Review and send the message to request delivery.";
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  document.getElementById("formMessage").textContent =
    `Thank you, ${name}! This demo form does not send messages to a real inbox.`;
  form.reset();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}));

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
