import React from 'react';
import { ShoppingCart, KeyRound, Store } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <ShoppingCart className="w-6 h-6 text-brand" aria-hidden="true" />,
      title: "1. Select Online",
      description: "Pick your groceries, snacks, or stationery from Shop A & B in seconds.",
    },
    {
      number: "02",
      icon: <KeyRound className="w-6 h-6 text-brand" aria-hidden="true" />,
      title: "2. Get 4-Digit OTP",
      description: "Enter your phone number to get your Pickup Ticket code immediately.",
    },
    {
      number: "03",
      icon: <Store className="w-6 h-6 text-brand" aria-hidden="true" />,
      title: "3. Collect in 2 Mins",
      description: "Show your OTP at the counter, pay via Cash or UPI, and grab your bag!",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 px-4 bg-background border-t border-borderLine">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-textMain tracking-tight">
            How Counter Pickup Works
          </h2>
          <p className="text-sm text-textMuted mt-1">
            Built specifically for students &amp; neighbors to skip the counter queue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((st) => (
            <div key={st.number} className="bg-surface rounded-lg p-5 border border-borderLine shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-light border border-emerald-200 flex items-center justify-center">
                    {st.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300">{st.number}</span>
                </div>
                <h3 className="text-base font-bold text-textMain mb-1.5">{st.title}</h3>
                <p className="text-sm text-textMuted">{st.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
