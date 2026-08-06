'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';

type Question = {
  id: number;
  type: 'qcm' | 'truefalse';
  category: 'religious' | 'scientific' | 'cultural';
  ar: { question: string; options?: string[]; answer: string | boolean };
  fr: { question: string; options?: string[]; answer: string | boolean };
  en: { question: string; options?: string[]; answer: string | boolean };
};

const questions: Question[] = [
  // ديني
  {
    id: 1, type: 'qcm', category: 'religious',
    ar: { question: 'كم عدد سور القرآن الكريم؟', options: ['100', '114', '120', '110'], answer: '114' },
    fr: { question: 'Combien de sourates contient le Coran?', options: ['100', '114', '120', '110'], answer: '114' },
    en: { question: 'How many surahs are in the Quran?', options: ['100', '114', '120', '110'], answer: '114' },
  },
  {
    id: 2, type: 'truefalse', category: 'religious',
    ar: { question: 'سورة البقرة هي أطول سورة في القرآن الكريم', answer: true },
    fr: { question: 'Al-Baqara est la sourate la plus longue du Coran', answer: true },
    en: { question: 'Al-Baqara is the longest surah in the Quran', answer: true },
  },
  {
    id: 3, type: 'qcm', category: 'religious',
    ar: { question: 'كم عدد أركان الإسلام؟', options: ['3', '4', '5', '6'], answer: '5' },
    fr: { question: 'Combien de piliers de l\'Islam y a-t-il?', options: ['3', '4', '5', '6'], answer: '5' },
    en: { question: 'How many pillars of Islam are there?', options: ['3', '4', '5', '6'], answer: '5' },
  },
  {
    id: 4, type: 'truefalse', category: 'religious',
    ar: { question: 'النبي محمد ﷺ وُلد في المدينة المنورة', answer: false },
    fr: { question: 'Le Prophète Muhammad ﷺ est né à Médine', answer: false },
    en: { question: 'Prophet Muhammad ﷺ was born in Medina', answer: false },
  },
  // علمي
  {
    id: 5, type: 'qcm', category: 'scientific',
    ar: { question: 'كم عدد كواكب المجموعة الشمسية؟', options: ['7', '8', '9', '10'], answer: '8' },
    fr: { question: 'Combien de planètes dans le système solaire?', options: ['7', '8', '9', '10'], answer: '8' },
    en: { question: 'How many planets are in the solar system?', options: ['7', '8', '9', '10'], answer: '8' },
  },
  {
    id: 6, type: 'truefalse', category: 'scientific',
    ar: { question: 'الشمس نجم وليست كوكباً', answer: true },
    fr: { question: 'Le Soleil est une étoile et non une planète', answer: true },
    en: { question: 'The Sun is a star, not a planet', answer: true },
  },
  {
    id: 7, type: 'qcm', category: 'scientific',
    ar: { question: 'ما هو أسرع حيوان على الأرض؟', options: ['الأسد', 'النمر', 'الفهد', 'الحصان'], answer: 'الفهد' },
    fr: { question: 'Quel est l\'animal le plus rapide sur terre?', options: ['Lion', 'Tigre', 'Guépard', 'Cheval'], answer: 'Guépard' },
    en: { question: 'What is the fastest animal on land?', options: ['Lion', 'Tiger', 'Cheetah', 'Horse'], answer: 'Cheetah' },
  },
  {
    id: 8, type: 'truefalse', category: 'scientific',
    ar: { question: 'الماء يتجمد عند درجة 0 مئوية', answer: true },
    fr: { question: 'L\'eau gèle à 0 degré Celsius', answer: true },
    en: { question: 'Water freezes at 0 degrees Celsius', answer: true },
  },
  // ثقافي
  {
    id: 9, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي عاصمة المغرب؟', options: ['الدار البيضاء', 'مراكش', 'الرباط', 'فاس'], answer: 'الرباط' },
    fr: { question: 'Quelle est la capitale du Maroc?', options: ['Casablanca', 'Marrakech', 'Rabat', 'Fès'], answer: 'Rabat' },
    en: { question: 'What is the capital of Morocco?', options: ['Casablanca', 'Marrakech', 'Rabat', 'Fes'], answer: 'Rabat' },
  },
  {
    id: 10, type: 'truefalse', category: 'cultural',
    ar: { question: 'برج إيفل موجود في لندن', answer: false },
    fr: { question: 'La Tour Eiffel se trouve à Londres', answer: false },
    en: { question: 'The Eiffel Tower is located in London', answer: false },
  },
  {
    id: 11, type: 'qcm', category: 'cultural',
    ar: { question: 'من اخترع الهاتف؟', options: ['توماس إديسون', 'ألكسندر غراهام بيل', 'نيكولا تيسلا', 'أينشتاين'], answer: 'ألكسندر غراهام بيل' },
    fr: { question: 'Qui a inventé le téléphone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Einstein'], answer: 'Alexander Graham Bell' },
    en: { question: 'Who invented the telephone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Einstein'], answer: 'Alexander Graham Bell' },
  },
  {
    id: 12, type: 'truefalse', category: 'cultural',
    ar: { question: 'لغة البرمجة Python سميت على اسم ثعبان', answer: false },
    fr: { question: 'Python a été nommé d\'après un serpent', answer: false },
    en: { question: 'Python programming language was named after a snake', answer: false },
  },
];

