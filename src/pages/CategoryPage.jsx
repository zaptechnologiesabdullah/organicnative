import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

const BLENDS = [
  {
    id: 1,
    name: 'Garam Masala Powder',
    urdu: 'گرم مصالحہ پاؤڈر',
    subtitle: 'Heritage 11-spice slow roast blend',
    tag: 'HERITAGE BLEND',
    tagColor: 'text-tertiary',
    price: 450,
    weight: '200g Pouch',
    origin: 'Multan & Peshawar',
    roastProfile: 'Slow Dry Pan-Roasted',
    rating: 4.9,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMFIrGJU6BMzFc2_kJbRIvWRDcXaXf83GReCl3HH2RMP2VYlGrk42FAKht5fZNs4OWJBkLvhA0DoqrixNIiYsmQCCk-58jIvWsoOCAAGPgKrv4OCTxvmXY6cGnY9F6uAjycoUsclsEOkM9b6B6GNNOztwTTGWlmWheKU4BuLHEGx8SmEUYaZ2hRYigH8GF9oOEhgQ90pAlCJIcj82Q0zvahmy0GGJViEl2BRzhuluk6jclNjAIbnYYdA',
  },
  {
    id: 7,
    name: 'Traditional Biryani Masala',
    urdu: 'شاہی بریانی مصالحہ',
    subtitle: 'Nutmeg, mace, dried plum & handpicked whole spices',
    tag: 'ROYAL RECIPE',
    tagColor: 'text-secondary',
    price: 420,
    weight: '100g Pouch',
    origin: 'Old Lahore Formulary',
    roastProfile: 'Aromatic Whole Infusion',
    rating: 5.0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnYiEi6M-ZQAJ-sYvwA-Nh1BeArzEZvQ_cT0qHYYNWMoKarlzvWCiLZgO-hJ3yVv9-SjIi6LXbVLs2AHbJ2JIcrei8CbfS5sIMoytXR1HRvfRPwoF-Eh9o7MprDGG2Y93646YueQvddmoVRr0JEvdha0m1-lAqcOb2nDlN0qz3dQchzURm3SA_6S-szpKPNSdePArO5DTh1dMvdOwBu0-FMyWbm1pMytWHc10szRboqJTrckWn9iIoXA',
  },
  {
    id: 8,
    name: 'Authentic Karahi Masala',
    urdu: 'اصلی کڑاہی مصالحہ',
    subtitle: 'Coarse crushed coriander, black pepper & cumin',
    tag: 'CLAY POT CRAFT',
    tagColor: 'text-primary',
    price: 420,
    weight: '100g Pouch',
    origin: 'Namak Mandi, Peshawar',
    roastProfile: 'Coarse Hand-Cracked',
    rating: 4.8,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc4RJm3Bm25s68soI9euZcax01pP1LUiepkRzoQT1CeUTno4aNRCqIXQGvaAu5CTr2zfDE5CNVAN0NVVCV3Uvxrl185IT-QDw0Toplwbpn-G-U3kgEjYbhHBokmlKzzNYSxX3ccVq4snxiFceEeqZ1FGm6UW6B2jTzwNDIENhtna8O3bc7-u6EegdqQz06yg_PemuVM9YG-0hw8de_bYqc9X4aT_4f-5anvP8TlHM3K6CZ5j-S-t9umw',
  },
  {
    id: 11,
    name: 'Old-Delhi Nihari Masala',
    urdu: 'خاص نہاری مصالحہ',
    subtitle: 'Pipli long pepper, fennel & dried ginger base',
    tag: 'SLOW SIMMER',
    tagColor: 'text-secondary',
    price: 460,
    weight: '150g Pouch',
    origin: 'Mughal Heritage Blend',
    roastProfile: 'Deep Toasted',
    rating: 4.9,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMFIrGJU6BMzFc2_kJbRIvWRDcXaXf83GReCl3HH2RMP2VYlGrk42FAKht5fZNs4OWJBkLvhA0DoqrixNIiYsmQCCk-58jIvWsoOCAAGPgKrv4OCTxvmXY6cGnY9F6uAjycoUsclsEOkM9b6B6GNNOztwTTGWlmWheKU4BuLHEGx8SmEUYaZ2hRYigH8GF9oOEhgQ90pAlCJIcj82Q0zvahmy0GGJViEl2BRzhuluk6jclNjAIbnYYdA',
  },
  {
    id: 12,
    name: 'Shahi Qorma Spice Blend',
    urdu: 'شاہی قورمہ مصالحہ',
    subtitle: 'Golden saffron notes, mace & green cardamom',
    tag: 'FESTIVE HARVEST',
    tagColor: 'text-tertiary',
    price: 480,
    weight: '120g Pouch',
    origin: 'Lahori Dastarkhwan',
    roastProfile: 'Delicate Floral Warmth',
    rating: 4.9,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnYiEi6M-ZQAJ-sYvwA-Nh1BeArzEZvQ_cT0qHYYNWMoKarlzvWCiLZgO-hJ3yVv9-SjIi6LXbVLs2AHbJ2JIcrei8CbfS5sIMoytXR1HRvfRPwoF-Eh9o7MprDGG2Y93646YueQvddmoVRr0JEvdha0m1-lAqcOb2nDlN0qz3dQchzURm3SA_6S-szpKPNSdePArO5DTh1dMvdOwBu0-FMyWbm1pMytWHc10szRboqJTrckWn9iIoXA',
  },
  {
    id: 13,
    name: 'Tawa & Chapli Kebab Spices',
    urdu: 'چپلی کباب مصالحہ',
    subtitle: 'Crushed pomegranate seeds, coriander & carom',
    tag: 'PASHTUN PANTRY',
    tagColor: 'text-primary',
    price: 390,
    weight: '150g Pouch',
    origin: 'Khyber Frontier',
    roastProfile: 'Coarse & Tangy',
    rating: 4.8,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc4RJm3Bm25s68soI9euZcax01pP1LUiepkRzoQT1CeUTno4aNRCqIXQGvaAu5CTr2zfDE5CNVAN0NVVCV3Uvxrl185IT-QDw0Toplwbpn-G-U3kgEjYbhHBokmlKzzNYSxX3ccVq4snxiFceEeqZ1FGm6UW6B2jTzwNDIENhtna8O3bc7-u6EegdqQz06yg_PemuVM9YG-0hw8de_bYqc9X4aT_4f-5anvP8TlHM3K6CZ5j-S-t9umw',
  }
];

