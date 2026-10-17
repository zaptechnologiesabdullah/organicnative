import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function RightActionSidebar() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    wishlist,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    isCartBumping,
    flyingPackets,
    setSearchQuery,
  } = useShop();

  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [conciergeModalOpen, setConciergeModalOpen] = useState(false);

  const wishlistCount = Object.values(wishlist).filter(Boolean).length;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchModalOpen(false);
      setSearchInput('');
    }
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchModalOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── 1. FLYING PACKETS PORTAL (ANIMATED CLONES FLYING INTO CART) ── */}
      {flyingPackets.map((packet) => (
        <div
          key={packet.id}
          className="fixed pointer-events-none z-[9999] animate-fly-packet select-none"
          style={{
            left: `${packet.startX - 32}px`,
            top: `${packet.startY - 42}px`,
            width: '64px',
            height: '84px',
            '--target-x': `${packet.deltaX}px`,
            '--target-y': `${packet.deltaY}px`,
          }}
        >
          <img
            src={packet.img}
            alt="Flying Packet"
            className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(18,52,32,0.45)] filter brightness-105"
          />
          <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-sm -z-10 animate-pulse" />
        </div>
      ))}

      {/* ── 2. VERTICAL RIGHT ACTION DOCK (RIGHT CENTER AS USER DRAWN) ── */}
      <aside 
        aria-label="Quick Action Dock" 
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
      >
        <div className="bg-[#FAF7F0]/95 backdrop-blur-xl border border-[#e8ddca] shadow-[0_12px_36px_rgba(18,52,32,0.16)] rounded-full p-2 sm:p-2.5 flex flex-col items-center gap-3 animate-dock-glow">
          
          {/* Action 1: Search Button */}
          <div className="relative group">
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Quick Search"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[#123420] hover:bg-[#123420] hover:text-white transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer active:scale-95 bg-white/80"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#123420] text-white text-[11px] font-mono rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200">
              Quick Search
            </span>
          </div>

          {/* Action 2: Wishlist Button */}
          <div className="relative group">
            <button
              onClick={() => navigate('/shop')}
              aria-label="Wishlist"
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[#94492c] hover:bg-[#94492c] hover:text-white transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer active:scale-95 bg-white/80"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#94492c] text-white font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>
            <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#94492c] text-white text-[11px] font-mono rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200">
              Wishlist ({wishlistCount})
            </span>
          </div>

          {/* Action 3: Floating Cart Target (#floating-cart-target) */}
          <div className="relative group">
            <button
              id="floating-cart-target"
              onClick={() => setIsCartDrawerOpen(!isCartDrawerOpen)}
              aria-label="Reserve Bag"
              className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
                isCartBumping
                  ? 'animate-cart-bump bg-[#c5ecce] text-[#123420] ring-4 ring-amber-400 shadow-xl'
                  : 'bg-[#123420] text-white hover:bg-[#1b432a] hover:scale-105'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="absolute -top-1.5 -right-1.5 bg-[#94492c] text-white font-mono text-[10.5px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#FAF7F0] shadow-sm">
                {cartCount}
              </span>
            </button>
            <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#123420] text-white text-[11.5px] font-sans font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200 flex items-center gap-2">
              <span className="font-serif font-bold text-amber-300">Rs. {cartSubtotal}</span>
              <span className="opacity-80">• View Bag</span>
            </span>
          </div>

          <div className="w-6 h-px bg-[#e8ddca]" />

          {/* Action 4: Sommelier Concierge */}
          <div className="relative group">
            <button
              onClick={() => setConciergeModalOpen(true)}
              aria-label="Spice Sommelier Concierge"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[#424842] hover:text-[#123420] hover:bg-[#c5ecce]/40 transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer active:scale-95 bg-white/80"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-[#94492c]">support_agent</span>
            </button>
            <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#123420] text-white text-[11px] font-mono rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200">
              Spice Concierge
            </span>
          </div>

          {/* Action 5: Scroll to Top */}
          <div className="relative group">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to Top"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#424842] hover:text-[#123420] hover:bg-white transition-all duration-300 cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">arrow_upward</span>
            </button>
            <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#123420] text-white text-[11px] font-mono rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-200">
              Back to Top
            </span>
          </div>

        </div>
      </aside>

      {/* ── 3. SLIDE-OVER CART DRAWER ── */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF7F0] border-l border-[#e8ddca] shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 bg-white border-b border-[#e8ddca] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#123420]">shopping_bag</span>
                    <h2 className="font-serif text-[20px] font-bold text-[#123420]">
                      Your Reserve Bag
                    </h2>
                  </div>
                  <p className="text-[11.5px] font-mono text-[#94492c] uppercase tracking-wider mt-0.5">
                    {cartCount} Hand-Milled Item{cartCount === 1 ? '' : 's'} Selected
                  </p>
                </div>

                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#FAF7F0] hover:bg-[#e8ddca]/60 text-[#424842] hover:text-[#123420] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Free Nationwide Delivery Progress Bar */}
              <div className="px-5 py-3.5 bg-[#FAF7F0] border-b border-[#e8ddca]/80">
                <div className="flex items-center justify-between text-[11.5px] mb-1.5 font-medium">
                  {cartSubtotal >= freeShippingThreshold ? (
                    <span className="text-[#123420] font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#123420]">verified</span>
                      Complimentary Nationwide Delivery Unlocked!
                    </span>
                  ) : (
                    <span className="text-[#424842]">
                      Add <strong className="text-[#94492c] font-mono">Rs. {freeShippingThreshold - cartSubtotal}</strong> for Free Nationwide Delivery
                    </span>
                  )}
                  <span className="font-mono text-[10.5px] text-[#94492c]">Rs. 2,500</span>
                </div>
                <div className="w-full h-1.5 bg-[#e8ddca] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#94492c] to-[#123420] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Drawer Item List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#FAF7F0] border border-[#e8ddca] flex items-center justify-center text-[#94492c] mb-3">
                      <span className="material-symbols-outlined text-[28px]">shopping_basket</span>
                    </div>
                    <p className="font-serif text-[18px] text-[#123420] font-semibold">Your bag is empty</p>
                    <p className="text-[12.5px] text-[#424842] max-w-xs mt-1">
                      Explore our unadulterated single-estate spice harvest milled on cold granite.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigate('/shop');
                      }}
                      className="mt-5 px-5 py-2.5 bg-[#123420] text-white rounded-xl font-label-md font-medium text-[13px] hover:bg-[#1b432a] transition-colors cursor-pointer"
                    >
                      Browse Heritage Spices
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div 
                      key={`${item.product.id}-${item.size}-${idx}`}
                      className="bg-white p-3.5 rounded-2xl border border-[#e8ddca] shadow-2xs flex gap-3.5 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#FAF7F0] border border-[#e8ddca] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        <img 
                          src={item.product.img} 
                          alt={item.product.name || item.product.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-[14px] text-[#123420] truncate">
                          {item.product.name || item.product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-mono text-[#94492c] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#e8ddca]">
                            {item.size}
                          </span>
                          <span className="text-[11.5px] font-mono text-[#424842]">
                            Rs. {item.product.price}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-[#FAF7F0] border border-[#e8ddca] rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-[#424842] hover:text-[#123420] hover:bg-[#e8ddca]/50 rounded-l cursor-pointer text-[14px]"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-7 text-center font-mono text-[12px] font-semibold text-[#123420]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#424842] hover:text-[#123420] hover:bg-[#e8ddca]/50 rounded-r cursor-pointer text-[14px]"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-[14px] text-[#123420]">
                              Rs. {item.product.price * item.quantity}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[#ba1a1a] hover:text-red-700 p-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 bg-white border-t border-[#e8ddca] space-y-3">
                  <div className="space-y-1.5 text-[13px]">
                    <div className="flex justify-between text-[#424842]">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium">Rs. {cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#424842]">
                      <span>Nationwide Delivery</span>
                      <span className="font-mono font-medium">
                        {deliveryFee === 0 ? (
                          <span className="text-[#123420] font-bold">FREE</span>
                        ) : (
                          `Rs. ${deliveryFee}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between font-serif text-[17px] font-bold text-[#123420] pt-2 border-t border-[#e8ddca]">
                      <span>Total</span>
                      <span>Rs. {cartTotal}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigate('/checkout');
                      }}
                      className="w-full py-3 bg-[#123420] hover:bg-[#1b432a] text-white rounded-xl font-label-md font-semibold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(18,52,32,0.25)] transition-all cursor-pointer"
                    >
                      <span>Proceed to Reserve Checkout</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigate('/cart');
                      }}
                      className="w-full py-2 bg-[#FAF7F0] hover:bg-[#e8ddca]/60 text-[#123420] rounded-xl font-label-sm font-medium text-[12.5px] text-center border border-[#e8ddca] transition-colors cursor-pointer"
                    >
                      View Full Bag Details
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── 4. QUICK SEARCH MODAL OVERLAY ── */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF7F0] rounded-2xl border border-[#e8ddca] shadow-2xl p-5 overflow-hidden animate-slide-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8ddca]">
              <span className="font-serif font-bold text-[#123420] text-[16px]">
                Search Reserve Spices &amp; Blends
              </span>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#424842] hover:text-[#123420] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 flex items-center gap-2">
              <div className="flex-1 flex items-center bg-white px-3.5 py-2.5 rounded-xl border border-[#e8ddca] focus-within:ring-2 focus-within:ring-[#123420]">
                <span className="material-symbols-outlined text-[20px] text-[#123420] mr-2">search</span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g. Garam Masala, Kunri Chilli, Haldi, Zeera..."
                  className="w-full bg-transparent outline-none text-[13.5px] text-[#1a1c17] placeholder:text-[#424842]/50 font-body-sm"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#123420] text-white rounded-xl font-label-sm font-semibold text-[13px] hover:bg-[#1b432a] cursor-pointer"
              >
                Search
              </button>
            </form>

            <div className="mt-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#94492c] block mb-2 font-bold">
                Popular Discoveries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Garam Masala', 'Kunri Chilli', 'Kasur Haldi', 'Royal Zeera', 'Tellicherry Pepper', 'Biryani Masala'].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="px-3 py-1 bg-white hover:bg-[#123420] hover:text-white rounded-lg text-[12px] text-[#424842] border border-[#e8ddca] transition-colors cursor-pointer font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. SPICE SOMMELIER CONCIERGE MODAL ── */}
      {conciergeModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAF7F0] rounded-2xl border border-[#e8ddca] shadow-2xl p-6 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8ddca]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#123420] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[16px] text-[#123420]">
                    Spice Sommelier Concierge
                  </h3>
                  <p className="text-[11px] text-[#94492c] font-mono">
                    Direct Artisan Advisory • Lahore &amp; Karachi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConciergeModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#424842] hover:text-[#123420] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-[13px] text-[#424842] leading-relaxed">
                Need guidance on single-estate spice selection, Degi recipes, or corporate gift boxes? Our master blenders are at your service.
              </p>

              <div className="p-3 bg-white rounded-xl border border-[#e8ddca] flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#94492c] font-bold">Toll-Free Helpline</p>
                  <p className="font-mono font-bold text-[#123420] text-[14px]">+92 (042) 111-628-483</p>
                </div>
                <span className="text-[10px] bg-[#c5ecce] text-[#123420] px-2 py-0.5 rounded-full font-bold">
                  9 AM - 9 PM PKT
                </span>
              </div>

              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#123420] hover:bg-[#1b432a] text-white rounded-xl font-label-md font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Live Chat</span>
              </a>

              <button
                onClick={() => {
                  setConciergeModalOpen(false);
                  navigate('/contact');
                }}
                className="w-full py-2 bg-transparent text-[#424842] hover:text-[#123420] text-[12px] font-medium text-center underline cursor-pointer"
              >
                Visit Experience Hubs &amp; Mill Locations
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
