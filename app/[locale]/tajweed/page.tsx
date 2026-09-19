'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';
import AudioClip from '@/components/AudioClip';

const rules = [
  {
    id: 1,
    icon: '🟡',
    color: '#eab308',
    nameAr: 'الإظهار',
    nameFr: 'Al-Idhar',
    nameEn: 'Al-Idhar (Clarity)',
    descAr: 'إظهار النون الساكنة أو التنوين بشكل واضح عند حروف الحلق الستة بدون غنة',
    descFr: 'Prononcer clairement le "n" quiescent ou le tanwin devant les 6 lettres gutturales',
    descEn: 'Clearly pronouncing the noon saakin or tanween before 6 throat letters',
    lettersAr: 'ء - ه - ع - ح - غ - خ',
    example: 'أَنْعَمْتَ',
    exampleTranslation: 'الفاتحة 1:7 — النون مظهرة قبل العين',
    duration: 'بدون غنة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/001007.mp3',
    audioSurah: 'الفاتحة — آية 7',
    startTime: 0,
  },
  {
    id: 2,
    icon: '🟢',
    color: '#22c55e',
    nameAr: 'الإدغام بغنة',
    nameFr: 'Al-Idgham avec ghunna',
    nameEn: 'Al-Idgham with Ghunnah',
    descAr: 'إدغام النون الساكنة أو التنوين في حروف (ي ن م و) مع بقاء الغنة',
    descFr: 'Fusionner le "n" avec les lettres (ي ن م و) avec maintien du ghunna',
    descEn: 'Merging the noon saakin or tanween into (ي ن م و) while maintaining ghunnah',
    lettersAr: 'ي - ن - م - و',
    example: 'مِنْ يَعْمَلْ',
    exampleTranslation: 'النساء 4:123 — النون مدغمة في الياء',
    duration: '2 حركة مع غنة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/004123.mp3',
    audioSurah: 'النساء — آية 123',
    startTime: 0,
  },
  {
    id: 3,
    icon: '🟢',
    color: '#16a34a',
    nameAr: 'الإدغام بدون غنة',
    nameFr: 'Al-Idgham sans ghunna',
    nameEn: 'Al-Idgham without Ghunnah',
    descAr: 'إدغام النون الساكنة أو التنوين في حرفي (ل ر) بدون غنة',
    descFr: 'Fusionner le "n" dans les lettres (ل ر) sans ghunna',
    descEn: 'Merging the noon saakin or tanween into (ل ر) without ghunnah',
    lettersAr: 'ل - ر',
    example: 'مِنْ رَبِّهِمْ',
    exampleTranslation: 'البقرة 2:5 — النون مدغمة في الراء',
    duration: 'بدون غنة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/002005.mp3',
    audioSurah: 'البقرة — آية 5',
    startTime: 0,
  },
  {
    id: 4,
    icon: '🔵',
    color: '#3b82f6',
    nameAr: 'الإقلاب',
    nameFr: 'Al-Iqlab',
    nameEn: 'Al-Iqlab (Conversion)',
    descAr: 'قلب النون الساكنة أو التنوين ميماً مخفاة عند حرف الباء',
    descFr: 'Convertir le "n" en "m" devant la lettre "b"',
    descEn: 'Converting the noon saakin or tanween into a meem before "b"',
    lettersAr: 'ب',
    example: 'مِنْ بَعْدِ',
    exampleTranslation: 'البقرة 2:27 — النون مقلوبة ميماً قبل الباء',
    duration: '2 حركة مع غنة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/002027.mp3',
    audioSurah: 'البقرة — آية 27',
    startTime: 0,
  },
  {
    id: 5,
    icon: '🔴',
    color: '#ef4444',
    nameAr: 'الإخفاء',
    nameFr: 'Al-Ikhfa',
    nameEn: 'Al-Ikhfa (Concealment)',
    descAr: 'إخفاء النون الساكنة أو التنوين عند حروف الإخفاء الخمسة عشر مع بقاء الغنة',
    descFr: 'Cacher le "n" devant les 15 lettres d\'ikhfa avec maintien du ghunna',
    descEn: 'Concealing the noon saakin or tanween before 15 letters while maintaining ghunnah',
    lettersAr: 'ت - ث - ج - د - ذ - ز - س - ش - ص - ض - ط - ظ - ف - ق - ك',
    example: 'أَنْتُمْ',
    exampleTranslation: 'النون مخفاة قبل التاء',
    duration: '2 حركة مع غنة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/105004.mp3',
    audioSurah: 'الفيل — آية 4',
    startTime: 0,
  },
  {
    id: 6,
    icon: '🟠',
    color: '#f97316',
    nameAr: 'الغنة',
    nameFr: 'Al-Ghunna',
    nameEn: 'Al-Ghunna (Nasalization)',
    descAr: 'صوت أنفي يخرج من الخيشوم يصاحب النون والميم المشددتين',
    descFr: 'Son nasal qui accompagne le noon et le mim avec chaddah',
    descEn: 'Nasal sound accompanying the noon and meem with shaddah',
    lettersAr: 'ن مشددة - م مشددة',
    example: 'إِنَّ',
    exampleTranslation: 'العصر — الغنة في إِنَّ',
    duration: '2 حركة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/002011.mp3',
    audioSurah: 'البقرة — آية 11',
    startTime: 0,
  },
  {
    id: 7,
    icon: '⚫',
    color: '#374151',
    nameAr: 'القلقلة',
    nameFr: 'Al-Qalqala',
    nameEn: 'Al-Qalqala',
    descAr: 'اضطراب المخرج عند النطق بحروف (ق ط ب ج د) ساكنة حتى يسمع لها نبرة قوية',
    descFr: 'Vibration lors de la prononciation des lettres (ق ط ب ج د) quiescentes',
    descEn: 'Echo sound when pronouncing (ق ط ب ج د) in sukoon',
    lettersAr: 'ق - ط - ب - ج - د',
    example: 'الْفَلَقِ',
    exampleTranslation: 'الفلق 113:1 — القلقلة الكبرى في القاف عند الوقف',
    duration: 'حركة واحدة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/113001.mp3',
    audioSurah: 'الفلق — آية 1',
    startTime: 0,
  },
  {
    id: 8,
    icon: '🟣',
    color: '#a855f7',
    nameAr: 'المد الطبيعي',
    nameFr: 'Al-Mad At-Tabii',
    nameEn: 'Natural Madd',
    descAr: 'مد حروف العلة (ا - و - ي) مدة حركتين طبيعيتين',
    descFr: 'Prolonger les voyelles longues pendant deux temps naturels',
    descEn: 'Extending the long vowels for two natural counts',
    lettersAr: 'ا - و - ي',
    example: 'قَالُوا',
    exampleTranslation: 'البقرة 2:11 — المد في الواو',
    duration: '2 حركة',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/002011.mp3',
    audioSurah: 'البقرة — آية 11',
    startTime: 0,
  },
  {
    id: 9,
    icon: '🔷',
    color: '#0ea5e9',
    nameAr: 'التفخيم والترقيق',
    nameFr: 'At-Tafkhim et At-Tarqiq',
    nameEn: 'Tafkhim and Tarqiq',
    descAr: 'التفخيم هو تغليظ الصوت في حروف (خ ص ض ط ظ غ ق)، والترقيق في باقي الحروف',
    descFr: 'Tafkhim est l\'épaississement du son, tarqiq est l\'amincissement du son',
    descEn: 'Tafkhim is the heaviness of sound, tarqiq is the lightness of sound',
    lettersAr: 'خ - ص - ض - ط - ظ - غ - ق',
    example: 'بِسْمِ اللَّهِ',
    exampleTranslation: 'البسملة — الراء مرققة بعد الكسر',
    duration: 'حسب الحرف',
    audioUrl: 'https://mirrors.quranicaudio.com/everyayah/Husary_64kbps/001001.mp3',
    audioSurah: 'الفاتحة — آية 1',
    startTime: 0,
  },
];

