'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';

const vocabulary = [
  { word: 'Apple', translation: 'تفاحة', emoji: '🍎', category: 'food' },
  { word: 'Book', translation: 'كتاب', emoji: '📚', category: 'school' },
  { word: 'Cat', translation: 'قطة', emoji: '🐱', category: 'animals' },
  { word: 'Dog', translation: 'كلب', emoji: '🐶', category: 'animals' },
  { word: 'Sun', translation: 'شمس', emoji: '☀️', category: 'nature' },
  { word: 'Moon', translation: 'قمر', emoji: '🌙', category: 'nature' },
  { word: 'Water', translation: 'ماء', emoji: '💧', category: 'nature' },
  { word: 'House', translation: 'منزل', emoji: '🏠', category: 'places' },
  { word: 'School', translation: 'مدرسة', emoji: '🏫', category: 'places' },
  { word: 'Pen', translation: 'قلم', emoji: '✏️', category: 'school' },
  { word: 'Banana', translation: 'موزة', emoji: '🍌', category: 'food' },
  { word: 'Fish', translation: 'سمكة', emoji: '🐟', category: 'animals' },
];

const grammar = [
  {
    titleAr: 'الضمائر الشخصية', titleFr: 'Les pronoms personnels', titleEn: 'Personal Pronouns',
    icon: '👤',
    items: [
      { en: 'I', ar: 'أنا', example: 'I am happy' },
      { en: 'You', ar: 'أنت/أنتِ', example: 'You are kind' },
      { en: 'He', ar: 'هو', example: 'He is tall' },
      { en: 'She', ar: 'هي', example: 'She is smart' },
      { en: 'We', ar: 'نحن', example: 'We are friends' },
      { en: 'They', ar: 'هم', example: 'They are happy' },
    ]
  },
  {
    titleAr: 'الألوان', titleFr: 'Les couleurs', titleEn: 'Colors',
    icon: '🎨',
    items: [
      { en: 'Red', ar: 'أحمر', example: 'The apple is red' },
      { en: 'Blue', ar: 'أزرق', example: 'The sky is blue' },
      { en: 'Green', ar: 'أخضر', example: 'The tree is green' },
      { en: 'Yellow', ar: 'أصفر', example: 'The sun is yellow' },
      { en: 'White', ar: 'أبيض', example: 'The snow is white' },
      { en: 'Black', ar: 'أسود', example: 'The night is black' },
    ]
  },
  {
    titleAr: 'الأرقام', titleFr: 'Les chiffres', titleEn: 'Numbers',
    icon: '🔢',
    items: [
      { en: 'One', ar: 'واحد', example: 'I have one cat' },
      { en: 'Two', ar: 'اثنان', example: 'Two books' },
      { en: 'Three', ar: 'ثلاثة', example: 'Three apples' },
      { en: 'Four', ar: 'أربعة', example: 'Four dogs' },
      { en: 'Five', ar: 'خمسة', example: 'Five stars' },
      { en: 'Ten', ar: 'عشرة', example: 'Ten fingers' },
    ]
  },
  {
  titleAr: 'الأرقام من 1 إلى 20', titleFr: 'Les chiffres de 1 à 20', titleEn: 'Numbers 1 to 20',
  icon: '🔢',
  items: [
    { en: 'One - 1', ar: 'واحد', example: 'I have one book' },
    { en: 'Two - 2', ar: 'اثنان', example: 'Two cats' },
    { en: 'Three - 3', ar: 'ثلاثة', example: 'Three apples' },
    { en: 'Four - 4', ar: 'أربعة', example: 'Four dogs' },
    { en: 'Five - 5', ar: 'خمسة', example: 'Five stars' },
    { en: 'Six - 6', ar: 'ستة', example: 'Six flowers' },
    { en: 'Seven - 7', ar: 'سبعة', example: 'Seven days' },
    { en: 'Eight - 8', ar: 'ثمانية', example: 'Eight birds' },
    { en: 'Nine - 9', ar: 'تسعة', example: 'Nine fish' },
    { en: 'Ten - 10', ar: 'عشرة', example: 'Ten fingers' },
    { en: 'Eleven - 11', ar: 'أحد عشر', example: 'Eleven boys' },
    { en: 'Twelve - 12', ar: 'اثنا عشر', example: 'Twelve months' },
    { en: 'Thirteen - 13', ar: 'ثلاثة عشر', example: 'Thirteen girls' },
    { en: 'Fourteen - 14', ar: 'أربعة عشر', example: 'Fourteen days' },
    { en: 'Fifteen - 15', ar: 'خمسة عشر', example: 'Fifteen birds' },
    { en: 'Sixteen - 16', ar: 'ستة عشر', example: 'Sixteen flowers' },
    { en: 'Seventeen - 17', ar: 'سبعة عشر', example: 'Seventeen stars' },
    { en: 'Eighteen - 18', ar: 'ثمانية عشر', example: 'Eighteen apples' },
    { en: 'Nineteen - 19', ar: 'تسعة عشر', example: 'Nineteen dogs' },
    { en: 'Twenty - 20', ar: 'عشرون', example: 'Twenty students' },
  ]
},
{
  titleAr: 'الأرقام الكبيرة', titleFr: 'Les grands nombres', titleEn: 'Large Numbers',
  icon: '💯',
  items: [
    { en: 'Twenty-one - 21', ar: 'واحد وعشرون', example: 'Twenty-one days' },
    { en: 'Twenty-two - 22', ar: 'اثنان وعشرون', example: 'Twenty-two students' },
    { en: 'Twenty-three - 23', ar: 'ثلاثة وعشرون', example: 'Twenty-three birds' },
    { en: 'Twenty-four - 24', ar: 'أربعة وعشرون', example: 'Twenty-four hours' },
    { en: 'Twenty-five - 25', ar: 'خمسة وعشرون', example: 'Twenty-five apples' },
    { en: 'Twenty-six - 26', ar: 'ستة وعشرون', example: 'Twenty-six stars' },
    { en: 'Twenty-seven - 27', ar: 'سبعة وعشرون', example: 'Twenty-seven flowers' },
    { en: 'Twenty-eight - 28', ar: 'ثمانية وعشرون', example: 'Twenty-eight days' },
    { en: 'Twenty-nine - 29', ar: 'تسعة وعشرون', example: 'Twenty-nine books' },
    { en: 'Thirty - 30', ar: 'ثلاثون', example: 'Thirty students' },
    { en: 'Forty - 40', ar: 'أربعون', example: 'Forty cats' },
    { en: 'Fifty - 50', ar: 'خمسون', example: 'Fifty birds' },
    { en: 'Sixty - 60', ar: 'ستون', example: 'Sixty flowers' },
    { en: 'Seventy - 70', ar: 'سبعون', example: 'Seventy days' },
    { en: 'Eighty - 80', ar: 'ثمانون', example: 'Eighty apples' },
    { en: 'Ninety - 90', ar: 'تسعون', example: 'Ninety stars' },
    { en: 'One Hundred - 100', ar: 'مئة', example: 'One hundred students' },
    { en: 'One Hundred and One - 101', ar: 'مئة وواحد', example: 'One hundred and one days' },
    { en: 'One Hundred and Two - 102', ar: 'مئة واثنان', example: 'One hundred and two birds' },
    { en: 'One Hundred and Three - 103', ar: 'مئة وثلاثة', example: 'One hundred and three books' },
    { en: 'One Hundred and Ten - 110', ar: 'مئة وعشرة', example: 'One hundred and ten apples' },
    { en: 'One Hundred and Twenty - 120', ar: 'مئة وعشرون', example: 'One hundred and twenty stars' },
    { en: 'One Hundred and Thirty - 130', ar: 'مئة وثلاثون', example: 'One hundred and thirty cats' },
    { en: 'One Hundred and Forty - 140', ar: 'مئة وأربعون', example: 'One hundred and forty days' },
    { en: 'One Hundred and Fifty - 150', ar: 'مئة وخمسون', example: 'One hundred and fifty students' },
    { en: 'One Hundred and Sixty - 160', ar: 'مئة وستون', example: 'One hundred and sixty flowers' },
    { en: 'One Hundred and Seventy - 170', ar: 'مئة وسبعون', example: 'One hundred and seventy birds' },
    { en: 'One Hundred and Eighty - 180', ar: 'مئة وثمانون', example: 'One hundred and eighty apples' },
    { en: 'One Hundred and Ninety - 190', ar: 'مئة وتسعون', example: 'One hundred and ninety stars' },
    { en: 'Two Hundred - 200', ar: 'مئتان', example: 'Two hundred days' },
    { en: 'Three Hundred - 300', ar: 'ثلاثمئة', example: 'Three hundred books' },
    { en: 'Four Hundred - 400', ar: 'أربعمئة', example: 'Four hundred students' },
    { en: 'Five Hundred - 500', ar: 'خمسمئة', example: 'Five hundred birds' },
    { en: 'Six Hundred - 600', ar: 'ستمئة', example: 'Six hundred flowers' },
    { en: 'Seven Hundred - 700', ar: 'سبعمئة', example: 'Seven hundred apples' },
    { en: 'Eight Hundred - 800', ar: 'ثمانمئة', example: 'Eight hundred cats' },
    { en: 'Nine Hundred - 900', ar: 'تسعمئة', example: 'Nine hundred stars' },
    { en: 'One Thousand - 1000', ar: 'ألف', example: 'One thousand students' },
  ]
},
];