const categoryColors = {
  religious: '#00cec9',
  scientific: '#fbbf24',
  cultural: '#f59e0b',
};

const categoryIcons = {
  religious: '🕌',
  scientific: '🔬',
  cultural: '🌍',
};

export default function QuizPage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [filter, setFilter] = useState<'all' | 'religious' | 'scientific' | 'cultural'>('all');

  const filteredQuestions = filter === 'all' ? questions : questions.filter(q => q.category === filter);
  const currentQuestion = filteredQuestions[currentIndex];

  const texts = {
    ar: {
      title: 'الاختبار الثقافي',
      subtitle: 'اختبر معلوماتك الدينية والعلمية والثقافية',
      all: 'الكل',
      religious: 'ديني',
      scientific: 'علمي',
      cultural: 'ثقافي',
      question: 'سؤال',
      of: 'من',
      true: 'صحيح ✅',
      false: 'خطأ ❌',
      next: 'السؤال التالي',
      finish: 'إنهاء الاختبار',
      result: 'نتيجتك',
      excellent: 'ممتاز! 🏆',
      good: 'جيد! 👍',
      tryAgain: 'حاول مرة أخرى 💪',
      restart: 'إعادة الاختبار',
      correct: 'إجابة صحيحة! ✅',
      wrong: 'إجابة خاطئة ❌',
    },
    fr: {
      title: 'Quiz Culturel',
      subtitle: 'Testez vos connaissances religieuses, scientifiques et culturelles',
      all: 'Tout',
      religious: 'Religieux',
      scientific: 'Scientifique',
      cultural: 'Culturel',
      question: 'Question',
      of: 'sur',
      true: 'Vrai ✅',
      false: 'Faux ❌',
      next: 'Question suivante',
      finish: 'Terminer le quiz',
      result: 'Votre résultat',
      excellent: 'Excellent! 🏆',
      good: 'Bien! 👍',
      tryAgain: 'Essayez encore 💪',
      restart: 'Recommencer',
      correct: 'Bonne réponse! ✅',
      wrong: 'Mauvaise réponse ❌',
    },
    en: {
      title: 'Cultural Quiz',
      subtitle: 'Test your religious, scientific and cultural knowledge',
      all: 'All',
      religious: 'Religious',
      scientific: 'Scientific',
      cultural: 'Cultural',
      question: 'Question',
      of: 'of',
      true: 'True ✅',
      false: 'False ❌',
      next: 'Next Question',
      finish: 'Finish Quiz',
      result: 'Your Result',
      excellent: 'Excellent! 🏆',
      good: 'Good! 👍',
      tryAgain: 'Try Again 💪',
      restart: 'Restart Quiz',
      correct: 'Correct! ✅',
      wrong: 'Wrong! ❌',
    },
  };

  const t = texts[locale] || texts.ar;

  const handleAnswer = (answer: string | boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion[locale].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= filteredQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const getResultText = () => {
    const percentage = (score / filteredQuestions.length) * 100;
    if (percentage >= 80) return t.excellent;
    if (percentage >= 50) return t.good;
    return t.tryAgain;
  };

  if (finished) {
    return (
      <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-10" style={{border: '3px solid #00cec9'}}>
            <div className="text-7xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-2" style={{color: '#006a67'}}>{t.result}</h2>
            <div className="text-6xl font-bold my-6" style={{color: '#00cec9'}}>
              {score} / {filteredQuestions.length}
            </div>
            <div className="text-2xl font-bold mb-6" style={{color: '#fbbf24'}}>
              {getResultText()}
            </div>
            <div className="w-full rounded-full h-4 mb-8" style={{background: '#e6fffe'}}>
              <div
                className="h-4 rounded-full transition-all"
                style={{
                  width: `${(score / filteredQuestions.length) * 100}%`,
                  background: 'linear-gradient(to right, #00cec9, #006a67)'
                }}
              />
            </div>
            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white transition hover:opacity-90"
              style={{background: 'linear-gradient(135deg, #00cec9, #006a67)'}}
            >
              🔄 {t.restart}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e6fffe 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧠</div>
          <h1 className="text-3xl font-bold" style={{color: '#006a67'}}>{t.title}</h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </div>

        {/* فلتر التصنيف */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {(['all', 'religious', 'scientific', 'cultural'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); handleRestart(); }}
              className="px-4 py-2 rounded-full font-bold text-sm transition"
              style={filter === cat
                ? {background: '#006a67', color: 'white'}
                : {background: 'white', color: '#006a67', border: '2px solid #00cec9'}
              }
            >
              {cat === 'all' ? t.all : `${categoryIcons[cat]} ${t[cat]}`}
            </button>
          ))}
        </div>

        {/* بطاقة السؤال */}
        <div className="bg-white rounded-3xl shadow-xl p-8" style={{border: `3px solid ${categoryColors[currentQuestion.category]}`}}>

          {/* رأس السؤال */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-bold px-3 py-1 rounded-full text-white"
              style={{background: categoryColors[currentQuestion.category]}}>
              {categoryIcons[currentQuestion.category]} {t[currentQuestion.category]}
            </span>
            <span className="text-sm text-gray-400 font-bold">
              {t.question} {currentIndex + 1} {t.of} {filteredQuestions.length}
            </span>
          </div>

          {/* شريط التقدم */}
          <div className="w-full rounded-full h-2 mb-6" style={{background: '#e6fffe'}}>
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
                background: categoryColors[currentQuestion.category]
              }}
            />
          </div>

          {/* نص السؤال */}
          <h2 className="text-xl font-bold text-center mb-8" style={{color: '#006a67'}}>
            {currentQuestion[locale].question}
          </h2>

          {/* الإجابات */}
          {currentQuestion.type === 'qcm' ? (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion[locale].options?.map((option, i) => {
                let bg = 'white';
                let border = '#b2f0ee';
                let color = '#006a67';

                if (isAnswered) {
                  if (option === currentQuestion[locale].answer) {
                    bg = '#dcfce7'; border = '#16a34a'; color = '#16a34a';
                  } else if (option === selectedAnswer) {
                    bg = '#fee2e2'; border = '#dc2626'; color = '#dc2626';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="p-4 rounded-2xl font-bold text-sm transition hover:opacity-90"
                    style={{background: bg, border: `2px solid ${border}`, color}}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {[true, false].map((val) => {
                let bg = 'white';
                let border = '#b2f0ee';
                let color = '#006a67';

                if (isAnswered) {
                  if (val === currentQuestion[locale].answer) {
                    bg = '#dcfce7'; border = '#16a34a'; color = '#16a34a';
                  } else if (val === selectedAnswer) {
                    bg = '#fee2e2'; border = '#dc2626'; color = '#dc2626';
                  }
                }

                return (
                  <button
                    key={String(val)}
                    onClick={() => handleAnswer(val)}
                    className="p-5 rounded-2xl font-bold text-lg transition hover:opacity-90"
                    style={{background: bg, border: `2px solid ${border}`, color}}
                  >
                    {val ? t.true : t.false}
                  </button>
                );
              })}
            </div>
          )}

          {/* رسالة الإجابة */}
          {isAnswered && (
            <div
              className="mt-6 p-4 rounded-2xl text-center font-bold text-lg"
              style={{
                background: selectedAnswer === currentQuestion[locale].answer ? '#dcfce7' : '#fee2e2',
                color: selectedAnswer === currentQuestion[locale].answer ? '#16a34a' : '#dc2626',
              }}
            >
              {selectedAnswer === currentQuestion[locale].answer ? t.correct : t.wrong}
            </div>
          )}

          {/* زر التالي */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full mt-6 py-4 rounded-2xl font-bold text-lg text-white transition hover:opacity-90"
              style={{background: 'linear-gradient(135deg, #00cec9, #006a67)'}}
            >
              {currentIndex + 1 >= filteredQuestions.length ? `🏁 ${t.finish}` : `${t.next} ←`}
            </button>
          )}

        </div>

        {/* النقاط الحالية */}
        <div className="text-center mt-6">
          <span className="font-bold text-lg" style={{color: '#006a67'}}>
            ⭐ {score} / {currentIndex + (isAnswered ? 1 : 0)}
          </span>
        </div>

      </div>
    </main>
  );
}