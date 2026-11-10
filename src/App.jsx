import React, { useState, useEffect, useMemo } from 'react';
import productsData from './data/products.json';

import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import StoreSwitcher from './components/StoreSwitcher';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import CartBar from './components/CartBar';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import OtpTicket from './components/OtpTicket';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

const CART_STORAGE_KEY = 'brothers_superstore_cart_v1';
const ORDER_STORAGE_KEY = 'brothers_superstore_order_v1';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to read cart from localStorage', e);
      return [];
    }
  });

  // Last order state persisted to localStorage
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn('Failed to read active order from localStorage', e);
      return null;
    }
  });

  const [activeShop, setActiveShop] = useState('ALL'); // 'ALL' | 'A' | 'B'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Pickup');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync active order to localStorage
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to save order to localStorage', e);
    }
  }, [activeOrder]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalItems = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [cart]
  );

  // Filter Categories dynamically based on selected shop
  const categories = useMemo(() => {
    const pool = activeShop === 'ALL'
      ? productsData
      : productsData.filter((p) => p.shop === activeShop);
    const unique = Array.from(new Set(pool.map((p) => p.category)));
    return ['All', ...unique];
  }, [activeShop]);

  // Reset category if not available in current shop
  useEffect(() => {
    if (selectedCategory !== 'All' && !categories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [activeShop, categories, selectedCategory]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return productsData.filter((prod) => {
      const matchesShop = activeShop === 'ALL' || prod.shop === activeShop;
      const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesShop && matchesCategory && matchesSearch;
    });
  }, [activeShop, selectedCategory, searchQuery]);

  // Checkout handling & OTP creation
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSubmission = ({ customerName, customerPhone, paymentMethod }) => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      orderId,
      otp: randomOtp,
      customerName,
      customerPhone,
      paymentMethod,
      items: [...cart],
      total: subtotal,
      timestamp,
    };

    setActiveOrder(newOrder);
    setCart([]); // Clear cart after order is confirmed
    setIsCheckoutOpen(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNewOrder = () => {
    setActiveOrder(null);
    setCart([]);
  };

  const scrollToCatalog = () => {
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain selection:bg-brand selection:text-white">
      <AnnouncementBar />
      <Header totalItems={totalItems} onOpenCart={() => setIsCartOpen(true)} />
      <StoreSwitcher activeShop={activeShop} onSelectShop={setActiveShop} />

      <main className="flex-1 pb-16">
        {/* If an active order ticket exists, prioritize showing it */}
        {activeOrder ? (
          <div className="py-6">
            <OtpTicket order={activeOrder} onStartNewOrder={handleStartNewOrder} />
          </div>
        ) : (
          <>
            <Hero onBrowseClick={scrollToCatalog} onHowItWorksClick={scrollToHowItWorks} />

            {/* Catalog Section */}
            <section id="catalog-section" className="max-w-6xl mx-auto px-4 py-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-textMain tracking-tight">
                    Store Catalog
                  </h2>
                  <p className="text-xs sm:text-sm text-textMuted">
                    {filteredProducts.length} items available for counter packaging
                  </p>
                </div>
              </div>

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-surface rounded-lg border border-borderLine p-8">
                  <p className="text-base font-semibold text-textMain">No products found</p>
                  <p className="text-sm text-textMuted mt-1">Try searching for a different item or switch category.</p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setActiveShop('ALL'); }}
                    className="mt-4 px-4 py-2 bg-surface text-brand border border-brand rounded-lg text-sm font-semibold hover:bg-brand hover:text-surface transition-colors min-h-[44px]"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filteredProducts.map((product) => {
                    const inCart = cart.find((it) => it.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantity={inCart ? inCart.quantity : 0}
                        onAddToCart={handleAddToCart}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    );
                  })}
                </div>
              )}
            </section>

            <HowItWorks />
          </>
        )}
      </main>

      <Footer />

      {/* Floating Bottom Cart Bar for Mobile */}
      {!activeOrder && (
        <CartBar
          totalItems={totalItems}
          subtotal={subtotal}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Cart Modal / Sheet */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        subtotal={subtotal}
        paymentMethod={paymentMethod}
        onSelectPaymentMethod={setPaymentMethod}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmitOrder={handleOrderSubmission}
        subtotal={subtotal}
        paymentMethod={paymentMethod}
      />
    </div>
  );
}
