'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Logo from './Logo';
import { navTexts, brandName, type NavLocale } from './nav-config';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('home');
  const nav = navTexts[locale as NavLocale] || navTexts.ar;
  const brand = brandName[locale as NavLocale] || brandName.ar;
  const href = (p: string) => `/${locale}${p === '/' ? '' : p}`;

  const links = [
    { p: '/', l: nav.home },
    { p: '/program', l: nav.program },
    { p: '/mushaf', l: nav.mushaf },
    { p: '/tajweed', l: nav.tajweed },
    { p: '/islam', l: nav.islam },
    { p: '/quiz', l: nav.quiz },
    { p: '/contact', l: nav.contact },
  ];

  return (
    <footer className="qt-keep islamic-pattern text-white mt-0">
      <div className="max-w-6xl mx-auto px-5 py-12 flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-3">
          <Logo size={34} />
          <span className="text-xl font-bold" style={{ color: '#e6d3a0', fontFamily: 'var(--qt-font-display)' }}>{brand}</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map(({ p, l }) => (
            <Link key={p} href={href(p)} className="text-sm font-medium text-white/80 hover:text-[#e6d3a0] transition-colors">
              {l}
            </Link>
          ))}
        </nav>

        <div className="divider-ornament w-full max-w-xs" aria-hidden="true"><span>✦</span></div>

        <p className="text-sm text-white/65">
          {t('footer_rights', { author: t('footer_author'), title: t('title') })}
        </p>
      </div>
    </footer>
  );
}
