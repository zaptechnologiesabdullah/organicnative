import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

export default function ShopPage() {
  const { products, addToCart, wishlist, toggleWishlist } = useShop();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat');

  const [selectedCategory, setSelectedCategory] = useState(
    initialCat === 'chilli' ? 'Chilli & Pepper' :
    initialCat === 'whole' ? 'Whole Spices' :
    initialCat === 'seasonings' ? 'Heirloom Seasonings' : 'All'
  );
  const [selectedHeat, setSelectedHeat] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAdd = (p) => {
    addToCart(p, 1, p.weight);
    setToastMessage(`Added ${p.name} to your cart`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedHeat !== 'All') {
        if (selectedHeat === 'Mild' && p.heatLevel > 1) return false;
        if (selectedHeat === 'Medium' && (p.heatLevel < 2 || p.heatLevel > 3)) return false;
        if (selectedHeat === 'Fiery' && p.heatLevel < 4) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [products, selectedCategory, selectedHeat, sortBy]);

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-label-md">{toastMessage}</span>
        </div>
      )}

      <main className="w-full pt-20 bg-background flex-1">
        {/* Page Header & Botanical Context Strip */}
        <section className="w-full bg-surface-container-low px-margin-mobile lg:px-margin pt-space-lg pb-space-xl">
          <div className="max-w-[1360px] mx-auto flex flex-col gap-space-md">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              <span className="text-outline-variant text-[12px]">•</span>
              <span className="text-primary font-semibold">Shop Spices</span>
            </nav>

            {/* Editorial Headline & Terroir Intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg pt-space-xs">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  PAKISTANI HEIRLOOM TERROIR • 2025 HARVEST RESERVES
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
                  Shop All Spices
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 leading-relaxed">
                  Thoughtfully presented single-origin spices, hand-sorted whole botanicals, and fragrant stone-ground regional blends milled at ambient cellar temperatures.
                </p>
              </div>

              {/* Terroir Metric Capsule */}
              <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-surface-container-highest shrink-0">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">eco</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Purity Index</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">100% Unadulterated</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Zero synthetic dyes or starch</span>
                </div>
              </div>
            </div>

            {/* Anti-adulteration honesty banner */}
            <div className="mt-space-sm bg-surface-container-highest/60 rounded-xl p-4 flex items-start sm:items-center gap-3">
              <span className="material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5 sm:mt-0">verified_user</span>
              <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                <strong className="font-semibold text-primary">Authentic purity notice:</strong> Natural colour, density, and grain coarseness naturally fluctuate across smallholder seasonal batches. We never add industrial anti-caking agents, synthetic colouring, or bulking seed husks.
              </p>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
              {['All', 'Everyday Powders', 'Masala Blends', 'Whole Spices', 'Heirloom Seasonings'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-label-lg text-label-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
                  }`}
                  type="button"
                >
                  {cat === 'All' ? 'All Spices' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Pillar Strip */}
        <section className="w-full bg-surface-container-lowest border-y border-surface-container-highest px-margin-mobile lg:px-margin py-6">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">file_copy</span>
              </div>
              <div>
                <h2 className="font-title-md text-title-md text-primary">Small-Batch Ground</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Stone-milled at low temperatures to retain volatile oils.</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">filter_vintage</span>
              </div>
              <div>
                <h2 className="font-title-md text-title-md text-primary">No Colours or Fillers</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Authentic botanical provenance without industrial dyes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
              </div>
              <div>
                <h2 className="font-title-md text-title-md text-primary">Triple-Sealed Pouches</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Food-grade oxygen barrier foils with heavy-gauge zips.</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
              <div>
                <h2 className="font-title-md text-title-md text-primary">COD Across Pakistan</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Inspect parcel upon arrival; fast doorstep courier delivery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Main: Filters Sidebar + Grid */}
        <div className="w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-surface-container-highest">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-primary font-label-lg rounded-lg border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Filter Products
            </button>
            <span className="font-body-sm text-on-surface-variant">
              Showing {filteredProducts.length} items
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Filter Sidebar */}
            <aside className={`w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-highest shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label-lg text-label-lg font-bold text-primary uppercase tracking-wider">Active Filters</span>
                  <button
                    onClick={() => { setSelectedCategory('All'); setSelectedHeat('All'); }}
                    className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-on-surface font-body-sm text-body-sm">
                    {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                  </span>
                  {selectedHeat !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-on-surface font-body-sm text-body-sm">
                      Heat: {selectedHeat}
                    </span>
                  )}
                </div>
              </div>

              {/* Category Filter Group */}
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-highest shadow-sm space-y-4">
                <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-bold">Category</h3>
                <div className="space-y-2">
                  {['All', 'Everyday Powders', 'Masala Blends', 'Whole Spices', 'Heirloom Seasonings'].map(c => (
                    <label key={c} className="flex items-center justify-between cursor-pointer group">
                      <span className="flex items-center gap-2.5 font-body-sm text-on-surface group-hover:text-primary">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === c}
                          onChange={() => setSelectedCategory(c)}
                          className="w-4 h-4 text-primary accent-primary"
                        />
                        {c}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="pt-4 border-t border-surface-container-highest">
                  <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-bold mb-3">Heat Profile</h3>
                  <div className="space-y-2">
                    {['All', 'Mild', 'Medium', 'Fiery'].map(h => (
                      <label key={h} className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2.5 font-body-sm text-on-surface group-hover:text-primary">
                          <input
                            type="radio"
                            name="heat"
                            checked={selectedHeat === h}
                            onChange={() => setSelectedHeat(h)}
                            className="w-4 h-4 text-primary accent-primary"
                          />
                          {h}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products List & Sorting Grid */}
            <div className="flex-1 w-full">
              {/* Controls Header */}
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-highest mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  Showing <strong className="text-primary font-semibold">{filteredProducts.length}</strong> single-origin spices
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface-container-low px-3 py-1.5 rounded-lg text-body-sm border border-surface-container-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="featured">Featured Harvests</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="bg-surface-container-lowest rounded-xl p-4 lg:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative group border border-surface-container-highest/60"
                  >
                    <button
                      aria-label="Wishlist"
                      onClick={() => toggleWishlist(prod.id)}
                      className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface/80 flex items-center justify-center transition-colors cursor-pointer ${
                        wishlist[prod.id] ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={wishlist[prod.id] ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </span>
                    </button>

                    <div>
                      <Link to={`/product/${prod.id}`} className="block relative w-full aspect-[4/5] bg-surface-container-low rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={prod.name}
                          src={prod.img}
                        />
                        <span className="absolute bottom-2 left-2 bg-surface/90 text-on-surface font-label-sm text-[10px] px-2 py-0.5 rounded font-bold">
                          {prod.weight}
                        </span>
                      </Link>

                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-label-sm text-[11px] font-bold uppercase tracking-wider ${prod.tagColor}`}>
                          {prod.tag}
                        </span>
                        <div className="flex items-center text-secondary text-[12px]">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="ml-1 font-bold">{prod.rating}</span>
                        </div>
                      </div>

                      <Link to={`/product/${prod.id}`}>
                        <h3 className="font-headline-sm text-[17px] text-on-surface font-semibold mb-1 leading-snug hover:text-primary transition-colors">
                          {prod.name}
                        </h3>
                      </Link>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-1">
                        {prod.subtitle}
                      </p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant/75 mb-3">
                        Origin: {prod.origin}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-surface-container-high/60">
                      <div>
                        <span className="font-price-md text-price-md text-primary font-bold">Rs. {prod.price}</span>
                      </div>
                      <button
                        onClick={() => handleAdd(prod)}
                        className="px-3 py-1.5 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-primary-container transition-colors flex items-center gap-1 cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span> Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
