import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ_DATA = [
  {
    category: 'Purity & Sourcing',
    q: 'How do you guarantee that your spices contain zero artificial colours or fillers?',
    a: 'Every single batch of our spices is sourced directly from certified smallholder clusters in Pakistan (such as Kunri for red chillies and Kasur for turmeric). We test incoming whole harvests in independent lab facilities to verify the absence of industrial Sudan dyes, lead chromate, chalk, or spent seed waste before milling.'
  },
  {
    category: 'Purity & Sourcing',
    q: 'Are your spices irradiated or chemically fumigated?',
    a: 'No. Mass-market brands frequently use chemical fumigation (ethylene oxide) or gamma irradiation to sanitize contaminated bulk crops. We use high-grade mechanical winnowing, triple optical air-cleaning, and controlled sunlight drying to preserve pure microbial safety naturally.'
  },
  {
    category: 'Milling & Processing',
    q: 'Why is traditional slow stone grinding superior to high-speed commercial milling?',
    a: 'High-speed industrial impact mills run at up to 6,000 RPM, producing frictional heat exceeding 80°C that vaporizes essential volatile terpenes. Our slow-turning natural granite quern stones remain ambient (below 35°C), capturing 100% of the natural aromas and oils.'
  },
  {
    category: 'Milling & Processing',
    q: 'Why does the color of your red chilli or turmeric powder vary slightly between harvests?',
    a: 'Natural agriculture is seasonal. Because we never add synthetic red dyes or yellow pigments to standardize appearance, natural fluctuations in rainfall and soil mineral content naturally create subtle seasonal nuances in hue.'
  },
  {
    category: 'Storage & Freshness',
    q: 'How should I store my Organic Native spice pouches once opened?',
    a: 'Our food-grade multi-layer pouches feature heavy-duty airtight resealable zip closures. Always squeeze excess air out before closing, and store in a cool, dark kitchen cupboard away from direct stove heat or steam. Avoid dipping wet spoons into pouches.'
  },
  {
    category: 'Storage & Freshness',
    q: 'What is the shelf life of stone-ground masalas?',
    a: 'Unopened pouches retain peak aroma for 18 months. Once opened, we recommend enjoying the spices within 9 to 12 months for maximum flavour potency.'
  },
  {
    category: 'Shipping & COD',
    q: 'Do you offer Cash on Delivery (COD) across Pakistan?',
    a: 'Yes! We deliver via premium couriers (TCS, Leopard, PostEx) to over 350 cities, towns, and tehsils across Pakistan with full Cash on Delivery.'
  },
  {
    category: 'Shipping & COD',
    q: 'How do I qualify for Free Nationwide Shipping?',
    a: 'All orders with a subtotal of Rs. 2,500 or more automatically qualify for 100% free courier delivery anywhere in Pakistan. Standard shipping for smaller orders is a flat Rs. 250.'
  },
  {
    category: 'Shipping & COD',
    q: 'How long does delivery take?',
    a: 'Orders in major metro hubs (Lahore, Karachi, Islamabad, Rawalpindi) arrive within 2 to 3 business days. Other regional cities typically arrive within 3 to 4 business days.'
  }
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ['All', 'Purity & Sourcing', 'Milling & Processing', 'Storage & Freshness', 'Shipping & COD'];

  const filtered = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-background flex-1">
        {/* Header */}
        <section className="bg-surface-container-low py-12 lg:py-16 border-b border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin text-center max-w-3xl">
            <nav className="flex items-center justify-center gap-2 font-body-sm text-on-surface-variant mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>•</span>
              <span className="text-primary font-semibold">FAQs</span>
            </nav>

            <span className="font-label-sm uppercase tracking-widest text-secondary font-bold">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary mt-1 mb-3">
              Clear Answers on Purity, Milling &amp; Orders.
            </h1>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Everything you need to know about our single-estate harvest sourcing, stone quern technology, pantry storage, and Pakistan-wide courier delivery.
            </p>
          </div>
        </section>

        {/* FAQ Accordions Section */}
        <section className="py-12 lg:py-16 max-w-[960px] mx-auto px-margin-mobile lg:px-margin">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-label-md text-[13px] whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary font-bold shadow'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filtered.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-xl border border-surface-container-highest shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                  >
                    <span className="font-title-md text-[16px] text-primary font-semibold">
                      {item.q}
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-body-md text-on-surface-variant leading-relaxed border-t border-surface-container-highest/60 bg-surface/30">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Help Concierge Banner */}
          <div className="mt-12 p-8 bg-surface-container-low rounded-2xl border border-surface-container-highest text-center space-y-4">
            <h3 className="font-headline-sm text-primary">Still have a specific question?</h3>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
              Our culinary concierge team in Lahore and Karachi is available via phone and WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold hover:bg-primary-container transition-colors shadow"
              >
                Contact Concierge
              </Link>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-surface text-primary rounded-lg font-label-lg font-bold border border-surface-container-highest hover:bg-surface-container-high transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
