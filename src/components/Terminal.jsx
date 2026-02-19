import React, { useState, useRef, useEffect } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { handleTerminalCommand } from '../utils/terminalUtils';

function Terminal({ showTerminal, setTerminal, showDirectory, showAI, currentDirectory, setActiveFile, setCurrentDirectory, activeFile }) {
    const [inputValue, setInputValue] = useState("");
    const [history, setHistory] = useState([]);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Auto-scroll to bottom when history updates
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, showTerminal]);

    // 2. Auto-focus when terminal opens
    useEffect(() => {
        if (showTerminal && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showTerminal]);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const trimmedInput = inputValue.trim();
            if (trimmedInput === "") return;

            const dirSnapshot = currentDirectory?.name || "Anutej";

            // Handle 'clear' internally to reset history
            if (trimmedInput === 'clear') {
                setHistory([]);
                setInputValue("");
                setHistoryIndex(-1);
                return;
            }

            setInputValue("");
            setHistoryIndex(-1);
            const commandId = Date.now();

            setHistory(prev => [...prev, {
                id: commandId,
                command: trimmedInput,
                result: "Communicating with AI payload...", // Temporary loading text
                directoryName: dirSnapshot
            }]);

            // // Get output from utility and update history
            // const output = handleTerminalCommand(trimmedInput, currentDirectory, setActiveFile);
            // setHistory(prev => [...prev, { command: trimmedInput, result: output }]);
            // setInputValue("");

            const resultText = await handleTerminalCommand(trimmedInput, currentDirectory, setActiveFile, setCurrentDirectory, activeFile);

            setHistory(prev => prev.map(item =>
                item.id === commandId
                    ? { ...item, result: resultText }
                    : item
            ))

            // setHistory(prev => [...prev, {
            //     command: trimmedInput,
            //     result: resultText,
            //     directoryName: dirSnapshot
            // }]);
            // setInputValue("");
            // setHistoryIndex(-1);
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault(); // Stops cursor from jumping to the start

            if (history.length === 0) return;

            let newIndex = historyIndex;
            if (historyIndex === -1) {
                newIndex = history.length - 1;
            } else if (historyIndex > 0) {
                newIndex = historyIndex - 1;
            }

            setHistoryIndex(newIndex);
            setInputValue(history[newIndex].command);

        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault(); // Stops cursor from jumping to the end

            if (historyIndex === -1) return;

            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInputValue(history[newIndex].command);
            } else {
                setHistoryIndex(-1);
                setInputValue("");
            }
        }
    };

    // 3. Force focus anywhere you click in the terminal box 
    const handleContainerClick = () => {
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <>
            {showTerminal && (
                <aside
                    className="terminal"
                    style={{
                        left: showDirectory ? '22rem' : '4rem',
                        right: showAI ? '24rem' : '0rem',
                        bottom: '2rem'
                    }}
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* FIXED HEADER */}
                    <div className="terminal-header-container" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.2rem',
                        background: 'var(--bg-color)', /* Keeps header opaque */
                        // borderBottom: '1px solid rgba(255,255,255,0.1)', /* Optional: adds a clean line */
                        zIndex: 10
                    }}>
                        <div className="terminal-title">TERMINAL</div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setTerminal(false); }}
                            className="terminal-close"
                        >
                            <VscChromeClose size={'1rem'} />
                        </button>
                    </div>

                    {/* SCROLLABLE CONTENT AREA */}
                    <div ref={scrollRef} className="terminal-scroll-area">
                        <div>
                            {history.map((item, index) => (
                                <div key={index} className="terminal-history-item">
                                    <div className="terminal-prompt-line">
                                        <span className="terminal-prompt-label">root@anutej {item.directoryName} %</span>
                                        <span className="terminal-prompt-label">{item.command}</span>
                                    </div>
                                    {/* {item.result && (
                                        <div className="terminal-result">{item.result}</div>
                                    )} */}
                                    {item.result && typeof item.result === 'string' && (
                                        <div className="terminal-result">{item.result}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* INPUT LINE */}
                        <div className="terminal-prompt-line">
                            <span className="terminal-prompt-label">root@anutej {currentDirectory?.name} %</span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="terminal-input terminal-prompt-label"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                spellCheck="false" />

                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}

export default Terminal;