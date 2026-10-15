import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const { cart, cartSubtotal, cartTotal, deliveryFee, clearCart } = useShop();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
  });

  const cities = [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad',
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save order data for confirmation display
    const orderData = {
      orderId: `ON-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart,
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      total: cartTotal,
      customer: formData,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Direct Bank Transfer'
    };
    sessionStorage.setItem('last_order', JSON.stringify(orderData));
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-background flex-1">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-8 lg:py-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant mb-6">
            <Link className="hover:text-primary transition-colors" to="/cart">Cart</Link>
            <span>•</span>
            <span className="text-primary font-semibold">Checkout</span>
          </nav>

          <h1 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-semibold mb-2">
            Shipping &amp; Checkout
          </h1>
          <p className="font-body-md text-on-surface-variant mb-8">
            Please enter your verified shipping address for nationwide courier delivery.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Delivery Details & Payment */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Contact Information */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-4">
                <h3 className="font-title-md text-primary font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[12px] flex items-center justify-center">1</span>
                  Recipient Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                      Mobile Number (For Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                      Email Address (For Invoice Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ayesha@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-4">
                <h3 className="font-title-md text-primary font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[12px] flex items-center justify-center">2</span>
                  Delivery Destination
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                      Street Address &amp; House/Apartment No. *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House #, Street #, Sector/Block, Area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-surface-container-low p-3 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                        City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none text-on-surface"
                      >
                        {cities.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                        Postal Code (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="54000"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-4">
                <h3 className="font-title-md text-primary font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-[12px] flex items-center justify-center">3</span>
                  Payment Method
                </h3>

                <div className="space-y-3">
                  {/* COD */}
                  <label className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-surface-container-highest bg-surface-container-low'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-on-surface font-semibold">Cash on Delivery (COD)</strong>
                        <span className="font-label-sm text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-bold">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant text-[13px] mt-0.5">
                        Pay in cash upon doorstep delivery by courier agent anywhere in Pakistan.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-surface-container-highest bg-surface-container-low'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <strong className="text-on-surface font-semibold">Direct Bank Transfer / Raast</strong>
                      <p className="font-body-sm text-on-surface-variant text-[13px] mt-0.5">
                        Transfer to our official Meezan Bank account. Dispatch will process once payment is confirmed.
                      </p>
                      {paymentMethod === 'bank' && (
                        <div className="mt-3 p-3 bg-surface rounded-lg text-body-sm text-primary font-mono text-[12px] border border-outline-variant/30">
                          <div>Bank: Meezan Bank Ltd</div>
                          <div>Account Title: Organic Native Store (Pvt) Ltd</div>
                          <div>IBAN: PK64MEZN0001090102938491</div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-5 lg:sticky lg:top-28">
                <h3 className="font-headline-sm text-primary font-bold border-b border-surface-container-highest pb-3">
                  Summary ({cart.length} items)
                </h3>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-surface-container-highest/60">
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded bg-surface-container-low shrink-0"
                        />
                        <div>
                          <p className="font-title-md text-[14px] text-on-surface font-semibold line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="font-body-sm text-[12px] text-on-surface-variant">
                            Qty: {item.quantity} • {item.size}
                          </p>
                        </div>
                      </div>
                      <span className="font-price-md text-primary font-bold">
                        Rs. {item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-surface-container-highest space-y-2.5 font-body-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <strong className="text-on-surface">Rs. {cartSubtotal}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Nationwide Courier Delivery</span>
                    {deliveryFee === 0 ? (
                      <strong className="text-primary font-bold">FREE</strong>
                    ) : (
                      <strong className="text-on-surface">Rs. {deliveryFee}</strong>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-container-highest flex justify-between items-baseline">
                  <span className="font-title-md text-on-surface font-bold">Total to Pay</span>
                  <span className="font-price-lg text-price-lg text-primary font-bold">
                    Rs. {cartTotal}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg font-bold hover:bg-primary-container transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">check</span>
                  Confirm Order • Rs. {cartTotal}
                </button>

                <p className="text-[12px] text-center text-on-surface-variant">
                  By confirming, you agree to Organic Native’s terms and purity guarantee.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
