import { getHueColorFn, getSaturationColorFn } from '@/utils/colorUtils';
import type { ColorSuggestions } from '@/types/colorSuggestions';

export const generalColorSuggestions = {
  complementary: getHueColorFn(180, { addToExistingHue: true }),
  splitComp1: getHueColorFn(150, { addToExistingHue: true }),
  splitComp2: getHueColorFn(210, { addToExistingHue: true }),
  // Split complementary of complementary
  analogous1: getHueColorFn(330, { addToExistingHue: true }),
  analogous2: getHueColorFn(30, { addToExistingHue: true }),
  triad1: getHueColorFn(120, { addToExistingHue: true }),
  triad2: getHueColorFn(240, { addToExistingHue: true }),
  // Triad of complementary
  compTriad1: getHueColorFn(300, { addToExistingHue: true }),
  compTriad2: getHueColorFn(60, { addToExistingHue: true }),
  // Tetradic is 3 colors, but one of them is the same as complementary
  tetradic1: getHueColorFn(90, { addToExistingHue: true }),
  tetradic2: getHueColorFn(270, { addToExistingHue: true }),
} as const satisfies ColorSuggestions;
export const generalColorSuggestionNames = Object.keys(generalColorSuggestions);

export const neutralColorSuggestions = {
  gray: getSaturationColorFn(0),
  neutral5: getSaturationColorFn(0.05),
  neutral10: getSaturationColorFn(0.1),
  neutral15: getSaturationColorFn(0.15),
  neutral20: getSaturationColorFn(0.2),
  neutral25: getSaturationColorFn(0.25),
  neutral30: getSaturationColorFn(0.3),
} as const satisfies ColorSuggestions;
export const neutralColorSuggestionNames = Object.keys(neutralColorSuggestions);

export const dangerColorSuggestions = {
  danger25: getHueColorFn(25, { limitSaturation: true }),
  danger30: getHueColorFn(30, { limitSaturation: true }),
  danger35: getHueColorFn(35, { limitSaturation: true }),
  danger40: getHueColorFn(40, { limitSaturation: true }),
  danger45: getHueColorFn(45, { limitSaturation: true }),
} as const satisfies ColorSuggestions;
export const dangerColorSuggestionNames = Object.keys(dangerColorSuggestions);
