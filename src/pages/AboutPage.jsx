import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ATELIER_IMG = "https://lh3.googleusercontent.com/aida/AEtjO1X0v5WtOKGcR-9M7VtZgS5gKus7jlYatnVLLftPXuFRsUVEjEbhzVt4Qr1hoc2XoWgnXpQ4cMiWlj641z68eLrt0wVz6wL6qk7NsIQUzH9WBGdyhcgq42LjMcQSc8g_VC66JYuXt4DbNy5jP_TVv4D-ZgNTwT7pCI7LcXDlDwYBlWWEXmlmczMghRy04AWjexzoQpxCkcAbRkRCaXHHCz7vo9MAAUm2yxEGEcvTxbpUa2A1J_4uow6UVOOf";
const STORY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBcuAyVcYCMv-TYV_C39YrNTsyw792-ZfqZdfc7le7muNgf9_2hEUkq8NV4_okUSSp0cwGnEGB04p3UoNYz4KFOe4Dq9mBU1d8n9NXZ0O5S6OTfAOOownGzCa5XHcmN5V1YAdPKkrzEuwuQRiLrpENMs_er6zDNSDbO3Ig6AhzvzNvh-jKPxboyOHbfE4MoosBskmdYuOIuEDGtgeXWDafXn9_zdM4-JcAg93-3jfFd9nQeAwNw816_Dw";

export default function AboutPage() {
  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-background flex-1">
        {/* Hero Section */}
        <section className="bg-surface-container-low py-16 lg:py-24 border-b border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
            <nav className="flex items-center gap-2 font-body-sm text-on-surface-variant mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>•</span>
              <span className="text-primary font-semibold">About Us</span>
            </nav>

            <div className="max-w-3xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                ESTABLISHED 2024 • PAKISTANI PROVENANCE
              </span>
              <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary mt-2 mb-6">
                Rooted in Pakistan's Soil, Ground in Purity.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                For generations, the true soul of Pakistani cooking resided in the slow, rhythmic pounding of freshly dried whole spices in ancestral stone mortars. Organic Native was founded to rescue that honest aroma from the compromises of modern mass factory manufacturing.
              </p>
            </div>
          </div>
        </section>

        {/* Story & Atelier Photo Section */}
        <section className="py-16 lg:py-20 max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-surface-container-highest">
                <img
                  src={ATELIER_IMG}
                  alt="Pakistani artisan spice atelier workshop with stone querns and brass bowls"
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-surface p-5 rounded-xl border border-surface-container-highest shadow-md hidden sm:block max-w-xs">
                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">Traditional Quern Stones</span>
                <p className="font-body-sm text-on-surface-variant mt-1 text-[13px]">
                  Natural granite stones maintain a low 32°C milling temperature to safeguard volatile limonene and pinene oils.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="font-label-sm text-tertiary uppercase tracking-widest font-bold">THE PROBLEM WE SOLVED</span>
              <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary">
                Why Commercial Boxed Spices Lost Their Soul
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Industrial spice milling relies on high-speed hammer mills spinning at thousands of RPMs. The extreme heat generated scorches delicate aromatic oils before the powder ever reaches your kitchen. To cut costs, commercial manufacturers routinely mix spent husk residue, artificial colorings, and corn starch fillers.
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                At Organic Native, we rejected industrial shortcutting completely. Every kilogram of our red chillies comes from Kunri's single farms; our turmeric is Kasur golden root; our coriander is slow-roasted whole before cracking.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-container-highest">
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <h4 className="font-price-md text-primary font-bold">100% Traceable</h4>
                  <p className="font-body-sm text-on-surface-variant text-[13px] mt-1">Direct from designated farming cooperatives</p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <h4 className="font-price-md text-primary font-bold">0% Adulteration</h4>
                  <p className="font-body-sm text-on-surface-variant text-[13px] mt-1">Zero artificial dyes, husks, or starch binders</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Section */}
        <section className="bg-surface-container-low py-16 lg:py-20 border-y border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-label-sm text-secondary uppercase tracking-widest font-bold">OUR COMMITMENTS</span>
              <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary mt-1">
                The Four Pillars of Organic Native
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-highest shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">pin_drop</span>
                </div>
                <h3 className="font-title-md text-primary font-bold">Single-Estate Provenance</h3>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  We harvest each botanical strictly from its geographic sweet spot in Pakistan, from Sindh's red pepper tracts to Balochistan's high cumin plains.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-highest shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">cyclone</span>
                </div>
                <h3 className="font-title-md text-primary font-bold">Slow Stone Milling</h3>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  Cold-process mill stones rotate slowly to preserve the delicate essential oils that give each masala its deep, evocative aroma.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-highest shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">handshake</span>
                </div>
                <h3 className="font-title-md text-primary font-bold">Fair Farmer Equity</h3>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  We bypass predatory middleman cartels to pay smallholder growers guaranteed above-market prices for premium pesticide-free harvests.
                </p>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-highest shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">inventory_2</span>
                </div>
                <h3 className="font-title-md text-primary font-bold">Triple Barrier Foils</h3>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  Our bespoke multi-layer food-grade packaging shields fragile aromatic terpenes from South Asia's harsh monsoon moisture and UV rays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Hubs & Founder Note */}
        <section className="py-16 lg:py-20 max-w-[1360px] mx-auto px-margin-mobile lg:px-margin text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="material-symbols-outlined text-secondary text-[40px]">format_quote</span>
            <p className="font-headline-sm text-headline-sm text-primary italic leading-relaxed">
              “When you cook with honest spices, you aren’t just making dinner. You are keeping alive the stories of our soil, the hands of our farmers, and the warmth of our dastarkhwans.”
            </p>
            <div>
              <p className="font-title-md text-on-surface font-bold">— The Organic Native Team</p>
              <p className="font-body-sm text-on-surface-variant">Lahore &amp; Karachi, Pakistan</p>
            </div>
            <div className="pt-6">
              <Link
                to="/shop"
                className="inline-block px-8 py-3.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold shadow hover:bg-primary-container transition-colors"
              >
                Explore The Spice Collection
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
