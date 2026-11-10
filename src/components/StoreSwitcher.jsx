import React from 'react';

export default function StoreSwitcher({ activeShop, onSelectShop }) {
  const options = [
    { id: 'ALL', label: 'All Items' },
    { id: 'A', label: 'Shop A: Groceries & Snacks' },
    { id: 'B', label: 'Shop B: Household & College' },
  ];

  return (
    <div className="bg-surface border-b border-borderLine py-2.5 px-4">
      <div className="max-w-6xl mx-auto">
        <div 
          role="tablist" 
          aria-label="Filter products by store section" 
          className="inline-flex p-1 bg-background border border-borderLine rounded-lg w-full sm:w-auto"
        >
          {options.map((opt) => {
            const isSelected = activeShop === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectShop(opt.id)}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors min-h-[44px] sm:min-h-[38px] flex items-center justify-center text-center ${
                  isSelected
                    ? 'bg-surface text-brand shadow-card border border-borderLine font-bold'
                    : 'text-textMuted hover:text-textMain'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
