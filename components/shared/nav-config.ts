// Shared navigation labels (moved verbatim from Navbar so Navbar and Footer stay in sync).
export type NavLocale = 'ar' | 'fr' | 'en';

export const navTexts = {
  ar: { home: 'الرئيسية', program: 'البرنامج', learn: 'التعلم', english: 'الإنجليزية', french: 'الفرنسية', tajweed: 'التجويد', technology: 'التكنولوجيا', quiz: 'الاختبار', dashboard: 'تقدمي', contact: 'التواصل', mushaf: 'المصحف', islam: 'تعلّم دينك' },
  fr: { home: 'Accueil', program: 'Programme', learn: 'Apprendre', english: 'Anglais', french: 'Français', tajweed: 'Tajwid', technology: 'Technologie', quiz: 'Quiz', dashboard: 'Progrès', contact: 'Contact', mushaf: 'Mushaf', islam: 'Apprendre l’islam' },
  en: { home: 'Home', program: 'Program', learn: 'Learn', english: 'English', french: 'French', tajweed: 'Tajweed', technology: 'Technology', quiz: 'Quiz', dashboard: 'Progress', contact: 'Contact', mushaf: 'Mushaf', islam: 'Learn Islam' },
} as const;

export const brandName = {
  ar: 'القرآن والتكنولوجيا',
  fr: 'Coran & Tech',
  en: 'Quran & Tech',
} as const;

export const languages = [
  { code: 'ar', label: 'العربية', short: 'ع' },
  { code: 'fr', label: 'Français', short: 'Fr' },
  { code: 'en', label: 'English', short: 'En' },
] as const;
