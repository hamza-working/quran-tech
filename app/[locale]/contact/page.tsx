'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/shared/Navbar';

const whatsappUrl = 'https://wa.me/212600000000';
const emailUrl = 'mailto:info@quran-tech.ma';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">💬</div>
          <h1 className="text-4xl font-bold" style={{color: '#0e6b55'}}>{t('title')}</h1>
          <p className="text-gray-400 mt-2">{t('subtitle')}</p>
        </div>

        <div className="grid gap-5">
          <a href={whatsappUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-5 rounded-3xl p-6 transition hover:opacity-90"
            style={{background: 'linear-gradient(135deg, #25d366, #128c7e)', color: 'white', boxShadow: '0 8px 25px rgba(37,211,102,0.3)'}}>
            <div className="text-5xl">💬</div>
            <div>
              <div className="font-bold text-xl">{t('whatsapp')}</div>
              <div className="opacity-80 text-sm mt-1">{t('whatsapp_sub')}</div>
            </div>
          </a>

          <a href={emailUrl}
            className="flex items-center gap-5 rounded-3xl p-6 transition hover:opacity-90"
            style={{background: 'linear-gradient(135deg, #fbbf24, #d97706)', color: '#0e6b55', boxShadow: '0 8px 25px rgba(251,191,36,0.3)'}}>
            <div className="text-5xl">📧</div>
            <div>
              <div className="font-bold text-xl">{t('email')}</div>
              <div className="opacity-80 text-sm mt-1">info@quran-tech.ma</div>
            </div>
          </a>

          <div className="flex items-center gap-5 rounded-3xl p-6"
            style={{background: 'white', border: '3px solid #079992', boxShadow: '0 8px 25px rgba(0,206,201,0.15)'}}>
            <div className="text-5xl">📍</div>
            <div>
              <div className="font-bold text-xl" style={{color: '#0e6b55'}}>{t('location')}</div>
              <div className="text-gray-400 text-sm mt-1">{t('location_value')}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl p-8" style={{border: '3px solid #079992'}}>
          <h2 className="text-2xl font-bold mb-6 text-center" style={{color: '#0e6b55'}}>{t('form_title')}</h2>
          <div className="space-y-4">
            <input type="text" placeholder={t('form_name')}
              className="w-full rounded-2xl px-4 py-3 text-right outline-none"
              style={{border: '2px solid #a9dfbf'}} />
            <input type="email" placeholder={t('form_email')}
              className="w-full rounded-2xl px-4 py-3 text-right outline-none"
              style={{border: '2px solid #a9dfbf'}} />
            <textarea placeholder={t('form_message')} rows={4}
              className="w-full rounded-2xl px-4 py-3 text-right outline-none resize-none"
              style={{border: '2px solid #a9dfbf'}} />
            <button className="w-full font-bold py-4 rounded-2xl text-lg text-white transition hover:opacity-90"
              style={{background: 'linear-gradient(135deg, #079992, #0e6b55)'}}>
              {t('form_submit')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}