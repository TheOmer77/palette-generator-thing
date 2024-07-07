export const THEMES = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const;

export type Theme = keyof typeof THEMES;
export type ResolvedTheme = Exclude<keyof typeof THEMES, 'system'>;
