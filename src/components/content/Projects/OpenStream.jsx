import { useState, useEffect, useRef } from 'react';
import '../../../css/content/AI_Data_Extraction.css'; // Reusing your existing project CSS
import { VscLinkExternal, VscGithub, VscCheck, VscLayers } from 'react-icons/vsc';

const STEPS = [
    {
        num: 1,
        label: 'Responsive<br/>Shell',
        sub: 'React 19',
        title: 'Step 1 — Mobile-First Shell & State Layer',
        body: 'Built with <strong>React 19</strong>, <strong>Tailwind CSS v4</strong>, and <strong>React Router 7</strong>. Utilizes a responsive <code>PhoneShell</code> (420px desktop viewport frame collapsing to full-bleed on mobile) with <code>h-dvh</code> units to eliminate iOS Safari toolbar dead space. Global session and social graphs are isolated in modular <code>AuthContext</code> and <code>DataContext</code> layers.'
    },
    {
        num: 2,
        label: 'REST API<br/>Routing',
        sub: 'Spring Boot',
        title: 'Step 2 — Layered Controllers & DTO Contract',
        body: 'Powered by <strong>Spring Boot 4.1</strong> on <strong>Java 25</strong>. Controllers strictly map HTTP requests without business logic. API contracts are isolated through dedicated Request/Response <strong>DTOs</strong> built inside transaction boundaries to eliminate <code>LazyInitializationException</code>, coupled with a global <code>@RestControllerAdvice</code> for centralized error handling.'
    },
    {
        num: 3,
        label: 'Relational<br/>Feed Engine',
        sub: 'PostgreSQL',
        title: 'Step 3 — Follow Graph & Single-Roundtrip Feed',
        body: 'Backed by <strong>PostgreSQL 18 (Neon Serverless)</strong> and <strong>Hibernate 7.4</strong>. Solves chronological timeline assembly via an optimized JPQL join across user follow records and post tables, querying the user’s feed and follow relationships in a single database roundtrip.'
    },
    {
        num: 4,
        label: 'Testing &<br/>CI/CD',
        sub: 'Docker + Render',
        title: 'Step 4 — Isolated Service Tests & Multi-Stage Deployment',
        body: 'Tested with <strong>JUnit 5</strong> and <strong>Mockito</strong> using constructor injection, running service-layer test suites in under a second without spinning up a database. Containerized via a multi-stage Docker build separating dependency caching from source compilations, deployed across Render and GitHub Actions.'
    }
];

const HIGHLIGHTS = [
    { label: 'Single-Query Feed Engine', desc: 'JPQL join queries timeline posts across the follower graph in one database roundtrip.' },
    { label: 'Dynamic Viewport (h-dvh)', desc: 'Tracks dynamic iOS and Android browser chrome to prevent clipping and layout jumps.' },
    { label: 'Strict Layer Isolation', desc: 'Zero entity leakage via DTO boundaries and centralized @RestControllerAdvice exception handling.' },
    { label: 'Sub-Second Mockito Suite', desc: 'Constructor-injected isolated service unit tests running with zero database overhead.' }
];

const TECH = [
    { label: 'Java 25', type: 'primary' },
    { label: 'Spring Boot 4.1', type: 'primary' },
    { label: 'React 19', type: 'primary' },
    { label: 'PostgreSQL 18 (Neon)', type: 'infra' },
    { label: 'Hibernate 7.4', type: '' },
    { label: 'Tailwind CSS v4', type: '' },
    { label: 'Vite', type: '' },
    { label: 'Docker (Multi-stage)', type: 'infra' },
    { label: 'JUnit 5 & Mockito', type: 'ai' },
    { label: 'React Router 7', type: '' },
    { label: 'Render Cloud', type: 'infra' },
    { label: 'GitHub Actions CI/CD', type: 'infra' }
];

const RESULTS = [
    { value: 14, suffix: '', desc: 'Service unit tests passing in < 1s with Mockito isolation', green: true },
    { value: 1, suffix: '', desc: 'Single database roundtrip for chronological feed generation', green: true },
    { value: 4, suffix: '', desc: 'Mobile-first client views (Login, Feed, Search, Profile)', green: false },
    { value: 280, suffix: ' char', desc: 'Character limit validation enforced across business rules', green: false },
];

/* ── Animated counter hook ── */
function useCountUp(target, suffix, isFloat, trigger) {
    const [display, setDisplay] = useState('0' + suffix);
    useEffect(() => {
        if (!trigger) return;
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
            const elapsed = Math.min(now - start, duration);
            const progress = elapsed / duration;
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = target * ease;
            setDisplay((isFloat ? val.toFixed(2) : Math.floor(val).toLocaleString()) + suffix);
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay((isFloat ? target.toFixed(2) : target.toLocaleString()) + suffix);
        };
        requestAnimationFrame(tick);
    }, [trigger, target, suffix, isFloat]);
    return display;
}

function AnimatedStat({ value, suffix, className }) {
    const ref = useRef(null);
    const [triggered, setTriggered] = useState(false);
    const isFloat = String(value).includes('.');
    const display = useCountUp(value, suffix, isFloat, triggered);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return <span ref={ref} className={className || 'p1-stat-value'}>{display}</span>;
}

