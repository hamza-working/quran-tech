'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Navbar from '@/components/shared/Navbar';
import SuccessAnimation from '@/components/SuccessAnimation';

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
  { id: 1, type: 'qcm', category: 'religious',
    ar: { question: 'كم عدد سور القرآن الكريم؟', options: ['100', '114', '120', '110'], answer: '114' },
    fr: { question: 'Combien de sourates contient le Coran?', options: ['100', '114', '120', '110'], answer: '114' },
    en: { question: 'How many surahs are in the Quran?', options: ['100', '114', '120', '110'], answer: '114' },
  },
  { id: 2, type: 'truefalse', category: 'religious',
    ar: { question: 'سورة البقرة هي أطول سورة في القرآن الكريم', answer: true },
    fr: { question: 'Al-Baqara est la sourate la plus longue du Coran', answer: true },
    en: { question: 'Al-Baqara is the longest surah in the Quran', answer: true },
  },
  { id: 3, type: 'qcm', category: 'religious',
    ar: { question: 'كم عدد أركان الإسلام؟', options: ['3', '4', '5', '6'], answer: '5' },
    fr: { question: 'Combien de piliers de l\'Islam y a-t-il?', options: ['3', '4', '5', '6'], answer: '5' },
    en: { question: 'How many pillars of Islam are there?', options: ['3', '4', '5', '6'], answer: '5' },
  },
  { id: 4, type: 'truefalse', category: 'religious',
    ar: { question: 'النبي محمد ﷺ وُلد في المدينة المنورة', answer: false },
    fr: { question: 'Le Prophète Muhammad ﷺ est né à Médine', answer: false },
    en: { question: 'Prophet Muhammad ﷺ was born in Medina', answer: false },
  },
  { id: 5, type: 'qcm', category: 'religious',
    ar: { question: 'ما هي أول سورة نزلت من القرآن الكريم؟', options: ['الفاتحة', 'العلق', 'البقرة', 'الإخلاص'], answer: 'العلق' },
    fr: { question: 'Quelle est la première sourate révélée du Coran?', options: ['Al-Fatiha', 'Al-Alaq', 'Al-Baqara', 'Al-Ikhlas'], answer: 'Al-Alaq' },
    en: { question: 'What is the first revealed surah of the Quran?', options: ['Al-Fatiha', 'Al-Alaq', 'Al-Baqara', 'Al-Ikhlas'], answer: 'Al-Alaq' },
  },
  { id: 6, type: 'truefalse', category: 'religious',
    ar: { question: 'الصلوات المفروضة في اليوم خمس صلوات', answer: true },
    fr: { question: 'Les prières obligatoires sont au nombre de cinq par jour', answer: true },
    en: { question: 'The obligatory prayers are five per day', answer: true },
  },
  { id: 7, type: 'qcm', category: 'religious',
    ar: { question: 'ما هو شهر الصيام في الإسلام؟', options: ['محرم', 'رجب', 'رمضان', 'شعبان'], answer: 'رمضان' },
    fr: { question: 'Quel est le mois de jeûne en Islam?', options: ['Mouharram', 'Rajab', 'Ramadan', 'Chaabane'], answer: 'Ramadan' },
    en: { question: 'What is the month of fasting in Islam?', options: ['Muharram', 'Rajab', 'Ramadan', 'Shaban'], answer: 'Ramadan' },
  },
  { id: 8, type: 'truefalse', category: 'religious',
    ar: { question: 'الكعبة المشرفة توجد في مكة المكرمة', answer: true },
    fr: { question: 'La Kaaba se trouve à La Mecque', answer: true },
    en: { question: 'The Kaaba is located in Mecca', answer: true },
  },
  { id: 9, type: 'qcm', category: 'religious',
    ar: { question: 'كم عدد أنبياء الله المذكورين في القرآن؟', options: ['15', '20', '25', '30'], answer: '25' },
    fr: { question: 'Combien de prophètes sont mentionnés dans le Coran?', options: ['15', '20', '25', '30'], answer: '25' },
    en: { question: 'How many prophets are mentioned in the Quran?', options: ['15', '20', '25', '30'], answer: '25' },
  },
  { id: 10, type: 'truefalse', category: 'religious',
    ar: { question: 'الزكاة هي الركن الثالث من أركان الإسلام', answer: true },
    fr: { question: 'La Zakat est le troisième pilier de l\'Islam', answer: true },
    en: { question: 'Zakat is the third pillar of Islam', answer: true },
  },
  { id: 11, type: 'qcm', category: 'religious',
    ar: { question: 'ما هو اسم والد النبي إبراهيم عليه السلام؟', options: ['آزر', 'نوح', 'إسحاق', 'يعقوب'], answer: 'آزر' },
    fr: { question: 'Quel est le nom du père du prophète Ibrahim?', options: ['Azar', 'Noé', 'Isaac', 'Jacob'], answer: 'Azar' },
    en: { question: 'What is the name of Prophet Ibrahim\'s father?', options: ['Azar', 'Noah', 'Isaac', 'Jacob'], answer: 'Azar' },
  },
  { id: 12, type: 'truefalse', category: 'religious',
    ar: { question: 'سورة الإخلاص تعادل ثلث القرآن الكريم', answer: true },
    fr: { question: 'La sourate Al-Ikhlas équivaut au tiers du Coran', answer: true },
    en: { question: 'Surah Al-Ikhlas equals one third of the Quran', answer: true },
  },
  // علمي
  { id: 13, type: 'qcm', category: 'scientific',
    ar: { question: 'كم عدد كواكب المجموعة الشمسية؟', options: ['7', '8', '9', '10'], answer: '8' },
    fr: { question: 'Combien de planètes dans le système solaire?', options: ['7', '8', '9', '10'], answer: '8' },
    en: { question: 'How many planets are in the solar system?', options: ['7', '8', '9', '10'], answer: '8' },
  },
  { id: 14, type: 'truefalse', category: 'scientific',
    ar: { question: 'الشمس نجم وليست كوكباً', answer: true },
    fr: { question: 'Le Soleil est une étoile et non une planète', answer: true },
    en: { question: 'The Sun is a star, not a planet', answer: true },
  },
  { id: 15, type: 'qcm', category: 'scientific',
    ar: { question: 'ما هو أسرع حيوان على الأرض؟', options: ['الأسد', 'النمر', 'الفهد', 'الحصان'], answer: 'الفهد' },
    fr: { question: 'Quel est l\'animal le plus rapide sur terre?', options: ['Lion', 'Tigre', 'Guépard', 'Cheval'], answer: 'Guépard' },
    en: { question: 'What is the fastest animal on land?', options: ['Lion', 'Tiger', 'Cheetah', 'Horse'], answer: 'Cheetah' },
  },
  { id: 16, type: 'truefalse', category: 'scientific',
    ar: { question: 'الماء يتجمد عند درجة 0 مئوية', answer: true },
    fr: { question: 'L\'eau gèle à 0 degré Celsius', answer: true },
    en: { question: 'Water freezes at 0 degrees Celsius', answer: true },
  },
  { id: 17, type: 'qcm', category: 'scientific',
    ar: { question: 'ما هو أكبر كوكب في المجموعة الشمسية؟', options: ['زحل', 'المشتري', 'أورانوس', 'نبتون'], answer: 'المشتري' },
    fr: { question: 'Quelle est la plus grande planète du système solaire?', options: ['Saturne', 'Jupiter', 'Uranus', 'Neptune'], answer: 'Jupiter' },
    en: { question: 'What is the largest planet in the solar system?', options: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'], answer: 'Jupiter' },
  },
  { id: 18, type: 'truefalse', category: 'scientific',
    ar: { question: 'الأرض هي ثالث كوكب من الشمس', answer: true },
    fr: { question: 'La Terre est la troisième planète du Soleil', answer: true },
    en: { question: 'Earth is the third planet from the Sun', answer: true },
  },
  { id: 19, type: 'qcm', category: 'scientific',
    ar: { question: 'كم يبلغ عدد عظام جسم الإنسان البالغ؟', options: ['186', '206', '226', '246'], answer: '206' },
    fr: { question: 'Combien d\'os y a-t-il dans le corps humain adulte?', options: ['186', '206', '226', '246'], answer: '206' },
    en: { question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'], answer: '206' },
  },
  { id: 20, type: 'truefalse', category: 'scientific',
    ar: { question: 'الأوكسجين ضروري للتنفس', answer: true },
    fr: { question: 'L\'oxygène est nécessaire à la respiration', answer: true },
    en: { question: 'Oxygen is necessary for breathing', answer: true },
  },
  { id: 21, type: 'qcm', category: 'scientific',
    ar: { question: 'ما هو أصغر كوكب في المجموعة الشمسية؟', options: ['المريخ', 'الزهرة', 'عطارد', 'بلوتو'], answer: 'عطارد' },
    fr: { question: 'Quelle est la plus petite planète du système solaire?', options: ['Mars', 'Vénus', 'Mercure', 'Pluton'], answer: 'Mercure' },
    en: { question: 'What is the smallest planet in the solar system?', options: ['Mars', 'Venus', 'Mercury', 'Pluto'], answer: 'Mercury' },
  },
  { id: 22, type: 'truefalse', category: 'scientific',
    ar: { question: 'الضوء أسرع من الصوت', answer: true },
    fr: { question: 'La lumière est plus rapide que le son', answer: true },
    en: { question: 'Light is faster than sound', answer: true },
  },
  { id: 23, type: 'qcm', category: 'scientific',
    ar: { question: 'ما هو الغاز الأكثر وفرة في الغلاف الجوي للأرض؟', options: ['الأوكسجين', 'ثاني أكسيد الكربون', 'النيتروجين', 'الهيدروجين'], answer: 'النيتروجين' },
    fr: { question: 'Quel est le gaz le plus abondant dans l\'atmosphère terrestre?', options: ['Oxygène', 'CO2', 'Azote', 'Hydrogène'], answer: 'Azote' },
    en: { question: 'What is the most abundant gas in Earth\'s atmosphere?', options: ['Oxygen', 'CO2', 'Nitrogen', 'Hydrogen'], answer: 'Nitrogen' },
  },
  { id: 24, type: 'truefalse', category: 'scientific',
    ar: { question: 'القمر يدور حول الأرض', answer: true },
    fr: { question: 'La Lune tourne autour de la Terre', answer: true },
    en: { question: 'The Moon orbits the Earth', answer: true },
  },
  // ثقافي
  { id: 25, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي عاصمة المغرب؟', options: ['الدار البيضاء', 'مراكش', 'الرباط', 'فاس'], answer: 'الرباط' },
    fr: { question: 'Quelle est la capitale du Maroc?', options: ['Casablanca', 'Marrakech', 'Rabat', 'Fès'], answer: 'Rabat' },
    en: { question: 'What is the capital of Morocco?', options: ['Casablanca', 'Marrakech', 'Rabat', 'Fes'], answer: 'Rabat' },
  },
  { id: 26, type: 'truefalse', category: 'cultural',
    ar: { question: 'برج إيفل موجود في لندن', answer: false },
    fr: { question: 'La Tour Eiffel se trouve à Londres', answer: false },
    en: { question: 'The Eiffel Tower is located in London', answer: false },
  },
  { id: 27, type: 'qcm', category: 'cultural',
    ar: { question: 'من اخترع الهاتف؟', options: ['توماس إديسون', 'ألكسندر غراهام بيل', 'نيكولا تيسلا', 'أينشتاين'], answer: 'ألكسندر غراهام بيل' },
    fr: { question: 'Qui a inventé le téléphone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Einstein'], answer: 'Alexander Graham Bell' },
    en: { question: 'Who invented the telephone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Einstein'], answer: 'Alexander Graham Bell' },
  },
  { id: 28, type: 'truefalse', category: 'cultural',
    ar: { question: 'لغة البرمجة Python سميت على اسم ثعبان', answer: false },
    fr: { question: 'Python a été nommé d\'après un serpent', answer: false },
    en: { question: 'Python programming language was named after a snake', answer: false },
  },
  { id: 29, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي أطول نهر في العالم؟', options: ['الأمازون', 'النيل', 'المسيسيبي', 'اليانغتسي'], answer: 'النيل' },
    fr: { question: 'Quel est le plus long fleuve du monde?', options: ['Amazone', 'Nil', 'Mississippi', 'Yangtsé'], answer: 'Nil' },
    en: { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], answer: 'Nile' },
  },
  { id: 30, type: 'truefalse', category: 'cultural',
    ar: { question: 'الصين هي أكبر دولة من حيث المساحة في العالم', answer: false },
    fr: { question: 'La Chine est le plus grand pays du monde par superficie', answer: false },
    en: { question: 'China is the largest country in the world by area', answer: false },
  },
  { id: 31, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي أكبر قارة في العالم؟', options: ['أفريقيا', 'أمريكا الشمالية', 'آسيا', 'أوروبا'], answer: 'آسيا' },
    fr: { question: 'Quel est le plus grand continent du monde?', options: ['Afrique', 'Amérique du Nord', 'Asie', 'Europe'], answer: 'Asie' },
    en: { question: 'What is the largest continent in the world?', options: ['Africa', 'North America', 'Asia', 'Europe'], answer: 'Asia' },
  },
  { id: 32, type: 'truefalse', category: 'cultural',
    ar: { question: 'المحيط الهادئ هو أكبر محيط في العالم', answer: true },
    fr: { question: 'L\'océan Pacifique est le plus grand océan du monde', answer: true },
    en: { question: 'The Pacific Ocean is the largest ocean in the world', answer: true },
  },
  { id: 33, type: 'qcm', category: 'cultural',
    ar: { question: 'كم عدد دول العالم تقريباً؟', options: ['150', '175', '193', '210'], answer: '193' },
    fr: { question: 'Combien de pays y a-t-il dans le monde?', options: ['150', '175', '193', '210'], answer: '193' },
    en: { question: 'How many countries are there in the world?', options: ['150', '175', '193', '210'], answer: '193' },
  },
  { id: 34, type: 'truefalse', category: 'cultural',
    ar: { question: 'اللغة العربية تكتب من اليمين إلى اليسار', answer: true },
    fr: { question: 'La langue arabe s\'écrit de droite à gauche', answer: true },
    en: { question: 'The Arabic language is written from right to left', answer: true },
  },
  { id: 35, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي عاصمة فرنسا؟', options: ['برلين', 'روما', 'باريس', 'مدريد'], answer: 'باريس' },
    fr: { question: 'Quelle est la capitale de la France?', options: ['Berlin', 'Rome', 'Paris', 'Madrid'], answer: 'Paris' },
    en: { question: 'What is the capital of France?', options: ['Berlin', 'Rome', 'Paris', 'Madrid'], answer: 'Paris' },
  },
  { id: 36, type: 'truefalse', category: 'cultural',
    ar: { question: 'جبل إيفرست هو أعلى جبل في العالم', answer: true },
    fr: { question: 'L\'Everest est la plus haute montagne du monde', answer: true },
    en: { question: 'Mount Everest is the highest mountain in the world', answer: true },
  },
  { id: 37, type: 'qcm', category: 'cultural',
    ar: { question: 'من هو مخترع الكمبيوتر؟', options: ['بيل غيتس', 'ستيف جوبز', 'تشارلز باباج', 'آلان تورينج'], answer: 'تشارلز باباج' },
    fr: { question: 'Qui est l\'inventeur de l\'ordinateur?', options: ['Bill Gates', 'Steve Jobs', 'Charles Babbage', 'Alan Turing'], answer: 'Charles Babbage' },
    en: { question: 'Who invented the computer?', options: ['Bill Gates', 'Steve Jobs', 'Charles Babbage', 'Alan Turing'], answer: 'Charles Babbage' },
  },
  { id: 38, type: 'truefalse', category: 'cultural',
    ar: { question: 'الإنترنت اخترع في القرن العشرين', answer: true },
    fr: { question: 'Internet a été inventé au 20ème siècle', answer: true },
    en: { question: 'The Internet was invented in the 20th century', answer: true },
  },
  { id: 39, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي عاصمة تركيا؟', options: ['إسطنبول', 'أنقرة', 'إزمير', 'بورصة'], answer: 'أنقرة' },
    fr: { question: 'Quelle est la capitale de la Turquie?', options: ['Istanbul', 'Ankara', 'Izmir', 'Bursa'], answer: 'Ankara' },
    en: { question: 'What is the capital of Turkey?', options: ['Istanbul', 'Ankara', 'Izmir', 'Bursa'], answer: 'Ankara' },
  },
  { id: 40, type: 'truefalse', category: 'cultural',
    ar: { question: 'اللغة الإنجليزية هي اللغة الأكثر انتشاراً في العالم', answer: false },
    fr: { question: 'L\'anglais est la langue la plus parlée au monde', answer: false },
    en: { question: 'English is the most spoken language in the world', answer: false },
  },
  { id: 41, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي عاصمة مصر؟', options: ['الإسكندرية', 'الأقصر', 'القاهرة', 'أسوان'], answer: 'القاهرة' },
    fr: { question: 'Quelle est la capitale de l\'Égypte?', options: ['Alexandrie', 'Louxor', 'Le Caire', 'Assouan'], answer: 'Le Caire' },
    en: { question: 'What is the capital of Egypt?', options: ['Alexandria', 'Luxor', 'Cairo', 'Aswan'], answer: 'Cairo' },
  },
  { id: 42, type: 'truefalse', category: 'cultural',
    ar: { question: 'الأهرامات توجد في مصر', answer: true },
    fr: { question: 'Les pyramides se trouvent en Égypte', answer: true },
    en: { question: 'The pyramids are located in Egypt', answer: true },
  },
  { id: 43, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هو أطول جدار في العالم؟', options: ['سور الصين العظيم', 'جدار برلين', 'جدار هادريان', 'جدار الغرب'], answer: 'سور الصين العظيم' },
    fr: { question: 'Quel est le plus long mur du monde?', options: ['Grande Muraille de Chine', 'Mur de Berlin', 'Mur d\'Hadrien', 'Mur Ouest'], answer: 'Grande Muraille de Chine' },
    en: { question: 'What is the longest wall in the world?', options: ['Great Wall of China', 'Berlin Wall', 'Hadrian\'s Wall', 'West Wall'], answer: 'Great Wall of China' },
  },
  { id: 44, type: 'truefalse', category: 'cultural',
    ar: { question: 'البرازيل هي أكبر دولة في أمريكا الجنوبية', answer: true },
    fr: { question: 'Le Brésil est le plus grand pays d\'Amérique du Sud', answer: true },
    en: { question: 'Brazil is the largest country in South America', answer: true },
  },
  { id: 45, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي عاصمة اليابان؟', options: ['أوساكا', 'كيوتو', 'طوكيو', 'هيروشيما'], answer: 'طوكيو' },
    fr: { question: 'Quelle est la capitale du Japon?', options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'], answer: 'Tokyo' },
    en: { question: 'What is the capital of Japan?', options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'], answer: 'Tokyo' },
  },
  { id: 46, type: 'truefalse', category: 'cultural',
    ar: { question: 'كندا هي أكبر دولة في العالم من حيث المساحة', answer: false },
    fr: { question: 'Le Canada est le plus grand pays du monde par superficie', answer: false },
    en: { question: 'Canada is the largest country in the world by area', answer: false },
  },
  { id: 47, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي عاصمة الأردن؟', options: ['إربد', 'الزرقاء', 'عمّان', 'العقبة'], answer: 'عمّان' },
    fr: { question: 'Quelle est la capitale de la Jordanie?', options: ['Irbid', 'Zarqa', 'Amman', 'Aqaba'], answer: 'Amman' },
    en: { question: 'What is the capital of Jordan?', options: ['Irbid', 'Zarqa', 'Amman', 'Aqaba'], answer: 'Amman' },
  },
  { id: 48, type: 'truefalse', category: 'cultural',
    ar: { question: 'أستراليا هي قارة ودولة في نفس الوقت', answer: true },
    fr: { question: 'L\'Australie est à la fois un continent et un pays', answer: true },
    en: { question: 'Australia is both a continent and a country', answer: true },
  },
  { id: 49, type: 'qcm', category: 'cultural',
    ar: { question: 'من هو مؤسس شركة Apple؟', options: ['بيل غيتس', 'ستيف جوبز', 'مارك زوكربيرغ', 'إيلون ماسك'], answer: 'ستيف جوبز' },
    fr: { question: 'Qui est le fondateur d\'Apple?', options: ['Bill Gates', 'Steve Jobs', 'Mark Zuckerberg', 'Elon Musk'], answer: 'Steve Jobs' },
    en: { question: 'Who founded Apple?', options: ['Bill Gates', 'Steve Jobs', 'Mark Zuckerberg', 'Elon Musk'], answer: 'Steve Jobs' },
  },
  { id: 50, type: 'truefalse', category: 'cultural',
    ar: { question: 'المغرب يقع في شمال أفريقيا', answer: true },
    fr: { question: 'Le Maroc est situé en Afrique du Nord', answer: true },
    en: { question: 'Morocco is located in North Africa', answer: true },
  },
  { id: 51, type: 'qcm', category: 'scientific',
    ar: { question: 'ما هي درجة غليان الماء؟', options: ['90°C', '95°C', '100°C', '110°C'], answer: '100°C' },
    fr: { question: 'Quelle est la température d\'ébullition de l\'eau?', options: ['90°C', '95°C', '100°C', '110°C'], answer: '100°C' },
    en: { question: 'What is the boiling point of water?', options: ['90°C', '95°C', '100°C', '110°C'], answer: '100°C' },
  },
  { id: 52, type: 'truefalse', category: 'scientific',
    ar: { question: 'الألماس هو أصلب مادة طبيعية في الطبيعة', answer: true },
    fr: { question: 'Le diamant est la substance naturelle la plus dure', answer: true },
    en: { question: 'Diamond is the hardest natural substance', answer: true },
  },
  { id: 53, type: 'qcm', category: 'religious',
    ar: { question: 'ما هو الكتاب المقدس للمسيحيين؟', options: ['القرآن', 'الإنجيل', 'التوراة', 'الزبور'], answer: 'الإنجيل' },
    fr: { question: 'Quel est le livre sacré des chrétiens?', options: ['Coran', 'Bible', 'Torah', 'Psaumes'], answer: 'Bible' },
    en: { question: 'What is the holy book of Christians?', options: ['Quran', 'Bible', 'Torah', 'Psalms'], answer: 'Bible' },
  },
  { id: 54, type: 'truefalse', category: 'scientific',
    ar: { question: 'الإنسان يستخدم 10% فقط من دماغه', answer: false },
    fr: { question: 'L\'humain n\'utilise que 10% de son cerveau', answer: false },
    en: { question: 'Humans only use 10% of their brain', answer: false },
  },
  { id: 55, type: 'qcm', category: 'cultural',
    ar: { question: 'ما هي لغة شكسبير؟', options: ['الفرنسية', 'الإنجليزية', 'الإيطالية', 'الألمانية'], answer: 'الإنجليزية' },
    fr: { question: 'Quelle est la langue de Shakespeare?', options: ['Français', 'Anglais', 'Italien', 'Allemand'], answer: 'Anglais' },
    en: { question: 'What language did Shakespeare write in?', options: ['French', 'English', 'Italian', 'German'], answer: 'English' },
  },
];

const categoryColors = {
  religious: '#079992',
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
const [showSuccess, setShowSuccess] = useState(false);

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
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  
const handleNext = () => {
    setShowSuccess(false);
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
      <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-10" style={{border: '3px solid #079992'}}>
            <div className="text-7xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-2" style={{color: '#0e6b55'}}>{t.result}</h2>
            <div className="text-6xl font-bold my-6" style={{color: '#079992'}}>
              {score} / {filteredQuestions.length}
            </div>
            <div className="text-2xl font-bold mb-6" style={{color: '#fbbf24'}}>
              {getResultText()}
            </div>
            <div className="w-full rounded-full h-4 mb-8" style={{background: '#e8f8f5'}}>
              <div
                className="h-4 rounded-full transition-all"
                style={{
                  width: `${(score / filteredQuestions.length) * 100}%`,
                  background: 'linear-gradient(to right, #079992, #0e6b55)'
                }}
              />
            </div>
            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white transition hover:opacity-90"
              style={{background: 'linear-gradient(135deg, #079992, #0e6b55)'}}
            >
              🔄 {t.restart}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, #e8f8f5 0%, #fff9e6 100%)'}}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧠</div>
          <h1 className="text-3xl font-bold" style={{color: '#0e6b55'}}>{t.title}</h1>
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
                ? {background: '#0e6b55', color: 'white'}
                : {background: 'white', color: '#0e6b55', border: '2px solid #079992'}
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
          <div className="w-full rounded-full h-2 mb-6" style={{background: '#e8f8f5'}}>
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%`,
                background: categoryColors[currentQuestion.category]
              }}
            />
          </div>

          {/* نص السؤال */}
          <h2 className="text-xl font-bold text-center mb-8" style={{color: '#0e6b55'}}>
            {currentQuestion[locale].question}
          </h2>

          {/* الإجابات */}
          {currentQuestion.type === 'qcm' ? (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion[locale].options?.map((option, i) => {
                let bg = 'white';
                let border = '#a9dfbf';
                let color = '#0e6b55';

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
                let border = '#a9dfbf';
                let color = '#0e6b55';

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
              style={{background: 'linear-gradient(135deg, #079992, #0e6b55)'}}
            >
              {currentIndex + 1 >= filteredQuestions.length ? `🏁 ${t.finish}` : `${t.next} ←`}
            </button>
          )}

        </div>

        {/* النقاط الحالية */}
        <div className="text-center mt-6">
          <span className="font-bold text-lg" style={{color: '#0e6b55'}}>
            ⭐ {score} / {currentIndex + (isAnswered ? 1 : 0)}
          </span>
        </div>

      </div>
      <SuccessAnimation
        show={showSuccess}
        message={locale === 'ar' ? 'إجابة صحيحة!' : locale === 'fr' ? 'Bonne réponse!' : 'Correct!'}
      />
    </main>
  );
}