'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Star, Landmark, Sunrise, Sunset, ChevronLeft, ArrowDown, ArrowRight, type LucideIcon } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Logo from '@/components/shared/Logo';
import PillarsOfIslam from '@/components/islam/PillarsOfIslam';
import SalahPillars from '@/components/islam/SalahPillars';
import AdhkarReader from '@/components/islam/AdhkarReader';
import TopicsBrowser from '@/components/islam/TopicsBrowser';
import { useHash, setHash } from '@/components/islam/useHash';
import { TOPICS, CHAPTERS } from '@/lib/islam/topics';
import { TOPIC_ICONS } from '@/components/islam/topic-icons';

type SectionId = 'pillars' | 'salah' | 'morning' | 'evening';

const SECTIONS: { id: SectionId; icon: LucideIcon; tint: string }[] = [
  { id: 'pillars', icon: Star, tint: '#0b5d4b' },
  { id: 'salah', icon: Landmark, tint: '#1f7a55' },
  { id: 'morning', icon: Sunrise, tint: '#b8893a' },
  { id: 'evening', icon: Sunset, tint: '#1b2a4a' },
];

export default function IslamPage() {
  const t = useTranslations('islam');
  const locale = useLocale();
  const hash = useHash();
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);

  // Deep link for a topic: #topic-<id>, e.g. #topic-travel
  const rawTopic = hash.startsWith('topic-') ? hash.slice('topic-'.length) : null;
  const topicId = rawTopic && TOPICS.some((x) => x.id === rawTopic) ? rawTopic : null;
  const active: SectionId | 'topics' | null = topicId ? 'topics' : SECTIONS.find((s) => s.id === hash)?.id ?? null;

  // One grid for everything: the four main sections, then the supplication topics.
  const cards = [
    ...SECTIONS.map(({ id, icon, tint }) => ({ key: id, hash: id, icon, tint, selected: active === id, title: t(`categories.${id}.title`), desc: t(`categories.${id}.desc`) })),
    ...TOPICS.map((tp) => ({
      key: `topic-${tp.id}`, hash: `topic-${tp.id}`, icon: TOPIC_ICONS[tp.id], tint: '#0b5d4b', selected: topicId === tp.id,
      title: t(`topics.names.${tp.id}`),
      desc: t('topics.countOf', { n: tp.chapters.reduce((n, id) => n + CHAPTERS[id].items.length, 0) }),
    })),
  ];

  // Scroll to the opened section (or back to the categories), honouring reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = active ? sectionRef.current : null;
    if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [active]);

  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    categoriesRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen" style={{ background: 'var(--qt-bg)' }}>
      <Navbar />

      {/* Hero */}
      <section className="qt-keep islamic-pattern text-white">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-24 text-center">
          <div className="fade-up flex justify-center mb-5" aria-hidden="true"><Logo size={52} /></div>
          <p className="fade-up eyebrow mb-3" style={{ color: '#c9a24a' }}>{t('hero.eyebrow')}</p>
          <h1 className="fade-up text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ color: '#f3eddc' }}>{t('hero.title')}</h1>
          <p className="fade-up-2 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-9" style={{ color: '#e6d3a0' }}>{t('hero.subtitle')}</p>
          <a href="#categories" onClick={scrollToCategories} className="fade-up-3 btn-gold text-base md:text-lg">
            {t('hero.cta')} <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-5 py-10 md:py-14">
        {/* Categories */}
        <section id="categories" ref={categoriesRef} aria-labelledby="categories-heading" className="scroll-mt-24">
          <h2 id="categories-heading" className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: '#0b5d4b' }}>
            {t('categories.heading')}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={t('categories.tabs')}>
            {cards.map((c) => (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => setHash(c.hash)}
                  aria-current={c.selected ? 'true' : undefined}
                  className="card-premium w-full h-full p-5 text-start flex flex-col gap-3 cursor-pointer"
                  style={c.selected ? { borderColor: '#c9a24a', boxShadow: 'var(--shadow-lg)' } : undefined}
                >
                  <span className="qt-keep self-start">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: c.tint, color: '#f3eddc', boxShadow: 'inset 0 0 0 2px rgba(201,162,74,0.45)' }}>
                      <c.icon size={24} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="block text-lg font-bold" style={{ color: 'var(--qt-ink)', fontFamily: 'var(--qt-font-display)' }}>{c.title}</span>
                  <span className="block text-sm flex-1" style={{ color: 'var(--qt-muted)' }}>{c.desc}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: '#1f7a55' }}>
                    {t('categories.open')} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Selected section */}
        {active && (
          <div ref={sectionRef} className="mt-14 scroll-mt-24">
            <nav aria-label={t('breadcrumb.label')} className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: 'var(--qt-muted)' }}>
                <li><Link href={`/${locale}`} className="hover:underline">{t('breadcrumb.home')}</Link></li>
                <li aria-hidden="true"><ChevronLeft size={14} className="ltr:rotate-180" /></li>
                <li><button type="button" onClick={() => setHash('')} className="hover:underline cursor-pointer">{t('breadcrumb.root')}</button></li>
                <li aria-hidden="true"><ChevronLeft size={14} className="ltr:rotate-180" /></li>
                <li aria-current="page" className="font-bold" style={{ color: 'var(--qt-ink)' }}>
                  {active === 'topics' && topicId ? t(`topics.names.${topicId}`) : active ? t(`categories.${active}.title`) : null}
                </li>
              </ol>
            </nav>

            {/* Quick switch between the four sections */}
            <div role="group" aria-label={t('categories.tabs')} className="flex gap-1.5 flex-wrap mb-8">
              {SECTIONS.map(({ id }) => (
                <button key={id} type="button" onClick={() => setHash(id)} aria-pressed={active === id}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  style={active === id
                    ? { background: '#0b5d4b', color: '#fff', border: '1px solid #0b5d4b' }
                    : { background: 'var(--qt-surface)', color: 'var(--qt-ink)', border: '1px solid var(--qt-line)' }}>
                  {t(`categories.${id}.title`)}
                </button>
              ))}
            </div>

            {active === 'pillars' && <PillarsOfIslam />}
            {active === 'salah' && <SalahPillars />}
            {active === 'morning' && <AdhkarReader period="morning" />}
            {active === 'evening' && <AdhkarReader period="evening" />}
            {active === 'topics' && topicId && <TopicsBrowser topicId={topicId} />}

            <button type="button" onClick={() => { setHash(''); categoriesRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }); }}
              className="mt-10 mx-auto flex items-center gap-2 text-sm font-bold cursor-pointer" style={{ color: '#1f7a55' }}>
              <ChevronLeft size={16} className="ltr:rotate-180" aria-hidden="true" /> {t('breadcrumb.back')}
            </button>
          </div>
        )}

        <p className="mt-14 text-xs text-center max-w-2xl mx-auto" style={{ color: 'var(--qt-muted)' }}>{t('review.banner')}</p>
      </div>
    </main>
  );
}
