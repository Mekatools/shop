import React from 'react';
import { STORE_CONFIG, isStoreCurrentlyOpen } from '../config/store';
import { Clock, AlertCircle } from 'lucide-react';

export default function AnnouncementBar() {
  const isOpen = isStoreCurrentlyOpen();

  return (
    <aside aria-label="Store Announcement" className="bg-textMain text-surface py-2 px-4 text-xs sm:text-sm font-medium border-b border-borderLine">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <p className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          Serving the Campus &amp; Neighborhood | Order ahead for 2-Minute Counter Pickup
        </p>
        <div className="flex items-center gap-2 text-textMuted text-xs">
          {isOpen ? (
            <span className="flex items-center gap-1 text-emerald-300 font-semibold">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              Counter Open ({STORE_CONFIG.timings.display})
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Currently Closed &bull; Orders placed now will be packed for morning pickup
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
