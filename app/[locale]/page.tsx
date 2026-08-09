import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/shared/Navbar';
import AudioPlayer from '@/components/quran/AudioPlayer';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section style={{background: 'linear-gradient(to bottom, #006a67, #079992)'}} className="text-white py-20 px-4 text-center">
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
              style={{background: '#fbbf24', color: '#006a67'}}>
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
      <section className="py-12" style={{background: '#e6fffe'}}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center px-4">
          {[
            { number: '+50', label: t('stats_children') },
            { number: '114', label: t('stats_surahs') },
            { number: '3', label: t('stats_levels') },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold" style={{color: '#079992'}}>{stat.number}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* المسارات التعليمية */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{color: '#006a67'}}>
            {t('tracks_title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 border-2" style={{background: '#e6fffe', borderColor: '#079992'}}>
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold mb-3" style={{color: '#006a67'}}>
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
      <section className="py-16 px-4" style={{background: '#e6fffe'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{color: '#006a67'}}>
            {t('listen_title')}
          </h2>
          <p className="text-gray-500 mb-8">{t('listen_subtitle')}</p>
          <AudioPlayer initialSurahId={1} />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white text-center py-6" style={{background: '#006a67'}}>
        <p className="text-sm" style={{color: '#ccfffd'}}>
          © 2025 {t('title')} — جميع الحقوق محفوظة
        </p>
      </footer>
    </main>
  );
}