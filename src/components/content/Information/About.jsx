import React, { useState, useEffect, useRef } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import '../../../css/content/About.css';

import image1 from '../../../assets/images/img1.jpg';
import image2 from '../../../assets/images/img2.jpg';
import image3 from '../../../assets/images/img3.jpg';
import image4 from '../../../assets/images/img4.jpg';
import image5 from '../../../assets/images/img5.jpg';
import image6 from '../../../assets/images/img6.jpg';
import image7 from '../../../assets/images/img7.jpg';
import image8 from '../../../assets/images/img8.jpg';

// Create an array of the imported images
const profileImages = [image1, image2, image3, image4, image5, image6, image7, image8];

// --- SUB-COMPONENT: TERMINAL TICKER ---
const TerminalTicker = () => {
    // Data Sequence
    const dataSequence = [
        { text: "open achievements.txt", output: "🏆 National Hackathon Winner" },
        { text: "ls", output: "Listing pages: [Education, Information, Projects]" },
        { text: "uptime --work", output: "3+ Years Building Immersive XR" },
        { text: "ai \"whoami?\"", output: "Developer, Gamer, Football Fan" },
        { text: "cd projects", output: "Navigating to Projects..." },
        { text: "ls -a", output: "Listing pages: [Education, Hidden, Information, Projects]" },
        { text: "ai \"Who are you?\"", output: "I am a Chatbot, answering question about Anutej" }
    ];

    const [msgIndex, setMsgIndex] = useState(0);
    const [displayedCmd, setDisplayedCmd] = useState('');
    const [displayedOutput, setDisplayedOutput] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Config
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
            // DELETING PHASE
            if (displayedOutput.length > 0) {
                // Clear output first
                setDisplayedOutput('');
            } else if (displayedCmd.length > 0) {
                // Backspace command
                timer = setTimeout(() => {
                    setDisplayedCmd(prev => prev.slice(0, -1));
                }, deletingSpeed);
            } else {
                // Switch to next message
                setIsDeleting(false);
                setMsgIndex(prev => (prev + 1) % dataSequence.length);
            }
        } else {
            // TYPING PHASE
            if (displayedCmd.length < fullCmd.length) {
                // Type command
                timer = setTimeout(() => {
                    setDisplayedCmd(fullCmd.slice(0, displayedCmd.length + 1));
                }, typingSpeed);
            } else if (!displayedOutput) {
                // Wait then show output
                timer = setTimeout(() => {
                    setDisplayedOutput(fullOutput);
                }, pauseBeforeOutput);
            } else {
                // Wait then delete
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseBeforeDelete);
            }
        }

        return () => clearTimeout(timer);
    }, [displayedCmd, displayedOutput, isDeleting, msgIndex, dataSequence]);

    return (
        <div className="system-ticker-container">
            {/* LINE 1: Prompt & Command */}
            <div className="prompt-line">
                <span className="prompt-user">root@anutej: Anutej</span>
                <span className="prompt-path">%</span>
                <span className="ticker-text">
                    {displayedCmd}
                    <span className="cursor"></span>
                </span>
            </div>

            {/* LINE 2: Output (Always rendered to hold height, visible via CSS) */}
            <div className={`output-line ${displayedOutput ? 'visible' : ''}`}>
                {displayedOutput ? `=> ${displayedOutput}` : ''}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const About = () => {
    const profileImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop";

    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImgIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 25;
        const rotateY = (x - centerX) / 25;
        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div className="about-container">
            <div className="about-grid-layout">

                {/* LEFT COLUMN: Narrative */}
                <div className="text-column">

                    <h1 className="headline">
                        <span className="block">Designing</span>
                        <span className="accent-text">Robust Systems.</span>
                    </h1>

                    <div className="bio-body">
                        <p className="lead-paragraph">
                            I am <strong>Anutej Kardele</strong>, a Computer Science Master’s Candidate at the <strong>University at Buffalo</strong> with 3+ years of commercial experience.
                        </p>
                        <p className="lead-paragraph" style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                            With a robust background of <strong>3 years in engineering immersive VR simulations</strong> and <strong>Game Engines</strong>,
                            I am now pivoting toward the deeper computational layers. I am actively expanding my skillset to master the
                            complexities of <strong>Systems Architecture</strong> and <strong>advanced Artificial Intelligence</strong>.
                        </p>
                    </div>

                    {/* <div className="cta-row">
                        <button className="btn-primary" onClick={() => window.open("/resume.pdf", "_blank")}>
                            <FaFileDownload /> Download CV
                        </button>
                        <button className="btn-secondary">
                            View Projects
                        </button>
                    </div> */}

                    {/* NEW: LIVE TERMINAL DEMO */}
                    <TerminalTicker />

                </div>

                {/* RIGHT COLUMN: Clean Image */}
                <div className="image-column">
                    <div
                        className="tilt-wrapper"
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
                        }}
                    >
                        <div className="image-card-inner">
                            {profileImages.map((imgSrc, index) => (
                                <img
                                    key={index}
                                    src={imgSrc}
                                    alt={`Anutej Workspace ${index}`}
                                    // Dynamically add the 'active' class
                                    className={`tilt-image ${index === currentImgIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;