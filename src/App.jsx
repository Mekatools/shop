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
import { KeyRound, ArrowRight, Edit3 } from 'lucide-react';

const CART_STORAGE_KEY = 'brothers_superstore_cart_v1';
const ORDER_STORAGE_KEY = 'brothers_superstore_order_v1';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // 'catalog' | 'ticket'
  const [currentView, setCurrentView] = useState(() => (activeOrder ? 'ticket' : 'catalog'));

  const [activeShop, setActiveShop] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Pickup');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    } catch (e) {
      console.warn(e);
    }
  }, [activeOrder]);

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

  const categories = useMemo(() => {
    const pool = activeShop === 'ALL'
      ? productsData
      : productsData.filter((p) => p.shop === activeShop);
    const unique = Array.from(new Set(pool.map((p) => p.category)));
    return ['All', ...unique];
  }, [activeShop]);

  useEffect(() => {
    if (selectedCategory !== 'All' && !categories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [activeShop, categories, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((prod) => {
      const matchesShop = activeShop === 'ALL' || prod.shop === activeShop;
      const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesShop && matchesCategory && matchesSearch;
    });
  }, [activeShop, selectedCategory, searchQuery]);

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
    setCart([]);
    setIsCheckoutOpen(false);
    setCurrentView('ticket');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Edit Order: restores the items back into cart
  const handleEditOrder = () => {
    if (activeOrder && activeOrder.items) {
      setCart(activeOrder.items);
      setPaymentMethod(activeOrder.paymentMethod || 'Cash on Pickup');
    }
    setCurrentView('catalog');
    setIsCartOpen(true);
  };

  const handleCancelOrder = () => {
    setActiveOrder(null);
    setCurrentView('catalog');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain selection:bg-brand selection:text-white">
      <AnnouncementBar />
      <Header totalItems={totalItems} onOpenCart={() => setIsCartOpen(true)} />

      {/* Active Order Banner (visible when browsing catalog with an existing order) */}
      {activeOrder && currentView === 'catalog' && (
        <div className="bg-brand-light border-b border-emerald-200 px-4 py-2.5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-brand font-medium">
              <KeyRound className="w-4 h-4 shrink-0" />
              <span>
                Active Pickup Order: <strong>OTP {activeOrder.otp}</strong> (₹{activeOrder.total})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleEditOrder}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-emerald-300 bg-surface text-brand font-semibold text-xs hover:bg-emerald-50 min-h-[36px]"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Order</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('ticket')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-brand text-surface font-semibold text-xs hover:bg-brand-hover min-h-[36px]"
              >
                <span>View Full Ticket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <StoreSwitcher activeShop={activeShop} onSelectShop={setActiveShop} />

      <main className="flex-1 pb-16">
        {currentView === 'ticket' && activeOrder ? (
          <div className="py-4">
            <OtpTicket
              order={activeOrder}
              onBackToCatalog={() => setCurrentView('catalog')}
              onEditOrder={handleEditOrder}
              onCancelOrder={handleCancelOrder}
            />
          </div>
        ) : (
          <>
            <Hero
              onBrowseClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
              onHowItWorksClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            />

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
                  <p className="text-sm text-textMuted mt-1">Try searching for a different item.</p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setActiveShop('ALL'); }}
                    className="mt-4 px-4 py-2 bg-surface text-brand border border-brand rounded-lg text-sm font-semibold hover:bg-brand hover:text-surface transition-colors min-h-[44px]"
                  >
                    Reset Filters
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

      {/* Floating Bottom Cart Bar */}
      <CartBar
        totalItems={totalItems}
        subtotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Modal */}
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
