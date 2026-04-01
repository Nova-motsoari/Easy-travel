/* ── Starfield ── */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }

function initStars() {
  stars = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + .2,
    a: Math.random(),
    speed: Math.random() * .004 + .001,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isLight = document.body.classList.contains('light');
  stars.forEach(s => {
    s.a = .3 + .7 * (.5 + .5 * Math.sin(t * s.speed + s.phase));
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

resize(); initStars(); requestAnimationFrame(drawStars);
window.addEventListener('resize', () => { resize(); initStars(); });

/* ── Theme toggle ── */
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// Restore saved theme on load
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
  }
})();

/* ── Navigation ── */
function nav(from, to) {
  document.getElementById(from).classList.add('hidden');
  const target = document.getElementById(to);
  target.classList.remove('hidden');
  target.scrollTop = 0;
}

/* ── Hub destination data ── */
const hubData = {
  'central-taxi': {
    title: 'Central Taxi Rank',
    subtitle: 'Local & regional destinations',
    destinations: [
      { city: 'Botshabelo',  province: 'Free State' },
      { city: 'Thaba Nchu',  province: 'Free State' },
      { city: 'Bainsvlei',   province: 'Free State' },
      { city: 'Brandfort',   province: 'Free State' },
      { city: 'Winburg',     province: 'Free State' },
      { city: 'Sannaspos',   province: 'Free State' },
      { city: 'Dewetsdorp',  province: 'Free State' },
      { city: 'Wepener',     province: 'Free State' },
    ]
  },
  'mangaung-taxi': {
    title: 'Mangaung Taxi Rank',
    subtitle: 'Township & surrounding routes',
    destinations: [
      { city: 'Rocklands',   province: 'Bloemfontein' },
      { city: 'Phahameng',   province: 'Bloemfontein' },
      { city: 'Bochabela',   province: 'Bloemfontein' },
      { city: 'Batho',       province: 'Bloemfontein' },
      { city: 'Heidedal',    province: 'Bloemfontein' },
      { city: 'Botshabelo',  province: 'Free State' },
      { city: 'Thaba Nchu',  province: 'Free State' },
      { city: 'Dewetsdorp',  province: 'Free State' },
    ]
  },
  'airport-taxi': {
    title: 'Bram Fischer Airport Rank',
    subtitle: 'Airport transfers & city routes',
    destinations: [
      { city: 'Bloemfontein CBD',  province: 'City Centre' },
      { city: 'Westdene',          province: 'Bloemfontein' },
      { city: 'Universitas',       province: 'Bloemfontein' },
      { city: 'Langenhovenpark',   province: 'Bloemfontein' },
      { city: 'Dan Pienaar',       province: 'Bloemfontein' },
      { city: 'Wilgehof',          province: 'Bloemfontein' },
    ]
  },
  'langenhoven-taxi': {
    title: 'Langenhovenpark Taxi Rank',
    subtitle: 'City centre route',
    destinations: [
      { city: 'Bloemfontein Central', province: 'City Centre' },
    ]
  },
  'park-road': {
    title: 'Park Road Bus Terminal',
    subtitle: 'Regional & intercity routes',
    destinations: [
      { city: 'Johannesburg',   province: 'Gauteng' },
      { city: 'Pretoria',       province: 'Gauteng' },
      { city: 'Cape Town',      province: 'Western Cape' },
      { city: 'Durban',         province: 'KwaZulu-Natal' },
      { city: 'Port Elizabeth',  province: 'Eastern Cape' },
      { city: 'East London',    province: 'Eastern Cape' },
      { city: 'Kimberley',      province: 'Northern Cape' },
      { city: 'Welkom',         province: 'Free State' },
      { city: 'Kroonstad',      province: 'Free State' },
      { city: 'Harrismith',     province: 'Free State' },
    ]
  },
  'greyhound': {
    title: 'Greyhound Bloemfontein',
    subtitle: 'Major cities across South Africa',
    destinations: [
      { city: 'Johannesburg',      province: 'Gauteng' },
      { city: 'Pretoria',          province: 'Gauteng' },
      { city: 'Cape Town',         province: 'Western Cape' },
      { city: 'Durban',            province: 'KwaZulu-Natal' },
      { city: 'Port Elizabeth',     province: 'Eastern Cape' },
      { city: 'East London',       province: 'Eastern Cape' },
      { city: 'Kimberley',         province: 'Northern Cape' },
      { city: 'George',            province: 'Western Cape' },
      { city: 'Polokwane',         province: 'Limpopo' },
      { city: 'Nelspruit',         province: 'Mpumalanga' },
      { city: 'Pietermaritzburg',  province: 'KwaZulu-Natal' },
      { city: 'Upington',          province: 'Northern Cape' },
    ]
  },
  'translux': {
    title: 'Translux Terminal',
    subtitle: 'Intercity coach destinations',
    destinations: [
      { city: 'Johannesburg',      province: 'Gauteng' },
      { city: 'Pretoria',          province: 'Gauteng' },
      { city: 'Cape Town',         province: 'Western Cape' },
      { city: 'Durban',            province: 'KwaZulu-Natal' },
      { city: 'Port Elizabeth',     province: 'Eastern Cape' },
      { city: 'Mthatha',           province: 'Eastern Cape' },
      { city: 'Queenstown',        province: 'Eastern Cape' },
      { city: 'Kimberley',         province: 'Northern Cape' },
      { city: 'Welkom',            province: 'Free State' },
      { city: 'Bethlehem',         province: 'Free State' },
      { city: 'Pietermaritzburg',  province: 'KwaZulu-Natal' },
      { city: 'Richards Bay',      province: 'KwaZulu-Natal' },
    ]
  },
  'hoffman-square': {
    title: 'Hoffman Square',
    subtitle: 'Bloemfontein suburbs served',
    destinations: [
      { city: 'Westdene',           province: 'Suburb' },
      { city: 'Universitas',        province: 'Suburb' },
      { city: 'Langenhovenpark',    province: 'Suburb' },
      { city: 'Dan Pienaar',        province: 'Suburb' },
      { city: 'Wilgehof',           province: 'Suburb' },
      { city: 'Brandwag',           province: 'Suburb' },
      { city: 'Fichardt Park',      province: 'Suburb' },
      { city: 'Pellissier',         province: 'Suburb' },
      { city: 'Bayswater',          province: 'Suburb' },
      { city: 'Woodland Hills',     province: 'Suburb' },
      { city: 'Pentagon Park',      province: 'Suburb' },
      { city: 'Fauna',              province: 'Suburb' },
      { city: 'Arboretum',          province: 'Suburb' },
      { city: 'Ehrlich Park',       province: 'Suburb' },
      { city: 'Lourier Park',       province: 'Suburb' },
      { city: 'Heuwelsig',          province: 'Suburb' },
      { city: 'Gardenia Park',      province: 'Suburb' },
      { city: 'Uitsig',             province: 'Suburb' },
      { city: 'Roodewal',           province: 'Suburb' },
      { city: 'Hilton',             province: 'Suburb' },
      { city: 'Hospitaalpark',      province: 'Suburb' },
      { city: 'Fleurdal',           province: 'Suburb' },
    ]
  }
};

/* ── Modal ── */
function openModal(hubId) {
  const data = hubData[hubId];
  if (!data) return;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalSubtitle').textContent = data.subtitle;
  document.getElementById('modalDestinations').innerHTML = data.destinations.map(d => `
    <div class="dest-item">
      <div class="dest-city">${d.city}</div>
      <div class="dest-province">${d.province}</div>
    </div>
  `).join('');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
