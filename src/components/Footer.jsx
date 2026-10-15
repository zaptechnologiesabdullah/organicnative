import React from 'react';
import { Link } from 'react-router-dom';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1WRl8-BPfBHSoiy5_me7YQmorxgpq7WPX4SJeaDc7eRoQr80O3Q-KPlxYV0iqTng3bCwXA7gXtoKYpfC-o5hHCEejlaB9JPc5_jJ9diwtCiZmLXFMD5Err6zwj96951yNGIeBlr2FNl9jm2nAUkWxi8G8EZUdAJHc29IID-q1Cf04EptcC5KITlTRPWoeAFTKjn1r9cvseOsdPYMDHsp5r-W-lIkA9sim6XM45x1u620tP7ahbP5J5f1fI6";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface mt-space-xl border-t border-surface-container-highest/60">
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg mb-space-xl">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-space-sm mb-space-md">
              <img
                alt="Organic Native Brand Logo"
                className="h-8 w-auto object-contain"
                src={LOGO_URL}
              />
              <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                Organic Native
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-space-md leading-relaxed">
              Single-origin terroir spices, stone-ground blends, and heirloom botanicals harvested directly from smallholder farms across the fertile lands of Pakistan.
            </p>
            <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              AUTHENTIC HEIRLOOM PROVENANCE
            </div>
          </div>

          {/* Catalog Col */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="font-label-lg text-label-lg font-bold text-primary mb-space-md tracking-wider uppercase">
              Catalog
            </h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li><Link className="hover:text-primary transition-colors" to="/shop">Whole Spices</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/categories">Slow-Ground Masalas</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/shop">Himalayan Rock Salts</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/shop">Artisanal Gift Chests</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/shop">Harvest Reserves</Link></li>
            </ul>
          </div>

          {/* Customer Care Col */}
          <div className="lg:col-span-3 md:col-span-1">
            <h4 className="font-label-lg text-label-lg font-bold text-primary mb-space-md tracking-wider uppercase">
              Customer Care
            </h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li><Link className="hover:text-primary transition-colors" to="/faq">Frequently Asked Questions</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/shipping-policy">Nationwide Shipping Policy</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/returns-policy">Returns &amp; Exchanges</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/order-confirmation">Track Your Order</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/contact">Wholesale Inquiries</Link></li>
            </ul>
          </div>

          {/* Pakistan Experience Hubs */}
          <div className="lg:col-span-3 md:col-span-2">
            <h4 className="font-label-lg text-label-lg font-bold text-primary mb-space-md tracking-wider uppercase">
              Pakistan Experience Hubs
            </h4>
            <div className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">location_on</span>
                <span>Karachi: Bukhari Commercial, DHA Phase 6</span>
              </div>
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">location_on</span>
                <span>Lahore: Gulberg III, MM Alam Artisan Square</span>
              </div>
              <div className="flex items-center gap-space-xs mt-space-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                <span>+92 (042) 111-NATIVE (628-483)</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
                <span>care@organicnative.pk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm border-t border-outline-variant/30">
          <p>© 2025 Organic Native Store (Pvt) Ltd. Preserving Pakistan's culinary soul.</p>
          <div className="flex items-center gap-space-md">
            <Link className="hover:text-primary transition-colors" to="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-primary transition-colors" to="/shipping-policy">Terms of Service</Link>
            <Link className="hover:text-primary transition-colors" to="/about">Purity Guarantee</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