const quizWords = vocabulary.slice(0, 8);

export default function EnglishPage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'quiz'>('vocab');
  const [flipped, setFlipped] = useState<number | null>(null);
  const [vocabFilter, setVocabFilter] = useState('all');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const texts = {
    ar: {
      title: 'تعلم الإنجليزية', subtitle: 'تعلم الإنجليزية بطريقة ممتعة للأطفال',
      vocab: 'المفردات', grammar: 'القواعد', quiz: 'اختبار',
      all: 'الكل', food: 'طعام', animals: 'حيوانات', school: 'مدرسة', nature: 'طبيعة', places: 'أماكن',
      clickToFlip: 'انقر للترجمة',
      next: 'التالي', finish: 'إنهاء', restart: 'إعادة',
      result: 'نتيجتك', correct: 'صحيح! ✅', wrong: 'خطأ! ❌',
      example: 'مثال',
    },
    fr: {
      title: 'Apprendre l\'anglais', subtitle: 'Apprendre l\'anglais de façon amusante',
      vocab: 'Vocabulaire', grammar: 'Grammaire', quiz: 'Quiz',
      all: 'Tout', food: 'Nourriture', animals: 'Animaux', school: 'École', nature: 'Nature', places: 'Lieux',
      clickToFlip: 'Cliquez pour traduire',
      next: 'Suivant', finish: 'Terminer', restart: 'Recommencer',
      result: 'Votre résultat', correct: 'Correct! ✅', wrong: 'Incorrect! ❌',
      example: 'Exemple',
    },
    en: {
      title: 'Learn English', subtitle: 'Learn English in a fun way for kids',
      vocab: 'Vocabulary', grammar: 'Grammar', quiz: 'Quiz',
      all: 'All', food: 'Food', animals: 'Animals', school: 'School', nature: 'Nature', places: 'Places',
      clickToFlip: 'Click to translate',
      next: 'Next', finish: 'Finish', restart: 'Restart',
      result: 'Your Result', correct: 'Correct! ✅', wrong: 'Wrong! ❌',
      example: 'Example',
    },
  };

  const t = texts[locale] || texts.ar;

  const filteredVocab = vocabFilter === 'all' ? vocabulary : vocabulary.filter(v => v.category === vocabFilter);

  // Quiz logic
  const currentQuizWord = quizWords[quizIndex];
  const quizOptions = [
    currentQuizWord.translation,
    ...vocabulary.filter(v => v.word !== currentQuizWord.word).sort(() => Math.random() - 0.5).slice(0, 3).map(v => v.translation)
  ].sort(() => Math.random() - 0.5);

  const handleQuizAnswer = (answer: string) => {
    if (quizAnswered) return;
    setQuizSelected(answer);
    setQuizAnswered(true);
    if (answer === currentQuizWord.translation) setQuizScore(prev => prev + 1);
  };

  const handleQuizNext = () => {
    if (quizIndex + 1 >= quizWords.length) {
      setQuizFinished(true);
    } else {
      setQuizIndex(prev => prev + 1);
      setQuizAnswered(false);
      setQuizSelected(null);
    }
  };

  const handleQuizRestart = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizSelected(null);
    setQuizFinished(false);
  };

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🇬🇧</div>
          <h1 className="text-3xl font-bold" style={{color: '#006a67'}}>{t.title}</h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </div>

        {/* تبديل التبويبات */}
        <div className="flex rounded-2xl overflow-hidden mb-8 shadow-md bg-white">
          {(['vocab', 'grammar', 'quiz'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 font-bold text-sm transition"
              style={activeTab === tab
                ? {background: '#00cec9', color: 'white'}
                : {color: '#006a67'}
              }
            >
              {tab === 'vocab' ? `📖 ${t.vocab}` : tab === 'grammar' ? `📝 ${t.grammar}` : `🎯 ${t.quiz}`}
            </button>
          ))}
        </div>

        {/* المفردات */}
        {activeTab === 'vocab' && (
          <div>
            {/* فلتر التصنيف */}
            <div className="flex gap-2 flex-wrap justify-center mb-6">
              {(['all', 'food', 'animals', 'school', 'nature', 'places'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setVocabFilter(cat)}
                  className="px-3 py-1 rounded-full text-sm font-bold transition"
                  style={vocabFilter === cat
                    ? {background: '#006a67', color: 'white'}
                    : {background: 'white', color: '#006a67', border: '2px solid #00cec9'}
                  }
                >
                  {t[cat as keyof typeof t]}
                </button>
              ))}
            </div>

            {/* بطاقات المفردات */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredVocab.map((word, i) => (
                <div
                  key={i}
                  onClick={() => setFlipped(flipped === i ? null : i)}
                  className="bg-white rounded-3xl p-6 text-center cursor-pointer transition hover:scale-105 shadow-md"
                  style={{border: '3px solid #00cec9', minHeight: '140px'}}
                >
                  <div className="text-5xl mb-3">{word.emoji}</div>
                  {flipped === i ? (
                    <div>
                      <div className="font-bold text-lg" style={{color: '#006a67'}}>{word.translation}</div>
                      <div className="text-sm text-gray-400 mt-1">{word.word}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-bold text-lg" style={{color: '#006a67'}}>{word.word}</div>
                      <div className="text-xs text-gray-400 mt-1">{t.clickToFlip}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* القواعد */}
        {activeTab === 'grammar' && (
          <div className="space-y-6">
            {grammar.map((section, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-md overflow-hidden" style={{border: '3px solid #fbbf24'}}>
                <div className="p-4 flex items-center gap-3" style={{background: '#fbbf24'}}>
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="font-bold text-lg text-white">
                    {locale === 'ar' ? section.titleAr : locale === 'fr' ? section.titleFr : section.titleEn}
                  </h2>
                </div>
                <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {section.items.map((item, j) => (
                    <div key={j} className="rounded-2xl p-3 text-center" style={{background: '#fffbeb', border: '2px solid #fbbf24'}}>
                      <div className="font-bold text-lg" style={{color: '#d97706'}}>{item.en}</div>
                      <div className="text-sm font-bold" style={{color: '#006a67'}}>{item.ar}</div>
                      <div className="text-xs text-gray-400 mt-1 italic">{item.example}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* الاختبار */}
        {activeTab === 'quiz' && (
          <div className="max-w-lg mx-auto">
            {quizFinished ? (
              <div className="bg-white rounded-3xl shadow-xl p-10 text-center" style={{border: '3px solid #00cec9'}}>
                <div className="text-7xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold mb-4" style={{color: '#006a67'}}>{t.result}</h2>
                <div className="text-5xl font-bold mb-6" style={{color: '#00cec9'}}>
                  {quizScore} / {quizWords.length}
                </div>
                <button
                  onClick={handleQuizRestart}
                  className="w-full py-3 rounded-2xl font-bold text-white"
                  style={{background: 'linear-gradient(135deg, #00cec9, #006a67)'}}
                >
                  🔄 {t.restart}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-8" style={{border: '3px solid #00cec9'}}>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400">{quizIndex + 1} / {quizWords.length}</span>
                  <span className="text-sm font-bold" style={{color: '#00cec9'}}>⭐ {quizScore}</span>
                </div>
                <div className="w-full rounded-full h-2 mb-6" style={{background: '#e6fffe'}}>
                  <div className="h-2 rounded-full" style={{width: `${((quizIndex + 1) / quizWords.length) * 100}%`, background: '#00cec9'}} />
                </div>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{currentQuizWord.emoji}</div>
                  <h2 className="text-3xl font-bold" style={{color: '#006a67'}}>{currentQuizWord.word}</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {quizOptions.map((option, i) => {
                    let bg = 'white';
                    let border = '#b2f0ee';
                    let color = '#006a67';
                    if (quizAnswered) {
                      if (option === currentQuizWord.translation) { bg = '#dcfce7'; border = '#16a34a'; color = '#16a34a'; }
                      else if (option === quizSelected) { bg = '#fee2e2'; border = '#dc2626'; color = '#dc2626'; }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(option)}
                        className="p-4 rounded-2xl font-bold transition hover:opacity-90"
                        style={{background: bg, border: `2px solid ${border}`, color}}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {quizAnswered && (
                  <>
                    <div className="mt-4 p-3 rounded-2xl text-center font-bold"
                      style={{
                        background: quizSelected === currentQuizWord.translation ? '#dcfce7' : '#fee2e2',
                        color: quizSelected === currentQuizWord.translation ? '#16a34a' : '#dc2626'
                      }}>
                      {quizSelected === currentQuizWord.translation ? t.correct : t.wrong}
                    </div>
                    <button
                      onClick={handleQuizNext}
                      className="w-full mt-4 py-3 rounded-2xl font-bold text-white"
                      style={{background: 'linear-gradient(135deg, #00cec9, #006a67)'}}
                    >
                      {quizIndex + 1 >= quizWords.length ? `🏁 ${t.finish}` : `${t.next} →`}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}