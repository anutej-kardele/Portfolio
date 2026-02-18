import React, { useState, useRef, useEffect } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { handleTerminalCommand } from '../utils/terminalUtils';

function Terminal({ showTerminal, setTerminal, showDirectory, showAI, currentDirectory, setActiveFile }) {
    const [inputValue, setInputValue] = useState("");
    const [history, setHistory] = useState([]);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const trimmedInput = inputValue.trim();
            if (trimmedInput === "") return;

            // Handle 'clear' internally to reset history
            if (trimmedInput === 'clear') {
                setHistory([]);
                setInputValue("");
                return;
            }

            // Get output from utility and update history
            const output = handleTerminalCommand(trimmedInput, currentDirectory, setActiveFile);
            setHistory(prev => [...prev, { command: trimmedInput, result: output }]);
            setInputValue("");
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
                    className='terminal'
                    style={{
                        left: showDirectory ? '22rem' : '4rem',
                        right: showAI ? '24rem' : '0rem',
                        cursor: 'text' // Show text cursor everywhere in the box
                    }}
                    // Click handler goes here to catch clicks on the background
                    onClick={handleContainerClick}
                >
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                        {/* HEADER */}
                        <div style={{
                            position: 'absolute', left: '1rem', top: '1rem', fontSize: '0.9rem',
                            borderBottom: '2px solid var(--accent-blue)',
                            paddingBottom: '3px',
                            width: 'fit-content'
                        }}>
                            TERMINAL
                        </div>

                        {/* CLOSE BUTTON - Fixed the "e" error here */}
                        <button
                            onClick={(e) => {
                                // We must pass 'e' (event) above ^ to use it here v
                                e.stopPropagation();
                                setTerminal(false);
                            }}
                            className="transparentButton"
                            style={{ position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer', zIndex: 10 }}
                        >
                            <VscChromeClose size={'1rem'} />
                        </button>

                        {/* INPUT AREA */}
                        <div style={{
                            marginTop: '3.5rem',
                            padding: '0 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: "'Consolas', 'Courier New', monospace",
                            width: '100%',         // Ensure container is full width
                            boxSizing: 'border-box' // Prevents padding from breaking width
                        }}>
                            <span style={{
                                color: 'var(--text-color)',
                                fontWeight: 'bold',
                                marginRight: '10px',
                                whiteSpace: 'nowrap',
                                userSelect: 'none' // Prevents selecting the prompt text accidentally 
                            }}>
                                root@anutej:~$
                            </span>

                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                autoComplete="off"
                                spellCheck="false"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: 'var(--text-color)',
                                    fontSize: '1rem',
                                    flexGrow: 1,      // Forces input to take ALL remaining space
                                    minWidth: 0,      // Fixes flexbox overflow issues
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {/* Empty click area filler (ensures clicking below input also focuses) */}
                        <div style={{ flexGrow: 1 }} />

                    </div>
                </aside>
            )}
        </>
    )
}

export default Terminal;