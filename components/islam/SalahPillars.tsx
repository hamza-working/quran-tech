'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Layers, ListChecks, Star, Info } from 'lucide-react';
import { SALAH_PILLARS, SALAH_OBLIGATORY, SALAH_SUNAN, SALAH_SOURCES, type SalahItem, type SalahKind } from '@/lib/islam/pillars';

type Tab = 'steps' | 'obligatory' | 'sunnah' | 'compare';

const KIND_STYLE: Record<SalahKind, { bg: string; fg: string; border: string }> = {
  pillar: { bg: '#0b5d4b', fg: '#fff', border: '#0b5d4b' },
  obligatory: { bg: '#faf3dc', fg: '#6f5210', border: '#c9a24a' },
  sunnah: { bg: '#eaf2ed', fg: '#0b5d4b', border: '#cfe0d6' },
};
const KIND_ICON = { pillar: Layers, obligatory: ListChecks, sunnah: Star } as const;

function KindBadge({ kind }: { kind: SalahKind }) {
  const t = useTranslations('islam.salah');
  const Icon = KIND_ICON[kind];
  const s = KIND_STYLE[kind];
  return (
    <span className="qt-keep inline-flex">
      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: s.bg, color: s.fg, border: `1px solid ${s.border}` }}>
        <Icon size={13} aria-hidden="true" /> {t(`kind.${kind}`)}
      </span>
    </span>
  );
}

export default function SalahPillars() {
  const t = useTranslations('islam.salah');
  const [tab, setTab] = useState<Tab>('steps');
  const [step, setStep] = useState(0);

  const total = SALAH_PILLARS.length;
  const item = SALAH_PILLARS[step];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'steps', label: t('tabSteps') },
    { id: 'obligatory', label: t('tabObligatory') },
    { id: 'sunnah', label: t('tabSunnah') },
    { id: 'compare', label: t('tabCompare') },
  ];

  const list = (items: SalahItem[], intro: string) => (
    <div>
      <p className="mb-5" style={{ color: 'var(--qt-muted)' }}>{intro}</p>
      <ol className="grid gap-3 md:grid-cols-2">
        {items.map((it, i) => (
          <li key={it.id} className="card-premium p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold" style={{ color: '#8f6b1c' }}>{i + 1}</span>
              <KindBadge kind={it.kind} />
            </div>
            <p lang="ar" dir="rtl" className="font-quranic text-xl mb-1 text-start" style={{ color: '#0b5d4b', lineHeight: 1.7 }}>{it.ar}</p>
            <p className="text-sm" style={{ color: 'var(--qt-muted)' }}>{t(`items.${it.id}`)}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <section aria-labelledby="salah-heading">
      <h2 id="salah-heading" className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0b5d4b' }}>{t('heading')}</h2>
      <p className="mb-6 max-w-2xl" style={{ color: 'var(--qt-muted)' }}>{t('intro')}</p>

      {/* Scholarly note about differences between schools */}
      <aside className="mb-8 rounded-xl p-4 md:p-5 flex gap-3" style={{ background: '#faf3dc', border: '1px solid #e6d3a0', color: '#6f5210' }}>
        <Info size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm space-y-3">
          <p><strong>{t('schoolTitle')}:</strong> {t('school')}</p>
          <div>
            <p className="font-bold mb-1">{t('sources')}</p>
            <ul className="list-disc ps-5 space-y-0.5">
              {SALAH_SOURCES.map((s) => (<li key={s} lang="ar" dir="rtl" className="font-quranic text-base text-start">{s}</li>))}
            </ul>
          </div>
        </div>
      </aside>

      <div role="tablist" aria-label={t('heading')} className="flex gap-1.5 flex-wrap mb-6">
        {tabs.map((x) => (
          <button
            key={x.id}
            role="tab"
            id={`salah-tab-${x.id}`}
            aria-selected={tab === x.id}
            aria-controls="salah-panel"
            onClick={() => setTab(x.id)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            style={tab === x.id
              ? { background: '#0b5d4b', color: '#fff', border: '1px solid #0b5d4b' }
              : { background: 'var(--qt-surface)', color: 'var(--qt-ink)', border: '1px solid var(--qt-line)' }}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div id="salah-panel" role="tabpanel" aria-labelledby={`salah-tab-${tab}`}>
        {tab === 'steps' && (
          <div>
            <div className="card-premium p-6 md:p-10 text-center" aria-live="polite">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold" style={{ color: '#8f6b1c' }}>{t('step', { n: step + 1, total })}</span>
                <KindBadge kind="pillar" />
              </div>
              <p lang="ar" dir="rtl" className="font-quranic text-3xl md:text-4xl mb-4" style={{ color: '#0b5d4b', lineHeight: 1.7 }}>{item.ar}</p>
              <p className="max-w-xl mx-auto leading-loose">{t(`items.${item.id}`)}</p>
            </div>

            <div className="flex items-center justify-between gap-3 mt-5">
              <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
                className="btn-emerald disabled:opacity-40 disabled:cursor-default">
                <ChevronRight size={18} className="ltr:rotate-180" aria-hidden="true" /> {t('prev')}
              </button>
              <button type="button" onClick={() => setStep((s) => Math.min(total - 1, s + 1))} disabled={step === total - 1}
                className="btn-emerald disabled:opacity-40 disabled:cursor-default">
                {t('next')} <ChevronLeft size={18} className="ltr:rotate-180" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-6" role="group" aria-label={t('step', { n: step + 1, total })}>
              {SALAH_PILLARS.map((p, i) => (
                <button key={p.id} type="button" onClick={() => setStep(i)} aria-label={t('goTo', { n: i + 1 })} aria-current={i === step ? 'step' : undefined}
                  className="w-9 h-9 rounded-full text-sm font-bold transition-colors cursor-pointer"
                  style={i === step
                    ? { background: '#c9a24a', color: '#073f33', border: '1px solid #c9a24a' }
                    : i < step
                      ? { background: '#0b5d4b', color: '#fff', border: '1px solid #0b5d4b' }
                      : { background: 'var(--qt-surface)', color: 'var(--qt-muted)', border: '1px solid var(--qt-line)' }}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'obligatory' && list(SALAH_OBLIGATORY, t('obligatoryIntro'))}
        {tab === 'sunnah' && list(SALAH_SUNAN, t('sunnahIntro'))}

        {tab === 'compare' && (
          <div>
            <p className="mb-5" style={{ color: 'var(--qt-muted)' }}>{t('compareIntro')}</p>
            <div className="grid gap-4 md:grid-cols-3">
              {(['pillar', 'obligatory', 'sunnah'] as SalahKind[]).map((k) => (
                <div key={k} className="card-premium p-5">
                  <div className="mb-3"><KindBadge kind={k} /></div>
                  <p className="text-sm leading-loose">{t(`kindDesc.${k}`)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
