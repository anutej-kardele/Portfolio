import React from 'react';
import '../../../css/content/Skills.css';

const Skills = () => {
    const skillGroups = [
        {
            category: "Software Architecture & Systems",
            icon: "⚙️",
            description: "Expertise in low-level systems and high-performance software design.",
            skills: [
                { name: "Core Languages", detail: "C, C#, Java, Python" },
                { name: "Architecture", detail: "Component-Based, OOP, DSA" },
                { name: "Web Technologies", detail: "React.js, JavaScript, Vite" }
            ]
        },
        {
            category: "Artificial Intelligence",
            icon: "🧠",
            description: "Developing intelligent models and data-driven pipelines.",
            skills: [
                { name: "Machine Learning", detail: "CNN, FCN, Reinforcement Learning" },
                { name: "Data Engineering", detail: "Web Scraping, OCR, Metadata Extraction" },
                { name: "Tools", detail: "Python, NumPy, PyTorch" }
            ]
        },
        {
            category: "Immersive Engineering",
            icon: "🥽",
            description: "3+ years of commercial execution in VR and simulation.",
            skills: [
                { name: "Game Engines", detail: "Unity 3D (v5.6 to 2019+)" },
                { name: "XR Frameworks", detail: "Oculus SDK, SteamVR, XR Toolkit" },
                { name: "Applied Math", detail: "Raycasting, UV Texture Coordinates" }
            ]
        },
        {
            category: "Development Suite",
            icon: "🛠️",
            description: "Modern tools for collaborative, professional engineering.",
            skills: [
                { name: "Version Control", detail: "Git, GitHub Secret Scanning" },
                { name: "Environment", detail: "Docker, Linux/Ubuntu" },
                { name: "Project Management", detail: "Agile, Gantt Charts, Team Leadership" }
            ]
        }
    ];

    return (
        <div className="skills-page-wrapper">
            <div className="skills-header">
                <h1>Technical Competencies</h1>
                <p>Synthesizing technical precision with architectural insight to build robust, scalable systems.</p>
            </div>

            <div className="skills-main-grid">
                {skillGroups.map((group, index) => (
                    <div key={index} className="skill-category-card">
                        <div className="card-top-section">
                            <span className="category-icon-box">{group.icon}</span>
                            <div className="category-text">
                                <h3>{group.category}</h3>
                                <p>{group.description}</p>
                            </div>
                        </div>
                        <div className="skills-list-wrapper">
                            {group.skills.map((skill, i) => (
                                <div key={i} className="skill-row">
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-detail-text">{skill.detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;