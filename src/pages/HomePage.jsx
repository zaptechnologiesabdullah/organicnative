import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';
import pepupPouchImg from '../assets/pepup_garam_masala.png';

const STORY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBcuAyVcYCMv-TYV_C39YrNTsyw792-ZfqZdfc7le7muNgf9_2hEUkq8NV4_okUSSp0cwGnEGB04p3UoNYz4KFOe4Dq9mBU1d8n9NXZ0O5S6OTfAOOownGzCa5XHcmN5V1YAdPKkrzEuwuQRiLrpENMs_er6zDNSDbO3Ig6AhzvzNvh-jKPxboyOHbfE4MoosBskmdYuOIuEDGtgeXWDafXn9_zdM4-JcAg93-3jfFd9nQeAwNw816_Dw";

// Elite Harvest Flight Showcase Data
const HERO_SHOWCASES = [
  {
    id: 1,
    title: 'PEPUP Garam Masala',
    subtitle: 'Always Fresh & Organic',
    urdu: 'پیو گرم مصالحہ پاؤڈر',
    tag: 'FRESH & ORGANIC • HOT FLAVOUR',
    badge: 'ALWAYS FRESH',
    desc: 'Pan-toasted royal whole botanicals slow granite stone-milled in cellar batches. Notes of black cardamom, toasted mace blades, Peshawar green pods & Tellicherry cloves.',
    origin: 'Multan & Peshawar Terroir',
    coordinates: '30.15° N, 71.52° E',
    altitude: '650m ASL',
    aroma: 'Woody, Warm & Peppercorn',
    temp: 'Cold Stone-Milled < 30°C',
    batch: 'Reserve Batch #24-M',
    purity: '100% Unadulterated • Zero Fillers',
    notes: ['Black Cardamom', 'Toasted Mace', 'Peshawar Cloves', 'Star Anise'],
    price: 160,
    weight: '50gm Pouch',
    img: pepupPouchImg,
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
    title: 'Everyday Staples',
    urdu: 'روزمرہ دیسی مصالحہ جات',
    tag: 'FOUNDATIONAL HARVEST',
    terroir: 'Kasur & Kunri Basin',
    desc: 'Golden turmeric rhizome, round Dandicut chilli, and cold-cracked coriander ground for authentic daily handis.',
    botanicals: ['Kasur Haldi (5.2% Curcumin)', 'Kunri Mirch', 'Punjab Dhaniya'],
    count: '12 Staples',
    icon: 'grain',
    gradient: 'from-[#ffdbce]/35 via-white to-[#FAF7F0]',
    accentColor: '#94492c',
    iconBg: 'bg-[#94492c]/10 text-[#94492c] border-[#94492c]/20',
    link: '/categories',
  },
  {
    id: 'garam-masala-blends',
    title: 'Garam Masala & Blends',
    urdu: 'شاہی گرم مصالحہ جات',
    tag: 'SLOW-ROASTED FORMULAS',
    terroir: 'Peshawar & Multan Terroir',
    desc: 'Aromatic dry-roasted royal whole spice blends slow-milled on cellar granite for qormas, niharis, and karahis.',
    botanicals: ['Black Cardamom', 'Toasted Mace Blades', 'Peshawar Cloves'],
    count: '8 Blends',
    icon: 'skillet',
    gradient: 'from-[#c5ecce]/35 via-white to-[#FAF7F0]',
    accentColor: '#123420',
    iconBg: 'bg-[#123420]/10 text-[#123420] border-[#123420]/20',
    link: '/categories',
  },
  {
    id: 'chilli-pepper',
    title: 'Chilli & Pepper Harvest',
    urdu: 'سرخ مرچ اور کالی مرچ',
    tag: 'SUN-CURED CAPSAICIN',
    terroir: 'Kunri (Sindh Chilli Capital)',
    desc: 'Heirloom round Dandicut and fiery Longi pods sun-cured over clean riverbed mats with Tellicherry peppercorns.',
    botanicals: ['Round Dandicut', 'Kashmiri Flakes', 'Tellicherry Black'],
    count: '6 Varieties',
    icon: 'local_fire_department',
    gradient: 'from-[#ffdad6]/40 via-white to-[#FAF7F0]',
    accentColor: '#ba1a1a',
    iconBg: 'bg-[#ba1a1a]/10 text-[#ba1a1a] border-[#ba1a1a]/20',
    link: '/shop?cat=chilli',
  },
  {
    id: 'whole-spices',
    title: 'Royal Whole Spices',
    urdu: 'ثابت کھڑے مصالحہ جات',
    tag: 'HAND-CLEANED BOTANICALS',
    terroir: 'Quetta & Swat Highlands',
    desc: 'High-altitude royal white cumin, fragrant eight-point star anise, green cardamom pods, and Ceylon cinnamon quill bark.',
    botanicals: ['Royal White Zeera', 'Star Anise', 'Green Cardamom'],
    count: '14 Botanicals',
    icon: 'psychiatry',
    gradient: 'from-[#e1e7ad]/35 via-white to-[#FAF7F0]',
    accentColor: '#42471c',
    iconBg: 'bg-[#42471c]/10 text-[#42471c] border-[#42471c]/20',
    link: '/shop?cat=whole',
  },
  {
    id: 'seasonings-salts',
    title: 'Finishing Salts & Seasonings',
    urdu: 'چٹپٹے مصالحہ جات و نمک',
    tag: 'APOTHECARY FINISHERS',
    terroir: 'Khewra Salt Range & Kasur',
    desc: 'Mineral volcanic Kala Namak, sun-dried wild Kasuri methi, roasted cumin sprinkles, and street-style chaat masalas.',
    botanicals: ['Pink Kala Namak', 'Wild Kasuri Methi', 'Roasted Cumin Chaat'],
    count: '9 Finishers',
    icon: 'soup_kitchen',
    gradient: 'from-[#ffb59a]/30 via-white to-[#FAF7F0]',
    accentColor: '#763317',
    iconBg: 'bg-[#763317]/10 text-[#763317] border-[#763317]/20',
    link: '/shop?cat=seasonings',
  },
  {
    id: 'gift-collections',
    title: 'Artisanal Gift Collections',
    urdu: 'دستکاری شاہی تحائف سیٹ',
    tag: 'HEIRLOOM PRESENTATION',
    terroir: 'Chiniot Sheesham Woodcraft',
    desc: 'Hand-carved brass-latched sheesham wooden spice chests and wax-sealed heritage tasting pouches for momentous gifts.',
    botanicals: ['Sheesham Wood Chest', 'Brass Tasting Spoon', 'Amber Glass Jars'],
    count: '5 Sets',
    icon: 'featured_seasonal_and_gifts',
    gradient: 'from-[#c5ecce]/35 via-[#ffdbce]/20 to-[#FAF7F0]',
    accentColor: '#123420',
    iconBg: 'bg-[#123420]/10 text-[#123420] border-[#123420]/20',
    link: '/shop?cat=gifts',
  },
];

