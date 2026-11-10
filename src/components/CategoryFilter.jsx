import React from 'react';
import { Search } from 'lucide-react';

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <label htmlFor="product-search" className="sr-only">Search products by name</label>
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMuted">
          <Search className="w-4 h-4" aria-hidden="true" />
        </div>
        <input
          id="product-search"
          type="search"
          placeholder="Search items (e.g. Maggi, Notebook, Pen, Dettol)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-borderLine rounded-lg text-textMain placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-sm sm:text-base min-h-[44px]"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" role="region" aria-label="Categories">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors border min-h-[38px] ${
                isActive
                  ? 'bg-brand text-surface border-brand shadow-card'
                  : 'bg-surface text-textMuted border-borderLine hover:text-textMain hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
