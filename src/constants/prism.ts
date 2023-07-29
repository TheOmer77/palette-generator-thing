import type { PrismTheme } from 'prism-react-renderer';

export const dark: PrismTheme = {
  plain: { color: '#cbd5e1' },
  styles: [
    {
      types: ['comment', 'punctuation'],
      style: { color: '#64748b', fontStyle: 'italic' },
    },
    { types: ['variable'], style: { color: '#f1f5f9' } },
    { types: ['hexcode'], style: { color: '#f8fafc' } },
    {
      types: ['keyword', 'builtin', 'number', 'char', 'constant'],
      style: { color: '#fdba74' },
    },
    { types: ['tag', 'deleted', 'string'], style: { color: '#fca5a5' } },
    { types: ['function'], style: { color: '#93c5fd' } },
    { types: ['symbol', 'inserted'], style: { color: '#6ee7b7' } },
    { types: ['changed'], style: { color: '#fcd34d' } },
    { types: ['attr-name', 'selector'], style: { color: '#f0abfc' } },
    { types: ['regex'], style: { color: '#7dd3fc' } },
  ],
};

export const light: PrismTheme = {
  plain: { color: '#334155' },
  styles: [
    {
      types: ['comment', 'punctuation'],
      style: { color: '#64748b', fontStyle: 'italic' },
    },
    { types: ['variable'], style: { color: '#0f172a' } },
    { types: ['hexcode'], style: { color: '#020617' } },
    {
      types: ['keyword', 'builtin', 'number', 'char', 'constant'],
      style: { color: '#c2410c' },
    },
    { types: ['tag', 'deleted', 'string'], style: { color: '#b91c1c' } },
    { types: ['function'], style: { color: '#1d4ed8' } },
    { types: ['symbol', 'inserted'], style: { color: '#047857' } },
    { types: ['changed'], style: { color: '#b45309' } },
    { types: ['attr-name', 'selector'], style: { color: '#a21caf' } },
    { types: ['regex'], style: { color: '#0369a1' } },
  ],
};
