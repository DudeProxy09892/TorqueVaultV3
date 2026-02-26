// === Torque Vault App.js ===

// DOM elements
const brandFilter = document.getElementById('brand-filter');
const modelFilter = document.getElementById('model-filter');
const carList = document.getElementById('car-list');
const garageList = document.getElementById('garage-list');
const themeToggle = document.getElementById('theme-toggle');

// Load garage from localStorage
let garage = JSON.parse(localStorage.getItem('garage')) || [];

// --- Populate Brand Filter ---
const brands = [...new Set(cars.map(c => c.brand))];
brands.forEach(brand => {
  const opt = document.createElement('option');
  opt.value = brand;
  opt.textContent = brand;
  brandFilter.appendChild(opt);
});

// --- Update Model Filter when Brand changes ---
brandFilter.addEventListener('change', () => {
  const selectedBrand = brandFilter.value;
  const filteredModels = selectedBrand === 'all' 
    ? cars.map(c => c.model) 
    : cars.filter(c => c.brand === selectedBrand).map(c => c.model);
    
  const uniqueModels = [...new Set(filteredModels)];
  modelFilter.innerHTML = '<option value="all">All Models</option>';
  uniqueModels.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    modelFilter.appendChild(opt);
  });

  displayCars();
});

modelFilter.addEventListener('change', displayCars);

// --- Display Cars ---
function displayCars() {
  const selectedBrand = brandFilter.value;
  const selectedModel = modelFilter.value;

  const filteredCars = cars.filter(c => 
    (selectedBrand === 'all' || c.brand === selectedBrand) &&
    (selectedModel === 'all' || c.model === selectedModel)
  );

  carList.innerHTML = '';
  filteredCars.forEach(c => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <h3>${c.brand} ${c.model}</h3>
      <img src="${c.img}" alt="${c.model}">
      <p>Year: ${c.year}</p>
      <p>HP: ${c.horsepower} | Torque: ${c.torque}</p>
      <p>0-60: ${c.zeroToSixty}s | $${c.price.toLocaleString()}</p>
      <button onclick="addToGarage(${c.id})">Add to Garage</button>
      <button onclick="playSound('${c.sound}')">🔊 Engine</button>
    `;
    carList.appendChild(card);
  });
}

// --- Garage Functions ---
function addToGarage(id) {
  const car = cars.find(c => c.id === id);
  if (!garage.some(c => c.id === id)) garage.push(car);
  localStorage.setItem('garage', JSON.stringify(garage));
  displayGarage();
}

function displayGarage() {
  garageList.innerHTML = garage.map(c => `<p>${c.brand} ${c.model} (${c.year})</p>`).join('');
}

// --- Play Engine Sound ---
function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}

// --- Dark / Light Mode ---
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if(document.body.classList.contains('light-mode')) {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  } else {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#fff';
  }
});

// --- Initialize Display ---
displayCars();
displayGarage();
