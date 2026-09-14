import { useState, useEffect, useRef } from 'react';
import '../../../css/content/AI_Data_Extraction.css';

const STEPS = [
    {
        num: 1, label: 'Input<br/>Collection', sub: '',
        title: 'Step 1 — Input Collection',
        body: 'Each journal folder is placed under <code>Input/</code> and processed individually or in batch. Folder-based scan packages contain hundreds to thousands of page images, with fallbacks handling missing metadata.'
    },
    {
        num: 2, label: 'CrossRef', sub: 'aiscore 100',
        title: 'Step 2 — CrossRef',
        body: 'CrossRef API is queried first to retrieve title, author, DOI, and issue metadata. A database and web scraper fallback handles journals with missing or incomplete CrossRef records.'
    },
    {
        num: 3, label: 'Web<br/>Scraper', sub: 'aiscore 50',
        title: 'Step 3 — Web Scraper',
        body: 'Scrapers collect external metadata to validate title, author, DOI, and issue matching from multiple web sources. Helps resolve ambiguous or incomplete scan data. <code>aiscore 50</code>.'
    },
    {
        num: 4, label: 'OCR + LLM', sub: 'aiscore 85',
        title: 'Step 4 — OCR + LLM Processing',
        body: 'Each journal page image is processed by <strong>Tesseract OCR</strong> for text extraction — when output is detected as scrap or empty, <strong>QwenVL:8b</strong> takes over as a vision fallback. The extracted text is then passed to <strong>Qwen-35B</strong> for metadata decisions — TOC detection, article boundary identification, and field extraction. <code>aiscore 85</code>.'
    },
    {
        num: 5, label: 'Combine +<br/>Convert', sub: '',
        title: 'Step 5 — Combine + Convert',
        body: 'Intermediate JSON outputs from CrossRef, LLM, and web scraper are merged using a priority combinator into a single structured YAML. Fields are normalized to consistent title case and formatting at this stage.'
    },
    {
        num: 6, label: 'Validation', sub: '',
        title: 'Step 6 — Validation',
        body: 'Author names are normalized and deduplicated. Fields are validated against format rules — date formats, title casing, page ranges — before the output YAML is finalized.'
    },
    {
        num: 7, label: 'Deployment', sub: '',
        title: 'Step 7 — Deployment',
        body: "The full pipeline runs inside Docker for consistent, reproducible execution across all environments. Output YAML files are ready for ingestion into HeinOnline's downstream library systems."
    }
];

const TECH = [
    { label: 'Python', type: 'primary' },
    { label: 'Qwen-35B (Novita.ai)', type: 'ai' },
    { label: 'QwenVL:8b', type: 'ai' },
    { label: 'Tesseract-OCR', type: '' },
    { label: ' PostgreSQL', type: 'infra' },
    { label: 'CrossRef API', type: '' },
    { label: 'Web Scraping', type: '' },
    { label: 'Docker', type: 'infra' },
    { label: 'YAML', type: '' },
    { label: 'JSON', type: '' },
    { label: 'LLM Pipelines', type: 'ai' },
    { label: 'Batch Processing', type: '' },
    { label: 'Multi-model OCR', type: '' },
];

const RESULTS = [
    { value: 90.58, suffix: '%', desc: 'Overall accuracy across all 47 journals (Batch 5)', green: false },
    { value: 90, suffix: '%', desc: 'Reduction in manual data-entry workload', green: true },
    { value: 43, suffix: '', desc: 'Journals achieving > 80% accuracy threshold', green: false },
    { value: 8, suffix: '', desc: 'Journals achieving 100% perfect accuracy', green: true },
];

const BATCHES = [
    { label: 'Version 1', pct: 57.03 },
    { label: 'Version 2', pct: 70 },
    { label: 'Version 3', pct: 82.02 },
    { label: 'Version 4', pct: 88.39 },
    { label: 'Version 5', pct: 90.58, final: true },
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
    }, [trigger]);
    return display;
}

/* ── Animated stat (triggers on scroll into view) ── */
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

