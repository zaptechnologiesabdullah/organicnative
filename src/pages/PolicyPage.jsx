import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PolicyPage() {
  const location = useLocation();
  const path = location.pathname;

  const isShipping = path.includes('shipping');
  const isReturns = path.includes('returns');

  const pageTitle = isShipping
    ? 'Shipping & Delivery Policy'
    : isReturns
    ? 'Returns & Refunds Policy'
    : 'Privacy Policy & Data Security';

  const subtitle = isShipping
    ? 'Transparent doorstep courier delivery protocols across all Pakistani cities and tehsils.'
    : isReturns
    ? 'Our 100% freshness and unadulterated purity guarantee for Pakistani home cooks.'
    : 'How Organic Native Store (Pvt) Ltd safeguards your personal information and order history.';

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-background flex-1">
        {/* Policy Header Banner */}
        <section className="bg-surface-container-low py-12 lg:py-16 border-b border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
            <nav className="flex items-center gap-2 font-body-sm text-on-surface-variant mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>•</span>
              <span className="text-primary font-semibold">{pageTitle}</span>
            </nav>

            <span className="font-label-sm uppercase tracking-widest text-secondary font-bold">
              OFFICIAL STORE TERMS
            </span>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary mt-1 mb-3">
              {pageTitle}
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-3 lg:sticky lg:top-28">
              <span className="font-label-sm uppercase tracking-wider text-primary font-bold block mb-2">
                Policy Documents
              </span>
              <Link
                to="/shipping-policy"
                className={`block p-3 rounded-lg text-body-sm font-semibold transition-colors ${
                  isShipping
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Nationwide Shipping Policy
              </Link>
              <Link
                to="/returns-policy"
                className={`block p-3 rounded-lg text-body-sm font-semibold transition-colors ${
                  isReturns
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Returns &amp; Refunds Policy
              </Link>
              <Link
                to="/privacy-policy"
                className={`block p-3 rounded-lg text-body-sm font-semibold transition-colors ${
                  !isShipping && !isReturns
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Privacy &amp; Data Security
              </Link>

              <div className="pt-4 border-t border-surface-container-highest text-body-sm text-on-surface-variant">
                <p>Helpline: +92 (042) 111-NATIVE</p>
                <p className="text-[12px] mt-1">support@organicnative.pk</p>
              </div>
            </aside>

            {/* Document Body */}
            <div className="lg:col-span-8 bg-surface-container-lowest p-8 lg:p-12 rounded-2xl border border-surface-container-highest shadow-sm space-y-8 text-on-surface leading-relaxed">
              {isShipping ? (
                <>
                  <section className="space-y-3">
                    <h2 className="font-headline-sm text-headline-sm text-primary">1. Courier Dispatch &amp; Delivery Timelines</h2>
                    <p className="text-body-md text-on-surface-variant">
                      Every harvest spice order placed before 3:00 PM PST on business days is packed and dispatched from our primary atelier within 24 hours. Because we grind in slow small batches, this ensures that maximum volatile essential oils are sealed fresh.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-body-sm text-on-surface-variant">
                      <li><strong>Metropolitan Centers (Lahore, Karachi, Islamabad, Rawalpindi):</strong> 2 to 3 business days.</li>
                      <li><strong>Major Cities (Faisalabad, Multan, Peshawar, Sialkot, Hyderabad):</strong> 2 to 4 business days.</li>
                      <li><strong>Remote &amp; Rural Tehsils:</strong> 3 to 5 business days via verified courier network.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h2 className="font-headline-sm text-headline-sm text-primary">2. Shipping Charges &amp; Free Delivery</h2>
                    <p className="text-body-md text-on-surface-variant">
                      We offer free nationwide courier delivery on all retail orders with a cart subtotal of <strong>Rs. 2,500 or higher</strong>. For orders under Rs. 2,500, a standardized flat shipping fee of <strong>Rs. 250</strong> is applied at checkout.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="font-headline-sm text-headline-sm text-primary">3. Cash on Delivery (COD) Inspection</h2>
                    <p className="text-body-md text-on-surface-variant">
                      Cash on Delivery is available across Pakistan. Customers are requested to ensure the tamper-evident security tape on the outer flyer is intact prior to receiving and signing the courier receipt.
                    </p>
                  </section>
                </>
              ) : isReturns ? (
                <>
                  <section className="space-y-3">
                    <h2 className="font-headline-sm text-headline-sm text-primary">1. 100% Purity Freshness Guarantee</h2>
                    <p className="text-body-md text-on-surface-variant">
                      We stand unreservedly behind the authentic purity of our single-estate spices. If you open a pouch and believe the aroma, color, or purity does not reflect genuine stone-ground heirloom spices, we will gladly arrange a full replacement or refund within 14 days of receipt.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="font-headline-sm text-headline-sm text-primary">2. Damaged or Compromised Shipments</h2>
                    <p className="text-body-md text-on-surface-variant">
                      In the rare event that an outer foil barrier pouch is punctured or compromised during courier transit, please photograph the parcel and send it to our WhatsApp helpline (+92 300 1234567) within 48 hours. A fresh replacement pouch will be dispatched immediately at zero additional expense.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <section className="space-y-3">
                    <h2 className="font-headline-sm text-headline-sm text-primary">1. Privacy Commitment &amp; Data Protection</h2>
                    <p className="text-body-md text-on-surface-variant">
                      At Organic Native Store (Pvt) Ltd, we respect the privacy of every home cook. We collect only the essential personal details required to process your transaction and coordinate physical doorstep courier delivery (recipient name, shipping address, mobile phone number, and email).
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="font-headline-sm text-headline-sm text-primary">2. Zero Third-Party Data Sharing</h2>
                    <p className="text-body-md text-on-surface-variant">
                      We strictly never sell, rent, lease, or monetize your contact details to third-party marketing brokers. Courier dispatch information is provided strictly to licensed logistics carriers (TCS, Leopard, PostEx) solely for transit tracking.
                    </p>
                  </section>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
