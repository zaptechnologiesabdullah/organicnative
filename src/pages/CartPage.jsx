import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, cartTotal, deliveryFee, freeShippingThreshold } = useShop();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'NATIVE10') {
      setCouponApplied(true);
    }
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-background flex-1">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-8 lg:py-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant mb-6">
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span>•</span>
            <span className="text-primary font-semibold">Shopping Cart</span>
          </nav>

          <h1 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-semibold mb-2">
            Your Spice Basket
          </h1>
          <p className="font-body-md text-on-surface-variant mb-8">
            Review your harvest selections before secure checkout.
          </p>

          {cart.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-surface-container-highest max-w-xl mx-auto space-y-4">
              <span className="material-symbols-outlined text-[48px] text-primary/40">shopping_bag</span>
              <h2 className="font-headline-sm text-primary">Your basket is empty</h2>
              <p className="font-body-sm text-on-surface-variant max-w-sm mx-auto">
                Explore our range of stone-ground heirloom spices and fragrant masala blends.
              </p>
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-primary text-on-primary rounded-lg font-label-lg shadow hover:bg-primary-container transition-colors"
              >
                Browse Pantry Staples
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Line Items List */}
              <div className="lg:col-span-8 space-y-6">
                {/* Free Delivery Meter */}
                <div className="bg-surface-container-low p-5 rounded-xl border border-surface-container-highest">
                  <div className="flex items-center justify-between text-body-sm mb-2">
                    <span className="font-semibold text-primary">
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-primary flex items-center gap-1.5 font-bold">
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                          Congratulations! You have unlocked FREE nationwide delivery!
                        </span>
                      ) : (
                        <span>Add <strong>Rs. {remainingForFreeShipping}</strong> more for <strong>FREE Delivery</strong> across Pakistan!</span>
                      )}
                    </span>
                    <span className="font-bold text-primary">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Items Container */}
                <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest shadow-sm divide-y divide-surface-container-highest">
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-surface-container-low border border-surface-container-highest shrink-0"
                        />
                        <div>
                          <span className={`font-label-sm text-[11px] font-bold uppercase ${item.product.tagColor}`}>
                            {item.product.tag}
                          </span>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="font-title-md text-on-surface font-semibold hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="font-body-sm text-on-surface-variant text-[13px]">
                            Pack Size: {item.size}
                          </p>
                          <p className="font-price-md text-primary font-bold sm:hidden mt-1">
                            Rs. {item.product.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 pt-2 sm:pt-0 border-t sm:border-0 border-surface-container-highest">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-surface-container-highest rounded-lg bg-surface-container-low">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="px-2.5 py-1 text-on-surface hover:text-primary transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-label-md font-bold text-center min-w-[28px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="px-2.5 py-1 text-on-surface hover:text-primary transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[80px]">
                          <span className="font-price-md text-price-md text-primary font-bold">
                            Rs. {item.product.price * item.quantity}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Courier Notes */}
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-highest shadow-sm">
                  <label className="block font-label-sm uppercase tracking-wider font-bold text-on-surface mb-2">
                    Delivery &amp; Courier Instructions (Optional)
                  </label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Call before arrival, leave at gate, preferred delivery time..."
                    rows={2}
                    className="w-full bg-surface-container-low p-3 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                  />
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-5">
                  <h3 className="font-headline-sm text-primary font-bold border-b border-surface-container-highest pb-3">
                    Order Summary
                  </h3>

                  <div className="space-y-3 font-body-sm text-on-surface-variant">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <strong className="text-on-surface font-semibold">Rs. {cartSubtotal}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Nationwide Delivery</span>
                      {deliveryFee === 0 ? (
                        <span className="text-primary font-bold uppercase text-[12px] bg-primary-fixed-dim/40 px-2 py-0.5 rounded">
                          FREE
                        </span>
                      ) : (
                        <strong className="text-on-surface">Rs. {deliveryFee}</strong>
                      )}
                    </div>

                    {couponApplied && (
                      <div className="flex justify-between text-secondary">
                        <span>Coupon (NATIVE10 - 10% OFF)</span>
                        <strong>- Rs. {Math.round(cartSubtotal * 0.1)}</strong>
                      </div>
                    )}
                  </div>

                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon Code (try NATIVE10)"
                      className="flex-1 bg-surface-container-low px-3 py-2 rounded-lg text-body-sm border border-surface-container-highest outline-none text-on-surface"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg font-label-sm font-bold cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Final Total */}
                  <div className="pt-4 border-t border-surface-container-highest flex justify-between items-baseline">
                    <span className="font-title-md text-on-surface font-bold">Total Amount</span>
                    <span className="font-price-lg text-price-lg text-primary font-bold">
                      Rs. {couponApplied ? Math.round(cartTotal - (cartSubtotal * 0.1)) : cartTotal}
                    </span>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full py-3.5 bg-primary text-on-primary rounded-lg font-label-lg text-label-lg font-bold hover:bg-primary-container transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>

                  <div className="space-y-2 text-[12px] text-on-surface-variant/80 text-center pt-2">
                    <p>✓ Cash on Delivery (COD) available Pakistan-wide</p>
                    <p>✓ Sealed in food-grade aroma protection pouches</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
