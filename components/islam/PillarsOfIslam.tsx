'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, Landmark, Coins, Moon, Mountain, X, ArrowRight, type LucideIcon } from 'lucide-react';
import { ISLAM_PILLARS, PILLARS_HADITH_REF, type PillarId } from '@/lib/islam/pillars';

const ICONS: Record<string, LucideIcon> = { Sparkles, Landmark, Coins, Moon, Mountain };

export default function PillarsOfIslam() {
  const t = useTranslations('islam.pillars');
  const [openId, setOpenId] = useState<PillarId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native <dialog>: focus trap, Esc to close and focus restore come for free.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (openId && !dlg.open) dlg.showModal();
    if (!openId && dlg.open) dlg.close();
  }, [openId]);

  const current = ISLAM_PILLARS.find((p) => p.id === openId);
  const CurrentIcon = current ? ICONS[current.icon] : null;
  const number = current ? ISLAM_PILLARS.indexOf(current) + 1 : 0;

  return (
    <section aria-labelledby="pillars-heading">
      <h2 id="pillars-heading" className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0b5d4b' }}>{t('heading')}</h2>
      <p className="mb-8 max-w-2xl" style={{ color: 'var(--qt-muted)' }}>{t('intro')}</p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ISLAM_PILLARS.map((p, i) => {
          const Icon = ICONS[p.icon];
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setOpenId(p.id)}
                className="card-premium w-full h-full p-6 text-start flex flex-col gap-3 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#eaf2ed', color: '#0b5d4b' }}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold tracking-wide" style={{ color: '#8f6b1c' }}>{t('pillarNumber', { n: i + 1 })}</span>
                </div>
                <h3 lang="ar" dir="rtl" className="font-quranic text-2xl text-start" style={{ color: '#0b5d4b', lineHeight: 1.6 }}>{p.ar}</h3>
                <p className="text-sm font-semibold" style={{ color: 'var(--qt-ink)' }}>{t(`items.${p.id}.name`)}</p>
                <p className="text-sm flex-1" style={{ color: 'var(--qt-muted)' }}>{t(`items.${p.id}.short`)}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold mt-1" style={{ color: '#1f7a55' }}>
                  {t('readMore')} <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenId(null)}
        onClick={(e) => { if (e.target === dialogRef.current) setOpenId(null); }}
        aria-labelledby="pillar-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl p-0 backdrop:bg-black/50"
        style={{ background: 'var(--qt-surface)', color: 'var(--qt-ink)', border: '1px solid #c9a24a' }}
      >
        {current && CurrentIcon && (
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#eaf2ed', color: '#0b5d4b' }}>
                <CurrentIcon size={24} aria-hidden="true" />
              </span>
              <button type="button" onClick={() => setOpenId(null)} aria-label={t('close')} className="p-2 rounded-lg hover:bg-black/5 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs font-bold tracking-wide mb-1" style={{ color: '#8f6b1c' }}>{t('pillarNumber', { n: number })}</p>
            <h3 id="pillar-dialog-title" lang="ar" dir="rtl" className="font-quranic text-3xl mb-1 text-start" style={{ color: '#0b5d4b', lineHeight: 1.6 }}>{current.ar}</h3>
            <p className="font-semibold mb-4">{t(`items.${current.id}.name`)}</p>
            <p className="leading-loose mb-6">{t(`items.${current.id}.detail`)}</p>

            <div className="rounded-xl p-4 text-sm space-y-1" style={{ background: '#faf3dc', border: '1px solid #e6d3a0', color: '#6f5210' }}>
              <p className="font-bold">{t('evidence')}</p>
              {current.refs.map((r) => (<p key={r} lang="ar" dir="rtl" className="font-quranic text-base">{r}</p>))}
              <p className="font-bold pt-2">{t('hadith')}</p>
              <p lang="ar" dir="rtl" className="font-quranic text-base">{PILLARS_HADITH_REF}</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
