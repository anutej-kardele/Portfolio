import { useState, useRef, useEffect } from "react";
import { VscChromeClose, VscSend, VscLoading, VscSparkle } from "react-icons/vsc";
import ReactMarkdown from 'react-markdown';
import { askAI } from "../utils/ai";

function MobilePrompter({ activeFile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(scrollToBottom, [messages, isOpen]);

    const handleSend = async () => {
        if (!prompt.trim()) return;

        const question = prompt;
        setPrompt("");
        setMessages(prev => [...prev, { text: question, sender: 'user' }]);
        setIsLoading(true);

        try {
            const answer = await askAI({
                question,
                activeFile,
                history: messages.map(m => ({ sender: m.sender, text: m.text })),
            });
            setMessages(prev => [...prev, { text: answer, sender: 'ai' }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: error.message, sender: 'ai' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>{`
                /* Hide this entire component on Desktop */
                @media (min-width: 1025px) {
                    .mobile-prompter-container {
                        display: none !important;
                    }
                }

                @media (max-width: 1024px) {
                    .mobile-prompter-container {
                        display: block;
                    }

                    /* Floating Action Button (FAB) */
                    .mobile-fab {
                        position: fixed;
                        bottom: calc(var(--footer-height) + 1.5rem); /* 1.5rem above the footer */
                        right: 1.5rem;
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        background: #2563eb; 
                        color: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                        z-index: 1000;
                        border: none;
                        cursor: pointer;
                        transition: transform 0.2s ease, background 0.2s ease;
                    }
                    
                    .mobile-fab:active {
                        transform: scale(0.92);
                    }

                    /* The Chat Modal */
                    .mobile-chat-modal {
                        position: fixed;
                        bottom: calc(var(--footer-height) + 5.5rem); /* Above the FAB (1.5rem gap + 56px button + 0.5rem) */
                        right: 1rem;
                        width: calc(100vw - 2rem);
                        max-width: 400px;
                        height: 60vh;
                        max-height: 500px;
                        background: #1e1e1e; 
                        border: 1px solid #333333;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                        z-index: 1001;
                        display: flex;
                        flex-direction: column;
                        transform-origin: bottom right;
                        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                    
                    .mobile-chat-modal.closed {
                        transform: scale(0);
                        opacity: 0;
                        pointer-events: none;
                    }
                    
                    .mobile-chat-modal.open {
                        transform: scale(1);
                        opacity: 1;
                        pointer-events: auto;
                    }

                    .mobile-chat-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem;
                        border-bottom: 1px solid #333333;
                        background: #252526;
                        border-radius: 12px 12px 0 0;
                    }

                    .mobile-chat-title {
                        font-weight: 600;
                        font-size: 1rem;
                        color: #ffffff;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }

                    .mobile-chat-body {
                        flex: 1;
                        overflow-y: auto;
                        padding: 1rem;
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .mobile-chat-message {
                        padding: 0.75rem 1rem;
                        border-radius: 12px;
                        font-size: 0.9rem;
                        line-height: 1.4;
                        max-width: 85%;
                        word-wrap: break-word;
                    }

                    .mobile-user-message {
                        align-self: flex-end;
                        background: #2563eb;
                        color: #ffffff;
                        border-bottom-right-radius: 2px;
                    }

                    .mobile-ai-message {
                        align-self: flex-start;
                        background: #333333;
                        color: #d4d4d4;
                        border-bottom-left-radius: 2px;
                    }

                    .mobile-ai-message p {
                        margin: 0 0 0.5rem 0;
                    }
                    .mobile-ai-message p:last-child {
                        margin: 0;
                    }

                    .mobile-chat-placeholder {
                        text-align: center;
                        color: #888888;
                        margin-top: 2rem;
                        font-size: 0.95rem;
                        line-height: 1.5;
                    }

                    .mobile-chat-input-area {
                        padding: 0.75rem;
                        border-top: 1px solid #333333;
                        background: #252526;
                        border-radius: 0 0 12px 12px;
                        display: flex;
                        align-items: flex-end;
                        gap: 0.5rem;
                    }

                    .mobile-chat-textarea {
                        flex: 1;
                        background: #1e1e1e;
                        border: 1px solid #333333;
                        border-radius: 8px;
                        padding: 0.75rem;
                        color: #d4d4d4;
                        font-family: inherit;
                        font-size: 0.95rem;
                        resize: none;
                        outline: none;
                        max-height: 100px;
                    }

                    .mobile-chat-textarea:focus {
                        border-color: #2563eb;
                    }

                    .mobile-send-btn {
                        background: #2563eb;
                        color: white;
                        border: none;
                        width: 44px;
                        height: 44px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        flex-shrink: 0;
                        transition: background 0.2s;
                    }

                    .mobile-send-btn:disabled {
                        background: #333333;
                        color: #666666;
                        cursor: not-allowed;
                    }
                    
                    .spin {
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        100% { transform: rotate(360deg); }
                    }
                }
            `}</style>

            <div className="mobile-prompter-container">

                {/* Floating Action Button */}
                <button className="mobile-fab" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <VscChromeClose size="1.5rem" /> : <VscSparkle size="1.5rem" />}
                </button>

                {/* Chat Modal */}
                <div className={`mobile-chat-modal ${isOpen ? 'open' : 'closed'}`}>

                    <div className="mobile-chat-header">
                        <div className="mobile-chat-title">
                            <VscSparkle color="#61dafb" /> AI Assistant
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#cccccc', cursor: 'pointer' }}>
                            <VscChromeClose size="1.2rem" />
                        </button>
                    </div>

                    <div className="mobile-chat-body">
                        {messages.length === 0 && (
                            <div className="mobile-chat-placeholder">
                                {/* Have questions about my resume? <br /> Ask them here... */}
                                Curious about my profile? <br />Ask my AI assistant! 🤖
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mobile-chat-message ${msg.sender === 'user' ? 'mobile-user-message' : 'mobile-ai-message'}`}
                            >
                                {msg.sender === 'ai' ? (
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="mobile-chat-input-area">
                        <textarea
                            className="mobile-chat-textarea"
                            placeholder="Ask me anything..."
                            rows={1}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <button
                            className="mobile-send-btn"
                            onClick={handleSend}
                            disabled={isLoading || !prompt.trim()}
                        >
                            {isLoading ? <VscLoading className="spin" size="1.2rem" /> : <VscSend size="1.2rem" />}
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MobilePrompter;