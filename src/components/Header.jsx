import React from 'react';
import { STORE_CONFIG } from '../config/store';
import { ShoppingBag, Store } from 'lucide-react';

export default function Header({ totalItems, onOpenCart }) {
  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-borderLine shadow-card">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-brand-light border border-borderLine flex items-center justify-center text-brand flex-shrink-0">
            <Store className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="truncate">
            <h1 className="text-lg sm:text-xl font-bold text-textMain tracking-tight leading-tight truncate">
              {STORE_CONFIG.name}
            </h1>
            <p className="text-xs text-textMuted truncate">
              Run by {STORE_CONFIG.owners.brother1} &amp; {STORE_CONFIG.owners.brother2}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Open Cart, ${totalItems} items`}
          className="relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-borderLine bg-surface hover:bg-slate-50 transition-colors text-textMain focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
        >
          <ShoppingBag className="w-5 h-5 text-brand" aria-hidden="true" />
          <span className="hidden sm:inline text-sm font-semibold">Pickup Bag</span>
          <span className="inline-flex items-center justify-center text-xs font-bold px-2 py-0.5 rounded-full bg-brand text-surface">
            {totalItems}
          </span>
        </button>
      </div>
    </header>
  );
}
