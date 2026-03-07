import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '../hooks/usePageSEO';

export default function QualityProtocol() {
    const { t } = useTranslation();
    const seo = usePageSEO('quality');

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
        <main className="flex-grow relative w-full flex flex-col items-center py-20 z-10">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Circuit Lines Decoration */}
                <svg className="absolute top-[30%] left-0 w-64 h-full opacity-20" fill="none" viewBox="0 0 200 600">
                    <path d="M0 50 H 50 L 80 80 V 200 L 120 240 H 200" stroke="#62C3F6" strokeWidth="1"></path>
                    <circle cx="50" cy="50" fill="#62C3F6" r="2"></circle>
                    <circle cx="80" cy="80" fill="#62C3F6" r="2"></circle>
                </svg>
                <svg className="absolute bottom-[20%] right-0 w-64 h-full opacity-20 rotate-180" fill="none" viewBox="0 0 200 600">
                    <path d="M0 50 H 50 L 80 80 V 200 L 120 240 H 200" stroke="#62C3F6" strokeWidth="1"></path>
                </svg>
            </div>

            {/* Section Header */}
            <div className="relative z-10 flex flex-col items-center mb-24 px-4 text-center max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-accent font-mono text-xs tracking-widest uppercase border border-accent/30 px-2 py-0.5 rounded bg-accent/5">{t('quality.secLabel')}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                    {t('quality.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">{t('quality.title2')}</span>
                </h1>
                <p className="text-muted text-lg font-tech max-w-xl">
                    {t('quality.description')}
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative w-full max-w-[1000px] px-4 md:px-8">
                {/* Central Trace Line (Vertical) */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] md:transform md:-translate-x-1/2 bg-[#1e1e2d] overflow-hidden">
                    <div className="absolute inset-0 w-full h-full trace-line opacity-70"></div>
                </div>

                {/* Step 01 */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mb-20 group">
                    <div className="order-2 md:order-1 w-full md:w-[45%] pl-12 md:pl-0 md:pr-12 md:text-right">
                        <div className="glass-panel p-6 md:p-8 rounded-lg cyber-corner transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(98,195,246,0.15)]">
                            <div className="font-mono text-accent text-xs mb-2 opacity-80">{t('quality.steps.01.step')}</div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors">{t('quality.steps.01.title')}</h3>
                            <p className="text-muted font-tech text-lg leading-relaxed">{t('quality.steps.01.desc')}</p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-start md:justify-end">
                                {(t('quality.steps.01.tags', { returnObjects: true }) as string[]).map((tag, index) => (
                                    <span key={index} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-void border-2 border-accent/30 hexagon flex items-center justify-center shadow-[0_0_15px_rgba(98,195,246,0.2)] group-hover:border-accent group-hover:shadow-[0_0_25px_rgba(98,195,246,0.6)] transition-all duration-300 z-20">
                            <span className="material-symbols-outlined text-accent text-xl md:text-2xl group-hover:scale-110 transition-transform">architecture</span>
                        </div>
                    </div>
                    <div className="order-3 w-full md:w-[45%] hidden md:block"></div>
                </div>

                {/* Step 02 */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mb-20 group">
                    <div className="order-3 md:order-1 w-full md:w-[45%] hidden md:block"></div>
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-void border-2 border-accent/30 hexagon flex items-center justify-center shadow-[0_0_15px_rgba(98,195,246,0.2)] group-hover:border-accent group-hover:shadow-[0_0_25px_rgba(98,195,246,0.6)] transition-all duration-300 z-20">
                            <span className="material-symbols-outlined text-accent text-xl md:text-2xl group-hover:scale-110 transition-transform">foundation</span>
                        </div>
                    </div>
                    <div className="order-2 md:order-3 w-full md:w-[45%] pl-12 md:pl-12">
                        <div className="glass-panel p-6 md:p-8 rounded-lg cyber-corner transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(98,195,246,0.15)]">
                            <div className="font-mono text-accent text-xs mb-2 opacity-80">{t('quality.steps.02.step')}</div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors">{t('quality.steps.02.title')}</h3>
                            <p className="text-muted font-tech text-lg leading-relaxed">{t('quality.steps.02.desc')}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {(t('quality.steps.02.tags', { returnObjects: true }) as string[]).map((tag, index) => (
                                    <span key={index} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 03 */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mb-20 group">
                    <div className="order-2 md:order-1 w-full md:w-[45%] pl-12 md:pl-0 md:pr-12 md:text-right">
                        <div className="glass-panel p-6 md:p-8 rounded-lg cyber-corner transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(98,195,246,0.15)]">
                            <div className="font-mono text-accent text-xs mb-2 opacity-80">{t('quality.steps.03.step')}</div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors">{t('quality.steps.03.title')}</h3>
                            <p className="text-muted font-tech text-lg leading-relaxed">{t('quality.steps.03.desc')}</p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-start md:justify-end">
                                {(t('quality.steps.03.tags', { returnObjects: true }) as string[]).map((tag, index) => (
                                    <span key={index} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-void border-2 border-accent/30 hexagon flex items-center justify-center shadow-[0_0_15px_rgba(98,195,246,0.2)] group-hover:border-accent group-hover:shadow-[0_0_25px_rgba(98,195,246,0.6)] transition-all duration-300 z-20">
                            <span className="material-symbols-outlined text-accent text-xl md:text-2xl group-hover:scale-110 transition-transform">verified_user</span>
                        </div>
                    </div>
                    <div className="order-3 w-full md:w-[45%] hidden md:block"></div>
                </div>

                {/* Step 04 */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mb-20 group">
                    <div className="order-3 md:order-1 w-full md:w-[45%] hidden md:block"></div>
                    <div className="order-1 md:order-2 absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-void border-2 border-accent/30 hexagon flex items-center justify-center shadow-[0_0_15px_rgba(98,195,246,0.2)] group-hover:border-accent group-hover:shadow-[0_0_25px_rgba(98,195,246,0.6)] transition-all duration-300 z-20">
                            <span className="material-symbols-outlined text-accent text-xl md:text-2xl group-hover:scale-110 transition-transform">gavel</span>
                        </div>
                    </div>
                    <div className="order-2 md:order-3 w-full md:w-[45%] pl-12 md:pl-12">
                        <div className="glass-panel p-6 md:p-8 rounded-lg cyber-corner transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(98,195,246,0.15)]">
                            <div className="font-mono text-accent text-xs mb-2 opacity-80">{t('quality.steps.04.step')}</div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors">{t('quality.steps.04.title')}</h3>
                            <p className="text-muted font-tech text-lg leading-relaxed">{t('quality.steps.04.desc')}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {(t('quality.steps.04.tags', { returnObjects: true }) as string[]).map((tag, index) => (
                                    <span key={index} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 05 */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full mb-10 group">
                    <div className="mb-8 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full"></div>
                        <div className="w-20 h-20 bg-void border-2 border-accent hexagon flex items-center justify-center shadow-[0_0_30px_rgba(98,195,246,0.4)] z-20 relative animate-pulse-glow">
                            <span className="material-symbols-outlined text-accent text-4xl">rocket_launch</span>
                        </div>
                    </div>
                    <div className="w-full max-w-2xl text-center">
                        <div className="glass-panel p-8 rounded-lg cyber-corner border-accent/30 shadow-[0_0_30px_rgba(98,195,246,0.1)]">
                            <div className="font-mono text-accent text-sm mb-2 opacity-100">{t('quality.steps.05.step')}</div>
                            <h3 className="text-3xl font-display font-bold text-white mb-4">{t('quality.steps.05.title')}</h3>
                            <p className="text-muted font-tech text-lg leading-relaxed mb-6">{t('quality.steps.05.desc')}</p>
                            <button className="inline-flex items-center gap-2 bg-accent text-void px-8 py-3 rounded font-bold font-display uppercase tracking-wider text-sm hover:bg-white transition-colors -skew-x-12">
                                <span className="skew-x-[12deg]">{t('quality.steps.05.btn')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
