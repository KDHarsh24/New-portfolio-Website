import React, { useState, useEffect, useRef } from 'react';
import './Marquee.css';
import { setCursorText, setCursorGrow } from '../Cursor/CursorAnim';

const companies = [
    {
        name: "Bamboobox",
        about: "Bamboobox.ai focuses on generative AI and LLM-centered solutions that improve B2B discovery and AI model performance.",
        role: "Associate Software Intern",
        timeline: "2025",
        desc: "Developed generative engine optimization and LLM pipelines (llms.txt based indexing) to boost B2B discoverability and performance of AI models. Implemented evaluation pipelines and productionized model-serving endpoints.",
        techStack: ["Python", "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "Docker", "Kubernetes", "AWS", "REST"],
        logo: "https://static-asset.inc42.com/logo/bamboobox.png"
    },
    {
        name: "Acumensa",
        about: "Acumensa Technologies provides full-stack web & mobile solutions, ERP/CRM integration and analytics for enterprise and retail customers.",
        role: "Full Stack Developer Intern",
        timeline: "2025",
        desc: "Built an ERP module for e-commerce sellers including product management, order workflows and integrations. Implemented web-scraping pipelines and analytics for competitor and product insights.",
        techStack: ["React", "Node.js", "Express", "Python", "Scrapy", "PostgreSQL", "MongoDB", "Azure", "Docker", "Redis"],
        logo: "https://acumensa.co/wp-content/uploads/2023/09/Blue-Modern-Technology-and-Software-Company-Logo-2.png"
    },
    {
        name: "WorldQuant",
        about: "WorldQuant is a quantitative investment firm that builds systematic trading strategies (alphas) using research-driven, data-centric methods.",
        role: "Backend Engineer",
        timeline: "2018 - 2020",
        desc: "Designed and implemented alpha-generating algorithms for quantitative trading, including backtesting infrastructure and production pipelines for signal generation.",
        techStack: ["Python", "C++", "NumPy", "pandas", "scikit-learn", "KDB+/q", "SQL", "AWS", "Docker"],
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/WorldQuant_Text_Logo_2022.jpg"
    },
    // { 
    //     name: "Netflix", 
    //     about: "A subscription-based streaming service and production company offering a library of films and television series.",
    //     role: "UI/UX Engineer", 
    //     timeline: "2016 - 2018",
    //     desc: "Revamped the user profile interface, resulting in a 15% increase in user engagement. Conducted A/B testing for new feature rollouts.",
    //     logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
    // }
];

const Marquee = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseEnter = () => {
        // Show stacked "Know More" with an inline Mac-style cursor SVG to the right
        setCursorText(
            '<div class="cursor-flex-wrapper">' +
                '<div class="cursor-text-stack">' +
                    '<span>Know</span>' +
                    '<span>More</span>' +
                '</div>' +
                '<div class="cursor-icon-wrapper">' +
                    '<svg class="mac-cursor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" width="16" height="22" aria-hidden="true">' +
                    '<path d="M1 1 L12 11 L8 12 L12 21 L10 22 L5 13 L1 22 Z" fill="currentColor"/>' +
                    '</svg>' +
                '</div>' +
            '</div>'
        );
    };

    const handleMouseLeave = () => {
        setCursorText("");
        setIsDragging(false);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleItemClick = (company) => {
        if (!isDragging) {
            setSelectedCompany(company);
        }
    };

    const [repeats, setRepeats] = useState(3);

    // Compute how many times to repeat the items so that clickable React elements
    // are present across the visible scroll area (avoids cloning DOM nodes).
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const compute = () => {
            // baseWidth: width of one set of items
            const baseWidth = content.scrollWidth || 0;
            const minWidth = Math.max(container.clientWidth * 2, container.clientWidth + baseWidth);
            if (baseWidth > 0) {
                const needed = Math.max(2, Math.ceil(minWidth / baseWidth));
                setRepeats(needed + 1); // add one extra for safety
            } else {
                setRepeats(3);
            }
        };

        compute();
        const onResize = () => compute();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const closeDialog = () => {
        setSelectedCompany(null);
        setCursorGrow(false); // Ensure cursor resets
    };

    return (
        <section className="marquee-section" id="experience">
            <div className="marquee-header-container">
                <h2 className="marquee-heading">Experience</h2>
                <h3 className="marquee-subheading">Education & Affiliations</h3>
            </div>
            <div className={`marquee-container ${isDragging ? 'is-dragging' : ''}`} 
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div className="marquee-content" ref={contentRef}>
                        {Array.from({ length: repeats }).map((_, rep) => (
                            companies.map((company, index) => (
                                <div
                                    key={`${rep}-${index}`}
                                    className="marquee-item"
                                    onClick={() => handleItemClick(company)}
                                >
                                    <span className="company-name">{company.name}</span>
                                    <img src={company.logo} alt={company.name} className="company-logo" />
                                </div>
                            ))
                        ))}
                    </div>
            </div>

            {selectedCompany && (
                <div className="company-dialog-overlay" onClick={closeDialog}>
                    <div className="company-dialog" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="close-dialog-btn" 
                            onClick={closeDialog}
                            onMouseEnter={() => setCursorGrow(true)}
                            onMouseLeave={() => setCursorGrow(false)}
                        >
                            &times;
                        </button>
                        
                        <div className="dialog-header">
                            <img src={selectedCompany.logo} alt={selectedCompany.name} className="dialog-logo-img" />
                            <h2 className="dialog-title">{selectedCompany.name}</h2>
                        </div>

                        <div className="dialog-body">
                            <div className="dialog-section">
                                <h5 className="dialog-label">About Company</h5>
                                <p className="dialog-text">{selectedCompany.about}</p>
                            </div>

                            <div className="dialog-section">
                                <h5 className="dialog-label">My Role</h5>
                                <div className="role-timeline-wrapper">
                                    <p className="dialog-role-text">{selectedCompany.role}</p>
                                    <span className="dialog-timeline">{selectedCompany.timeline}</span>
                                </div>
                            </div>

                            <div className="dialog-section">
                                <h5 className="dialog-label">Contributions</h5>
                                <p className="dialog-text">{selectedCompany.desc}</p>
                            </div>
                            
                            <div className="dialog-section">
                                <h5 className="dialog-label">Tech Stack / Skills</h5>
                                <div className="tech-badges">
                                    {selectedCompany.techStack && selectedCompany.techStack.map((t, i) => (
                                        <span key={i} className="tech-badge">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Marquee;
