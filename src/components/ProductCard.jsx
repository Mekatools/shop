import React from 'react';
import { Plus, Minus, Package, Coffee, BookOpen, Sparkles, Utensils } from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Snacks & Instant Food':
      return <Utensils className="w-8 h-8 text-brand/70" aria-hidden="true" />;
    case 'Beverages':
      return <Coffee className="w-8 h-8 text-brand/70" aria-hidden="true" />;
    case 'Stationery & Supplies':
      return <BookOpen className="w-8 h-8 text-brand/70" aria-hidden="true" />;
    case 'Personal Care':
      return <Sparkles className="w-8 h-8 text-brand/70" aria-hidden="true" />;
    default:
      return <Package className="w-8 h-8 text-brand/70" aria-hidden="true" />;
  }
};

export default function ProductCard({ product, quantity, onAddToCart, onUpdateQuantity }) {
  return (
    <article className="bg-surface rounded-lg border border-borderLine shadow-card p-4 flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        <div className="w-full h-32 rounded-md bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-textMuted mb-3 relative overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              {getCategoryIcon(product.category)}
              <span className="text-[11px] font-medium text-textMuted mt-1 tracking-wide uppercase">
                {product.shop === 'A' ? 'Shop A' : 'Shop B'}
              </span>
            </>
          )}
        </div>

        <span className="inline-block text-[11px] font-semibold text-brand bg-brand-light px-2 py-0.5 rounded border border-emerald-200 mb-1">
          {product.category}
        </span>

        <h3 className="font-semibold text-textMain text-sm sm:text-base leading-snug line-clamp-2 mt-1">
          {product.name}
        </h3>
        <p className="text-xs text-textMuted mt-0.5">{product.packSize}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-borderLine flex items-center justify-between gap-2">
        <div>
          <span className="text-xs text-textMuted block leading-none">Price</span>
          <span className="text-lg font-bold text-textMain">₹{product.price}</span>
        </div>

        {quantity === 0 ? (
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to pickup bag`}
            className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-surface hover:bg-brand hover:text-surface text-brand border border-brand font-semibold text-sm rounded-lg transition-colors min-h-[44px] min-w-[84px] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add</span>
          </button>
        ) : (
          <div className="inline-flex items-center border border-borderLine rounded-lg bg-surface shadow-card overflow-hidden">
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="px-2.5 py-2 text-textMain hover:bg-slate-100 transition-colors min-h-[44px] min-w-[36px] flex items-center justify-center focus:outline-none"
            >
              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <span className="px-3 text-sm font-bold text-textMain min-w-[28px] text-center" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              aria-label={`Increase quantity of ${product.name}`}
              className="px-2.5 py-2 text-textMain hover:bg-slate-100 transition-colors min-h-[44px] min-w-[36px] flex items-center justify-center focus:outline-none"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
