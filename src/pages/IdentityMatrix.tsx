import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '../hooks/usePageSEO';

export default function IdentityMatrix() {
    const { t } = useTranslation();
    const seo = usePageSEO('identity');

    const cards = [
        {
            id: 'SYS_ID_01',
            icon: 'diamond',
            title: t('identity.cards.precision.title'),
            desc: t('identity.cards.precision.desc'),
            status: t('identity.cards.precision.status').replace('STATUS: ', '').replace('ESTADO: ', ''),
            statusIcon: 'arrow_forward',
            mt: 'md:mt-0',
        },
        {
            id: 'SYS_ID_02',
            icon: 'shield',
            title: t('identity.cards.defense.title'),
            desc: t('identity.cards.defense.desc'),
            status: t('identity.cards.defense.status').replace('STATUS: ', '').replace('ESTADO: ', ''),
            statusIcon: 'lock',
            mt: 'md:mt-20',
        },
        {
            id: 'SYS_ID_03',
            icon: 'favorite',
            title: t('identity.cards.symbiosis.title'),
            desc: t('identity.cards.symbiosis.desc'),
            status: t('identity.cards.symbiosis.status').replace('STATUS: ', '').replace('ESTADO: ', ''),
            statusIcon: 'graphic_eq',
            mt: 'md:-mt-10',
        },
        {
            id: 'SYS_ID_04',
            icon: 'visibility',
            title: t('identity.cards.openSource.title'),
            desc: t('identity.cards.openSource.desc'),
            status: t('identity.cards.openSource.status').replace('STATUS: ', '').replace('ESTADO: ', ''),
            statusIcon: 'code',
            mt: 'md:mt-12',
        }
    ];

    return (
        <>
        <Helmet>
            <title>{seo.tabTitle}</title>
            <meta name="description" content={seo.description} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={seo.canonical} />
            <meta property="og:image" content={seo.ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <link rel="canonical" href={seo.canonical} />
            <link rel="alternate" hrefLang="es" href={seo.urlES} />
            <link rel="alternate" hrefLang="en" href={seo.urlEN} />
            <link rel="alternate" hrefLang="x-default" href={seo.urlES} />
        </Helmet>
        <main className="relative z-10 w-full flex-grow flex flex-col items-center py-20 px-4 md:px-8">
            <div className="max-w-7xl w-full mx-auto">
                {/* Section Header */}
                <header className="mb-16 md:mb-24 relative group">
                    {/* Decorative HUD Lines */}
                    <div className="absolute -left-12 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden md:block"></div>
                    <div className="absolute -left-16 top-4 font-mono text-[10px] text-accent/60 -rotate-90 hidden md:block">{t('identity.secLabel')}</div>
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-2 h-2 bg-accent rounded-sm animate-pulse"></span>
                                <span className="font-mono text-accent text-xs tracking-widest uppercase">{t('identity.loaded')}</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 group-hover:to-accent transition-all duration-700">
                                {t('identity.title1')}<br />
                                <span className="text-stroke-1 text-transparent relative">
                                    {t('identity.title2')}
                                    <span className="absolute left-0 top-0 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]">{t('identity.title2')}</span>
                                </span>
                            </h2>
                        </div>
                        <div className="max-w-md text-right md:text-left relative">
                            <div className="absolute -top-6 -left-6 text-6xl text-white/5 font-display font-bold select-none -z-10">02</div>
                            <p className="text-text-muted text-lg leading-relaxed border-l-2 border-accent/30 pl-4">
                                {t('identity.description')}
                            </p>
                        </div>
                    </div>
                </header>
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16 relative">
                    {/* Decorative Background Diagonal Line */}
                    <div className="absolute inset-0 border-l border-white/5 -skew-x-12 left-1/2 pointer-events-none hidden md:block"></div>
                    {cards.map((card) => {
                        return (
                            <div
                                key={card.id}
                                className={`group relative perspective-1000 ${card.mt} hover:z-20`}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary transition duration-500 blur rounded-xl opacity-0 group-hover:opacity-100"></div>
                                <div className="glass-panel relative h-full p-8 rounded-xl border-b-2 transition-all duration-500 transform border-b-accent/50 group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:shadow-neon">
                                    <div className="absolute top-4 right-4 font-mono text-[9px] text-white/20">{card.id}</div>
                                    <div className="mb-6 inline-flex p-3 rounded-lg border transition-colors bg-white/5 border-white/10 group-hover:bg-accent/20 group-hover:border-accent/50">
                                        <span className="material-symbols-outlined text-3xl text-accent">{card.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-3 transition-colors group-hover:text-accent">{card.title}</h3>
                                    <p className="text-text-muted font-body text-lg">
                                        {card.desc}
                                    </p>
                                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between transition-opacity opacity-50 group-hover:opacity-100">
                                        <span className="font-mono text-xs text-accent">STATUS: {card.status}</span>
                                        <span className="material-symbols-outlined text-sm text-accent">{card.statusIcon}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Bottom UI Decor */}
                <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-6">
                    <div className="flex gap-4">
                        <div className="h-1 w-12 bg-accent/50 skew-x-12"></div>
                        <div className="h-1 w-4 bg-accent/30 skew-x-12"></div>
                        <div className="h-1 w-2 bg-primary/30 skew-x-12"></div>
                    </div>
                    <div className="font-mono text-xs text-white/30 tracking-widest uppercase">
                        {t('identity.scroll')}
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
