import {
  HandHeart, Utensils, Home, Shirt, CloudLightning, HeartPulse, Users, Plane, Wallet, Heart, Baby, Compass,
  type LucideIcon,
} from 'lucide-react';
import type { TopicId } from '@/lib/islam/topics';

export const TOPIC_ICONS: Record<TopicId, LucideIcon> = {
  prayer: HandHeart, food: Utensils, home: Home, clothes: Shirt, hard: CloudLightning, sickness: HeartPulse,
  social: Users, travel: Plane, money: Wallet, marriage: Heart, children: Baby, hajj: Compass,
};

// One distinct jewel tone per topic (kept muted so the page stays calm).
export const TOPIC_COLORS: Record<TopicId, string> = {
  prayer: '#1f7a55', food: '#c26a2e', home: '#8f6b1c', clothes: '#6d5aa0', hard: '#4b5f73', sickness: '#b5473f',
  social: '#2f7f8f', travel: '#2c5f9e', money: '#6b7a2c', marriage: '#a24b8f', children: '#3a9d7a', hajj: '#8a5a2b',
};
