'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, ChevronDown } from 'lucide-react';
import { TOPICS, CHAPTERS, type DuaChapter } from '@/lib/islam/topics';
import { subscribe, getFavorites, getServerFavorites, toggleFavorite, normalizeArabic } from '@/lib/islam/progress-store';
import DuaCard from './DuaCard';

/** One topic (e.g. travel): its chapters as collapsible groups of supplication cards. */
export default function TopicsBrowser({ topicId }: { topicId: string }) {
  const t = useTranslations('islam.topics');
  const td = useTranslations('islam.adhkar');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const favorites = useSyncExternalStore(subscribe, getFavorites, getServerFavorites);

  const topic = TOPICS.find((x) => x.id === topicId);
  const chapterTitle = (c: DuaChapter) => (locale === 'ar' ? c.title : t(`chapters.${c.id}`));

  const chapters = useMemo(() => {
    if (!topic) return [];
    const all = topic.chapters.map((id) => CHAPTERS[id]);
    const q = normalizeArabic(query.trim());
    if (!q) return all;
    const out: DuaChapter[] = [];
    for (const c of all) {
      const title = normalizeArabic(c.title) + ' ' + (locale === 'ar' ? '' : t(`chapters.${c.id}`).toLowerCase());
      if (title.includes(q)) out.push(c);
      else {
        const items = c.items.filter((it) => normalizeArabic(it.text).includes(q));
        if (items.length) out.push({ ...c, items });
      }
    }
    return out;
  }, [topic, query, locale, t]);

  if (!topic) return null;
  const total = topic.chapters.reduce((n, id) => n + CHAPTERS[id].items.length, 0);
  const searching = query.trim().length > 0;

  return (
    <section aria-labelledby="topics-heading">
      <h2 id="topics-heading" className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0b5d4b' }}>{t(`names.${topic.id}`)}</h2>
      <p className="mb-6" style={{ color: 'var(--qt-muted)' }}>{t('countOf', { n: total })}</p>

      <label className="relative block mb-8">
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

      {chapters.length === 0 ? (
        <div className="card-premium p-10 text-center" style={{ color: 'var(--qt-muted)' }}>{t('noResults')}</div>
      ) : (
        <div className="space-y-3">
          {chapters.map((c, ci) => (
            <details key={c.id} open={searching ? chapters.length <= 3 : ci === 0} className="card-premium group">
              <summary className="list-none cursor-pointer p-4 md:p-5 flex items-center gap-3">
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-base md:text-lg" style={{ color: 'var(--qt-ink)', fontFamily: 'var(--qt-font-display)' }}>{chapterTitle(c)}</span>
                  {locale !== 'ar' && <span lang="ar" dir="rtl" className="block font-quranic text-base text-start" style={{ color: 'var(--qt-muted)' }}>{c.title}</span>}
                </span>
                <span className="text-xs font-bold rounded-full px-2.5 py-1 shrink-0" style={{ background: '#eaf2ed', color: '#0b5d4b' }}>{c.items.length}</span>
                <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="px-3 md:px-5 pb-5 space-y-4">
                {c.items.map((it, i) => (
                  <DuaCard
                    key={it.id}
                    dua={it}
                    heading={td('duaNumber', { n: i + 1 })}
                    favorite={favorites.includes(it.id)}
                    onFavorite={() => toggleFavorite(it.id)}
                  />
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      <p className="mt-8 text-xs text-center" style={{ color: 'var(--qt-muted)' }}>{td('textSource')}</p>
    </section>
  );
}
