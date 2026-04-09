/* ── Starfield ── */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function initStars() {
  stars = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
    speed: Math.random() * 0.004 + 0.001,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isLight = document.body.classList.contains("light");
  stars.forEach((s) => {
    s.a = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    // In light mode render soft blue-grey dots instead of white
    ctx.fillStyle = isLight
      ? `rgba(90,120,200,${s.a * 0.35})`
      : `rgba(200,215,255,${s.a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resize();
initStars();
requestAnimationFrame(drawStars);
window.addEventListener("resize", () => {
  resize();
  initStars();
});

/* ── Theme toggle ── */
function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark",
  );
}

// Restore saved theme on load
(function () {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
})();

/* ── Navigation ── */
function nav(from, to) {
  document.getElementById(from).classList.add("hidden");
  const target = document.getElementById(to);
  target.classList.remove("hidden");
  target.scrollTop = 0;
}

/* ── Hub destination data ── */
const hubData = {
  "central-taxi": {
    title: "Central Taxi Rank",
    subtitle: "Local & regional destinations",
    destinations: [
      { city: "Botshabelo", province: "Free State" },
      { city: "Thaba Nchu", province: "Free State" },
      { city: "Bainsvlei", province: "Free State" },
      { city: "Brandfort", province: "Free State" },
      { city: "Winburg", province: "Free State" },
      { city: "Sannaspos", province: "Free State" },
      { city: "Dewetsdorp", province: "Free State" },
      { city: "Wepener", province: "Free State" },
    ],
  },
  "mangaung-taxi": {
    title: "Mangaung Taxi Rank",
    subtitle: "Township & surrounding routes",
    destinations: [
      { city: "Rocklands", province: "Bloemfontein" },
      { city: "Phahameng", province: "Bloemfontein" },
      { city: "Bochabela", province: "Bloemfontein" },
      { city: "Batho", province: "Bloemfontein" },
      { city: "Heidedal", province: "Bloemfontein" },
      { city: "Botshabelo", province: "Free State" },
      { city: "Thaba Nchu", province: "Free State" },
      { city: "Dewetsdorp", province: "Free State" },
    ],
  },
  "airport-taxi": {
    title: "Bram Fischer Airport Rank",
    subtitle: "Airport transfers & city routes",
    destinations: [
      { city: "Bloemfontein CBD", province: "City Centre" },
      { city: "Westdene", province: "Bloemfontein" },
      { city: "Universitas", province: "Bloemfontein" },
      { city: "Langenhovenpark", province: "Bloemfontein" },
      { city: "Dan Pienaar", province: "Bloemfontein" },
      { city: "Wilgehof", province: "Bloemfontein" },
    ],
  },
  "langenhoven-taxi": {
    title: "Langenhovenpark Taxi Rank",
    subtitle: "City centre route",
    destinations: [{ city: "Bloemfontein Central", province: "City Centre" }],
  },
  "park-road": {
    title: "Park Road Bus Terminal",
    subtitle: "Regional & intercity routes",
    destinations: [
      { city: "Johannesburg", province: "Gauteng" },
      { city: "Pretoria", province: "Gauteng" },
      { city: "Cape Town", province: "Western Cape" },
      { city: "Durban", province: "KwaZulu-Natal" },
      { city: "Port Elizabeth", province: "Eastern Cape" },
      { city: "East London", province: "Eastern Cape" },
      { city: "Kimberley", province: "Northern Cape" },
      { city: "Welkom", province: "Free State" },
      { city: "Kroonstad", province: "Free State" },
      { city: "Harrismith", province: "Free State" },
    ],
  },
  greyhound: {
    title: "Greyhound Bloemfontein",
    subtitle: "Major cities across South Africa",
    destinations: [
      { city: "Johannesburg", province: "Gauteng" },
      { city: "Pretoria", province: "Gauteng" },
      { city: "Cape Town", province: "Western Cape" },
      { city: "Durban", province: "KwaZulu-Natal" },
      { city: "Port Elizabeth", province: "Eastern Cape" },
      { city: "East London", province: "Eastern Cape" },
      { city: "Kimberley", province: "Northern Cape" },
      { city: "George", province: "Western Cape" },
      { city: "Polokwane", province: "Limpopo" },
      { city: "Nelspruit", province: "Mpumalanga" },
      { city: "Pietermaritzburg", province: "KwaZulu-Natal" },
      { city: "Upington", province: "Northern Cape" },
    ],
  },
  translux: {
    title: "Translux Terminal",
    subtitle: "Intercity coach destinations",
    destinations: [
      { city: "Johannesburg", province: "Gauteng" },
      { city: "Pretoria", province: "Gauteng" },
      { city: "Cape Town", province: "Western Cape" },
      { city: "Durban", province: "KwaZulu-Natal" },
      { city: "Port Elizabeth", province: "Eastern Cape" },
      { city: "Mthatha", province: "Eastern Cape" },
      { city: "Queenstown", province: "Eastern Cape" },
      { city: "Kimberley", province: "Northern Cape" },
      { city: "Welkom", province: "Free State" },
      { city: "Bethlehem", province: "Free State" },
      { city: "Pietermaritzburg", province: "KwaZulu-Natal" },
      { city: "Richards Bay", province: "KwaZulu-Natal" },
    ],
  },
  "hoffman-square": {
    title: "Hoffman Square",
    subtitle: "Bloemfontein suburbs served",
    destinations: [
      { city: "Westdene", province: "Suburb" },
      { city: "Universitas", province: "Suburb" },
      { city: "Langenhovenpark", province: "Suburb" },
      { city: "Dan Pienaar", province: "Suburb" },
      { city: "Wilgehof", province: "Suburb" },
      { city: "Brandwag", province: "Suburb" },
      { city: "Fichardt Park", province: "Suburb" },
      { city: "Pellissier", province: "Suburb" },
      { city: "Bayswater", province: "Suburb" },
      { city: "Woodland Hills", province: "Suburb" },
      { city: "Pentagon Park", province: "Suburb" },
      { city: "Fauna", province: "Suburb" },
      { city: "Arboretum", province: "Suburb" },
      { city: "Ehrlich Park", province: "Suburb" },
      { city: "Lourier Park", province: "Suburb" },
      { city: "Heuwelsig", province: "Suburb" },
      { city: "Gardenia Park", province: "Suburb" },
      { city: "Uitsig", province: "Suburb" },
      { city: "Roodewal", province: "Suburb" },
      { city: "Hilton", province: "Suburb" },
      { city: "Hospitaalpark", province: "Suburb" },
      { city: "Fleurdal", province: "Suburb" },
    ],
  },
};

/* ── Modal ── */
function openModal(hubId) {
  const data = hubData[hubId];
  if (!data) return;
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalSubtitle").textContent = data.subtitle;
  document.getElementById("modalDestinations").innerHTML = data.destinations
    .map(
      (d) => `
    <div class="dest-item">
      <div class="dest-city">${d.city}</div>
      <div class="dest-province">${d.province}</div>
    </div>
  `,
    )
    .join("");
  document.getElementById("modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("modal")) closeModal();
}

/* ── Admin auth state ── */
let adminLoggedIn = false;

function handleAdminBtnClick() {
  if (adminLoggedIn) {
    openAdminSessionModal();
  } else {
    openAdminLoginModal();
  }
}

/* ── Admin login modal ── */
function openAdminLoginModal() {
  document.getElementById("adminLoginModal").classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginError").textContent = "";
  setTimeout(() => document.getElementById("loginUsername").focus(), 300);
}

function closeAdminLoginModal() {
  document.getElementById("adminLoginModal").classList.remove("open");
  document.body.style.overflow = "";
}

function handleLoginOverlayClick(e) {
  if (e.target === document.getElementById("adminLoginModal"))
    closeAdminLoginModal();
}

function submitAdminLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errEl = document.getElementById("loginError");

  if (username === "admin" && password === "admin") {
    adminLoggedIn = true;
    closeAdminLoginModal();
    // Update admin button to show logged-in state
    document.getElementById("adminBtn").classList.add("logged-in");
    // Reveal all delete buttons
    document
      .querySelectorAll(".delete-hub-btn")
      .forEach((b) => (b.style.display = ""));
    showToast("Admin access granted");
  } else {
    errEl.textContent = "Incorrect username or password.";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginPassword").focus();
  }
}

/* ── Admin session modal (shown when already logged in) ── */
function openAdminSessionModal() {
  document.getElementById("adminSessionModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeAdminSessionModal() {
  document.getElementById("adminSessionModal").classList.remove("open");
  document.body.style.overflow = "";
}

function handleSessionOverlayClick(e) {
  if (e.target === document.getElementById("adminSessionModal"))
    closeAdminSessionModal();
}

function adminLogout() {
  adminLoggedIn = false;
  document.getElementById("adminBtn").classList.remove("logged-in");
  closeAdminSessionModal();
  // Hide all delete buttons
  document
    .querySelectorAll(".delete-hub-btn")
    .forEach((b) => (b.style.display = "none"));
  // Cancel any pending confirm states
  document
    .querySelectorAll(".hub-card.confirm-delete")
    .forEach((c) => cancelDelete(c));
  showToast("Logged out of admin");
}

/* ── Admin modal ── */
let adminTab = "taxi"; // current tab

function openAdminModal() {
  if (!adminLoggedIn) {
    openAdminLoginModal();
    return;
  }
  document.getElementById("adminModal").classList.add("open");
  document.body.style.overflow = "hidden";
  switchAdminTab("taxi");
  clearAdminForm();
}

function closeAdminModal() {
  document.getElementById("adminModal").classList.remove("open");
  document.body.style.overflow = "";
}

function handleAdminOverlayClick(e) {
  if (e.target === document.getElementById("adminModal")) closeAdminModal();
}

function switchAdminTab(tab) {
  adminTab = tab;
  document.getElementById("tabTaxi").classList.toggle("active", tab === "taxi");
  document.getElementById("tabBus").classList.toggle("active", tab === "bus");
  document.getElementById("adminModalSubtitle").textContent =
    tab === "taxi" ? "Adding to Taxi Hubs" : "Adding to Bus Hubs";
  // Show/hide Official Site field (only for bus)
  document.getElementById("adminSiteField").style.display =
    tab === "bus" ? "flex" : "none";
}

function clearAdminForm() {
  [
    "adminName",
    "adminBadge",
    "adminMap",
    "adminPrice",
    "adminSite",
    "adminDests",
  ].forEach((id) => {
    document.getElementById(id).value = "";
  });
  document.getElementById("adminError").textContent = "";
}

function submitNewHub() {
  const name = document.getElementById("adminName").value.trim();
  const badge = document.getElementById("adminBadge").value.trim();
  const mapUrl = document.getElementById("adminMap").value.trim();
  const price = document.getElementById("adminPrice").value.trim();
  const site = document.getElementById("adminSite").value.trim();
  const destsRaw = document.getElementById("adminDests").value.trim();
  const errEl = document.getElementById("adminError");

  if (!name) {
    errEl.textContent = "Hub name is required.";
    return;
  }
  if (!mapUrl) {
    errEl.textContent = "Google Maps link is required.";
    return;
  }
  if (!price) {
    errEl.textContent = "Estimated fair price is required.";
    return;
  }
  errEl.textContent = "";

  // Build a unique ID
  const id =
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") +
    "-" +
    Date.now();

  // Parse destinations
  const destinations = destsRaw
    ? destsRaw
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((c) => ({ city: c, province: "" }))
    : [];

  // Register in hubData
  hubData[id] = {
    title: name,
    subtitle: adminTab === "taxi" ? "Taxi destinations" : "Bus destinations",
    destinations,
  };

  // Build the card HTML
  const siteRow =
    adminTab === "bus" && site
      ? `
    <div class="info-row">
      <span class="info-row-label">Official Site</span>
      <span class="info-row-value">
        <a href="${escHtml(site)}" target="_blank">
          ${escHtml(new URL(site).hostname)}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </span>
    </div>`
      : "";

  const cardHtml = `
    <div class="hub-card" style="animation:fadeUp .4s ease both;">
      <div class="hub-name">${escHtml(name)} <span class="hub-badge">${escHtml(badge || "New")}</span></div>
      <div class="info-row">
        <span class="info-row-label">Hub Name</span>
        <span class="info-row-value">${escHtml(name)}</span>
      </div>
      <div class="info-row">
        <span class="info-row-label">Location</span>
        <span class="info-row-value">
          <a href="${escHtml(mapUrl)}" target="_blank">
            View on Google Maps
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </span>
      </div>
      <div class="info-row">
        <span class="info-row-label">Est. Fair Price</span>
        <span class="info-row-value"><span class="fare-badge">${escHtml(price)}</span></span>
      </div>
      ${siteRow}
      <div class="see-more-row">
        <button class="see-more-btn" onclick="openModal('${id}')">
          See more details
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <button class="delete-hub-btn" onclick="confirmDeleteHub(this, '${id}')" title="Delete hub">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    </div>`;

  // Inject into the right page
  const container =
    adminTab === "taxi"
      ? document.querySelector("#page4taxi .inner")
      : document.querySelector("#page4bus .inner");
  container.insertAdjacentHTML("beforeend", cardHtml);

  // Make delete button on new card visible (admin is logged in)
  const newCard = container.lastElementChild;
  const newDeleteBtn = newCard.querySelector(".delete-hub-btn");
  if (newDeleteBtn) newDeleteBtn.style.display = "";

  closeAdminModal();
  showToast(`"${name}" added to ${adminTab === "taxi" ? "Taxi" : "Bus"} Hubs!`);

  // Navigate to the relevant page so the user sees the new hub
  nav(currentPage(), adminTab === "taxi" ? "page4taxi" : "page4bus");
}

/* ── Delete Hub ── */
function confirmDeleteHub(btn, hubId) {
  if (!adminLoggedIn) {
    openAdminLoginModal();
    return;
  }
  const card = btn.closest(".hub-card");
  // If already in confirm state, cancel it
  if (card.classList.contains("confirm-delete")) {
    cancelDelete(card);
    return;
  }
  // Enter confirm state
  card.classList.add("confirm-delete");

  // Swap the delete button to a confirm+cancel pair
  const row = btn.closest(".see-more-row");
  btn.style.display = "none";

  const confirmHtml = `
    <div class="delete-confirm-btns" id="confirm-${CSS.escape(hubId)}">
      <button class="delete-confirm-yes" onclick="deleteHub('${hubId}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Yes, remove
      </button>
      <button class="delete-confirm-no" onclick="cancelDelete(this.closest('.hub-card'))">
        Cancel
      </button>
    </div>`;
  row.insertAdjacentHTML("beforeend", confirmHtml);
}

function cancelDelete(card) {
  card.classList.remove("confirm-delete");
  const confirmBtns = card.querySelector(".delete-confirm-btns");
  if (confirmBtns) confirmBtns.remove();
  const deleteBtn = card.querySelector(".delete-hub-btn");
  if (deleteBtn) deleteBtn.style.display = "";
}

function deleteHub(hubId) {
  // Find the card — it contains a button with onclick matching this hubId
  const btn = document.querySelector(`.delete-hub-btn[onclick*="${hubId}"]`);
  const card = btn ? btn.closest(".hub-card") : null;
  if (!card) return;

  const hubName =
    card.querySelector(".hub-name")?.firstChild?.textContent?.trim() || "Hub";

  // Animate out
  card.style.transition =
    "opacity .3s ease, transform .3s ease, max-height .4s ease, margin .3s ease, padding .3s ease";
  card.style.opacity = "0";
  card.style.transform = "translateX(18px) scale(.97)";
  card.style.maxHeight = card.offsetHeight + "px";
  card.style.overflow = "hidden";

  setTimeout(() => {
    card.style.maxHeight = "0";
    card.style.marginBottom = "0";
    card.style.padding = "0";
  }, 280);

  setTimeout(() => {
    card.remove();
    delete hubData[hubId];
  }, 680);

  showToast(`"${hubName}" removed`);
}

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function currentPage() {
  const pages = [
    "page1",
    "page2",
    "page3",
    "page4taxi",
    "page4bus",
    "page4entertainment",
  ];
  return (
    pages.find(
      (id) => !document.getElementById(id).classList.contains("hidden"),
    ) || "page1"
  );
}

/* ── Toast ── */
function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => {
    t.className = "toast";
  }, 2800);
}

/* ── Keyboard shortcuts ── */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeAdminModal();
    closeAdminLoginModal();
    closeAdminSessionModal();
  }
  // Ctrl+A (not inside a text input) → open admin panel
  if (
    e.ctrlKey &&
    e.key === "a" &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    e.preventDefault();
    handleAdminBtnClick();
  }
});

// Hide all delete buttons on page load — only visible when admin is logged in
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".delete-hub-btn")
    .forEach((b) => (b.style.display = "none"));
});
