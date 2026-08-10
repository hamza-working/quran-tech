'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';

const sections = [
  {
    id: 'scratch',
    icon: '🐱',
    color: '#f59e0b',
    nameAr: 'Scratch — البرمجة للأطفال',
    nameFr: 'Scratch — Programmation pour enfants',
    nameEn: 'Scratch — Programming for Kids',
    descAr: 'تعلم البرمجة بالسحب والإفلات بطريقة ممتعة',
    descFr: 'Apprendre la programmation par glisser-déposer',
    descEn: 'Learn programming by drag and drop in a fun way',
    lessons: [
      {
        titleAr: 'ما هو Scratch؟',
        titleFr: 'Qu\'est-ce que Scratch?',
        titleEn: 'What is Scratch?',
        contentAr: 'Scratch هو لغة برمجة مرئية مجانية من MIT مصممة للأطفال. بدل كتابة الكود، تسحب وتفلت بلوكات ملونة لإنشاء ألعاب وقصص ورسوم متحركة.',
        contentFr: 'Scratch est un langage de programmation visuel gratuit du MIT conçu pour les enfants. Au lieu d\'écrire du code, tu fais glisser des blocs colorés.',
        contentEn: 'Scratch is a free visual programming language from MIT designed for children. Instead of writing code, you drag and drop colored blocks to create games and stories.',
        icon: '🎯',
      },
      {
        titleAr: 'أول مشروع Scratch',
        titleFr: 'Premier projet Scratch',
        titleEn: 'First Scratch Project',
        contentAr: '1. افتح scratch.mit.edu\n2. انقر "إنشاء"\n3. اسحب بلوك "عند النقر على العلم"\n4. أضف بلوك "قل مرحبا لمدة 2 ثانية"\n5. انقر العلم الأخضر وشاهد النتيجة!',
        contentFr: '1. Ouvre scratch.mit.edu\n2. Clique "Créer"\n3. Fais glisser "Quand le drapeau est cliqué"\n4. Ajoute "Dire Bonjour pendant 2 secondes"\n5. Clique le drapeau vert!',
        contentEn: '1. Open scratch.mit.edu\n2. Click "Create"\n3. Drag "When green flag clicked"\n4. Add "Say Hello for 2 seconds"\n5. Click the green flag and see the result!',
        icon: '🚀',
      },
      {
        titleAr: 'الحلقات والشروط',
        titleFr: 'Les boucles et conditions',
        titleEn: 'Loops and Conditions',
        contentAr: 'الحلقة تكرر الأوامر عدة مرات. مثلاً: "كرر 10 مرات: تحرك 10 خطوات". الشرط ينفذ أمراً فقط إذا تحقق شيء. مثلاً: "إذا لمست الجدار: ارتد".',
        contentFr: 'Une boucle répète des commandes plusieurs fois. Par exemple: "Répéter 10 fois: avancer de 10". Une condition exécute une commande si quelque chose se passe.',
        contentEn: 'A loop repeats commands multiple times. Example: "Repeat 10 times: move 10 steps". A condition executes a command only if something happens.',
        icon: '🔄',
      },
      {
        titleAr: 'لعبة إسلامية بسيطة',
        titleFr: 'Jeu islamique simple',
        titleEn: 'Simple Islamic Game',
        contentAr: 'صمّم لعبة تسأل: "ما اسم هذه السورة؟"\n1. أضف صورة لصفحة قرآنية\n2. أضف 4 أزرار كإجابات\n3. إذا النقر على الصحيح: قل "أحسنت!"\n4. إذا النقر على الخطأ: قل "حاول مرة أخرى"',
        contentFr: 'Crée un jeu qui demande: "Quel est le nom de cette sourate?"\n1. Ajoute une image d\'une page coranique\n2. Ajoute 4 boutons comme réponses\n3. Si correct: dire "Bravo!"\n4. Si faux: dire "Réessaie"',
        contentEn: 'Design a game asking: "What is the name of this surah?"\n1. Add a Quran page image\n2. Add 4 buttons as answers\n3. If correct: say "Well done!"\n4. If wrong: say "Try again"',
        icon: '🎮',
      },
    ],
  },
  {
    id: 'microbit',
    icon: '🤖',
    color: '#1abc9c',
    nameAr: 'micro:bit والروبوتيكس',
    nameFr: 'micro:bit et Robotique',
    nameEn: 'micro:bit and Robotics',
    descAr: 'برمج روبوتات حقيقية وتعلم الإلكترونيات',
    descFr: 'Programme de vrais robots et apprends l\'électronique',
    descEn: 'Program real robots and learn electronics',
    lessons: [
      {
        titleAr: 'ما هو micro:bit؟',
        titleFr: 'Qu\'est-ce que micro:bit?',
        titleEn: 'What is micro:bit?',
        contentAr: 'micro:bit هو حاسوب صغير بحجم بطاقة الائتمان. يحتوي على مصفوفة LED وأزرار وبوصلة وميكروفون ومكبر صوت. يمكن برمجته بسهولة عبر الإنترنت.',
        contentFr: 'Le micro:bit est un petit ordinateur de la taille d\'une carte de crédit. Il a une matrice LED, des boutons, une boussole, un microphone et un haut-parleur.',
        contentEn: 'The micro:bit is a small computer the size of a credit card. It has an LED matrix, buttons, compass, microphone and speaker. It can be programmed easily online.',
        icon: '💡',
      },
      {
        titleAr: 'روبوت المؤذن',
        titleFr: 'Robot Muezzin',
        titleEn: 'Muezzin Robot',
        contentAr: '1. افتح makecode.microbit.org\n2. أضف بلوك "عند الضغط على زر A"\n3. أضف موسيقى لتمثيل الأذان\n4. أضف رسالة "حان وقت الصلاة" على الـ LED\n5. حمّل الكود على micro:bit',
        contentFr: '1. Ouvre makecode.microbit.org\n2. Ajoute "Quand bouton A pressé"\n3. Ajoute de la musique pour représenter l\'appel à la prière\n4. Affiche "Heure de la prière" sur les LED\n5. Télécharge sur le micro:bit',
        contentEn: '1. Open makecode.microbit.org\n2. Add "When button A pressed"\n3. Add music to represent the call to prayer\n4. Show "Prayer time" on the LED\n5. Download to micro:bit',
        icon: '🕌',
      },
      {
        titleAr: 'قياس درجة الحرارة',
        titleFr: 'Mesurer la température',
        titleEn: 'Measure Temperature',
        contentAr: 'micro:bit يحتوي على مستشعر درجة حرارة!\n1. أضف بلوك "اعرض عدداً"\n2. أضف بلوك "درجة الحرارة"\n3. كرر كل 5 ثوانٍ\n4. الآن micro:bit يعرض الحرارة!',
        contentFr: 'Le micro:bit a un capteur de température!\n1. Ajoute "Afficher un nombre"\n2. Ajoute "Température"\n3. Répète toutes les 5 secondes\n4. Le micro:bit affiche maintenant la température!',
        contentEn: 'micro:bit has a temperature sensor!\n1. Add "Show number" block\n2. Add "Temperature" block\n3. Repeat every 5 seconds\n4. Now micro:bit shows the temperature!',
        icon: '🌡️',
      },
      {
        titleAr: 'روبوت متحرك',
        titleFr: 'Robot mobile',
        titleEn: 'Moving Robot',
        contentAr: 'باستخدام عربة Buggy مع micro:bit:\n1. برمج زر A للتحرك للأمام\n2. برمج زر B للتحرك للخلف\n3. برمج الهز للتوقف\n4. أضف أضواء LED عند الحركة',
        contentFr: 'En utilisant une voiture Buggy avec micro:bit:\n1. Programme le bouton A pour avancer\n2. Programme le bouton B pour reculer\n3. Programme la secousse pour s\'arrêter\n4. Ajoute des LEDs lors du mouvement',
        contentEn: 'Using a Buggy car with micro:bit:\n1. Program button A to move forward\n2. Program button B to move backward\n3. Program shake to stop\n4. Add LED lights when moving',
        icon: '🚗',
      },
    ],
  },
  {
    id: 'html',
    icon: '🌐',
    color: '#06b6d4',
    nameAr: 'HTML/CSS والمواقع',
    nameFr: 'HTML/CSS et Sites Web',
    nameEn: 'HTML/CSS and Websites',
    descAr: 'أنشئ موقعك الإلكتروني الأول',
    descFr: 'Crée ton premier site web',
    descEn: 'Create your first website',
    lessons: [
      {
        titleAr: 'ما هو HTML؟',
        titleFr: 'Qu\'est-ce que HTML?',
        titleEn: 'What is HTML?',
        contentAr: 'HTML هو لغة هيكل صفحات الويب. كل شيء تراه في المتصفح مكتوب بـ HTML. تستخدم وسوماً مثل <h1> للعناوين و<p> للفقرات و<img> للصور.',
        contentFr: 'HTML est le langage de structure des pages web. Tout ce que tu vois dans le navigateur est écrit en HTML. On utilise des balises comme <h1> pour les titres.',
        contentEn: 'HTML is the language of web page structure. Everything you see in a browser is written in HTML. We use tags like <h1> for headings and <p> for paragraphs.',
        icon: '📄',
      },
      {
        titleAr: 'أول صفحة HTML',
        titleFr: 'Première page HTML',
        titleEn: 'First HTML Page',
        contentAr: 'أنشئ ملف index.html واكتب:\n<!DOCTYPE html>\n<html>\n<head>\n  <title>موقعي</title>\n</head>\n<body>\n  <h1>بسم الله</h1>\n  <p>مرحباً بكم</p>\n</body>\n</html>',
        contentFr: 'Crée un fichier index.html et écris:\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Mon site</title>\n</head>\n<body>\n  <h1>Bismillah</h1>\n  <p>Bienvenue</p>\n</body>\n</html>',
        contentEn: 'Create index.html and write:\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Site</title>\n</head>\n<body>\n  <h1>Bismillah</h1>\n  <p>Welcome</p>\n</body>\n</html>',
        icon: '✍️',
      },
      {
        titleAr: 'تلوين الموقع بـ CSS',
        titleFr: 'Colorier le site avec CSS',
        titleEn: 'Styling with CSS',
        contentAr: 'CSS يجمّل الموقع. أضف داخل <head>:\n<style>\n  body {\n    background: #1abc9c;\n    color: white;\n  }\n  h1 {\n    font-size: 40px;\n    color: gold;\n  }\n</style>',
        contentFr: 'CSS embellit le site. Ajoute dans <head>:\n<style>\n  body {\n    background: #1abc9c;\n    color: white;\n  }\n  h1 {\n    font-size: 40px;\n    color: gold;\n  }\n</style>',
        contentEn: 'CSS beautifies the site. Add inside <head>:\n<style>\n  body {\n    background: #1abc9c;\n    color: white;\n  }\n  h1 {\n    font-size: 40px;\n    color: gold;\n  }\n</style>',
        icon: '🎨',
      },
      {
        titleAr: 'موقع آيات قرآنية',
        titleFr: 'Site de versets coraniques',
        titleEn: 'Quranic Verses Website',
        contentAr: 'أنشئ موقعاً يعرض آيات قرآنية:\n1. أضف عنواناً رئيسياً بسم الله\n2. أضف آية قرآنية في وسط الصفحة\n3. نسّقها بخط عربي جميل\n4. أضف زر "الآية التالية"\n5. انشره مجاناً على GitHub Pages',
        contentFr: 'Crée un site affichant des versets coraniques:\n1. Ajoute un titre Bismillah\n2. Ajoute un verset au centre\n3. Stylise avec une belle police arabe\n4. Ajoute un bouton "Verset suivant"\n5. Publie gratuitement sur GitHub Pages',
        contentEn: 'Create a site displaying Quranic verses:\n1. Add a Bismillah main title\n2. Add a verse in the center\n3. Style with a beautiful Arabic font\n4. Add a "Next verse" button\n5. Publish for free on GitHub Pages',
        icon: '📖',
      },
    ],
  },
  {
    id: 'ai',
    icon: '🧠',
    color: '#8b5cf6',
    nameAr: 'الذكاء الاصطناعي للأطفال',
    nameFr: 'Intelligence Artificielle pour enfants',
    nameEn: 'AI for Kids',
    descAr: 'تعلم كيف يفكر الكمبيوتر ويتعلم',
    descFr: 'Apprends comment l\'ordinateur pense et apprend',
    descEn: 'Learn how the computer thinks and learns',
    lessons: [
      {
        titleAr: 'ما هو الذكاء الاصطناعي؟',
        titleFr: 'Qu\'est-ce que l\'IA?',
        titleEn: 'What is AI?',
        contentAr: 'الذكاء الاصطناعي هو برامج تتعلم من البيانات مثلما يتعلم الإنسان. مثلاً: ChatGPT يتعلم من ملايين الكتب، وكاميرا هاتفك تتعلم كيف تتعرف على وجهك.',
        contentFr: 'L\'IA sont des programmes qui apprennent des données comme les humains. Par exemple: ChatGPT apprend de millions de livres, et la caméra de ton téléphone reconnaît ton visage.',
        contentEn: 'AI are programs that learn from data just like humans. For example: ChatGPT learns from millions of books, and your phone camera learns to recognize your face.',
        icon: '🤔',
      },
      {
        titleAr: 'Teachable Machine',
        titleFr: 'Teachable Machine',
        titleEn: 'Teachable Machine',
        contentAr: '1. افتح teachablemachine.withgoogle.com\n2. اختر "مشروع صورة"\n3. أنشئ فئتين: "يد مفتوحة" و"قبضة"\n4. صوّر يدك 50 مرة لكل وضع\n5. اضغط "تدريب"\n6. اختبر النموذج أمام الكاميرا!',
        contentFr: '1. Ouvre teachablemachine.withgoogle.com\n2. Choisis "Projet Image"\n3. Crée 2 classes: "Main ouverte" et "Poing"\n4. Photographie ta main 50 fois par position\n5. Clique "Entraîner"\n6. Teste le modèle devant la caméra!',
        contentEn: '1. Open teachablemachine.withgoogle.com\n2. Choose "Image Project"\n3. Create 2 classes: "Open hand" and "Fist"\n4. Photo your hand 50 times per position\n5. Click "Train"\n6. Test the model in front of camera!',
        icon: '📷',
      },
      {
        titleAr: 'AI يتعرف على السور',
        titleFr: 'IA qui reconnaît les sourates',
        titleEn: 'AI that recognizes surahs',
        contentAr: '1. افتح Teachable Machine واختر "صوت"\n2. أنشئ فئات: الفاتحة، الإخلاص، الفلق\n3. سجّل صوتك وأنت تقرأ كل سورة 20 مرة\n4. درّب النموذج\n5. الآن AI يتعرف على السورة التي تقرؤها!',
        contentFr: '1. Ouvre Teachable Machine et choisis "Audio"\n2. Crée des classes: Al-Fatiha, Al-Ikhlas, Al-Falaq\n3. Enregistre ta voix en lisant chaque sourate 20 fois\n4. Entraîne le modèle\n5. L\'IA reconnaît maintenant la sourate que tu lis!',
        contentEn: '1. Open Teachable Machine and choose "Audio"\n2. Create classes: Al-Fatiha, Al-Ikhlas, Al-Falaq\n3. Record your voice reading each surah 20 times\n4. Train the model\n5. AI now recognizes which surah you are reading!',
        icon: '🎙️',
      },
      {
        titleAr: 'مستقبل الذكاء الاصطناعي',
        titleFr: 'L\'avenir de l\'IA',
        titleEn: 'The Future of AI',
        contentAr: 'الذكاء الاصطناعي سيغير العالم! يمكنك مستقبلاً:\n- بناء AI يصحح التجويد\n- روبوت يعلم الأطفال القرآن\n- نظام يترجم القرآن لـ 100 لغة\nأنت جيل المستقبل الذي سيبني هذه التقنيات!',
        contentFr: 'L\'IA va changer le monde! Tu pourras:\n- Construire une IA qui corrige le tajwid\n- Un robot qui enseigne le Coran aux enfants\n- Un système qui traduit le Coran en 100 langues\nTu es la génération future qui construira ces technologies!',
        contentEn: 'AI will change the world! You will be able to:\n- Build AI that corrects Tajweed\n- A robot that teaches children the Quran\n- A system that translates the Quran into 100 languages\nYou are the future generation that will build these technologies!',
        icon: '🚀',
      },
    ],
  },
];

