import React from 'react';
import './Projects.css';
import { setCursorMedia } from '../Cursor/CursorAnim';

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "AI Dashboard",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Crypto Wallet",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Social Network",
        category: "Full Stack",
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

    return (
        <section className="projects-section" id="projects">
            <div className="projects-header">
                <h2>Selected Works</h2>
                <p>A collection of projects that define my journey.</p>
            </div>
            <div className="projects-list">
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className="project-item"
                        onMouseEnter={() => handleMouseEnter(project.image)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="project-info">
                            <h3 className="project-title">{project.title}</h3>
                            <span className="project-category">{project.category}</span>
                        </div>
                        <div className="project-line"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
