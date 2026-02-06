import { db } from './firebase-config.js';
import { collection, getDocs, query, where, orderBy, limit, startAfter, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Global Variables
let lastVisible = null;
let isLoading = false;
const productsPerPage = 12;

// Initialize the site
document.addEventListener('DOMContentLoaded', async () => {
    await loadHeaderCategories();
    await loadProducts();
    await loadFooter();
    setupEventListeners();
});

// Load categories to header
async function loadHeaderCategories() {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, where('isActive', '==', true), where('inHeader', '==', true), orderBy('order'));
        const querySnapshot = await getDocs(q);
        
        const navMenu = document.querySelector('.main-nav ul');
        // Clear existing categories except "Shop All"
        const shopAllItem = navMenu.querySelector('li:first-child');
        navMenu.innerHTML = '';
        navMenu.appendChild(shopAllItem);
        
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="category.html?slug=${category.slug}">${category.name}</a>
            `;
            navMenu.appendChild(li);
        });
        
        // Also populate category filter
        const categoryFilter = document.getElementById('categoryFilter');
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load products with pagination
async function loadProducts(reset = true) {
    if (isLoading) return;
    
    isLoading = true;
    const productsGrid = document.getElementById('productsGrid');
    
    if (reset) {
        productsGrid.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading products...</p>
            </div>
        `;
        lastVisible = null;
    }
    
    try {
        let productsQuery = query(
            collection(db, 'products'),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc'),
            limit(productsPerPage)
        );
        
        if (lastVisible && !reset) {
            productsQuery = query(
                collection(db, 'products'),
                where('status', '==', 'active'),
                orderBy('createdAt', 'desc'),
                startAfter(lastVisible),
                limit(productsPerPage)
            );
        }
        
        const querySnapshot = await getDocs(productsQuery);
        
        if (reset) {
            productsGrid.innerHTML = '';
        }
        
        if (querySnapshot.empty) {
            if (reset) {
                productsGrid.innerHTML = '<p class="no-products">No products found.</p>';
            }
            document.getElementById('loadMoreBtn').style.display = 'none';
            return;
        }
        
        // Get last document for pagination
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        // Process and display products
        querySnapshot.forEach((docSnapshot) => {
            const product = docSnapshot.data();
            const productCard = createProductCard(product, docSnapshot.id);
            productsGrid.appendChild(productCard);
        });
        
        // Show/hide load more button
        if (querySnapshot.size < productsPerPage) {
            document.getElementById('loadMoreBtn').style.display = 'none';
        } else {
            document.getElementById('loadMoreBtn').style.display = 'block';
        }
        
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p class="error">Error loading products. Please try again.</p>';
    } finally {
        isLoading = false;
    }
}

// Create product card element
function createProductCard(product, id) {
    const card = document.createElement('a');
    card.className = 'product-card';
    card.href = `product.html?id=${id}`;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0] || 'https://via.placeholder.com/300x300'}" 
                 alt="${product.title}"
                 loading="lazy">
        </div>
        <div class="product-info">
            <h3>${product.title}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
    `;
    
    return card;
}

// Load footer content
async function loadFooter() {
    try {
        // Load categories for footer
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, where('isActive', '==', true), where('inFooter', '==', true), orderBy('order'));
        const querySnapshot = await getDocs(q);
        
        const footer = document.getElementById('siteFooter');
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Categories</h4>
                        <ul class="footer-links" id="footerCategories"></ul>
                    </div>
                    <div class="footer-section">
                        <h4>Links</h4>
                        <ul class="footer-links" id="footerCustomLinks"></ul>
                    </div>
                    <div class="footer-section">
                        <h4>Connect</h4>
                        <div class="social-links" id="socialLinks"></div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p id="copyrightText">© ${new Date().getFullYear()} Fourthwall Clone</p>
                </div>
            </div>
        `;
        
        // Populate categories
        const footerCategories = document.getElementById('footerCategories');
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `<a href="category.html?slug=${category.slug}">${category.name}</a>`;
            footerCategories.appendChild(li);
        });
        
        // Load settings for custom links and social media
        const settingsDoc = await getDoc(doc(db, 'settings', 'siteSettings'));
        if (settingsDoc.exists()) {
            const settings = settingsDoc.data();
            
            // Custom links
            if (settings.footer && settings.footer.customLinks) {
                const customLinksContainer = document.getElementById('footerCustomLinks');
                settings.footer.customLinks.forEach(link => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${link.url}">${link.text}</a>`;
                    customLinksContainer.appendChild(li);
                });
            }
            
            // Social links
            if (settings.footer && settings.footer.socialLinks) {
                const socialLinksContainer = document.getElementById('socialLinks');
                const socialLinks = settings.footer.socialLinks;
                
                if (socialLinks.instagram) {
                    socialLinksContainer.innerHTML += `
                        <a href="${socialLinks.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    `;
                }
                if (socialLinks.twitter) {
                    socialLinksContainer.innerHTML += `
                        <a href="${socialLinks.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                    `;
                }
                if (socialLinks.youtube) {
                    socialLinksContainer.innerHTML += `
                        <a href="${socialLinks.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>
                    `;
                }
            }
            
            // Copyright text
            if (settings.footer && settings.footer.copyright) {
                document.getElementById('copyrightText').textContent = settings.footer.copyright;
            }
        }
        
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Load more button
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        loadProducts(false);
    });
    
    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    
    // Sort filter
    document.getElementById('sortFilter').addEventListener('change', filterProducts);
}

// Filter products based on selected filters
async function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let productsQuery = query(
        collection(db, 'products'),
        where('status', '==', 'active')
    );
    
    // Apply category filter
    if (categoryFilter) {
        productsQuery = query(productsQuery, where('category', '==', categoryFilter));
    }
    
    // Apply sort
    switch (sortFilter) {
        case 'price-low':
            productsQuery = query(productsQuery, orderBy('price', 'asc'));
            break;
        case 'price-high':
            productsQuery = query(productsQuery, orderBy('price', 'desc'));
            break;
        default:
            productsQuery = query(productsQuery, orderBy('createdAt', 'desc'));
    }
    
    try {
        const querySnapshot = await getDocs(productsQuery);
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '';
        
        if (querySnapshot.empty) {
            productsGrid.innerHTML = '<p class="no-products">No products found with selected filters.</p>';
            document.getElementById('loadMoreBtn').style.display = 'none';
            return;
        }
        
        querySnapshot.forEach((docSnapshot) => {
            const product = docSnapshot.data();
            const productCard = createProductCard(product, docSnapshot.id);
            productsGrid.appendChild(productCard);
        });
        
        document.getElementById('loadMoreBtn').style.display = 'none';
        
    } catch (error) {
        console.error('Error filtering products:', error);
    }
}
