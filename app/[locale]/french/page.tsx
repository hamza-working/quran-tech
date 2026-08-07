'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';

const vocabulary = [
  { word: 'Pomme', translation: 'تفاحة', emoji: '🍎', category: 'food' },
  { word: 'Livre', translation: 'كتاب', emoji: '📚', category: 'school' },
  { word: 'Chat', translation: 'قطة', emoji: '🐱', category: 'animals' },
  { word: 'Chien', translation: 'كلب', emoji: '🐶', category: 'animals' },
  { word: 'Soleil', translation: 'شمس', emoji: '☀️', category: 'nature' },
  { word: 'Lune', translation: 'قمر', emoji: '🌙', category: 'nature' },
  { word: 'Eau', translation: 'ماء', emoji: '💧', category: 'nature' },
  { word: 'Maison', translation: 'منزل', emoji: '🏠', category: 'places' },
  { word: 'École', translation: 'مدرسة', emoji: '🏫', category: 'places' },
  { word: 'Crayon', translation: 'قلم', emoji: '✏️', category: 'school' },
  { word: 'Banane', translation: 'موزة', emoji: '🍌', category: 'food' },
  { word: 'Poisson', translation: 'سمكة', emoji: '🐟', category: 'animals' },
  { word: 'Arbre', translation: 'شجرة', emoji: '🌳', category: 'nature' },
  { word: 'Fleur', translation: 'زهرة', emoji: '🌸', category: 'nature' },
  { word: 'Pain', translation: 'خبز', emoji: '🍞', category: 'food' },
  { word: 'Lait', translation: 'حليب', emoji: '🥛', category: 'food' },
];

const grammar = [
  {
    titleAr: 'الضمائر الشخصية', titleFr: 'Les pronoms personnels', titleEn: 'Personal Pronouns',
    icon: '👤',
    items: [
      { fr: 'Je', ar: 'أنا', example: 'Je suis heureux' },
      { fr: 'Tu', ar: 'أنت', example: 'Tu es gentil' },
      { fr: 'Il', ar: 'هو', example: 'Il est grand' },
      { fr: 'Elle', ar: 'هي', example: 'Elle est belle' },
      { fr: 'Nous', ar: 'نحن', example: 'Nous sommes amis' },
      { fr: 'Vous', ar: 'أنتم', example: 'Vous êtes sympas' },
      { fr: 'Ils', ar: 'هم', example: 'Ils sont contents' },
      { fr: 'Elles', ar: 'هن', example: 'Elles sont belles' },
    ]
  },
  {
    titleAr: 'الألوان', titleFr: 'Les couleurs', titleEn: 'Colors',
    icon: '🎨',
    items: [
      { fr: 'Rouge', ar: 'أحمر', example: 'La pomme est rouge' },
      { fr: 'Bleu', ar: 'أزرق', example: 'Le ciel est bleu' },
      { fr: 'Vert', ar: 'أخضر', example: 'L\'arbre est vert' },
      { fr: 'Jaune', ar: 'أصفر', example: 'Le soleil est jaune' },
      { fr: 'Blanc', ar: 'أبيض', example: 'La neige est blanche' },
      { fr: 'Noir', ar: 'أسود', example: 'La nuit est noire' },
    ]
  },
  {
    titleAr: 'الأرقام من 1 إلى 20', titleFr: 'Les chiffres de 1 à 20', titleEn: 'Numbers 1 to 20',
    icon: '🔢',
    items: [
      { fr: 'Un - 1', ar: 'واحد', example: 'J\'ai un chat' },
      { fr: 'Deux - 2', ar: 'اثنان', example: 'Deux livres' },
      { fr: 'Trois - 3', ar: 'ثلاثة', example: 'Trois pommes' },
      { fr: 'Quatre - 4', ar: 'أربعة', example: 'Quatre chiens' },
      { fr: 'Cinq - 5', ar: 'خمسة', example: 'Cinq étoiles' },
      { fr: 'Six - 6', ar: 'ستة', example: 'Six fleurs' },
      { fr: 'Sept - 7', ar: 'سبعة', example: 'Sept jours' },
      { fr: 'Huit - 8', ar: 'ثمانية', example: 'Huit oiseaux' },
      { fr: 'Neuf - 9', ar: 'تسعة', example: 'Neuf poissons' },
      { fr: 'Dix - 10', ar: 'عشرة', example: 'Dix doigts' },
      { fr: 'Onze - 11', ar: 'أحد عشر', example: 'Onze garçons' },
      { fr: 'Douze - 12', ar: 'اثنا عشر', example: 'Douze mois' },
      { fr: 'Treize - 13', ar: 'ثلاثة عشر', example: 'Treize filles' },
      { fr: 'Quatorze - 14', ar: 'أربعة عشر', example: 'Quatorze jours' },
      { fr: 'Quinze - 15', ar: 'خمسة عشر', example: 'Quinze oiseaux' },
      { fr: 'Seize - 16', ar: 'ستة عشر', example: 'Seize fleurs' },
      { fr: 'Dix-sept - 17', ar: 'سبعة عشر', example: 'Dix-sept étoiles' },
      { fr: 'Dix-huit - 18', ar: 'ثمانية عشر', example: 'Dix-huit pommes' },
      { fr: 'Dix-neuf - 19', ar: 'تسعة عشر', example: 'Dix-neuf chiens' },
      { fr: 'Vingt - 20', ar: 'عشرون', example: 'Vingt étudiants' },
    ]
  },
  {
    titleAr: 'الأرقام من 20 إلى 100', titleFr: 'Les nombres de 20 à 100', titleEn: 'Numbers 20 to 100',
    icon: '💯',
    items: [
      { fr: 'Vingt et un - 21', ar: 'واحد وعشرون', example: 'Vingt et un jours' },
      { fr: 'Vingt-deux - 22', ar: 'اثنان وعشرون', example: 'Vingt-deux étudiants' },
      { fr: 'Trente - 30', ar: 'ثلاثون', example: 'Trente étudiants' },
      { fr: 'Quarante - 40', ar: 'أربعون', example: 'Quarante chats' },
      { fr: 'Cinquante - 50', ar: 'خمسون', example: 'Cinquante oiseaux' },
      { fr: 'Soixante - 60', ar: 'ستون', example: 'Soixante fleurs' },
      { fr: 'Soixante-dix - 70', ar: 'سبعون', example: 'Soixante-dix jours' },
      { fr: 'Quatre-vingts - 80', ar: 'ثمانون', example: 'Quatre-vingts pommes' },
      { fr: 'Quatre-vingt-dix - 90', ar: 'تسعون', example: 'Quatre-vingt-dix étoiles' },
      { fr: 'Cent - 100', ar: 'مئة', example: 'Cent étudiants' },
    ]
  },
];