const OpenStream = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        let idx = 0;
        const timer = setInterval(() => {
            idx = idx + 1;
            setActiveStep(idx);
            if (idx === STEPS.length - 1) clearInterval(timer);
        }, 900);
        return () => clearInterval(timer);
    }, []);

    const step = STEPS[activeStep];

    return (
        <div className="p1-container openstream-container">
            {/* Embedded scoped responsive fixes */}
            <style>{`
                .openstream-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-top: 1.25rem;
                }
                .os-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    padding: 0.5rem 1rem;
                    font-size: 0.85rem;
                    font-weight: 500;
                    border-radius: 6px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }
                .os-btn-primary {
                    background: #2563eb;
                    color: #ffffff;
                    border: 1px solid #3b82f6;
                }
                .os-btn-primary:hover {
                    background: #1d4ed8;
                }
                .os-btn-secondary {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    border: 1px solid #333333;
                }
                .os-btn-secondary:hover {
                    background: #2d2d2d;
                    color: #ffffff;
                    border-color: #4f4f4f;
                }
                .os-highlights-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .os-highlight-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    padding: 1rem;
                }
                .os-highlight-title {
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: #61dafb;
                    margin-bottom: 0.35rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .os-highlight-desc {
                    font-size: 0.825rem;
                    color: #a0a0a0;
                    line-height: 1.4;
                }
                @media (max-width: 1024px) {
                    .openstream-container {
                        padding: 1rem !important;
                        overflow-x: hidden;
                    }
                    .p1-hero-title {
                        font-size: 1.8rem !important;
                    }
                    .p1-pipeline-track {
                        display: flex;
                        overflow-x: auto;
                        padding-bottom: 0.75rem;
                        gap: 1.25rem;
                        scrollbar-width: thin;
                    }
                    .p1-pipeline-step {
                        min-width: 75px;
                        flex-shrink: 0;
                    }
                    .openstream-links {
                        flex-direction: column;
                    }
                    .os-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>

            {/* ── HERO ── */}
            <header className="p1-hero">
                <div className="p1-hero-eyebrow">
                    <span className="p1-badge p1-badge-course">Full-Stack Microblogging</span>
                    <span className="p1-badge p1-badge-client">Spring Boot 4.1 + React 19</span>
                    <span className="p1-badge p1-badge-year">Sep 2026</span>
                </div>
                <h1 className="p1-hero-title">
                    <span>OpenStream</span> Platform
                </h1>
                <p className="p1-hero-subtitle">// Mobile-first social microblogging architecture</p>
                <p className="p1-hero-desc">
                    A public microblogging application built around a responsive phone shell and a low-latency
                    relational feed engine[cite: 2, 3]. Engineered with a strict multi-layer <strong>Java 25 Spring Boot</strong> API[cite: 2]
                    and a <strong>React 19 / Tailwind CSS v4</strong> frontend[cite: 3].
                </p>

                <div className="openstream-links">
                    <a href="https://openstream.anutej.us/login" target="_blank" rel="noreferrer" className="os-btn os-btn-primary">
                        <VscLinkExternal /> Open Web App
                    </a>
                    <a href="https://github.com/anutej-kardele/OpenStream" target="_blank" rel="noreferrer" className="os-btn os-btn-secondary">
                        <VscGithub /> Frontend Repo
                    </a>
                    <a href="https://github.com/anutej-kardele/openstream-api" target="_blank" rel="noreferrer" className="os-btn os-btn-secondary">
                        <VscGithub /> Backend API Repo
                    </a>
                </div>
            </header>

            {/* ── ARCHITECTURE PIPELINE ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">01</span>
                    <span className="p1-section-title">System Execution Flow</span>
                    <div className="p1-section-line" />
                </div>
                <div className="p1-pipeline-track">
                    {STEPS.map((s, i) => (
                        <div
                            key={i}
                            className="p1-pipeline-step"
                            onClick={() => setActiveStep(i)}
                        >
                            <div className={`p1-step-connector${i <= activeStep ? ' active' : ''}`} />
                            <div className={`p1-step-circle${i === activeStep ? ' active' : i < activeStep ? ' done' : ''}`}>
                                {s.num}
                            </div>
                            <div
                                className={`p1-step-label${i === activeStep ? ' active' : ''}`}
                                dangerouslySetInnerHTML={{ __html: s.label }}
                            />
                            {s.sub && <div className="p1-step-sub">{s.sub}</div>}
                        </div>
                    ))}
                </div>
                <div className="p1-pipeline-detail">
                    <div className="p1-detail-title">{step.title.toUpperCase()}</div>
                    <div
                        className="p1-detail-body"
                        dangerouslySetInnerHTML={{ __html: step.body }}
                    />
                </div>
            </section>

            {/* ── ENGINEERING HIGHLIGHTS ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">02</span>
                    <span className="p1-section-title">Engineering Highlights</span>
                    <div className="p1-section-line" />
                </div>
                <div className="os-highlights-grid">
                    {HIGHLIGHTS.map((item, idx) => (
                        <div key={idx} className="os-highlight-card">
                            <div className="os-highlight-title">
                                <VscCheck color="#22c55e" /> {item.label}
                            </div>
                            <div className="os-highlight-desc">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TECH STACK ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">03</span>
                    <span className="p1-section-title">Technology Stack</span>
                    <div className="p1-section-line" />
                </div>
                <div className="p1-tech-grid">
                    {TECH.map((t, i) => (
                        <span
                            key={i}
                            className={`p1-tech-chip${t.type ? ' ' + t.type : ''}`}
                        >
                            {t.label}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── RESULTS & METRICS ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">04</span>
                    <span className="p1-section-title">Architecture Specs & Verification</span>
                    <div className="p1-section-line" />
                </div>
                <div className="p1-results-grid">
                    {RESULTS.map((r, i) => (
                        <div key={i} className="p1-result-card">
                            <AnimatedStat
                                value={r.value}
                                suffix={r.suffix}
                                className={`p1-stat-value p1-result-value${r.green ? ' green' : ''}`}
                            />
                            <div className="p1-result-desc">{r.desc}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OpenStream;