const COLLECTIONS = [
  {
    id: 'vault-sheesham-chest',
    title: 'The Grand Sheesham Spice Chest',
    urduTitle: 'شاہی شیشم مصالحہ صندوق',
    badge: 'COLLECTOR EDITION',
    savings: 'SAVE 18%',
    category: 'gifting',
    price: 4800,
    originalPrice: 5850,
    kraftPrice: 3200,
    packaging: 'Handcrafted Sheesham Wood + Brass Latch',
    desc: 'Twelve reserve single-estate botanicals in UV-blocking amber glass jars nestled inside an artisan brass-latched sheesham chest with hand-forged brass tasting spoon.',
    itemsCount: '12 Amber Jars + Brass Spoon',
    items: [
      'Kasur Golden Haldi (5.2% Curcumin)',
      'Kunri Sun-Dried Lal Mirch',
      'Quetta Plateau White Zeera',
      'Tellicherry Bold Peppercorn',
      'Green Cardamom Jumbo Pods',
      'Imperial Biryani Masala Blend'
    ],
    terroir: 'Old Lahore Woodcraft Guild & Punjab Estates',
    img: '/heritage_spice_chest.jpg',
    accentColor: '#94492c',
    featured: true,
  },
  {
    id: 'vault-biryani-potli',
    title: 'The Royal Biryani & Pulao Potli Set',
    urduTitle: 'شاہی بریانی پوٹلی مجموعہ',
    badge: 'ROYAL DASTARKHWAN',
    savings: 'SAVE 15%',
    category: 'rice',
    price: 1650,
    originalPrice: 1940,
    packaging: 'Organic Muslin Brewing Potli + Amber Jar',
    desc: 'Muslin brewing potli packed with whole 8-point star anise, whole mace blades and Tellicherry cloves, paired with cellar-ground Royal Biryani masala.',
    itemsCount: 'Brewing Potli + 200g Reserve Powder',
    items: [
      'Muslin Potli with Whole Botanicals',
      'Cellar Granite-Milled Biryani Blend',
      'Hand-Selected Green Cardamom',
      'Authentic Dum Rice Brewing Guide'
    ],
    terroir: 'Old Lahore Royal Formulary',
    img: '/royal_biryani_potli_bundle.jpg',
    accentColor: '#123420',
  },
  {
    id: 'vault-everyday-handi',
    title: 'Everyday Handi Four Essentials',
    urduTitle: 'روزمرہ ہانڈی چار ستون',
    badge: 'KITCHEN FOUNDATION',
    savings: 'SAVE 12%',
    category: 'everyday',
    price: 1420,
    originalPrice: 1620,
    packaging: 'Four 250g Kraft Seal Pouches',
    desc: 'The four cornerstones of Pakistani home cooking: Kasur golden turmeric, Kunri red chilli, slow-cracked coriander, and Quetta white cumin.',
    itemsCount: '4 Core 250g Pouches (1kg Total)',
    items: [
      '250g Kasur Haldi Powder',
      '250g Kunri Lal Mirch Powder',
      '250g Slow-Cracked Dhaniya',
      '250g Sun-Dried White Zeera'
    ],
    terroir: 'Kasur, Kunri & Quetta Plateau',
    img: '/everyday_staples_bundle.jpg',
    accentColor: '#42471c',
  },
  {
    id: 'vault-karahi-master',
    title: 'Namak Mandi Karahi Master Set',
    urduTitle: 'پشاور نمک منڈی کڑاہی سیٹ',
    badge: 'CLAY POT CRAFT',
    savings: 'SAVE 14%',
    category: 'slow-cook',
    price: 1350,
    originalPrice: 1570,
    packaging: 'Vintage Kraft Box + Tasting Scoop',
    desc: 'Coarse hand-crushed coriander seeds, Tellicherry black peppercorns, roasted white cumin, and authentic Namak Mandi street karahi blend.',
    itemsCount: '3 Coarse Blends + Crushed Spice Pods',
    items: [
      'Authentic Peshawar Karahi Blend',
      'Coarse Cast-Iron Roasted Coriander',
      'Bold Tellicherry Cracked Pepper',
      'Sun-Dried Wild Anardana'
    ],
    terroir: 'Peshawar Namak Mandi Recipe',
    img: '/karahi_blend_bundle.jpg',
    accentColor: '#763317',
  },
];

const REVIEW_CATEGORIES = [
  { id: 'all', label: 'All Reviews', count: 6 },
  { id: 'chefs', label: 'Chefs & Connoisseurs', count: 3 },
  { id: 'staples', label: 'Everyday Kitchens', count: 2 },
  { id: 'gifts', label: 'Gift Chests', count: 1 },
];

const CONNOISSEUR_REVIEWS = [
  {
    id: 'rev-sikandar',
    category: 'chefs',
    author: 'Chef Sikandar Hayat',
    role: 'Degi Master • Old Anarkali, Lahore',
    avatar: '/master_chef_portrait.jpg',
    dish: 'Degi Shahi Mutton Qorma',
    productTested: 'PEPUP Garam Masala Reserve #24-M',
    rating: 5,
    title: '“Volatile oils bloom the second it touches hot ghee”',
    quote:
      'Unlike factory-packaged commercial masalas that burn spice terpenes in industrial pulverizers, this cellar stone-ground blend keeps the green cardamom and toasted mace oils fully intact. The aroma is pure old Lahore.',
    verified: 'Master Chef Accredited',
    helpfulCount: 42,
  },
  {
    id: 'rev-mariam',
    category: 'chefs',
    author: 'Dr. Mariam Tariq',
    role: 'Food Anthropologist • Clifton, Karachi',
    avatar: '/connoisseur_woman_portrait.jpg',
    dish: 'Sindhi Dum Biryani',
    productTested: 'Kasur Golden Haldi (5.2% Curcumin)',
    rating: 5,
    title: '“Lab verified 5.2% curcumin & zero lead chromate”',
    quote:
      'I tested this Kasur turmeric in a certified lab. Zero chemical polish or artificial yellow food dye. Gives our gravies an exquisite golden warmth and authentic therapeutic depth.',
    verified: 'Lab Verified Research',
    helpfulCount: 38,
  },
  {
    id: 'rev-zohra',
    category: 'gifts',
    author: 'Zohra & Daniyal Alvi',
    role: 'Diplomatic Host • F-7/2, Islamabad',
    avatarInitials: 'ZA',
    dish: 'State Welcome Dinner',
    productTested: 'The Grand Sheesham Spice Chest',
    rating: 5,
    title: '“The Sheesham woodcraft is museum quality”',
    quote:
      'We presented this brass-latched sheesham chest to foreign delegates. The dark seasoned woodgrain and amber vials elicited gasps. Truly the most prestigious culinary gift in Pakistan.',
    verified: 'Collector Series #084',
    helpfulCount: 29,
  },
  {
    id: 'rev-haroon',
    category: 'chefs',
    author: 'Haroon Rasheed',
    role: 'Shinwari Specialist • Namak Mandi, Peshawar',
    avatarInitials: 'HR',
    dish: 'Authentic Shinwari Karahi',
    productTested: 'Namak Mandi Karahi Master Set',
    rating: 5,
    title: '“The exact coarse crack that commercial brands lack”',
    quote:
      'The coarse-cracked Tellicherry peppercorn and roasted coriander release pure fragrance in lamb fat without turning into dark dust. Authentic Shinwari perfection.',
    verified: 'Restaurateur Verified',
    helpfulCount: 34,
  },
  {
    id: 'rev-shahida',
    category: 'staples',
    author: 'Begum Shahida Munir',
    role: 'Home Cook (50+ yrs) • Gulberg, Lahore',
    avatarInitials: 'SM',
    dish: 'Homestyle Daal Tadka & Pulao',
    productTested: 'Royal White Zeera & Kasur Haldi',
    rating: 5,
    title: '“Reminded me of my mother’s hand-chakkī sixty years ago”',
    quote:
      'The Quetta white zeera crackles in pure desi ghee with an aroma that filled the whole courtyard. Most importantly, zero acidity or burning for my family.',
    verified: 'Verified Home Cook',
    helpfulCount: 51,
  },
  {
    id: 'rev-ayesha',
    category: 'staples',
    author: 'Ayesha & Bilal Khan',
    role: 'Food Enthusiast • DHA Phase 6, Karachi',
    avatarInitials: 'AK',
    dish: 'Chicken Handi & Haleem',
    productTested: 'Kunri Sun-Dried Lal Mirch',
    rating: 5,
    title: '“Natural crimson brilliance with clean fruity heat”',
    quote:
      'Real Dandicut and Longi chillies from Kunri. No synthetic red dye in the pan — just deep crimson colour and honest, fragrant heat.',
    verified: 'Verified Harvest Buyer',
    helpfulCount: 27,
  },
];



