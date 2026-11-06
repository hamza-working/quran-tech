// Shared helper: a soft tinted card in the given accent colour (used by the home page cards and the /islam grid).
export function tintedCard(color: string) {
  return {
    background: `color-mix(in srgb, ${color} 7%, #fffdf8)`,
    border: `1px solid color-mix(in srgb, ${color} 32%, #e3dcc8)`,
    borderTop: `3px solid ${color}`,
  } as const;
}

/** Accent colour for text/links sitting on the tinted card (darker, so it stays readable). */
export const accentText = (color: string) => `color-mix(in srgb, ${color} 78%, #14221e)`;

/** Icon badge style: solid accent colour, ivory icon, fine gold ring. */
export const iconBadge = (color: string) => ({
  background: color,
  color: '#fbf6e8',
  boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.28), 0 4px 10px rgba(0,0,0,0.12)',
}) as const;
