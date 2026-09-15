import React from 'react';
import '../../../css/content/Skills.css';

const Skills = () => {
    const skillGroups = [
        {
            category: "Software & Web Development",
            icon: "⚙️",
            description: "Expertise in full-stack architecture, scalable backends, and low-level system design.",
            skills: [
                { name: "Languages", detail: "Java, Python, C#, Go, JavaScript, C" },
                { name: "Backend & APIs", detail: "Spring Boot, REST APIs, JPA/Hibernate, DTOs" },
                { name: "Frontend", detail: "React.js, Vite, HTML/CSS" }
            ]
        },
        {
            category: "Artificial Intelligence & Data",
            icon: "🧠",
            description: "Developing intelligent models, NLP pipelines, and data-driven infrastructure.",
            skills: [
                { name: "ML & Frameworks", detail: "PyTorch, Pandas, NumPy" },
                { name: "AI Technologies", detail: "LLMs (Qwen), LoRA, GenAI, Ollama" },
                { name: "Data Engineering", detail: "OCR, Web Scraping, Metadata Extraction" }
            ]
        },
        {
            category: "Databases & Infrastructure",
            icon: "☁️",
            description: "Managing relational data and containerized deployment pipelines.",
            skills: [
                { name: "Databases", detail: "PostgreSQL, MySQL" },
                { name: "DevOps & Tools", detail: "Docker, Linux/Ubuntu, Git" },
                { name: "Testing & CI/CD", detail: "JUnit 5, Mockito, GitHub Actions" }
            ]
        },
        {
            category: "Immersive & Hardware",
            icon: "🥽",
            description: "3+ years of commercial execution in VR, simulation, and telemetry.",
            skills: [
                { name: "Game Engines", detail: "Unity 3D, XR Frameworks, Applied Math" },
                { name: "Hardware Interfaces", detail: "Arduino IDE, Firmware, Serial Communication" },
                { name: "Design & Auth", detail: "Figma, Auth0, Component-Based Architecture" }
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