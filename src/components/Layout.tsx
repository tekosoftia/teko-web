import { useEffect } from 'react';
import { Outlet, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo.png';

const PATH_MAP: Record<string, string> = {
  '/es/nosotros':    '/en/about',
  '/es/servicios':   '/en/services',
  '/es/proceso':     '/en/process',
  '/es/tecnologias': '/en/technologies',
  '/es':             '/en',
  '/en/about':       '/es/nosotros',
  '/en/services':    '/es/servicios',
  '/en/process':     '/es/proceso',
  '/en/technologies':'/es/tecnologias',
  '/en':             '/es',
};

export default function Layout() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = lang === 'en' ? 'en' : 'es';

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  const toggleLanguage = () => {
    const targetPath = PATH_MAP[location.pathname] ?? `/${currentLang === 'es' ? 'en' : 'es'}`;
    navigate(targetPath);
  };

  const navLinks = currentLang === 'es'
    ? [
        { label: t('layout.nav.home'),      path: '/es' },
        { label: t('layout.nav.identity'),  path: '/es/nosotros' },
        { label: t('layout.nav.systems'),   path: '/es/servicios' },
        { label: t('layout.nav.quality'),   path: '/es/proceso' },
        { label: t('layout.nav.expertise'), path: '/es/tecnologias' },
      ]
    : [
        { label: t('layout.nav.home'),      path: '/en' },
        { label: t('layout.nav.identity'),  path: '/en/about' },
        { label: t('layout.nav.systems'),   path: '/en/services' },
        { label: t('layout.nav.quality'),   path: '/en/process' },
        { label: t('layout.nav.expertise'), path: '/en/technologies' },
      ];

  return (
    <div className="bg-void text-white overflow-x-hidden selection:bg-accent selection:text-void flex flex-col relative w-full min-h-screen">
      <Helmet
        htmlAttributes={{ lang: currentLang }}
        titleTemplate="Tekosoft | %s"
        defaultTitle="Tekosoft"
      >
        <meta name="description" content={t('seo.home.description')} />
        <meta property="og:site_name" content={t('seo.siteName')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Background Grid & Effects (From Identity Matrix) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Top Navbar */}
      <header className="relative z-40 w-full border-b border-white/10 backdrop-blur-md bg-void/50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="relative size-20 flex items-center justify-center shrink-0">
              <img src={logo} alt="Logo" className="size-20 object-contain" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl tracking-wide leading-none">{t('layout.systemTitle')}</h2>
              <span className="font-mono text-[10px] text-accent tracking-[0.2em] opacity-80">{t('layout.systemSubtitle')}</span>
            </div>
          </div>
          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/es' || link.path === '/en'}
                className={({ isActive }) => `font-tech font-semibold text-sm tracking-widest transition-colors uppercase relative group flex flex-col ${isActive ? 'text-accent' : 'text-muted hover:text-accent'}`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          {/* Status & CTA */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-xs font-mono border border-white/20 px-2 py-1 rounded hover:border-accent hover:text-accent transition-colors uppercase"
            >
              {currentLang}
            </button>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm">
              <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-xs text-green-400">{t('layout.statusOnline')}</span>
            </div>
            <button className="lg:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <Outlet />

      {/* Absolute HUD Decor: Corners */}
      <div className="fixed bottom-8 left-8 hidden lg:block font-mono text-[10px] text-accent/40 z-30 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span>{t('layout.footer.coordinates')}</span>
          <span className="text-white">{t('layout.footer.coordValue')}</span>
          <div className="w-full h-[1px] bg-accent/30 mt-1"></div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block font-mono text-[10px] text-right text-primary/60 z-30 pointer-events-none">
        <div className="flex flex-col gap-1 items-end">
          <span>{t('layout.footer.sysStatus')}</span>
          <span className="text-white flex items-center gap-2">
            {t('layout.footer.optimal')}
            <span className="block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          </span>
          <div className="w-24 h-[1px] bg-primary/30 mt-1"></div>
        </div>
      </div>

      {/* Vertical Binary Stream (Left Edge) */}
      <div className="fixed top-1/2 left-2 -translate-y-1/2 w-4 flex flex-col gap-2 items-center font-mono text-[9px] text-white/10 select-none pointer-events-none hidden md:flex">
        <span>0</span><span>1</span><span className="text-accent/40">0</span><span>1</span><span>1</span><span>0</span><span className="text-primary/40">1</span><span>0</span>
      </div>
    </div>
  );
}
