import es from '../locales/es/translation.json';
import en from '../locales/en/translation.json';

const translations: Record<string, Record<string, any>> = { es, en };

export type Lang = 'es' | 'en';

export function t(lang: Lang, key: string): any {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    if (value === undefined || value === null) return key;
    value = value[k];
  }
  return value ?? key;
}

export const defaultLang: Lang = 'es';

export const pathMap: Record<string, string> = {
  '/es': '/en',
  '/es/nosotros': '/en/about',
  '/es/servicios': '/en/services',
  '/es/proceso': '/en/process',
  '/es/tecnologias': '/en/technologies',
  '/es/blog': '/en/blog',
  '/es/software': '/en/software',
  '/es/contacto': '/en/contact',
  '/en': '/es',
  '/en/about': '/es/nosotros',
  '/en/services': '/es/servicios',
  '/en/process': '/es/proceso',
  '/en/technologies': '/es/tecnologias',
  '/en/blog': '/es/blog',
  '/en/software': '/es/software',
  '/en/contact': '/es/contacto',
};

export function getAlternatePath(currentPath: string): string {
  // Exact match
  if (pathMap[currentPath]) return pathMap[currentPath];
  // Blog post: swap lang prefix
  if (currentPath.startsWith('/en/')) return '/es/' + currentPath.slice(4);
  if (currentPath.startsWith('/es/')) return '/en/' + currentPath.slice(4);
  return currentPath.startsWith('/en') ? '/es' : '/en';
}

const BASE_URL = 'https://tekosoft.io';

export function getSEO(lang: Lang, page: string, currentPath: string) {
  const slugs: Record<string, { es: string; en: string }> = {
    home:      { es: '/es',              en: '/en' },
    identity:  { es: '/es/nosotros',     en: '/en/about' },
    systems:   { es: '/es/servicios',    en: '/en/services' },
    quality:   { es: '/es/proceso',      en: '/en/process' },
    expertise: { es: '/es/tecnologias',  en: '/en/technologies' },
    software:  { es: '/es/software',     en: '/en/software' },
    contact:   { es: '/es/contacto',     en: '/en/contact' },
  };

  const paths = slugs[page] ?? { es: currentPath, en: currentPath };

  return {
    title:       t(lang, `seo.${page}.title`),
    tabTitle:    t(lang, `seo.${page}.tabTitle`),
    description: t(lang, `seo.${page}.description`),
    ogImage:     t(lang, 'seo.ogImage'),
    canonical:   `${BASE_URL}${paths[lang]}`,
    urlES:       `${BASE_URL}${paths.es}`,
    urlEN:       `${BASE_URL}${paths.en}`,
  };
}
