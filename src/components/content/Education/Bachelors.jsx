// content/Education/Bachelors.jsx
import { useState } from 'react';
import '../../../css/content/education.css';
import sihCert from '../../../assets/sih-certificate.jpg';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

// const bannerUrl = "https://upload.wikimedia.org/wikipedia/commons/4/4e/VIT_Bhopal_University_main_academic_building.jpg";

const Bachelors = () => {
    const [showCert, setShowCert] = useState(false);

    const bannerUrl = "https://upload.wikimedia.org/wikipedia/commons/4/4e/VIT_Bhopal_University_main_academic_building.jpg";
    const logoUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png";
    const certUrl = sihCert;

    const teamMembers = [
        "Anutej Kardele", "Devika Mathur", "Dushyant Sengupta", "Hardik Sharma", "Hemang Maan", "Jaishree Shewaramani"
    ];

    return (
        <div className="bachelors-container">

            {/* HEADER */}
            <div className="header-section" style={{ backgroundImage: `url(${bannerUrl})` }}>
                <div className="overlay-gradient"></div>
                <div className="identity-wrapper">
                    <div className="logo-box">
                        <img src={logoUrl} alt="VIT Logo" className="monochrome-logo" />
                    </div>
                    <div className="collage-name-tag">
                        <h1>Vellore Institute of Technology</h1>
                        <span className="location-tag">Bhopal, India</span>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="body-section">

                <div className="degree-bar">
                    <div className="degree-left">
                        <h2>B.Tech in Computer Science & Engineering</h2>
                        <span className="sub-degree">Specialization in Gaming Technology</span>
                    </div>
                    <div className="degree-right">
                        <div className="stat-box">
                            <span className="label">CGPA</span>
                            <span className="value highlight-val">7.72/10</span>
                        </div>
                        <div className="stat-box">
                            <span className="label">Year</span>
                            <span className="value">2018 - 2022</span>
                        </div>
                    </div>
                </div>

                <hr className="separator" />

                <div className="content-grid">
                    <div className="bio-column">
                        <h4 className="section-title">About the Journey</h4>
                        <p className="bio-text">
                            My path in technology began with a deep interest in video games, which led me
                            to explore how computer hardware and software work together to create
                            immersive experiences. This curiosity drove me to <strong>VIT Bhopal</strong>,
                            where I chose to specialize in <span className="highlight">Gaming Technology</span> to
                            turn my passion into a professional engineering foundation.
                        </p>
                        <p className="bio-text" style={{ marginTop: '1rem' }}>
                            During my undergraduate years, I focused on mastering the technical mechanics
                            of <span className="highlight">Virtual Reality</span> and
                            <strong> Applied Simulation</strong>. By combining technical precision with
                            a gamer’s intuition, I was able to lead high-impact projects and prove that
                            creative passion is a powerful catalyst for engineering excellence.
                        </p>
                    </div>

                    {/* PROJECT CARD */}
                    <div className="project-column">
                        <div className="hackathon-card">

                            {/* 1. BADGE (Small Yellow Block - Restored) */}
                            <div className="trophy-badge">🏆 National Winner</div>

                            {/* 2. EYE BUTTON */}
                            <button
                                className="toggle-cert-icon-btn"
                                onClick={() => setShowCert(!showCert)}
                                title={showCert ? "Hide Certificate" : "View Certificate"}
                            >
                                {/* Slightly larger icon for the square button */}
                                {showCert ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
                            </button>

                            {/* CONTENT TOGGLE */}
                            {showCert ? (
                                <div className="cert-view-container">
                                    <img src={certUrl} alt="SIH Certificate" className="cert-img-full" />
                                </div>
                            ) : (
                                <div className="details-view-container">
                                    <div className="card-header">
                                        <h2>Smart India Hackathon 2020</h2>
                                        <span className="subtitle">Ministry of MSME • Problem Statement SG66</span>
                                    </div>

                                    <p className="project-desc">
                                        Winner of the Smart India Hackathon 2020, securing 1st place among 1,000+ teams in India's largest national university competition.
                                        I led the development of a high-fidelity <strong>VR Fire Safety & Evacuation Simulator</strong> for the Ministry of MSME.
                                        Beyond the immersive environment, I engineered a data-driven analysis engine in Unity that tracked real-time user reaction metrics and
                                        decision-making paths, providing instantaneous, actionable feedback to improve emergency preparedness.
                                    </p>

                                    <div className="team-container">
                                        <span className="team-title">Development Team</span>
                                        <div className="team-tags">
                                            {teamMembers.map((m, i) => (
                                                <span key={i} className="member-pill">{m}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Bachelors;