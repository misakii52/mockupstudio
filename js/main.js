import { db } from './firebase-config.js';
import { collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadHeaderCategories();
    await loadProducts();
    await loadFooter();
});

// Header'a kategorileri yükle
async function loadHeaderCategories() {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, 
            where('isActive', '==', true), 
            where('inHeader', '==', true), 
            orderBy('order')
        );
        
        const querySnapshot = await getDocs(q);
        const navMenu = document.querySelector('.main-nav ul');
        
        if (navMenu) {
            // "Shop All" hariç diğerlerini temizle
            const shopAllItem = navMenu.querySelector('li:first-child');
            if (shopAllItem) {
                navMenu.innerHTML = '';
                navMenu.appendChild(shopAllItem);
            }
            
            // Kategorileri ekle
            querySnapshot.forEach((doc) => {
                const category = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `<a href="category.html?slug=${category.slug}">${category.name}</a>`;
                navMenu.appendChild(li);
            });
        }
        
    } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
    }
}

// Ürünleri yükle
async function loadProducts() {
    try {
        const productsQuery = query(
            collection(db, 'products'),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(productsQuery);
        const productsGrid = document.getElementById('productsGrid');
        
        if (querySnapshot.empty) {
            productsGrid.innerHTML = '<p>Henüz ürün yok.</p>';
            return;
        }
        
        productsGrid.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = `
                <a href="product.html?id=${doc.id}" class="product-card">
                    <div class="product-image">
                        <img src="${product.images?.[0] || 'https://via.placeholder.com/300'}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <div class="product-price">$${product.price?.toFixed(2) || '0.00'}</div>
                    </div>
                </a>
            `;
            productsGrid.innerHTML += productCard;
        });
        
    } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
    }
}

// Footer'ı yükle
async function loadFooter() {
    try {
        // Kategorileri footer'a yükle
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, 
            where('isActive', '==', true), 
            where('inFooter', '==', true), 
            orderBy('order')
        );
        
        const querySnapshot = await getDocs(q);
        const footer = document.getElementById('siteFooter');
        
        let categoriesHTML = '';
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            categoriesHTML += `<li><a href="category.html?slug=${category.slug}">${category.name}</a></li>`;
        });
        
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Kategoriler</h4>
                        <ul class="footer-links">
                            ${categoriesHTML}
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Bağlantılar</h4>
                        <ul class="footer-links">
                            <li><a href="index.html">Ana Sayfa</a></li>
                            <li><a href="#">Hakkımızda</a></li>
                            <li><a href="#">İletişim</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>© ${new Date().getFullYear()} Mockup Master. Tüm hakları saklıdır.</p>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Footer yüklenirken hata:', error);
    }
}
