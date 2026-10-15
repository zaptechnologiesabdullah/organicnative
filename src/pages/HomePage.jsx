import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

const STORY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBcuAyVcYCMv-TYV_C39YrNTsyw792-ZfqZdfc7le7muNgf9_2hEUkq8NV4_okUSSp0cwGnEGB04p3UoNYz4KFOe4Dq9mBU1d8n9NXZ0O5S6OTfAOOownGzCa5XHcmN5V1YAdPKkrzEuwuQRiLrpENMs_er6zDNSDbO3Ig6AhzvzNvh-jKPxboyOHbfE4MoosBskmdYuOIuEDGtgeXWDafXn9_zdM4-JcAg93-3jfFd9nQeAwNw816_Dw";

// Elite Harvest Flight Showcase Data
const HERO_SHOWCASES = [
  {
    id: 1,
    title: 'Garam Masala Powder',
    urdu: 'گرم مصالحہ پاؤڈر',
    tag: 'HERITAGE 11-SPICE BLEND',
    desc: 'Pan-toasted royal whole botanicals slow granite stone-milled in cellar batches. Notes of black cardamom, mace blades, Peshawar green pods & Tellicherry cloves.',
    origin: 'Multan & Peshawar Terroir',
    coordinates: '30.15° N, 71.52° E',
    altitude: '650m ASL',
    aroma: 'Woody, Warm & Peppercorn',
    temp: 'Cold Stone-Milled < 30°C',
    batch: 'Reserve Batch #24-M',
    purity: '100% Unadulterated • Zero Fillers',
    notes: ['Black Cardamom', 'Toasted Mace', 'Peshawar Cloves'],
    price: 450,
    weight: '200g Pouch',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMFIrGJU6BMzFc2_kJbRIvWRDcXaXf83GReCl3HH2RMP2VYlGrk42FAKht5fZNs4OWJBkLvhA0DoqrixNIiYsmQCCk-58jIvWsoOCAAGPgKrv4OCTxvmXY6cGnY9F6uAjycoUsclsEOkM9b6B6GNNOztwTTGWlmWheKU4BuLHEGx8SmEUYaZ2hRYigH8GF9oOEhgQ90pAlCJIcj82Q0zvahmy0GGJViEl2BRzhuluk6jclNjAIbnYYdA',
  },
  {
    id: 2,
    title: 'Kunri Red Chilli Powder',
    urdu: 'سرخ مرچ پاؤڈر',
    tag: 'KUNRI SINGLE-ESTATE',
    desc: 'Sun-cured Dandicut and Longi chillies from Sindh’s arid chilli capital. Pure natural crimson brilliance without artificial dyes or sawdust adulteration.',
    origin: 'Kunri, Mirpur Khas, Sindh',
    coordinates: '25.17° N, 69.56° E',
    altitude: '32m ASL',
    aroma: 'Fiery, Smoky & Pungent',
    temp: 'Cold Stone-Milled < 26°C',
    batch: 'Reserve Batch #24-K',
    purity: 'Zero Added Colour • Lab Tested',
    notes: ['Sun-Cured Dandicut', 'Natural Crimson', 'Deep Capsaicin'],
    price: 380,
    weight: '250g Pouch',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDTGw7zXkz0kTwGs6bu_HhEG_6jx7oKBeUy7-fBs50jibH88-EScXm72b3Ua5Yyd3eYDDD-lWXo0Z9Zz2jIV1IYphaiy8FfWNPHLAAgE2a3-dfaiWY39bIyOSfGxQhdJlggELIonwy-49T0TeaHTYjx5g82sSdvMFpXdQ3kY9xPOG5TRSv2pRG_AifA3LzSAr1yRnUZ5IQDfSix7ULiK3QPb2cfjQw-nbRN6NHjxFJdSZfgeA7xgUZ6Q',
  },
  {
    id: 3,
    title: 'Kasur Golden Turmeric (Haldi)',
    urdu: 'خالص ہلدی پاؤڈر',
    tag: 'KASUR HIGH-CURCUMIN',
    desc: 'Plump golden rhizomes dried over clean riverbed mats in the historic fertile basin of Kasur. Lab-verified 5.2% natural active curcumin for authentic therapeutic warmth.',
    origin: 'Kasur River Basin, Punjab',
    coordinates: '31.11° N, 74.45° E',
    altitude: '218m ASL',
    aroma: 'Earthy, Floral & Warm',
    temp: 'Cold Stone-Milled < 25°C',
    batch: 'Reserve Batch #24-T',
    purity: '5.2% Natural Curcumin Verified',
    notes: ['5.2% Pure Curcumin', 'Unpolished Rhizome', 'Golden Glow'],
    price: 320,
    weight: '200g Pouch',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMQHOEoksEX7i3er22bFO7weghP1-wqgMErvf60ULzfh7vHeIm2hJWwAfZKOsyAiTdHoFYOhJIzZH9Q6xxD81HManIY9MiieaijdnAFQJjgNL_2xZLjFzoTEYeL0qUIjjruYwVIHZVq3RGLuhTQBXydSq3IfYmptINKK_WEQRGsEiLRolv8h8mOA9RaSALIwS_xXK35iqoyGJ_4S5exBR4jpiS-4lfTnZIruGGdwkEdHQnwligLjuWLw',
  },
  {
    id: 5,
    title: 'Royal White Cumin (Zeera)',
    urdu: 'شاہی سفید زیرہ',
    tag: 'BALOCHISTAN HIGHLANDS',
    desc: 'Sun-dried ridged whole seeds gathered from cold semi-arid highlands. Cracks with intense essential oils the moment it touches hot desi ghee.',
    origin: 'Quetta Valley, Balochistan',
    coordinates: '30.17° N, 66.97° E',
    altitude: '1,680m ASL',
    aroma: 'Nutty, Citrus & Resinous',
    temp: 'Sun-Cured Whole Botanical',
    batch: 'Reserve Batch #24-Z',
    purity: 'Hand-Cleaned • High Volatile Oil',
    notes: ['High Terpenes', 'Desi Ghee Bloom', 'Hand-Sorted Clean'],
    price: 520,
    weight: '150g Pouch',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBIQkNNrVSNOaE43YDZJu2mY_0B21NqDeiZyEMhI05ifYl5oNZX9UL3fSoUu_YnT0NbkWKxAOTE7jbm6mAgtSQpFT2FJHEf8jZGGbZIFys1acZuAjSy2dQxJ2nd3YaGnwsVoWPeXH1qddayBp37N1Iye4RSfmuyLLVTntBNM0HBMMCumjTVYIYZrt6X-eNC0r-CzzgztDBpnW63VzruKBo-ptGmItR4WBb1qMoE0Or4ze8RczcwHgULw',
  }
];

