import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const { products, addToCart, wishlist, toggleWishlist } = useShop();
  const [toast, setToast] = useState('');

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const results = products.filter(p => {
    if (!queryParam.trim()) return true;
    const term = queryParam.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.subtitle.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.origin.toLowerCase().includes(term) ||
      (p.urduName && p.urduName.includes(term))
    );
  });

  const handleAdd = (p) => {
    addToCart(p, 1, p.weight);
    setToast(`Added ${p.name} to your cart`);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-label-md">{toast}</span>
        </div>
      )}

      <main className="w-full pt-20 bg-background flex-1">
        {/* Search Header Banner */}
        <section className="bg-surface-container-low py-10 lg:py-14 border-b border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
            <nav className="flex items-center gap-2 font-body-sm text-on-surface-variant mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>•</span>
              <span className="text-primary font-semibold">Search Results</span>
            </nav>

            <div className="max-w-2xl">
              <span className="font-label-sm uppercase tracking-widest text-secondary font-bold">
                PANTRY CATALOG SEARCH
              </span>
              <h1 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary mt-1 mb-4">
                {queryParam ? `Search Results for “${queryParam}”` : 'Search Our Spice Collection'}
              </h1>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 flex items-center bg-surface-container-lowest px-4 py-2.5 rounded-lg border border-surface-container-highest shadow-sm">
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant mr-2">search</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search e.g. garam masala, haldi, zeera, chilli..."
                    className="w-full bg-transparent outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/60"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Results Container */}
        <section className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-12">
          {results.length > 0 ? (
            <div>
              <div className="mb-6 font-body-sm text-on-surface-variant flex items-center justify-between">
                <span>Found <strong className="text-primary font-bold">{results.length}</strong> single-origin matches</span>
                <Link to="/shop" className="text-secondary font-label-sm font-bold hover:underline">
                  View All Spices →
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {results.map(prod => (
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

                      <div className={`mb-1 ${prod.tagColor} font-label-sm text-[11px] font-bold uppercase tracking-wider`}>
                        {prod.tag}
                      </div>

                      <Link to={`/product/${prod.id}`}>
                        <h3 className="font-headline-sm text-[17px] text-on-surface font-semibold mb-1 leading-snug hover:text-primary transition-colors">
                          {prod.name}
                        </h3>
                      </Link>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-3">
                        {prod.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-surface-container-high/60">
                      <span className="font-price-md text-price-md text-primary font-bold">Rs. {prod.price}</span>
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
          ) : (
            /* No Results Empty State matching Stitch Screen d2aa64e1 */
            <div className="max-w-xl mx-auto text-center py-16 space-y-6 bg-surface-container-lowest p-8 rounded-2xl border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined text-[54px] text-primary/40">search_off</span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  No Harvests Found for “{queryParam}”
                </h2>
                <p className="font-body-md text-on-surface-variant mt-2">
                  We could not find any single-origin spices matching your search term. Check spelling or try browsing our primary pantry categories.
                </p>
              </div>

              <div className="pt-4 border-t border-surface-container-highest">
                <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold block mb-3">
                  Popular Searches
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {['Garam Masala', 'Red Chilli', 'Turmeric', 'Cumin Seeds', 'Biryani'].map(term => (
                    <button
                      key={term}
                      onClick={() => setSearchParams({ q: term })}
                      className="px-3.5 py-1.5 bg-surface-container-low hover:bg-surface-container text-primary font-label-sm rounded-full transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-primary text-on-primary rounded-lg font-label-lg font-bold shadow hover:bg-primary-container transition-colors"
              >
                Explore Full Pantry Catalog
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
