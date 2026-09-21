'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Navbar from '@/components/shared/Navbar';
import { surahPages, getPageUrl } from '@/lib/quranPages';

export default function MushafPage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [imgError, setImgError] = useState(false);

  const surah = surahPages[selectedSurah];
  const imageUrl = getPageUrl(surah.slug, currentPage);

  const texts = {
    ar: {
      title: 'المصحف الشريف',
      subtitle: 'مصحف التجويد الملون',
      selectSurah: 'اختر السورة',
      page: 'صفحة',
      of: 'من',
      prev: 'السابق',
      next: 'التالي',
      colorKey: 'مفتاح الألوان',
    },
    fr: {
      title: 'Le Saint Coran',
      subtitle: 'Mushaf Tajweed en couleur',
      selectSurah: 'Choisir une sourate',
      page: 'Page',
      of: 'sur',
      prev: 'Précédent',
      next: 'Suivant',
      colorKey: 'Légende des couleurs',
    },
    en: {
      title: 'The Holy Quran',
      subtitle: 'Color Coded Tajweed Mushaf',
      selectSurah: 'Select Surah',
      page: 'Page',
      of: 'of',
      prev: 'Previous',
      next: 'Next',
      colorKey: 'Color Key',
    },
  };

  const t = texts[locale] || texts.ar;

  const handleSurahChange = (surahNum: number) => {
    setSelectedSurah(surahNum);
    setCurrentPage(1);
    setImgError(false);
  };

  const handleNext = () => {
    if (currentPage < surah.pages) {
      setCurrentPage(p => p + 1);
      setImgError(false);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
      setImgError(false);
    }
  };

  return (
    <main className="min-h-screen" style={{background: '#f5f0e8'}}>
      <Navbar />

      {/* رأس الصفحة */}
      <div className="text-center py-4" style={{background: 'linear-gradient(135deg, #2d5a27, #4a7c3f)', color: 'white'}}>
        <h1 className="text-2xl font-bold">📖 {t.title}</h1>
        <p className="text-sm opacity-80">{t.subtitle}</p>
      </div>

      <div className="max-w-5xl mx-auto px-3 py-4">

        {/* اختيار السورة */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-md" style={{border: '2px solid #2d5a27'}}>
          <label className="block text-sm font-bold mb-2" style={{color: '#2d5a27'}}>
            📚 {t.selectSurah}
          </label>
          <select
            value={selectedSurah}
            onChange={e => handleSurahChange(Number(e.target.value))}
            className="w-full rounded-xl p-3 font-bold outline-none text-right"
            style={{border: '2px solid #2d5a27', color: '#2d5a27', background: '#f9fff9'}}
          >
            {Object.entries(surahPages).map(([num, s]) => (
              <option key={num} value={num}>
                {num}. {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* صورة الصفحة */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-4" style={{border: '4px solid #d4af37'}}>
          {imgError ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📖</div>
              <p style={{color: '#2d5a27'}}>
                {locale === 'ar' ? 'الصفحة غير متوفرة حالياً' : locale === 'fr' ? 'Page non disponible' : 'Page not available'}
              </p>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={`${surah.name} - ${t.page} ${currentPage}`}
              className="w-full h-auto"
              onError={() => setImgError(true)}
              style={{display: 'block'}}
            />
          )}
        </div>

        {/* أزرار التنقل */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md mb-4" style={{border: '2px solid #2d5a27'}}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
            style={{background: '#2d5a27'}}
          >
            ← {t.prev}
          </button>

          <div className="text-center">
            <div className="font-bold" style={{color: '#2d5a27'}}>
              {surah.name}
            </div>
            <div className="text-sm" style={{color: '#d4af37'}}>
              {t.page} {currentPage} {t.of} {surah.pages}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === surah.pages}
            className="px-5 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
            style={{background: '#2d5a27'}}
          >
            {t.next} →
          </button>
        </div>

        {/* مفتاح الألوان */}
        <div className="bg-white rounded-2xl p-4 shadow-md" style={{border: '2px solid #d4af37'}}>
          <h3 className="font-bold text-sm mb-3 text-center" style={{color: '#d4af37'}}>
            🎨 {t.colorKey}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { color: '#cc0000', label: locale === 'ar' ? 'مد 2 أو 4 أو 6 حركات' : 'Madd 2, 4 or 6 harakats' },
              { color: '#008800', label: locale === 'ar' ? 'غنة وإخفاء' : 'Ghunna & Ikhfa' },
              { color: '#006600', label: locale === 'ar' ? 'لفظ الجلالة' : 'Lafzul Jalala' },
              { color: '#0000cc', label: locale === 'ar' ? 'قلقلة' : 'Qalqala' },
              { color: '#ff6600', label: locale === 'ar' ? 'مد واجب 4 أو 5 حركات' : 'Madd Wajib 4-5' },
              { color: '#000000', label: locale === 'ar' ? 'نص عادي' : 'Normal text' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full shrink-0" style={{background: item.color}} />
                <span className="text-xs" style={{color: '#444'}}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}