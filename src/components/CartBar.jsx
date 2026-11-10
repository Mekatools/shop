import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartBar({ totalItems, subtotal, onOpenCart }) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-surface/95 backdrop-blur-none border-t border-borderLine shadow-lift sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-brand text-surface flex items-center justify-center font-bold text-sm">
            {totalItems}
          </div>
          <div>
            <p className="text-xs text-textMuted leading-none">Total Bag</p>
            <p className="text-base font-bold text-textMain">₹{subtotal}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenCart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-surface font-semibold text-sm transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