export default function CategoryPage() {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState('');

  const handleAdd = (item) => {
    addToCart(item, 1, item.weight);
    setToast(`Added ${item.name} to your basket`);
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
        {/* Category Hero Banner */}
        <section className="bg-surface-container-low py-12 lg:py-16 border-b border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-body-sm text-on-surface-variant mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>•</span>
              <Link to="/shop" className="hover:text-primary">Categories</Link>
              <span>•</span>
              <span className="text-primary font-semibold">Garam Masala &amp; Blends</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="inline-block px-3 py-1 bg-surface-container rounded-full text-secondary font-label-sm uppercase tracking-wider font-semibold mb-3">
                  TRADITIONAL FORMULATIONS • STONE-GROUND
                </span>
                <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary mb-4">
                  Garam Masala &amp; Blends
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  Aromatic dry-roasted whole spices, slow-ground at low revolutions to preserve delicate volatile aromas. From everyday handis to celebratory royal biryanis, each blend honors centuries of Pakistani culinary wisdom.
                </p>
              </div>

              <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm">
                <h3 className="font-title-md text-primary font-bold mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">flare</span>
                  The Art of Roasting
                </h3>
                <p className="font-body-sm text-on-surface-variant leading-relaxed mb-4">
                  Every whole seed is individually pan-toasted on heavy iron griddles until the natural volatile oils surface, releasing deep, warm caramelized notes.
                </p>
                <div className="flex items-center gap-4 text-primary font-label-sm font-semibold border-t border-surface-container-highest pt-3">
                  <span>100% Whole Spices</span>
                  <span>•</span>
                  <span>Zero Starches</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-Category Filter Badges */}
        <section className="bg-surface py-6 border-b border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin flex items-center gap-3 overflow-x-auto no-scrollbar">
            {['All Blends', 'Gravy & Qorma', 'Biryani & Rice', 'Street & Tawa'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full font-label-lg whitespace-nowrap transition-colors cursor-pointer ${
                  filter === f
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Product Cards Grid */}
        <section className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLENDS.map(item => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-highest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-surface-container-low rounded-lg overflow-hidden mb-4">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 flex items-center justify-center text-on-surface-variant hover:text-secondary"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={wishlist[item.id] ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </span>
                    </button>
                    <span className="absolute bottom-2 left-2 bg-surface/90 text-on-surface font-label-sm text-[10px] px-2 py-0.5 rounded font-bold">
                      {item.weight}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-label-sm text-[11px] font-bold uppercase tracking-wider ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="font-body-sm text-[11px] text-tertiary font-bold">{item.urdu}</span>
                  </div>

                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-1 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  <p className="font-body-sm text-on-surface-variant mb-2">
                    {item.subtitle}
                  </p>

                  <div className="bg-surface-container-low/70 rounded p-2.5 mb-4 text-[12px] text-on-surface-variant space-y-1">
                    <div className="flex justify-between">
                      <span>Roast Style:</span>
                      <strong className="text-primary">{item.roastProfile}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Terroir:</span>
                      <strong className="text-on-surface">{item.origin}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container-high/60 flex items-center justify-between">
                  <span className="font-price-md text-price-md text-primary font-bold">Rs. {item.price}</span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="px-4 py-2 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-primary-container transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span> Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
