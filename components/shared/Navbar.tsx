'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, ChevronDown, Globe, BookOpen, Languages, BookMarked, Cpu, Brain, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from './Logo';
import { navTexts, brandName, languages, type NavLocale } from './nav-config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [user, setUser] = useState<{email: string | null} | null>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? { email: currentUser.email } : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close open menus on outside click / Escape (presentation-only behaviour)
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowLearn(false);
        setShowLanguages(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLearn(false);
        setShowLanguages(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push(`/${locale}`);
  };
  void user;
  void handleSignOut;

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setShowLanguages(false);
  };

  const getLocalizedHref = (href: string) => {
    return `/${locale}${href === '/' ? '' : href}`;
  };

  const isActive = (href: string) => {
    const full = getLocalizedHref(href);
    return href === '/' ? pathname === full || pathname === `${full}/` : pathname.startsWith(full);
  };

  const t = navTexts[locale as NavLocale] || navTexts.ar;
  const brand = brandName[locale as NavLocale] || brandName.ar;

  const learnItems = [
    { href: '/english', label: t.english, Icon: Languages },
    { href: '/french', label: t.french, Icon: Languages },
    { href: '/tajweed', label: t.tajweed, Icon: BookMarked },
    { href: '/technology', label: t.technology, Icon: Cpu },
    { href: '/islam', label: t.islam, Icon: BookOpen },
  ];
  const learnActive = learnItems.some(i => isActive(i.href));

  const linkBase = 'relative px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap';
  const linkClass = (active: boolean) =>
    `${linkBase} ${active ? 'text-[#e6d3a0] bg-white/10' : 'text-white/85 hover:text-white hover:bg-white/10'}`;

  return (
    <nav className="qt-keep sticky top-0 z-50 text-white border-b border-[#c9a24a]/25 backdrop-blur"
      style={{ background: 'rgba(7, 63, 51, 0.97)' }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4" ref={menuRef}>

        {/* Brand */}
        <Link href={getLocalizedHref('/')} className="flex items-center gap-2.5 shrink-0" onClick={() => setIsOpen(false)}>
          <Logo />
          <span className="font-bold text-[0.95rem] md:text-base tracking-tight" style={{ color: '#e6d3a0' }}>
            {brand}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          <Link href={getLocalizedHref('/')} className={linkClass(isActive('/'))}>{t.home}</Link>
          <Link href={getLocalizedHref('/program')} className={linkClass(isActive('/program'))}>{t.program}</Link>

          <div className="relative">
            <button
              onClick={() => { setShowLearn(!showLearn); setShowLanguages(false); }}
              aria-expanded={showLearn}
              aria-haspopup="menu"
              className={`${linkClass(learnActive)} cursor-pointer`}
            >
              {t.learn} <ChevronDown size={14} className={`transition-transform ${showLearn ? 'rotate-180' : ''}`} />
            </button>
            {showLearn && (
              <div role="menu" className="absolute top-full mt-2 start-0 min-w-52 rounded-xl overflow-hidden z-50 py-1.5 border border-[#c9a24a]/30 shadow-2xl"
                style={{ background: '#073f33' }}>
                {learnItems.map(({ href, label, Icon }) => (
                  <Link key={href} href={getLocalizedHref(href)} role="menuitem"
                    onClick={() => setShowLearn(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 ${isActive(href) ? 'text-[#e6d3a0]' : 'text-white/90'}`}>
                    <Icon size={16} className="text-[#c9a24a]" /> {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={getLocalizedHref('/quiz')} className={linkClass(isActive('/quiz'))}>{t.quiz}</Link>
          <Link href={getLocalizedHref('/mushaf')} className={linkClass(isActive('/mushaf'))}>{t.mushaf}</Link>
          <Link href={getLocalizedHref('/contact')} className={linkClass(isActive('/contact'))}>{t.contact}</Link>
        </div>

        {/* Desktop tools */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Light mode' : 'Dark mode'}
            className="p-2 rounded-lg text-white/85 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <div className="relative">
            <button
              onClick={() => { setShowLanguages(!showLanguages); setShowLearn(false); }}
              aria-expanded={showLanguages}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white/90 border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Globe size={14} /> {locale.toUpperCase()} <ChevronDown size={12} />
            </button>
            {showLanguages && (
              <div className="absolute top-full mt-2 end-0 min-w-36 rounded-xl overflow-hidden z-50 py-1.5 border border-[#c9a24a]/30 shadow-2xl"
                style={{ background: '#073f33' }}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full px-4 py-2.5 text-sm hover:bg-white/10 transition-colors font-semibold text-start cursor-pointer"
                    style={locale === lang.code ? { color: '#e6d3a0' } : { color: 'white' }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 -me-2 rounded-lg hover:bg-white/10 cursor-pointer" onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu" aria-expanded={isOpen}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/10 px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto" style={{ background: '#073f33' }}>
          <div className="flex flex-col gap-1">
            {[
              { href: '/', label: t.home, Icon: BookOpen },
              { href: '/program', label: t.program, Icon: ScrollText },
              ...learnItems,
              { href: '/quiz', label: t.quiz, Icon: Brain },
              { href: '/mushaf', label: t.mushaf, Icon: BookOpen },
              { href: '/contact', label: t.contact, Icon: Globe },
            ].map(({ href, label, Icon }) => (
              <Link key={href} href={getLocalizedHref(href)} onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-colors ${isActive(href) ? 'bg-white/10 text-[#e6d3a0]' : 'text-white/90 hover:bg-white/10'}`}>
                <Icon size={18} className="text-[#c9a24a] shrink-0" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-white/15 mt-3 pt-3 flex items-center justify-between gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-lg hover:bg-white/10 cursor-pointer" aria-label="Theme">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="flex gap-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { changeLanguage(lang.code); setIsOpen(false); }}
                  className="text-xs px-3.5 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
                  style={locale === lang.code
                    ? { background: '#c9a24a', color: '#073f33' }
                    : { color: 'white', border: '1px solid rgba(255,255,255,0.3)' }
                  }
                >
                  {lang.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
