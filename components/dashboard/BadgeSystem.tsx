'use client';

import { useState } from 'react';
import { Star, Lock } from 'lucide-react';

interface Badge {
  id: number;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  icon: string;
  requiredSurahs: number;
  unlocked: boolean;
}

const badges: Badge[] = [
  {
    id: 1,
    name: 'المبتدئ',
    nameEn: 'Beginner',
    nameFr: 'Débutant',
    description: 'حفظت أول سورة',
    icon: '🌱',
    requiredSurahs: 1,
    unlocked: false,
  },
  {
    id: 2,
    name: 'النجم الصاعد',
    nameEn: 'Rising Star',
    nameFr: 'Étoile montante',
    description: 'حفظت 5 سور',
    icon: '⭐',
    requiredSurahs: 5,
    unlocked: false,
  },
  {
    id: 3,
    name: 'حافظ الجزء',
    nameEn: 'Juz Memorizer',
    nameFr: 'Mémoriseur de Juz',
    description: 'حفظت جزء عم كاملاً',
    icon: '🏆',
    requiredSurahs: 37,
    unlocked: false,
  },
  {
    id: 4,
    name: 'المتقن',
    nameEn: 'Master',
    nameFr: 'Maître',
    description: 'حفظت 50 سورة',
    icon: '👑',
    requiredSurahs: 50,
    unlocked: false,
  },
];

interface BadgeSystemProps {
  memorizedSurahs: number;
  locale?: 'ar' | 'en' | 'fr';
}

export default function BadgeSystem({
  memorizedSurahs = 0,
  locale = 'ar',
}: BadgeSystemProps) {
  const updatedBadges = badges.map(badge => ({
    ...badge,
    unlocked: memorizedSurahs >= badge.requiredSurahs,
  }));

  const getBadgeName = (badge: Badge) => {
    if (locale === 'en') return badge.nameEn;
    if (locale === 'fr') return badge.nameFr;
    return badge.name;
  };

  return (
    <div className="p-6">
      {/* شريط التقدم العام */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-green-800">
            {locale === 'ar' ? 'تقدمك' : locale === 'fr' ? 'Votre progrès' : 'Your Progress'}
          </h3>
          <span className="text-green-700 font-bold">
            {memorizedSurahs} / 114
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(memorizedSurahs / 114) * 100}%` }}
          />
        </div>
      </div>

      {/* الشارات */}
      <div className="grid grid-cols-2 gap-4">
        {updatedBadges.map(badge => (
          <div
            key={badge.id}
            className={`rounded-xl p-4 text-center transition-all duration-300 ${
              badge.unlocked
                ? 'bg-green-50 border-2 border-green-400 shadow-md'
                : 'bg-gray-100 border-2 border-gray-200 opacity-60'
            }`}
          >
            <div className="text-4xl mb-2">
              {badge.unlocked ? badge.icon : <Lock size={32} className="mx-auto text-gray-400" />}
            </div>
            <h4 className={`font-bold text-sm ${badge.unlocked ? 'text-green-800' : 'text-gray-400'}`}>
              {getBadgeName(badge)}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {badge.description}
            </p>
            {badge.unlocked && (
              <div className="flex justify-center mt-2">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}