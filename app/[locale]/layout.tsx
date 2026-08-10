import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import '../globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const titles = {
    ar: 'القرآن والتكنولوجيا — تعلم القرآن والبرمجة للأطفال',
    fr: 'Coran & Technologie — Apprendre le Coran et la programmation pour enfants',
    en: 'Quran & Technology — Learn Quran and Programming for Kids',
  };

  const descriptions = {
    ar: 'منصة تعليمية متكاملة تجمع بين حفظ القرآن الكريم وتعلم البرمجة والروبوتيكس والذكاء الاصطناعي للأطفال من 6 إلى 12 سنة في المغرب',
    fr: 'Plateforme éducative complète combinant la mémorisation du Coran et l\'apprentissage de la programmation, de la robotique et de l\'IA pour les enfants de 6 à 12 ans au Maroc',
    en: 'A comprehensive educational platform combining Quran memorization and learning programming, robotics and AI for children aged 6 to 12 in Morocco',
  };

  const keywords = {
    ar: 'القرآن, تكنولوجيا, أطفال, المغرب, برمجة, روبوتيكس, ذكاء اصطناعي, حفظ القرآن, تجويد, Scratch',
    fr: 'Coran, technologie, enfants, Maroc, programmation, robotique, IA, mémorisation, tajwid, Scratch',
    en: 'Quran, technology, children, Morocco, programming, robotics, AI, memorization, tajweed, Scratch',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.ar,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.ar,
    keywords: keywords[locale as keyof typeof keywords] || keywords.ar,
    authors: [{ name: 'عليوي حمزة' }],
    creator: 'عليوي حمزة',
    publisher: 'القرآن والتكنولوجيا',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://quran-techn.netlify.app',
      siteName: 'القرآن والتكنولوجيا',
      title: titles[locale as keyof typeof titles] || titles.ar,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.ar,
      images: [
        {
          url: 'https://quran-techn.netlify.app/og-image.png',
          width: 1200,
          height: 630,
          alt: 'القرآن والتكنولوجيا',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.ar,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.ar,
    },
    alternates: {
      canonical: 'https://quran-techn.netlify.app',
      languages: {
        'ar': 'https://quran-techn.netlify.app/ar',
        'fr': 'https://quran-techn.netlify.app/fr',
        'en': 'https://quran-techn.netlify.app/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={cairo.variable}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var darkMode = localStorage.getItem('darkMode');
                if (darkMode === 'true') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })();
          `
        }} />
        <meta name="google-site-verification" content="38pkk5hCr98IRpZMrmID4wRVjjmU0yD2m7B5nKpUIGw" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1abc9c" />
        <link rel="canonical" href="https://quran-techn.netlify.app" />
      </head>
      <body className="bg-white text-gray-900 font-cairo" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}