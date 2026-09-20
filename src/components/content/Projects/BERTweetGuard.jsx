import { useState, useEffect, useRef } from 'react';
import '../../../css/content/AI_Data_Extraction.css';
import { VscGithub, VscCheck, VscServerProcess, VscPlay, VscLinkExternal } from 'react-icons/vsc';

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
        label: 'Phase 2:<br/>Multi-Source',
        sub: '4 Datasets',
        title: 'Step 2 — Redesigning the Training Corpus',
        body: 'Scaled the architecture using a source/class-weighted sampling strategy across Jigsaw, HateXplain, Davidson, and TweetEval Offensive datasets. This prevents the largest dataset from dominating the moderation signal.'
    },
    {
        num: 3,
        label: 'Threshold<br/>Tuning',
        sub: 'Source-Balanced F1',
        title: 'Step 3 — Decision Threshold Optimization',
        body: 'Instead of relying on a standard argmax, the model calculates a custom decision threshold (0.7990) optimized for <strong>Source-Balanced Validation Macro F1</strong>. This ensures smaller social-media datasets influence the operating point equally.'
    },
    {
        num: 4,
        label: 'Cloud Run<br/>Deployment',
        sub: 'FastAPI',
        title: 'Step 4 — Production Inference Service',
        body: 'Deployed as a FastAPI inference service on Google Cloud Run. To bypass Git constraints for the model, the API automatically pulls the compiled model weights and <code>threshold.json</code> directly from Hugging Face.'
    }
];

const HIGHLIGHTS = [
    { label: 'LoRA Fine-Tuning', desc: 'Employed Low-Rank Adaptation (LoRA) targeting query, key, value, and dense modules to efficiently fine-tune BERTweet (r=32).' },
    { label: 'Source-Weighted Sampling', desc: 'Implemented inverse frequency weighted sampling to balance training exposure across four datasets of vastly different sizes.' },
    { label: 'Hugging Face Integration', desc: 'Inference pipeline natively downloads model weights and custom decision thresholds from Hugging Face at runtime.' },
    { label: 'Threshold Decoupling', desc: 'API returns raw flagged probabilities, threshold margins, and boolean decisions to allow for dynamic upstream policy rules.' }
];

const TECH = [
    { label: 'Python 3.10+', type: 'primary' },
    { label: 'FastAPI & Cloud Run', type: 'primary' },
    { label: 'BERTweet', type: 'ai' },
    { label: 'LoRA', type: 'ai' },
    { label: 'Hugging Face Transformers', type: 'ai' },
    { label: 'PyTorch', type: 'ai' },
    { label: 'Jupyter Notebooks', type: '' },
    { label: 'Docker', type: '' }
];

