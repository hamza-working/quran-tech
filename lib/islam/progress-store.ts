// Tiny localStorage-backed store for adhkar counters and favourites.
// Works with useSyncExternalStore so it is SSR-safe (server snapshot is always empty).
import type { Period } from './types';

type Counts = Record<number, number>;
const EMPTY_COUNTS: Counts = {};
const EMPTY_FAVS: number[] = [];

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key && e.key.startsWith('qt-adhkar')) cb();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

// Counters are per period and per calendar day (they restart every day).
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const countsKey = (p: Period) => `qt-adhkar:v1:${p}:${todayKey()}`;
const FAV_KEY = 'qt-adhkar:v1:favorites';

function safeGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable (private mode / quota): keep working in memory */ }
}

// Cache parsed values by raw string so snapshots stay referentially stable.
const cache = new Map<string, { raw: string | null; value: unknown }>();
function read<T>(key: string, fallback: T, parse: (raw: string) => T): T {
  const raw = safeGet(key);
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value = fallback;
  if (raw) { try { value = parse(raw); } catch { value = fallback; } }
  cache.set(key, { raw, value });
  return value;
}

export const getCounts = (p: Period): Counts => read(countsKey(p), EMPTY_COUNTS, (r) => {
  const o = JSON.parse(r) as Counts;
  return o && typeof o === 'object' ? o : EMPTY_COUNTS;
});
export const getFavorites = (): number[] => read(FAV_KEY, EMPTY_FAVS, (r) => {
  const a = JSON.parse(r);
  return Array.isArray(a) ? a.filter((n) => typeof n === 'number') : EMPTY_FAVS;
});
export const getServerCounts = () => EMPTY_COUNTS;
export const getServerFavorites = () => EMPTY_FAVS;

/** Increment one dhikr, never beyond its target. */
export function increment(p: Period, id: number, target: number) {
  const cur = getCounts(p);
  const next = Math.min((cur[id] ?? 0) + 1, target);
  if (next === (cur[id] ?? 0)) return;
  safeSet(countsKey(p), JSON.stringify({ ...cur, [id]: next }));
  emit();
}
export function resetOne(p: Period, id: number) {
  const { [id]: _removed, ...rest } = getCounts(p);
  void _removed;
  safeSet(countsKey(p), JSON.stringify(rest));
  emit();
}
export function resetAll(p: Period) {
  safeSet(countsKey(p), JSON.stringify({}));
  emit();
}
export function toggleFavorite(id: number) {
  const cur = getFavorites();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  safeSet(FAV_KEY, JSON.stringify(next));
  emit();
}

/** Remove diacritics/tatweel and unify letter variants so search works on vocalised text. */
export function normalizeArabic(s: string) {
  return s
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .toLowerCase();
}
