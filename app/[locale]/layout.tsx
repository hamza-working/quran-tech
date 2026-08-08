import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import PWAInstall from '@/components/PWAInstall';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'القرآن والتكنولوجيا',
  description: 'نجمع بين حفظ القرآن الكريم وتعلم التكنولوجيا للأطفال',
  manifest: '/manifest.json',
};

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
          
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#006a67" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="قرآن وتك" />
  </head>
 <body className="bg-white text-gray-900 font-cairo" suppressHydrationWarning>
  <NextIntlClientProvider messages={messages}>
    {children}
    <PWAInstall />
  </NextIntlClientProvider>
</body>
    </html>
  );
}