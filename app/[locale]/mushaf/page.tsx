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
  const [mushafType, setMushafType] = useState<'hafs' | 'warsh'>('hafs');
  const [warshPage, setWarshPage] = useState(1);
  const [warshImgError, setWarshImgError] = useState(false);
  
  const surah = surahPages[selectedSurah];
  const imageUrl = getPageUrl(surah.slug, currentPage, surah.pages);

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

const getWarshPageUrl = (page: number): string => {
  const pageNum = String(page - 1).padStart(4, '0');
  return `https://ia601600.us.archive.org/BookReader/BookReaderImages.php?zip=/23/items/20231115_20231115_2341/%D9%85%D8%B5%D8%AD%D9%81-%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D9%85%D9%84%D9%88%D9%86-%D8%A8%D8%B1%D9%88%D8%A7%D9%8A%D8%A9-%D9%88%D8%B1%D8%B4-%D8%B9%D9%86-%D9%86%D8%A7%D9%81%D8%B9_jp2.zip&file=%D9%85%D8%B5%D8%AD%D9%81-%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D9%85%D9%84%D9%88%D9%86-%D8%A8%D8%B1%D9%88%D8%A7%D9%8A%D8%A9-%D9%88%D8%B1%D8%B4-%D8%B9%D9%86-%D9%86%D8%A7%D9%81%D8%B9_jp2/%D9%85%D8%B5%D8%AD%D9%81-%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D9%85%D9%84%D9%88%D9%86-%D8%A8%D8%B1%D9%88%D8%A7%D9%8A%D8%A9-%D9%88%D8%B1%D8%B4-%D8%B9%D9%86-%D9%86%D8%A7%D9%81%D8%B9_${pageNum}.jp2&id=20231115_20231115_2341&scale=2&rotate=0`;
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
{/* تبديل بين حفص وورش */}
<div className="flex rounded-2xl overflow-hidden shadow-md mb-4" style={{border: '2px solid #2d5a27'}}>
  <button
    onClick={() => setMushafType('hafs')}
    className="flex-1 py-3 font-bold transition"
    style={mushafType === 'hafs'
      ? {background: '#2d5a27', color: 'white'}
      : {background: 'white', color: '#2d5a27'}
    }
  >
    📖 {locale === 'ar' ? 'رواية حفص' : locale === 'fr' ? 'Riwayah Hafs' : 'Hafs'}
  </button>
  <button
    onClick={() => setMushafType('warsh')}
    className="flex-1 py-3 font-bold transition"
    style={mushafType === 'warsh'
      ? {background: '#2d5a27', color: 'white'}
      : {background: 'white', color: '#2d5a27'}
    }
  >
    📗 {locale === 'ar' ? 'رواية ورش' : locale === 'fr' ? 'Riwayah Warsh' : 'Warsh'}
  </button>
</div>
        {/* اختيار السورة */}
{mushafType === 'hafs' ? (
  <>
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
            {locale === 'ar' ? 'الصفحة غير متوفرة' : 'Page not available'}
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
      <button onClick={handlePrev} disabled={currentPage === 1}
        className="px-5 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
        style={{background: '#2d5a27'}}>
        ← {t.prev}
      </button>
      <div className="text-center">
        <div className="font-bold" style={{color: '#2d5a27'}}>{surah.name}</div>
        <div className="text-sm" style={{color: '#d4af37'}}>{t.page} {currentPage} {t.of} {surah.pages}</div>
      </div>
      <button onClick={handleNext} disabled={currentPage === surah.pages}
        className="px-5 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
        style={{background: '#2d5a27'}}>
        {t.next} →
      </button>
    </div>
  </>
) : (
  <>
  {/* اختيار السورة في ورش */}
<div className="bg-white rounded-2xl p-4 mb-4 shadow-md" style={{border: '2px solid #2d5a27'}}>
  <label className="block text-sm font-bold mb-2" style={{color: '#2d5a27'}}>
    📚 {t.selectSurah}
  </label>
  <select
    value={selectedSurah}
    onChange={e => {
      const num = Number(e.target.value);
      setSelectedSurah(num);
      setWarshPage(surahPages[num].startPage || 1);
      setWarshImgError(false);
    }}
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
    {/* مصحف ورش */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-4" style={{border: '4px solid #d4af37'}}>
      {warshImgError ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📗</div>
          <p style={{color: '#2d5a27'}}>
            {locale === 'ar' ? 'الصفحة غير متوفرة' : 'Page not available'}
          </p>
        </div>
      ) : (
   <img
        src={getWarshPageUrl(warshPage)}
        alt={`ورش - صفحة ${warshPage}`}
        className="w-full h-auto"
        style={{display: 'block'}}
      />
      )}
    </div>

    {/* أزرار التنقل ورش */}
    <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md mb-4" style={{border: '2px solid #2d5a27'}}>
      <button
        onClick={() => { setWarshPage(p => Math.max(1, p - 1)); setWarshImgError(false); }}
        disabled={warshPage === 1}
        className="px-5 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
        style={{background: '#2d5a27'}}>
        ← {t.prev}
      </button>
      <div className="text-center">
        <div className="font-bold" style={{color: '#2d5a27'}}>
          {locale === 'ar' ? 'مصحف ورش' : locale === 'fr' ? 'Mushaf Warsh' : 'Warsh Mushaf'}
        </div>
        <div className="flex items-center gap-2 justify-center mt-1">
          <input
            type="number"
            min={1}
            max={604}
            value={warshPage}
            onChange={e => {
              const val = parseInt(e.target.value);
              if (val >= 1 && val <= 604) { setWarshPage(val); setWarshImgError(false); }
            }}
            className="w-16 text-center rounded-xl p-1 font-bold outline-none text-sm"
            style={{border: '2px solid #2d5a27', color: '#2d5a27'}}
          />
          <span className="text-sm" style={{color: '#d4af37'}}>/ 604</span>
        </div>
      </div>
      <button
        onClick={() => { setWarshPage(p => Math.min(604, p + 1)); setWarshImgError(false); }}
        disabled={warshPage === 604}
        className="px-5 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
        style={{background: '#2d5a27'}}>
        {t.next} →
      </button>
    </div>
  </>
)}

      </div>
    </main>
  );
}