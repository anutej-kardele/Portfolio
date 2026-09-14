import { useState, useEffect, useRef } from 'react';
import '../../../css/content/AI_Data_Extraction.css';
import { VscGithub, VscCheck } from 'react-icons/vsc';

const STEPS = [
    {
        num: 1,
        label: 'VS Code<br/>Workspace',
        sub: 'Layout & IDE',
        title: 'Step 1 — Pixel-Perfect IDE Aesthetic',
        body: 'Crafted to mirror the exact developer experience of Visual Studio Code[cite: 4]. Includes a fully interactive sidebar file explorer, document tabs, status bar, and custom-styled panels that replicate an active coding workspace[cite: 4].'
    },
    {
        num: 2,
        label: 'Virtual File<br/>System',
        sub: 'Navigation',
        title: 'Step 2 — In-Memory Virtual File System',
        body: 'Manages structured data across Markdown notes, JSON skills inventories, and rich project components. Allows dynamic file switching, folder toggling, and clean state handling across directory trees.'
    },
    {
        num: 3,
        label: 'Google<br/>Gemini AI',
        sub: 'GenAI SDK',
        title: 'Step 3 — Integrated Generative AI Assistant',
        body: 'Built-in interactive chat interface powered by the <strong>Google Generative AI SDK (Gemini)</strong>[cite: 4]. Acts as an intelligent virtual assistant capable of answering questions about your background, projects, and technical skills in real-time[cite: 4].'
    },
    {
        num: 4,
        label: 'Dynamic<br/>Theming',
        sub: 'Dark + Palette',
        title: 'Step 4 — Custom Theming & Terminal Engine',
        body: 'Engineered with custom CSS variables and flexbox engines supporting smooth UI color switching[cite: 4]. Coupled with an interactive terminal layout for status updates and immersive developer interactions[cite: 4].'
    }
];

const HIGHLIGHTS = [
    { label: 'VS Code Architecture', desc: 'Mimics sidebar navigation, tab management, and status bars for an authentic IDE feel[cite: 4].' },
    { label: 'Google Gemini SDK', desc: 'Real-time contextual conversational assistant answering recruiter and visitor queries[cite: 4].' },
    { label: 'Virtual File System', desc: 'Modular file tree parsing markdown, JSON documents, and custom interactive React views.' },
    { label: 'Blazing Fast Vite Build', desc: 'Optimized single-page architecture deployed live at anutej.us with high performance[cite: 4].' }
];

const TECH = [
    { label: 'React', type: 'primary' },
    { label: 'Vite', type: 'primary' },
    { label: 'Google Generative AI SDK', type: 'ai' },
    { label: 'CSS Variables & Flexbox', type: '' },
    { label: 'React Icons (VS Code Set)', type: '' },
    { label: 'GitHub Pages CI/CD', type: 'infra' },
    { label: 'JavaScript (ESM)', type: '' },
    { label: 'Responsive IDE Layout', type: '' }
];

