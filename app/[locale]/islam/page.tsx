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
import { useHash, setHash } from '@/components/islam/useHash';

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

  const active = SECTIONS.find((s) => s.id === hash)?.id ?? null;

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
          <ul className="grid gap-4 sm:grid-cols-2" aria-label={t('categories.tabs')}>
            {SECTIONS.map(({ id, icon: Icon, tint }) => {
              const selected = active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setHash(id)}
                    aria-current={selected ? 'true' : undefined}
                    className="card-premium w-full h-full p-6 text-start flex gap-4 items-start cursor-pointer"
                    style={selected ? { borderColor: '#c9a24a', boxShadow: 'var(--shadow-lg)' } : undefined}
                  >
                    <span className="qt-keep shrink-0">
                      <span className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: tint, color: '#f3eddc' }}>
                        <Icon size={26} aria-hidden="true" />
                      </span>
                    </span>
                    <span className="flex-1">
                      <span className="block text-xl font-bold mb-1" style={{ color: 'var(--qt-ink)', fontFamily: 'var(--qt-font-display)' }}>{t(`categories.${id}.title`)}</span>
                      <span className="block text-sm mb-3" style={{ color: 'var(--qt-muted)' }}>{t(`categories.${id}.desc`)}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: '#1f7a55' }}>
                        {t('categories.open')} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
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
                <li aria-current="page" className="font-bold" style={{ color: 'var(--qt-ink)' }}>{t(`categories.${active}.title`)}</li>
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
