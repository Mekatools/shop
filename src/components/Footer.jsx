import React from 'react';
import { STORE_CONFIG } from '../config/store';
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-borderLine text-textMain pt-10 pb-20 sm:pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Store Info */}
        <div>
          <h3 className="text-lg font-bold tracking-tight text-textMain mb-2">
            {STORE_CONFIG.name}
          </h3>
          <p className="text-xs text-textMuted mb-4">
            Run by {STORE_CONFIG.owners.brother1} &amp; {STORE_CONFIG.owners.brother2}
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-textMuted">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" aria-hidden="true" />
              <span>{STORE_CONFIG.location.address}, {STORE_CONFIG.location.landmark}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
              <span>{STORE_CONFIG.timings.display}</span>
            </p>
          </div>
        </div>

        {/* Phone & Direct Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-textMain mb-3">Counter Contacts</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            <a
              href={`tel:${STORE_CONFIG.phoneNumbers.primary.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-brand hover:underline font-semibold min-h-[44px]"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Call Primary: {STORE_CONFIG.phoneNumbers.primary}</span>
            </a>
            <a
              href={`tel:${STORE_CONFIG.phoneNumbers.secondary.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-brand hover:underline font-semibold min-h-[44px]"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Call Secondary: {STORE_CONFIG.phoneNumbers.secondary}</span>
            </a>
            <p className="text-xs text-textMuted pt-1">
              Accepted at counter: Cash or UPI ({STORE_CONFIG.upiId})
            </p>
          </div>
        </div>

        {/* Map Preview */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-textMain mb-3">Location &amp; Directions</h4>
          <div className="rounded-lg overflow-hidden border border-borderLine bg-slate-100 aspect-video mb-2.5 relative">
            <iframe
              title="Brothers Superstore Location Map"
              src={STORE_CONFIG.location.googleMapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a
            href={STORE_CONFIG.location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline min-h-[36px]"
          >
            <span>Get Google Maps Directions</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-borderLine text-center text-xs text-textMuted">
        &copy; {new Date().getFullYear()} {STORE_CONFIG.name}. Built for fast student counter pickup.
      </div>
    </footer>
  );
}
