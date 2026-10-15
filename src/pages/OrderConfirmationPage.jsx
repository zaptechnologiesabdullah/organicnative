import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('last_order');
    if (saved) {
      setOrder(JSON.parse(saved));
    } else {
      // Default sample confirmation if visited directly
      setOrder({
        orderId: 'ON-84920',
        date: '15 Oct 2025',
        customer: {
          fullName: 'Ayesha Khan',
          phone: '0300-8472910',
          email: 'ayesha.k@example.com',
          address: 'House #42, Street 7, Sector F-8/2',
          city: 'Islamabad'
        },
        paymentMethod: 'Cash on Delivery (COD)',
        subtotal: 1840,
        deliveryFee: 0,
        total: 1840,
        items: [
          {
            product: {
              name: 'Garam Masala Powder',
              price: 450,
              tag: 'HERITAGE BLEND',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMFIrGJU6BMzFc2_kJbRIvWRDcXaXf83GReCl3HH2RMP2VYlGrk42FAKht5fZNs4OWJBkLvhA0DoqrixNIiYsmQCCk-58jIvWsoOCAAGPgKrv4OCTxvmXY6cGnY9F6uAjycoUsclsEOkM9b6B6GNNOztwTTGWlmWheKU4BuLHEGx8SmEUYaZ2hRYigH8GF9oOEhgQ90pAlCJIcj82Q0zvahmy0GGJViEl2BRzhuluk6jclNjAIbnYYdA'
            },
            quantity: 2,
            size: '200g Pouch'
          },
          {
            product: {
              name: 'Traditional Biryani Masala',
              price: 420,
              tag: 'ROYAL RECIPE',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnYiEi6M-ZQAJ-sYvwA-Nh1BeArzEZvQ_cT0qHYYNWMoKarlzvWCiLZgO-hJ3yVv9-SjIi6LXbVLs2AHbJ2JIcrei8CbfS5sIMoytXR1HRvfRPwoF-Eh9o7MprDGG2Y93646YueQvddmoVRr0JEvdha0m1-lAqcOb2nDlN0qz3dQchzURm3SA_6S-szpKPNSdePArO5DTh1dMvdOwBu0-FMyWbm1pMytWHc10szRboqJTrckWn9iIoXA'
            },
            quantity: 1,
            size: '100g Pouch'
          }
        ]
      });
    }
  }, []);

  if (!order) return null;

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-background flex-1">
        <div className="max-w-[840px] mx-auto px-margin-mobile lg:px-margin py-12 lg:py-16 text-center">
          {/* Celebratory Icon */}
          <div className="w-20 h-20 rounded-full bg-primary-fixed-dim/40 flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[44px]">verified</span>
          </div>

          <span className="font-label-sm uppercase tracking-widest text-secondary font-bold">
            SHUKRIYA • ORDER CONFIRMED
          </span>
          <h1 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-semibold mt-1 mb-3">
            Your Fresh Harvest is Being Prepared!
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-lg mx-auto mb-8 leading-relaxed">
            Order Reference: <strong className="text-primary font-bold">{order.orderId}</strong>. We have dispatched a confirmation SMS &amp; email with your tracking docket.
          </p>

          {/* Delivery Timeline Card */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-container-highest mb-10 text-left">
            <h3 className="font-title-md text-primary font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary">schedule</span>
              Estimated Dispatch &amp; Delivery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-body-sm">
              <div className="p-3 bg-surface rounded-lg">
                <span className="font-label-sm text-on-surface-variant block uppercase text-[11px]">Status</span>
                <strong className="text-primary">Order Placed</strong>
              </div>
              <div className="p-3 bg-surface rounded-lg">
                <span className="font-label-sm text-on-surface-variant block uppercase text-[11px]">Milling &amp; Packing</span>
                <strong className="text-primary">Within 24 Hours</strong>
              </div>
              <div className="p-3 bg-surface rounded-lg">
                <span className="font-label-sm text-on-surface-variant block uppercase text-[11px]">Doorstep Arrival</span>
                <strong className="text-primary">2-3 Business Days</strong>
              </div>
            </div>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-surface-container-highest shadow-sm text-left space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-surface-container-highest pb-4">
              <div>
                <span className="font-label-sm text-on-surface-variant uppercase text-[11px]">Delivering To</span>
                <p className="font-title-md text-on-surface font-semibold">{order.customer.fullName}</p>
                <p className="font-body-sm text-on-surface-variant text-[13px]">{order.customer.address}, {order.customer.city}</p>
                <p className="font-body-sm text-on-surface-variant text-[13px]">Phone: {order.customer.phone}</p>
              </div>
              <div className="sm:text-right">
                <span className="font-label-sm text-on-surface-variant uppercase text-[11px]">Payment Mode</span>
                <p className="font-title-md text-primary font-bold">{order.paymentMethod}</p>
                <p className="font-body-sm text-on-surface-variant text-[13px]">Date: {order.date}</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <span className="font-label-sm uppercase tracking-wider text-primary font-bold">Ordered Spices</span>
              <div className="divide-y divide-surface-container-highest">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded bg-surface-container-low"
                      />
                      <div>
                        <p className="font-title-md text-[14px] text-on-surface font-semibold">{item.product.name}</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">Qty: {item.quantity} • {item.size}</p>
                      </div>
                    </div>
                    <span className="font-price-md text-primary font-bold">
                      Rs. {item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-surface-container-highest pt-4 space-y-2 font-body-sm text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <strong className="text-on-surface">Rs. {order.subtotal}</strong>
              </div>
              <div className="flex justify-between">
                <span>Courier Delivery</span>
                {order.deliveryFee === 0 ? (
                  <strong className="text-primary font-bold">FREE</strong>
                ) : (
                  <strong className="text-on-surface">Rs. {order.deliveryFee}</strong>
                )}
              </div>
              <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-surface-container-highest">
                <span>Total Amount</span>
                <span>Rs. {order.total}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-primary text-on-primary rounded-lg font-label-lg font-bold shadow hover:bg-primary-container transition-colors"
            >
              Continue Exploring Spices
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-surface-container-low text-primary rounded-lg font-label-lg font-semibold hover:bg-surface-container transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
