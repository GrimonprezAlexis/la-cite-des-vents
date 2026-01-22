'use client';

import { useContactSettings } from '@/hooks/use-contact-settings';
import { Megaphone, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AnnouncementBanner() {
  const { settings, isLoading } = useContactSettings({ refreshInterval: 60000 });
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissed state when announcement changes
  useEffect(() => {
    setDismissed(false);
  }, [settings.announcement]);

  if (isLoading || !settings.announcement_active || !settings.announcement || dismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#d3cbc2] to-[#b8af9f] text-gray-900 py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <Megaphone className="w-4 h-4 flex-shrink-0" />
        <span className="text-center">{settings.announcement}</span>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 p-1 hover:bg-black/10 rounded transition-colors"
          aria-label="Fermer l'annonce"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
