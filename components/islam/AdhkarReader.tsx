'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Search, RotateCcw, Sunrise, Sunset, CheckCircle2 } from 'lucide-react';
import { ADHKAR } from '@/lib/islam/adhkar';
import type { Period } from '@/lib/islam/types';
import {
  subscribe, getCounts, getServerCounts, getFavorites, getServerFavorites,
  increment, resetOne, resetAll, toggleFavorite, normalizeArabic,
} from '@/lib/islam/progress-store';
import DhikrCard from './DhikrCard';

type Filter = 'all' | 'remaining' | 'favorites';

/** One reusable reader for both morning and evening adhkar. */
export default function AdhkarReader({ period }: { period: Period }) {
  const t = useTranslations('islam.adhkar');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [confirming, setConfirming] = useState(false);

  const counts = useSyncExternalStore(subscribe, () => getCounts(period), getServerCounts);
  const favorites = useSyncExternalStore(subscribe, getFavorites, getServerFavorites);

  const evening = period === 'evening';
  const items = useMemo(() => ADHKAR.filter((d) => d.periods.includes(period)), [period]);
  const doneCount = items.filter((d) => (counts[d.id] ?? 0) >= d.count).length;
  const total = items.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const visible = useMemo(() => {
    const q = normalizeArabic(query.trim());
    return items.filter((d) => {
      if (filter === 'remaining' && (counts[d.id] ?? 0) >= d.count) return false;
      if (filter === 'favorites' && !favorites.includes(d.id)) return false;
      if (!q) return true;
      const hay = normalizeArabic([d.text, d.eveningText ?? '', ...(d.eveningNotes ?? [])].join(' '));
      return hay.includes(q);
    });
  }, [items, query, filter, counts, favorites]);

  const HeaderIcon = evening ? Sunset : Sunrise;
  const headerBg = evening ? '#1b2a4a' : '#0b5d4b';
  const emptyMsg = query ? t('emptySearch') : filter === 'favorites' ? t('emptyFavorites') : t('emptyRemaining');

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('filterAll') },
    { id: 'remaining', label: t('filterRemaining') },
    { id: 'favorites', label: t('filterFavorites') },
  ];

  return (
    <div>
      {/* Header band: calm morning (emerald) or evening (midnight) theme */}
      <div className="qt-keep rounded-2xl p-5 md:p-7 mb-6 text-white relative overflow-hidden" style={{ background: headerBg, border: '1px solid rgba(201,162,74,0.45)' }}>
        <div className="flex items-start gap-4">
          <HeaderIcon size={32} style={{ color: '#e6d3a0' }} className="shrink-0 mt-1" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#f3eddc' }}>{t(`${period}.title`)}</h2>
            <p className="text-sm md:text-base mt-1" style={{ color: 'rgba(250,246,236,0.8)' }}>{t(`${period}.intro`)}</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm mb-2" style={{ color: '#f3eddc' }}>
            <span className="font-semibold">{t('progress', { done: doneCount, total })}</span>
            <span style={{ color: 'rgba(250,246,236,0.75)' }}>{t('remaining', { n: total - doneCount })}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.18)' }} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={doneCount} aria-label={t('progress', { done: doneCount, total })}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#c9a24a' }} />
          </div>
          <p className="sr-only" role="status" aria-live="polite">{doneCount === total && total > 0 ? t('allDone') : ''}</p>
        </div>
      </div>

      {doneCount === total && total > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: '#f3e9cc', color: '#6f5210', border: '1px solid #c9a24a' }}>
          <CheckCircle2 size={20} aria-hidden="true" /> {t('allDone')}
        </div>
      )}

      {/* Tools: search, filter, reset all */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <label className="relative flex-1">
          <span className="sr-only">{t('searchLabel')}</span>
          <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-3" style={{ color: '#7a8782' }} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className="w-full rounded-xl py-2.5 ps-10 pe-3 outline-none"
            style={{ background: 'var(--qt-surface)', border: '1px solid var(--qt-line)' }}
          />
        </label>

        <div role="group" aria-label={t('filterLabel')} className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              style={filter === f.id
                ? { background: '#0b5d4b', color: '#fff', border: '1px solid #0b5d4b' }
                : { background: 'var(--qt-surface)', color: 'var(--qt-ink)', border: '1px solid var(--qt-line)' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={doneCount === 0 && Object.keys(counts).length === 0}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-default"
            style={{ background: 'var(--qt-surface)', color: '#8f6b1c', border: '1px solid var(--qt-line)' }}
          >
            <RotateCcw size={16} aria-hidden="true" /> {t('resetAll')}
          </button>
        ) : null}
      </div>

      {confirming && (
        <div role="alertdialog" aria-live="assertive" className="mb-6 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between" style={{ background: '#faf3dc', border: '1px solid #c9a24a', color: '#6f5210' }}>
          <p className="text-sm font-semibold">{t('resetConfirm')}</p>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={() => { resetAll(period); setConfirming(false); }} className="px-4 py-2 rounded-lg text-sm font-bold cursor-pointer" style={{ background: '#8f6b1c', color: '#fff' }}>
              {t('resetYes')}
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer" style={{ background: 'var(--qt-surface)', border: '1px solid var(--qt-line)', color: 'var(--qt-ink)' }}>
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {visible.length === 0 ? (
        <div className="card-premium p-10 text-center" style={{ color: 'var(--qt-muted)' }}>{emptyMsg}</div>
      ) : (
        <div className="space-y-5">
          {visible.map((d) => (
            <DhikrCard
              key={d.id}
              dhikr={d}
              index={items.indexOf(d)}
              period={period}
              current={counts[d.id] ?? 0}
              favorite={favorites.includes(d.id)}
              onTap={() => increment(period, d.id, d.count)}
              onReset={() => resetOne(period, d.id)}
              onFavorite={() => toggleFavorite(d.id)}
            />
          ))}
        </div>
      )}

      <p className="mt-8 text-xs text-center" style={{ color: 'var(--qt-muted)' }}>
        {t('textSource')} {t('storageNote')}
      </p>
    </div>
  );
}