export default function TajweedPage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const [selectedRule, setSelectedRule] = useState<number | null>(null);

  const texts = {
    ar: {
      title: 'دروس التجويد',
      subtitle: 'تعلم أحكام التجويد بطريقة سهلة وممتعة',
      letters: 'الحروف',
      example: 'مثال',
      duration: 'المدة',
      clickToLearn: 'انقر لتعلم القاعدة',
      rules: 'القواعد',
      back: 'رجوع للقائمة',
    },
    fr: {
      title: 'Cours de Tajwid',
      subtitle: 'Apprendre les règles du tajwid de façon simple et amusante',
      letters: 'Lettres',
      example: 'Exemple',
      duration: 'Durée',
      clickToLearn: 'Cliquez pour apprendre la règle',
      rules: 'Règles',
      back: 'Retour à la liste',
    },
    en: {
      title: 'Tajweed Lessons',
      subtitle: 'Learn Tajweed rules in a simple and fun way',
      letters: 'Letters',
      example: 'Example',
      duration: 'Duration',
      clickToLearn: 'Click to learn the rule',
      rules: 'Rules',
      back: 'Back to list',
    },
  };

  const t = texts[locale] || texts.ar;
  const selected = rules.find(r => r.id === selectedRule);

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-3">📖</div>
          <h1 className="text-3xl font-bold" style={{color: '#0e6b55'}}>{t.title}</h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </div>

        {!selected ? (
          // قائمة القواعد
          <div className="grid md:grid-cols-2 gap-4">
            {rules.map(rule => (
              <div
                key={rule.id}
                onClick={() => setSelectedRule(rule.id)}
                className="bg-white rounded-3xl p-6 cursor-pointer transition hover:scale-105 shadow-md"
                style={{border: `3px solid ${rule.color}`}}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{rule.icon}</span>
                  <div>
                    <h2 className="font-bold text-lg" style={{color: rule.color}}>
                      {locale === 'ar' ? rule.nameAr : locale === 'fr' ? rule.nameFr : rule.nameEn}
                    </h2>
                    <span className="text-xs text-gray-400">{t.clickToLearn}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 line-clamp-2">
                  {locale === 'ar' ? rule.descAr : locale === 'fr' ? rule.descFr : rule.descEn}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full text-white font-bold" style={{background: rule.color}}>
                    {rule.example}
                  </span>
                  <span className="text-xs text-gray-400">{rule.duration}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // تفاصيل القاعدة
          <div>
            <button
              onClick={() => setSelectedRule(null)}
              className="mb-6 px-4 py-2 rounded-2xl font-bold transition hover:opacity-90"
              style={{background: '#e8f8f5', color: '#0e6b55', border: '2px solid #079992'}}
            >
              ← {t.back}
            </button>

            <div className="bg-white rounded-3xl shadow-xl p-8" style={{border: `4px solid ${selected.color}`}}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{selected.icon}</div>
                <h2 className="text-3xl font-bold mb-2" style={{color: selected.color}}>
                  {locale === 'ar' ? selected.nameAr : locale === 'fr' ? selected.nameFr : selected.nameEn}
                </h2>
                <p className="text-gray-500 max-w-lg mx-auto">
                  {locale === 'ar' ? selected.descAr : locale === 'fr' ? selected.descFr : selected.descEn}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* الحروف */}
                <div className="rounded-2xl p-5 text-center" style={{background: `${selected.color}15`, border: `2px solid ${selected.color}`}}>
                  <div className="font-bold mb-2" style={{color: selected.color}}>📝 {t.letters}</div>
                  <div className="text-2xl font-bold" style={{color: '#0e6b55', lineHeight: '2'}}>
                    {selected.lettersAr}
                  </div>
                </div>

                {/* المثال */}
                <div className="rounded-2xl p-5 text-center" style={{background: '#fffbeb', border: '2px solid #fbbf24'}}>
                  <div className="font-bold mb-2" style={{color: '#d97706'}}>💡 {t.example}</div>
                  <div className="text-4xl font-bold mb-2" style={{color: '#0e6b55'}}>
                    {selected.example}
                  </div>
                  <div className="text-sm text-gray-400">{selected.exampleTranslation}</div>
                </div>

                {/* المدة */}
                <div className="rounded-2xl p-5 text-center" style={{background: '#e8f8f5', border: '2px solid #079992'}}>
                  <div className="font-bold mb-2" style={{color: '#0e6b55'}}>⏱️ {t.duration}</div>
                  <div className="text-xl font-bold" style={{color: '#079992'}}>
                    {selected.duration}
                  </div>
                </div>
              </div>

            {/* مشغل الصوت */}
<div className="mt-6">
  <h3 className="font-bold mb-3 text-center" style={{color: selected.color}}>
    🎧 {locale === 'ar' ? 'استمع للمثال' : locale === 'fr' ? 'Écouter l\'exemple' : 'Listen to Example'}
  </h3>
  <div className="rounded-2xl p-4 text-center" style={{background: `${selected.color}10`, border: `2px solid ${selected.color}`}}>
    <p className="text-sm text-gray-500 mb-3">
      {locale === 'ar' ? `من سورة ${selected.audioSurah} — برواية ورش` :
       locale === 'fr' ? `De la sourate ${selected.audioSurah} — Warsh` :
       `From Surah ${selected.audioSurah} — Warsh`}
    </p>
<AudioClip
  url={selected.audioUrl}
  color={selected.color}
  startTime={0}
  duration={20}
/>
  </div>
</div>
            </div>

            {/* التنقل بين القواعد */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedRule(prev => prev && prev > 1 ? prev - 1 : prev)}
                disabled={selectedRule === 1}
                className="px-6 py-3 rounded-2xl font-bold transition hover:opacity-90 disabled:opacity-30"
                style={{background: '#0e6b55', color: 'white'}}
              >
                ← {locale === 'ar' ? 'السابق' : locale === 'fr' ? 'Précédent' : 'Previous'}
              </button>
              <span className="flex items-center font-bold" style={{color: '#0e6b55'}}>
                {selectedRule} / {rules.length}
              </span>
              <button
                onClick={() => setSelectedRule(prev => prev && prev < rules.length ? prev + 1 : prev)}
                disabled={selectedRule === rules.length}
                className="px-6 py-3 rounded-2xl font-bold transition hover:opacity-90 disabled:opacity-30"
                style={{background: '#0e6b55', color: 'white'}}
              >
                {locale === 'ar' ? 'التالي' : locale === 'fr' ? 'Suivant' : 'Next'} →
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}