import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '../hooks/usePageSEO';

export default function SystemsSolutions() {
    const { t } = useTranslation();
    const seo = usePageSEO('systems');

    const cardsData = [
        {
            id: 0,
            module: t('systems.cards.engineering.status').split('\n')[0], // "MODULE_01"
            title: t('systems.cards.engineering.title'),
            icon: "architecture",
            desc: t('systems.cards.engineering.desc'),
            tags: [t('systems.cards.engineering.footer')],
            svg: (
                <svg className="w-full h-full animate-[spin_20s_linear_infinite] text-slate-500 group-hover:text-accent transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 200 200">
                    <path d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z" opacity="0.8"></path>
                    <path d="M100 20 L100 180 M20 60 L180 60 M20 140 L180 140" opacity="0.4"></path>
                    <rect className="animate-[pulse_1s_ease-in-out_infinite]" height="80" strokeDasharray="4 4" width="80" x="60" y="60"></rect>
                </svg>
            ),
            statusLabel: t('systems.cards.engineering.status').split('\n')[1] // STATUS: STANDBY
        },
        {
            id: 1,
            module: "MODULE_02", // Not fully in translation file, we'll hardcode the id part to match pattern
            title: t('systems.cards.ai.title'),
            icon: "neurology",
            desc: t('systems.cards.ai.desc'),
            tags: ["NEURAL_NET", "DEEP_LEARNING"], // These aren't in translation file, kept static
            svg: (
                <>
                    <div className="absolute inset-0 bg-accent/20 blur-[40px] rounded-full animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg className="w-full h-full animate-[spin_15s_linear_infinite] text-slate-500 group-hover:text-accent transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="40" strokeDasharray="2 4"></circle>
                        <circle cx="100" cy="100" r="70" strokeOpacity="0.3"></circle>
                        <path d="M100 20 L100 180 M20 100 L180 100" strokeOpacity="0.2"></path>
                        <circle cx="100" cy="30" fill="currentColor" r="4"></circle>
                        <circle cx="170" cy="100" fill="currentColor" r="4"></circle>
                        <circle cx="100" cy="170" fill="currentColor" r="4"></circle>
                        <circle cx="30" cy="100" fill="currentColor" r="4"></circle>
                        <path d="M100 30 L170 100 L100 170 L30 100 Z" strokeOpacity="0.5"></path>
                    </svg>
                </>
            ),
            statusLabel: t('systems.cards.engineering.status').split('\n')[1] // Reuse standby
        },
        {
            id: 2,
            module: t('systems.cards.bi.status').split('\n')[0],
            title: t('systems.cards.bi.title'),
            icon: "monitoring",
            desc: t('systems.cards.bi.desc'),
            tags: [t('systems.cards.bi.footer')],
            svg: (
                <svg className="w-full h-full text-slate-500 group-hover:text-accent transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 200 200">
                    <path d="M30 170 L170 170 M30 170 L30 30" strokeWidth="2"></path>
                    <path className="animate-[pulse_1s_ease-in-out_infinite]" d="M30 150 L60 120 L90 140 L120 80 L150 100 L170 50" strokeWidth="2"></path>
                    <path d="M30 170 L50 190 L190 190 L170 170" opacity="0.3"></path>
                    <path d="M190 190 L190 50 L170 30" opacity="0.3"></path>
                </svg>
            ),
            statusLabel: t('systems.cards.bi.status').split('\n')[1]
        },
        {
            id: 3,
            module: t('systems.cards.staff.status').split('\n')[0],
            title: t('systems.cards.staff.title'),
            icon: "groups",
            desc: t('systems.cards.staff.desc'),
            tags: [t('systems.cards.staff.footer')],
            svg: (
                <svg className="w-full h-full text-slate-500 group-hover:text-accent transition-colors duration-500 animate-[spin_25s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 200 200">
                    <circle cx="100" cy="60" r="30"></circle>
                    <path d="M50 180 C50 130 150 130 150 180"></path>
                    <circle cx="100" cy="100" r="80" strokeDasharray="2 6"></circle>
                    <circle cx="30" cy="100" fill="currentColor" r="5"></circle>
                    <circle cx="170" cy="100" fill="currentColor" r="5"></circle>
                </svg>
            ),
            statusLabel: t('systems.cards.staff.status').split('\n')[1]
        },
        {
            id: 4,
            module: t('systems.cards.consulting.status').split('\n')[0],
            title: t('systems.cards.consulting.title'),
            icon: "strategy",
            desc: t('systems.cards.consulting.desc'),
            tags: [t('systems.cards.consulting.footer')],
            svg: (
                <svg className="w-full h-full text-slate-500 group-hover:text-accent transition-colors duration-500 animate-[spin_30s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="70"></circle>
                    <ellipse cx="100" cy="100" rx="70" ry="20" transform="rotate(45 100 100)"></ellipse>
                    <ellipse cx="100" cy="100" rx="70" ry="20" transform="rotate(-45 100 100)"></ellipse>
                    <path d="M100 30 L100 170" strokeDasharray="4 4"></path>
                    <path d="M30 100 L170 100" strokeDasharray="4 4"></path>
                </svg>
            ),
            statusLabel: t('systems.cards.consulting.status').split('\n')[1]
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
        <main className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden w-full flex-grow">

            <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col h-full">
                {/* Section Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-accent font-mono text-xs tracking-widest">{t('systems.secLabel')}</span>
                            <div className="h-[1px] w-12 bg-accent/50"></div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                            {t('systems.title1')}<br />{t('systems.title2')}
                        </h1>
                    </div>
                    <div className="md:text-right">
                        <p className="font-tech text-slate-400 text-lg uppercase tracking-wider">{t('systems.subtitle')}</p>
                        <div className="flex justify-end gap-1 mt-2 font-mono text-xs text-primary">
                            <span>///</span>
                            <span>SCROLL_X</span>
                            <span>///</span>
                        </div>
                    </div>
                </div>

                {/* Value Proposition — visible text for SEO */}
                <p className="font-tech text-slate-300 text-base md:text-lg max-w-3xl mb-10 border-l-2 border-accent/50 pl-5 leading-relaxed">
                    {t('systems.intro')}
                </p>

                {/* Service Deck Carousel */}
                <div className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 -mx-4 no-scrollbar snap-x snap-mandatory items-stretch h-[500px]">
                    {cardsData.map((card) => {
                        return (
                            <div
                                key={card.id}
                                className="snap-center shrink-0 group relative transition-all duration-500 w-[85vw] md:w-[320px] lg:w-[380px] hover:w-[85vw] md:hover:w-[420px] lg:hover:w-[480px] opacity-70 hover:opacity-100 grayscale hover:grayscale-0"
                            >
                                <div className="absolute -inset-[1px] bg-gradient-to-b from-accent via-primary to-accent rounded-tl-2xl rounded-br-2xl opacity-0 group-hover:opacity-70 blur-sm transition-opacity duration-500"></div>

                                <div className="h-full glass-panel flex flex-col relative overflow-hidden rounded-tl-2xl rounded-br-2xl transition-all duration-500 bg-transparent group-hover:bg-void/80 border-l border-white/5 group-hover:border-transparent">

                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#62C3F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-700 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-700 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

                                    <div className="h-1/2 w-full flex items-center justify-center relative overflow-hidden transition-colors duration-500 bg-gradient-to-b from-white/5 to-transparent group-hover:from-primary/10">

                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(98,195,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(98,195,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

                                        <div className="relative w-32 h-32 md:w-40 md:h-40 flex justify-center items-center transition-all duration-500">
                                            {card.svg}
                                        </div>

                                        <div className="absolute top-6 right-6 font-mono text-xs text-accent text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="animate-[pulse_1s_ease-in-out_infinite]">{t('systems.cards.ai.live')}</span><br />
                                            {t('systems.cards.ai.processing')}
                                        </div>

                                        <div className="absolute top-4 left-4 font-mono text-[10px] text-accent opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                            {card.module}<br />{card.statusLabel}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-end relative z-10 transition-all duration-300">
                                        <div className="mb-auto">
                                            <span className="material-symbols-outlined text-4xl text-accent mb-4 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(98,195,246,0.8)]">{card.icon}</span>
                                        </div>

                                        <h3 className="font-bold mb-2 transition-all duration-500 text-2xl md:text-3xl text-slate-200 group-hover:text-white group-hover:text-3xl group-hover:md:text-4xl group-hover:tracking-wide group-hover:drop-shadow-lg">{card.title}</h3>

                                        <p className="font-tech leading-tight mb-6 max-w-[90%] transition-all duration-500 text-slate-400 text-lg group-hover:text-slate-100 group-hover:text-xl border-l-[0px] border-transparent group-hover:border-l-2 group-hover:border-accent group-hover:pl-4 pl-0">
                                            {card.desc}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto transition-all duration-500 border-t border-white/10 pt-4 group-hover:border-transparent group-hover:pt-0">
                                            <div className="flex gap-2">
                                                {card.tags.map(tag => (
                                                    <span key={tag} className="font-mono transition-all duration-500 text-xs text-slate-500 border border-transparent group-hover:px-2 group-hover:py-1 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:text-accent group-hover:text-[10px] group-hover:rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <button className="text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-void flex items-center justify-center rounded-sm bg-transparent group-hover:p-2 hover:group-hover:bg-white group-hover:opacity-100 opacity-50">
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="w-12 shrink-0"></div>
                </div>

                {/* Scroll Progress Indicator */}
                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-[1px] bg-white/10 relative">
                        <div className="absolute top-0 left-0 h-full w-1/4 bg-accent shadow-[0_0_10px_#62C3F6]"></div>
                    </div>
                    <div className="flex gap-2">
                        <button className="size-10 border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent text-slate-400 hover:text-accent transition-all group">
                            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">chevron_left</span>
                        </button>
                        <button className="size-10 border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent text-slate-400 hover:text-accent transition-all group">
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
