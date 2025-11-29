import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { addHoverEffect, removeHoverEffect } from '../Cursor/CursorAnim';
import './Menu.css';

const Menu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);
    const canvasRef = useRef(null);
    const closeBtnRef = useRef(null);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const id = section.getAttribute('id');
                if (id && window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = '#' + id;
                }
            });
            
            // Special case for top of page
            if (window.scrollY < 100) {
                current = '#home';
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const closeBtn = closeBtnRef.current;
        if (closeBtn) {
            addHoverEffect(closeBtn);
        }
        return () => {
            if (closeBtn) {
                removeHoverEffect(closeBtn);
            }
        };
    }, []);

    useEffect(() => {
        const menu = menuRef.current;
        const overlay = overlayRef.current;
        const links = linksRef.current;

        if (isOpen) {
            gsap.to(overlay, {
                duration: 0.8,
                height: '100vh',
                ease: 'power3.inOut'
            });
            gsap.to(menu, {
                duration: 0.8,
                top: 0,
                ease: 'power3.inOut',
                delay: 0.1
            });
            gsap.fromTo(links, 
                { y: 100, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.5, 
                    stagger: 0.1, 
                    delay: 0.5,
                    ease: 'power3.out'
                }
            );
        } else {
            gsap.to(menu, {
                duration: 0.8,
                top: '-100%',
                ease: 'power3.inOut'
            });
            gsap.to(overlay, {
                duration: 0.8,
                height: 0,
                ease: 'power3.inOut',
                delay: 0.1
            });
        }
    }, [isOpen]);

    // Starry Background Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const width = canvas.width;
            const height = canvas.height;
            const numStars = width < 768 ? 300 : 800; // Responsive star count
            const centerX = width / 2;
            const centerWidth = width < 768 ? 250 : 400; // Responsive text area width

            for (let i = 0; i < numStars; i++) {
                let x, y;
                // Try to spawn stars away from the center text area
                // 85% chance to be outside the center column (increased from 70%)
                if (Math.random() > 0.15) {
                    if (Math.random() > 0.5) {
                        x = Math.random() * (centerX - centerWidth/2); // Left side
                    } else {
                        x = (centerX + centerWidth/2) + Math.random() * (width - (centerX + centerWidth/2)); // Right side
                    }
                } else {
                    x = Math.random() * width; // Anywhere
                }
                
                y = Math.random() * height;
                
                stars.push({
                    x,
                    y,
                    radius: Math.random() * 1.2,
                    alpha: Math.random(),
                    speed: Math.random() * 0.05
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0a0a0a'; // Dark stars on light background
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(10, 10, 10, ${star.alpha})`;
                ctx.fill();
                
                // Twinkle effect
                star.alpha += star.speed;
                if (star.alpha > 1 || star.alpha < 0) {
                    star.speed = -star.speed;
                }
            });
            
            animationFrameId = requestAnimationFrame(drawStars);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawStars();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const menuItems = [
        { label: 'Home', link: '#home' },
        { label: 'Experience', link: '#experience' },
        { label: 'Projects', link: '#projects' },
        { label: 'Journey', link: '#journey' },
        { label: 'Contact', link: '#contact' }
    ];

    return (
        <>
            <div 
                className="menu-overlay" 
                ref={overlayRef} 
                onClick={onClose}
                onTouchStart={(e) => { e.preventDefault(); onClose(); }}
            ></div>
            <div className="menu-container" ref={menuRef}>
                <canvas ref={canvasRef} className="starry-canvas"></canvas>
                
                <button 
                    ref={closeBtnRef}
                    className="menu-close-btn hover-this" 
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); onClose(); }}
                >
                    <div className="close-icon">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </button>

                <div className="menu-content">
                    <div className="menu-links">
                        {menuItems.map((item, index) => (
                            <div className="menu-link-wrapper" key={index}>
                                <a 
                                    href={item.link} 
                                    className={`menu-link hover-this ${activeSection === item.link ? 'active' : ''}`}
                                    onClick={onClose}
                                    ref={el => linksRef.current[index] = el}
                                >
                                    <span className="menu-original-text">{item.label}</span>
                                    <div className="menu-marquee">
                                        <span>{item.label} ✦ {item.label} ✦ {item.label} ✦ {item.label} ✦ </span>
                                        <span>{item.label} ✦ {item.label} ✦ {item.label} ✦ {item.label} ✦ </span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
