import { db } from './firebase-config.js';
import { collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Header CSS
const headerStyles = `
<style>
    .header {
        position: sticky;
        top: 0;
        background: white;
        border-bottom: 1px solid #e0e0e0;
        z-index: 1000;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    .header-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
        padding: 15px 0;
    }
    
    .logo a {
        font-size: 24px;
        font-weight: 700;
        text-decoration: none;
        color: #000;
        letter-spacing: -0.5px;
    }
    
    .main-nav ul {
        display: flex;
        list-style: none;
        gap: 30px;
        margin: 0;
        padding: 0;
    }
    
    .main-nav a {
        text-decoration: none;
        color: #333;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: color 0.3s;
        white-space: nowrap;
    }
    
    .main-nav a:hover,
    .main-nav a.active {
        color: #000;
    }
    
    .search-container {
        flex: 1;
        max-width: 400px;
    }
    
    #globalSearchForm {
        display: flex;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
    }
    
    #globalSearch {
        flex: 1;
        padding: 10px 15px;
        border: none;
        font-size: 14px;
    }
    
    #globalSearchForm button {
        background: none;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        color: #666;
    }
    
    .cart-icon a {
        display: flex;
        align-items: center;
        color: #000;
        text-decoration: none;
        position: relative;
    }
    
    #cartCount {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #000;
        color: white;
        font-size: 12px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @media (max-width: 768px) {
        .header-inner {
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .main-nav ul {
            order: 3;
            width: 100%;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .search-container {
            order: 2;
            max-width: 100%;
        }
        
        .logo {
            order: 1;
        }
        
        .cart-icon {
            order: 1;
        }
    }
</style>
`;

// CSS'i ekle
document.head.insertAdjacentHTML('beforeend', headerStyles);

// Header kategorilerini yükle
async function loadHeaderCategories() {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, 
            where('inHeader', '==', true), 
            where('isActive', '==', true), 
            orderBy('order')
        );
        
        const querySnapshot = await getDocs(q);
        const navMenu = document.querySelector('#mainNav');
        
        if (navMenu) {
            let navHTML = '<ul>';
            
            querySnapshot.forEach((doc) => {
                const category = doc.data();
                navHTML += `
                    <li>
                        <a href="category.html?id=${doc.id}&name=${encodeURIComponent(category.name)}">
                            ${category.name}
                        </a>
                    </li>
                `;
            });
            
            navHTML += '</ul>';
            navMenu.innerHTML = navHTML;
            
            if (querySnapshot.empty) {
                navMenu.innerHTML = '<ul><li><a href="#" style="color: #666; font-style: italic;">No categories</a></li></ul>';
            }
        }
        
    } catch (error) {
        console.error('Header kategorileri yüklenirken hata:', error);
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
        
        if (!productsGrid) return;
        
        if (querySnapshot.empty) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                    <p style="color: #666; font-size: 16px;">No products found.</p>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = `
                <a href="product.html?id=${doc.id}" class="product-card">
                    <div class="product-image">
                        <img src="${product.images?.[0] || 'https://via.placeholder.com/300'}" 
                             alt="${product.title}"
                             loading="lazy"
                             onerror="this.src='https://via.placeholder.com/300'">
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
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: #ff4444;">
                    <p>Error loading products. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Footer'ı yükle
async function loadFooter() {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, 
            where('inFooter', '==', true), 
            where('isActive', '==', true), 
            orderBy('order')
        );
        
        const querySnapshot = await getDocs(q);
        const footer = document.getElementById('siteFooter');
        
        if (!footer) return;
        
        let categoriesHTML = '';
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            categoriesHTML += `
                <li>
                    <a href="category.html?id=${doc.id}&name=${encodeURIComponent(category.name)}">
                        ${category.name}
                    </a>
                </li>
            `;
        });
        
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Categories</h4>
                        <ul class="footer-links">
                            ${categoriesHTML || '<li>No categories</li>'}
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Links</h4>
                        <ul class="footer-links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="admin/login.html">Admin</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>© ${new Date().getFullYear()} Mockup Master</p>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Footer yüklenirken hata:', error);
    }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', async () => {
    await loadHeaderCategories();
    await loadProducts();
    await loadFooter();
});
