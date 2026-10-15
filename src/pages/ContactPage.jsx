import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-background flex-1">
        {/* Header */}
        <section className="bg-surface-container-low py-12 lg:py-16 border-b border-surface-container-highest">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
            <nav className="flex items-center gap-2 font-body-sm text-on-surface-variant mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>•</span>
              <span className="text-primary font-semibold">Contact Us</span>
            </nav>

            <span className="font-label-sm uppercase tracking-widest text-secondary font-bold">
              CUSTOMER CARE &amp; CONCIERGE
            </span>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary mt-1 mb-3">
              We’d Love to Hear From You.
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Have questions regarding our stone-grinding process, bulk wedding gift chests, wholesale restaurant orders, or your ongoing courier delivery? Reach out to our dedicated concierge.
            </p>
          </div>
        </section>

        {/* Contact Form & Hubs Section */}
        <section className="py-12 lg:py-16 max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-surface-container-highest shadow-sm">
              <h2 className="font-headline-sm text-primary font-semibold mb-6">
                Send Us a Message
              </h2>

              {formSent ? (
                <div className="p-6 bg-surface-container-low rounded-xl text-center space-y-3">
                  <span className="material-symbols-outlined text-[40px] text-primary">check_circle</span>
                  <h3 className="font-title-md text-primary font-bold">Shukriya for Reaching Out!</h3>
                  <p className="font-body-sm text-on-surface-variant max-w-sm mx-auto">
                    We have received your message and will respond via email/WhatsApp within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Bilal Ahmed"
                        className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                      />
                    </div>
                    <div>
                      <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="0300-1234567"
                        className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="bilal@example.com"
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-body-sm border border-surface-container-highest outline-none text-on-surface"
                    >
                      <option>General Inquiry</option>
                      <option>Order Tracking &amp; Delivery</option>
                      <option>Wholesale &amp; Restaurant Supply</option>
                      <option>Wedding &amp; Corporate Gifting</option>
                      <option>Quality &amp; Purity Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label-sm uppercase tracking-wider text-on-surface font-semibold mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-surface-container-low p-3 rounded-lg text-body-sm border border-surface-container-highest outline-none focus:ring-1 focus:ring-primary text-on-surface"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold hover:bg-primary-container transition-colors shadow cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Direct Info & Physical Experience Hubs */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Contacts */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-4">
                <h3 className="font-title-md text-primary font-bold">
                  Direct Concierge Channels
                </h3>
                <div className="space-y-3 font-body-sm text-on-surface">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">call</span>
                    <div>
                      <strong>UAN Helpline:</strong>
                      <p className="text-on-surface-variant">+92 (042) 111-NATIVE (628-483)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">chat</span>
                    <div>
                      <strong>WhatsApp Support:</strong>
                      <p className="text-on-surface-variant">+92 300 1234567 (Mon-Sat, 9am - 8pm PST)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">mail</span>
                    <div>
                      <strong>Customer Care Email:</strong>
                      <p className="text-on-surface-variant">care@organicnative.pk</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Experience Hubs */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-highest shadow-sm space-y-4">
                <h3 className="font-title-md text-primary font-bold">
                  Experience Hubs in Pakistan
                </h3>
                <div className="space-y-4 text-body-sm">
                  <div className="p-3 bg-surface-container-low rounded-lg">
                    <strong className="text-secondary font-semibold">Lahore Flagship</strong>
                    <p className="text-on-surface-variant text-[13px] mt-0.5">
                      Shop 14, MM Alam Artisan Square, Gulberg III, Lahore
                    </p>
                    <span className="text-[11px] text-tertiary block mt-1">Open 11:00 AM – 9:00 PM</span>
                  </div>

                  <div className="p-3 bg-surface-container-low rounded-lg">
                    <strong className="text-secondary font-semibold">Karachi Atelier</strong>
                    <p className="text-on-surface-variant text-[13px] mt-0.5">
                      Plot 22-C, Bukhari Commercial, Lane 4, DHA Phase 6, Karachi
                    </p>
                    <span className="text-[11px] text-tertiary block mt-1">Open 11:00 AM – 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
