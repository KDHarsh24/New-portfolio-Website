import React from 'react';
import './Projects.css';
import { setCursorMedia } from '../Cursor/CursorAnim';

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "Web Development",
        details: "A full-featured online store with cart, checkout, and payment integration.",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "https://github.com",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "AI Dashboard",
        category: "UI/UX Design",
        details: "Interactive dashboard for visualizing AI model performance metrics.",
        techStack: ["Vue.js", "D3.js", "Python", "FastAPI"],
        link: "https://github.com",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Crypto Wallet",
        category: "Mobile App",
        details: "Secure mobile wallet for managing and trading cryptocurrencies.",
        techStack: ["React Native", "Redux", "Web3.js"],
        link: "https://github.com",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Social Network",
        category: "Full Stack",
        details: "A community platform for developers to share code and collaborate.",
        techStack: ["Next.js", "GraphQL", "PostgreSQL", "AWS"],
        link: "https://github.com",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
    }
];

const Projects = () => {
    const handleMouseEnter = (image) => {
        setCursorMedia(image);
    };

    const handleMouseLeave = () => {
        setCursorMedia("");
    };

    const handleLinkClick = (link) => {
        window.open(link, "_blank");
    };

    return (
        <section className="projects-section" id="projects">
            <div className="projects-header">
                <h2>Proof Of Works</h2>
                <p>A collection of projects that define my journey.</p>
            </div>
            <div className="projects-list">
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className="project-item"
                        onMouseEnter={() => handleMouseEnter(project.image)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleLinkClick(project.link)}
                    >
                        <div className="project-content">
                            <div className="project-header-row">
                                <h3 className="project-title">{project.title}</h3>
                                <span className="project-category">{project.category}</span>
                            </div>
                            <p className="project-details">{project.details}</p>
                            <div className="project-tech">
                                {project.techStack.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div className="project-arrow">
                            →
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
