import { useState, useEffect, useRef } from 'react';
import '../../../css/content/AI_Data_Extraction.css';
import { VscGithub, VscCheck, VscServerProcess, VscLaw } from 'react-icons/vsc';

const STEPS = [
    {
        num: 1,
        label: 'Phase 1:<br/>Experimentation',
        sub: 'THOS Dataset',
        title: 'Step 1 — Broad Architecture Experimentation',
        body: 'Utilized a smaller dataset to compare zero-shot BERT, full fine-tuning, and LoRA configurations. Identified the winning combination: <strong>BERTweet + LoRA (r=16) + Focal Loss + Cosine Scheduler</strong>.'
    },
    {
        num: 2,
        label: 'Phase 2:<br/>Scaling',
        sub: 'Jigsaw Toxic Data',
        title: 'Step 2 — Scaling to Jigsaw Dataset',
        body: 'Scaled the architecture to the much larger Jigsaw Toxic Comment dataset using a 90/5/5 stratified split. Refined class weighting, LoRA rank (r=32), and preprocessing alignment.'
    },
    {
        num: 3,
        label: 'Threshold<br/>Tuning',
        sub: 'Validation F1',
        title: 'Step 3 — Decision Threshold Optimization',
        body: 'Instead of relying on a standard argmax, the model calculates a custom decision threshold optimized for Macro F1 on the validation set. This threshold is saved as a trained artifact alongside the model weights.'
    },
    {
        num: 4,
        label: 'FastAPI<br/>Deployment',
        sub: 'Hugging Face',
        title: 'Step 4 — Production Inference Service',
        body: 'Deployed as a FastAPI inference service with a browser UI. To bypass Git LFS constraints for the 540MB model, the API automatically pulls the compiled model weights and <code>threshold.json</code> directly from Hugging Face on startup.'
    }
];

const HIGHLIGHTS = [
    { label: 'LoRA Fine-Tuning', desc: 'Employed Low-Rank Adaptation (LoRA) targeting query, key, value, and dense modules to efficiently fine-tune BERTweet.' },
    { label: 'Weighted Focal Loss', desc: 'Implemented Focal Loss (gamma=1.0) with class weights [1.0, 1.25] to heavily penalize misclassified minority examples.' },
    { label: 'Hugging Face Integration', desc: 'Inference pipeline natively downloads model weights and custom decision thresholds from Hugging Face at runtime.' },
    { label: 'Threshold Decoupling', desc: 'API returns raw flagged probabilities, threshold margins, and boolean decisions to allow for dynamic upstream policy rules.' }
];

const TECH = [
    { label: 'Python 3.10+', type: 'primary' },
    { label: 'FastAPI', type: 'primary' },
    { label: 'BERTweet', type: 'ai' },
    { label: 'LoRA', type: 'ai' },
    { label: 'Hugging Face Transformers', type: 'ai' },
    { label: 'PyTorch', type: 'ai' },
    { label: 'Jupyter Notebooks', type: '' },
    { label: 'HTML/CSS UI', type: '' }
];

const RESULTS = [
    { value: 91.74, suffix: '%', desc: 'Test Macro F1 Score', green: true },
    { value: 97.10, suffix: '%', desc: 'Overall Test Accuracy', green: true },
    { value: 0.62, suffix: '', desc: 'Validation-Tuned Decision Threshold', green: false },
    { value: 89, suffix: '%', desc: 'Flagged Class Precision', green: false },
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

const BERTweetGuard = () => {
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
        <div className="p1-container bertweet-container">
            {/* Embedded scoped responsive styles with 1024px breakpoint */}
            <style>{`
                .bertweet-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-top: 1.25rem;
                }
                .bg-btn {
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
                .bg-btn-primary {
                    background: #2563eb;
                    color: #ffffff;
                    border: 1px solid #3b82f6;
                }
                .bg-btn-primary:hover {
                    background: #1d4ed8;
                }
                .bg-btn-secondary {
                    background: #1e1e1e;
                    color: #d4d4d4;
                    border: 1px solid #333333;
                }
                .bg-btn-secondary:hover {
                    background: #2d2d2d;
                    color: #ffffff;
                    border-color: #4f4f4f;
                }
                .bg-highlights-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .bg-highlight-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    padding: 1rem;
                }
                .bg-highlight-title {
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: #61dafb;
                    margin-bottom: 0.35rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .bg-highlight-desc {
                    font-size: 0.825rem;
                    color: #a0a0a0;
                    line-height: 1.4;
                }
                @media (max-width: 1024px) {
                    .bertweet-container {
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
                    .bertweet-links {
                        flex-direction: column;
                    }
                    .bg-btn {
                        width: 100%;
                        justify-content: center;
                        box-sizing: border-box !important;
                    }
                }
            `}</style>

            {/* ── HERO ── */}
            <header className="p1-hero">
                <div className="p1-hero-eyebrow">
                    <span className="p1-badge p1-badge-course">Machine Learning / NLP</span>
                    <span className="p1-badge p1-badge-client">BERTweet + FastAPI</span>
                </div>
                <h1 className="p1-hero-title">
                    <span>BERTweet</span> Guard
                </h1>
                <p className="p1-hero-subtitle">// OpenStream Moderation Engine</p>
                <p className="p1-hero-desc">
                    A research-to-deployment text moderation API. Trained on the Jigsaw Toxic Comment dataset,
                    it utilizes <strong>Low-Rank Adaptation (LoRA)</strong>, <strong>Focal Loss</strong>, and
                    validation-tuned decision thresholds. Model weights (540MB) are hosted dynamically on Hugging Face
                    to optimize the GitHub repository size and deployment speed.
                </p>

                <div className="bertweet-links">
                    <a href="https://github.com/anutej-kardele/bertweet-guard" target="_blank" rel="noreferrer" className="bg-btn bg-btn-secondary">
                        <VscGithub /> GitHub Repository
                    </a>
                    <a href="https://huggingface.co/Anutej9/bertweet-guard" target="_blank" rel="noreferrer" className="bg-btn bg-btn-primary">
                        <VscServerProcess /> Hugging Face Model Weights
                    </a>
                </div>
            </header>

            {/* ── ARCHITECTURE PIPELINE ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">01</span>
                    <span className="p1-section-title">Research & Deployment Flow</span>
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
                    <span className="p1-section-title">Model Specifications</span>
                    <div className="p1-section-line" />
                </div>
                <div className="bg-highlights-grid">
                    {HIGHLIGHTS.map((item, idx) => (
                        <div key={idx} className="bg-highlight-card">
                            <div className="bg-highlight-title">
                                <VscCheck color="#22c55e" /> {item.label}
                            </div>
                            <div className="bg-highlight-desc">{item.desc}</div>
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
                    <span className="p1-section-title">Model Evaluation (Jigsaw Dataset)</span>
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

export default BERTweetGuard;