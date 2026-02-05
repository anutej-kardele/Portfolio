import React, { useEffect, useState } from 'react';

const Load = () => {
    const [progress, setProgress] = useState(0);

    // Animate the progress bar on load
    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(68); // Set your "completion percentage" here
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <style>{`
        .vscode-construction-wrapper {
            position: fixed;
            inset: 0;
            background-color: #1e1e1e; /* VS Code Editor Background */
            color: #d4d4d4;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            z-index: 9999;
        }

        .terminal-box {
            width: 90%;
            max-width: 500px;
            text-align: left;
        }

        .command-text {
            color: #dcdcaa; /* VS Code Yellow for commands */
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }

        .comment {
            color: #6a9955; /* VS Code Green for comments */
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }

        .variable {
            color: #9cdcfe; /* Light Blue */
        }

        .string {
            color: #ce9178; /* Orange/Red string color */
        }

        /* Progress Bar Container */
        .progress-container {
            width: 100%;
            height: 6px;
            background-color: #3c3c3c; /* Darker track */
            border-radius: 3px;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            overflow: hidden;
        }

        /* The Moving Bar */
        .progress-fill {
            height: 100%;
            background-color: #007acc; /* VS Code Blue */
            width: 0%; /* Starts at 0 */
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
        }

        .blinking-cursor {
            display: inline-block;
            width: 8px;
            height: 15px;
            background-color: #d4d4d4;
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
                    {/* Fake Code Snippet Look */}
                    <div className="comment">// Initializing Portfolio V1.0...</div>
                    <div className="command-text">
                        <span style={{ color: '#569cd6' }}>const</span> <span className="variable">status</span> = <span className="string">"Under Construction"</span>;
                    </div>

                    {/* Progress Section */}
                    <div className="progress-container">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <div className="status-line">
                        <span>Compiling assets...</span>
                        <span>{progress}% Done</span>
                    </div>

                    <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.6 }}>
                        <span style={{ color: '#569cd6' }}>➜</span>  ~  cd /anutej-portfolio<span className="blinking-cursor"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Load;