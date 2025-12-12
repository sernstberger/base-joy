import {
  hexToHSL,
  hslToHex,
  generateColorScale,
  getContrastRatio,
  checkWCAGCompliance,
  getWCAGWarnings,
} from './colorScaleGenerator';
import { defaultTheme } from '@base-joy/tokens';

describe('colorScaleGenerator', () => {
  describe('hexToHSL', () => {
    it('converts hex to HSL correctly', () => {
      expect(hexToHSL('#ff0000')).toEqual({ h: 0, s: 100, l: 50 });
      expect(hexToHSL('#00ff00')).toEqual({ h: 120, s: 100, l: 50 });
      expect(hexToHSL('#0000ff')).toEqual({ h: 240, s: 100, l: 50 });
    });

    it('handles grayscale colors', () => {
      expect(hexToHSL('#ffffff')).toEqual({ h: 0, s: 0, l: 100 });
      expect(hexToHSL('#000000')).toEqual({ h: 0, s: 0, l: 0 });
      expect(hexToHSL('#808080')).toEqual({ h: 0, s: 0, l: 50 });
    });

    it('handles colors without # prefix', () => {
      const withHash = hexToHSL('#3b82f6');
      const withoutHash = hexToHSL('3b82f6');
      expect(withHash).toEqual(withoutHash);
    });
  });

  describe('hslToHex', () => {
    it('converts HSL to hex correctly', () => {
      expect(hslToHex({ h: 0, s: 100, l: 50 })).toBe('#ff0000');
      expect(hslToHex({ h: 120, s: 100, l: 50 })).toBe('#00ff00');
      expect(hslToHex({ h: 240, s: 100, l: 50 })).toBe('#0000ff');
    });

    it('handles grayscale colors', () => {
      expect(hslToHex({ h: 0, s: 0, l: 100 })).toBe('#ffffff');
      expect(hslToHex({ h: 0, s: 0, l: 0 })).toBe('#000000');
    });
  });

  describe('hex <-> HSL round-trip', () => {
    it('preserves color through conversion with minimal rounding error', () => {
      const testColors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000'];

      testColors.forEach((hex) => {
        const hsl = hexToHSL(hex);
        const backToHex = hslToHex(hsl);
        const original = parseInt(hex.replace('#', ''), 16);
        const converted = parseInt(backToHex.replace('#', ''), 16);
        const diff = Math.abs(original - converted);
        expect(diff).toBeLessThan(256);
      });
    });
  });

  describe('generateColorScale', () => {
    it('generates 11 shades', () => {
      const scale = generateColorScale('#3b82f6');
      expect(Object.keys(scale)).toHaveLength(11);
      expect(scale).toHaveProperty('50');
      expect(scale).toHaveProperty('100');
      expect(scale).toHaveProperty('200');
      expect(scale).toHaveProperty('300');
      expect(scale).toHaveProperty('400');
      expect(scale).toHaveProperty('500');
      expect(scale).toHaveProperty('600');
      expect(scale).toHaveProperty('700');
      expect(scale).toHaveProperty('800');
      expect(scale).toHaveProperty('900');
      expect(scale).toHaveProperty('950');
    });

    it('preserves base color as 500 shade', () => {
      const baseColor = '#3b82f6';
      const scale = generateColorScale(baseColor);
      expect(scale[500].toLowerCase()).toBe(baseColor.toLowerCase());
    });

    it('generates lighter shades from 50-400', () => {
      const baseColor = '#3b82f6';
      const scale = generateColorScale(baseColor);
      const baseHSL = hexToHSL(baseColor);

      [50, 100, 200, 300, 400].forEach((shade) => {
        const shadeHSL = hexToHSL(scale[shade as keyof typeof scale]);
        expect(shadeHSL.l).toBeGreaterThan(baseHSL.l);
      });
    });

    it('generates darker shades from 600-950', () => {
      const baseColor = '#3b82f6';
      const scale = generateColorScale(baseColor);
      const baseHSL = hexToHSL(baseColor);

      [600, 700, 800, 900, 950].forEach((shade) => {
        const shadeHSL = hexToHSL(scale[shade as keyof typeof scale]);
        expect(shadeHSL.l).toBeLessThan(baseHSL.l);
      });
    });

    it('maintains lightness progression', () => {
      const scale = generateColorScale('#3b82f6');
      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

      for (let i = 0; i < shades.length - 1; i++) {
        const currentShade = shades[i];
        const nextShade = shades[i + 1];
        const currentL = hexToHSL(scale[currentShade as keyof typeof scale]).l;
        const nextL = hexToHSL(scale[nextShade as keyof typeof scale]).l;
        expect(currentL).toBeGreaterThanOrEqual(nextL);
      }
    });
  });

  describe('getContrastRatio', () => {
    it('calculates contrast ratio correctly', () => {
      const blackWhite = getContrastRatio('#000000', '#ffffff');
      expect(blackWhite).toBeCloseTo(21, 0);

      const sameColor = getContrastRatio('#ff0000', '#ff0000');
      expect(sameColor).toBe(1);
    });

    it('returns same ratio regardless of order', () => {
      const ratio1 = getContrastRatio('#000000', '#ffffff');
      const ratio2 = getContrastRatio('#ffffff', '#000000');
      expect(ratio1).toBe(ratio2);
    });

    it('calculates realistic contrast ratios', () => {
      const ratio = getContrastRatio('#ffffff', '#3b82f6');
      expect(ratio).toBeGreaterThan(1);
      expect(ratio).toBeLessThan(21);
    });
  });

  describe('checkWCAGCompliance', () => {
    it('passes AA for black on white', () => {
      const result = checkWCAGCompliance('#000000', '#ffffff');
      expect(result.passesAA).toBe(true);
      expect(result.passesAAA).toBe(true);
      expect(result.passesAALarge).toBe(true);
    });

    it('fails AA for low contrast', () => {
      const result = checkWCAGCompliance('#aaaaaa', '#bbbbbb');
      expect(result.passesAA).toBe(false);
    });

    it('returns correct ratio value', () => {
      const result = checkWCAGCompliance('#000000', '#ffffff');
      expect(result.ratio).toBeCloseTo(21, 0);
    });
  });

  describe('getWCAGWarnings', () => {
    it('detects WCAG issues when present', () => {
      const warnings = getWCAGWarnings(defaultTheme);
      warnings.forEach((warning) => {
        expect(warning).toHaveProperty('scale');
        expect(warning).toHaveProperty('variant');
        expect(warning).toHaveProperty('issue');
        expect(warning).toHaveProperty('recommendation');
      });
    });

    it('detects low contrast in custom theme', () => {
      const badTheme = {
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          primary: generateColorScale('#ffff00'),
        },
      };

      const warnings = getWCAGWarnings(badTheme);
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings[0]).toHaveProperty('scale', 'primary');
      expect(warnings[0]).toHaveProperty('variant', 'solid');
      expect(warnings[0]).toHaveProperty('issue');
      expect(warnings[0]).toHaveProperty('recommendation');
    });

    it('warning message includes contrast ratio', () => {
      const badTheme = {
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          primary: generateColorScale('#ffff00'),
        },
      };

      const warnings = getWCAGWarnings(badTheme);
      expect(warnings[0].issue).toContain(':1');
      expect(warnings[0].issue).toContain('WCAG AA');
    });
  });
});
