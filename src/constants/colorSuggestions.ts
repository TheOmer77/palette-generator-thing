import {
  modeOkhsl,
  useMode as loadMode,
  type Okhsl,
  modeRgb,
  formatHex,
} from 'culori/fn';

const okhsl = loadMode(modeOkhsl);
loadMode(modeRgb);

/**
 * A function that gets a hex color, modifies it * in some way, and returns
 * the modified color as a hex color.
 */
export type ModifiedColorFunction = (hexColor: string) => string;
export type ColorSuggestions = Record<string, ModifiedColorFunction>;

/** Util function: Get function to get a modified color with a given saturation. */
const getSaturationColorFn = (newSaturation: number) => (hexColor: string) => {
  const { h, l } = okhsl(hexColor) as Okhsl;
  return formatHex({ mode: 'okhsl', h, s: newSaturation, l });
};

// TODO: ModifiedColorFunctions
export const generalColorSuggestions = {
  complementary: 'complementary',
  splitComp1: 'splitComp1',
  splitComp2: 'splitComp2',
  // Split complementary of complementary
  analogous1: 'analogous1',
  analogous2: 'analogous2',
  triad1: 'triad1',
  triad2: 'triad2',
  // Triad of complementary
  compTriad1: 'compTriad1',
  compTriad2: 'compTriad2',
  // Tetradic is 3 colors, but one of them is the same as complementary
  tetradic1: 'tetradic1',
  tetradic2: 'tetradic2',
} as const;
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

// TODO: ModifiedColorFunctions
/** NOT FINAL! Number is hue in OKHSL/OKLCH */
export const dangerColorSuggestions = {
  danger25: 'danger25',
  danger30: 'danger30',
  danger35: 'danger35',
  danger40: 'danger40',
  danger45: 'danger45',
} as const;
export const dangerColorSuggestionNames = Object.keys(dangerColorSuggestions);
export type DangerColorSuggestion = keyof typeof dangerColorSuggestions;
