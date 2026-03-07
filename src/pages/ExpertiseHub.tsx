import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '../hooks/usePageSEO';

export default function ExpertiseHub() {
    const { t } = useTranslation();
    const seo = usePageSEO('expertise');

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
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center py-16 px-6 overflow-hidden w-full">
            <div className="w-full max-w-7xl relative">
                {/* Section Header */}
                <div className="flex flex-wrap justify-between items-end gap-6 mb-12 border-l-2 border-accent pl-6 py-2 relative">
                    <div className="absolute -top-10 left-[-2px] h-10 w-0.5 bg-gradient-to-t from-accent to-transparent"></div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white font-display uppercase">
                            {t('expertise.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">{t('expertise.title2')}</span>
                        </h2>
                        <div className="flex items-center gap-3 font-mono text-xs text-accent/80 tracking-widest mt-2">
                            <span className="material-symbols-outlined text-sm">terminal</span>
                            <span>{t('expertise.secLabel')}</span>
                        </div>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-muted font-tech text-lg max-w-md leading-tight">
                            {t('expertise.subtitle')}
                        </p>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative">
                    {/* 1. Core Architecture (Large Block) */}
                    <div className="col-span-1 md:col-span-8 glass-panel rounded-lg p-8 group relative overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(109,40,217,0.15)]">
                        <div className="corner-bracket corner-tl"></div>
                        <div className="corner-bracket corner-tr"></div>
                        <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                            <h3 className="font-tech font-bold text-xl uppercase tracking-widest text-white flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                                {t('expertise.cards.core.title')}
                            </h3>
                            <span className="font-mono text-xs text-muted opacity-50">{t('expertise.cards.core.mod')}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                            <div>
                                <span className="text-xs font-mono text-accent mb-3 block uppercase">{t('expertise.cards.core.backend')}</span>
                                <div className="flex flex-wrap gap-2">
                                    {['Node.js', 'Rust', 'GoLang', 'Python', 'PostgreSQL', 'GraphQL'].map(tech => (
                                        <span key={tech} className="tech-tag bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-medium rounded-full text-slate-300 transition-all duration-200 hover:bg-accent/10 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(98,195,246,0.2)] hover:-translate-y-px">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-mono text-accent mb-3 block uppercase">{t('expertise.cards.core.frontend')}</span>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Next.js 14', 'Vue 3', 'Tailwind CSS', 'Three.js', 'WebGL'].map(tech => (
                                        <span key={tech} className="tech-tag bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-medium rounded-full text-slate-300 transition-all duration-200 hover:bg-accent/10 hover:border-accent hover:text-accent hover:shadow-[0_0_10px_rgba(98,195,246,0.2)] hover:-translate-y-px">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. AI & Intelligence (Tall Block) */}
                    <div className="col-span-1 md:col-span-4 row-span-2 glass-panel rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(109,40,217,0.15)]">
                        <div>
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <h3 className="font-tech font-bold text-xl uppercase tracking-widest text-white">
                                    {t('expertise.cards.ai.title')}
                                </h3>
                                <span className="material-symbols-outlined text-accent">neurology</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <div className="flex justify-between text-sm font-mono text-slate-400 mb-1">
                                        <span>{t('expertise.cards.ai.llm')}</span>
                                        <span className="text-accent">98%</span>
                                    </div>
                                    <div className="h-1 w-full bg-void rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-[98%] shadow-[0_0_10px_#62C3F6]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-mono text-slate-400 mb-1">
                                        <span>{t('expertise.cards.ai.cv')}</span>
                                        <span className="text-accent">85%</span>
                                    </div>
                                    <div className="h-1 w-full bg-void rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[85%]"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-2">
                                {['TensorFlow', 'PyTorch', 'OpenAI API', 'HuggingFace'].map(tech => (
                                    <span key={tech} className="bg-white/5 border border-accent/30 px-2 py-1 text-xs font-bold rounded uppercase text-slate-300">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-dashed border-white/10">
                            <div className="flex items-center gap-2 text-xs font-mono text-muted">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                                <span>{t('expertise.cards.ai.training')}</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Infrastructure (Medium Block) */}
                    <div className="col-span-1 md:col-span-4 glass-panel rounded-lg p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(109,40,217,0.15)]">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-tech font-bold text-lg uppercase tracking-widest text-white">
                                {t('expertise.cards.infra.title')}
                            </h3>
                            <span className="material-symbols-outlined text-muted text-lg">cloud_queue</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'].map(tech => (
                                <span key={tech} className="tech-tag bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-medium rounded-full text-slate-300">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* 4. Design & Strategy (Medium Block) */}
                    <div className="col-span-1 md:col-span-4 glass-panel rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(109,40,217,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <h3 className="font-tech font-bold text-lg uppercase tracking-widest text-white">
                                {t('expertise.cards.design.title')}
                            </h3>
                            <span className="material-symbols-outlined text-muted text-lg">design_services</span>
                        </div>
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {['Figma', 'Rive', 'Spline 3D', 'After Effects'].map(tech => (
                                <span key={tech} className="tech-tag bg-white/5 border border-white/10 px-3 py-1.5 text-sm font-medium rounded-full text-slate-300">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* 5. Quality Assurance (Small Strip) */}
                    <div className="col-span-1 md:col-span-12 glass-panel rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(109,40,217,0.15)]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
                                <span className="material-symbols-outlined text-lg">verified_user</span>
                            </div>
                            <div>
                                <h3 className="font-tech font-bold text-sm uppercase tracking-widest text-white">{t('expertise.cards.qa.title')}</h3>
                                <p className="text-xs text-muted">{t('expertise.cards.qa.desc')}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['CYPRESS', 'JEST', 'SELENIUM'].map(tech => (
                                <div key={tech} className="flex items-center gap-2 px-3 py-1 bg-void/50 rounded border border-white/5">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                    <span className="text-xs font-mono text-slate-300">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
