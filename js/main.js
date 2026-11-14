/* =========================================================
   CHICKATANA – Site interactions
   - Mobile nav toggle
   - Active link on scroll
   - Product filter
   - Order list (saved in localStorage) → send via SMS / Email
   - Contact form → mailto
   ========================================================= */

const BUSINESS_EMAIL = "chickatana@gmail.com";
const BUSINESS_SMS = "09151500548";
const STORAGE_KEY = "chickatana-order";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Year ---------- */
$("#year").textContent = new Date().getFullYear();

/* ---------- Mobile nav ---------- */
const navLinks = $("#navLinks");
$("#menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
$$("#navLinks a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* ---------- Active link on scroll ---------- */
const sections = $$("section[id]");
const linkObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    $$("#navLinks a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
    );
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => linkObserver.observe(s));

/* ---------- Reveal on scroll ---------- */
const revealEls = $$(".menu-card, .product-card, .stat, .feature, .section-head");
revealEls.forEach(el => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Product filter ---------- */
$$(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    $$(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    $$(".product-card").forEach(card =>
      card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f)
    );
  });
});

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
}

/* ---------- Order list ---------- */
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  renderCart();
}

function addItem(name) {
  const found = cart.find(i => i.name === name);
  found ? found.qty++ : cart.push({ name, qty: 1 });
  saveCart();
  toast(`Added: ${name}`);
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

function renderCart() {
  const list = $("#cartItems");
  list.innerHTML = "";
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <span class="qty">
        <button aria-label="Decrease">−</button>
        <strong>${item.qty}</strong>
        <button aria-label="Increase">+</button>
      </span>`;
    const [minus, plus] = li.querySelectorAll("button");
    minus.addEventListener("click", () => changeQty(i, -1));
    plus.addEventListener("click", () => changeQty(i, 1));
    list.appendChild(li);
  });
  $("#cartCount").textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  $("#cartEmpty").style.display = cart.length ? "none" : "block";
}

$$(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    let name = btn.dataset.item;
    if (btn.dataset.sauce) name += ` – ${$(btn.dataset.sauce).value} sauce`;
    addItem(name);
  });
});

/* Drawer open / close */
const drawer = $("#cartDrawer");
const overlay = $("#overlay");
const openCart = () => { drawer.classList.add("open"); overlay.classList.add("show"); };
const closeCart = () => { drawer.classList.remove("open"); overlay.classList.remove("show"); };
$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", e => e.key === "Escape" && closeCart());

$("#clearCart").addEventListener("click", () => { cart = []; saveCart(); });

/* Build order message */
function orderMessage() {
  const name = $("#oName").value.trim() || "(no name)";
  const address = $("#oAddress").value.trim() || "(not provided)";
  const lines = cart.map(i => `- ${i.qty} x ${i.name}`).join("\n");
  return `Hi CHICKATANA! I'd like to order:\n${lines}\n\nName: ${name}\nAddress: ${address}`;
}

function guardEmpty() {
  if (!cart.length) { toast("Your order is empty"); return true; }
  return false;
}

$("#sendSms").addEventListener("click", () => {
  if (guardEmpty()) return;
  // "?&body=" works on both iOS and Android
  window.location.href = `sms:${BUSINESS_SMS}?&body=${encodeURIComponent(orderMessage())}`;
});

$("#sendEmail").addEventListener("click", () => {
  if (guardEmpty()) return;
  window.location.href =
    `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent("New Order – Chickatana Website")}` +
    `&body=${encodeURIComponent(orderMessage())}`;
});

/* ---------- Contact form ---------- */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const body = `Name: ${$("#cName").value}\nMobile: ${$("#cPhone").value}\n\n${$("#cMsg").value}`;
  window.location.href =
    `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent("Website Inquiry – Chickatana")}` +
    `&body=${encodeURIComponent(body)}`;
});

renderCart();
