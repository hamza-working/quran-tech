'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';

interface Word {
  id: number;
  position: number;
  text_uthmani: string;
  char_type_name: string;
  translation: { text: string };
  transliteration: { text: string };
}

interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  page_number: number;
  juz_number?: number;
  words: Word[];
}

const tajweedColors: Record<string, string> = {
  'ٱللَّهِ': '#1abc9c',
  'ٱللَّهُ': '#1abc9c',
  'ٱللَّهَ': '#1abc9c',
  'بِسْمِ': '#f59e0b',
  'ٱلرَّحْمَـٰنِ': '#8b5cf6',
  'ٱلرَّحِيمِ': '#8b5cf6',
};

const getWordColor = (text: string): string => {
  return tajweedColors[text] || '#1a1a2e';
};

export default function MushafPage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const [currentPage, setCurrentPage] = useState(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [totalPages] = useState(604);

  const texts = {
    ar: {
      title: 'المصحف الشريف',
      subtitle: 'القرآن الكريم برواية ورش',
      page: 'صفحة',
      of: 'من',
      prev: 'السابق',
      next: 'التالي',
      loading: 'جاري تحميل الصفحة...',
      meaning: 'المعنى',
      transliteration: 'النطق',
      close: 'إغلاق',
      goToPage: 'انتقل إلى صفحة',
    },
    fr: {
      title: 'Le Saint Coran',
      subtitle: 'Coran en récitation Warsh',
      page: 'Page',
      of: 'sur',
      prev: 'Précédent',
      next: 'Suivant',
      loading: 'Chargement de la page...',
      meaning: 'Signification',
      transliteration: 'Translittération',
      close: 'Fermer',
      goToPage: 'Aller à la page',
    },
    en: {
      title: 'The Holy Quran',
      subtitle: 'Quran in Warsh recitation',
      page: 'Page',
      of: 'of',
      prev: 'Previous',
      next: 'Next',
      loading: 'Loading page...',
      meaning: 'Meaning',
      transliteration: 'Transliteration',
      close: 'Close',
      goToPage: 'Go to page',
    },
  };

  const t = texts[locale] || texts.ar;

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setSelectedWord(null);
      try {
        const res = await fetch(
          `https://api.quran.com/api/v4/verses/by_page/${currentPage}?language=ar&words=true&word_fields=text_uthmani,translation_text&per_page=50`
        );
        const data = await res.json();
        setVerses(data.verses || []);
      } catch {
        setVerses([]);
      }
      setLoading(false);
    };
    fetchPage();
  }, [currentPage]);

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val >= 1 && val <= 604) setCurrentPage(val);
  };

  return (
    <main className="min-h-screen" style={{background: '#fdf8f0'}}>
      <Navbar />

      {/* رأس الصفحة */}
      <div className="text-center py-6" style={{background: 'linear-gradient(135deg, #148f77, #1abc9c)', color: 'white'}}>
        <div className="text-4xl mb-2">📖</div>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-sm opacity-80 mt-1">{t.subtitle}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* شريط التنقل */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-2xl p-4 shadow-md" style={{border: '2px solid #1abc9c'}}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
            style={{background: '#1abc9c'}}
          >
            ← {t.prev}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold" style={{color: '#148f77'}}>
              {t.page}
            </span>
            <input
              type="number"
              min={1}
              max={604}
              value={currentPage}
              onChange={handlePageInput}
              className="w-16 text-center rounded-xl p-2 font-bold outline-none"
              style={{border: '2px solid #1abc9c', color: '#148f77'}}
            />
            <span className="text-sm font-bold" style={{color: '#148f77'}}>
              {t.of} {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(604, p + 1))}
            disabled={currentPage === 604}
            className="px-4 py-2 rounded-xl font-bold text-white transition disabled:opacity-30"
            style={{background: '#1abc9c'}}
          >
            {t.next} →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* صفحة المصحف */}
          <div className="md:col-span-2">
            <div
              className="rounded-3xl p-6 shadow-xl min-h-96"
              style={{
                background: '#fffff8',
                border: '4px solid #d4af37',
                fontFamily: '"Scheherazade New", "Traditional Arabic", serif',
                direction: 'rtl',
              }}
            >
              {/* إطار زخرفي */}
              <div className="text-center mb-4 pb-3" style={{borderBottom: '2px solid #d4af37'}}>
                <span className="text-sm font-bold" style={{color: '#d4af37'}}>
                  ﷽
                </span>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="text-4xl mb-4">📖</div>
                  <p style={{color: '#148f77'}}>{t.loading}</p>
                </div>
              ) : (
                <div className="text-center leading-loose">
                  {verses.map((verse) => (
                    <span key={verse.id}>
                      {verse.words.map((word) => (
                        word.char_type_name === 'end' ? (
                          <span
                            key={word.id}
                            className="mx-1 text-lg"
                            style={{color: '#d4af37'}}
                          >
                            {word.text_uthmani}
                          </span>
                        ) : (
                          <span
                            key={word.id}
                            onClick={() => setSelectedWord(word)}
                            className="mx-1 cursor-pointer hover:opacity-70 transition text-2xl"
                            style={{
                              color: getWordColor(word.text_uthmani),
                              textShadow: selectedWord?.id === word.id ? '0 0 8px #1abc9c' : 'none',
                              fontWeight: selectedWord?.id === word.id ? 'bold' : 'normal',
                            }}
                          >
                            {word.text_uthmani}
                          </span>
                        )
                      ))}
                      {' '}
                    </span>
                  ))}
                </div>
              )}

              {/* رقم الصفحة */}
              <div className="text-center mt-4 pt-3" style={{borderTop: '2px solid #d4af37'}}>
                <span className="text-sm" style={{color: '#d4af37'}}>— {currentPage} —</span>
              </div>
            </div>
          </div>

          {/* التفسير */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-md p-5 sticky top-4" style={{border: '2px solid #1abc9c'}}>
              <h2 className="font-bold text-lg mb-4 text-center" style={{color: '#148f77'}}>
                {selectedWord ? '💡 ' + t.meaning : '👆 انقر على كلمة'}
              </h2>

              {selectedWord ? (
                <div>
                  {/* الكلمة */}
                  <div
                    className="text-center p-4 rounded-2xl mb-4"
                    style={{background: '#e8f8f5'}}
                  >
                    <div
                      className="text-4xl mb-2"
                      style={{
                        fontFamily: '"Scheherazade New", serif',
                        color: '#148f77',
                        direction: 'rtl'
                      }}
                    >
                      {selectedWord.text_uthmani}
                    </div>
                  </div>

                  {/* المعنى */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl" style={{background: '#f0fdf9'}}>
                      <div className="text-xs font-bold mb-1" style={{color: '#1abc9c'}}>
                        🌍 {t.meaning}
                      </div>
                      <div className="font-bold" style={{color: '#148f77'}}>
                        {selectedWord.translation?.text || '—'}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl" style={{background: '#fffbeb'}}>
                      <div className="text-xs font-bold mb-1" style={{color: '#d97706'}}>
                        🔤 {t.transliteration}
                      </div>
                      <div className="font-bold" style={{color: '#92400e', direction: 'ltr'}}>
                        {selectedWord.transliteration?.text || '—'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedWord(null)}
                    className="w-full mt-4 py-2 rounded-2xl text-sm font-bold transition hover:opacity-80"
                    style={{background: '#e8f8f5', color: '#148f77'}}
                  >
                    ✕ {t.close}
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <div className="text-5xl mb-3">☝️</div>
                  <p className="text-sm">
                    {locale === 'ar' ? 'انقر على أي كلمة لمعرفة معناها' :
                     locale === 'fr' ? 'Cliquez sur un mot pour voir sa signification' :
                     'Click on any word to see its meaning'}
                  </p>
                </div>
              )}
            </div>

            {/* معلومات الصفحة */}
            {verses.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md p-4 mt-4" style={{border: '2px solid #d4af37'}}>
                <h3 className="font-bold text-sm mb-3" style={{color: '#d4af37'}}>📌 معلومات الصفحة</h3>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>
                    <span className="font-bold" style={{color: '#148f77'}}>السورة: </span>
                    {verses[0]?.verse_key?.split(':')[0] === '1' ? 'الفاتحة' : `سورة ${verses[0]?.verse_key?.split(':')[0]}`}
                  </div>
                  <div>
                    <span className="font-bold" style={{color: '#148f77'}}>عدد الآيات: </span>
                    {verses.length}
                  </div>
                  <div>
                    <span className="font-bold" style={{color: '#148f77'}}>الجزء: </span>
                    {verses[0]?.juz_number || '—'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}