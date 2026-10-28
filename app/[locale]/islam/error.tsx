'use client';

import { useTranslations } from 'next-intl';

export default function IslamError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('islam.adhkar');
  return (
    <main className="min-h-[50vh] flex items-center justify-center px-5">
      <div className="card-premium p-8 text-center max-w-md">
        <p className="mb-5">{t('error')}</p>
        <button type="button" onClick={reset} className="btn-emerald">OK</button>
      </div>
    </main>
  );
}
