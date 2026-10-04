'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const languages = [
  { code: 'ar', label: 'ع' },
  { code: 'fr', label: 'Fr' },
  { code: 'en', label: 'En' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [user, setUser] = useState<{email: string | null} | null>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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

  const handleSignOut = async () => {
    await signOut(auth);
    router.push(`/${locale}`);
  };

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setShowLanguages(false);
  };

  const getLocalizedHref = (href: string) => {
    return `/${locale}${href === '/' ? '' : href}`;
  };
  
  const handleProtectedLink = (href: string) => {
    router.push(getLocalizedHref(href));
  };

  const navTexts = {
    ar: { home: 'الرئيسية', program: 'البرنامج', learn: 'التعلم', english: 'الإنجليزية', french: 'الفرنسية', tajweed: 'التجويد', quiz: 'الاختبار', dashboard: 'تقدمي', contact: 'تواصل', mushaf: 'المصحف'  },
    fr: { home: 'Accueil', program: 'Programme', learn: 'Apprendre', english: 'Anglais', french: 'Français', tajweed: 'Tajwid', quiz: 'Quiz', dashboard: 'Progrès', contact: 'Contact',  mushaf: 'Mushaf'  },
    en: { home: 'Home', program: 'Program', learn: 'Learn', english: 'English', french: 'French', tajweed: 'Tajweed', quiz: 'Quiz', dashboard: 'Progress', contact: 'Contact', mushaf: 'Mushaf' },
  };

  const t = navTexts[locale as keyof typeof navTexts] || navTexts.ar;

  return (
    <>
      <nav style={{background: '#0e6b55'}} className="text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* الشعار */}
          <Link href={getLocalizedHref('/')} className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🕌</span>
            <span className="font-bold text-sm md:text-base" style={{color: '#fbbf24'}}>
              {locale === 'ar' ? 'القرآن والتكنولوجيا' : locale === 'fr' ? 'Coran & Tech' : 'Quran & Tech'}
            </span>
          </Link>

          {/* روابط المكتب */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">

            {/* الرئيسية */}
            <Link href={getLocalizedHref('/')}
              className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition">
              {t.home}
            </Link>

            {/* البرنامج */}
            <button onClick={() => handleProtectedLink('/program')}
              className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition">
              {t.program}
            </button>

            {/* قائمة التعلم */}
            <div className="relative">
              <button
                onClick={() => setShowLearn(!showLearn)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition"
              >
                📚 {t.learn} <ChevronDown size={14} />
              </button>
              {showLearn && (
                <div
                  className="absolute top-full mt-1 rounded-2xl shadow-xl overflow-hidden z-50 min-w-40"
                  style={{background: '#0e6b55'}}
                  onMouseLeave={() => setShowLearn(false)}
                >
                  <button onClick={() => { handleProtectedLink('/english'); setShowLearn(false); }}
                    className="w-full text-right px-4 py-3 text-sm hover:bg-white/10 transition flex items-center gap-2">
                    🇬🇧 {t.english}
                  </button>
                  <button onClick={() => { handleProtectedLink('/french'); setShowLearn(false); }}
                    className="w-full text-right px-4 py-3 text-sm hover:bg-white/10 transition flex items-center gap-2">
                    🇫🇷 {t.french}
                  </button>
                  <button onClick={() => { handleProtectedLink('/tajweed'); setShowLearn(false); }}
                    className="w-full text-right px-4 py-3 text-sm hover:bg-white/10 transition flex items-center gap-2">
                    📖 {t.tajweed}
                  </button>
                  
                  <button onClick={() => { handleProtectedLink('/technology'); setShowLearn(false); }}
  className="w-full text-right px-4 py-3 text-sm hover:bg-white/10 transition flex items-center gap-2">
  💻 {locale === 'ar' ? 'التكنولوجيا' : locale === 'fr' ? 'Technologie' : 'Technology'}
</button>
                </div>
              )}
            </div>

            {/* الاختبار */}
            <button onClick={() => handleProtectedLink('/quiz')}
              className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition">
              🧠 {t.quiz}
            </button>

            {/* المصحف */}
            <button onClick={() => { handleProtectedLink('/mushaf'); setIsOpen(false); }}
            className="text-right px-3 py-2 rounded-xl hover:bg-white/10 transition font-medium">
            📖 {locale === 'ar' ? 'المصحف' : locale === 'fr' ? 'Mushaf' : 'Mushaf'}
            </button>

            {/* تواصل */}
            <Link href={getLocalizedHref('/contact')}
              className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition">
              {t.contact}
            </Link>

          </div>

          {/* الجانب الأيمن */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl hover:bg-white/10 transition"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* اللغة */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold hover:bg-white/10 transition"
              >
                🌐 {locale.toUpperCase()} <ChevronDown size={12} />
              </button>
              {showLanguages && (
                <div
                  className="absolute top-full mt-1 rounded-2xl shadow-xl overflow-hidden z-50"
                  style={{background: '#0e6b55'}}
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full px-4 py-2 text-sm hover:bg-white/10 transition font-bold"
                      style={locale === lang.code ? {color: '#fbbf24'} : {color: 'white'}}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>


          </div>

          {/* زر الجوال */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* قائمة الجوال */}
{isOpen && (
  <div style={{background: '#0e6b55'}} className="lg:hidden px-4 py-4 flex flex-col gap-1">
    <Link href={getLocalizedHref('/')} onClick={() => setIsOpen(false)}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full block"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      {t.home}
    </Link>
    <button onClick={() => { handleProtectedLink('/program'); setIsOpen(false); }}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      {t.program}
    </button>
    <button onClick={() => { handleProtectedLink('/english'); setIsOpen(false); }}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      <span>{t.english}</span> <span>🇬🇧</span>
    </button>
    <button onClick={() => { handleProtectedLink('/french'); setIsOpen(false); }}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      <span>{t.french}</span> <span>🇫🇷</span>
    </button> 
    <button onClick={() => { handleProtectedLink('/tajweed'); setIsOpen(false); }}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      <span>{t.tajweed}</span> <span>📖</span>
    </button>
    <button onClick={() => { handleProtectedLink('/technology'); setIsOpen(false); }}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      <span>{locale === 'ar' ? 'التكنولوجيا' : locale === 'fr' ? 'Technologie' : 'Technology'}</span>
      <span>💻</span>
    </button>
    <button onClick={() => { handleProtectedLink('/quiz'); setIsOpen(false); }}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      <span>{t.quiz}</span> <span>🧠</span>
    </button>
    <button onClick={() => { handleProtectedLink('/mushaf'); setIsOpen(false); }}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      <span>{locale === 'ar' ? 'المصحف' : 'Mushaf'}</span>
    </button>
    <Link href={getLocalizedHref('/contact')} onClick={() => setIsOpen(false)}
      className="py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium w-full block"
      style={{textAlign: locale === 'ar' ? 'right' : 'left',flexDirection: locale === 'ar' ? 'row-reverse' : 'row'}}>
      {t.contact}
    </Link>

    <div className="border-t border-white/20 mt-2 pt-3 flex items-center justify-between">
      <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl hover:bg-white/10">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <div className="flex gap-2">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="text-xs px-3 py-1 rounded-full font-bold transition"
            style={locale === lang.code
              ? {background: '#fbbf24', color: '#006a67'}
              : {color: 'white', border: '1px solid rgba(255,255,255,0.3)'}
            }
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>


  </div>
)}
      </nav>


    </>
  );
}