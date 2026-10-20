// Brand mark: eight-pointed star (Khatam) — pure SVG, no dependencies.
export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <g fill="none" stroke="#c9a24a" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="9" y="9" width="22" height="22" />
        <rect x="9" y="9" width="22" height="22" transform="rotate(45 20 20)" />
      </g>
      <circle cx="20" cy="20" r="3.2" fill="#c9a24a" />
    </svg>
  );
}
