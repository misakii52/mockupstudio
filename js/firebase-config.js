{
  "firebaseConfig": {
    "apiKey": "AIzaSyDs6JHPSV8UM2uKSSVUA1SNxWGyxAihaII",
    "authDomain": "mockup-master-db.firebaseapp.com",
    "projectId": "mockup-master-db",
    "storageBucket": "mockup-master-db.firebasestorage.app",
    "messagingSenderId": "68063883147",
    "appId": "1:68063883147:web:07debadc7efe4aeccac98e"
  },
  
  "firestoreRules": {
    "version": "2",
    "rules": {
      "products": {
        ".read": true,
        ".write": "auth != null",
        ".indexOn": ["status", "category", "createdAt", "price"]
      },
      "categories": {
        ".read": true,
        ".write": "auth != null",
        ".indexOn": ["isActive", "order", "slug"]
      },
      "settings": {
        ".read": true,
        ".write": "auth != null"
      },
      "users": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  },
  
  "initialData": {
    "settings": {
      "siteSettings": {
        "siteInfo": {
          "siteName": "Mockup Master",
          "logo": "",
          "description": "Premium digital mockups for designers"
        },
        "footer": {
          "socialLinks": {
            "instagram": "",
            "twitter": "",
            "youtube": "",
            "facebook": ""
          },
          "customLinks": [
            {"text": "About", "url": "/about.html"},
            {"text": "Contact", "url": "/contact.html"},
            {"text": "Privacy Policy", "url": "/privacy.html"}
          ],
          "copyright": "© 2024 Mockup Master. All rights reserved."
        },
        "email": "hello@mockupmaster.com",
        "phone": "+1 (555) 123-4567",
        "address": "123 Design Street, Creative City"
      }
    },
    
    "categories": [
      {
        "name": "T-Shirt Mockups",
        "slug": "t-shirt-mockups",
        "description": "High quality t-shirt mockups",
        "order": 1,
        "isActive": true,
        "inHeader": true,
        "inFooter": true,
        "image": "",
        "createdAt": "2024-01-01T00:00:00Z"
      },
      {
        "name": "Hoodie Mockups",
        "slug": "hoodie-mockups",
        "description": "Premium hoodie and sweatshirt mockups",
        "order": 2,
        "isActive": true,
        "inHeader": true,
        "inFooter": true,
        "image": "",
        "createdAt": "2024-01-01T00:00:00Z"
      },
      {
        "name": "Poster Mockups",
        "slug": "poster-mockups",
        "description": "Professional poster and print mockups",
        "order": 3,
        "isActive": true,
        "inHeader": true,
        "inFooter": true,
        "image": "",
        "createdAt": "2024-01-01T00:00:00Z"
      },
      {
        "name": "Logo Mockups",
        "slug": "logo-mockups",
        "description": "Logo presentation and branding mockups",
        "order": 4,
        "isActive": true,
        "inHeader": true,
        "inFooter": true,
        "image": "",
        "createdAt": "2024-01-01T00:00:00Z"
      },
      {
        "name": "Packaging Mockups",
        "slug": "packaging-mockups",
        "description": "Product packaging and label mockups",
        "order": 5,
        "isActive": true,
        "inHeader": true,
        "inFooter": true,
        "image": "",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    
    "sampleProducts": [
      {
        "title": "Premium T-Shirt Mockup Bundle",
        "description": "<h3>Professional T-Shirt Mockup Bundle</h3><p>This bundle includes 10 high-quality t-shirt mockups perfect for showcasing your designs.</p><ul><li>10 different angles</li><li>PSD format</li><li>Smart objects</li><li>4K resolution</li></ul>",
        "category": "t-shirt-mockups",
        "price": 29.99,
        "images": [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w-800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w-800&auto=format&fit=crop"
        ],
        "gumroadEmbed": '<script src="https://gumroad.com/js/gumroad.js"></script
