import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useShop();

  const product = products.find(p => p.id === Number(id)) || products[0];

  const [selectedSize, setSelectedSize] = useState('200g Pouch');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('usage');
  const [toast, setToast] = useState('');

  const sizes = [
    { label: '100g Pouch', priceOffset: -120 },
    { label: '200g Pouch', priceOffset: 0 },
    { label: '500g Glass Jar', priceOffset: 450 },
  ];

  const currentPrice = product.price + (sizes.find(s => s.label === selectedSize)?.priceOffset || 0);

  const handleAdd = () => {
    addToCart({ ...product, price: currentPrice }, quantity, selectedSize);
    setToast(`Added ${quantity}x ${product.name} (${selectedSize}) to bag!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, price: currentPrice }, quantity, selectedSize);
    navigate('/checkout');
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
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-8 lg:py-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant mb-8">
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span>•</span>
            <Link className="hover:text-primary transition-colors" to="/shop">Shop</Link>
            <span>•</span>
            <Link className="hover:text-primary transition-colors" to="/categories">Blends</Link>
            <span>•</span>
            <span className="text-primary font-semibold">{product.name}</span>
          </nav>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Product Images View */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden border border-surface-container-highest shadow-sm">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                  AUTUMN 2025 HARVEST
                </span>
                <span className="absolute bottom-4 left-4 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-3 py-1 rounded-md font-bold">
                  100% UNADULTERATED
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/90 flex items-center justify-center text-on-surface-variant hover:text-secondary shadow cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={wishlist[product.id] ? { fontVariationSettings: "'FILL' 1", color: '#94492c' } : {}}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary cursor-pointer bg-surface-container-low">
                  <img src={product.img} alt="Front View" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border border-surface-container-highest opacity-75 hover:opacity-100 cursor-pointer bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[32px] text-primary">eco</span>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border border-surface-container-highest opacity-75 hover:opacity-100 cursor-pointer bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[32px] text-secondary">verified</span>
                </div>
              </div>
            </div>

            {/* Right: Product Actions & Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    {product.tag}
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-body-sm text-[13px] text-tertiary font-bold">
                    {product.urduName}
                  </span>
                </div>

                <h1 className="font-headline-lg text-headline-md lg:text-headline-lg text-on-surface font-semibold mb-2">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {product.rating} ({product.reviewsCount} verified reviews)
                  </span>
                </div>

                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {product.subtitle}. Hand-blended using 11 slow dry-roasted whole spices formulated to impart warm aristocratic aroma to curries, gravies, and braises without bitter aftertaste.
                </p>
              </div>

              {/* Price Lockup */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest flex items-baseline gap-4">
                <span className="font-price-lg text-price-lg text-primary font-bold">
                  Rs. {currentPrice}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                  Rs. {currentPrice + 120}
                </span>
                <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] px-2 py-0.5 rounded font-bold">
                  Save Rs. 120
                </span>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-bold mb-2">
                  Select Pack Size: <span className="text-primary font-normal">{selectedSize}</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map(s => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(s.label)}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        selectedSize === s.label
                          ? 'border-primary bg-primary text-on-primary shadow-sm font-bold'
                          : 'border-surface-container-highest bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                      }`}
                      type="button"
                    >
                      <div className="font-label-md text-[13px]">{s.label}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">Rs. {product.price + s.priceOffset}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTAs */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-surface-container-highest rounded-lg bg-surface-container-lowest">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-2 text-on-surface hover:text-primary transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-label-lg font-bold min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-2 text-on-surface hover:text-primary transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-6 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    Add to Bag • Rs. {currentPrice * quantity}
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-6 bg-secondary text-on-secondary rounded-lg font-label-lg text-label-lg hover:opacity-90 transition-opacity font-bold shadow cursor-pointer"
                  type="button"
                >
                  Buy Now with Cash on Delivery
                </button>
              </div>

              {/* Purity & Shipping Guarantee Highlights */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest space-y-3 text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                  <span>Free Courier Delivery over <strong>Rs. 2,500</strong> across all Pakistan cities</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
                  <span>Cash on Delivery (COD) &amp; Bank Transfer accepted</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
                  <span>Airtight multilayer foil pouch with zip reseal</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ORIGIN & AROMA NOTES DRAWER (Domain Specific Component) ── */}
          <section className="mt-16 bg-surface-container-low rounded-2xl p-6 lg:p-10 border border-surface-container-highest">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="border-b border-surface-container-highest pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="font-label-sm text-secondary uppercase tracking-widest font-bold">
                    DOMAIN TASTING METRICS
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-primary mt-1">
                    Aroma, Terroir &amp; Sensorial Profile
                  </h2>
                </div>
                <span className="font-label-sm bg-surface px-3 py-1 rounded-full text-on-surface-variant font-semibold">
                  Milled: October 2025
                </span>
              </div>

              {/* Tasting Scales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-highest">
                  <h4 className="font-title-md text-primary font-bold mb-2">Aroma Intensity</h4>
                  <div className="space-y-2 text-body-sm">
                    <div className="flex justify-between">
                      <span>Woody &amp; Clove</span>
                      <strong className="text-secondary">High (90%)</strong>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-highest">
                  <h4 className="font-title-md text-primary font-bold mb-2">Heat Index</h4>
                  <div className="space-y-2 text-body-sm">
                    <div className="flex justify-between">
                      <span>Pod Rating</span>
                      <strong className="text-primary">{product.heatLevel} / 5 Pods</strong>
                    </div>
                    <div className="flex gap-1 text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[20px]"
                          style={i < product.heatLevel ? { fontVariationSettings: "'FILL' 1" } : { opacity: 0.2 }}
                        >
                          local_fire_department
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-highest">
                  <h4 className="font-title-md text-primary font-bold mb-2">Terroir &amp; Origin</h4>
                  <p className="font-body-sm text-on-surface-variant mb-1">
                    <strong>Cluster:</strong> {product.origin}
                  </p>
                  <p className="font-body-sm text-on-surface-variant">
                    <strong>Co-op:</strong> Indus Valley Smallholders
                  </p>
                </div>
              </div>

              {/* Formulation Formula */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-highest">
                <h4 className="font-title-md text-primary font-bold mb-3">
                  Heirloom 11-Spice Formulation
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Green Cardamom', 'Black Cardamom', 'Cinnamon Quills', 'Cloves', 'Star Anise', 'Mace Blades', 'Nutmeg', 'Royal White Cumin', 'Black Peppercorn', 'Coriander Seeds', 'Tej Patta'].map(spice => (
                    <span key={spice} className="px-3 py-1 bg-surface-container text-primary font-label-sm text-[12px] rounded-full border border-surface-container-highest font-medium">
                      {spice}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── TABS: Culinary Usage & Reviews ── */}
          <section className="mt-12">
            <div className="border-b border-surface-container-highest flex gap-8">
              <button
                onClick={() => setActiveTab('usage')}
                className={`pb-4 font-title-md text-title-md transition-colors cursor-pointer ${
                  activeTab === 'usage'
                    ? 'border-b-2 border-primary text-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Culinary Usage &amp; Tadka Guide
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 font-title-md text-title-md transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary text-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Customer Reviews ({product.reviewsCount})
              </button>
            </div>

            <div className="py-8">
              {activeTab === 'usage' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-headline-sm text-headline-sm text-primary">How to Use for Optimal Aroma</h3>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      Unlike raw ground powders which must be fried early in oil, our stone-roasted Garam Masala is already pan-toasted. Add 1/2 to 1 teaspoon during the final 5 minutes of simmering or sprinkle over hot sizzling desi ghee tadka right before serving.
                    </p>
                    <ul className="space-y-2 font-body-sm text-on-surface list-disc pl-5">
                      <li><strong>Qormas &amp; Salans:</strong> Stir in right after taking off the flame; seal lid for 5 minutes.</li>
                      <li><strong>Dal &amp; Sabzi:</strong> Bloom in warm desi ghee alongside fresh sliced ginger.</li>
                      <li><strong>Pulao &amp; Rice:</strong> Scatter over dum before sealing the pot.</li>
                    </ul>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-xl border border-surface-container-highest">
                    <h4 className="font-title-md text-primary font-bold mb-2">Proper Kitchen Storage</h4>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed mb-4">
                      Always seal the inner ziplock immediately after scooping. Keep away from boiling stovetop steam to prevent humidity clumping. Shelf life: 12 months in a cool, dark cupboard.
                    </p>
                    <div className="flex items-center gap-2 text-secondary font-label-sm font-bold">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      NO PRESERVATIVES OR ARTIFICIAL BULKERS
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 max-w-3xl">
                  <div className="p-5 bg-surface-container-lowest rounded-xl border border-surface-container-highest">
                    <div className="flex items-center gap-1 text-secondary mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="font-headline-sm text-[16px] italic text-on-surface mb-2">
                      “The fragrant aroma fills the house the second the pouch is unsealed. The cardamom and mace ratios are perfect.”
                    </p>
                    <span className="font-label-sm text-on-surface-variant">Ayesha M. — Verified Buyer, DHA Lahore</span>
                  </div>

                  <div className="p-5 bg-surface-container-lowest rounded-xl border border-surface-container-highest">
                    <div className="flex items-center gap-1 text-secondary mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="font-headline-sm text-[16px] italic text-on-surface mb-2">
                      “Real stone ground texture with visible coarse spices. No red dye or cheap coriander bulkers.”
                    </p>
                    <span className="font-label-sm text-on-surface-variant">Tariq R. — Verified Buyer, Islamabad</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
