import { useState } from 'react';
import '../../../css/content/education.css';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import logoUrl from "../../../assets/ub.png";

const Masters = () => {
    const [showProject, setShowProject] = useState(false);

    const bannerUrl = "https://www.buffalo.edu/content/www/advancement/work-with-us/about-the-university/jcr%3acontent/par/image_386387655.img.1920.612.jpg/1654610309624.jpg";

    const teamMembers = ["Anutej Kardele", "Jay Pathare", "Pranav Kundaikar", "Sejal Baser", "Teja Krishna"];

    const completedCourses = [
        { name: "Algorithms", code: "CSE 531" },
        { name: "Machine Learning", code: "CSE 574" },
        { name: "Computer Security", code: "CSE 565" },
        { name: "Operating Systems", code: "CSE 521" },
        { name: "Project Management", code: "EAS 521" },
        { name: "Deep Learning", code: "CSE 676" },
        { name: "Modern Network Concepts", code: "CSE 589" },
        { name: "MS Project Development", code: "CSE 611" }
    ];

    const ongoingCourses = [
        { name: "Distributed Systems", code: "CSE 586" },
        { name: "Data Intensive Computing", code: "CSE 587" }
    ];

    return (
        <div className="bachelors-container mobile-edu-container">
            <style>{`
                /* New Grid Styles for Horizontal Split */
                .stacked-courses-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    width: 100%;
                    margin-top: 1rem;
                }
                
                .course-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.8rem;
                    width: 100%;
                }
                
                .section-label-center {
                    display: block;
                    text-align: center;
                    margin-bottom: 0.75rem;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                @media (max-width: 1024px) {
                    .mobile-edu-container {
                        padding: 0.5rem !important;
                        padding-bottom: 6rem !important; /* Breathing room to scroll past the FAB */
                        overflow-x: hidden;
                    }
                    /* Force top-and-bottom stacking instead of side-by-side */
                    .mobile-edu-container .content-grid {
                        display: flex !important;
                        flex-direction: column !important;
                        gap: 1.5rem !important;
                    }
                    .mobile-edu-container .degree-bar {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                    .mobile-edu-container .degree-right {
                        width: 100%;
                        justify-content: space-between;
                    }
                    .mobile-edu-container .header-section {
                        height: 140px !important;
                    }
                    .mobile-edu-container .identity-wrapper {
                        padding: 1rem !important;
                    }
                    .mobile-edu-container .collage-name-tag h1 {
                        font-size: 1.25rem !important;
                    }
                    
                    /* FIX: Force the card to wrap all stacked content */
                    .hackathon-card, 
                    .masters-card, 
                    .details-view-container {
                        height: auto !important;
                        min-height: min-content !important;
                        padding-bottom: 1.5rem !important;
                    }
                }

                @media (max-width: 600px) {
                    .course-grid {
                        grid-template-columns: 1fr; /* Stacks to 1 column on very small phone screens to prevent squishing */
                    }
                }
            `}</style>

            <div className="header-section" style={{ backgroundImage: `url(${bannerUrl})` }}>
                <div className="overlay-gradient"></div>
                <div className="identity-wrapper">
                    <div className="logo-box">
                        <img src={logoUrl} alt="UB Logo" className="monochrome-logo" />
                    </div>
                    <div className="collage-name-tag">
                        <h1>University at Buffalo</h1>
                        <span className="location-tag">Buffalo, New York • SUNY</span>
                    </div>
                </div>
            </div>

            <div className="body-section">
                <div className="degree-bar">
                    <div className="degree-left">
                        <h2>M.S. in Computer Science</h2>
                        <span className="sub-degree">Specialization in Systems Track</span>
                    </div>
                    <div className="degree-right">
                        <div className="stat-box">
                            <span className="label">GPA</span>
                            <span className="value highlight-val">3.75/4</span>
                        </div>
                        <div className="stat-box">
                            <span className="label">Year</span>
                            <span className="value">2025 - 2027</span>
                        </div>
                    </div>
                </div>

                <hr className="separator" />

                <div className="content-grid">
                    <div className="bio-column">
                        <h4 className="section-title">The Graduate Shift</h4>
                        <p className="bio-text">
                            After building a strong foundation in simulation, I transitioned to the <strong>University at Buffalo</strong> to specialize in high-performance computing. I currently maintain a <span className="highlight">3.75 GPA</span> while pursuing the <strong>Systems Track</strong>, focusing on the low-level architecture that powers modern software.
                        </p>
                        <p className="bio-text" style={{ marginTop: '0.8rem' }}>
                            This journey is a deliberate pivot toward <span className="highlight">Machine Learning</span> and <strong>Advanced Algorithms</strong>. I am exploring how to build intelligent systems by mastering complex datasets and new development environments.
                        </p>
                    </div>

                    <div className="project-column">
                        <div className="hackathon-card masters-card">
                            <div className="trophy-badge" style={{ background: '#005bbb', color: '#fff' }}>
                                💻 Technical Specialization
                            </div>

                            <button className="toggle-cert-icon-btn" onClick={() => setShowProject(!showProject)}>
                                {showProject ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
                            </button>

                            {showProject ? (
                                <div className="details-view-container">
                                    <div className="card-header">
                                        <h2>MS Project (CSE 611)</h2>
                                        <span className="subtitle">Spring 2026</span>
                                    </div>

                                    <p className="project-desc">
                                        Collaborating with the 611 Development team to engineer a scalable data extraction pipeline. The system performs high-volume <strong>web scraping</strong> and integrates <strong>OCR</strong> models to read and extract data, generating structured metadata for archives.
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
                            ) : (
                                <div className="details-view-container compact-view">
                                    <div className="card-header">
                                        <h2>Curriculum & Focus</h2>
                                        <span className="subtitle" style={{ color: '#4fc3f7' }}>Advanced Systems & Intelligent Models</span>
                                    </div>

                                    {/* NEW HORIZONTAL SPLIT LAYOUT */}
                                    <div className="stacked-courses-container">

                                        {/* Row 1: Completed Courses */}
                                        <div className="course-group">
                                            <span className="course-section-label section-label-center">Completed</span>
                                            <div className="course-grid">
                                                {completedCourses.map((c, i) => (
                                                    <div key={i} className="course-item completed">
                                                        <span className="course-name">{c.name}</span>
                                                        <span className="course-code">{c.code}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row 2: Ongoing Courses */}
                                        <div className="course-group">
                                            <span className="course-section-label ongoing section-label-center">Ongoing</span>
                                            <div className="course-grid">
                                                {ongoingCourses.map((c, i) => (
                                                    <div key={i} className="course-item ongoing">
                                                        <span className="course-name">{c.name}</span>
                                                        <span className="course-code">{c.code}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                    <p className="project-desc footer-note-compact" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                        Applying systems engineering to ML models to build fast, intelligent platforms.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Masters;