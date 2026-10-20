// Religious reference data (kept separate from UI translations).
// Arabic names and citations are content; explanations live in messages/*.json under "islam".

export const ISLAM_PILLARS = [
  { id: 'shahada', icon: 'Sparkles', ar: 'الشهادتان', refs: ['سورة محمد، الآية 19'] },
  { id: 'salah', icon: 'Landmark', ar: 'إقامة الصلاة', refs: ['سورة البقرة، الآية 43'] },
  { id: 'zakat', icon: 'Coins', ar: 'إيتاء الزكاة', refs: ['سورة البقرة، الآية 43', 'سورة التوبة، الآية 60'] },
  { id: 'sawm', icon: 'Moon', ar: 'صوم رمضان', refs: ['سورة البقرة، الآية 183'] },
  { id: 'hajj', icon: 'Mountain', ar: 'حج البيت لمن استطاع إليه سبيلًا', refs: ['سورة آل عمران، الآية 97'] },
] as const;

export type PillarId = (typeof ISLAM_PILLARS)[number]['id'];

/** Hadith of the five pillars — cited by reference only; wording differs slightly between narrations. */
export const PILLARS_HADITH_REF = 'متفق عليه: رواه البخاري (8) ومسلم (16)، عن عبد الله بن عمر رضي الله عنهما';

export type SalahKind = 'pillar' | 'obligatory' | 'sunnah';

export interface SalahItem {
  id: string;
  kind: SalahKind;
  ar: string;
}

// Classification follows the Hanbali school as presented in «دليل الطالب» and in
// «رسالة في شروط الصلاة وأركانها وواجباتها» (Muhammad ibn Abd al-Wahhab): 14 pillars, 8 obligatory acts.
export const SALAH_PILLARS: SalahItem[] = [
  { id: 'qiyam', kind: 'pillar', ar: 'القيام مع القدرة في الفرض' },
  { id: 'takbir', kind: 'pillar', ar: 'تكبيرة الإحرام' },
  { id: 'fatiha', kind: 'pillar', ar: 'قراءة الفاتحة' },
  { id: 'ruku', kind: 'pillar', ar: 'الركوع' },
  { id: 'itidal', kind: 'pillar', ar: 'الرفع من الركوع والاعتدال قائمًا' },
  { id: 'sujud', kind: 'pillar', ar: 'السجود على الأعضاء السبعة' },
  { id: 'raf', kind: 'pillar', ar: 'الرفع من السجود' },
  { id: 'jalsa', kind: 'pillar', ar: 'الجلسة بين السجدتين' },
  { id: 'tuma', kind: 'pillar', ar: 'الطمأنينة في جميع الأفعال' },
  { id: 'tashahhud', kind: 'pillar', ar: 'التشهد الأخير' },
  { id: 'julus', kind: 'pillar', ar: 'الجلوس للتشهد الأخير' },
  { id: 'salawat', kind: 'pillar', ar: 'الصلاة على النبي ﷺ' },
  { id: 'taslim', kind: 'pillar', ar: 'التسليمتان' },
  { id: 'tartib', kind: 'pillar', ar: 'الترتيب بين الأركان' },
];

export const SALAH_OBLIGATORY: SalahItem[] = [
  { id: 'takbirat', kind: 'obligatory', ar: 'التكبير لغير الإحرام' },
  { id: 'tasmi', kind: 'obligatory', ar: 'قول «سمع الله لمن حمده» للإمام والمنفرد' },
  { id: 'tahmid', kind: 'obligatory', ar: 'قول «ربنا ولك الحمد»' },
  { id: 'tasbih_ruku', kind: 'obligatory', ar: 'قول «سبحان ربي العظيم» في الركوع' },
  { id: 'tasbih_sujud', kind: 'obligatory', ar: 'قول «سبحان ربي الأعلى» في السجود' },
  { id: 'rabbighfir', kind: 'obligatory', ar: 'قول «رب اغفر لي» بين السجدتين' },
  { id: 'tashahhud1', kind: 'obligatory', ar: 'التشهد الأول' },
  { id: 'julus1', kind: 'obligatory', ar: 'الجلوس للتشهد الأول' },
];

// A few examples only — the sources list more.
export const SALAH_SUNAN: SalahItem[] = [
  { id: 'raf_yadayn', kind: 'sunnah', ar: 'رفع اليدين مع تكبيرة الإحرام' },
  { id: 'istiftah', kind: 'sunnah', ar: 'دعاء الاستفتاح' },
  { id: 'surah', kind: 'sunnah', ar: 'قراءة سورة بعد الفاتحة' },
  { id: 'tasbih_more', kind: 'sunnah', ar: 'ما زاد على المرة الواحدة في تسبيح الركوع والسجود' },
];

export const SALAH_SOURCES = [
  '«دليل الطالب» لمرعي بن يوسف الكرمي (مختصر في الفقه الحنبلي)',
  '«رسالة في شروط الصلاة وأركانها وواجباتها» للشيخ محمد بن عبد الوهاب',
];
