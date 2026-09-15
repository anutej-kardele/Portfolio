import { useState, useRef, useEffect } from "react";
import { VscChromeClose, VscSend, VscLoading } from "react-icons/vsc";
import ReactMarkdown from 'react-markdown';
import { askAI } from "../utils/ai";

function Prompter({ showAI, setShowAI, activeFile }) {

    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!prompt.trim()) return

        const question = prompt
        setPrompt("")
        setMessages(prev => [...prev, { text: question, sender: 'user' }])
        setIsLoading(true)

        try {
            const answer = await askAI({
                question,
                activeFile,
                history: messages.map(m => ({ sender: m.sender, text: m.text })),
            })
            setMessages(prev => [...prev, { text: answer, sender: 'ai' }])
        } catch (error) {
            setMessages(prev => [...prev, { text: error.message, sender: 'ai' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <style>{`
                @media (max-width: 1024px) {
                    .prompter {
                        display: none !important;
                    }
                }
            `}</style>
            {/* prompter */}
            {showAI && (
                <aside className='prompter'>
                    <div >
                        <div style={{
                            position: 'absolute', left: '1rem', top: '1rem', fontSize: '0.9rem',
                            borderBottom: '2px solid var(--accent-blue)',
                            paddingBottom: '3px',
                            width: 'fit-content'
                        }}>
                            CHAT
                        </div>

                        <button onClick={() => setShowAI(false)} className="transparentButton" style={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                            <VscChromeClose size={'1rem'} />
                        </button>
                    </div>

                    {/* <div className="ChatDisplay">
                        Ask me anything...
                    </div> */}

                    {/* ChatDisplay */}
                    <div className="ChatDisplay">

                        {messages.length === 0 && (
                            <div className="chat-placeholder" >
                                {/* Have questions about my resume? <br /> Ask them here...
                                 */}
                                Curious about my profile? <br />Ask my AI assistant! 🤖
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
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



                    <div className="AICharBox">
                        <textarea
                            placeholder="What do you want to ask?"
                            rows={4}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />


                        <button style={{
                            position: 'absolute', right: '1rem', bottom: '1rem',
                            opacity: prompt.trim().length > 0 ? '1' : '0.6',
                            cursor: prompt.trim().length > 0 ? 'pointer' : 'not-allowed'
                        }} className="transparentButton" onClick={handleSend} disabled={isLoading || !prompt.trim()}>
                            {isLoading ? <VscLoading className="spin" /> : <VscSend size={'1.2rem'} />}
                        </button>
                    </div>

                </aside>
            )}
        </>
    )
}

export default Prompter;