import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { usePageSEO } from '../hooks/usePageSEO';

export default function HomeCommand() {
    const { t } = useTranslation();
    const seo = usePageSEO('home');
    return (
        <>
        <Helmet>
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
        <main className="relative z-10 flex-grow w-full flex items-center justify-center px-6 overflow-hidden">
            <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center relative h-full py-12 lg:py-0">
                {/* Left Column: Typography & Action */}
                <div className="flex flex-col gap-8 z-20 order-2 lg:order-1">
                    {/* Decorative Label */}
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-12 bg-accent/50"></div>
                        <span className="font-mono text-accent text-xs tracking-[0.2em]">{t('home.protocol')}</span>
                    </div>
                    {/* Main Heading */}
                    <div className="relative">
                        <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tighter text-white uppercase">
                            {t('home.title1')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-primary bg-[length:200%_auto] animate-pulse-glow">{t('home.title2')}</span>
                        </h1>
                        {/* Decorative glitch blocks behind text */}
                        <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
                    </div>
                    {/* Subtitle */}
                    <p className="font-tech text-lg md:text-xl text-muted max-w-lg border-l-2 border-primary/50 pl-6 py-1">
                        {t('home.subtitle')}
                    </p>
                    {/* CTA Area */}
                    <div className="pt-6 flex flex-wrap gap-6 items-center">
                        <button className="group relative px-8 py-4 bg-accent text-void font-bold font-display tracking-widest uppercase text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(98,195,246,0.6)] -skew-[12deg] glitch-hover">
                            <span className="relative z-10 flex items-center gap-2 skew-[12deg]">
                                {t('home.initProject')}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </span>
                            {/* Button Glitch Effect Overlay */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                        <a className="font-mono text-sm text-white/70 hover:text-accent flex items-center gap-2 group transition-colors" href="#">
                            <span className="w-8 h-[1px] bg-white/30 group-hover:bg-accent transition-colors"></span>
                            {t('home.viewCaps')}
                        </a>
                    </div>
                    {/* Bottom Metrics (Decor) */}
                    <div className="mt-12 flex gap-8 font-mono text-[10px] text-white/40">
                        <div>
                            <span className="block text-accent mb-1">{t('home.metrics.latency')}</span>
                            {t('home.metrics.latencyValue')}
                        </div>
                        <div>
                            <span className="block text-accent mb-1">{t('home.metrics.uptime')}</span>
                            {t('home.metrics.uptimeValue')}
                        </div>
                        <div>
                            <span className="block text-accent mb-1">{t('home.metrics.encryption')}</span>
                            {t('home.metrics.encryptionValue')}
                        </div>
                    </div>
                </div>
                {/* Right Column: Visual Anchor (AI & Data Central Core) */}
                <div className="relative flex items-center justify-center min-h-[600px] lg:min-h-[800px] order-1 lg:order-2 perspective-[1000px] w-full lg:w-[110%] lg:-ml-[5%]">

                    {/* Background Orbit/Rings System */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-x-[20%] lg:translate-x-[30%] opacity-40">
                        {/* Outer Ring */}
                        <div className="w-[450px] h-[450px] md:w-[750px] md:h-[750px] rounded-full border border-white/5 animate-spin-slow absolute"></div>
                        {/* Middle Ring (Dashed) */}
                        <div className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full border border-dashed border-accent/20 animate-spin-reverse-slow absolute"></div>
                        {/* Inner Glow Ring */}
                        <div className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full border border-primary/30 shadow-[0_0_40px_rgba(109,40,217,0.3)] animate-pulse-glow absolute"></div>

                        {/* Data Nodes on Rings */}
                        <div className="absolute w-[750px] h-[750px] animate-spin-slow hidden md:block">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-void border border-accent/50 px-2 py-0.5 text-[8px] font-mono text-accent rounded-sm backdrop-blur-sm">NODE_ALFA</div>
                        </div>
                        <div className="absolute w-[600px] h-[600px] animate-spin-reverse-slow hidden md:block">
                            <div className="absolute bottom-[10%] right-[10%] bg-void border border-primary/50 px-2 py-0.5 text-[8px] font-mono text-primary rounded-sm backdrop-blur-sm">DATA_STREAM</div>
                        </div>
                    </div>

                    {/* AI & Data Analytics Central Core */}
                    <div className="relative z-10 w-full h-[600px] lg:h-[800px]">

                        {/* Central Corporate Panel (Who we are) - Right side */}
                        <div className="absolute right-[-50%] top-1/2 -translate-y-1/2 z-10 w-[260px] lg:w-[340px] min-h-[350px] glass-panel p-10 rounded-lg cyber-corner border border-primary/50 bg-void/90 backdrop-blur-xl shadow-[0_0_50px_rgba(109,40,217,0.2)] flex flex-col justify-center">
                            <div className="text-center mb-6">
                                <h2 className="font-mono text-accent text-base tracking-[0.3em] uppercase">{t('home.aboutUs.title', 'QUIENES SOMOS')}</h2>
                            </div>
                            <p className="font-tech text-white/80 text-sm xl:text-base leading-relaxed text-center">
                                {t('home.aboutUs.description', 'TEKOSOFT S.A.S. es una firma de ingeniería dedicada al desarrollo, consultoría y comercialización de soluciones informáticas integrales. Nuestra operación abarca desde IA y analítica de datos (BI) hasta la exportación de servicios de ingeniería con estándares globales.')}
                            </p>
                        </div>

                        {/* Module 1: Software Engineering (Top) */}
                        <div className="absolute top-[-35%] left-[20%] glass-panel p-3 rounded-lg cyber-corner animate-float z-20 shadow-neon border-t border-l border-accent/40 bg-void/80 backdrop-blur-md hidden sm:block w-[240px]" style={{ animationDelay: '0s' }}>
                            <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1.5">
                                <span className="material-symbols-outlined text-primary text-[14px]">code</span>
                                <span className="font-mono text-[9px] text-muted tracking-wide uppercase">{t('home.liveStats.service1')}</span>
                            </div>
                            <div className="font-display font-bold text-base text-white whitespace-nowrap">{t('home.liveStats.service1Title')}</div>
                            <div className="text-[7px] font-mono text-accent/80 tracking-widest mt-1 uppercase">{t('home.liveStats.service1Desc')}</div>
                        </div>

                        {/* Module 2: AI (Upper Left) */}
                        <div className="absolute top-[-30%] left-[5%] glass-panel p-3 rounded-lg cyber-corner animate-float z-20 shadow-neon border-l border-primary/40 bg-void/80 backdrop-blur-md hidden sm:block w-[240px]" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[14px]">psychology</span>
                                    <span className="font-mono text-[9px] text-primary tracking-wide uppercase">{t('home.liveStats.service2')}</span>
                                </div>
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                            </div>
                            <div className="font-display font-bold text-base text-white whitespace-nowrap">{t('home.liveStats.service2Title')}</div>
                            <div className="text-[7px] font-mono text-muted tracking-widest mt-1 uppercase">{t('home.liveStats.service2Desc')}</div>
                        </div>

                        {/* Module 3: BI (Middle Left - furthest left) */}
                        <div className="absolute top-[-25%] left-[0%] glass-panel p-3 rounded-lg cyber-corner animate-float z-20 shadow-neon border-l border-accent/40 bg-void/80 backdrop-blur-md hidden sm:block w-[240px]" style={{ animationDelay: '0.8s' }}>
                            <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1.5">
                                <span className="material-symbols-outlined text-accent text-[14px]">monitoring</span>
                                <span className="font-mono text-[9px] text-muted tracking-wide uppercase">{t('home.liveStats.service3')}</span>
                            </div>
                            <div className="font-display font-bold text-base text-white whitespace-nowrap">{t('home.liveStats.service3Title')}</div>
                            <div className="text-[7px] font-mono text-muted tracking-widest mt-1 uppercase">{t('home.liveStats.service3Desc')}</div>
                        </div>

                        {/* Module 4: Staff Augmentation (Lower Left) */}
                        <div className="absolute top-[-20%] left-[5%] glass-panel p-3 rounded-lg cyber-corner animate-float z-20 shadow-neon border-b border-l border-primary/40 bg-void/80 backdrop-blur-md hidden sm:block w-[240px]" style={{ animationDelay: '1.2s' }}>
                            <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1.5">
                                <span className="material-symbols-outlined text-primary text-[14px]">groups</span>
                                <span className="font-mono text-[9px] text-muted tracking-wide uppercase">{t('home.liveStats.service4')}</span>
                            </div>
                            <div className="font-display font-bold text-base text-white whitespace-nowrap">{t('home.liveStats.service4Title')}</div>
                            <div className="text-[7px] font-mono text-muted tracking-widest mt-1 uppercase">{t('home.liveStats.service4Desc')}</div>
                        </div>

                        {/* Module 5: Strategic Consulting (Bottom) */}
                        <div className="absolute top-[-15%] left-[20%] glass-panel p-3 rounded-lg cyber-corner animate-float z-20 shadow-neon border-b border-accent/40 bg-void/80 backdrop-blur-md hidden sm:block w-[240px]" style={{ animationDelay: '1.6s' }}>
                            <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1.5">
                                <span className="material-symbols-outlined text-accent text-[14px]">lightbulb</span>
                                <span className="font-mono text-[9px] text-muted tracking-wide uppercase">{t('home.liveStats.service5')}</span>
                            </div>
                            <div className="font-display font-bold text-base text-white whitespace-nowrap">{t('home.liveStats.service5Title')}</div>
                            <div className="text-[7px] font-mono text-muted tracking-widest mt-1 uppercase">{t('home.liveStats.service5Title')}</div>
                        </div>

                        {/* Neural Network SVG Lines connecting modules to central panel */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 hidden lg:block overflow-visible">
                            {/* Line to M1 (Top) */}
                            <line x1="70%" y1="40%" x2="35%" y2="15%" stroke="url(#cyan-purple)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[pulse_3s_linear_infinite]" />
                            <circle cx="35%" cy="15%" r="4" fill="#62C3F6" className="animate-ping" />

                            {/* Line to M2 (Upper Left) */}
                            <line x1="70%" y1="43%" x2="20%" y2="30%" stroke="url(#cyan-purple)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[pulse_4s_linear_infinite]" />
                            <circle cx="20%" cy="30%" r="4" fill="#6D28D9" className="animate-ping" />

                            {/* Line to M3 (Middle Left) */}
                            <line x1="70%" y1="50%" x2="15%" y2="47%" stroke="#62C3F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" className="animate-[pulse_3s_linear_infinite]" />
                            <circle cx="15%" cy="47%" r="3" fill="#62C3F6" opacity="0.6" />

                            {/* Line to M4 (Lower Left) */}
                            <line x1="70%" y1="55%" x2="20%" y2="63%" stroke="#6D28D9" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
                            <circle cx="20%" cy="63%" r="3" fill="#6D28D9" opacity="0.5" />

                            {/* Line to M5 (Bottom) */}
                            <line x1="70%" y1="58%" x2="35%" y2="78%" stroke="url(#cyan-purple)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                            <circle cx="35%" cy="78%" r="3" fill="#62C3F6" opacity="0.7" />

                            {/* Gradients */}
                            <defs>
                                <linearGradient id="cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#62C3F6" />
                                    <stop offset="100%" stopColor="#6D28D9" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