const RESULTS = [
    { value: 90.54, suffix: '%', desc: 'Overall Test Macro F1', green: true },
    { value: 83.09, suffix: '%', desc: 'Source-Balanced F1', green: true },
    { value: 0.79, suffix: '9', desc: 'Validation-Tuned Threshold', green: false },
    { value: 15, suffix: '/15', desc: 'Artifact Regression Suite', green: true },
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
    const [inputText, setInputText] = useState('');
    const [isPredicting, setIsPredicting] = useState(false);
    const [predictionResult, setPredictionResult] = useState(null);
    const [apiError, setApiError] = useState(null);

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

    const handlePredict = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setIsPredicting(true);
        setApiError(null);
        setPredictionResult(null);

        try {
            const response = await fetch("https://bertweet-guard-api-544105507963.us-east4.run.app/api/v1/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText.trim() })
            });

            if (!response.ok) {
                throw new Error(`Prediction failed: ${response.status}`);
            }

            const data = await response.json();
            setPredictionResult(data);
        } catch (error) {
            console.error(error);
            setApiError("Could not reach the moderation API. It may be waking up from idle, please try again.");
        } finally {
            setIsPredicting(false);
        }
    };

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
                .bg-btn-primary:hover:not(:disabled) {
                    background: #1d4ed8;
                }
                .bg-btn-primary:disabled {
                    background: #1e3a8a;
                    color: #9ca3af;
                    border-color: #1e3a8a;
                    cursor: not-allowed;
                    opacity: 0.7;
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
                
                /* API Playground Styles */
                .api-playground {
                    background: #0a0a0c;
                    border: 1px solid #333;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }
                .api-textarea {
                    width: 100%;
                    min-height: 100px;
                    background: #151515;
                    border: 1px solid #333;
                    border-radius: 8px;
                    padding: 1rem;
                    color: #fff;
                    font-family: inherit;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    resize: vertical;
                }
                .api-textarea:focus {
                    outline: none;
                    border-color: #3b82f6;
                }
                /* Dark mode scrollbar for the textarea */
                .api-textarea::-webkit-scrollbar {
                    width: 8px;
                }
                .api-textarea::-webkit-scrollbar-track {
                    background: transparent;
                }
                .api-textarea::-webkit-scrollbar-thumb {
                    background: #333333;
                    border-radius: 4px;
                }
                .api-textarea::-webkit-scrollbar-thumb:hover {
                    background: #4f4f4f;
                }
                /* FIX: Dark mode resize handle in the bottom corner */
                .api-textarea::-webkit-resizer {
                    background: #151515; 
                }

                .api-result-box {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #333;
                }
                .api-verdict {
                    display: inline-block;
                    padding: 0.25rem 1rem;
                    border-radius: 50px;
                    font-weight: bold;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                }
                .verdict-flagged {
                    background: rgba(244, 63, 94, 0.15);
                    color: #f43f5e;
                    border: 1px solid rgba(244, 63, 94, 0.3);
                }
                .verdict-normal {
                    background: rgba(16, 185, 129, 0.15);
                    color: #10b981;
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }
                .api-score-row {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    font-size: 0.85rem;
                    color: #a0a0a0;
                }
                .api-bar-bg {
                    height: 6px;
                    background: #222;
                    border-radius: 10px;
                    margin-top: 0.5rem;
                    overflow: hidden;
                }
                .api-bar-fill {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.5s ease-out;
                }
                .fill-normal { background: #10b981; }
                .fill-flagged { background: #f43f5e; }

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
                    A research-to-deployment text moderation API. Trained on a diverse multi-source corpus,
                    it utilizes <strong>Low-Rank Adaptation (LoRA)</strong>, <strong>Source-Weighted Sampling</strong>, and
                    validation-tuned decision thresholds. Model weights are hosted dynamically on Hugging Face
                    to optimize deployment speed on Google Cloud Run.
                </p>

                <div className="bertweet-links">
                    <a href="https://bertweet.anutej.us/" target="_blank" rel="noreferrer" className="bg-btn bg-btn-primary">
                        <VscLinkExternal /> Live Web App
                    </a>
                    <a href="https://github.com/anutej-kardele/bertweet-guard" target="_blank" rel="noreferrer" className="bg-btn bg-btn-secondary">
                        <VscGithub /> GitHub Repository
                    </a>
                    <a href="https://huggingface.co/Anutej9/bertweet-guard" target="_blank" rel="noreferrer" className="bg-btn bg-btn-secondary">
                        <VscServerProcess /> Hugging Face Weights
                    </a>
                </div>
            </header>

            {/* ── LIVE API DEMO (Moved to Top) ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">01</span>
                    <span className="p1-section-title">Live API Playground</span>
                    <div className="p1-section-line" />
                </div>

                <div className="api-playground">
                    <form onSubmit={handlePredict}>
                        <textarea
                            className="api-textarea"
                            placeholder="Type or paste sample text here to test the live Cloud Run moderation API..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-btn bg-btn-primary"
                            disabled={isPredicting || !inputText.trim()}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            {isPredicting ? 'Analyzing...' : <><VscPlay /> Analyze Content</>}
                        </button>
                    </form>

                    {apiError && (
                        <div style={{ color: '#f43f5e', marginTop: '1rem', fontSize: '0.85rem' }}>
                            {apiError}
                        </div>
                    )}

                    {predictionResult && (
                        <div className="api-result-box">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.85rem', color: '#a0a0a0' }}>Classification Result</div>
                                <span className={`api-verdict ${predictionResult.flagged ? 'verdict-flagged' : 'verdict-normal'}`}>
                                    {predictionResult.flagged ? 'FLAGGED' : 'NORMAL'}
                                </span>
                            </div>

                            <div className="api-score-row">
                                <span>Normal</span>
                                <span>{(predictionResult.scores.normal * 100).toFixed(1)}%</span>
                            </div>
                            <div className="api-bar-bg">
                                <div className="api-bar-fill fill-normal" style={{ width: `${predictionResult.scores.normal * 100}%` }}></div>
                            </div>

                            <div className="api-score-row">
                                <span>Flagged</span>
                                <span>{(predictionResult.scores.flagged * 100).toFixed(1)}%</span>
                            </div>
                            <div className="api-bar-bg">
                                <div className="api-bar-fill fill-flagged" style={{ width: `${predictionResult.scores.flagged * 100}%` }}></div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', fontSize: '0.8rem', color: '#888', fontFamily: 'monospace' }}>
                                <span>Calibrated Threshold: {predictionResult.threshold_info.threshold.toFixed(4)}</span>
                                <span>Margin: {predictionResult.threshold_info.margin > 0 ? '+' : ''}{predictionResult.threshold_info.margin.toFixed(4)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── ARCHITECTURE PIPELINE ── */}
            <section className="p1-section">
                <div className="p1-section-header">
                    <span className="p1-section-tag">02</span>
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
                    <span className="p1-section-tag">03</span>
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
                    <span className="p1-section-tag">04</span>
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
                    <span className="p1-section-tag">05</span>
                    <span className="p1-section-title">Model Evaluation (Multi-Source Dataset)</span>
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