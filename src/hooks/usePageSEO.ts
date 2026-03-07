import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://tekosoft.io';

const SLUGS = {
  home:       { es: '',            en: ''            },
  identity:   { es: 'nosotros',    en: 'about'       },
  systems:    { es: 'servicios',   en: 'services'    },
  quality:    { es: 'proceso',     en: 'process'     },
  expertise:  { es: 'tecnologias', en: 'technologies'},
} as const;

type PageKey = keyof typeof SLUGS;

export function usePageSEO(page: PageKey) {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();

  const currentLang = lang === 'en' ? 'en' : 'es';
  const slugES = SLUGS[page].es;
  const slugEN = SLUGS[page].en;

  const urlES = slugES ? `${BASE_URL}/es/${slugES}` : `${BASE_URL}/es`;
  const urlEN = slugEN ? `${BASE_URL}/en/${slugEN}` : `${BASE_URL}/en`;
  const canonical = currentLang === 'en' ? urlEN : urlES;

  return {
    tabTitle:    t(`seo.${page}.tabTitle`),
    title:       t(`seo.${page}.title`),
    description: t(`seo.${page}.description`),
    ogImage:     t('seo.ogImage'),
    canonical,
    urlES,
    urlEN,
  };
}
