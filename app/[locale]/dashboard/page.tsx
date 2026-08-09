'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import BadgeSystem from '@/components/dashboard/BadgeSystem';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getChildProfile, updateMemorizedSurahs, ChildProfile } from '@/lib/firestore';

export default function DashboardPage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const texts = {
    ar: {
      title: 'لوحة التقدم', subtitle: 'تابع تقدمك في الحفظ والتكنولوجيا',
      hello: 'مرحباً', quranProgress: 'تقدم الحفظ',
      techProgress: 'تقدم التكنولوجيا', addSurah: '+ سورة محفوظة',
      level: 'المستوى', beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم',
      scratchTitle: 'Scratch', scratchDesc: 'البرمجة بالبلوكات',
      englishTitle: 'الإنجليزية', englishDesc: 'تقدم اللغة',
      quizTitle: 'الاختبار الثقافي', quizDesc: 'اختبارات مكتملة',
      loading: 'جاري التحميل...', notFound: 'لم يتم العثور على ملفك',
    },
    fr: {
      title: 'Tableau de bord', subtitle: 'Suivez votre progression',
      hello: 'Bonjour', quranProgress: 'Progression Coran',
      techProgress: 'Progression Technologie', addSurah: '+ Sourate mémorisée',
      level: 'Niveau', beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé',
      scratchTitle: 'Scratch', scratchDesc: 'Programmation',
      englishTitle: 'Anglais', englishDesc: 'Progression langue',
      quizTitle: 'Quiz Culturel', quizDesc: 'Quiz complétés',
      loading: 'Chargement...', notFound: 'Profil introuvable',
    },
    en: {
      title: 'Progress Dashboard', subtitle: 'Track your progress',
      hello: 'Hello', quranProgress: 'Quran Progress',
      techProgress: 'Tech Progress', addSurah: '+ Memorized Surah',
      level: 'Level', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
      scratchTitle: 'Scratch', scratchDesc: 'Block programming',
      englishTitle: 'English', englishDesc: 'Language progress',
      quizTitle: 'Cultural Quiz', quizDesc: 'Completed quizzes',
      loading: 'Loading...', notFound: 'Profile not found',
    },
  };

  const t = texts[locale] || texts.ar;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push(`/${locale}`);
        return;
      }
      const data = await getChildProfile(user.uid);
      setProfile(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [locale, router]);

  const handleAddSurah = async () => {
    if (!profile || !auth.currentUser) return;
    const newCount = Math.min(114, profile.memorizedSurahs + 1);
    setSaving(true);
    await updateMemorizedSurahs(auth.currentUser.uid, newCount);
    setProfile({ ...profile, memorizedSurahs: newCount });
    setSaving(false);
  };

  const handleRemoveSurah = async () => {
    if (!profile || !auth.currentUser) return;
    const newCount = Math.max(0, profile.memorizedSurahs - 1);
    setSaving(true);
    await updateMemorizedSurahs(auth.currentUser.uid, newCount);
    setProfile({ ...profile, memorizedSurahs: newCount });
    setSaving(false);
  };

  const getLevel = () => {
    if (!profile) return t.beginner;
    if (profile.memorizedSurahs < 10) return t.beginner;
    if (profile.memorizedSurahs < 37) return t.intermediate;
    return t.advanced;
  };

  if (loading) {
    return (
      <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl font-bold" style={{color: '#006a67'}}>{t.loading}</div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-2xl font-bold" style={{color: '#dc2626'}}>{t.notFound}</div>
        </div>
      </main>
    );
  }

  const techCards = [
    { icon: '🐱', title: t.scratchTitle, desc: t.scratchDesc, color: '#079992', progress: 40 },
    { icon: '🇬🇧', title: t.englishTitle, desc: t.englishDesc, color: '#fbbf24', progress: profile.englishProgress },
    { icon: '🧠', title: t.quizTitle, desc: `${profile.completedQuizzes} ${t.quizDesc}`, color: '#f59e0b', progress: Math.min(100, profile.completedQuizzes * 10) },
  ];

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* ترحيب */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold" style={{color: '#006a67'}}>
            {t.hello} {profile.name}! 👋
          </h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* تقدم الحفظ */}
          <div className="bg-white rounded-3xl p-6 shadow-lg" style={{border: '3px solid #079992'}}>
            <h2 className="text-xl font-bold mb-4" style={{color: '#006a67'}}>📖 {t.quranProgress}</h2>
            <div className="text-center mb-4">
              <span className="text-5xl font-bold" style={{color: '#079992'}}>{profile.memorizedSurahs}</span>
              <span className="text-gray-400"> / 114</span>
            </div>
            <div className="w-full rounded-full h-3 mb-4" style={{background: '#e6fffe'}}>
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${(profile.memorizedSurahs / 114) * 100}%`,
                  background: 'linear-gradient(to right, #079992, #006a67)'
                }}
              />
            </div>
            <div className="text-center mb-4">
              <span className="text-sm font-bold px-3 py-1 rounded-full" style={{background: '#e6fffe', color: '#006a67'}}>
                {t.level}: {getLevel()}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddSurah}
                disabled={saving}
                className="flex-1 py-2 rounded-2xl font-bold text-white transition hover:opacity-90"
                style={{background: saving ? '#b2f0ee' : '#079992'}}
              >
                {saving ? '⏳' : t.addSurah}
              </button>
              <button
                onClick={handleRemoveSurah}
                disabled={saving}
                className="px-4 py-2 rounded-2xl font-bold transition hover:opacity-90"
                style={{background: '#fee2e2', color: '#dc2626'}}
              >
                -
              </button>
            </div>
          </div>

          {/* تقدم التكنولوجيا */}
          <div className="bg-white rounded-3xl p-6 shadow-lg" style={{border: '3px solid #fbbf24'}}>
            <h2 className="text-xl font-bold mb-4" style={{color: '#d97706'}}>💻 {t.techProgress}</h2>
            <div className="space-y-4">
              {techCards.map((card, i) => (
                <div key={i} className="rounded-2xl p-3" style={{background: `${card.color}15`}}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{card.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm" style={{color: card.color}}>{card.title}</div>
                      <div className="text-xs text-gray-400">{card.desc}</div>
                    </div>
                    <span className="text-sm font-bold" style={{color: card.color}}>{card.progress}%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{background: '#f0f0f0'}}>
                    <div className="h-2 rounded-full transition-all" style={{width: `${card.progress}%`, background: card.color}} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* نظام الشارات */}
        <div className="bg-white rounded-3xl shadow-lg" style={{border: '3px solid #079992'}}>
          <BadgeSystem memorizedSurahs={profile.memorizedSurahs} locale={locale} />
        </div>

      </div>
    </main>
  );
}