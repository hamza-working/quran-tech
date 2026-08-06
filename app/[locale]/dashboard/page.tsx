'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';
import BadgeSystem from '@/components/dashboard/BadgeSystem';

export default function DashboardPage() {
  const locale = useLocale();
  const [memorizedSurahs, setMemorizedSurahs] = useState(5);

  const texts = {
    ar: {
      title: 'لوحة التقدم',
      subtitle: 'تابع تقدمك في الحفظ والتكنولوجيا',
      quranProgress: 'تقدم الحفظ',
      techProgress: 'تقدم التكنولوجيا',
      addSurah: 'أضف سورة محفوظة',
      level: 'المستوى الحالي',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      scratchTitle: 'مشاريع Scratch',
      scratchDesc: 'أكملت 2 مشروع',
      robotTitle: 'الروبوتيكس',
      robotDesc: 'درس واحد مكتمل',
      aiTitle: 'الذكاء الاصطناعي',
      aiDesc: 'قريباً',
    },
    fr: {
      title: 'Tableau de bord',
      subtitle: 'Suivez votre progression en mémorisation et technologie',
      quranProgress: 'Progression Coran',
      techProgress: 'Progression Technologie',
      addSurah: 'Ajouter une sourate mémorisée',
      level: 'Niveau actuel',
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
      scratchTitle: 'Projets Scratch',
      scratchDesc: '2 projets complétés',
      robotTitle: 'Robotique',
      robotDesc: '1 leçon complétée',
      aiTitle: 'Intelligence Artificielle',
      aiDesc: 'Bientôt',
    },
    en: {
      title: 'Progress Dashboard',
      subtitle: 'Track your Quran and technology progress',
      quranProgress: 'Quran Progress',
      techProgress: 'Tech Progress',
      addSurah: 'Add memorized surah',
      level: 'Current Level',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      scratchTitle: 'Scratch Projects',
      scratchDesc: '2 projects completed',
      robotTitle: 'Robotics',
      robotDesc: '1 lesson completed',
      aiTitle: 'Artificial Intelligence',
      aiDesc: 'Coming soon',
    },
  };

  const t = texts[locale as keyof typeof texts] || texts.ar;

  const getLevel = () => {
    if (memorizedSurahs < 10) return t.beginner;
    if (memorizedSurahs < 37) return t.intermediate;
    return t.advanced;
  };

  const techCards = [
    { icon: '🐱', title: t.scratchTitle, desc: t.scratchDesc, color: '#00cec9', progress: 40 },
    { icon: '🤖', title: t.robotTitle, desc: t.robotDesc, color: '#fbbf24', progress: 20 },
    { icon: '🧠', title: t.aiTitle, desc: t.aiDesc, color: '#f59e0b', progress: 0 },
  ];

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold" style={{color: '#006a67'}}>{t.title}</h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* تقدم الحفظ */}
          <div className="bg-white rounded-3xl p-6 shadow-lg" style={{border: '3px solid #00cec9'}}>
            <h2 className="text-xl font-bold mb-4" style={{color: '#006a67'}}>📖 {t.quranProgress}</h2>
            <div className="text-center mb-4">
              <span className="text-5xl font-bold" style={{color: '#00cec9'}}>{memorizedSurahs}</span>
              <span className="text-gray-400"> / 114</span>
            </div>
            <div className="w-full rounded-full h-3 mb-4" style={{background: '#e6fffe'}}>
              <div className="h-3 rounded-full transition-all" style={{width: `${(memorizedSurahs/114)*100}%`, background: 'linear-gradient(to right, #00cec9, #006a67)'}} />
            </div>
            <div className="text-center mb-4">
              <span className="text-sm font-bold px-3 py-1 rounded-full" style={{background: '#e6fffe', color: '#006a67'}}>
                {t.level}: {getLevel()}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMemorizedSurahs(prev => Math.min(114, prev + 1))}
                className="flex-1 py-2 rounded-2xl font-bold text-white transition hover:opacity-90"
                style={{background: '#00cec9'}}
              >
                + {t.addSurah}
              </button>
              <button
                onClick={() => setMemorizedSurahs(prev => Math.max(0, prev - 1))}
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
        <div className="bg-white rounded-3xl shadow-lg" style={{border: '3px solid #00cec9'}}>
          <BadgeSystem memorizedSurahs={memorizedSurahs} locale={locale as 'ar' | 'fr' | 'en'} />
        </div>

      </div>
    </main>
  );
}