export default function HomePage() {
  const { products, addToCart, wishlist, toggleWishlist } = useShop();
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [addedToast, setAddedToast] = useState('');
  const [selectedHeroWeight, setSelectedHeroWeight] = useState('50gm');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedVaultFilter, setSelectedVaultFilter] = useState('all');
  const [selectedChestPackaging, setSelectedChestPackaging] = useState('sheesham');
  const [inspectingBundle, setInspectingBundle] = useState(null);

  // Connoisseur Review Section State
  const [selectedReviewCategory, setSelectedReviewCategory] = useState('all');
  const [reviewsList, setReviewsList] = useState(CONNOISSEUR_REVIEWS);
  const [helpfulVotes, setHelpfulVotes] = useState({});
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    author: '',
    role: 'Home Culinary Connoisseur',
    location: 'Lahore',
    dish: '',
    productTested: 'PEPUP Garam Masala Reserve Batch #24-M',
    rating: 5,
    title: '',
    quote: '',
  });

  const handleToggleHelpful = (id) => {
    setHelpfulVotes(prev => {
      const isVoted = prev[id];
      const newVotes = { ...prev, [id]: !isVoted };
      setReviewsList(current =>
        current.map(r => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + (isVoted ? -1 : 1) } : r))
      );
      return newVotes;
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewFormData.author.trim() || !reviewFormData.quote.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      category: 'staples',
      author: reviewFormData.author,
      role: `${reviewFormData.role || 'Home Cook'} • ${reviewFormData.location || 'Pakistan'}`,
      avatarInitials: reviewFormData.author.slice(0, 2).toUpperCase(),
      dish: reviewFormData.dish || 'Heritage Handi',
      productTested: reviewFormData.productTested,
      rating: reviewFormData.rating,
      title: reviewFormData.title || '“Distinct Volatile Freshness”',
      quote: reviewFormData.quote,
      verified: 'Verified Kitchen Review',
      helpfulCount: 1,
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsWriteReviewOpen(false);
    setReviewFormData({
      author: '',
      role: 'Home Culinary Connoisseur',
      location: 'Lahore',
      dish: '',
      productTested: 'PEPUP Garam Masala Reserve Batch #24-M',
      rating: 5,
      title: '',
      quote: '',
    });
    setAddedToast('Shukriya! Your appraisal has been entered into the Master Dastarkhwan ledger.');
    setTimeout(() => setAddedToast(''), 4000);
  };


  const heroWeights = [
    { weight: '50gm', price: 160, label: '50g Pouch' },
    { weight: '100gm', price: 300, label: '100g Twin Pack' },
    { weight: '200gm', price: 580, label: '200g Reserve' },
  ];

  const currentHeroOption = heroWeights.find(w => w.weight === selectedHeroWeight) || heroWeights[0];
  const flagshipProduct = HERO_SHOWCASES[0];

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleAddToCart = (product, weightOverride, priceOverride, e) => {
    const itemToAdd = {
      ...product,
      price: priceOverride || product.price,
      weight: weightOverride || product.weight,
    };
    // Prioritize hero product pouch element rect for natural flight origin, or clicked button
    const heroPouch = document.getElementById('hero-pouch-image');
    const startRect = heroPouch ? heroPouch.getBoundingClientRect() : (e?.currentTarget?.getBoundingClientRect());
    addToCart(itemToAdd, 1, itemToAdd.weight, startRect);
    setAddedToast(`Added ${itemToAdd.title || itemToAdd.name} (${itemToAdd.weight}) to your basket`);
    setTimeout(() => setAddedToast(''), 3000);
  };

  const handleBundleAddToCart = (bundle, priceOverride, packagingOverride, e) => {
    const finalPrice = priceOverride !== undefined ? priceOverride : bundle.price;
    const finalPackaging = packagingOverride || bundle.packaging;
    const itemToAdd = {
      id: bundle.id,
      name: bundle.title,
      urduName: bundle.urduTitle,
      price: finalPrice,
      weight: finalPackaging,
      img: bundle.img,
      category: 'Curated Bundles',
    };
    const startRect = e?.currentTarget?.getBoundingClientRect();
    addToCart(itemToAdd, 1, finalPackaging, startRect);
    setAddedToast(`Added ${bundle.title} to your reserve bag`);
    setTimeout(() => setAddedToast(''), 3000);
  };

  return (
    <div className="bg-[#FAF7F0] font-body-md text-body-md text-[#1a1c17] antialiased min-h-screen flex flex-col">
      <Navbar />

      {/* Floating Add Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#123420] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-[#c5ecce]/30 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-[#c5ecce]">check_circle</span>
          <span className="font-label-md font-semibold">{addedToast}</span>
        </div>
      )}

      {/* ── MAIN CONTENT CONTAINER (Generous Luxurious Breathing Space below Fixed Header) ── */}
      <main className="w-full pt-36 sm:pt-44 lg:pt-48 pb-12 bg-transparent flex-1 relative overflow-hidden">
        
        {/* Subtle Ambient Vignettes & Warm Terroir Radiant Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1300px] h-[600px] bg-gradient-to-b from-[#ffdbce]/30 via-[#c5ecce]/20 to-transparent rounded-[100%] blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-64 right-0 w-[550px] h-[550px] bg-[#94492c]/8 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-80 left-0 w-[500px] h-[500px] bg-[#123420]/8 rounded-full blur-[110px] pointer-events-none -z-10" />

        <div className="flex flex-col w-full">

          {/* ══════════════════════════════════════════════════════════════
              1. ELITE HERO SECTION (Panoramic 3-Column: 2D Elements + Standalone Product)
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10 lg:pb-14 w-full">
            
            {/* Centered Editorial Header Block with Generous Margin */}
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center mb-6 sm:mb-8">
              
              {/* Grand Centered Headline */}
              <h1 className="font-display-hero text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.1] text-[#123420] tracking-tight font-serif mb-2.5 sm:mb-3.5">
                The Sovereign Soul of{' '}
                <span className="relative inline-block">
                  <span className="italic font-normal text-[#94492c] font-serif pr-2">
                    Heirloom Masalas
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-[10px] text-[#94492c]/40" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,7 Q50,15 100,5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Elegant Concise Lead */}
              <p className="font-body-lg text-[14.5px] sm:text-[15.5px] text-[#424842] max-w-xl leading-relaxed font-normal mb-3 sm:mb-4">
                Pan-toasted royal botanicals cold granite stone-milled under 30°C in cellar batches. Preserving volatile aromatic oils with pure, unadulterated hot flavour.
              </p>

              {/* FOCUSED CALL TO ACTION */}
              <div className="flex justify-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#123420] text-white font-label-lg text-[13.5px] px-7 py-2.5 rounded-xl shadow-[0_6px_24px_rgba(18,52,32,0.25)] hover:bg-[#1b432a] hover:shadow-[0_10px_30px_rgba(18,52,32,0.32)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  <span className="tracking-wide font-medium">Acquire Reserve Harvest</span>
                  <span className="material-symbols-outlined text-[17px] group-hover:translate-x-1.5 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>

            </div>

            {/* ══════════════════════════════════════════════════════════════
                PANORAMIC 3-COLUMN SHOWCASE STAGE
                - LEFT: 2D Heritage, Terroir & Botanical Formula Elements
                - CENTER: Standalone Product Pouch (NO BOX! Floating & Swaying Left-to-Right)
                - RIGHT: 2D Sensory Matrix, Lab Purity & Degi Pairing Elements
               ══════════════════════════════════════════════════════════════ */}
            <div 
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mt-4 sm:mt-6"
            >

              {/* ── LEFT FREE SPACE: 2D ELEMENTS (Heritage, Terroir & Formulation) ── */}
              <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-4 sm:gap-5 z-20">
                
                {/* 2D Element 1: Terroir Provenance Card */}
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#e8ddca] shadow-[0_6px_24px_rgba(18,52,32,0.06)] hover:border-[#123420]/40 transition-all duration-300 hover:-translate-y-1 group animate-2d-float text-left">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#94492c] font-bold">
                      <span className="material-symbols-outlined text-[14px]">explore</span>
                      TERROIR ORIGIN
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#123420]/8 text-[#123420] font-semibold">
                      #24-M
                    </span>
                  </div>
                  <h4 className="font-serif text-[18px] font-bold text-[#123420] leading-snug">
                    Multan &amp; Peshawar Valley
                  </h4>
                  <p className="font-urdu text-[14px] text-[#94492c] mt-0.5">
                    سنگل اسٹیٹ زرخیز مٹی کی فصل
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#e8ddca]/60 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#424842]">
                    <div className="flex items-center gap-1">
                      <span className="text-[#94492c]">✦</span>
                      <span>30.15° N, 71.52° E</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#94492c]">✦</span>
                      <span>650m ASL Altitude</span>
                    </div>
                  </div>
                </div>

                {/* 2D Element 2: 11-Spice Botanical Formula Card */}
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#e8ddca] shadow-[0_6px_24px_rgba(18,52,32,0.06)] hover:border-[#94492c]/40 transition-all duration-300 hover:-translate-y-1 group animate-2d-float-delayed text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#123420] font-bold">
                      <span className="material-symbols-outlined text-[14px]">spa</span>
                      11-SPICE BOTANICALS
                    </span>
                    <span className="text-[10px] font-bold text-[#94492c] bg-[#ffdbce]/50 px-2 py-0.5 rounded-full">
                      100% Pure
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[#424842] leading-relaxed mb-3">
                    Whole botanicals dry-roasted on cast iron, slow-crushed in cellar granite.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { icon: '⭐', name: 'Star Anise' },
                      { icon: '🌿', name: 'Black Cardamom' },
                      { icon: '🍂', name: 'Toasted Mace' },
                      { icon: '🌶️', name: 'Tellicherry Cloves' },
                      { icon: '🍃', name: 'Green Pods' }
                    ].map((sp, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#f4f4eb] text-[#123420] px-2.5 py-1 rounded-lg border border-[#e8ddca]/80"
                      >
                        <span className="text-[10px]">{sp.icon}</span>
                        {sp.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#e8ddca]/60 flex items-center justify-between text-[11px] font-mono text-[#123420]">
                    <span className="text-[#424842]">Volatile Oils:</span>
                    <span className="font-bold text-[#123420] bg-[#c5ecce]/50 px-2 py-0.5 rounded">
                      98.4% Retained
                    </span>
                  </div>
                </div>

                {/* 2D Element 3: Rotating Vintage Apothecary Seal */}
                <div className="bg-gradient-to-br from-white/95 to-[#f4f4eb]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#e8ddca] flex items-center gap-3.5 shadow-sm animate-2d-float-alt text-left">
                  <div className="w-12 h-12 rounded-full border border-dashed border-[#123420]/40 flex items-center justify-center shrink-0 animate-seal-spin text-[#123420]">
                    <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#123420]">
                      <path id="sealPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                      <text className="text-[9.5px] uppercase font-mono tracking-[0.18em]" fill="currentColor">
                        <textPath href="#sealPath">
                          • ORGANIC NATIVE • STONE MILLED
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold font-serif text-[#123420] leading-tight">
                      Cold Stone-Milled &lt; 30°C
                    </p>
                    <p className="text-[11px] text-[#424842] leading-tight mt-0.5">
                      Zero high-heat friction damage to delicate spice essences.
                    </p>
                  </div>
                </div>

              </div>

              {/* ── CENTER STAGE: STANDALONE FLOATING POUCH (NO BOX! ANIMATED LEFT-TO-RIGHT) ── */}
              <div className="lg:col-span-6 order-1 lg:order-2 relative flex flex-col items-center justify-center min-h-[400px] sm:min-h-[450px]">
                
                {/* Ambient Concentric Celestial Orbit Rings (Behind the product) */}
                <div className="absolute w-[400px] h-[400px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#e8ddca]/80 animate-spin-veryslow pointer-events-none -z-10 flex items-center justify-center">
                  <div className="w-[82%] h-[82%] rounded-full border border-dashed border-[#94492c]/20" />
                </div>
                <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tr from-[#94492c]/12 via-[#c5ecce]/22 to-[#ffdbce]/28 blur-3xl animate-slow-glow pointer-events-none -z-10" />

                {/* Floating Satellite 2D Badges around the Pouch */}
                
                {/* Satellite 1: Top-Left Floating Badge */}
                <div className="absolute -top-1 sm:top-1 left-0 sm:left-4 z-30 animate-particle-1 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e8ddca] shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#123420] animate-pulse" />
                    <span className="text-[11px] font-bold text-[#123420] tracking-wide font-mono uppercase">
                      Always Fresh
                    </span>
                  </div>
                </div>

                {/* Satellite 2: Top-Right Floating Badge */}
                <div className="absolute top-6 sm:top-8 right-0 sm:right-4 z-30 animate-particle-2 pointer-events-none">
                  <div className="bg-[#94492c] text-white px-3.5 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5">
                    <span className="text-[12px]">🔥</span>
                    <span className="text-[11px] font-bold tracking-wide font-mono uppercase">
                      Hot Flavour
                    </span>
                  </div>
                </div>

                {/* Satellite 3: Bottom-Left Floating Badge */}
                <div className="absolute bottom-16 sm:bottom-20 -left-2 sm:left-2 z-30 animate-particle-3 pointer-events-none hidden sm:block">
                  <div className="bg-[#FAF7F0]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#94492c]/30 shadow-md flex items-center gap-2">
                    <span className="text-[#94492c] text-[12px]">✦</span>
                    <span className="text-[11px] font-serif font-bold text-[#123420]">
                      100% Unadulterated
                    </span>
                  </div>
                </div>

                {/* ── THE STANDALONE POUCH (NO BOX!) WITH LEFT-TO-RIGHT ANIMATION ── */}
                <div 
                  className="relative animate-entrance-lr flex flex-col items-center select-none"
                  style={{
                    transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  {/* Left-to-Right Floating Sway Container */}
                  <div className="animate-sway-lr flex flex-col items-center">
                    <img
                      id="hero-pouch-image"
                      src={flagshipProduct.img}
                      alt={flagshipProduct.title}
                      onClick={(e) => handleAddToCart(flagshipProduct, currentHeroOption.weight, currentHeroOption.price, e)}
                      title="Click to add PEPUP Garam Masala to Cart"
                      className="w-auto h-[290px] sm:h-[350px] lg:h-[385px] object-contain drop-shadow-[0_20px_32px_rgba(18,52,32,0.35)] drop-shadow-[0_8px_16px_rgba(148,73,44,0.2)] hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                  </div>

                  {/* Synchronized Oval Pedestal Shadow Underneath the Pouch */}
                  <div className="w-[230px] sm:w-[270px] h-[18px] bg-[#123420]/30 rounded-[100%] blur-md animate-pedestal -mt-3 pointer-events-none" />
                </div>

                {/* Interactive Pack Selector & Quick Acquire Pill (Centered under Pouch) */}
                <div className="mt-4 bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-[#e8ddca] shadow-xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 z-30 max-w-md">
                  <div className="flex items-center gap-1 bg-[#FAF7F0] p-1 rounded-xl border border-[#e8ddca]/80">
                    {heroWeights.map((hw) => (
                      <button
                        key={hw.weight}
                        onClick={() => setSelectedHeroWeight(hw.weight)}
                        className={`px-3 py-1 text-[11.5px] font-mono rounded-lg transition-all cursor-pointer font-semibold ${
                          selectedHeroWeight === hw.weight
                            ? 'bg-[#123420] text-white shadow-sm'
                            : 'text-[#424842] hover:text-[#123420] hover:bg-white/60'
                        }`}
                      >
                        {hw.weight}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pl-1 sm:pl-2">
                    <div className="text-left">
                      <div className="font-serif font-bold text-[17px] sm:text-[18px] text-[#123420] leading-none">
                        Rs. {currentHeroOption.price}
                      </div>
                      <div className="text-[10px] font-mono text-[#94492c]">
                        {currentHeroOption.label}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(flagshipProduct, currentHeroOption.weight, currentHeroOption.price, e)}
                      className="inline-flex items-center gap-1.5 bg-[#94492c] hover:bg-[#7e3d23] text-white font-label-sm text-[12px] px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span className="font-bold">Add to Cart</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* ── RIGHT FREE SPACE: 2D ELEMENTS (Sensory Matrix, Lab Specs & Pairing) ── */}
              <div className="lg:col-span-3 order-3 flex flex-col gap-4 sm:gap-5 z-20">
                
                {/* 2D Element 4: Sensory Matrix & Heat Index Card */}
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#e8ddca] shadow-[0_6px_24px_rgba(18,52,32,0.06)] hover:border-[#94492c]/40 transition-all duration-300 hover:-translate-y-1 group animate-2d-float text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#94492c] font-bold">
                      <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                      HEAT &amp; AROMA INDEX
                    </span>
                    <span className="text-[10px] font-bold text-white bg-[#94492c] px-2 py-0.5 rounded-full">
                      Hot Flavour
                    </span>
                  </div>
                  
                  {/* Visual Heat Meter Gauge */}
                  <div className="my-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#424842] mb-1">
                      <span>Pungency Level</span>
                      <span className="font-bold text-[#94492c]">8.5 / 10 Intensity</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#FAF7F0] rounded-full overflow-hidden border border-[#e8ddca]">
                      <div className="h-full bg-gradient-to-r from-[#fd9e7a] via-[#94492c] to-[#ba1a1a] rounded-full w-[85%]" />
                    </div>
                  </div>

                  <p className="font-urdu text-[13.5px] text-[#123420] font-medium mt-1">
                    تیز، گرم اور خوشبودار ذائقہ
                  </p>
                  
                  <div className="mt-3 pt-2.5 border-t border-[#e8ddca]/60 space-y-1.5 text-[11.5px] text-[#424842]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono">Top Aroma:</span>
                      <span className="font-medium text-[#123420]">Woody Tellicherry Peppercorn</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono">Mid Accent:</span>
                      <span className="font-medium text-[#123420]">Toasted Mace &amp; Green Pods</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono">Texture:</span>
                      <span className="font-medium text-[#123420]">Silk Ground &lt; 120 Mesh</span>
                    </div>
                  </div>
                </div>

                {/* 2D Element 5: Certified Lab Specification Card */}
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#e8ddca] shadow-[0_6px_24px_rgba(18,52,32,0.06)] hover:border-[#123420]/40 transition-all duration-300 hover:-translate-y-1 group animate-2d-float-delayed text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#123420] font-bold">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      LAB SPECIFICATION
                    </span>
                    <span className="text-[10px] font-mono bg-[#c5ecce]/60 text-[#123420] px-2 py-0.5 rounded font-bold">
                      GRADE A+
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-[11.5px] text-[#424842] mt-2">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#123420]">check_circle</span>
                      <span>Zero Synthetic Dyes or Red Ochre</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#123420]">check_circle</span>
                      <span>Zero Sawdust or Spent Starch Bulking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#123420]">check_circle</span>
                      <span>100% Royal Whole Botanicals Only</span>
                    </li>
                  </ul>
                  <div className="mt-3 pt-2.5 border-t border-[#e8ddca]/60 text-[10.5px] font-mono text-[#94492c] flex items-center justify-between">
                    <span>Batch Tested: Oct 2025</span>
                    <span className="font-bold">100% Purity Verified</span>
                  </div>
                </div>

                {/* 2D Element 6: Traditional Degi Pairing & Trust Card */}
                <div className="bg-gradient-to-br from-[#123420]/5 to-[#ffdbce]/20 backdrop-blur-sm p-4 rounded-2xl border border-[#123420]/15 flex items-start gap-3 shadow-sm animate-2d-float-alt text-left">
                  <span className="w-8 h-8 rounded-xl bg-[#123420] text-white flex items-center justify-center shrink-0 text-[16px]">
                    🍳
                  </span>
                  <div>
                    <p className="text-[12px] font-bold font-serif text-[#123420] leading-snug">
                      Degi Qorma &amp; Handi Secret
                    </p>
                    <p className="text-[11px] text-[#424842] leading-relaxed mt-0.5">
                      Sprinkle 1/2 tsp right before dum or in hot desi ghee tadka for authentic restaurant aroma.
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#94492c] font-semibold font-mono">
                      <span>★★★★★ 4.98/5</span>
                      <span className="text-[#424842] font-normal">• 1,240+ cooks</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Subtle Purity Footnote Ribbon */}
            <div className="max-w-2xl mx-auto mt-12 pt-6 border-t border-[#e8ddca] flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-[#424842] text-[13px]">
              <div className="flex items-center gap-2">
                <span className="text-[#94492c]">✦</span>
                <span className="font-medium">Direct Single-Estate Provenance</span>
              </div>
              <span className="opacity-30 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[#94492c]">✦</span>
                <span className="font-medium">Cold Stone-Milled &lt; 30°C</span>
              </div>
              <span className="opacity-30 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="text-[#94492c]">✦</span>
                <span className="font-medium">100% Unadulterated • Zero Fillers</span>
              </div>
            </div>

          </section>

          {/* ══════════════════════════════════════════════════════════════
              2. CURATED CATEGORY SALON (Elite Architectural Styling)
             ══════════════════════════════════════════════════════════════ */}
          <section className="bg-[#FAF7F0] py-20 lg:py-28 border-y border-[#e8ddca] relative overflow-hidden" id="categories">
            
            {/* Ambient Terroir Vignettes (Soft, Luxury Glows) */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-b from-[#ffdbce]/25 via-transparent to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-t from-[#c5ecce]/20 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
              
              {/* Editorial Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#e8ddca] shadow-2xs backdrop-blur-sm mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94492c] animate-pulse"></span>
                    <span className="font-label-sm text-[10px] sm:text-[10.5px] text-[#123420] tracking-[0.22em] uppercase font-bold">
                      The Grand Pantry Salon • 6 Curated Categories
                    </span>
                    <span className="text-[#94492c] text-[10px]">✦</span>
                  </div>

                  <h2 className="font-headline-lg text-[34px] sm:text-[44px] text-[#123420] font-serif leading-tight">
                    Curated Spice Collections
                  </h2>
                  <p className="font-body-md text-[15.5px] sm:text-[16.5px] text-[#424842] mt-2.5 max-w-2xl leading-relaxed">
                    Six distinct culinary expressions gathered at their seasonal peak from Pakistan’s historic terroir basins. Cold stone-milled or sun-cured to preserve volatile aromatic bouquet.
                  </p>
                </div>
                
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2.5 bg-white/95 hover:bg-[#123420] text-[#123420] hover:text-white font-medium text-[13.5px] px-6 py-2.5 rounded-full border border-[#e8ddca] hover:border-[#123420] shadow-sm hover:shadow-md transition-all duration-300 group shrink-0 cursor-pointer"
                >
                  <span className="tracking-wide">Explore All Categories</span>
                  <span className="material-symbols-outlined text-[17px] group-hover:translate-x-1.5 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>

              {/* 6 Category Tiles with Architectural Arched Shape & Elite Craftsmanship */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.id}
                    to={cat.link}
                    className="group bg-gradient-to-b from-white via-white/95 to-[#FAF7F0] rounded-t-[34px] rounded-b-[24px] p-6 sm:p-7 transition-all duration-500 hover:shadow-[0_20px_45px_-12px_rgba(18,52,32,0.16)] hover:-translate-y-2 border border-[#e8ddca] hover:border-[#123420]/45 flex flex-col justify-between relative overflow-hidden ring-1 ring-white/80 cursor-pointer"
                  >
                    {/* Top Architectural Accent Line */}
                    <div className="absolute top-0 inset-x-8 h-[3px] bg-gradient-to-r from-transparent via-[#94492c]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Smooth Radial Corner Ambiance Glow */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#ffdbce]/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                    <div>
                      {/* Top Bar: 2D Heraldic Icon Pod + Urdu / Terroir Capsule + Count Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl ${cat.iconBg} border flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xs`}>
                          <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#123420] bg-white/95 px-3 py-1 rounded-full border border-[#e8ddca] font-bold shadow-2xs">
                            {cat.count}
                          </span>
                        </div>
                      </div>

                      {/* Terroir & Urdu Meta Header */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#94492c] font-bold flex items-center gap-1">
                            <span>✦</span>
                            <span>{cat.tag}</span>
                          </span>
                          <span className="font-urdu text-[15px] text-[#123420] font-medium leading-none">
                            {cat.urdu}
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-[22px] font-bold text-[#123420] group-hover:text-[#94492c] transition-colors leading-snug mt-1.5">
                          {cat.title}
                        </h3>
                      </div>
                      
                      {/* Curated Description */}
                      <p className="font-body-md text-[13.5px] sm:text-[14px] text-[#424842] leading-relaxed mb-4 font-light">
                        {cat.desc}
                      </p>

                      {/* Signature Botanicals 2D Ingredient Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cat.botanicals.map((bot, bIdx) => (
                          <span
                            key={bIdx}
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#FAF7F0] text-[#123420] px-2.5 py-1 rounded-lg border border-[#e8ddca]/80 group-hover:border-[#123420]/25 transition-colors"
                          >
                            <span className="text-[#94492c] text-[9px]">✦</span>
                            <span>{bot}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architectural Bottom Bar */}
                    <div className="pt-3.5 border-t border-[#e8ddca]/70 flex items-center justify-between text-[#424842] text-[12px] font-mono">
                      <div className="flex items-center gap-1.5 text-[#123420]">
                        <span className="material-symbols-outlined text-[14px] text-[#94492c]">location_on</span>
                        <span className="font-medium text-[11.5px]">{cat.terroir}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[#123420] group-hover:text-[#94492c] font-semibold text-[13px] transition-colors">
                        <span>Explore</span>
                        <span className="w-7 h-7 rounded-full bg-[#123420] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#94492c] group-hover:translate-x-1 shadow-2xs">
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>

                  </Link>
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
              5. THE GRAND SOMMELIER FORMULARY & HERITAGE TASTING CHESTS
              (Redesigned to exceed the Hero Section with bespoke imagery, 
               interactive 2D badges, real packaging switch & fly-to-cart action)
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#e8ddca]">
            
            {/* Ambient Terroir Atmosphere Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-[#94492c]/7 via-[#c5ecce]/15 to-transparent rounded-[100%] blur-[130px] pointer-events-none -z-10" />
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Grand Imperial Header */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                
                {/* Vintage Terroir Monogram Stamp */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123420]/8 border border-[#123420]/15 mb-3.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#94492c] animate-pulse" />
                  <span className="font-mono text-[11px] font-bold text-[#123420] tracking-[0.2em] uppercase">
                    Master Sommelier's Reserve • Autumn 2025 Harvest
                  </span>
                  <span className="text-[#94492c] text-[12px]">✦</span>
                </div>

                {/* Grand Headline with Urdu Calligraphy */}
                <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.12] text-[#123420] tracking-tight font-bold mb-2">
                  Heirloom Tasting Vaults &amp;{' '}
                  <span className="italic font-normal text-[#94492c] font-serif">
                    Grand Gifting Chests
                  </span>
                </h2>

                <p className="font-serif text-[17px] sm:text-[19px] text-[#94492c] font-semibold mb-3 tracking-wide" dir="rtl">
                  شاہی دسترخوان کے خاص مجموعے اور تحائف
                </p>

                <p className="font-body-md text-[14.5px] sm:text-[15.5px] text-[#424842] max-w-2xl leading-relaxed mb-6">
                  Small-batch pairings cold granite stone-milled under 30°C for royal Pakistani culinary rituals. Arrives in wax-sealed heirloom packaging with hand-forged brass accoutrements.
                </p>

                {/* Interactive Vault Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-[#FAF7F0] rounded-2xl border border-[#e8ddca] shadow-xs">
                  {[
                    { id: 'all', label: 'All Vault Sets (4)', icon: 'auto_awesome' },
                    { id: 'gifting', label: 'Collector Sheesham Chest', icon: 'inventory_2' },
                    { id: 'rice', label: 'Biryani & Pulao Potli', icon: 'rice_bowl' },
                    { id: 'everyday', label: 'Handi Four Essentials', icon: 'skillet' },
                    { id: 'slow-cook', label: 'Karahi Master Blend', icon: 'local_fire_department' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedVaultFilter(filter.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-mono transition-all duration-300 cursor-pointer font-semibold ${
                        selectedVaultFilter === filter.id
                          ? 'bg-[#123420] text-white shadow-md -translate-y-0.5'
                          : 'text-[#424842] hover:text-[#123420] hover:bg-white/80'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px] opacity-80">{filter.icon}</span>
                      <span>{filter.label}</span>
                    </button>
                  ))}
                </div>

              </div>

              {/* ── SHOWCASE MASTERPIECE: THE GRAND SHEESHAM SPICE CHEST SPOTLIGHT ── */}
              {(selectedVaultFilter === 'all' || selectedVaultFilter === 'gifting') && (
                <div className="relative mb-14 bg-gradient-to-br from-white via-[#FAF7F0]/90 to-white rounded-3xl border border-[#e8ddca] shadow-[0_20px_50px_rgba(18,52,32,0.08)] overflow-hidden p-6 sm:p-8 lg:p-10 transition-all duration-500">
                  
                  {/* Top Architectural Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#e8ddca]/80 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-[#94492c]/10 text-[#94492c] flex items-center justify-center border border-[#94492c]/20">
                        <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                      </span>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#94492c] font-bold block">
                          FLAGSHIP TERROIR MASTERPIECE
                        </span>
                        <span className="text-[13px] font-serif font-bold text-[#123420]">
                          Old Lahore Woodcraft Guild &amp; Khewra Heritage Cellars
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123420] text-white text-[11px] font-mono font-bold tracking-wider">
                        <span className="text-amber-300">✦</span> SAVE 18% OFF BUNDLE
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11.5px] font-mono text-[#123420] font-semibold bg-[#c5ecce]/50 px-2.5 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                        Free Express Delivery
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left: Interactive Visual Plinth with 2D Badges */}
                    <div className="lg:col-span-7 relative group">
                      
                      {/* Image Stage Container */}
                      <div className="relative rounded-2xl overflow-hidden border border-[#e8ddca] shadow-2xl bg-stone-900 aspect-[4/3]">
                        <img
                          id="vault-spotlight-img"
                          src="/heritage_spice_chest.jpg"
                          alt="The Grand Sheesham Spice Chest"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* 2D Satellite Badge 1 (Top Left): 12 Amber Glass Jars */}
                      <div className="absolute -top-3 -left-2 sm:top-4 sm:left-4 z-20 animate-2d-float pointer-events-none">
                        <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#e8ddca] shadow-lg flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#123420]" />
                          <div>
                            <span className="text-[11px] font-bold font-mono text-[#123420] block leading-tight">
                              12 Amber Jars
                            </span>
                            <span className="text-[9.5px] text-[#94492c] font-mono">
                              UV Shield Protection
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2D Satellite Badge 2 (Bottom Right): Hand-Forged Brass Spoon */}
                      <div className="absolute -bottom-3 -right-2 sm:bottom-4 sm:right-4 z-20 animate-2d-float-delayed pointer-events-none">
                        <div className="bg-[#123420] text-white px-3.5 py-2 rounded-xl shadow-xl border border-[#c5ecce]/30 flex items-center gap-2.5">
                          <span className="text-amber-300 text-[14px]">✦</span>
                          <div>
                            <span className="text-[11px] font-bold font-mono block leading-tight">
                              Hand-Forged Brass Spoon
                            </span>
                            <span className="text-[9.5px] text-[#c5ecce] font-mono">
                              Artisan Gifting Edition
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2D Satellite Badge 3 (Bottom Left): Wax Sealed Harvest Deed */}
                      <div className="absolute bottom-6 left-4 z-20 hidden sm:block animate-2d-float-alt pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#e8ddca] shadow-md flex items-center gap-1.5">
                          <span className="text-[#ba1a1a] text-[13px]">♦</span>
                          <span className="text-[10.5px] font-serif font-bold text-[#123420]">
                            Wax-Sealed Deed Included
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Right: Connoisseur Specifications & Actions */}
                    <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-5">
                      
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#94492c] uppercase font-bold tracking-widest mb-1.5">
                          <span>TERROIR RESERVE #V-01</span>
                          <span>•</span>
                          <span className="text-[#123420]">100% UNADULTERATED</span>
                        </div>

                        <h3 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#123420] leading-tight">
                          The Grand Sheesham Spice Chest
                        </h3>
                        
                        <p className="font-serif text-[18px] text-[#94492c] font-semibold mt-0.5" dir="rtl">
                          شاہی شیشم مصالحہ صندوق
                        </p>

                        <p className="font-body-md text-[13.5px] text-[#424842] leading-relaxed mt-2.5">
                          Twelve reserve single-estate harvests in UV-blocking amber glass apothecary jars, nestled inside an artisan brass-latched sheesham wood chest with hand-forged antique brass measuring spoon.
                        </p>
                      </div>

                      {/* Included Botanical Chips Grid */}
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#123420] font-bold block mb-2">
                          Core Botanicals Included in Chest:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-[11.5px] font-medium text-[#424842]">
                          {[
                            'Kasur Golden Haldi (5.2%)',
                            'Kunri Stone-Milled Mirch',
                            'Quetta White Zeera',
                            'Tellicherry Black Pepper',
                            'Green Cardamom Pods',
                            'Imperial Biryani Masala'
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 bg-[#FAF7F0] p-1.5 rounded-lg border border-[#e8ddca]/80">
                              <span className="text-[#123420] text-[12px] font-bold">✓</span>
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Packaging Switcher */}
                      <div className="bg-[#FAF7F0] p-2.5 rounded-2xl border border-[#e8ddca]">
                        <span className="text-[11px] font-mono uppercase text-[#94492c] font-bold block mb-1.5">
                          Select Packaging Grade:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setSelectedChestPackaging('sheesham')}
                            className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                              selectedChestPackaging === 'sheesham'
                                ? 'bg-white border-[#123420] shadow-sm ring-1 ring-[#123420]'
                                : 'bg-transparent border-[#e8ddca] hover:bg-white/50'
                            }`}
                          >
                            <span className="text-[12px] font-serif font-bold text-[#123420] block">
                              Sheesham Brass Chest
                            </span>
                            <span className="text-[11px] font-mono text-[#94492c] font-bold">
                              Rs. 4,800
                            </span>
                          </button>

                          <button
                            onClick={() => setSelectedChestPackaging('kraft')}
                            className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                              selectedChestPackaging === 'kraft'
                                ? 'bg-white border-[#123420] shadow-sm ring-1 ring-[#123420]'
                                : 'bg-transparent border-[#e8ddca] hover:bg-white/50'
                            }`}
                          >
                            <span className="text-[12px] font-serif font-bold text-[#123420] block">
                              Cellar Kraft Gift Box
                            </span>
                            <span className="text-[11px] font-mono text-[#424842] font-bold">
                              Rs. 3,200
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Price & Call to Action (With Direct Fly-to-Cart Animation) */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#e8ddca]/80">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif font-bold text-[24px] sm:text-[28px] text-[#123420]">
                              Rs. {selectedChestPackaging === 'sheesham' ? '4,800' : '3,200'}
                            </span>
                            <span className="font-mono text-[13px] text-[#424842]/60 line-through">
                              Rs. {selectedChestPackaging === 'sheesham' ? '5,850' : '3,800'}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#94492c] font-bold">
                            Includes 12 Apothecary Jars + Brass Spoon
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            const currentBundle = COLLECTIONS[0];
                            const price = selectedChestPackaging === 'sheesham' ? 4800 : 3200;
                            const packaging = selectedChestPackaging === 'sheesham' ? 'Sheesham Brass Chest' : 'Cellar Kraft Box';
                            handleBundleAddToCart(currentBundle, price, packaging, e);
                          }}
                          className="inline-flex items-center gap-2 bg-[#123420] hover:bg-[#1b432a] text-white font-label-md text-[13.5px] px-6 py-3 rounded-xl shadow-[0_6px_20px_rgba(18,52,32,0.25)] hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 group font-bold"
                        >
                          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                          <span>Acquire Grand Chest</span>
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* ── THE 3 COMPANION HERITAGE VAULTS (ARCHITECTURAL PLINTHS) ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {COLLECTIONS.filter(c => !c.featured).map((col) => {
                  if (selectedVaultFilter !== 'all' && selectedVaultFilter !== col.category) {
                    return null;
                  }
                  return (
                    <div
                      key={col.id}
                      className="group bg-white rounded-3xl border border-[#e8ddca] shadow-[0_10px_30px_rgba(18,52,32,0.05)] hover:shadow-[0_20px_45px_rgba(18,52,32,0.14)] hover:border-[#123420]/40 transition-all duration-500 flex flex-col justify-between overflow-hidden text-left"
                    >
                      <div>
                        
                        {/* High-Resolution Product Framing */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-stone-900 border-b border-[#e8ddca]">
                          <img
                            src={col.img}
                            alt={col.title}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 select-none"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                          {/* Savings Badge */}
                          <div className="absolute top-3 right-3 z-10">
                            <span className="px-3 py-1 rounded-full bg-[#123420] text-white font-mono text-[10.5px] font-bold shadow-md tracking-wider">
                              {col.savings}
                            </span>
                          </div>

                          {/* Category Tag */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[#94492c] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#e8ddca]">
                              {col.badge}
                            </span>
                          </div>

                          {/* Package Count Pill */}
                          <div className="absolute bottom-3 left-3 z-10">
                            <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[10.5px] border border-white/20">
                              {col.itemsCount}
                            </span>
                          </div>
                        </div>

                        {/* Card Content Block */}
                        <div className="p-6">
                          
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#94492c] font-bold uppercase mb-1">
                            <span>{col.terroir}</span>
                          </div>

                          <h4 className="font-serif text-[20px] font-bold text-[#123420] group-hover:text-[#94492c] transition-colors leading-snug">
                            {col.title}
                          </h4>

                          <p className="font-serif text-[14.5px] text-[#94492c] font-semibold mt-0.5" dir="rtl">
                            {col.urduTitle}
                          </p>

                          <p className="font-body-sm text-[12.5px] text-[#424842] leading-relaxed mt-2.5 line-clamp-2">
                            {col.desc}
                          </p>

                          {/* Botanical Inclusion Chips */}
                          <div className="mt-4 pt-3 border-t border-[#e8ddca]/70">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#123420] font-bold block mb-1.5">
                              Included Pairings:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {col.items.slice(0, 3).map((item, iIdx) => (
                                <span
                                  key={iIdx}
                                  className="inline-flex items-center gap-1 text-[10.5px] font-medium bg-[#FAF7F0] text-[#123420] px-2 py-0.5 rounded-md border border-[#e8ddca]/80"
                                >
                                  <span className="text-[#94492c] text-[8px]">✦</span>
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Card Footer & Action Bar */}
                      <div className="p-6 pt-0">
                        <div className="pt-3 border-t border-[#e8ddca]/80 flex items-center justify-between gap-3">
                          
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-serif font-bold text-[19px] text-[#123420]">
                                Rs. {col.price}
                              </span>
                              <span className="font-mono text-[11.5px] text-[#424842]/60 line-through">
                                Rs. {col.originalPrice}
                              </span>
                            </div>
                            <span className="text-[9.5px] font-mono text-[#94492c] font-semibold block">
                              Free Delivery Qualified
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setInspectingBundle(col)}
                              className="px-2.5 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#e8ddca]/60 text-[#123420] text-[11.5px] font-mono font-medium transition-colors cursor-pointer border border-[#e8ddca]"
                              title="Inspect contents"
                              type="button"
                            >
                              Inspect
                            </button>

                            <button
                              onClick={(e) => handleBundleAddToCart(col, col.price, col.packaging, e)}
                              className="inline-flex items-center gap-1 bg-[#123420] hover:bg-[#1b432a] text-white text-[12px] font-label-sm font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[15px]">shopping_bag</span>
                              <span>Acquire</span>
                            </button>
                          </div>

                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* ── INSPECT BUNDLE DETAILS MODAL ── */}
            {inspectingBundle && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                <div className="w-full max-w-lg bg-[#FAF7F0] rounded-3xl border border-[#e8ddca] shadow-2xl overflow-hidden text-left animate-slide-left">
                  
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-900 border-b border-[#e8ddca]">
                    <img
                      src={inspectingBundle.img}
                      alt={inspectingBundle.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setInspectingBundle(null)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#123420] flex items-center justify-center cursor-pointer shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-mono text-[11px] border border-white/20">
                      {inspectingBundle.packaging}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#94492c] font-bold">
                        {inspectingBundle.terroir}
                      </span>
                      <h3 className="font-serif text-[22px] font-bold text-[#123420]">
                        {inspectingBundle.title}
                      </h3>
                      <p className="font-serif text-[16px] text-[#94492c]" dir="rtl">
                        {inspectingBundle.urduTitle}
                      </p>
                      <p className="font-body-md text-[13px] text-[#424842] mt-1.5 leading-relaxed">
                        {inspectingBundle.desc}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-[#e8ddca]">
                      <span className="text-[11px] font-mono uppercase text-[#123420] font-bold block mb-2">
                        Complete Formulation Breakdown:
                      </span>
                      <ul className="space-y-1.5 text-[12px] text-[#424842]">
                        {inspectingBundle.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[15px] text-[#123420]">verified</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#e8ddca]">
                      <div>
                        <div className="font-serif font-bold text-[20px] text-[#123420]">
                          Rs. {inspectingBundle.price}
                        </div>
                        <span className="text-[10px] font-mono text-[#94492c]">
                          Includes Free Nationwide Delivery
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          handleBundleAddToCart(inspectingBundle, inspectingBundle.price, inspectingBundle.packaging, e);
                          setInspectingBundle(null);
                        }}
                        className="px-6 py-2.5 bg-[#123420] hover:bg-[#1b432a] text-white rounded-xl font-label-md font-bold text-[13px] flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                        <span>Acquire Bundle</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </section>

          {/* ══════════════════════════════════════════════════════════════
              6. PROFESSIONAL REVIEWS & TESTIMONIALS (WARM PALETTE)
              Clean, compact, premium review stage matching site color scheme.
             ══════════════════════════════════════════════════════════════ */}
          <section id="connoisseur-reviews" className="bg-[#FAF7F0] py-14 sm:py-16 border-t border-[#e8ddca]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pr-16 lg:pr-20">
              
              {/* ── HEADER: TITLE, AGGREGATE RATING & WRITE ACTION ── */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#e8ddca]">
                
                {/* Heading & Subtitle */}
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#94492c] uppercase tracking-widest block mb-1">
                    VERIFIED KITCHEN APPRAISALS • کسٹمر کے تاثرات
                  </span>
                  <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#123420] tracking-tight leading-tight">
                    Loved by Master Chefs &amp; Passionate Home Cooks
                  </h2>
                  <p className="text-[#424842] text-[13.5px] sm:text-[14.5px] mt-1 font-normal max-w-xl">
                    Unedited evaluations from leading Pakistani degi masters, food historians, and family home kitchens.
                  </p>
                </div>

                {/* Score & Write Review Button */}
                <div className="flex flex-wrap items-center gap-4 shrink-0">
                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#e8ddca] shadow-2xs">
                    <div className="flex items-center gap-0.5 text-[#94492c]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <div className="h-4 w-px bg-[#e8ddca]" />
                    <div className="text-[12px] font-mono text-[#123420]">
                      <span className="font-bold text-[14px]">4.98</span>
                      <span className="text-[#424842]/70 ml-1">(2,480+ audits)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsWriteReviewOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#123420] hover:bg-[#1b432a] text-white text-[12.5px] font-mono font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px]">rate_review</span>
                    <span>Write a Review</span>
                  </button>
                </div>

              </div>

              {/* ── COHORT FILTER TABS ── */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                {REVIEW_CATEGORIES.map(cat => {
                  const isActive = selectedReviewCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedReviewCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#123420] text-white font-bold shadow-xs'
                          : 'bg-white hover:bg-[#e8ddca]/40 text-[#424842] border border-[#e8ddca]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#FAF7F0] text-[#123420] font-bold'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ── CLEAN, COMPACT 3-CARD REVIEW GRID ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {reviewsList
                  .filter(r => (selectedReviewCategory === 'all' ? true : r.category === selectedReviewCategory))
                  .map(rev => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-2xl p-6 border border-[#e8ddca] hover:border-[#123420]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group text-left"
                    >
                      <div>
                        
                        {/* Top Row: Rating & Verified Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-0.5 text-[#94492c]">
                            {[...Array(rev.rating)].map((_, i) => (
                              <span key={i} className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                          </div>

                          <span className="bg-[#c5ecce]/60 text-[#123420] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                            <span className="material-symbols-outlined text-[12px]">verified</span>
                            <span>{rev.verified}</span>
                          </span>
                        </div>

                        {/* Title & Concise Quote */}
                        <h3 className="font-serif font-bold text-[15.5px] text-[#123420] mb-2 leading-snug group-hover:text-[#94492c] transition-colors">
                          {rev.title}
                        </h3>
                        <p className="text-[13px] text-[#424842] leading-relaxed italic line-clamp-3">
                          “{rev.quote}”
                        </p>

                        {/* Product Tested Pill */}
                        <div className="mt-3.5 inline-flex items-center gap-1.5 bg-[#FAF7F0] border border-[#e8ddca] px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#94492c] font-semibold">
                          <span className="material-symbols-outlined text-[13px]">psychiatry</span>
                          <span>{rev.productTested}</span>
                        </div>

                      </div>

                      {/* Bottom Row: Reviewer Details & Helpful Button */}
                      <div className="pt-4 mt-4 border-t border-[#e8ddca]/80 flex items-center justify-between">
                        
                        <div className="flex items-center gap-2.5 min-w-0">
                          {rev.avatar ? (
                            <img
                              src={rev.avatar}
                              alt={rev.author}
                              className="w-9 h-9 rounded-full object-cover border border-[#e8ddca] shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#FAF7F0] border border-[#e8ddca] flex items-center justify-center font-serif font-bold text-[12px] text-[#123420] shrink-0">
                              {rev.avatarInitials}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-serif font-bold text-[13.5px] text-[#123420] leading-tight truncate">
                              {rev.author}
                            </p>
                            <p className="font-mono text-[11px] text-[#424842]/70 leading-tight truncate">
                              {rev.role}
                            </p>
                          </div>
                        </div>

                        {/* Helpful Counter Button */}
                        <button
                          onClick={() => handleToggleHelpful(rev.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer shrink-0 ${
                            helpfulVotes[rev.id]
                              ? 'bg-[#123420] text-white font-bold'
                              : 'bg-[#FAF7F0] hover:bg-[#e8ddca]/60 text-[#424842] border border-[#e8ddca]'
                          }`}
                          title="Was this review helpful?"
                        >
                          <span className="material-symbols-outlined text-[13px]">thumb_up</span>
                          <span>{rev.helpfulCount}</span>
                        </button>

                      </div>

                    </div>
                  ))}
              </div>

            </div>

            {/* ── WRITE A REVIEW MODAL (CLEAN LIGHT CREAM THEME) ── */}
            {isWriteReviewOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                <div className="w-full max-w-lg bg-[#FAF7F0] rounded-3xl border border-[#e8ddca] p-6 sm:p-7 shadow-2xl relative text-left text-[#1a1c17] overflow-y-auto max-h-[90vh]">
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white text-[#123420] border border-[#e8ddca] flex items-center justify-center hover:bg-[#e8ddca] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>

                  <div className="mb-5">
                    <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#94492c] font-bold block mb-1">
                      KITCHEN FEEDBACK • کسٹمر رائے
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#123420]">
                      Write a Kitchen Review
                    </h3>
                    <p className="text-[#424842] text-[13px] font-body-sm mt-0.5">
                      Share your genuine cooking experience with home cooks across Pakistan.
                    </p>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                    
                    {/* Star Rating Picker */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#424842] font-bold mb-1">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-xl border border-[#e8ddca] w-fit">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            type="button"
                            key={starVal}
                            onClick={() => setReviewFormData({ ...reviewFormData, rating: starVal })}
                            className="text-[#94492c] hover:scale-125 transition-transform cursor-pointer"
                          >
                            <span
                              className="material-symbols-outlined text-[24px]"
                              style={{ fontVariationSettings: starVal <= reviewFormData.rating ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              star
                            </span>
                          </button>
                        ))}
                        <span className="font-mono text-[12.5px] text-[#123420] font-bold ml-2">
                          {reviewFormData.rating}.0 / 5.0
                        </span>
                      </div>
                    </div>

                    {/* Name & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#424842] font-bold mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewFormData.author}
                          onChange={(e) => setReviewFormData({ ...reviewFormData, author: e.target.value })}
                          placeholder="e.g. Fatima K."
                          className="w-full bg-white border border-[#e8ddca] rounded-xl px-3.5 py-2 text-[#1a1c17] text-[13px] focus:outline-hidden focus:border-[#123420]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#424842] font-bold mb-1">
                          City / District *
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewFormData.location}
                          onChange={(e) => setReviewFormData({ ...reviewFormData, location: e.target.value })}
                          placeholder="e.g. Model Town, Lahore"
                          className="w-full bg-white border border-[#e8ddca] rounded-xl px-3.5 py-2 text-[#1a1c17] text-[13px] focus:outline-hidden focus:border-[#123420]"
                        />
                      </div>
                    </div>

                    {/* Product Selection */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#424842] font-bold mb-1">
                        Product Reviewed *
                      </label>
                      <select
                        value={reviewFormData.productTested}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, productTested: e.target.value })}
                        className="w-full bg-white border border-[#e8ddca] rounded-xl px-3.5 py-2 text-[#1a1c17] text-[13px] focus:outline-hidden focus:border-[#123420]"
                      >
                        <option value="PEPUP Garam Masala Reserve #24-M">PEPUP Garam Masala Reserve</option>
                        <option value="Kasur Golden Haldi (5.2% Curcumin)">Kasur Golden Haldi (5.2% Curcumin)</option>
                        <option value="Kunri Sun-Dried Lal Mirch">Kunri Sun-Dried Lal Mirch</option>
                        <option value="Royal White Zeera & Everyday Trio">Royal White Zeera &amp; Everyday Trio</option>
                        <option value="The Grand Sheesham Spice Chest">The Grand Sheesham Spice Chest</option>
                        <option value="Namak Mandi Karahi Master Set">Namak Mandi Karahi Master Set</option>
                      </select>
                    </div>

                    {/* Review Title */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#424842] font-bold mb-1">
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={reviewFormData.title}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, title: e.target.value })}
                        placeholder="e.g. “Incredible aroma bloom in ghee”"
                        className="w-full bg-white border border-[#e8ddca] rounded-xl px-3.5 py-2 text-[#1a1c17] text-[13px] focus:outline-hidden focus:border-[#123420]"
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#424842] font-bold mb-1">
                        Detailed Review *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewFormData.quote}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, quote: e.target.value })}
                        placeholder="Describe the aroma, taste, color, or how it elevated your dish..."
                        className="w-full bg-white border border-[#e8ddca] rounded-xl p-3 text-[#1a1c17] text-[13px] focus:outline-hidden focus:border-[#123420] leading-relaxed"
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsWriteReviewOpen(false)}
                        className="px-4 py-2 rounded-xl border border-[#e8ddca] text-[#424842] font-mono text-[12px] hover:bg-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#123420] hover:bg-[#1b432a] text-white font-bold text-[12.5px] font-mono shadow-md cursor-pointer"
                      >
                        Publish Review
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            )}

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