const CATEGORIES = [
  {
    id: 'everyday-spices',
    title: 'Everyday Spices',
    desc: 'Haldi, Lal Mirch, Dhaniya & essential kitchen powders ground from whole harvest root and seed.',
    count: '12 Products',
    icon: 'grain',
    iconBg: 'bg-secondary-fixed text-secondary',
    link: '/categories',
  },
  {
    id: 'garam-masala-blends',
    title: 'Garam Masala & Blends',
    desc: 'Aromatic dry-roasted whole spice blends formulated for slow-simmered qormas, niharis, and gravies.',
    count: '8 Blends',
    icon: 'skillet',
    iconBg: 'bg-tertiary-fixed text-tertiary',
    link: '/categories',
  },
  {
    id: 'chilli-pepper',
    title: 'Chilli & Pepper',
    desc: 'Round Dandicut chillies from Kunri, Kashmiri flakes, and sun-cured black tellicherry peppercorns.',
    count: '6 Varieties',
    icon: 'local_fire_department',
    iconBg: 'bg-error-container text-error',
    link: '/shop?cat=chilli',
  },
  {
    id: 'whole-spices',
    title: 'Whole Spices',
    desc: 'Green cardamom pods, fragrant star anise, raw cinnamon quill bark, and whole royal white cumin.',
    count: '14 Botanicals',
    icon: 'psychiatry',
    iconBg: 'bg-primary-fixed text-primary',
    link: '/shop?cat=whole',
  },
  {
    id: 'seasonings-salts',
    title: 'Seasonings & Salts',
    desc: 'Kala namak, street-style chaat masala, sundried Kasuri methi, and roasted cumin finishing powder.',
    count: '9 Finishing Salts',
    icon: 'soup_kitchen',
    iconBg: 'bg-tertiary-fixed-dim/60 text-on-tertiary-container',
    link: '/shop?cat=seasonings',
  },
  {
    id: 'gift-collections',
    title: 'Gift Collections',
    desc: 'Handcrafted sheesham wooden spice boxes and heritage tasting sets for memorable culinary gifts.',
    count: '5 Gift Boxes',
    icon: 'featured_seasonal_and_gifts',
    iconBg: 'bg-secondary-fixed-dim/60 text-secondary',
    link: '/shop?cat=gifts',
  },
];

