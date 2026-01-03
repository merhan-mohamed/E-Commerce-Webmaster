import React from 'react';
// Import Next.js Image component if you are using Next.js and need to optimize static assets
// import Image from 'next/image'; 

// --- 1. Utility Component Types ---


// --- 2. Utility Components (with Typescript Fix) ---

// Utility component for feature icons
const FeatureItem: React.FC<FeatureItemProps> = ({ iconPath, text }) => (
  <div className="flex items-center space-x-2">
    {/* Icon Placeholder (SVG) */}
    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
    </svg>
    <p className="text-gray-700 text-sm">{text}</p>
  </div>
);

// Utility component for category columns
const CategoryColumn: React.FC<CategoryColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
    <ul className="space-y-2 text-sm">
      {links.map((link, index) => (
        <li key={index}>
          <a href="#" className="text-gray-600 hover:text-teal-500">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);


// --- 3. Main Footer Component ---

const Footer: React.FC = () => {
  return (
    <footer>
      {/* 1. Newsletter Subscription Section (Teal Background) */}
      <div className="bg-teal-500 py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-8 lg:mb-0 lg:w-1/2">
            <p className="text-sm">50% discount for your first order</p>
            <h2 className="text-3xl font-bold mt-1">Join our newsletter and get...</h2>
            <p className="mt-3 text-sm max-w-md mx-auto lg:mx-0">
              Join our email subscription now to get updates on promotions and coupons.
            </p>
            <div className="mt-6 flex justify-center lg:justify-start">
              <input
                type="email"
                placeholder="Your email address"
                className="p-3 rounded-l-sm focus:outline-none text-gray-800 w-full max-w-xs"
              />
              <button className="bg-teal-700 hover:bg-teal-800 text-white p-3 rounded-r-sm font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
          {/* Discount Card Illustration (Abstracted) */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="w-64 h-40 bg-white rounded-lg p-4 shadow-xl relative overflow-hidden text-gray-800 transform rotate-3">
              <div className="flex justify-between items-center border-b border-dashed pb-2">
                <span className="text-xs">THE BASKET</span>
                <span className="text-xs font-bold text-red-500">DISCOUNT</span>
              </div>
              <p className="text-5xl font-extrabold text-teal-600 my-2">50%</p>
              <p className="text-sm text-center">COUPON</p>
              <div className="absolute inset-0 bg-teal-500 opacity-10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Feature Highlights Section */}
      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center space-y-4 md:space-y-0">
          <FeatureItem iconPath="M9 12h6m-3-6v12" text="Everyday fresh products" />
          <FeatureItem iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" text="Free delivery for order over $70" />
          <FeatureItem iconPath="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.329 1.176l1.519 4.674c.3.921-.755 1.688-1.539 1.175l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.513-1.838-.254-1.539-1.175l1.519-4.674a1 1 0 00-.329-1.176l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" text="Daily Mega Discounts" />
          <FeatureItem iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" text="Best price on the market" />
        </div>
      </div>

      {/* 3. Category Links Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-gray-600">
          <CategoryColumn 
            title="FRUIT & VEGETABLES"
            links={["Fresh Vegetables", "Herbs & Seasonings", "Fresh Fruits", "Cuts & Sprouts", "Exotic Fruits & Veggies", "Packaged Produce", "Party Trays"]}
          />
          <CategoryColumn 
            title="BREAKFAST & DAIRY"
            links={["Milk & Flavoured Milk", "Butter and Margarine", "Cheese", "Egg Substitutes", "Honey", "Marmalades", "Sour Cream and Dips", "Yogurt"]}
          />
          <CategoryColumn 
            title="MEAT & SEAFOOD"
            links={["Breakfast Sausage", "Dinner Sausage", "Beef", "Chicken", "Sliced Deli Meat", "Shrimp", "Wild Caught Fillets", "Crab and Shellfish", "Farm Raised Fillets"]}
          />
          <CategoryColumn 
            title="BEVERAGES"
            links={["Water", "Sparkling Water", "Soda & Pop", "Coffee", "Milk & Plant Based Milk", "Tea & Kombucha", "Drink Boxes & Pouches", "Craft Beer", "Wine"]}
          />
          <CategoryColumn 
            title="BREADS & BAKERY"
            links={["Breads", "Buns & Rolls", "Cakes & Pastries", "Cookies & Crackers", "Dough & Pizza Crust", "Grilling Breads & Buns", "Packaged Breads"]}
          />
        </div>
      </div>

      {/* 4. Contact & App Download Section */}
      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-700 space-y-4 md:space-y-0">
          
          {/* Phone Number */}
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <span className="text-xl font-bold">8 800 555-55</span>
          </div>

          {/* App Download Info and Buttons */}
          <div className="flex items-center space-x-6">
            <p className="text-sm text-center md:text-left">
              Download App on Mobile: 
              <span className="block text-xs text-gray-500">10% discount on your first purchase</span>
            </p>
            <div className="flex space-x-2">
              {/* NOTE: Replace with your actual image paths */}
              <a href="#"><img src="/images/google_play.png" alt="Google Play" className="h-8 w-auto" /></a>
              <a href="#"><img src="/images/app-store.jpeg" alt="App Store" className="h-8 w-auto" /></a>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-3">
             <a href="#" className="text-gray-400 hover:text-teal-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" /></svg></a>
             <a href="#" className="text-gray-400 hover:text-teal-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 5.862a8.301 8.301 0 01-2.355.637 4.137 4.137 0 001.815-2.278 8.36 8.36 0 01-2.6.996 4.134 4.134 0 00-7.042 3.77A11.77 11.77 0 013.8 5.474a4.137 4.137 0 001.282 5.514 4.124 4.124 0 01-1.867-.514v.05c0 4.476 3.18 8.19 7.4 9.043a4.132 4.132 0 01-1.85 1.579 11.77 11.77 0 005.474-1.468 8.3 8.3 0 002.355-1.745c.813-.497 1.517-1.116 2.054-1.84a11.77 11.77 0 00-2.355-.637z" /></svg></a>
             <a href="#" className="text-gray-400 hover:text-teal-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.996 11.996a1 1 0 011.666 0c1.02-.917 2.378-1.488 3.868-1.488 3.2 0 5.812 2.612 5.812 5.812 0 1.49-.571 2.848-1.488 3.868a1 1 0 01-1.666 0c-1.02-.917-2.378-1.488-3.868-1.488-3.2 0-5.812-2.612-5.812-5.812 0-1.49.571-2.848 1.488-3.868zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 4a6 6 0 100 12 6 6 0 000-12zm-3 6a3 3 0 116 0 3 3 0 01-6 0z" /></svg></a>
          </div>
        </div>
      </div>

      {/* 5. Copyright and Payment Section */}
      <div className="bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-2 md:space-y-0">
          <p>
            Copyright 2023 © All rights reserved by Basket Theme.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-teal-500">Privacy Policy</a>
            <a href="#" className="hover:text-teal-500">Terms and Conditions</a>
            <a href="#" className="hover:text-teal-500">Cookies</a>
          </div>
          {/* NOTE: Replace with your actual image paths or use a font icon library */}
          <div className="flex space-x-2">
            <img src="/images/1p.png" alt="Stripe" className="h-4" />
            <img src="/images/2p.png" alt="Visa" className="h-4" />
            <img src="/images/3p.png" alt="Mastercard" className="h-4" />
            <img src="/images/paypal.png" alt="PayPal" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;