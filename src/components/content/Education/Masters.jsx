import { useState } from 'react';
import '../../../css/content/education.css';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import logoUrl from '../../../assets/ub.png';

const Masters = () => {
    const [showProject, setShowProject] = useState(false);

    const bannerUrl = "https://www.buffalo.edu/content/www/advancement/work-with-us/about-the-university/jcr%3acontent/par/image_386387655.img.1920.612.jpg/1654610309624.jpg";

    const teamMembers = ["Anutej Kardele", "Jay Pathare", "Pranav Kundaikar", "Sejal Baser", "Teja Krishna"];

    const completedCourses = [
        { name: "Algorithms", code: "CSE 531" },
        { name: "Machine Learning", code: "CSE 574" },
        { name: "Computer Security", code: "CSE 565" },
        { name: "Operating Systems", code: "CSE 521" }
    ];

    const ongoingCourses = [
        { name: "Deep Learning", code: "CSE 676" },
        { name: "Modern Network Concepts", code: "CSE 589" },
        { name: "MS Project Development", code: "CSE 611" },
        { name: "Project Management", code: "EAS 521" }
    ];

    return (
        <div className="bachelors-container">
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

                                    <div className="dual-list-container">
                                        <div className="course-list-column">
                                            <span className="course-section-label">Completed</span>
                                            {completedCourses.map((c, i) => (
                                                <div key={i} className="course-item completed">
                                                    <span className="course-name">{c.name}</span>
                                                    <span className="course-code">{c.code}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="course-list-column">
                                            <span className="course-section-label ongoing">Ongoing</span>
                                            {ongoingCourses.map((c, i) => (
                                                <div key={i} className="course-item ongoing">
                                                    <span className="course-name">{c.name}</span>
                                                    <span className="course-code">{c.code}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="project-desc footer-note-compact">
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