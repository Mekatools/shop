import React from 'react';
import { ArrowDown, CheckCircle, Clock } from 'lucide-react';

export default function Hero({ onBrowseClick, onHowItWorksClick }) {
  return (
    <section className="bg-surface border-b border-borderLine py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light border border-emerald-200 text-brand text-xs font-semibold mb-4">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          Counter Pickup Ready in Under 2 Minutes
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-textMain tracking-tight leading-tight sm:leading-snug mb-3">
          Skip the Counter Rush.<br className="hidden sm:inline" />
          Order Ahead &amp; Collect in 2 Minutes.
        </h2>

        <p className="text-base sm:text-lg text-textMuted max-w-2xl mx-auto mb-6">
          Select your items online, get an instant 4-digit Pickup OTP, and collect at our store counter. Pay via Cash or UPI at pickup.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBrowseClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand hover:bg-brand-hover text-surface font-semibold text-base shadow-card transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[48px]"
          >
            <span>Browse Products</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onHowItWorksClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface hover:bg-slate-50 border border-borderLine text-textMain font-semibold text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[48px]"
          >
            <span>How Pickup Works</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-borderLine grid grid-cols-3 gap-2 text-center text-xs sm:text-sm text-textMuted">
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            <CheckCircle className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
            <span>Pay on Pickup</span>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            <CheckCircle className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
            <span>Zero Extra Fees</span>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            <CheckCircle className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
            <span>Campus Friendly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
