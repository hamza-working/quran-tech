'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bookmark, Check, Copy, Info } from 'lucide-react';
import type { Dhikr } from '@/lib/islam/types';
import DuaText from './DuaText';

interface Props {
  dua: Dhikr;
  heading: string;
  favorite: boolean;
  onFavorite: () => void;
}

/** Plain supplication card (no counter): text, repetition hint from the source, copy, favourite and source. */
export default function DuaCard({ dua, heading, favorite, onFavorite }: Props) {
  const t = useTranslations('islam.adhkar');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(dua.text.replace(/\(\(|\)\)/g, ''));
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <article className="card-premium p-5 md:p-7 fade-up" aria-label={heading}>
      <header className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-bold tracking-wide" style={{ color: '#8f6b1c' }}>
          {heading}
          {dua.count > 1 && (
            <span className="ms-2 text-xs font-semibold rounded-full px-2 py-0.5" style={{ background: '#f3e9cc', color: '#8f6b1c' }}>
              {t('repeat', { count: dua.count })}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onFavorite}
            aria-pressed={favorite}
            aria-label={favorite ? t('favRemove') : t('favAdd')}
            title={favorite ? t('favRemove') : t('favAdd')}
            className="p-2 rounded-lg transition-colors hover:bg-black/5 cursor-pointer"
            style={{ color: favorite ? '#b8893a' : '#7a8782' }}
          >
            <Bookmark size={18} fill={favorite ? 'currentColor' : 'none'} />
          </button>
          <button type="button" onClick={copy} aria-label={t('copy')} title={t('copy')} className="p-2 rounded-lg transition-colors hover:bg-black/5 cursor-pointer" style={{ color: '#7a8782' }}>
            {copyState === 'copied' ? <Check size={18} style={{ color: '#1f7a55' }} /> : <Copy size={18} />}
          </button>
          <span className="sr-only" role="status" aria-live="polite">
            {copyState === 'copied' ? t('copied') : copyState === 'failed' ? t('copyFailed') : ''}
          </span>
        </div>
      </header>

      <div lang="ar" dir="rtl" className="text-center">
        <DuaText text={dua.text} />
      </div>

      <footer className="mt-5 pt-4 text-xs space-y-1.5" style={{ borderTop: '1px solid var(--qt-line)', color: 'var(--qt-muted)' }}>
        <p>
          <span className="font-bold">{t('source')}:</span>{' '}
          <span lang="ar" dir="rtl" className="font-quranic text-base align-middle">{dua.refs.length > 0 ? dua.refs.join('، ') : 'حصن المسلم'}</span>
        </p>
        {dua.grading && (
          <p>
            <span className="font-bold">{t('grading')}:</span>{' '}
            <span lang="ar" dir="rtl" className="font-quranic text-base align-middle">{dua.grading}</span>
          </p>
        )}
        {dua.refsBrief && <p>{t('briefRefs')}</p>}
        {dua.review && (
          <p className="flex items-start gap-1.5" style={{ color: '#8f6b1c' }}>
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> {t('review')}
          </p>
        )}
      </footer>
    </article>
  );
}
