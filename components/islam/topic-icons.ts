import {
  HandHeart, Utensils, Home, Shirt, CloudLightning, HeartPulse, Users, Plane, Wallet, Heart, Baby, Compass,
  type LucideIcon,
} from 'lucide-react';
import type { TopicId } from '@/lib/islam/topics';

export const TOPIC_ICONS: Record<TopicId, LucideIcon> = {
  prayer: HandHeart, food: Utensils, home: Home, clothes: Shirt, hard: CloudLightning, sickness: HeartPulse,
  social: Users, travel: Plane, money: Wallet, marriage: Heart, children: Baby, hajj: Compass,
};
