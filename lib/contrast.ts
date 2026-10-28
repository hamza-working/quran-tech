// Presentation helpers: keep per-rule / per-level colours (semantic) for backgrounds and borders,
// but make text on or in those colours readable.

function luminance(hex: string) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return 0;
  const n = parseInt(m[1], 16);
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
}

/** Text colour to put ON a solid background of the given hex colour. */
export function readableOn(hex: string) {
  return luminance(hex) > 0.3 ? '#073f33' : '#ffffff';
}

/** A darker shade of the colour, for coloured text on a light surface. */
export function textTone(color: string) {
  return `color-mix(in srgb, ${color} 58%, #14221e)`;
}
