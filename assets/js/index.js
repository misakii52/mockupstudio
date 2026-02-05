// GLOBAL
let allProducts = [];
let allCategories = [];
let sliderItems = [];
let sliderIndex = 0;

// SLIDER
function renderSlider() {
  const slider = document.getElementById("slider");
  if (!sliderItems.length) return;

  slider.innerHTML = `
    <img src="${sliderItems[sliderIndex].img}" 
         class="w-full h-full object-cover absolute inset-0">
    <div class="absolute inset-0 bg-black/40 flex items-end p-6">
      <a href="https://gumroad.com/l/${sliderItems[sliderIndex].link}"
         target="_blank"
         class="bg-white text-black px-6 py-3 font-bold rounded-lg">
         Buy on Gumroad
      </a>
    </div>
  `;

  sliderIndex = (sliderIndex + 1) % sliderItems.length;
}

// KATEGORİLER
function renderCategories() {
  const el = document.getElementById("category-list");
  el.innerHTML = allCategories.map(cat => `
    <button onclick="filterCategory('${cat}')"
      class="px-4 py-2 bg-black text-white rounded-full text-sm">
      ${cat}
    </button>
  `).join("");
}

// ÜRÜNLER
function renderProducts(products) {
  const el = document.getElementById("product-list");
  el.innerHTML = products.map(p => `
    <div class="bg-white rounded-xl shadow p-4">
      <img src="${p.img}" class="rounded-lg mb-4 h-48 w-full object-cover">
      <h3 class="font-bold">${p.title}</h3>
      <p class="text-gray-500 text-sm mb-2">${p.desc || ""}</p>
      <div class="flex justify-between items-center">
        <span class="font-bold">${p.price}</span>
        <a href="https://gumroad.com/l/${p.slug}" 
           target="_blank"
           class="bg-black text-white px-4 py-2 rounded">
           Buy
        </a>
      </div>
    </div>
  `).join("");
}

// FİLTRE
function filterCategory(cat) {
  const filtered = allProducts.filter(p => p.cat === cat);
  renderProducts(filtered);
}

// FIREBASE VERİ ÇEKME
db.ref().on("value", snap => {
  const data = snap.val();
  if (!data) return;

  // SLIDER
  if (data.her