/* ── Animated bar (triggers on scroll into view) ── */
function AnimatedBar({ pct, final: isFinal }) {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setWidth(pct); obs.disconnect(); }
        }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [pct]);

    return (
        <div className="p1-chart-bar-bg" ref={ref}>
            <div
                className={`p1-chart-bar${isFinal ? ' final' : ''}`}
                style={{ width: `${width}%`, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
            />
        </div>
    );
}

/* ── Main component ── */
const AI_Data_Extraction = () => {
    const [activeStep, setActiveStep] = useState(0);

    /* Auto-play pipeline animation on mount */
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
        <div className="p1-container">

            {/* ── HERO ── */}
            <header className="p1-hero">
                <div className="p1-hero-eyebrow">
                    <span className="p1-badge p1-badge-course">CSE 611 — Project Development</span>
                    <span className="p1-badge p1-badge-client">Client: HeinOnline</span>
                    <span className="p1-badge p1-badge-year">Jan 2025 – May 2025</span>
                </div>
                <h1 className="p1-hero-title">
                    AI-Powered <span>Data Extraction</span> System
                </h1>
                <p className="p1-hero-subtitle">// Automating bibliographic metadata extraction at scale</p>
                <p className="p1-hero-desc">
                    A seven-stage pipeline that automates metadata extraction for scanned law journals —
                    eliminating manual transcription and reducing data entry workload by{' '}
                    <strong>90%</strong>. Built for <strong>HeinOnline</strong>, the world&apos;s largest
                    image-based legal research database.
                </p>
                <div className="p1-hero-stats">
                    {[
                        { value: 90.58, suffix: '%', label: 'Final Accuracy' },
                        { value: 90, suffix: '%', label: 'Manual Work Reduction' },
                        { value: 47, suffix: '', label: 'Journals Processed' },
                        { value: 28167, suffix: '', label: 'Pages Processed' },
                    ].map((s, i) => (
                        <div key={i} className="p1-stat">
                            <AnimatedStat value={s.value} suffix={s.suffix} />
                            <span className="p1-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* ── CONTEXT ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">01</span>
                    <span className="p1-section-title">Context</span>
                    <div className="p1-section-line" />
                </div>
                <div className="p1-context-grid">
                    <div className="p1-context-card">
                        <div className="p1-context-label">Course</div>
                        <div className="p1-context-value">
                            CSE 611 — Project Development<br />
                            Department of Computer Science<br />
                            <a href="https://www.linkedin.com/school/universityatbuffalo/posts/?feedView=all" target="_blank" rel="noreferrer">
                                University at Buffalo, SUNY
                            </a>
                        </div>
                    </div>
                    <div className="p1-context-card">
                        <div className="p1-context-label">Client</div>
                        <div className="p1-context-value">
                            <a href="https://heinonline.org" target="_blank" rel="noreferrer">HeinOnline</a>
                            {' '}/ William S. Hein &amp; Co., Inc.<br />
                            Premier legal research database — 245M+ pages,<br />
                            3,400+ scholarly law journals.
                        </div>
                    </div>
                    <div className="p1-context-card">
                        <div className="p1-context-label">Professor</div>
                        <div className="p1-context-value">
                            <a href="https://www.linkedin.com/in/alanmhunt/" target="_blank" rel="noreferrer">
                                Prof. Alan Hunt
                            </a><br />
                            University at Buffalo, SUNY
                        </div>
                    </div>
                    <div className="p1-context-card">
                        <div className="p1-context-label">Team</div>
                        <div className="p1-context-value">
                            <a href="https://www.linkedin.com/in/pranavkundaikar/" target="_blank" rel="noreferrer">Pranav Kundaikar</a>
                            {' · '}
                            <a href="https://www.linkedin.com/in/anutej-kardele/" target="_blank" rel="noreferrer">Anutej Kardele</a><br />
                            <a href="https://www.linkedin.com/in/jaypathare3/" target="_blank" rel="noreferrer">Jay Pathare</a>
                            {' · '}
                            <a href="https://www.linkedin.com/in/sejal-baser/" target="_blank" rel="noreferrer">Sejal Baser</a><br />
                            <a href="https://www.linkedin.com/in/teja-krishna-sai-u/" target="_blank" rel="noreferrer">Teja Krishna Sai</a>
                        </div>
                    </div>
                </div>
                <p className="p1-intro-body">
                    HeinOnline processes thousands of <strong>scanned journal folders</strong>, each
                    containing hundreds to thousands of page images in wildly inconsistent formats. The
                    pipeline identifies article boundaries, extracts{' '}
                    <strong>titles, author names, DOIs, and page ranges</strong> from table-of-contents
                    and body pages, then produces a validated YAML output ready for downstream ingestion
                    — replacing a process that was both{' '}
                    <strong>error-prone and prohibitively time-intensive at scale</strong>.
                </p>
            </section>

            {/* ── PIPELINE ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">02</span>
                    <span className="p1-section-title">Pipeline Overview</span>
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

            {/* ── TECH STACK ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">03</span>
                    <span className="p1-section-title">Technologies</span>
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

            {/* ── RESULTS ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">04</span>
                    <span className="p1-section-title">Results</span>
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
                <div className="p1-chart-container">
                    <div className="p1-chart-title">// Accuracy trajectory — Version 1 → 5</div>
                    {BATCHES.map((b, i) => (
                        <div key={i} className="p1-chart-row">
                            <span className="p1-chart-label">{b.label}</span>
                            <AnimatedBar pct={b.pct} final={b.final} />
                            <span className={`p1-chart-pct${b.final ? ' final' : ''}`}>{b.pct}%</span>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default AI_Data_Extraction;
