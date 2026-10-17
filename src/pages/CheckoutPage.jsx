import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CardScannerModal from '../components/CardScannerModal';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const { cart, cartSubtotal, cartTotal, deliveryFee, clearCart, cartCount } = useShop();
  const navigate = useNavigate();

  // Contact Information State (prefilled with elegant defaults like user's reference)
  const [firstName, setFirstName] = useState('Fredrik jr.');
  const [lastName, setLastName] = useState('Ivarsson');
  const [countryCode, setCountryCode] = useState('+46'); // Toggle between +46 and +92
  const [phone, setPhone] = useState('+46 311 223 721');
  const [email, setEmail] = useState('Fredrikjr@readysetgaps.com');
  const [address, setAddress] = useState('72 Heritage Orchard Avenue, Block 4');
  const [city, setCity] = useState('Lahore');
  const [zipCode, setZipCode] = useState('05488');

  // Delivery Method State (Same-day | Express | Normal)
  const [deliveryMethod, setDeliveryMethod] = useState('sameday');

  // Payment Method State (card | applepay | gpay | cod | raast)
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Card Details State (synchronized with Virtual 3D Card)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4532 8912 3456 5478',
    cardHolder: 'Mr. Fredrik Ivarsson',
    expiry: '09/27',
    cvv: '849',
    brand: 'Visa',
    last4: '5478',
  });

  // Card Scanner Modal State
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanSuccessToast, setScanSuccessToast] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Delivery price calculation
  const deliveryCost = deliveryMethod === 'sameday' ? 250 : deliveryMethod === 'express' ? 150 : 0;
  const discountAmount = Math.round(cartSubtotal * 0.10); // 10% Autumn Reserve Promo
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCost);

  // When card is scanned from modal
  const handleCardScanned = (scannedCard) => {
    setCardDetails(scannedCard);
    setPaymentMethod('card');
    setScanSuccessToast(`✓ Card scanned: ${scannedCard.brand} ending in ${scannedCard.last4}`);
    setTimeout(() => setScanSuccessToast(''), 4000);
  };

  // Submit and Pay
  const handlePay = (e) => {
    if (e) e.preventDefault();
    setIsProcessingPayment(true);

    const orderData = {
      orderId: `ON-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart.length > 0 ? cart : [
        {
          product: {
            name: 'The Grand Sheesham Spice Chest',
            price: 4800,
            tag: 'RESERVE CHEST',
            img: '/heritage_spice_chest.jpg',
          },
          quantity: 1,
          size: 'Sheesham Brass Chest'
        }
      ],
      subtotal: cartSubtotal || 4800,
      deliveryFee: deliveryCost,
      discount: discountAmount || 480,
      total: finalTotal || 4320,
      customer: {
        fullName: `${firstName} ${lastName}`.trim(),
        phone: `${countryCode} ${phone}`,
        email: email,
        address: `${address}, ${city}`,
        city: city,
        zipCode: zipCode,
      },
      paymentMethod: paymentMethod === 'card' 
        ? `Card (${cardDetails.brand} •••• ${cardDetails.last4})`
        : paymentMethod === 'applepay'
        ? 'Apple Pay'
        : paymentMethod === 'gpay'
        ? 'Google Pay'
        : 'Cash on Delivery (COD)',
      card: paymentMethod === 'card' ? cardDetails : null,
    };

    setTimeout(() => {
      sessionStorage.setItem('last_order', JSON.stringify(orderData));
      clearCart();
      setIsProcessingPayment(false);
      navigate('/order-confirmation');
    }, 1200);
  };

  return (
    <div className="bg-[#FAF7F0] font-body-md text-body-md text-[#1a1c17] antialiased min-h-screen flex flex-col">
      <Navbar />

      {/* Floating Card Scan Toast */}
      {scanSuccessToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#123420] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#c5ecce]/40 animate-slide-left">
          <span className="material-symbols-outlined text-[20px] text-[#c5ecce]">credit_card</span>
          <span className="font-label-md font-semibold text-[13px]">{scanSuccessToast}</span>
        </div>
      )}

      {/* In-Built Card Scanner Modal */}
      <CardScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onCardScanned={handleCardScanned}
      />

      <main className="w-full pt-28 sm:pt-32 pb-20 flex-1">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Back to Cart Navigation Link */}
          <div className="mb-6">
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-[13px] font-mono text-[#424842] hover:text-[#123420] transition-colors"
            >
              <span>‹</span>
              <span>Back to cart</span>
            </Link>
          </div>

          {/* Page Heading & Editorial Subtitle (Matching User's Reference) */}
          <div className="mb-10 text-left">
            <h1 className="font-serif text-[38px] sm:text-[46px] font-bold text-[#123420] tracking-tight leading-none">
              Checkout
            </h1>
            <p className="font-body-md text-[14px] sm:text-[15px] text-[#424842]/80 mt-2 font-normal">
              a checkout is a counter where you pay for things you are buying
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            
            {/* ══════════════════════════════════════════════════════════════
                LEFT COLUMN: 1. Contact | 2. Delivery | 3. Payment
               ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 space-y-10 text-left">
              
              {/* ── 1. CONTACT INFORMATION ── */}
              <div>
                <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#123420] mb-5">
                  1. Contact information
                </h2>

                <div className="space-y-4">
                  {/* First Name & Last Name (With User Silhouette Icons) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* First Name */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 transition-all flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-[#424842]/70 shrink-0">
                        person
                      </span>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[10.5px] font-mono uppercase text-[#424842]/70 leading-none mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Fredrik jr."
                          className="w-full bg-transparent outline-none text-[14px] font-medium text-[#1a1c17] leading-tight"
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 transition-all flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-[#424842]/70 shrink-0">
                        person_outline
                      </span>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[10.5px] font-mono uppercase text-[#424842]/70 leading-none mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Ivarsson"
                          className="w-full bg-transparent outline-none text-[14px] font-medium text-[#1a1c17] leading-tight"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Phone Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Phone Number with Dial Code / Flag Dropdown */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 transition-all flex items-center gap-2.5">
                      {/* Flag & Dial Code Pill */}
                      <button
                        type="button"
                        onClick={() => setCountryCode(countryCode === '+46' ? '+92' : '+46')}
                        className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F0] hover:bg-[#e8ddca]/60 rounded-lg text-[12px] font-mono font-bold text-[#123420] shrink-0 border border-[#e8ddca] cursor-pointer"
                        title="Click to toggle Pakistan (+92) / Sweden (+46)"
                      >
                        <span>{countryCode === '+46' ? '🇸🇪' : '🇵🇰'}</span>
                        <span>{countryCode}</span>
                        <span className="text-[10px] opacity-60">⌄</span>
                      </button>

                      <div className="flex-1 min-w-0">
                        <label className="block text-[10.5px] font-mono uppercase text-[#424842]/70 leading-none mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+46 311 223 721"
                          className="w-full bg-transparent outline-none text-[14px] font-medium text-[#1a1c17] leading-tight"
                        />
                      </div>
                    </div>

                    {/* Email with Paper Plane Icon */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 transition-all flex items-center gap-3">
                      <span className="material-symbols-outlined text-[19px] text-[#424842]/70 shrink-0">
                        send
                      </span>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[10.5px] font-mono uppercase text-[#424842]/70 leading-none mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Fredrikjr@readysetgaps.com"
                          className="w-full bg-transparent outline-none text-[14px] font-medium text-[#1a1c17] leading-tight"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Street Address & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 bg-white p-3 sm:p-3.5 rounded-2xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 transition-all flex items-center gap-3">
                      <span className="material-symbols-outlined text-[19px] text-[#424842]/70 shrink-0">
                        home_pin
                      </span>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[10.5px] font-mono uppercase text-[#424842]/70 leading-none mb-1">
                          Delivery Street Address
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Street address & house / apartment"
                          className="w-full bg-transparent outline-none text-[13.5px] text-[#1a1c17] font-medium"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 transition-all flex items-center gap-3">
                      <span className="material-symbols-outlined text-[19px] text-[#424842]/70 shrink-0">
                        location_city
                      </span>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[10.5px] font-mono uppercase text-[#424842]/70 leading-none mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Lahore / Stockholm"
                          className="w-full bg-transparent outline-none text-[13.5px] text-[#1a1c17] font-medium"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ── 2. DELIVERY METHOD ── */}
              <div>
                <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#123420] mb-5">
                  2. Delivery method
                </h2>

                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Delivery Option 1: Same-day */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('sameday')}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-[13.5px] font-medium transition-all duration-300 cursor-pointer ${
                      deliveryMethod === 'sameday'
                        ? 'bg-[#123420] text-white shadow-[0_6px_20px_rgba(18,52,32,0.25)] font-semibold'
                        : 'bg-white text-[#424842] border border-[#e8ddca] hover:border-[#123420]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    <span>Same-day</span>
                  </button>

                  {/* Delivery Option 2: Express */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('express')}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-[13.5px] font-medium transition-all duration-300 cursor-pointer ${
                      deliveryMethod === 'express'
                        ? 'bg-[#123420] text-white shadow-[0_6px_20px_rgba(18,52,32,0.25)] font-semibold'
                        : 'bg-white text-[#424842] border border-[#e8ddca] hover:border-[#123420]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">electric_scooter</span>
                    <span>Express</span>
                  </button>

                  {/* Delivery Option 3: Normal */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('normal')}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-[13.5px] font-medium transition-all duration-300 cursor-pointer ${
                      deliveryMethod === 'normal'
                        ? 'bg-[#123420] text-white shadow-[0_6px_20px_rgba(18,52,32,0.25)] font-semibold'
                        : 'bg-white text-[#424842] border border-[#e8ddca] hover:border-[#123420]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">package_2</span>
                    <span>Normal</span>
                  </button>

                  {/* Zip Code Field (Right Next to Delivery Methods) */}
                  <div className="bg-white px-4 py-2 rounded-2xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 transition-all flex items-center gap-2.5 min-w-[140px]">
                    <span className="material-symbols-outlined text-[18px] text-[#424842]/60 shrink-0">
                      pin_drop
                    </span>
                    <div className="flex-1">
                      <label className="block text-[9.5px] font-mono uppercase text-[#424842]/70 leading-none">
                        Zip code
                      </label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="05488"
                        className="w-full bg-transparent outline-none text-[13.5px] font-medium text-[#1a1c17] leading-tight font-mono"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* ── 3. PAYMENT METHOD ── */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#123420]">
                    3. Payment method
                  </h2>

                  {/* IN-BUILT SCAN CARD ACTION BUTTON */}
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#123420]/10 hover:bg-[#123420] text-[#123420] hover:text-white transition-all text-[12px] font-mono font-bold cursor-pointer group shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    <span>Scan Card (Live Camera)</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Option 1: Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-300 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#123420] text-white shadow-[0_6px_20px_rgba(18,52,32,0.25)]'
                        : 'bg-white text-[#424842] border border-[#e8ddca] hover:border-[#123420]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                    <span>Card</span>
                  </button>

                  {/* Option 2: Apple Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-300 cursor-pointer ${
                      paymentMethod === 'applepay'
                        ? 'bg-[#123420] text-white shadow-md'
                        : 'bg-white text-[#424842] border border-[#e8ddca] hover:border-[#123420]/40'
                    }`}
                  >
                    <span></span>
                    <span>Pay</span>
                  </button>

                  {/* Option 3: Google Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gpay')}
                    className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-300 cursor-pointer ${
                      paymentMethod === 'gpay'
                        ? 'bg-black text-white shadow-md'
                        : 'bg-white text-[#424842] border border-[#e8ddca] hover:border-black/40'
                    }`}
                  >
                    <span className="font-bold text-[#4285F4]">G</span>
                    <span>Pay</span>
                  </button>

                  {/* Option 4: COD (Cash on Delivery) */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-300 cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-[#94492c] text-white shadow-md'
                        : 'bg-white text-[#424842] border border-[#e8ddca] hover:border-[#94492c]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    <span>Cash on Delivery</span>
                  </button>

                </div>

                {/* Card Input Details Drawer when Card is selected */}
                {paymentMethod === 'card' && (
                  <div className="mt-5 p-5 bg-white rounded-2xl border border-[#e8ddca] space-y-4 animate-slide-left">
                    <div className="flex items-center justify-between pb-2 border-b border-[#e8ddca]/80">
                      <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#94492c] font-bold">
                        Card Payment Specifications
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsScannerOpen(true)}
                        className="text-[12px] font-mono text-[#123420] hover:text-[#94492c] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">document_scanner</span>
                        <span>Auto-Scan with Camera</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#424842]/70 mb-1">
                        Card Number
                      </label>
                      <div className="flex items-center bg-[#FAF7F0] px-3.5 py-2.5 rounded-xl border border-[#e8ddca] focus-within:border-[#123420] focus-within:ring-2 focus-within:ring-[#123420]/15 font-mono">
                        <input
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          placeholder="4532 8912 3456 5478"
                          className="w-full bg-transparent outline-none text-[14px] text-[#1a1c17] tracking-wider"
                        />
                        <span className="text-[11px] font-mono font-bold text-[#123420] bg-[#123420]/10 px-2 py-0.5 rounded">
                          {cardDetails.brand}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#424842]/70 mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          placeholder="09/27"
                          className="w-full bg-[#FAF7F0] px-3.5 py-2.5 rounded-xl border border-[#e8ddca] focus:border-[#123420] focus:ring-2 focus:ring-[#123420]/15 outline-none text-[14px] font-mono text-[#1a1c17]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#424842]/70 mb-1">
                          Security CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          placeholder="•••"
                          className="w-full bg-[#FAF7F0] px-3.5 py-2.5 rounded-xl border border-[#e8ddca] focus:border-[#123420] focus:ring-2 focus:ring-[#123420]/15 outline-none text-[14px] font-mono text-[#1a1c17]"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* ══════════════════════════════════════════════════════════════
                RIGHT COLUMN: Interactive Virtual Card & Summary
               ══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Sticky Container */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e8ddca] shadow-[0_12px_40px_rgba(18,52,32,0.06)] space-y-6 lg:sticky lg:top-28 text-left">
                
                {/* ── INTERACTIVE VIRTUAL CREDIT CARD (ORGANIC NATIVE HERITAGE EDITION) ── */}
                <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden p-5 sm:p-6 text-white shadow-2xl flex flex-col justify-between bg-gradient-to-tr from-[#0b1c11] via-[#123420] to-[#1d4b2e] border border-[#d4af37]/35 select-none group">
                  
                  {/* Subtle Geometric Overlay Pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute inset-0 animate-card-shimmer pointer-events-none" />

                  {/* Top Row: EMV Chip & Brand Badge */}
                  <div className="flex items-center justify-between relative z-10">
                    
                    {/* Realistic Gold EMV Chip */}
                    <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 border border-amber-600/50 shadow-inner flex flex-col justify-around p-1">
                      <div className="w-full h-px bg-amber-700/40" />
                      <div className="w-full h-px bg-amber-700/40" />
                      <div className="w-full h-px bg-amber-700/40" />
                    </div>

                    {/* Contactless Wave Radiation Symbol & Card Brand */}
                    <div className="flex items-center gap-2 text-[#d4af37]">
                      <span className="material-symbols-outlined text-[24px]">contactless</span>
                      <span className="font-serif font-bold text-[14px] tracking-wider text-white">ORGANIC NATIVE</span>
                    </div>

                  </div>

                  {/* Middle & Bottom Rows: Expiry, Masked Number & Cardholder Name */}
                  <div className="relative z-10 space-y-3">
                    
                    {/* Expiry Date */}
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#e8c872]/85">
                      <span className="uppercase text-[9.5px] text-white/60">VALID THRU</span>
                      <span className="font-bold text-white tracking-wider">{cardDetails.expiry || '09/27'}</span>
                    </div>

                    {/* Masked Card Number & Cardholder Name */}
                    <div className="flex items-end justify-between">
                      <div className="font-mono text-[16px] sm:text-[18px] font-bold tracking-widest text-[#f4efe6] drop-shadow-sm">
                        •••• {cardDetails.last4 || '5478'}
                      </div>
                      
                      <div className="font-sans text-[12px] sm:text-[13px] font-medium text-white/95 truncate max-w-[170px] text-right uppercase tracking-wider">
                        {cardDetails.cardHolder || `${firstName} ${lastName}`}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Manage Cards / Scan Card Actions */}
                <div className="flex items-center justify-between text-[13px] font-medium pt-1">
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[#123420] hover:text-[#94492c] font-mono text-[12px] font-bold cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">document_scanner</span>
                    <span>Scan New Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="inline-flex items-center gap-1 text-[#1a1c17] hover:text-[#123420] font-sans transition-colors cursor-pointer"
                  >
                    <span>Manage Cards</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="h-px bg-[#e8ddca]/80" />

                {/* ── BIG BOLD ITEM COUNT (EXACT AS SCREENSHOT '36 items') ── */}
                <div>
                  <h3 className="font-sans text-[30px] sm:text-[34px] font-bold text-[#1a1c17] leading-none">
                    {cartCount || 1} items
                  </h3>
                </div>

                {/* Summary Financial Breakdown */}
                <div className="space-y-3 text-[14px]">
                  
                  <div className="flex justify-between text-[#424842]">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium text-[#1a1c17]">
                      Rs. {cartSubtotal || 1420}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#424842]">
                    <span>Discount</span>
                    <span className="font-mono font-medium text-[#94492c]">
                      - Rs. {discountAmount || 142} (%10)
                    </span>
                  </div>

                  <div className="flex justify-between text-[#424842]">
                    <span>Delivery Service</span>
                    <span className="font-mono font-medium text-[#1a1c17]">
                      {deliveryCost === 0 ? (
                        <span className="text-[#123420] font-bold">FREE</span>
                      ) : (
                        `+ Rs. ${deliveryCost}`
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#e8ddca] flex justify-between items-baseline">
                    <span className="font-sans font-medium text-[#1a1c17] text-[15px]">
                      Total
                    </span>
                    <span className="font-serif font-bold text-[28px] sm:text-[32px] text-[#123420]">
                      Rs. {finalTotal || 1278}
                    </span>
                  </div>

                </div>

                {/* Big Primary Pay CTA Button (Organic Native Theme) */}
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={isProcessingPayment}
                  className="w-full py-4 bg-[#123420] hover:bg-[#1b432a] text-white rounded-2xl font-sans font-bold text-[16px] shadow-[0_8px_25px_rgba(18,52,32,0.3)] hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay →</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11.5px] font-mono text-[#424842]/70">
                  <span className="material-symbols-outlined text-[14px] text-[#123420]">lock</span>
                  <span>End-to-End SSL 256-Bit Encrypted Counter</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