// --- SUB-COMPONENT: TERMINAL TICKER (Using About page command sequence format) ---
const TerminalTicker = () => {
    const dataSequence = [
        { text: "open portfolio.md", output: "📝 VS Code Portfolio Workspace Loaded" },
        { text: "ls", output: "Listing pages: [Education, Information, Projects]" },
        { text: "ai \"Explain this portfolio\"", output: "An interactive VS Code clone powered by React & Gemini AI" },
        { text: "cd projects", output: "Navigating to Projects..." },
        { text: "ls -a", output: "Listing pages: [Education, Hidden, Information, Projects]" },
        { text: "ai \"Who built this?\"", output: "Anutej Kardele" }
    ];

    const [msgIndex, setMsgIndex] = useState(0);
    const [displayedCmd, setDisplayedCmd] = useState('');
    const [displayedOutput, setDisplayedOutput] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const typingSpeed = 60;
    const deletingSpeed = 30;
    const pauseBeforeOutput = 300;
    const pauseBeforeDelete = 2500;

    useEffect(() => {
        const currentData = dataSequence[msgIndex];
        const fullCmd = currentData.text;
        const fullOutput = currentData.output;

        let timer;

        if (isDeleting) {
            if (displayedOutput.length > 0) {
                setDisplayedOutput('');
            } else if (displayedCmd.length > 0) {
                timer = setTimeout(() => {
                    setDisplayedCmd(prev => prev.slice(0, -1));
                }, deletingSpeed);
            } else {
                setIsDeleting(false);
                setMsgIndex(prev => (prev + 1) % dataSequence.length);
            }
        } else {
            if (displayedCmd.length < fullCmd.length) {
                timer = setTimeout(() => {
                    setDisplayedCmd(fullCmd.slice(0, displayedCmd.length + 1));
                }, typingSpeed);
            } else if (!displayedOutput) {
                timer = setTimeout(() => {
                    setDisplayedOutput(fullOutput);
                }, pauseBeforeOutput);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseBeforeDelete);
            }
        }

        return () => clearTimeout(timer);
    }, [displayedCmd, displayedOutput, isDeleting, msgIndex]);

    return (
        <div className="system-ticker-container">
            <div className="prompt-line">
                <span className="prompt-user">root@anutej: Anutej</span>
                <span className="prompt-path">%</span>
                <span className="ticker-text">
                    {displayedCmd}
                    <span className="cursor"></span>
                </span>
            </div>
            <div className={`output-line ${displayedOutput ? 'visible' : ''}`}>
                {displayedOutput ? `=> ${displayedOutput}` : ''}
            </div>
        </div>
    );
};

const PortfolioSite = () => {
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
        <div className="p1-container portfolio-site-container">
            {/* Embedded scoped responsive styles */}
            <style>{`
                .portfolio-site-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-top: 1.25rem;
                }
                .ps-btn {
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
                .ps-btn-secondary {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    border: 1px solid #333333;
                }
                .ps-btn-secondary:hover {
                    background: #2d2d2d;
                    color: #ffffff;
                    border-color: #4f4f4f;
                }
                .ps-highlights-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .ps-highlight-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    padding: 1rem;
                }
                .ps-highlight-title {
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: #61dafb;
                    margin-bottom: 0.35rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .ps-highlight-desc {
                    font-size: 0.825rem;
                    color: #a0a0a0;
                    line-height: 1.4;
                }
                @media (max-width: 1024px) {
                    .portfolio-site-container {
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
                    .portfolio-site-links {
                        flex-direction: column;
                    }
                    .ps-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>

            {/* ── HERO ── */}
            <header className="p1-hero">
                <div className="p1-hero-eyebrow">
                    <span className="p1-badge p1-badge-course">Interactive Developer Portfolio</span>
                    <span className="p1-badge p1-badge-client">React + Vite + Gemini AI</span>
                    <span className="p1-badge p1-badge-year">Feb 2026</span>
                </div>
                <h1 className="p1-hero-title">
                    <span>VS Code</span> Portfolio Platform
                </h1>
                <p className="p1-hero-subtitle">// Simulating a complete IDE developer experience</p>
                <p className="p1-hero-desc">
                    An interactive web portfolio built to mimic Visual Studio Code[cite: 4]. It features a functional directory tree,
                    custom text editors, an integrated terminal, and a real-time conversational AI assistant powered by the Google Gemini SDK[cite: 4].
                </p>

                {/* Terminal Ticker matching About page format */}
                <TerminalTicker />

                <div className="portfolio-site-links">
                    <a href="https://github.com/anutej-kardele/Portfolio" target="_blank" rel="noreferrer" className="ps-btn ps-btn-secondary">
                        <VscGithub /> GitHub Repository
                    </a>
                </div>
            </header>

            {/* ── ARCHITECTURE PIPELINE ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">01</span>
                    <span className="p1-section-title">Workspace Architecture</span>
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

            {/* ── CORE FEATURES HIGHLIGHTS ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">02</span>
                    <span className="p1-section-title">Key Features</span>
                    <div className="p1-section-line" />
                </div>
                <div className="ps-highlights-grid">
                    {HIGHLIGHTS.map((item, idx) => (
                        <div key={idx} className="ps-highlight-card">
                            <div className="ps-highlight-title">
                                <VscCheck color="#22c55e" /> {item.label}
                            </div>
                            <div className="ps-highlight-desc">{item.desc}</div>
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
        </div>
    );
};

export default PortfolioSite;