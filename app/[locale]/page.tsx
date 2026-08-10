'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';
import AudioPlayer from '@/components/quran/AudioPlayer';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();
const [selectedProject, setSelectedProject] = useState<number | null>(null);
const projectDetails = [
  {
    icon: '🎮',
    titleAr: 'لعبة تعليمية', titleFr: 'Jeu éducatif', titleEn: 'Educational Game',
    steps: {
      ar: [
        'افتح موقع scratch.mit.edu وأنشئ حساباً مجانياً',
        'انقر على "إنشاء" لبدء مشروع جديد',
        'اسحب بلوك "عند النقر على العلم الأخضر" من قسم الأحداث',
        'أضف بلوك "قل" من قسم المظهر واكتب اسم سورة',
        'أضف بلوك "انتظر ثانيتين" ثم كرر لكل السور',
        'أضف أصوات وألوان لجعل اللعبة ممتعة',
        'شارك مشروعك مع الأصدقاء!',
      ],
      fr: [
        'Ouvre scratch.mit.edu et crée un compte gratuit',
        'Clique sur "Créer" pour commencer un nouveau projet',
        'Fais glisser le bloc "Quand le drapeau est cliqué"',
        'Ajoute un bloc "Dire" et écris le nom d\'une sourate',
        'Ajoute "Attendre 2 secondes" et répète pour chaque sourate',
        'Ajoute des sons et des couleurs pour rendre le jeu amusant',
        'Partage ton projet avec tes amis!',
      ],
      en: [
        'Open scratch.mit.edu and create a free account',
        'Click "Create" to start a new project',
        'Drag the "When green flag clicked" block from Events',
        'Add a "Say" block and type a surah name',
        'Add "Wait 2 seconds" then repeat for each surah',
        'Add sounds and colors to make the game fun',
        'Share your project with friends!',
      ],
    },
    color: '#1abc9c', tag: 'Scratch',
  },
  {
    icon: '📱',
    titleAr: 'تطبيق صغير', titleFr: 'Mini application', titleEn: 'Mini App',
    steps: {
      ar: [
        'افتح Scratch وأنشئ خلفية جميلة بألوان إسلامية',
        'أضف شخصية (Sprite) تمثل زر الدعاء',
        'عند النقر على الشخصية، اجعلها تقول دعاءً مختلفاً',
        'أضف 5 أدعية مختلفة مع أصوات',
        'أضف زر "التالي" للانتقال للدعاء التالي',
        'أضف موسيقى هادئة في الخلفية',
        'احفظ وشارك تطبيقك!',
      ],
      fr: [
        'Ouvre Scratch et crée un beau fond avec des couleurs islamiques',
        'Ajoute un personnage représentant un bouton de douaa',
        'Quand on clique, fais dire une douaa différente',
        'Ajoute 5 douaas différentes avec des sons',
        'Ajoute un bouton "Suivant" pour passer à la douaa suivante',
        'Ajoute une musique douce en fond',
        'Sauvegarde et partage ton application!',
      ],
      en: [
        'Open Scratch and create a beautiful Islamic-colored background',
        'Add a Sprite representing a dua button',
        'When clicked, make it say a different dua',
        'Add 5 different duas with sounds',
        'Add a "Next" button to go to the next dua',
        'Add soft background music',
        'Save and share your app!',
      ],
    },
    color: '#fbbf24', tag: 'Scratch',
  },
  {
    icon: '🤖',
    titleAr: 'روبوت ذكي', titleFr: 'Robot intelligent', titleEn: 'Smart Robot',
    steps: {
      ar: [
        'احصل على لوحة micro:bit من المتجر أو المدرسة',
        'افتح makecode.microbit.org في المتصفح',
        'أنشئ مشروعاً جديداً',
        'أضف بلوك "عند بدء التشغيل" وبرمج أوقات الصلاة',
        'استخدم بلوك "موسيقى" لتشغيل صوت الأذان',
        'اربط مكبر الصوت بالـ micro:bit',
        'حمّل الكود على اللوحة واختبره!',
      ],
      fr: [
        'Procure-toi une carte micro:bit',
        'Ouvre makecode.microbit.org dans le navigateur',
        'Crée un nouveau projet',
        'Ajoute le bloc "Au démarrage" et programme les heures de prière',
        'Utilise le bloc "Musique" pour jouer l\'appel à la prière',
        'Connecte un haut-parleur au micro:bit',
        'Télécharge le code sur la carte et teste-le!',
      ],
      en: [
        'Get a micro:bit board from a store or school',
        'Open makecode.microbit.org in your browser',
        'Create a new project',
        'Add "On start" block and program prayer times',
        'Use the "Music" block to play the call to prayer',
        'Connect a speaker to the micro:bit',
        'Download the code to the board and test it!',
      ],
    },
    color: '#f59e0b', tag: 'micro:bit',
  },
  {
    icon: '🌐',
    titleAr: 'موقع إلكتروني', titleFr: 'Site web', titleEn: 'Website',
    steps: {
      ar: [
        'افتح VSCodium أو أي محرر نصوص',
        'أنشئ ملف index.html جديد',
        'اكتب هيكل HTML الأساسي',
        'أضف عنواناً للموقع باسم "آيات قرآنية"',
        'أضف آيات قرآنية مختارة مع تفسيرها',
        'نسّق الموقع بألوان خضراء وذهبية بـ CSS',
        'افتح الملف في المتصفح واستمتع بموقعك!',
      ],
      fr: [
        'Ouvre VSCodium ou n\'importe quel éditeur de texte',
        'Crée un nouveau fichier index.html',
        'Écris la structure HTML de base',
        'Ajoute un titre "Versets coraniques"',
        'Ajoute des versets coraniques choisis avec leur explication',
        'Stylise le site avec des couleurs vertes et dorées en CSS',
        'Ouvre le fichier dans le navigateur et profite de ton site!',
      ],
      en: [
        'Open VSCodium or any text editor',
        'Create a new index.html file',
        'Write the basic HTML structure',
        'Add a title "Quranic Verses"',
        'Add selected Quranic verses with their explanation',
        'Style the site with green and gold colors using CSS',
        'Open the file in browser and enjoy your website!',
      ],
    },
    color: '#06b6d4', tag: 'HTML/CSS',
  },
  {
    icon: '🧠',
    titleAr: 'مشروع AI', titleFr: 'Projet IA', titleEn: 'AI Project',
    steps: {
      ar: [
        'افتح teachablemachine.withgoogle.com',
        'اختر "مشروع صوت"',
        'أنشئ فئات بأسماء السور (الفاتحة، البقرة...)',
        'سجّل صوتك وأنت تقول اسم كل سورة عدة مرات',
        'اضغط "تدريب النموذج" وانتظر',
        'اختبر النموذج بالتحدث إلى الميكروفون',
        'صدّر النموذج وشاركه!',
      ],
      fr: [
        'Ouvre teachablemachine.withgoogle.com',
        'Choisis "Projet Audio"',
        'Crée des classes avec les noms des sourates',
        'Enregistre ta voix en disant le nom de chaque sourate plusieurs fois',
        'Clique "Entraîner le modèle" et attends',
        'Teste le modèle en parlant dans le microphone',
        'Exporte le modèle et partage-le!',
      ],
      en: [
        'Open teachablemachine.withgoogle.com',
        'Choose "Audio Project"',
        'Create classes with surah names',
        'Record your voice saying each surah name multiple times',
        'Click "Train Model" and wait',
        'Test the model by speaking into the microphone',
        'Export the model and share it!',
      ],
    },
    color: '#8b5cf6', tag: 'AI',
  },
  {
    icon: '✨',
    titleAr: 'مشروعك القادم', titleFr: 'Votre prochain projet', titleEn: 'Your Next Project',
    steps: {
      ar: [
        'فكّر في مشكلة تريد حلها بالتكنولوجيا',
        'ارسم فكرتك على ورقة أولاً',
        'اختر الأداة المناسبة (Scratch, micro:bit, HTML)',
        'ابدأ بخطوة صغيرة واحدة',
        'اطلب مساعدة مشرفك عند الحاجة',
        'اختبر مشروعك مع أصدقائك',
        'شارك مشروعك مع العالم!',
      ],
      fr: [
        'Pense à un problème que tu veux résoudre avec la technologie',
        'Dessine ton idée sur papier d\'abord',
        'Choisis l\'outil approprié (Scratch, micro:bit, HTML)',
        'Commence par une petite étape',
        'Demande l\'aide de ton superviseur si besoin',
        'Teste ton projet avec tes amis',
        'Partage ton projet avec le monde!',
      ],
      en: [
        'Think of a problem you want to solve with technology',
        'Draw your idea on paper first',
        'Choose the right tool (Scratch, micro:bit, HTML)',
        'Start with one small step',
        'Ask your supervisor for help when needed',
        'Test your project with your friends',
        'Share your project with the world!',
      ],
    },
    color: '#1abc9c', tag: '🚀',
  },
];  
return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section style={{background: 'linear-gradient(to bottom, #148f77, #1abc9c)'}} className="text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6">🕌</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#fbbf24'}}>
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{color: '#e0fffe'}}>
            {t('subtitle')}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="register"
              className="font-bold px-8 py-3 rounded-full transition text-lg"
              style={{background: '#fbbf24', color: '#148f77'}}>
              {t('cta_register')}
            </Link>
            <Link href="program"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full transition text-lg">
              {t('cta_program')}
            </Link>
          </div>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="py-12" style={{background: '#e8f8f5'}}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center px-4">
          {[
            { number: '+50', label: t('stats_children') },
            { number: '114', label: t('stats_surahs') },
            { number: '3', label: t('stats_levels') },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold" style={{color: '#1abc9c'}}>{stat.number}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* المسارات التعليمية */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{color: '#148f77'}}>
            {t('tracks_title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 border-2" style={{background: '#e8f8f5', borderColor: '#1abc9c'}}>
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold mb-3" style={{color: '#148f77'}}>
                {t('quran_track')}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>✅ {t('quran_track')}</li>
                <li>✅ التجويد</li>
                <li>✅ التلاوة</li>
                <li>✅ المسابقات</li>
              </ul>
            </div>
            <div className="rounded-2xl p-8 border-2" style={{background: '#fffbeb', borderColor: '#fbbf24'}}>
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-3" style={{color: '#d97706'}}>
                {t('tech_track')}
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>✅ Scratch</li>
                <li>✅ Robotique</li>
                <li>✅ IA</li>
                <li>✅ Projets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* مشغل الصوت */}
      <section className="py-16 px-4" style={{background: '#e8f8f5'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{color: '#148f77'}}>
            {t('listen_title')}
          </h2>
          <p className="text-gray-500 mb-8">{t('listen_subtitle')}</p>
          <AudioPlayer initialSurahId={1} />
        </div>
      </section>

      {/* مشروع الأسبوع */}
      <section className="py-16 px-4" style={{background: '#f0fdf9'}}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden" style={{border: '3px solid #1abc9c'}}>
            <div className="p-2 text-center text-white text-sm font-bold" style={{background: '#1abc9c'}}>
              🌟 {locale === 'ar' ? 'مشروع الأسبوع' : locale === 'fr' ? 'Projet de la semaine' : 'Project of the Week'}
            </div>
            <div className="p-8 md:flex items-center gap-8">
              <div className="text-8xl text-center mb-6 md:mb-0">🎮</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3" style={{color: '#148f77'}}>
                  {locale === 'ar' ? 'صممنا لعبة لتعلم أسماء سور القرآن' :
                   locale === 'fr' ? 'Nous avons créé un jeu pour apprendre les noms des sourates' :
                   'We designed a game to learn Quran surah names'}
                </h2>
                <p className="text-gray-500 mb-4 text-sm">
                  {locale === 'ar' ? 'قام أطفال المستوى الثاني ببرمجة لعبة تفاعلية باستخدام Scratch تساعد على حفظ أسماء سور القرآن الكريم بطريقة ممتعة.' :
                   locale === 'fr' ? 'Les enfants du niveau 2 ont programmé un jeu interactif avec Scratch pour mémoriser les noms des sourates.' :
                   'Level 2 children programmed an interactive Scratch game to memorize Quran surah names in a fun way.'}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full text-white font-bold" style={{background: '#1abc9c'}}>Scratch</span>
                  <span className="text-xs px-3 py-1 rounded-full text-white font-bold" style={{background: '#fbbf24', color: '#78350f'}}>
                    {locale === 'ar' ? 'المستوى 2' : locale === 'fr' ? 'Niveau 2' : 'Level 2'}
                  </span>
                  <a
                    href="#projects"
                    className="flex items-center gap-1 text-sm font-bold transition hover:opacity-80"
                    style={{color: '#1abc9c'}}
                  >
                    {locale === 'ar' ? 'اكتشف المشروع ←' : locale === 'fr' ? 'Découvrir le projet →' : 'Discover the project →'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ماذا صنع أطفالنا */}
      <section id="projects" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold" style={{color: '#148f77'}}>
              👨‍💻 {locale === 'ar' ? 'ماذا صنع أطفالنا؟' : locale === 'fr' ? 'Que font nos enfants?' : 'What did our children make?'}
            </h2>
            <p className="text-gray-400 mt-2">
              {locale === 'ar' ? 'مشاريع حقيقية صنعها أطفال بين 6 و 12 سنة' :
               locale === 'fr' ? 'De vrais projets créés par des enfants de 6 à 12 ans' :
               'Real projects made by children aged 6 to 12'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: '🎮',
                titleAr: 'لعبة تعليمية', titleFr: 'Jeu éducatif', titleEn: 'Educational Game',
                descAr: 'لعبة Scratch لتعلم أسماء السور',
                descFr: 'Jeu Scratch pour apprendre les sourates',
                descEn: 'Scratch game to learn surah names',
                tag: 'Scratch', color: '#1abc9c',
                level: locale === 'ar' ? 'المستوى 1' : locale === 'fr' ? 'Niveau 1' : 'Level 1',
              },
              {
                icon: '📱',
                titleAr: 'تطبيق صغير', titleFr: 'Mini application', titleEn: 'Mini App',
                descAr: 'تطبيق لحفظ الأدعية اليومية',
                descFr: 'Application pour mémoriser les douaas',
                descEn: 'App to memorize daily duas',
                tag: 'Scratch', color: '#fbbf24',
                level: locale === 'ar' ? 'المستوى 2' : locale === 'fr' ? 'Niveau 2' : 'Level 2',
              },
              {
                icon: '🤖',
                titleAr: 'روبوت ذكي', titleFr: 'Robot intelligent', titleEn: 'Smart Robot',
                descAr: 'روبوت يؤذن في أوقات الصلاة',
                descFr: 'Robot qui appelle à la prière',
                descEn: 'Robot that calls to prayer',
                tag: 'micro:bit', color: '#f59e0b',
                level: locale === 'ar' ? 'المستوى 2' : locale === 'fr' ? 'Niveau 2' : 'Level 2',
              },
              {
                icon: '🌐',
                titleAr: 'موقع إلكتروني', titleFr: 'Site web', titleEn: 'Website',
                descAr: 'موقع لعرض آيات قرآنية مختارة',
                descFr: 'Site pour afficher des versets coraniques',
                descEn: 'Website to display selected Quranic verses',
                tag: 'HTML/CSS', color: '#06b6d4',
                level: locale === 'ar' ? 'المستوى 3' : locale === 'fr' ? 'Niveau 3' : 'Level 3',
              },
              {
                icon: '🧠',
                titleAr: 'مشروع AI', titleFr: 'Projet IA', titleEn: 'AI Project',
                descAr: 'نموذج يتعرف على أسماء السور بالصوت',
                descFr: 'Modèle qui reconnaît les sourates par la voix',
                descEn: 'Model that recognizes surahs by voice',
                tag: 'AI', color: '#8b5cf6',
                level: locale === 'ar' ? 'المستوى 3' : locale === 'fr' ? 'Niveau 3' : 'Level 3',
              },
              {
                icon: '✨',
                titleAr: 'مشروعك القادم', titleFr: 'Votre prochain projet', titleEn: 'Your Next Project',
                descAr: 'انضم وابدأ مشروعك الخاص اليوم!',
                descFr: 'Rejoignez-nous et commencez votre projet!',
                descEn: 'Join us and start your own project today!',
                tag: '🚀', color: '#1abc9c', level: '',
              },
            ].map((project, i) => (
  <div
    key={i}
    onClick={() => setSelectedProject(i)}
    className="rounded-3xl p-5 shadow-md transition hover:scale-105 cursor-pointer"
                style={{
                  background: i === 5 ? `${project.color}15` : 'white',
                  border: `3px solid ${project.color}`,
                }}
              >
                <div className="text-5xl mb-3 text-center">{project.icon}</div>
                <h3 className="font-bold text-center mb-1" style={{color: project.color}}>
                  {locale === 'ar' ? project.titleAr : locale === 'fr' ? project.titleFr : project.titleEn}
                </h3>
                <p className="text-xs text-gray-400 text-center mb-3">
                  {locale === 'ar' ? project.descAr : locale === 'fr' ? project.descFr : project.descEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full text-white font-bold" style={{background: project.color}}>
                    {project.tag}
                  </span>
                  {project.level && (
                    <span className="text-xs text-gray-400 font-bold">{project.level}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white text-center py-6" style={{background: '#148f77'}}>
        <p className="text-sm" style={{color: '#ccfffd'}}>
          جميع الحقوق محفوظة — عليوي حمزة — {t('title')} © 2026
        </p>
      </footer>
      {/* نافذة تفاصيل المشروع */}
{selectedProject !== null && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{background: 'rgba(0,0,0,0.6)'}}
    onClick={() => setSelectedProject(null)}
  >
    <div
      className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-screen overflow-y-auto"
      style={{border: `4px solid ${projectDetails[selectedProject].color}`}}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{projectDetails[selectedProject].icon}</span>
          <h2 className="text-xl font-bold" style={{color: projectDetails[selectedProject].color}}>
            {locale === 'ar' ? projectDetails[selectedProject].titleAr :
             locale === 'fr' ? projectDetails[selectedProject].titleFr :
             projectDetails[selectedProject].titleEn}
          </h2>
        </div>
        <button
          onClick={() => setSelectedProject(null)}
          className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >✕</button>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-4 text-lg" style={{color: '#148f77'}}>
          {locale === 'ar' ? '🛠️ كيف تصنعه؟' : locale === 'fr' ? '🛠️ Comment le faire?' : '🛠️ How to make it?'}
        </h3>
        <div className="space-y-3">
          {projectDetails[selectedProject].steps[locale as 'ar' | 'fr' | 'en'].map((step, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{background: '#f0fdf9'}}>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{background: projectDetails[selectedProject].color}}
              >
                {i + 1}
              </span>
              <p className="text-sm text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <span
          className="px-4 py-2 rounded-2xl text-white text-sm font-bold"
          style={{background: projectDetails[selectedProject].color}}
        >
          {projectDetails[selectedProject].tag}
        </span>
        <button
          onClick={() => setSelectedProject(null)}
          className="flex-1 py-2 rounded-2xl font-bold transition hover:opacity-90"
          style={{background: '#e8f8f5', color: '#148f77'}}
        >
          {locale === 'ar' ? 'حسناً، سأجرب!' : locale === 'fr' ? 'OK, je vais essayer!' : 'OK, I\'ll try it!'}
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  
);
}