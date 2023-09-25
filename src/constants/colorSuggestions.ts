import { getColorVariantFn, getHueColorFn, getSaturationColorFn } from 'utils';
1;

export type ColorSuggestions = Record<
  string,
  ReturnType<typeof getColorVariantFn>
>;

export const generalColorSuggestions = {
  complementary: getHueColorFn(180, { addToExistingHue: true, mode: 'hsl' }),
  splitComp1: getHueColorFn(150, { addToExistingHue: true, mode: 'hsl' }),
  splitComp2: getHueColorFn(210, { addToExistingHue: true, mode: 'hsl' }),
  // Split complementary of complementary
  analogous1: getHueColorFn(330, { addToExistingHue: true, mode: 'hsl' }),
  analogous2: getHueColorFn(30, { addToExistingHue: true, mode: 'hsl' }),
  triad1: getHueColorFn(120, { addToExistingHue: true, mode: 'hsl' }),
  triad2: getHueColorFn(240, { addToExistingHue: true, mode: 'hsl' }),
  // Triad of complementary
  compTriad1: getHueColorFn(300, { addToExistingHue: true, mode: 'hsl' }),
  compTriad2: getHueColorFn(60, { addToExistingHue: true, mode: 'hsl' }),
  // Tetradic is 3 colors, but one of them is the same as complementary
  tetradic1: getHueColorFn(90, { addToExistingHue: true, mode: 'hsl' }),
  tetradic2: getHueColorFn(270, { addToExistingHue: true, mode: 'hsl' }),
} as const satisfies ColorSuggestions;
export const generalColorSuggestionNames = Object.keys(generalColorSuggestions);
export type GeneralColorSuggestion = keyof typeof generalColorSuggestions;

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
export type NeutralColorSuggestion = keyof typeof neutralColorSuggestions;

/** NOT FINAL! Number is hue in OKHSL/OKLCH */
export const dangerColorSuggestions = {
  danger25: getHueColorFn(25, { limitSaturation: true }),
  danger30: getHueColorFn(30, { limitSaturation: true }),
  danger35: getHueColorFn(35, { limitSaturation: true }),
  danger40: getHueColorFn(40, { limitSaturation: true }),
  danger45: getHueColorFn(45, { limitSaturation: true }),
} as const satisfies ColorSuggestions;
export const dangerColorSuggestionNames = Object.keys(dangerColorSuggestions);
export type DangerColorSuggestion = keyof typeof dangerColorSuggestions;