export default function TechnologyPage() {
  const locale = useLocale() as 'ar' | 'fr' | 'en';
  const [activeSection, setActiveSection] = useState('scratch');
  const [activeLesson, setActiveLesson] = useState(0);

  const currentSection = sections.find(s => s.id === activeSection)!;

  const texts = {
    ar: { title: 'تعلم التكنولوجيا', subtitle: 'من البرمجة للذكاء الاصطناعي — كل شيء للأطفال', lessons: 'الدروس' },
    fr: { title: 'Apprendre la Technologie', subtitle: 'De la programmation à l\'IA — tout pour les enfants', lessons: 'Leçons' },
    en: { title: 'Learn Technology', subtitle: 'From programming to AI — everything for kids', lessons: 'Lessons' },
  };

  const t = texts[locale] || texts.ar;

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-3">💻</div>
          <h1 className="text-3xl font-bold" style={{color: '#148f77'}}>{t.title}</h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </div>

        {/* تبويبات الأقسام */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => { setActiveSection(section.id); setActiveLesson(0); }}
              className="rounded-2xl p-4 text-center transition hover:scale-105 font-bold"
              style={activeSection === section.id
                ? {background: section.color, color: 'white', border: `3px solid ${section.color}`}
                : {background: 'white', color: section.color, border: `3px solid ${section.color}`}
              }
            >
              <div className="text-3xl mb-1">{section.icon}</div>
              <div className="text-xs">
                {locale === 'ar' ? section.nameAr.split('—')[0] :
                 locale === 'fr' ? section.nameFr.split('—')[0] :
                 section.nameEn.split('—')[0]}
              </div>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* قائمة الدروس */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-md overflow-hidden" style={{border: `3px solid ${currentSection.color}`}}>
              <div className="p-4 text-white font-bold" style={{background: currentSection.color}}>
                {currentSection.icon} {t.lessons}
              </div>
              {currentSection.lessons.map((lesson, i) => (
                <button
                  key={i}
                  onClick={() => setActiveLesson(i)}
                  className="w-full p-4 text-right border-b flex items-center gap-3 transition hover:opacity-80"
                  style={{
                    borderColor: '#f0f0f0',
                    background: activeLesson === i ? `${currentSection.color}15` : 'white',
                  }}
                >
                  <span className="text-2xl">{lesson.icon}</span>
                  <span className="text-sm font-bold" style={{color: activeLesson === i ? currentSection.color : '#374151'}}>
                    {locale === 'ar' ? lesson.titleAr : locale === 'fr' ? lesson.titleFr : lesson.titleEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* محتوى الدرس */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-md p-6" style={{border: `3px solid ${currentSection.color}`}}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{currentSection.lessons[activeLesson].icon}</span>
                <h2 className="text-xl font-bold" style={{color: currentSection.color}}>
                  {locale === 'ar' ? currentSection.lessons[activeLesson].titleAr :
                   locale === 'fr' ? currentSection.lessons[activeLesson].titleFr :
                   currentSection.lessons[activeLesson].titleEn}
                </h2>
              </div>

              <div
                className="text-gray-600 leading-relaxed whitespace-pre-line p-4 rounded-2xl text-sm"
                style={{background: `${currentSection.color}10`}}
              >
                {locale === 'ar' ? currentSection.lessons[activeLesson].contentAr :
                 locale === 'fr' ? currentSection.lessons[activeLesson].contentFr :
                 currentSection.lessons[activeLesson].contentEn}
              </div>

              {/* أزرار التنقل */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setActiveLesson(prev => Math.max(0, prev - 1))}
                  disabled={activeLesson === 0}
                  className="px-5 py-2 rounded-2xl font-bold transition disabled:opacity-30"
                  style={{background: currentSection.color, color: 'white'}}
                >
                  ← {locale === 'ar' ? 'السابق' : locale === 'fr' ? 'Précédent' : 'Previous'}
                </button>
                <span className="flex items-center text-sm text-gray-400">
                  {activeLesson + 1} / {currentSection.lessons.length}
                </span>
                <button
                  onClick={() => setActiveLesson(prev => Math.min(currentSection.lessons.length - 1, prev + 1))}
                  disabled={activeLesson === currentSection.lessons.length - 1}
                  className="px-5 py-2 rounded-2xl font-bold transition disabled:opacity-30"
                  style={{background: currentSection.color, color: 'white'}}
                >
                  {locale === 'ar' ? 'التالي' : locale === 'fr' ? 'Suivant' : 'Next'} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}