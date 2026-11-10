import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/store';
import { CheckCircle2, Copy, Check, MessageSquare, ArrowLeft } from 'lucide-react';

export default function OtpTicket({ order, onStartNewOrder }) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(order.otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppUrl = () => {
    const itemsText = order.items
      .map((it, idx) => `${idx + 1}. ${it.name} (${it.packSize}) x ${it.quantity} = Rs.${it.price * it.quantity}`)
      .join('\n');

    const message = `*NEW CLICK & COLLECT ORDER*
Store: ${STORE_CONFIG.name}
-----------------------------
*Pickup OTP:* ${order.otp}
*Order ID:* ${order.orderId}
*Customer:* ${order.customerName} (${order.customerPhone})
*Payment Choice:* ${order.paymentMethod}
*Total Amount:* Rs. ${order.total}

*Items Ordered:*
${itemsText}

-----------------------------
*Order Time:* ${order.timestamp}
Please pack this order. I will show this OTP at the counter!`;

    return `https://wa.me/${STORE_CONFIG.whatsapp.number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="max-w-lg mx-auto my-6 p-4">
      <div className="bg-surface border-2 border-brand rounded-xl shadow-lift overflow-hidden">
        {/* Header */}
        <div className="bg-brand text-surface p-5 text-center">
          <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-200" aria-hidden="true" />
          <h2 className="text-xl font-extrabold tracking-tight">Order Confirmed for Pickup!</h2>
          <p className="text-xs text-emerald-100 mt-1">Show this OTP at Brothers Superstore counter</p>
        </div>

        {/* OTP Highlight */}
        <div className="p-6 text-center border-b border-dashed border-borderLine bg-background">
          <p className="text-xs font-bold text-textMuted uppercase tracking-wider mb-1">Your 4-Digit Pickup OTP</p>
          <div className="inline-block text-4xl sm:text-5xl font-black text-brand tracking-widest px-6 py-2 rounded-lg bg-surface border border-borderLine shadow-card">
            {order.otp}
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={handleCopyOtp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-borderLine bg-surface text-xs font-semibold text-textMain hover:bg-slate-50 min-h-[38px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-brand" /> : <Copy className="w-3.5 h-3.5 text-textMuted" />}
              <span>{copied ? 'OTP Copied!' : 'Copy OTP'}</span>
            </button>
          </div>
        </div>

        {/* Details Summary */}
        <div className="p-5 space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between pb-2 border-b border-borderLine">
            <span className="text-textMuted">Order ID:</span>
            <span className="font-semibold text-textMain">{order.orderId}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-borderLine">
            <span className="text-textMuted">Customer:</span>
            <span className="font-semibold text-textMain">{order.customerName} ({order.customerPhone})</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-borderLine">
            <span className="text-textMuted">Payment Mode:</span>
            <span className="font-semibold text-brand">{order.paymentMethod}</span>
          </div>

          <div className="pt-2">
            <p className="font-bold text-textMain mb-2 uppercase text-xs tracking-wider">Ordered Items:</p>
            <div className="space-y-1.5 bg-background p-3 rounded-lg border border-borderLine">
              {order.items.map((it) => (
                <div key={it.id} className="flex justify-between text-xs">
                  <span className="truncate pr-2">{it.name} &times; {it.quantity}</span>
                  <span className="font-semibold shrink-0">₹{it.price * it.quantity}</span>
                </div>
              ))}
              <div className="border-t border-borderLine pt-2 mt-2 flex justify-between font-bold text-sm text-textMain">
                <span>Total Due at Counter:</span>
                <span className="text-brand">₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-background border-t border-borderLine space-y-2.5">
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-surface font-semibold text-sm shadow-card transition-colors min-h-[48px]"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Send Order to Shop WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onStartNewOrder}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface hover:bg-slate-100 border border-borderLine text-textMain font-semibold text-sm transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <ArrowLeft className="w-4 h-4 text-brand" aria-hidden="true" />
            <span>Continue Shopping (Close Ticket)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
