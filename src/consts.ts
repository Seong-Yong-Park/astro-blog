export const SITE = {
  title: 'Safety Node (SENO)',
  tagline: 'Notes on safety engineering for AI-powered robots',
  author: 'SeongYong Park',
  github: 'https://github.com/Seong-Yong-Park',
} as const;

export const LANGS = ['ko', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'ko';
