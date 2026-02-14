import React, { useEffect, useState } from 'react';

const Load = () => {
    const [progress, setProgress] = useState(0);

    // Animate the progress bar on load
    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(50);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <style>{`
        .vscode-construction-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            
            /* CHANGED: Use variables for background and text */
            background-color: var(--editor-background);
            color: var(--text-color);
            
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            z-index: 10;
        }

        .terminal-box {
            width: 90%;
            max-width: 500px;
            text-align: left;
        }

        .command-text {
            color: var(--function-yellow); /* Mapped to yellow variable */
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }

        .comment {
            color: var(--comment-green); /* Mapped to green variable */
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }

        .variable {
            color: var(--variable-blue); /* Mapped to variable blue */
        }

        .string {
            color: var(--string-text); /* Mapped to string text */
        }

        .keyword {
            color: var(--storage-blue); /* Added class for 'const' */
        }

        /* Progress Bar Container */
        .progress-container {
            width: 100%;
            height: 6px;
            /* CHANGED: Use border-grey so it's visible in both light/dark modes */
            background-color: var(--border-grey); 
            border-radius: 3px;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            overflow: hidden;
        }

        /* The Moving Bar */
        .progress-fill {
            height: 100%;
            background-color: var(--accent-blue); /* VS Code Blue variable */
            width: 0%; 
            transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
            border-radius: 3px;
            box-shadow: 0 0 10px rgba(0, 122, 204, 0.5);
        }

        .status-line {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 5px;
            color: var(--text-color);
        }

        .blinking-cursor {
            display: inline-block;
            width: 8px;
            height: 15px;
            background-color: var(--text-color); /* Cursor matches text color */
            animation: blink 1s step-end infinite;
            vertical-align: middle;
            margin-left: 5px;
        }

        @keyframes blink {
            50% { opacity: 0; }
        }
      `}</style>

            <div className="vscode-construction-wrapper">
                <div className="terminal-box">
                    <div className="comment">// Initializing Portfolio V1.0...</div>
                    <div className="command-text">
                        {/* Replaced inline styles with classes mapped to variables */}
                        <span className="keyword">const</span> <span className="variable">status</span> = <span className="string">"Under Construction"</span>;
                    </div>

                    <div className="progress-container">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <div className="status-line">
                        <span>Developing assets...</span>
                        <span>{progress}% Done</span>
                    </div>

                    <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.6, color: 'var(--text-color)' }}>
                        <span className="keyword">➜</span>  ~  cd /anutej-portfolio<span className="blinking-cursor"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Load;