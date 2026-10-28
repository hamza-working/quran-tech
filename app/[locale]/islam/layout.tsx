import type { Metadata } from 'next';

const titles = {
  ar: 'إسلام — أركان الإسلام وأركان الصلاة وأذكار الصباح والمساء | القرآن والتكنولوجيا',
  fr: 'Apprends ta religion — Piliers de l’islam, de la prière et adhkar | Coran & Technologie',
  en: 'Learn Your Religion — Pillars of Islam, Prayer and Daily Adhkar | Quran & Technology',
};
const descriptions = {
  ar: 'تعلّم أساسيات الإسلام، وأركان الصلاة، وحافظ على أذكارك اليومية: أذكار الصباح والمساء مع عدّاد للتكرار ومصادر موثقة.',
  fr: 'Apprends les bases de l’islam, les piliers de la prière et garde tes adhkar quotidiens du matin et du soir, avec compteur et sources.',
  en: 'Learn the basics of Islam, the pillars of prayer, and keep up with your daily morning and evening adhkar with a counter and sources.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (locale in titles ? locale : 'ar') as keyof typeof titles;
  return {
    title: titles[l],
    description: descriptions[l],
    alternates: {
      canonical: `https://quran-techn.netlify.app/${l}/islam`,
      languages: {
        ar: 'https://quran-techn.netlify.app/ar/islam',
        fr: 'https://quran-techn.netlify.app/fr/islam',
        en: 'https://quran-techn.netlify.app/en/islam',
      },
    },
  };
}

export default function IslamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
