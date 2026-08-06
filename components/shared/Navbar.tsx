'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginForm from '@/components/shared/LoginForm';

const navLinks = [
  { href: '/', labelAr: 'الرئيسية', labelEn: 'Home', labelFr: 'Accueil' },
  { href: '/program', labelAr: 'البرنامج', labelEn: 'Program', labelFr: 'Programme' },
  { href: '/english', labelAr: 'تعلم الإنجليزية', labelEn: 'Learn English', labelFr: 'Anglais' },
  { href: '/quiz', labelAr: 'الاختبار الثقافي', labelEn: 'Cultural Quiz', labelFr: 'Quiz Culturel' },
  { href: '/dashboard', labelAr: 'التقدم', labelEn: 'Progress', labelFr: 'Progrès' },
  { href: '/contact', labelAr: 'التواصل', labelEn: 'Contact', labelFr: 'Contact' },
];

const languages = [
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
const [user, setUser] = useState<{email: string | null} | null>(null);
const [showLogin, setShowLogin] = useState(false);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser({ email: currentUser.email });
    } else {
      setUser(null);
    }
  });
  return () => unsubscribe();
}, []);

const handleSignOut = async () => {
  await signOut(auth);
  router.push(`/${locale}`);
};
  const getLabel = (link: typeof navLinks[0]) => {
    if (locale === 'en') return link.labelEn;
    if (locale === 'fr') return link.labelFr;
    return link.labelAr;
  };

  const changeLanguage = (newLocale: string) => {
    // استبدال اللغة الحالية في الرابط بالجديدة
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const getLocalizedHref = (href: string) => {
    return `/${locale}${href === '/' ? '' : href}`;
  };

  return (
    <nav style={{background: '#006a67'}} className="text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* الشعار */}
        <Link href={getLocalizedHref('/')} className="flex items-center gap-2">
          <span className="text-2xl">🕌</span>
          <span className="font-bold text-lg" style={{color: '#fbbf24'}}>
            {locale === 'ar' ? 'القرآن والتكنولوجيا' :
             locale === 'fr' ? 'Coran & Technologie' :
             'Quran & Technology'}
          </span>
        </Link>

        {/* روابط الجهاز المكتبي */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={getLocalizedHref(link.href)}
              className="transition text-sm font-medium hover:opacity-75"
              style={{color: 'white'}}
            >
              {getLabel(link)}
            </Link>
          ))}
        </div>

        {/* اختيار اللغة */}
        
        <div className="hidden md:flex items-center gap-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="text-xs px-3 py-1 rounded-full transition font-bold"
              style={locale === lang.code
                ? {background: '#fbbf24', color: '#006a67'}
                : {color: 'white', border: '1px solid rgba(255,255,255,0.3)'}
              }
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* زر المستخدم */}
        {user ? (
          <div className="hidden md:flex items-center gap-2 mr-2">
            <span className="text-xs opacity-70 flex items-center gap-1">
              <User size={14} />
              {user.email?.split('@')[0]}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold transition"
              style={{background: '#fee2e2', color: '#dc2626'}}
            >
              <LogOut size={14} />
              {locale === 'ar' ? 'خروج' : locale === 'fr' ? 'Déconnexion' : 'Logout'}
            </button>
          </div>
        ) : (
  <button
    onClick={() => setShowLogin(true)}
    className="hidden md:flex text-xs px-3 py-1 rounded-full font-bold transition"
    style={{background: '#fbbf24', color: '#006a67'}}
  >
    {locale === 'ar' ? 'دخول' : locale === 'fr' ? 'Connexion' : 'Login'}
  </button>
)}
        {/* زر القائمة للجوال */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
      </div>

      {/* قائمة الجوال */}
      {isOpen && (
        <div style={{background: '#005450'}} className="md:hidden px-4 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={getLocalizedHref(link.href)}
              className="transition font-medium hover:opacity-75"
              style={{color: 'white'}}
              onClick={() => setIsOpen(false)}
            >
              {getLabel(link)}
            </Link>
          ))}
          <div className="flex gap-2 mt-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="text-xs px-3 py-1 rounded-full transition font-bold"
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
      )}
      {/* نافذة Login */}
{showLogin && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{background: 'rgba(0,0,0,0.5)'}}
    onClick={() => setShowLogin(false)}
  >
    <div
      className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4"
      style={{border: '3px solid #00cec9'}}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{color: '#006a67'}}>
          {locale === 'ar' ? '🔑 تسجيل الدخول' : locale === 'fr' ? '🔑 Connexion' : '🔑 Login'}
        </h2>
        <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
      </div>

      <LoginForm locale={locale} onSuccess={() => setShowLogin(false)} />
    </div>
  </div>
)}
    </nav>
  );
}