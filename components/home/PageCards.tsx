'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  GraduationCap, BookOpen, BookOpenText, Star, Brain, Cpu, Languages, Globe, Trophy, MessageCircle,
  ArrowRight, type LucideIcon,
} from 'lucide-react';
import { navTexts, type NavLocale } from '@/components/shared/nav-config';

// One card per public page of the site. Titles reuse the navigation labels; descriptions live in messages/*.json (home.pages_*).
const PAGES: { id: string; href: string; icon: LucideIcon; label: keyof (typeof navTexts)['ar'] }[] = [
  { id: 'program', href: '/program', icon: GraduationCap, label: 'program' },
  { id: 'mushaf', href: '/mushaf', icon: BookOpen, label: 'mushaf' },
  { id: 'tajweed', href: '/tajweed', icon: BookOpenText, label: 'tajweed' },
  { id: 'islam', href: '/islam', icon: Star, label: 'islam' },
  { id: 'quiz', href: '/quiz', icon: Brain, label: 'quiz' },
  { id: 'technology', href: '/technology', icon: Cpu, label: 'technology' },
  { id: 'english', href: '/english', icon: Languages, label: 'english' },
  { id: 'french', href: '/french', icon: Globe, label: 'french' },
  { id: 'contact', href: '/contact', icon: MessageCircle, label: 'contact' },
];

export default function PageCards() {
  const t = useTranslations('home');
  const locale = useLocale();
  const nav = navTexts[locale as NavLocale] || navTexts.ar;

  return (
    <section className="py-16 px-4" aria-labelledby="page-cards-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="page-cards-heading" className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: '#0b5d4b' }}>
          {t('pages_heading')}
        </h2>
        <p className="text-center mb-10 max-w-xl mx-auto" style={{ color: 'var(--qt-muted)' }}>{t('pages_subtitle')}</p>

        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {PAGES.map(({ id, href, icon: Icon, label }) => (
            <li key={id}>
              <Link href={`/${locale}${href}`} className="card-premium h-full p-5 flex flex-col gap-3 text-start">
                <span className="qt-keep self-start">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#0b5d4b', color: '#f3eddc', boxShadow: 'inset 0 0 0 2px rgba(201,162,74,0.55)' }}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                </span>
                <h3 className="text-lg font-bold" style={{ color: 'var(--qt-ink)', fontFamily: 'var(--qt-font-display)' }}>{nav[label]}</h3>
                <p className="text-sm flex-1" style={{ color: 'var(--qt-muted)' }}>{t(`pages_desc_${id}`)}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: '#1f7a55' }}>
                  {t('pages_open')} <ArrowRight size={15} className="rtl:rotate-180" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
