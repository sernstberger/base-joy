import type { ColorScaleShades, Theme } from '@base-joy/tokens';

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface WCAGResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
}

export interface WCAGWarning {
  scale: string;
  variant: string;
  issue: string;
  recommendation: string;
}

export function hexToHSL(hex: string): HSL {
  let r = 0;
  let g = 0;
  let b = 0;

  const cleanHex = hex.replace('#', '');

  if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function hslToHex(hsl: HSL): string {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function generateColorScale(baseHex: string): ColorScaleShades {
  const baseHSL = hexToHSL(baseHex);

  return {
    50: hslToHex({ ...baseHSL, l: 97, s: Math.round(baseHSL.s * 0.7) }),
    100: hslToHex({ ...baseHSL, l: 94, s: Math.round(baseHSL.s * 0.8) }),
    200: hslToHex({ ...baseHSL, l: 87, s: Math.round(baseHSL.s * 0.85) }),
    300: hslToHex({ ...baseHSL, l: 74, s: Math.round(baseHSL.s * 0.95) }),
    400: hslToHex({ ...baseHSL, l: 62, s: baseHSL.s }),
    500: baseHex,
    600: hslToHex({ ...baseHSL, l: 45 }),
    700: hslToHex({ ...baseHSL, l: 38 }),
    800: hslToHex({ ...baseHSL, l: 30 }),
    900: hslToHex({ ...baseHSL, l: 23 }),
    950: hslToHex({ ...baseHSL, l: 14 }),
  };
}

function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function checkWCAGCompliance(foreground: string, background: string): WCAGResult {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
    passesAALarge: ratio >= 3,
  };
}

export function getWCAGWarnings(theme: Theme): WCAGWarning[] {
  const warnings: WCAGWarning[] = [];
  const textWhite = '#ffffff';

  Object.entries(theme.colors).forEach(([scale, shades]) => {
    const result = checkWCAGCompliance(textWhite, shades[500]);

    if (!result.passesAA) {
      warnings.push({
        scale,
        variant: 'solid',
        issue: `Contrast ratio ${result.ratio.toFixed(2)}:1 is below WCAG AA standard (4.5:1)`,
        recommendation: 'Use a darker shade (600+) or adjust the base color',
      });
    }
  });

  return warnings;
}
