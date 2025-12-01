import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import { setCursorMedia } from '../Cursor/CursorAnim';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const projects =[
    {
        id: 1,
        title: "Rasoda: Smart Campus Dining",
        category: "Mobile App",
        details: "A 1k+ user campus dining and queue-management app with real-time menu updates, pre-booking, and waste-reduction insights.",
        techStack: ["Flutter", "PHP", "Firebase", "MySQL", "Hostinger CI/CD"],
        link: "https://play.google.com/store/apps/details?id=com.rasoda.messapp",
        image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "NavSarjan: SIH Winning Platform",
        category: "Full Stack",
        details: "A research, IPR, and startup workflow platform built for 200+ institutes with real-time communication and WebRTC collaboration.",
        techStack: ["React.js", "Node.js", "MongoDB", "WebRTC", "Socket.io"],
        link: "https://navsarjan.vercel.app",
        image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "CCTV-Based Face Recognition Attendance",
        category: "Machine Learning",
        details: "A real-time CCTV attendance system using advanced face recognition and GPU-accelerated pipelines with 91%+ accuracy.",
        techStack: ["InsightFace", "FastAPI", "OpenCV", "Python", "PostgreSQL"],
        link: "https://facerecord.vercel.app",
        image: "https://images.unsplash.com/photo-1592496431122-2349e0beed15?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Multilingual Spell Checker",
        category: "NLP",
        details: "A Trie and BERT-based spell checker for Manipuri, Hindi, and Bengali with typo modeling and 100K+ dataset.",
        techStack: ["Python", "Trie", "BERT", "NLTK", "T5"],
        link: "https://triespellchecker.vercel.app",
        image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Jantagram Civic Issue Reporter",
        category: "Mobile App",
        details: "A civic problem-reporting platform built during a hackathon to help users report issues with location, media, and status tracking.",
        techStack: ["Flutter", "Firebase", "Google Maps API"],
        link: "https://github.com/kdharsh24/Jantagram",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Neuroverse Assistive Learning Tool",
        category: "AI Product",
        details: "An AI-powered reading and study assistant for ADHD and dyslexic users that simplifies content and generates practice questions.",
        techStack: ["React.js", "Node.js", "Python", "LLM Prompting"],
        link: "https://github.com/cgoyal69/Neurodiverse",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "WebTree: HTML Structure CLI Tool",
        category: "Systems / CLI",
        details: "A native Linux command-line tool that parses HTML and generates a tree-structured representation with error detection.",
        techStack: ["C++", "Bash", "Makefile", "GDB"],
        link: "https://github.com/KDHarsh24/WebTree",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 8,
        title: "Mike Ross: AI Legal Research Assistant",
        category: "AI Agent",
        details: "An AI legal assistant built for TechXchange that processes long documents, answers legal queries, and assists researchers.",
        techStack: ["Python", "FastAPI", "RAG", "LLMs", "Vector DB"],
        link: "https://github.com/KDHarsh24/Project-Pearson",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1000&auto=format&fit=crop"
    }
];


const Projects = () => {
    const [isCarousel, setIsCarousel] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth <= 1024;
    });
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const handleResize = () => {
            setIsCarousel(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = (image) => {
        setCursorMedia(image);
    };

    const handleMouseLeave = () => {
        setCursorMedia("");
    };

    const handleLinkClick = (link) => {
        window.open(link, "_blank");
    };

    // Equalize carousel card heights to match the tallest card when carousel is active
    useEffect(() => {
        if (!isCarousel) {
            // reset any inline heights
            const els = document.querySelectorAll('.project-item.project-carousel-item');
            els.forEach(el => el.style.height = '');
            return;
        }

        let rafId = null;
        let timeoutId = null;

        const equalize = () => {
            const els = Array.from(document.querySelectorAll('.project-item.project-carousel-item'));
            if (!els.length) return;
            // reset
            els.forEach(el => el.style.height = 'auto');
            // measure
            const heights = els.map(el => Math.round(el.getBoundingClientRect().height || 0));
            const max = Math.max(...heights, 360);
            els.forEach(el => el.style.height = `${max}px`);
        };

        const debounced = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                // use RAF to ensure layout has settled
                rafId = requestAnimationFrame(equalize);
            }, 80);
        };

        // initial run
        debounced();

        window.addEventListener('resize', debounced);

        // watch for DOM changes inside carousel (images loading etc.)
        const carouselRoot = document.querySelector('.projects-carousel');
        const observer = new MutationObserver(debounced);
        if (carouselRoot) observer.observe(carouselRoot, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('resize', debounced);
            if (observer) observer.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
            clearTimeout(timeoutId);
        };
    }, [isCarousel]);

    return (
        <section className="projects-section" id="projects">
            <div className="projects-header">
                <h2>Proof Of Works</h2>
                <p>A collection of projects that define my journey.</p>
            </div>
            {isCarousel ? (
                <div className="projects-carousel">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop
                        speed={900}
                        autoplay={{ delay: 7000, disableOnInteraction: false }}
                        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 16 },
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            900: { slidesPerView: 1, spaceBetween: 24 }
                        }}
                        onInit={(swiper) => {
                            if (prevRef.current && nextRef.current) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project.id}>
                                <div
                                    className="project-item project-carousel-item"
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
                                    <div className="project-arrow">→</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="projects-nav">
                        <button
                            className="projects-nav-button prev"
                            ref={prevRef}
                            type="button"
                            aria-label="Show previous project"
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                {/* simple cartoon left arrow */}
                                <path className="chev" d="M15 6 L9 12 L15 18" />
                            </svg>
                        </button>
                        <button
                            className="projects-nav-button next"
                            ref={nextRef}
                            type="button"
                            aria-label="Show next project"
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                {/* simple cartoon right arrow */}
                                <path className="chev" d="M9 6 L15 12 L9 18" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
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
                            <div className="project-arrow">→</div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;
