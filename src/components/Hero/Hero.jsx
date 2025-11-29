import React, { useEffect, useRef } from 'react';
import './Hero.css';
import gsap from 'gsap';
import { setCursorBubble } from '../Cursor/CursorAnim';
import meImg from '../../assets/me.png';

const Hero = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const blobRef = useRef(null);
    const blobPathRef = useRef(null);
    const photoRef = useRef(null);
    const blobWrapperRef = useRef(null);

    // --- Canvas Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const c = canvas.getContext('2d');
        let animationFrameId;
        let width, height;
        let stars = [];

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((width * height) / 1500);
            const starZoneWidth = width * 0.94; // Match navbar width (94%)
            const xOffset = (width - starZoneWidth) / 2 + 3;

            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: xOffset + Math.random() * starZoneWidth,
                    y: Math.random() * height,
                    radius: Math.random() * 2,
                    alpha: Math.random() * 0.4 + 0.2
                });
            }
        };
        
        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const animateCanvas = () => {
            c.clearRect(0, 0, width, height);
            stars.forEach(star => {
                c.beginPath();
                c.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                c.fillStyle = `rgba(0, 0, 0, ${star.alpha})`; 
                c.fill();
            });
            animationFrameId = requestAnimationFrame(animateCanvas);
        };
        animateCanvas();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // --- Text Animations ---
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".hero-title span", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.5
            });

            gsap.from(".hero-subtitle", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 1
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // --- Blob & Photo Logic ---
    useEffect(() => {
        // Pop animation for photo
        gsap.fromTo(photoRef.current, 
            { scale: 0, rotation: -15 },
            {
                scale: 1,
                rotation: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)",
                delay: 0.8
            }
        );

        // Dynamic Blob
        const points = [];
        const numPoints = 16;
        const radius = 150;
        const centerX = 250;
        const centerY = 250;
        let mousePos = { x: 0, y: 0 };

        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            points.push({
                x, y,
                originX: x, originY: y,
                angle,
                noiseOffsetX: Math.random() * 1000,
                noiseOffsetY: Math.random() * 1000
            });
        }

        const updateBlob = () => {
            const time = Date.now() * 0.001;
            
            points.forEach(p => {
                const noiseX = Math.sin(p.noiseOffsetX + time) * 15;
                const noiseY = Math.cos(p.noiseOffsetY + time) * 15;
                
                let dx = p.originX - mousePos.x;
                let dy = p.originY - mousePos.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                const hoverRadius = 150;
                const force = Math.max(0, 1 - dist / hoverRadius);
                
                const pushX = (dx / dist) * force * 80; 
                const pushY = (dy / dist) * force * 80;

                const targetX = p.originX + noiseX + (isNaN(pushX) ? 0 : pushX);
                const targetY = p.originY + noiseY + (isNaN(pushY) ? 0 : pushY);
                
                p.x += (targetX - p.x) * 0.1;
                p.y += (targetY - p.y) * 0.1;
            });

            if (blobPathRef.current) {
                blobPathRef.current.setAttribute('d', spline(points));
            }
            
            requestAnimationFrame(updateBlob);
        };
        
        const spline = (pts) => {
            if (pts.length === 0) return "";
            let d = `M ${pts[0].x} ${pts[0].y}`;
            for (let i = 0; i < pts.length; i++) {
                const p0 = pts[(i - 1 + pts.length) % pts.length];
                const p1 = pts[i];
                const p2 = pts[(i + 1) % pts.length];
                const p3 = pts[(i + 2) % pts.length];
                const cp1x = p1.x + (p2.x - p0.x) / 6;
                const cp1y = p1.y + (p2.y - p0.y) / 6;
                const cp2x = p2.x - (p3.x - p1.x) / 6;
                const cp2y = p2.y - (p3.y - p1.y) / 6;
                d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
            }
            return d;
        };

        updateBlob();

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            if (blobWrapperRef.current) {
                const rect = blobWrapperRef.current.getBoundingClientRect();
                const scaleX = 500 / rect.width;
                const scaleY = 500 / rect.height;
                mousePos.x = (clientX - rect.left) * scaleX;
                mousePos.y = (clientY - rect.top) * scaleY;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleTextHover = (e) => {
        setCursorBubble(true);
        gsap.to(e.target, {
            color: "transparent",
            webkitTextStroke: "1px #ff4c00",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleTextLeave = (e) => {
        setCursorBubble(false);
        const isHighlight = e.target.classList.contains('highlight');
        gsap.to(e.target, {
            color: isHighlight ? "#ff4c00" : "#222",
            webkitTextStroke: "0px transparent",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handlePhotoEnter = () => {
        gsap.to(blobRef.current, { scale: 0.95, opacity: 1, duration: 0.5 });
    };

    const handlePhotoLeave = () => {
        gsap.to(blobRef.current, { scale: 1, opacity: 1, duration: 0.5 });
    };

    return (
        <section className="new-hero" ref={containerRef} id="home">
            <canvas className="hero-canvas" ref={canvasRef}></canvas>
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span onMouseEnter={handleTextHover} onMouseLeave={handleTextLeave}>Hi,</span> 
                        <span onMouseEnter={handleTextHover} onMouseLeave={handleTextLeave}>I'm</span> 
                        <span className="highlight" onMouseEnter={handleTextHover} onMouseLeave={handleTextLeave}>Harsh</span>
                    </h1>
                    <p className="hero-subtitle">
                        Software Developer & Creative Coder
                    </p>
                    <p className="hero-desc">
                        Building digital experiences with a touch of magic.
                    </p>
                </div>

                <div className="hero-visual">
                    <div className="blob-wrapper" ref={blobWrapperRef}>
                        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="blob-svg" ref={blobRef}>
                            <path ref={blobPathRef} fill="#ff4c00" />
                        </svg>
                        <div 
                            className="hero-photo" 
                            ref={photoRef}
                            onMouseEnter={handlePhotoEnter}
                            onMouseLeave={handlePhotoLeave}
                        >
                            <img src={meImg} alt="Harsh" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
