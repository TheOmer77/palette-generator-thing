import {
  argbFromHex,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  redFromArgb,
} from '@material/material-color-utilities';

export type Rgb = [red: number, green: number, blue: number];

const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  );
  if (!result) throw new Error(`Invalid hex color: ${hex}`);

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
};

const argbToRgb = (argb: number): Rgb => [
  redFromArgb(argb),
  greenFromArgb(argb),
  blueFromArgb(argb),
];

export function getNeutralVariantHex(baseColor: string, format?: 'hex'): string;
export function getNeutralVariantHex(
  baseColor: string,
  format?: 'argb'
): number;
export function getNeutralVariantHex(baseColor: string, format?: 'rgb'): Rgb;
export function getNeutralVariantHex(
  baseColor: string,
  format: 'hex' | 'rgb' | 'argb' = 'hex'
) {
  const baseColorHct = Hct.fromInt(
    isValidHexColor(baseColor) ? argbFromHex(baseColor) : 0
  );
  const resultHct = Hct.from(
    baseColorHct.hue,
    Math.min(baseColorHct.chroma / 6, 8),
    baseColorHct.tone
  );
  const resultArgb = resultHct.toInt();
  return format === 'argb'
    ? resultArgb
    : format === 'rgb'
    ? argbToRgb(resultArgb)
    : hexFromArgb(resultArgb);
}

export function getSecondaryColorHex(baseColor: string, format?: 'hex'): string;
export function getSecondaryColorHex(
  baseColor: string,
  format?: 'argb'
): number;
export function getSecondaryColorHex(baseColor: string, format?: 'rgb'): Rgb;
export function getSecondaryColorHex(
  baseColor: string,
  format: 'hex' | 'rgb' | 'argb' = 'hex'
) {
  const baseColorHct = Hct.fromInt(
    isValidHexColor(baseColor) ? argbFromHex(baseColor) : 0
  );
  const resultHct = Hct.from(
    baseColorHct.hue + 180,
    baseColorHct.chroma,
    baseColorHct.tone
  );
  const resultArgb = resultHct.toInt();
  return format === 'argb'
    ? resultArgb
    : format === 'rgb'
    ? argbToRgb(resultArgb)
    : hexFromArgb(resultArgb);
}

export const hexInverseBw = (hex: string) => {
  const rgb = hexToRgb(hex);
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return luminance < 140 ? '#ffffff' : '#000000';
};

export const isValidHexColor = (hex: string) =>
  /^#([0-9A-F]{3}){1,2}$/i.test(hex);

export const randomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padEnd(6, '0')}`;
