'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getChildProfile, ChildProfile } from '@/lib/firestore';

export default function ProfilePage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const texts = {
    ar: {
      title: 'ملفي الشخصي', name: 'الاسم', email: 'البريد الإلكتروني',
      level: 'المستوى', memorized: 'السور المحفوظة', quizzes: 'الاختبارات المكتملة',
      english: 'تقدم الإنجليزية', french: 'تقدم الفرنسية',
      joined: 'تاريخ الانضمام', loading: 'جاري التحميل...',
      level1: 'مبتدئ 🌱', level2: 'متوسط ⭐', level3: 'متقدم 👑',
      editProfile: 'تعديل الملف', goToDashboard: 'لوحة التقدم',
    },
    fr: {
      title: 'Mon Profil', name: 'Nom', email: 'Email',
      level: 'Niveau', memorized: 'Sourates mémorisées', quizzes: 'Quiz complétés',
      english: 'Progression anglais', french: 'Progression français',
      joined: 'Date d\'inscription', loading: 'Chargement...',
      level1: 'Débutant 🌱', level2: 'Intermédiaire ⭐', level3: 'Avancé 👑',
      editProfile: 'Modifier le profil', goToDashboard: 'Tableau de bord',
    },
    en: {
      title: 'My Profile', name: 'Name', email: 'Email',
      level: 'Level', memorized: 'Memorized Surahs', quizzes: 'Completed Quizzes',
      english: 'English Progress', french: 'French Progress',
      joined: 'Joined Date', loading: 'Loading...',
      level1: 'Beginner 🌱', level2: 'Intermediate ⭐', level3: 'Advanced 👑',
      editProfile: 'Edit Profile', goToDashboard: 'Dashboard',
    },
  };

  const t = texts[locale] || texts.ar;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.push(`/${locale}`); return; }
      const data = await getChildProfile(user.uid);
      setProfile(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [locale, router]);

  const getLevelText = () => {
    if (!profile) return t.level1;
    if (profile.level === 1) return t.level1;
    if (profile.level === 2) return t.level2;
    return t.level3;
  };

  const getLevelColor = () => {
    if (!profile) return '#079992';
    if (profile.level === 1) return '#079992';
    if (profile.level === 2) return '#fbbf24';
    return '#f59e0b';
  };

  if (loading) {
    return (
      <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl font-bold" style={{color: '#0e6b55'}}>{t.loading}</div>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  const stats = [
    { icon: '📖', label: t.memorized, value: `${profile.memorizedSurahs} / 114`, color: '#079992' },
    { icon: '🧠', label: t.quizzes, value: profile.completedQuizzes, color: '#fbbf24' },
    { icon: '🇬🇧', label: t.english, value: `${profile.englishProgress}%`, color: '#06b6d4' },
    { icon: '🇫🇷', label: t.french, value: `${profile.frenchProgress}%`, color: '#8b5cf6' },
  ];

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* رأس الملف الشخصي */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 text-center" style={{border: '3px solid #079992'}}>
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-4"
            style={{background: 'linear-gradient(135deg, #079992, #0e6b55)'}}
          >
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{color: '#0e6b55'}}>{profile.name}</h1>
          <p className="text-gray-400 mb-4">{profile.email}</p>
          <span
            className="px-4 py-2 rounded-full font-bold text-white text-sm"
            style={{background: getLevelColor()}}
          >
            {getLevelText()}
          </span>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 shadow-md text-center" style={{border: `3px solid ${stat.color}`}}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{color: stat.color}}>{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* شريط التقدم العام */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6" style={{border: '3px solid #079992'}}>
          <h2 className="font-bold text-lg mb-4" style={{color: '#0e6b55'}}>📊 {t.memorized}</h2>
          <div className="w-full rounded-full h-4 mb-2" style={{background: '#e8f8f5'}}>
            <div
              className="h-4 rounded-full transition-all"
              style={{
                width: `${(profile.memorizedSurahs / 114) * 100}%`,
                background: 'linear-gradient(to right, #079992, #0e6b55)'
              }}
            />
          </div>
          <div className="text-center text-sm text-gray-400">
            {profile.memorizedSurahs} / 114 ({Math.round((profile.memorizedSurahs / 114) * 100)}%)
          </div>
        </div>

        {/* أزرار */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push(`/${locale}/dashboard`)}
            className="py-4 rounded-2xl font-bold text-white transition hover:opacity-90"
            style={{background: 'linear-gradient(135deg, #079992, #0e6b55)'}}
          >
            🏆 {t.goToDashboard}
          </button>
          <button
            className="py-4 rounded-2xl font-bold transition hover:opacity-90"
            style={{background: '#e8f8f5', color: '#0e6b55', border: '2px solid #079992'}}
          >
            ✏️ {t.editProfile}
          </button>
        </div>

      </div>
    </main>
  );
}