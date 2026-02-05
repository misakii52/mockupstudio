/**************************
 FIREBASE CONFIG
 (Senin verdiğin config)
**************************/
const firebaseConfig = {
  apiKey: "AIzaSyDs6JHPSV8UM2uKSSVUA1SNxWGyxAihaII",
  authDomain: "mockup-master-db.firebaseapp.com",
  databaseURL: "https://mockup-master-db-default-rtdb.firebaseio.com",
  projectId: "mockup-master-db",
  storageBucket: "mockup-master-db.firebasestorage.app",
  messagingSenderId: "68063883147",
  appId: "1:68063883147:web:07debadc7efe4aeccac98e"
};

/**************************
 FIREBASE INIT
**************************/
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/**************************
 LOAD DATA
**************************/
db.ref().on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  renderCategories(data.categories);
  renderProducts(data.products);
  renderSlider(data.hero_slider);
});

/**************************
 CATEGORIES
**************************/
function renderCategories(categories) {
  const nav = document.getElementById("category-nav");
  nav.innerHTML = "";

  if (!categories) return;

  Object.values(categories).forEach(cat => {
    const a = document.createElement("a");
    a.textContent = cat;
    a.className = "cursor-pointer hover:underline";
    a.onclick = () => filterCategory(cat);
    nav.appendChild(a);
  });
}

/**************************
 PRODUCTS
**************************/
function renderProducts(products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  if (!products) return;

  Object.values(products).forEach(p => {
    grid.innerHTML += `
      <div class="border rounded-xl overflow-hidden">
        <img src="${p.img}" class="w-full h-64 object-cover">
        <div class="p-4">
          <h3 class="font-black uppercase">${p.title}</h3>
          <p class="text-sm opacity-60 mb-2">${p.cat}</p>
          <p class="font-bold mb-4">${p.price}</p>
          <a 
            href="https://gumroad.com/l/${p.slug}"
            data-gumroad-overlay-checkout="true"
            class="block text-center bg-black text-white py-2 rounded"
          >
            Buy on Gumroad
          </a>
        </div>
      </div>
    `;
  });

  if (window.GumroadOverlay) GumroadOverlay.reload();
}

/**************************
 FILTER
**************************/
function filterCategory(cat) {
  db.ref("products").once("value", snap => {
    const products = snap.val();
    const filtered = Object.values(products).filter(p => p.cat === cat);
    renderProducts(
      Object.fromEntries(filtered.map(p => [p.id, p]))
    );
  });
}

/**************************
 SLIDER
**************************/
function renderSlider(slides) {
  const slider = document.getElementById("hero-slider");
  slider.innerHTML = "";

  if (!slides) return;

  Object.values(slides).forEach(s => {
    slider.innerHTML += `
      <div class="swiper-slide relative">
        <img src="${s.img}" class="w-full h-[450px] object-cover">
        <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
          <a 
            href="https://gumroad.com/l/${s.link}"
            data-gumroad-overlay-checkout="true"
            class="bg-white text-black px-8 py-4 font-black uppercase"
          >
            Buy on Gumroad
          </a>
        </div>
      </div>
    `;
  });

  new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 5000 },
    pagination: { el: ".swiper-pagination", clickable: true }
  });

  if (window.GumroadOverlay) GumroadOverlay.reload();
}