const COLLECTIONS = [
  {
    id: 1,
    badge: '4 Core Pouches',
    price: 'Rs. 1,420',
    title: 'Everyday Cooking Essentials',
    desc: 'Haldi, Dhaniya, Lal Mirch, and White Zeera. The indestructible foundation of every Pakistani handi.',
  },
  {
    id: 2,
    badge: '4 Slow-Cook Blends',
    price: 'Rs. 1,650',
    title: 'Traditional Pakistani Flavours',
    desc: 'Nihari, Haleem, Qorma, and Karahi bases ground in small batches with heirloom roasted spices.',
  },
  {
    id: 3,
    badge: 'Potli + Powder Set',
    price: 'Rs. 950',
    title: 'The Biryani Collection',
    desc: 'Muslin brewing sachet of whole star anise, mace and cloves, paired with our royal Biryani spice powder.',
  },
  {
    id: 4,
    badge: 'Coarse Blend + Seeds',
    price: 'Rs. 890',
    title: 'The Karahi Collection',
    desc: 'Coarsely cracked spices featuring coriander seeds, black peppercorns, and sun-dried wild pomegranate.',
  },
  {
    id: 5,
    badge: '12 Jars + Brass Spoon',
    price: 'Rs. 4,800',
    title: 'The Complete Spice Box',
    desc: 'Twelve core pantry essentials in amber glass jars nestled inside an artisan brass-latched sheesham box.',
  },
  {
    id: 6,
    badge: 'Artisanal Gifting',
    price: 'Rs. 3,200',
    title: 'Artisanal Gift Sets',
    desc: 'Heirloom embossed kraft packaging finished with raw jute twine. Perfect for weddings and housewarmings.',
  },
];

const RECIPES = [
  {
    id: 1,
    title: 'Restaurant-Style Chicken Karahi',
    tag: 'FEATURED: KARAHI BLEND',
    time: 'Easy • 35 mins',
    desc: 'Coarse crushed black pepper, roasted cumin & fresh ginger fried over high flame.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9OooqkaYWuLpzrgFhS2KjMki2MGXa-yI1d_3xev5ItE_9pDB54XfPq7JdVraJix5Sw9MyCn26LsN-DJ0OV_f3WNFez0TleET7L_yRy5Xwza0fvgAxjmqcA8j5Ups8KFP2zJNthI5vvy7NEm2u7tD1gCPiXBLO4mKespOpVDZCX-_gieHXKgD8lsoZueoAsEJVFwA46vxZHTYnsI2ZRV4qTuXIyUxPu-__rueBq2C2n98DY2WeL3oC5Q',
  },
  {
    id: 2,
    title: 'Fragrant Homemade Mutton Biryani',
    tag: 'FEATURED: BIRYANI MASALA',
    time: 'Weekend Project • 60 mins',
    desc: 'Layered basmati rice infused with whole star anise, green cardamom, mace, and dried plums.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRG1PKiQpRPtjEiB7ZSFtYBOjqX-PVIooNCGpxwFXSoHwlfeI2GTpK33_zEKJn2EXt3VrFOkzUSMUxNjkY8j4bJie4M-6AFGAz2q6tVe0BXHsnGNb-VOMHfXs49jN1LC-_bTdUIyntNjYTAeaLjymaJTV4jdzABTLqGvKNEMEZVzx7xuuzcN0Yu0r8ngxBNSSJzGLQuI5qio9Ln58SkCizYzwH4bXHYxEdrf601SWIO74H8XBkaEGPJw',
  },
  {
    id: 3,
    title: 'Dal Tadka with Royal Zeera',
    tag: 'FEATURED: ZEERA & HALDI',
    time: 'Quick • 25 mins',
    desc: 'Slow-simmered lentils tempered in pure desi ghee with cumin, whole dried chillies & garlic.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB7OONBY2y6zZFViiTFvolxhjukxOI9LP343qQ9lH0GXadxz2RlB6qW8rhlOulKMSE0fPge-uQPX7xO0h4BmFF2kIJuOONNoEWmzHrVAdlmcuWOvnD0bx605bIde_aO1RkmlTuLZhktkDlSTNbegp_91TzANcWwYQxgLP3SWO8DwZ5K3U-BfUdDt1cWlflaCoTqA6WiSAjnszormdQQfhdX_8MOEciBQrXrB2FMnNcKBaNzC8_ZsfSuA',
  },
  {
    id: 4,
    title: 'Homestyle Aloo Gobhi Sabzi',
    tag: 'FEATURED: EVERYDAY TRIO',
    time: 'Easy • 30 mins',
    desc: 'Tender cauliflower florets blooming in stone-ground coriander, turmeric and red chilli.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmu1rhIA2uGqcs19CXApJR522PDijx42YnpiHeucrar0TGG-M6Tkh3nhWnIaEf1Erjzhh_NhDRpA48X5SAQi-6GkkTCB4P9VWK4w9EgtwRPjxaq_B32wJh3EWeR_l1S9_tGQDiHYAuzPwQrjY5lUxzwY_nP5YTf1q3KuPyNLiBUCyA419Qh1zhQAULT5lFKBqLodef3CdJvsINT_tqLpFnwBGHPGZ16XI5Y7_paX-9stxs7qf7XIGXYw',
  },
];

