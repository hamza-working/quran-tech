'use client';

import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';

export default function ProgramPage() {
  const t = useTranslations('program');
  const locale = useLocale();

  const levels = [
    {
      level: 1,
      age: '6-8',
      icon: '🌱',
      color: '#079992',
      quran: {
        ar: ['حفظ قصار السور', 'سورة الفاتحة والإخلاص والفلق والناس', 'أحكام النون الساكنة'],
        fr: ['Mémorisation des courtes sourates', 'Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas', 'Règles de la noon saakin'],
        en: ['Short surahs memorization', 'Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas', 'Noon saakin rules'],
      },
      tech: {
        ar: ['مقدمة البرمجة بالألوان والأشكال', 'لعبة Scratch إسلامية بسيطة', 'مفهوم التسلسل والخطوات'],
        fr: ['Introduction à la programmation par couleurs', 'Jeu Scratch islamique simple', 'Concept de séquence'],
        en: ['Intro to programming with colors', 'Simple Islamic Scratch game', 'Sequence concept'],
      },
    },
    {
      level: 2,
      age: '8-10',
      icon: '⭐',
      color: '#fbbf24',
      quran: {
        ar: ['حفظ جزء عم كاملاً', 'أحكام التجويد الأساسية', 'مسابقات الحفظ بين الأطفال'],
        fr: ['Mémorisation du Juz Amma complet', 'Règles de tajwid de base', 'Concours de mémorisation'],
        en: ['Full Juz Amma memorization', 'Basic tajweed rules', 'Memorization competitions'],
      },
      tech: {
        ar: ['برمجة Scratch متقدمة', 'مقدمة micro:bit والروبوتيكس', 'مشروع روبوت بسيط'],
        fr: ['Scratch avancé', 'Introduction micro:bit et robotique', 'Projet robot simple'],
        en: ['Advanced Scratch', 'micro:bit and robotics intro', 'Simple robot project'],
      },
    },
    {
      level: 3,
      age: '10-12',
      icon: '👑',
      color: '#f59e0b',
      quran: {
        ar: ['حفظ جزء تبارك', 'قواعد التجويد الكاملة', 'تسجيل وتحليل التلاوة بالذكاء الاصطناعي'],
        fr: ['Mémorisation du Juz Tabarak', 'Règles complètes du tajwid', 'Enregistrement et analyse par IA'],
        en: ['Juz Tabarak memorization', 'Complete tajweed rules', 'AI-powered recitation analysis'],
      },
      tech: {
        ar: ['بناء تطبيق بسيط', 'روبوت ذكي للتجويد', 'مقدمة الذكاء الاصطناعي للأطفال'],
        fr: ['Construire une application simple', 'Robot intelligent pour le tajwid', 'Introduction à l\'IA pour enfants'],
        en: ['Build a simple app', 'Smart tajweed robot', 'AI intro for children'],
      },
    },
  ];

  const getLang = (obj: {ar: string[], fr: string[], en: string[]}) => {
    if (locale === 'fr') return obj.fr;
    if (locale === 'en') return obj.en;
    return obj.ar;
  };

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold" style={{color: '#0e6b55'}}>{t('title')}</h1>
          <p className="text-gray-400 mt-3 text-lg">{t('subtitle')}</p>
        </div>

        <div className="space-y-8">
          {levels.map((lvl) => (
            <div key={lvl.level} className="bg-white rounded-3xl shadow-lg overflow-hidden" style={{border: `3px solid ${lvl.color}`}}>

              {/* رأس المستوى */}
              <div className="p-6 flex items-center gap-4 text-white" style={{background: lvl.color}}>
                <span className="text-5xl">{lvl.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">
                    {locale === 'ar' ? `المستوى ${lvl.level}` : locale === 'fr' ? `Niveau ${lvl.level}` : `Level ${lvl.level}`}
                  </h2>
                  <p className="opacity-80">{lvl.age} {locale === 'ar' ? 'سنوات' : locale === 'fr' ? 'ans' : 'years'}</p>
                </div>
              </div>

              {/* المحتوى */}
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="rounded-2xl p-5" style={{background: '#e8f8f5'}}>
                  <h3 className="text-lg font-bold mb-3" style={{color: '#0e6b55'}}>📖 {t('quran')}</h3>
                  <ul className="space-y-2">
                    {getLang(lvl.quran).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span style={{color: '#079992'}}>✅</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl p-5" style={{background: '#fffbeb'}}>
                  <h3 className="text-lg font-bold mb-3" style={{color: '#d97706'}}>💻 {t('tech')}</h3>
                  <ul className="space-y-2">
                    {getLang(lvl.tech).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span style={{color: '#fbbf24'}}>✅</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* قسم تعلم البرمجة للأطفال */}
        <div className="mt-12 bg-white rounded-3xl p-8" style={{border: '3px solid #079992'}}>
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🎮</div>
            <h2 className="text-3xl font-bold" style={{color: '#0e6b55'}}>
              {locale === 'ar' ? 'تعلم البرمجة بالألعاب' : locale === 'fr' ? 'Apprendre à coder en jouant' : 'Learn Coding by Playing'}
            </h2>
            <p className="text-gray-400 mt-2">
              {locale === 'ar' ? 'اختر مستواك وابدأ التعلم' : locale === 'fr' ? 'Choisissez votre niveau et commencez' : 'Choose your level and start learning'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🐢',
                titleAr: 'المبتدئ', titleFr: 'Débutant', titleEn: 'Beginner',
                descAr: 'تعلم البرمجة بالتسلسل والألوان', descFr: 'Apprendre avec des séquences et couleurs', descEn: 'Learn with sequences and colors',
                color: '#079992',
                href: 'https://scratch.mit.edu/projects/editor/',
              },
              {
                icon: '🦊',
                titleAr: 'المتوسط', titleFr: 'Intermédiaire', titleEn: 'Intermediate',
                descAr: 'الحلقات والشروط والمتغيرات', descFr: 'Boucles, conditions et variables', descEn: 'Loops, conditions and variables',
                color: '#fbbf24',
                href: 'https://scratch.mit.edu/projects/editor/',
              },
              {
                icon: '🦅',
                titleAr: 'المتقدم', titleFr: 'Avancé', titleEn: 'Advanced',
                descAr: 'مشاريع كاملة وألعاب إسلامية', descFr: 'Projets complets et jeux islamiques', descEn: 'Full projects and Islamic games',
                color: '#f59e0b',
                href: 'https://scratch.mit.edu/projects/editor/',
              },
            ].map((card, i) => (
              <a
                key={i}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl p-6 text-center block transition hover:scale-105"
                style={{background: `${card.color}15`, border: `2px solid ${card.color}`}}
              >
                <div className="text-5xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{color: card.color}}>
                  {locale === 'ar' ? card.titleAr : locale === 'fr' ? card.titleFr : card.titleEn}
                </h3>
                <p className="text-gray-500 text-sm">
                  {locale === 'ar' ? card.descAr : locale === 'fr' ? card.descFr : card.descEn}
                </p>
                <div className="mt-4 font-bold text-sm py-2 px-4 rounded-full text-white inline-block" style={{background: card.color}}>
                  {locale === 'ar' ? 'ابدأ الآن' : locale === 'fr' ? 'Commencer' : 'Start Now'}
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}