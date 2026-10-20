'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bookmark, Check, Copy, RotateCcw, Info } from 'lucide-react';
import type { Dhikr, Period } from '@/lib/islam/types';

interface Props {
  dhikr: Dhikr;
  index: number;
  period: Period;
  current: number;
  favorite: boolean;
  onTap: () => void;
  onReset: () => void;
  onFavorite: () => void;
}

export default function DhikrCard({ dhikr, index, period, current, favorite, onTap, onReset, onFavorite }: Props) {
  const t = useTranslations('islam.adhkar');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const evening = period === 'evening';
  const text = evening && dhikr.eveningText ? dhikr.eveningText : dhikr.text;
  const complete = current >= dhikr.count;
  const pct = Math.min(100, Math.round((current / dhikr.count) * 100));
  const truncatedEvening = evening && dhikr.eveningNotes?.some((n) => n.includes('...'));
  const accent = evening ? '#1b2a4a' : '#0b5d4b';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <article
      className="card-premium p-5 md:p-7 fade-up"
      style={complete ? { borderColor: '#c9a24a', background: evening ? '#f4f1e8' : '#f7f3e8' } : undefined}
      aria-labelledby={`dhikr-${period}-${dhikr.id}`}
    >
      <header className="flex items-center justify-between gap-3 mb-4">
        <h3 id={`dhikr-${period}-${dhikr.id}`} className="text-sm font-bold tracking-wide" style={{ color: '#8f6b1c', fontFamily: 'var(--qt-font-ui)' }}>
          {t('dhikrNumber', { n: index + 1 })}
          {dhikr.periods.length === 1 && (
            <span className="ms-2 text-xs font-semibold rounded-full px-2 py-0.5" style={{ background: '#f3e9cc', color: '#8f6b1c' }}>
              {dhikr.periods[0] === 'morning' ? t('onlyMorning') : t('onlyEvening')}
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
          <button
            type="button"
            onClick={copy}
            aria-label={t('copy')}
            title={t('copy')}
            className="p-2 rounded-lg transition-colors hover:bg-black/5 cursor-pointer"
            style={{ color: '#7a8782' }}
          >
            {copyState === 'copied' ? <Check size={18} style={{ color: '#1f7a55' }} /> : <Copy size={18} />}
          </button>
          <span className="sr-only" role="status" aria-live="polite">
            {copyState === 'copied' ? t('copied') : copyState === 'failed' ? t('copyFailed') : ''}
          </span>
        </div>
      </header>

      {/* Religious text: always Arabic, RTL, never translated */}
      <p lang="ar" dir="rtl" className="font-quranic text-2xl md:text-[1.75rem] text-center whitespace-pre-line" style={{ color: 'var(--qt-ink)' }}>
        {text}
      </p>

      {dhikr.note && (
        <p lang="ar" dir="rtl" className="font-quranic text-lg text-center mt-3" style={{ color: 'var(--qt-muted)' }}>
          {dhikr.note}
        </p>
      )}

      {evening && dhikr.eveningNotes && (
        <div className="mt-4 rounded-xl px-4 py-3" style={{ background: '#eef0f6', border: '1px solid #cdd3e3' }}>
          <p className="text-xs font-bold mb-2" style={{ color: '#1b2a4a' }}>{t('eveningNotes')}</p>
          {dhikr.eveningNotes.map((n, i) => (
            <p key={i} lang="ar" dir="rtl" className="font-quranic text-xl" style={{ color: '#1b2a4a' }}>{n}</p>
          ))}
          {truncatedEvening && <p className="text-xs mt-2" style={{ color: '#5f6f69' }}>{t('eveningShort')}</p>}
        </div>
      )}

      {/* Counter */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onTap}
          disabled={complete}
          aria-label={t('countAria', { n: index + 1, current, target: dhikr.count })}
          className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center text-white transition-transform active:scale-95 disabled:cursor-default cursor-pointer"
          style={{
            background: complete ? '#c9a24a' : accent,
            color: complete ? '#073f33' : '#fff',
            boxShadow: `0 8px 20px ${complete ? 'rgba(201,162,74,0.35)' : 'rgba(7,63,51,0.3)'}, inset 0 0 0 3px rgba(201,162,74,0.55)`,
          }}
        >
          {complete ? (
            <Check size={34} aria-hidden="true" />
          ) : (
            <>
              <span className="text-2xl font-bold leading-none tabular-nums">{current}</span>
              <span className="text-[0.7rem] opacity-80 mt-1">{t('tap')}</span>
            </>
          )}
        </button>

        <div className="w-full max-w-xs">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e3dcc8' }} role="progressbar" aria-valuemin={0} aria-valuemax={dhikr.count} aria-valuenow={current}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(to right, #c9a24a, #1f7a55)' }} />
          </div>
          <div className="flex items-center justify-between mt-1.5 text-xs" style={{ color: 'var(--qt-muted)' }}>
            <span className="tabular-nums" dir="ltr">{t('counter', { current, target: dhikr.count })}</span>
            <button
              type="button"
              onClick={onReset}
              disabled={current === 0}
              className="inline-flex items-center gap-1 font-semibold rounded px-1 py-0.5 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer disabled:cursor-default"
              style={{ color: '#8f6b1c' }}
            >
              <RotateCcw size={12} aria-hidden="true" /> {t('resetOne')}
            </button>
          </div>
        </div>
      </div>

      {/* Source & references */}
      <footer className="mt-5 pt-4 text-xs space-y-1.5" style={{ borderTop: '1px solid var(--qt-line)', color: 'var(--qt-muted)' }}>
        <p>
          <span className="font-bold">{t('source')}:</span>{' '}
          <span lang="ar" dir="rtl" className="font-quranic text-base align-middle">
            {dhikr.refs.length > 0 ? dhikr.refs.join('، ') : 'حصن المسلم'}
          </span>
        </p>
        {dhikr.review && (
          <p className="flex items-start gap-1.5" style={{ color: '#8f6b1c' }}>
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> {t('review')}
          </p>
        )}
        {dhikr.gradeDisputed && (
          <p className="flex items-start gap-1.5" style={{ color: '#8f6b1c' }}>
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> {t('disputed')}
          </p>
        )}
      </footer>
    </article>
  );
}
