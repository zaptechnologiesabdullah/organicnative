import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1WRl8-BPfBHSoiy5_me7YQmorxgpq7WPX4SJeaDc7eRoQr80O3Q-KPlxYV0iqTng3bCwXA7gXtoKYpfC-o5hHCEejlaB9JPc5_jJ9diwtCiZmLXFMD5Err6zwj96951yNGIeBlr2FNl9jm2nAUkWxi8G8EZUdAJHc29IID-q1Cf04EptcC5KITlTRPWoeAFTKjn1r9cvseOsdPYMDHsp5r-W-lIkA9sim6XM45x1u620tP7ahbP5J5f1fI6";

export default function Navbar() {
  const { cartCount, wishlist, searchQuery, setSearchQuery, setIsCartDrawerOpen } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      navigate(`/search?q=${encodeURIComponent(localSearch.trim())}`);
      setSearchOpen(false);
    }
  };

  // Concise luxury navigation items
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Masala Blends', path: '/categories' },
    { name: 'Our Heritage', path: '/about' },
    { name: 'Experience Hubs', path: '/contact' },
    { name: 'Purity & FAQs', path: '/faq' },
  ];

  const wishlistCount = Object.values(wishlist).filter(Boolean).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Top Announcement Bar (Strictly One Line, Completely Static & Peaceful, Zero Motion) ── */}
      <div className="bg-[#123420] text-[#f4f4eb] font-label-sm text-[10.5px] sm:text-[11px] py-2 px-3 sm:px-4 border-b border-[#294b35]/60 select-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-3 sm:gap-6 whitespace-nowrap flex-nowrap overflow-hidden">
          <span className="font-semibold text-secondary-fixed tracking-[0.2em] uppercase shrink-0">AUTUMN 2025 HARVEST RESERVE</span>
          <span className="opacity-30 hidden sm:inline shrink-0">•</span>
          <span className="hidden sm:inline tracking-[0.16em] uppercase shrink-0">FREE NATIONWIDE DELIVERY ACROSS PAKISTAN OVER RS. 2,500</span>
          <span className="opacity-30 hidden lg:inline shrink-0">•</span>
          <span className="hidden lg:inline tracking-[0.16em] uppercase shrink-0 text-[#c5ecce]">100% UNADULTERATED SINGLE-ESTATE SPICES</span>
        </div>
      </div>

      {/* ── Main Navigation Bar (Strictly One Line, No Text Wrapping Ever) ── */}
      <div
        className={`w-full transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#fafaf0]/98 backdrop-blur-md shadow-[0_8px_25px_-6px_rgba(18,52,32,0.08)] border-b border-[#e8ddca]'
            : 'bg-[#fafaf0] shadow-[0_1px_4px_rgba(18,52,32,0.04)] border-b border-[#e8ddca]/80'
        }`}
      >
        <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-8 whitespace-nowrap flex-nowrap">
          
          {/* Brand Logo Lockup */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group select-none whitespace-nowrap"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-low border border-[#e8ddca] flex items-center justify-center p-1.5 shadow-2xs group-hover:border-[#123420]/40 transition-colors shrink-0">
              <img
                alt="Organic Native Logo"
                className="w-full h-full object-contain"
                src={LOGO_URL}
              />
            </div>
            <div className="flex flex-col whitespace-nowrap shrink-0">
              <span className="font-serif text-[20px] sm:text-[22px] text-[#123420] tracking-tight font-semibold leading-tight whitespace-nowrap">
                Organic Native
              </span>
              <span className="font-label-sm text-[8.5px] sm:text-[9px] text-[#94492c] tracking-[0.24em] uppercase font-bold whitespace-nowrap">
                Single-Origin Terroir
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (STRICTLY ONE LINE, NO WRAPPING) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 whitespace-nowrap flex-nowrap">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-[13px] xl:text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#123420] font-bold bg-[#123420]/8 shadow-2xs'
                      : 'text-[#424842] hover:text-[#123420] hover:bg-surface-container-low'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Streamlined Right Controls (Actions docked in Right Sidebar) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap flex-nowrap">
            
            {/* Quick Bag Trigger Pill */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Open Reserve Bag"
              className="inline-flex items-center gap-2 py-1.5 px-3 sm:px-4 rounded-full bg-[#123420] text-white hover:bg-[#1b432a] transition-all text-[12.5px] font-medium shadow-xs cursor-pointer group"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px] text-[#c5ecce]">shopping_bag</span>
              <span className="hidden sm:inline font-sans font-semibold">Reserve Bag</span>
              <span className="bg-[#94492c] text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1a1c17] hover:text-[#123420] rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="md:hidden bg-[#fafaf0] px-4 py-3 border-t border-[#e8ddca]">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search spices, e.g. garam masala..."
                className="flex-1 bg-surface-container-low px-3.5 py-2 rounded-lg text-body-sm outline-none text-on-surface border border-[#e8ddca]"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#123420] text-white rounded-lg font-label-sm font-bold shadow"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Sliding Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fafaf0] border-b border-[#e8ddca] px-6 py-5 shadow-2xl space-y-4">
            <div className="flex flex-col divide-y divide-[#e8ddca]/60">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 text-body-md font-semibold transition-colors flex items-center justify-between ${
                      isActive ? 'text-[#123420] font-bold' : 'text-[#424842] hover:text-[#123420]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="material-symbols-outlined text-[18px] opacity-60">chevron_right</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 bg-[#123420] text-white rounded-lg font-label-md text-center font-bold flex items-center justify-center gap-2 shadow"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                View Bag ({cartCount} items)
              </Link>
              <div className="p-3 bg-surface-container-low rounded-lg text-[12px] text-on-surface-variant flex items-center justify-between">
                <span>Helpline:</span>
                <strong className="text-[#123420] font-mono">+92 (042) 111-628-483</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
