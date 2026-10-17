import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Garam Masala Powder',
    urduName: 'گرم مصالحہ پاؤڈر',
    subtitle: 'Heritage 11-spice slow roast blend',
    tag: 'HERITAGE BLEND',
    tagColor: 'text-tertiary',
    category: 'Masala Blends',
    price: 450,
    weight: '200g Pouch',
    origin: 'Multan & Peshawar Valley',
    heatLevel: 3,
    aroma: 'Warm, Woody & Peppercorn',
    inStock: true,
    rating: 4.9,
    reviewsCount: 128,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMFIrGJU6BMzFc2_kJbRIvWRDcXaXf83GReCl3HH2RMP2VYlGrk42FAKht5fZNs4OWJBkLvhA0DoqrixNIiYsmQCCk-58jIvWsoOCAAGPgKrv4OCTxvmXY6cGnY9F6uAjycoUsclsEOkM9b6B6GNNOztwTTGWlmWheKU4BuLHEGx8SmEUYaZ2hRYigH8GF9oOEhgQ90pAlCJIcj82Q0zvahmy0GGJViEl2BRzhuluk6jclNjAIbnYYdA',
  },
  {
    id: 2,
    name: 'Red Chilli Powder (Lal Mirch)',
    urduName: 'سرخ مرچ پاؤڈر',
    subtitle: 'Stone-ground Sindh red chillies, vibrant heat',
    tag: 'KUNRI ESTATE',
    tagColor: 'text-secondary',
    category: 'Everyday Powders',
    price: 380,
    weight: '250g Pouch',
    origin: 'Kunri, Sindh',
    heatLevel: 4,
    aroma: 'Fiery & Sun-Dried Pungent',
    inStock: true,
    rating: 4.8,
    reviewsCount: 94,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDTGw7zXkz0kTwGs6bu_HhEG_6jx7oKBeUy7-fBs50jibH88-EScXm72b3Ua5Yyd3eYDDD-lWXo0Z9Zz2jIV1IYphaiy8FfWNPHLAAgE2a3-dfaiWY39bIyOSfGxQhdJlggELIonwy-49T0TeaHTYjx5g82sSdvMFpXdQ3kY9xPOG5TRSv2pRG_AifA3LzSAr1yRnUZ5IQDfSix7ULiK3QPb2cfjQw-nbRN6NHjxFJdSZfgeA7xgUZ6Q',
  },
  {
    id: 3,
    name: 'Turmeric Powder (Haldi)',
    urduName: 'خالص ہلدی پاؤڈر',
    subtitle: 'High curcumin golden harvest, fragrant aroma',
    tag: 'KASUR HARVEST',
    tagColor: 'text-tertiary',
    category: 'Everyday Powders',
    price: 320,
    weight: '200g Pouch',
    origin: 'Kasur, Punjab',
    heatLevel: 1,
    aroma: 'Earthy & Golden Botanical',
    inStock: true,
    rating: 5.0,
    reviewsCount: 156,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMQHOEoksEX7i3er22bFO7weghP1-wqgMErvf60ULzfh7vHeIm2hJWwAfZKOsyAiTdHoFYOhJIzZH9Q6xxD81HManIY9MiieaijdnAFQJjgNL_2xZLjFzoTEYeL0qUIjjruYwVIHZVq3RGLuhTQBXydSq3IfYmptINKK_WEQRGsEiLRolv8h8mOA9RaSALIwS_xXK35iqoyGJ_4S5exBR4jpiS-4lfTnZIruGGdwkEdHQnwligLjuWLw',
  },
  {
    id: 4,
    name: 'Coriander Powder (Dhaniya)',
    urduName: 'پسا ہوا دھنیا',
    subtitle: 'Roasted & freshly cracked green coriander',
    tag: 'SLOW CRACKED',
    tagColor: 'text-primary-container',
    category: 'Everyday Powders',
    price: 350,
    weight: '200g Pouch',
    origin: 'Bahawalpur, Punjab',
    heatLevel: 1,
    aroma: 'Citrusy & Mild Herbal',
    inStock: true,
    rating: 4.7,
    reviewsCount: 72,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG2t0M8K0KVVXQzJYFqYrj-wbGe5D9m-HnXcb6pQ22lfdQe5PIMdR5yAVAg14hA0DNA50fGuueu8ezr_WqTynp9DCj867Pwr0-oU5tJvgrZQdNSuwcUYD7pvPtFp-CRTiC6YOVXVVPB1Kj3e6cksHbS2aC-4iuO4fGHrH92KfENgHysa8gqC8rNrp6wDFEXWXR1_rYCpWj5hrithfutiTvstBsAq_m0ErJh2fgFHFP3qAIzfzMm_g2bg',
  },
  {
    id: 5,
    name: 'Cumin Seeds (Zeera)',
    urduName: 'سفید زیرہ',
    subtitle: 'Sun-dried fragrant Pakistani white cumin seeds',
    tag: 'SUN DRIED',
    tagColor: 'text-tertiary',
    category: 'Whole Spices',
    price: 520,
    weight: '150g Pouch',
    origin: 'Quetta Plateau, Balochistan',
    heatLevel: 1,
    aroma: 'Nutty, Pungent & Warm',
    inStock: true,
    rating: 4.9,
    reviewsCount: 110,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBIQkNNrVSNOaE43YDZJu2mY_0B21NqDeiZyEMhI05ifYl5oNZX9UL3fSoUu_YnT0NbkWKxAOTE7jbm6mAgtSQpFT2FJHEf8jZGGbZIFys1acZuAjSy2dQxJ2nd3YaGnwsVoWPeXH1qddayBp37N1Iye4RSfmuyLLVTntBNM0HBMMCumjTVYIYZrt6X-eNC0r-CzzgztDBpnW63VzruKBo-ptGmItR4WBb1qMoE0Or4ze8RczcwHgULw',
  },
  {
    id: 6,
    name: 'Black Pepper (Kali Mirch)',
    urduName: 'ثابت کالی مرچ',
    subtitle: 'Bold aromatic whole black peppercorns',
    tag: 'BOLD PEPPER',
    tagColor: 'text-on-surface-variant',
    category: 'Whole Spices',
    price: 680,
    weight: '150g Pouch',
    origin: 'Coastal Heritage Reserve',
    heatLevel: 4,
    aroma: 'Sharp Floral & Resinous Heat',
    inStock: true,
    rating: 4.9,
    reviewsCount: 88,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaorZ6Cl_T1V6gBtZjm_Rz4z5HnXpgfVClcjHoaGGA_muS-aUXLrxl2KxiBj-3ARk3RxmUxedrI-aLIJbFwnbrAg91GLoQP9jh5O-TEnNm6P5HjzmJ5uDQ1TKg1YGLhjTDVehpf2utTZkov_y87lucCzI-ZLzlE9z_Ln9e_3ZZTcKluKpAymE52YNiWc-NAKpxNb8ZSlmfqz0bKJYdv3aHtsDAPfR4RQl37so4Yuo-xu9yRNNFNjfJDw',
  },
  {
    id: 7,
    name: 'Traditional Biryani Masala',
    urduName: 'شاہی بریانی مصالحہ',
    subtitle: 'Nutmeg, mace, dried plum & handpicked whole spices',
    tag: 'ROYAL RECIPE',
    tagColor: 'text-secondary',
    category: 'Masala Blends',
    price: 420,
    weight: '100g Pouch',
    origin: 'Old Lahore Royal Formulary',
    heatLevel: 3,
    aroma: 'Imperial Cardamom, Mace & Clove',
    inStock: true,
    rating: 5.0,
    reviewsCount: 204,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnYiEi6M-ZQAJ-sYvwA-Nh1BeArzEZvQ_cT0qHYYNWMoKarlzvWCiLZgO-hJ3yVv9-SjIi6LXbVLs2AHbJ2JIcrei8CbfS5sIMoytXR1HRvfRPwoF-Eh9o7MprDGG2Y93646YueQvddmoVRr0JEvdha0m1-lAqcOb2nDlN0qz3dQchzURm3SA_6S-szpKPNSdePArO5DTh1dMvdOwBu0-FMyWbm1pMytWHc10szRboqJTrckWn9iIoXA',
  },
  {
    id: 8,
    name: 'Authentic Karahi Masala',
    urduName: 'اصلی کڑاہی مصالحہ',
    subtitle: 'Coarse crushed coriander, black pepper & cumin',
    tag: 'CLAY POT CRAFT',
    tagColor: 'text-primary',
    category: 'Masala Blends',
    price: 420,
    weight: '100g Pouch',
    origin: 'Peshawar Namak Mandi Recipe',
    heatLevel: 3,
    aroma: 'Coarse Roasted Cumin & Black Pepper',
    inStock: true,
    rating: 4.8,
    reviewsCount: 97,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc4RJm3Bm25s68soI9euZcax01pP1LUiepkRzoQT1CeUTno4aNRCqIXQGvaAu5CTr2zfDE5CNVAN0NVVCV3Uvxrl185IT-QDw0Toplwbpn-G-U3kgEjYbhHBokmlKzzNYSxX3ccVq4snxiFceEeqZ1FGm6UW6B2jTzwNDIENhtna8O3bc7-u6EegdqQz06yg_PemuVM9YG-0hw8de_bYqc9X4aT_4f-5anvP8TlHM3K6CZ5j-S-t9umw',
  },
  {
    id: 9,
    name: 'Himalayan Pink Rock Salt (Fine)',
    urduName: 'ہمہالیہ گلابی نمک',
    subtitle: 'Ancient mineral brine crystals from Khewra mines',
    tag: 'RAW MINED',
    tagColor: 'text-secondary',
    category: 'Heirloom Seasonings',
    price: 220,
    weight: '500g Jar',
    origin: 'Khewra, Jhelum',
    heatLevel: 0,
    aroma: 'Pure Mineral Clean',
    inStock: true,
    rating: 4.9,
    reviewsCount: 84,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMQHOEoksEX7i3er22bFO7weghP1-wqgMErvf60ULzfh7vHeIm2hJWwAfZKOsyAiTdHoFYOhJIzZH9Q6xxD81HManIY9MiieaijdnAFQJjgNL_2xZLjFzoTEYeL0qUIjjruYwVIHZVq3RGLuhTQBXydSq3IfYmptINKK_WEQRGsEiLRolv8h8mOA9RaSALIwS_xXK35iqoyGJ_4S5exBR4jpiS-4lfTnZIruGGdwkEdHQnwligLjuWLw',
  },
  {
    id: 10,
    name: 'Green Cardamom Pods (Sabz Elaichi)',
    urduName: 'سبز الائچی',
    subtitle: 'Jumbo whole aromatic emerald pods',
    tag: 'HAND PICKED',
    tagColor: 'text-primary',
    category: 'Whole Spices',
    price: 980,
    weight: '50g Glass Jar',
    origin: 'Selected High Altitude',
    heatLevel: 1,
    aroma: 'Intense Menthol & Sweet Pine',
    inStock: true,
    rating: 5.0,
    reviewsCount: 142,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMFIrGJU6BMzFc2_kJbRIvWRDcXaXf83GReCl3HH2RMP2VYlGrk42FAKht5fZNs4OWJBkLvhA0DoqrixNIiYsmQCCk-58jIvWsoOCAAGPgKrv4OCTxvmXY6cGnY9F6uAjycoUsclsEOkM9b6B6GNNOztwTTGWlmWheKU4BuLHEGx8SmEUYaZ2hRYigH8GF9oOEhgQ90pAlCJIcj82Q0zvahmy0GGJViEl2BRzhuluk6jclNjAIbnYYdA',
  }
];

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('on_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 1, size: '200g Pouch' },
      { product: INITIAL_PRODUCTS[1], quantity: 1, size: '250g Pouch' }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('on_wishlist');
    return saved ? JSON.parse(saved) : { 1: true };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCartBumping, setIsCartBumping] = useState(false);
  const [flyingPackets, setFlyingPackets] = useState([]);

  useEffect(() => {
    localStorage.setItem('on_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('on_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const triggerFlyToCart = (imgUrl, startRect) => {
    if (!startRect) return;
    const cartTarget = document.getElementById('floating-cart-target');
    if (!cartTarget) return;

    const targetRect = cartTarget.getBoundingClientRect();
    const startX = startRect.left + (startRect.width / 2);
    const startY = startRect.top + (startRect.height / 2);
    const targetX = targetRect.left + (targetRect.width / 2);
    const targetY = targetRect.top + (targetRect.height / 2);

    const deltaX = targetX - startX;
    const deltaY = targetY - startY;

    const packetId = 'packet_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const newPacket = {
      id: packetId,
      img: imgUrl,
      startX,
      startY,
      deltaX,
      deltaY,
    };

    setFlyingPackets(prev => [...prev, newPacket]);

    // Duration matches CSS animation (850ms)
    setTimeout(() => {
      setFlyingPackets(prev => prev.filter(p => p.id !== packetId));
      setIsCartBumping(true);
      setTimeout(() => setIsCartBumping(false), 550);
    }, 850);
  };

  const addToCart = (product, quantity = 1, size = 'Standard Pouch', startRectOrElement = null) => {
    // If startRect or element/event was provided, trigger flying animation
    if (startRectOrElement) {
      let rect = null;
      if (startRectOrElement.target && typeof startRectOrElement.target.getBoundingClientRect === 'function') {
        rect = startRectOrElement.currentTarget ? startRectOrElement.currentTarget.getBoundingClientRect() : startRectOrElement.target.getBoundingClientRect();
      } else if (typeof startRectOrElement.getBoundingClientRect === 'function') {
        rect = startRectOrElement.getBoundingClientRect();
      } else if (typeof startRectOrElement.left === 'number') {
        rect = startRectOrElement;
      }
      if (rect) {
        triggerFlyToCart(product.img, rect);
      }
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, size }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 2500;
  const deliveryFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;
  const cartTotal = cartSubtotal + deliveryFee;

  return (
    <ShopContext.Provider value={{
      products: INITIAL_PRODUCTS,
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartSubtotal,
      cartTotal,
      cartCount,
      deliveryFee,
      freeShippingThreshold,
      wishlist,
      toggleWishlist,
      searchQuery,
      setSearchQuery,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isCartBumping,
      flyingPackets,
      triggerFlyToCart
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
