'use client';

import { useState, useEffect } from 'react';

export default function PWAInstall() {
  interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
}

const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  setDeferredPrompt(e as BeforeInstallPromptEvent);
  setShowBanner(true);
});
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 rounded-3xl p-4 shadow-2xl flex items-center justify-between gap-4"
      style={{background: '#006a67', color: 'white', border: '2px solid #fbbf24'}}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">🕌</span>
        <div>
          <div className="font-bold text-sm">ثبّت التطبيق!</div>
          <div className="text-xs opacity-80">استخدمه بدون إنترنت</div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowBanner(false)}
          className="text-xs px-3 py-2 rounded-xl opacity-70 hover:opacity-100"
        >
          لاحقاً
        </button>
        <button
          onClick={handleInstall}
          className="text-xs px-4 py-2 rounded-xl font-bold"
          style={{background: '#fbbf24', color: '#006a67'}}
        >
          تثبيت
        </button>
      </div>
    </div>
  );
}