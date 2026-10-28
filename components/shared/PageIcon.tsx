import type { LucideIcon } from 'lucide-react';

// Page-header icon: emerald disc with a fine gold ring (replaces the large header emoji).
export default function PageIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className="mx-auto mb-5 w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: '#0b5d4b', boxShadow: '0 8px 22px rgba(11,93,75,0.25), inset 0 0 0 3px rgba(201,162,74,0.6)' }}
      aria-hidden="true"
    >
      <Icon size={36} style={{ color: '#f3eddc' }} />
    </div>
  );
}
