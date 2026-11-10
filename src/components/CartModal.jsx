import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  paymentMethod,
  onSelectPaymentMethod,
  onProceedToCheckout,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="bg-surface w-full max-w-lg rounded-t-xl sm:rounded-xl border border-borderLine shadow-lift max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header with Back to Store & Close */}
        <div className="px-5 py-4 border-b border-borderLine flex items-center justify-between bg-background">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-borderLine bg-surface hover:bg-slate-100 text-xs font-semibold text-textMain min-h-[36px]"
              aria-label="Back to store"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
              <span>Back to Store</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 text-textMuted hover:text-textMain rounded-lg border border-borderLine hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Item List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-textMuted text-sm">Your pickup bag is empty.</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 px-4 py-2 text-xs font-semibold text-brand border border-brand rounded-lg hover:bg-brand-light min-h-[44px]"
              >
                Browse Items
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-lg border border-borderLine bg-surface">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm text-textMain truncate">{item.name}</h4>
                  <p className="text-xs text-textMuted">₹{item.price} &bull; {item.packSize}</p>
                  <p className="text-xs font-bold text-brand mt-0.5">₹{item.price * item.quantity}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center border border-borderLine rounded-lg bg-background">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name}`}
                      className="p-1.5 text-textMain hover:bg-slate-200 min-h-[38px] min-w-[32px] flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <span className="px-2 text-xs font-bold text-textMain min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name}`}
                      className="p-1.5 text-textMain hover:bg-slate-200 min-h-[38px] min-w-[32px] flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="p-2 text-textMuted hover:text-red-600 rounded-lg min-h-[38px] min-w-[38px] flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="mt-4 pt-4 border-t border-borderLine">
              <label className="block text-xs font-bold text-textMain uppercase tracking-wide mb-2">
                Choose Payment Method at Counter:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPaymentMethod('Cash on Pickup')}
                  className={`p-3 rounded-lg border text-left text-xs font-semibold transition-colors min-h-[44px] ${
                    paymentMethod === 'Cash on Pickup'
                      ? 'border-brand bg-brand-light text-brand font-bold'
                      : 'border-borderLine text-textMuted hover:text-textMain'
                  }`}
                >
                  💵 Cash at Counter
                </button>
                <button
                  type="button"
                  onClick={() => onSelectPaymentMethod('UPI at Pickup')}
                  className={`p-3 rounded-lg border text-left text-xs font-semibold transition-colors min-h-[44px] ${
                    paymentMethod === 'UPI at Pickup'
                      ? 'border-brand bg-brand-light text-brand font-bold'
                      : 'border-borderLine text-textMuted hover:text-textMain'
                  }`}
                >
                  📱 UPI / QR Scan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-borderLine bg-background flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-textMuted block">To Pay at Pickup</span>
              <span className="text-xl font-bold text-textMain">₹{subtotal}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg border border-borderLine bg-surface hover:bg-slate-50 text-textMain font-semibold text-xs sm:text-sm min-h-[44px]"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-surface font-semibold text-xs sm:text-sm shadow-card transition-colors min-h-[44px]"
              >
                <span>Enter Details</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