const quizWords = vocabulary.slice(0, 8);

export default function FrenchPage() {
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
      title: 'تعلم الفرنسية', subtitle: 'تعلم الفرنسية بطريقة ممتعة للأطفال',
      vocab: 'المفردات', grammar: 'القواعد', quiz: 'اختبار',
      all: 'الكل', food: 'طعام', animals: 'حيوانات', school: 'مدرسة', nature: 'طبيعة', places: 'أماكن',
      clickToFlip: 'انقر للترجمة',
      next: 'التالي', finish: 'إنهاء', restart: 'إعادة',
      result: 'نتيجتك', correct: 'صحيح! ✅', wrong: 'خطأ! ❌',
    },
    fr: {
      title: 'Apprendre le français', subtitle: 'Apprendre le français de façon amusante',
      vocab: 'Vocabulaire', grammar: 'Grammaire', quiz: 'Quiz',
      all: 'Tout', food: 'Nourriture', animals: 'Animaux', school: 'École', nature: 'Nature', places: 'Lieux',
      clickToFlip: 'Cliquez pour traduire',
      next: 'Suivant', finish: 'Terminer', restart: 'Recommencer',
      result: 'Votre résultat', correct: 'Correct! ✅', wrong: 'Incorrect! ❌',
    },
    en: {
      title: 'Learn French', subtitle: 'Learn French in a fun way for kids',
      vocab: 'Vocabulary', grammar: 'Grammar', quiz: 'Quiz',
      all: 'All', food: 'Food', animals: 'Animals', school: 'School', nature: 'Nature', places: 'Places',
      clickToFlip: 'Click to translate',
      next: 'Next', finish: 'Finish', restart: 'Restart',
      result: 'Your Result', correct: 'Correct! ✅', wrong: 'Wrong! ❌',
    },
  };

  const t = texts[locale] || texts.ar;
  const filteredVocab = vocabFilter === 'all' ? vocabulary : vocabulary.filter(v => v.category === vocabFilter);
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
          <div className="text-5xl mb-3">🇫🇷</div>
          <h1 className="text-3xl font-bold" style={{color: '#006a67'}}>{t.title}</h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </div>

        {/* تبويبات */}
        <div className="flex rounded-2xl overflow-hidden mb-8 shadow-md bg-white">
          {(['vocab', 'grammar', 'quiz'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 font-bold text-sm transition"
              style={activeTab === tab ? {background: '#8b5cf6', color: 'white'} : {color: '#006a67'}}
            >
              {tab === 'vocab' ? `📖 ${t.vocab}` : tab === 'grammar' ? `📝 ${t.grammar}` : `🎯 ${t.quiz}`}
            </button>
          ))}
        </div>

        {/* المفردات */}
        {activeTab === 'vocab' && (
          <div>
            <div className="flex gap-2 flex-wrap justify-center mb-6">
              {(['all', 'food', 'animals', 'school', 'nature', 'places'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setVocabFilter(cat)}
                  className="px-3 py-1 rounded-full text-sm font-bold transition"
                  style={vocabFilter === cat
                    ? {background: '#8b5cf6', color: 'white'}
                    : {background: 'white', color: '#8b5cf6', border: '2px solid #8b5cf6'}
                  }
                >
                  {t[cat as keyof typeof t]}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredVocab.map((word, i) => (
                <div
                  key={i}
                  onClick={() => setFlipped(flipped === i ? null : i)}
                  className="bg-white rounded-3xl p-5 text-center cursor-pointer transition hover:scale-105 shadow-md"
                  style={{border: '3px solid #8b5cf6', minHeight: '130px'}}
                >
                  <div className="text-4xl mb-2">{word.emoji}</div>
                  {flipped === i ? (
                    <div>
                      <div className="font-bold" style={{color: '#8b5cf6'}}>{word.translation}</div>
                      <div className="text-xs text-gray-400 mt-1">{word.word}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-bold" style={{color: '#8b5cf6'}}>{word.word}</div>
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
              <div key={i} className="bg-white rounded-3xl shadow-md overflow-hidden" style={{border: '3px solid #8b5cf6'}}>
                <div className="p-4 flex items-center gap-3 text-white" style={{background: '#8b5cf6'}}>
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="font-bold text-lg">
                    {locale === 'ar' ? section.titleAr : locale === 'fr' ? section.titleFr : section.titleEn}
                  </h2>
                </div>
                <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {section.items.map((item, j) => (
                    <div key={j} className="rounded-2xl p-3 text-center" style={{background: '#f5f3ff', border: '2px solid #8b5cf6'}}>
                      <div className="font-bold text-lg" style={{color: '#8b5cf6'}}>{item.fr}</div>
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
              <div className="bg-white rounded-3xl shadow-xl p-10 text-center" style={{border: '3px solid #8b5cf6'}}>
                <div className="text-7xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold mb-4" style={{color: '#8b5cf6'}}>{t.result}</h2>
                <div className="text-5xl font-bold mb-6" style={{color: '#8b5cf6'}}>
                  {quizScore} / {quizWords.length}
                </div>
                <button
                  onClick={handleQuizRestart}
                  className="w-full py-3 rounded-2xl font-bold text-white"
                  style={{background: '#8b5cf6'}}
                >
                  🔄 {t.restart}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-8" style={{border: '3px solid #8b5cf6'}}>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400">{quizIndex + 1} / {quizWords.length}</span>
                  <span className="text-sm font-bold" style={{color: '#8b5cf6'}}>⭐ {quizScore}</span>
                </div>
                <div className="w-full rounded-full h-2 mb-6" style={{background: '#f5f3ff'}}>
                  <div className="h-2 rounded-full" style={{width: `${((quizIndex + 1) / quizWords.length) * 100}%`, background: '#8b5cf6'}} />
                </div>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{currentQuizWord.emoji}</div>
                  <h2 className="text-3xl font-bold" style={{color: '#8b5cf6'}}>{currentQuizWord.word}</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {quizOptions.map((option, i) => {
                    let bg = 'white';
                    let border = '#d8b4fe';
                    let color = '#8b5cf6';
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
                      style={{background: '#8b5cf6'}}
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