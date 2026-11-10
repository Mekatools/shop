import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, onSubmitOrder, subtotal, paymentMethod }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) {
      newErrors.name = 'Full name is required';
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="bg-surface w-full max-w-md rounded-t-xl sm:rounded-xl border border-borderLine shadow-lift overflow-hidden">
        <div className="px-5 py-4 border-b border-borderLine flex items-center justify-between bg-background">
          <div>
            <h2 id="checkout-title" className="text-lg font-bold text-textMain">Pickup Details</h2>
            <p className="text-xs text-textMuted">Ready for 2-Minute counter handover</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            className="p-2 text-textMuted hover:text-textMain rounded-lg border border-borderLine hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label htmlFor="customer-name" className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1">
              Your Name *
            </label>
            <input
              id="customer-name"
              type="text"
              placeholder="e.g. Rahul Verma"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-borderLine bg-surface text-textMain placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-brand min-h-[44px]"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="customer-phone" className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1">
              10-Digit Mobile Number *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted text-sm font-semibold pointer-events-none">
                +91
              </span>
              <input
                id="customer-phone"
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-12 pr-3.5 py-2.5 rounded-lg border border-borderLine bg-surface text-textMain placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-brand min-h-[44px]"
              />
            </div>
            {errors.phone && <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>}
            <p className="text-[11px] text-textMuted mt-1">Used to verify your pickup bag at the counter.</p>
          </div>

          <div className="p-3 rounded-lg bg-background border border-borderLine text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-textMuted">Counter Payable:</span>
              <span className="font-bold text-textMain">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textMuted">Payment Mode:</span>
              <span className="font-semibold text-brand">{paymentMethod}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-textMuted">
            <ShieldCheck className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
            <span>Pay only when you inspect and collect your items.</span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-brand hover:bg-brand-hover text-surface font-semibold text-base shadow-card transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Generate Pickup OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
