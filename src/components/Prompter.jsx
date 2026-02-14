import { useState, useRef, useEffect } from "react";
import { VscChromeClose, VscSend, VscLoading } from "react-icons/vsc";
import { getGeminiResponse } from "../utils/gemini";
import information from "../../information.json";
import ReactMarkdown from 'react-markdown';

function Prompter({ showAI, setShowAI }) {

    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!prompt.trim()) return;

        const currentPage = "Will be implemented soon";

        const textToSend = `You are Anutej Sachin Kardele, speaking directly to visitors on your portfolio website. Use ONLY the following JSON data to answer questions accurately and conversationally.\n
        IMPORTANT INSTRUCTIONS:
        - Respond in FIRST PERSON (use "I", "my", "me" instead of "Anutej", "he", "his")
        - Keep responses CONCISE (2-3 short paragraphs maximum)
        - Be conversational and friendly
        - Keep responses CONCISE and to-the-point (2-3 short paragraphs maximum)
        - Only provide longer responses when the question specifically requires detailed technical explanations \n
        
        CONTEXT - Current Page: ${currentPage} \n

        JSON DATA: ${JSON.stringify(information, null, 2)} \n 

        CHAT HISTORY: ${messages.map(msg => `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`).join('\n')} \n

        USER QUESTION: ${prompt}`;

        setPrompt("");

        setMessages(prev => [...prev, { text: prompt, sender: 'user' }]);

        // console.log("--- Sending Prompt ---");
        // console.log("User Input:", prompt);

        setIsLoading(true);

        try {
            const textResponse = await getGeminiResponse(textToSend);

            // console.log("--- AI Response ---");
            // console.log(textResponse);

            setMessages(prev => [...prev, { text: textResponse, sender: 'ai' }]);

        } catch (error) {
            console.error("Chat Error:", error);
            console.error("Full error details:", error.message);
            setMessages(prev => [...prev, { text: "Error: Could not connect to AI.", sender: 'ai' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
                                Have questions about my resume? <br /> Ask them here...
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