export default function HomePage() {
  const { products, addToCart, wishlist, toggleWishlist } = useShop();
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All Staples');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [addedToast, setAddedToast] = useState('');

  const currentHero = HERO_SHOWCASES[heroIndex];

  const handleAddToCart = (product) => {
    addToCart(product, 1, product.weight);
    setAddedToast(`Added ${product.title || product.name} to your basket`);
    setTimeout(() => setAddedToast(''), 3000);
  };

  const filteredProducts = products.slice(0, 8).filter(p => {
    if (activeFilter === 'All Staples') return true;
    if (activeFilter === 'Pure Ground Spices') return p.category === 'Everyday Powders';
    if (activeFilter === 'Traditional Masala Blends') return p.category === 'Masala Blends';
    if (activeFilter === 'Whole Seeds') return p.category === 'Whole Spices';
    return true;
  });

  return (
    <div className="bg-[#FAF7F0] font-body-md text-body-md text-[#1a1c17] antialiased min-h-screen flex flex-col">
      <Navbar />

      {/* Floating Add Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#123420] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-[#c5ecce]/30">
          <span className="material-symbols-outlined text-[20px] text-[#c5ecce]">check_circle</span>
          <span className="font-label-md font-semibold">{addedToast}</span>
        </div>
      )}

      {/* ── MAIN CONTENT CONTAINER (Balanced Spacing from Fixed Header) ── */}
      <main className="w-full pt-32 sm:pt-36 pb-12 bg-transparent flex-1">
        <div className="flex flex-col w-full">

          {/* ══════════════════════════════════════════════════════════════
              1. ELITE HERO SECTION (Regal, Architectural & Museum-Grade)
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 pb-14 lg:pb-20 w-full overflow-hidden">
            
            {/* Ambient luxury lighting */}
            <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-[#94492c]/4 rounded-full filter blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-20 right-10 w-[650px] h-[650px] bg-[#123420]/6 rounded-full filter blur-3xl pointer-events-none -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Poetic Editorial Typography & Flight Selector */}
              <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-2">
                
                {/* Royal Terroir Emblem */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#FAF7F0] rounded-full border border-[#e8ddca] shadow-2xs mb-6">
                  <span className="text-[#94492c] text-[11px]">✦</span>
                  <span className="font-label-sm text-[10.5px] sm:text-[11px] text-[#2b3008] tracking-[0.22em] uppercase font-bold">
                    Royal Pantry Archive • Estd. 2024 • Terroir Reserve
                  </span>
                  <span className="text-[#94492c] text-[11px]">✦</span>
                </div>

                {/* Grand Headline */}
                <h1 className="font-display-hero text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.07] text-[#123420] tracking-tight font-serif mb-5">
                  Awaken the{' '}
                  <span className="italic font-normal text-[#94492c] font-serif relative">
                    Living Soul
                  </span>{' '}
                  of Heirloom Pakistani Kitchens.
                </h1>

                {/* Subtitle */}
                <p className="font-body-lg text-[16px] sm:text-[17.5px] text-[#424842] max-w-xl mb-7 leading-relaxed">
                  Single-estate unadulterated whole botanicals, sun-cured and slow granite stone-milled in cold cellars under 30°C. Preserving the fragile volatile essential oils and deep ancestral aroma lost to industrial high-heat mills.
                </p>

                {/* ── Elite Tasting Flight Board (Bespoke Tasting Flight Selector) ── */}
                <div className="w-full bg-[#f4f4eb]/95 p-4 rounded-2xl border border-[#e8ddca] mb-7 shadow-xs">
                  <div className="flex items-center justify-between mb-3 text-[11px] font-label-sm uppercase tracking-widest text-[#424842] font-bold">
                    <span className="flex items-center gap-1.5 text-[#123420]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94492c]"></span>
                      Curated Harvest Flight [0{heroIndex + 1}/04]
                    </span>
                    <span className="text-[#94492c] font-semibold">{currentHero.origin}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {HERO_SHOWCASES.map((item, idx) => {
                      const isSelected = heroIndex === idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setHeroIndex(idx)}
                          className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer relative ${
                            isSelected
                              ? 'bg-[#123420] text-white shadow-md ring-1 ring-[#c5ecce]/40'
                              : 'bg-white hover:bg-[#eaeae0] text-[#1a1c17] border border-[#e8ddca]/80 hover:border-[#123420]/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] font-mono tracking-wider ${isSelected ? 'text-[#c5ecce]' : 'text-[#424842]/60'}`}>
                              0{idx + 1}
                            </span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c5ecce]"></span>
                            )}
                          </div>
                          <div className="font-serif font-semibold text-[13px] leading-tight truncate">
                            {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
                          </div>
                          <div className={`text-[11px] font-urdu mt-0.5 truncate ${isSelected ? 'text-[#c5ecce]' : 'text-[#94492c]'}`}>
                            {item.urdu}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
                  <Link
                    to="/shop"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#123420] text-white font-label-lg text-label-lg px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(18,52,32,0.25)] hover:bg-[#1b432a] transition-all duration-200 cursor-pointer"
                  >
                    <span>Acquire Harvest Reserve</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(currentHero)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#123420] border border-[#e8ddca] font-label-lg text-label-lg px-7 py-3.5 rounded-xl hover:bg-[#f4f4eb] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#94492c]">shopping_bag</span>
                    <span>Quick Add • Rs. {currentHero.price}</span>
                  </button>
                </div>

                {/* Trust Ribbon */}
                <div className="w-full pt-5 border-t border-[#e8ddca] flex flex-wrap items-center gap-y-2 gap-x-6 text-[#424842] font-body-sm text-[12.5px]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#94492c] font-bold">✦</span>
                    <span>Sun-Cured &amp; Granite Milled &lt; 30°C</span>
                  </div>
                  <span className="opacity-30 hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#94492c] font-bold">✦</span>
                    <span>Direct Single-Estate Provenance</span>
                  </div>
                  <span className="opacity-30 hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#94492c] font-bold">✦</span>
                    <span>Aroma-Lock Multi-Layer Foil</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Luxury Image Showcase */}
              <div className="lg:col-span-5 relative w-full flex justify-center">
                
                {/* Architectural Arched Frame */}
                <div className="relative w-full max-w-[480px] rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(18,52,32,0.22)] border border-[#e8ddca] ring-1 ring-[#123420]/10 bg-[#f5f2e9] group">
                  
                  {/* High-res Image */}
                  <img
                    key={currentHero.id}
                    className="w-full h-[500px] sm:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={currentHero.title}
                    src={currentHero.img}
                  />

                  {/* Top-Right Cold-Milled Purity Seal */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e8ddca] shadow-md flex items-center gap-2 text-[11px] font-label-sm font-bold text-[#123420]">
                    <span className="w-2 h-2 rounded-full bg-[#94492c]"></span>
                    <span>{currentHero.temp}</span>
                  </div>

                  {/* Top-Left Terroir Coordinates Badge */}
                  <div className="absolute top-4 left-4 bg-[#123420]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md text-[10.5px] font-label-sm font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
                    <span className="text-[#c5ecce] text-[10px]">📍</span>
                    <span>{currentHero.coordinates} • {currentHero.altitude}</span>
                  </div>

                  {/* Integrated Bottom Plaque (Clean, elegant, sensory notes & quick add) */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#123420] via-[#123420]/95 to-transparent p-6 text-white pt-16">
                    
                    <div className="flex items-start justify-between gap-4 mb-2.5">
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-[#c5ecce] font-semibold mb-0.5">
                          {currentHero.batch} • {currentHero.tag}
                        </div>
                        <h3 className="font-serif text-[21px] sm:text-[23px] font-semibold text-white leading-tight">
                          {currentHero.title}
                        </h3>
                        <p className="font-urdu text-[13.5px] text-[#c5ecce] mt-0.5">
                          {currentHero.urdu}
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className="bg-[#94492c] text-white font-label-sm text-[12px] font-bold px-3 py-1 rounded-md shadow-xs">
                          Rs. {currentHero.price}
                        </span>
                        <span className="text-[10.5px] text-white/70 mt-1 font-mono">
                          {currentHero.weight}
                        </span>
                      </div>
                    </div>

                    {/* Sensory Notes Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-2.5 pb-2 border-t border-white/15">
                      <span className="text-[10.5px] text-white/60 uppercase font-semibold mr-1">Notes:</span>
                      {currentHero.notes && currentHero.notes.map((note, nIdx) => (
                        <span
                          key={nIdx}
                          className="px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-medium border border-white/10"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11.5px] text-white/80">
                      <span>Terroir: <strong className="text-white">{currentHero.origin}</strong></span>
                      <button
                        onClick={() => handleAddToCart(currentHero)}
                        className="inline-flex items-center gap-1.5 text-[#c5ecce] hover:text-white font-semibold cursor-pointer underline underline-offset-2"
                      >
                        <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                        Add to Basket
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              2. SHOP BY CATEGORY SECTION
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-white py-16 lg:py-20 shadow-[0_1px_0_0_rgba(232,221,202,0.4)] border-y border-[#e8ddca]" id="categories">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <span className="font-label-sm text-label-sm text-[#94492c] uppercase tracking-widest font-bold">OUR PANTRY</span>
                  <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-[#123420] font-serif mt-1">Shop by Category</h2>
                  <p className="font-body-md text-body-md text-[#424842] mt-2 max-w-xl">
                    Explore our curated range of essential kitchen staples, whole handpicked botanicals, and time-honoured culinary blends.
                  </p>
                </div>
                <Link to="/categories" className="mt-4 md:mt-0 inline-flex items-center gap-1 text-[#94492c] font-label-lg text-label-lg hover:underline underline-offset-4">
                  View all 6 categories
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.id}
                    to={cat.link}
                    className="group bg-[#f4f4eb] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-[#e8ddca]/70 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                          <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant bg-white px-2.5 py-1 rounded-full border border-[#e8ddca]">
                          {cat.count}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-[#123420] font-serif group-hover:text-[#94492c] transition-colors mb-2">
                        {cat.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                    <span className="inline-flex items-center text-[#94492c] font-label-lg text-label-lg font-semibold group-hover:translate-x-1.5 transition-transform">
                      Explore Range →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              3. BESTSELLING PRODUCTS SECTION
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-[#FAF7F0] py-20" id="shop">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="font-label-sm text-label-sm text-[#2b3008] uppercase tracking-widest font-bold">PANTRY HEROES</span>
                <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-[#123420] font-serif mt-1">Our Kitchen Staples</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  The spices Pakistani home cooks reach for every single day. Freshly packed in moisture-lock pouches to preserve volatile aromatic oils.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {['All Staples', 'Pure Ground Spices', 'Traditional Masala Blends', 'Whole Seeds'].map(filterName => (
                  <button
                    key={filterName}
                    onClick={() => setActiveFilter(filterName)}
                    className={`px-5 py-2.5 rounded-full font-label-lg text-label-lg transition-all duration-200 cursor-pointer ${
                      activeFilter === filterName
                        ? 'bg-[#123420] text-white shadow-md'
                        : 'bg-[#f4f4eb] text-on-surface-variant hover:text-[#123420] hover:bg-[#eaeae0]'
                    }`}
                  >
                    {filterName}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl p-4 lg:p-5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group border border-[#e8ddca]/70"
                  >
                    <button
                      aria-label="Add to wishlist"
                      onClick={() => toggleWishlist(prod.id)}
                      className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer ${
                        wishlist[prod.id] ? 'text-[#94492c]' : 'text-on-surface-variant hover:text-[#94492c]'
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
                      <Link to={`/product/${prod.id}`} className="block relative w-full aspect-[4/5] bg-[#f4f4eb] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={prod.name}
                          src={prod.img}
                        />
                        <span className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-[#1a1c17] font-label-sm text-[10px] px-2 py-0.5 rounded font-bold shadow-xs">
                          {prod.weight}
                        </span>
                      </Link>
                      <div className={`mb-1 ${prod.tagColor} font-label-sm text-[11px] font-bold uppercase tracking-wider`}>
                        {prod.tag}
                      </div>
                      <Link to={`/product/${prod.id}`}>
                        <h3 className="font-headline-sm text-[17px] text-[#1a1c17] font-serif font-semibold mb-1 leading-snug hover:text-[#123420] transition-colors">
                          {prod.name}
                        </h3>
                      </Link>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-3">
                        {prod.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#e8ddca]/60">
                      <span className="font-price-md text-price-md text-[#123420] font-bold">Rs. {prod.price}</span>
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="px-3.5 py-1.5 bg-[#123420] text-white rounded-lg font-label-sm text-label-sm hover:bg-[#1b432a] transition-colors flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span> Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              4. BRAND STORY SECTION
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-white py-20 border-t border-[#e8ddca]" id="about">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Side: Collage Card */}
                <div className="lg:col-span-5 relative">
                  <div className="bg-[#f4f4eb] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-[#e8ddca]">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        alt="Pakistani heritage kitchen scene with stone mortar and pestle"
                        src={STORY_IMG}
                      />
                    </div>
                    <div className="relative bg-white rounded-xl p-6 shadow-sm border border-[#e8ddca]/60">
                      <span className="material-symbols-outlined text-[#94492c] text-[32px] opacity-70 mb-2">format_quote</span>
                      <p className="font-headline-sm text-headline-sm text-[#123420] font-serif italic leading-snug mb-3">
                        “In Pakistani cooking, spices are not just ingredients — they are memory, warmth, and hospitality.”
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                        — Traditional Dastarkhwan Heritage
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Narrative */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  <span className="font-label-sm text-label-sm text-[#2b3008] uppercase tracking-widest font-bold mb-2">
                    OUR PHILOSOPHY
                  </span>
                  <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-[#123420] font-serif mb-6">
                    Rooted in Tradition, Grounded in Purity.
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4 leading-relaxed">
                    We started Organic Native with a single purpose: to restore the unadulterated aroma of genuine Pakistani spices to everyday family kitchens. From the arid chilli tracts of Kunri to the fertile coriander fields of Punjab, our spices are selected at peak harvest.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                    We avoid artificial fillers, added colours, or industrial heat treatments. Each batch is slowly milled to retain volatile essential oils — so the moment your tadka sizzles or your qorma simmers, the aroma fills the entire house.
                  </p>

                  {/* 3 Key commitments */}
                  <div className="space-y-4 mb-8 w-full">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f4eb] border border-[#e8ddca]/60">
                      <div className="w-8 h-8 rounded-full bg-[#123420] flex items-center justify-center text-white shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">pan_tool</span>
                      </div>
                      <div>
                        <h4 className="font-title-md text-[16px] text-on-surface font-semibold">Hand-sorted &amp; triple-cleaned raw spices</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Every harvest batch is sifted by master sorters to remove impurities and chaff.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f4eb] border border-[#e8ddca]/60">
                      <div className="w-8 h-8 rounded-full bg-[#123420] flex items-center justify-center text-white shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">cyclone</span>
                      </div>
                      <div>
                        <h4 className="font-title-md text-[16px] text-on-surface font-semibold">Slow stone grinding that preserves aromas</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Low-friction mill stones keep temperatures cool, preserving delicate essential oils.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f4eb] border border-[#e8ddca]/60">
                      <div className="w-8 h-8 rounded-full bg-[#123420] flex items-center justify-center text-white shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                      </div>
                      <div>
                        <h4 className="font-title-md text-[16px] text-on-surface font-semibold">Resealable multilayer barrier pouches</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Engineered to shield delicate spices against South Asian monsoon humidity and oxidation.</p>
                      </div>
                    </div>
                  </div>

                  <Link to="/about" className="inline-flex items-center gap-2 text-[#123420] font-label-lg text-label-lg font-bold group">
                    <span>Read Our Full Journey</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              5. SPICE COLLECTIONS MERCHANDISING STRIP
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-[#123420] text-white py-16 lg:py-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <span className="font-label-sm text-label-sm text-[#e1e7ad] uppercase tracking-widest font-semibold">
                    CURATED BUNDLES
                  </span>
                  <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-white font-serif mt-1">
                    Heritage Spice Collections
                  </h2>
                  <p className="font-body-md text-body-md text-white/80 mt-2 max-w-xl">
                    Thoughtfully packaged pairings designed around famous Pakistani culinary rituals and gifting traditions.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="font-label-sm text-label-sm bg-[#294b35] text-[#95ba9e] px-3.5 py-1.5 rounded-full font-bold">
                    SAVE UP TO 18% ON BUNDLES
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COLLECTIONS.map(col => (
                  <div
                    key={col.id}
                    className="bg-[#294b35]/80 rounded-2xl p-6 flex flex-col justify-between hover:bg-[#294b35] transition-all duration-300 hover:shadow-xl border border-white/10"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-label-sm text-label-sm bg-white/10 text-white px-2.5 py-1 rounded">
                          {col.badge}
                        </span>
                        <span className="font-price-md text-price-md text-[#ffdbce]">
                          {col.price}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-white font-serif mb-2">
                        {col.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-white/75 mb-6">
                        {col.desc}
                      </p>
                    </div>
                    <Link
                      to="/shop"
                      className="w-full py-3 bg-white text-[#123420] rounded-xl font-label-lg text-label-lg hover:bg-[#f4f4eb] transition-colors flex items-center justify-center gap-2 font-bold shadow-sm"
                    >
                      View Collection
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              6. COOKING INSPIRATION / RECIPE CARDS
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-[#FAF7F0] py-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-label-sm text-label-sm text-[#94492c] uppercase tracking-widest font-bold">
                  FLAVOURS IN PRACTICE
                </span>
                <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-[#123420] font-serif mt-1">
                  Tested Pakistani Recipes
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Culinary guides crafted by home cooks to highlight the depth, warmth, and aromatics of our single-origin harvests.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {RECIPES.map(rec => (
                  <div
                    key={rec.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-[#e8ddca]/70"
                  >
                    <div>
                      <div className="aspect-[16/10] bg-[#f4f4eb] overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          alt={rec.title}
                          src={rec.img}
                        />
                        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-semibold text-[#123420] shadow-xs">
                          {rec.time}
                        </span>
                      </div>
                      <div className="p-5">
                        <span className="font-label-sm text-[11px] text-[#2b3008] font-bold tracking-wider uppercase">
                          {rec.tag}
                        </span>
                        <h3 className="font-headline-sm text-[18px] text-on-surface font-serif font-semibold mt-1 mb-2">
                          {rec.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                          {rec.desc}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-0">
                      <Link to="/categories" className="inline-flex items-center gap-1 text-[#123420] font-label-sm text-label-sm font-bold hover:text-[#94492c] transition-colors">
                        View Recipe <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              7. QUALITY INFO STRIP
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-white py-14 border-y border-[#e8ddca]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4f4eb] flex items-center justify-center text-[#123420] shrink-0 shadow-xs border border-[#e8ddca]">
                    <span className="material-symbols-outlined text-[24px]">pin_drop</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-[16px] text-on-surface font-semibold mb-1">Transparent Sourcing</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Single-origin spices sourced directly from trusted regional farming clusters across Pakistan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4f4eb] flex items-center justify-center text-[#123420] shrink-0 shadow-xs border border-[#e8ddca]">
                    <span className="material-symbols-outlined text-[24px]">scale</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-[16px] text-on-surface font-semibold mb-1">Honest Net Weights</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Standardized 100g, 200g, and 500g packages with zero weight deductions for packaging materials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4f4eb] flex items-center justify-center text-[#123420] shrink-0 shadow-xs border border-[#e8ddca]">
                    <span className="material-symbols-outlined text-[24px]">thermostat</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-[16px] text-on-surface font-semibold mb-1">Optimal Storage</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Store in a cool, dry pantry away from direct heat and sunlight. Always use a clean dry spoon.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4f4eb] flex items-center justify-center text-[#123420] shrink-0 shadow-xs border border-[#e8ddca]">
                    <span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-[16px] text-on-surface font-semibold mb-1">Triple-Barrier Sealed</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Food-grade moisture-lock pouches with tear notches and airtight resealable zip closures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              8. REVIEWS & TESTIMONIALS
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-[#FAF7F0] py-16 lg:py-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="font-label-sm text-label-sm text-[#94492c] uppercase tracking-widest font-bold">
                  COMMUNITY VOICES
                </span>
                <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-[#123420] font-serif mt-1">
                  From Everyday Kitchens
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Read what passionate home cooks across Lahore, Karachi, and Islamabad have to say.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-[#e8ddca]/70 hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-1 text-[#94492c] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="font-headline-sm text-[16px] text-on-surface font-serif italic mb-6 leading-relaxed">
                      “The aroma of the Garam Masala is unlike any commercial boxed brand. You can actually smell the green cardamom and real cinnamon bark the moment you unseal the zip lock.”
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#e8ddca]/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#c5ecce] flex items-center justify-center text-[#123420] font-bold text-[13px]">
                      FK
                    </div>
                    <div>
                      <p className="font-title-md text-[14px] text-on-surface leading-tight font-semibold">Fatima K.</p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">Model Town, Lahore</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-[#e8ddca]/70 hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-1 text-[#94492c] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="font-headline-sm text-[16px] text-on-surface font-serif italic mb-6 leading-relaxed">
                      “The red chilli powder has that deep natural crimson colour and balanced heat without any artificial dye residue. It gives our karahi sauces a pure restaurant-style hue naturally.”
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#e8ddca]/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#ffdbce] flex items-center justify-center text-[#94492c] font-bold text-[13px]">
                      UA
                    </div>
                    <div>
                      <p className="font-title-md text-[14px] text-on-surface leading-tight font-semibold">Usman A.</p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">Clifton, Karachi</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-[#e8ddca]/70 hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-1 text-[#94492c] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="font-headline-sm text-[16px] text-on-surface font-serif italic mb-6 leading-relaxed">
                      “Our Sunday family biryani turned out so fragrant! The whole spices are plump and fresh, not broken or stale. Ordering the large gift box next for my mother-in-law.”
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#e8ddca]/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#e1e7ad] flex items-center justify-center text-[#2b3008] font-bold text-[13px]">
                      SR
                    </div>
                    <div>
                      <p className="font-title-md text-[14px] text-on-surface leading-tight font-semibold">Samina R.</p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">F-8, Islamabad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              9. NEWSLETTER SECTION
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-[#f4f4eb] py-16 lg:py-20 border-t border-[#e8ddca]">
            <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#c5ecce] mx-auto flex items-center justify-center text-[#123420] mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">local_cafe</span>
              </div>
              <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-[#123420] font-serif mb-3">
                A Little More Flavour in Your Inbox.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-8">
                Receive seasonal cooking notes, authentic Pakistani spice guides, and early access to fresh harvest batches.
              </p>

              <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubscribed(true);
                }}
              >
                <input
                  className="flex-1 bg-white px-4 py-3 rounded-xl text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-[#123420]/20 border border-[#e8ddca] shadow-xs"
                  placeholder="Enter your email address"
                  required
                  type="email"
                />
                <button
                  className="bg-[#123420] text-white px-7 py-3 rounded-xl font-label-lg text-label-lg hover:bg-[#1b432a] transition-colors shrink-0 cursor-pointer shadow font-bold"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>

              {newsletterSubscribed && (
                <p className="text-[#123420] font-label-sm text-label-sm font-semibold mb-3">
                  Shukriya! You have been subscribed to our seasonal harvest newsletter.
                </p>
              )}

              <p className="font-body-sm text-body-sm text-on-surface-variant/80">
                We respect your privacy. No spam, only genuine culinary inspiration from Pakistani kitchens.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
