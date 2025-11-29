import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import gsap from 'gsap';
import { updateParticleTargets } from './particleShapes';

const memories = [
    // { 
    //     id: 0, 
    //     year: "2024", 
    //     puzzle: "The Silicon Jungle", 
    //     significance: "Turning coffee into code. A world where I speak the language of machines.", 
    //     img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1920&auto=format&fit=crop", 
    //     shapeType: "tech",
    //     rotation: "5deg",
    //     top: "2%",
    //     left: "5%"
    // },
    { 
        id: 0, 
        year: "2022", 
        puzzle: "The Land of Jewels", 
        significance: "Friendship forged in mist. Freedom found in the hills.", 
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop", 
        shapeType: "valley",
        rotation: "-6deg",
        top: "5%",
        left: "0%"
    },
    { 
        id: 2, 
        year: "2019", 
        puzzle: "The Pink City", 
        significance: "The weight of books and the grit of discipline. Where dreams were tested.", 
        img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1920&auto=format&fit=crop", 
        shapeType: "study",
        rotation: "7deg",
        top: "45%",
        left: "7%"
    },
    { 
        id: 3, 
        year: "2016", 
        puzzle: "The Evergreen Coast", 
        significance: "Waves that taught me to feel. A horizon of endless love.", 
        img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1920&auto=format&fit=crop", 
        shapeType: "beach",
        rotation: "-5deg",
        top: "50%",
        left: "50%"
    },
    { 
        id: 4, 
        year: "2012", 
        puzzle: "The Golden Beginning", 
        significance: "Roots deep in faith. The playful innocence of where it all started.", 
        img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1920&auto=format&fit=crop", 
        shapeType: "play",
        rotation: "2deg",
        top: "5%",
        left: "45%"
    }
];

const Hero = () => {
    const [activeId, setActiveId] = useState(0);
    const [isTouch, setIsTouch] = useState(false);
    const canvasRef = useRef(null);
    const bgCanvasRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 1024);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    // Global Cursor Interaction
    const handleCursorGrow = () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.classList.add('grow');
    };

    const handleCursorShrink = () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.classList.remove('grow');
    };

    const handleCursorPlus = () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.classList.add('plus');
    };

    const handleCursorRemovePlus = () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.classList.remove('plus');
    };

    const handlePostcardMove = (e, index) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        // Preserve the card's base Z rotation (e.g. "-3deg") while applying 3D tilt
        const baseRotate = (memories[index] && memories[index].rotation) ? memories[index].rotation : '0deg';

        gsap.to(card, {
            transformPerspective: 1000,
            rotation: baseRotate,
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.1,
            duration: 0.1,
            ease: "power1.out",
            overwrite: "auto"
        });
    };

    const handlePostcardLeave = (e, mem) => {
        handleCursorShrink();
        gsap.to(e.currentTarget, {
            rotation: mem.rotation,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
        });
    };

    // Background Stars Effect
    useEffect(() => {
        const canvas = bgCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        let animationFrameId;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const numStars = width < 768 ? 300 : 800; // Responsive star count
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.2,
                    alpha: Math.random(),
                    speed: Math.random() * 0.05
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, width, height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(44, 44, 44, ${star.alpha})`; // Dark stars matching theme
                ctx.fill();
                
                // Twinkle effect
                star.alpha += star.speed;
                if (star.alpha > 1 || star.alpha < 0) {
                    star.speed = -star.speed;
                }
            });
            animationFrameId = requestAnimationFrame(drawStars);
        };

        window.addEventListener('resize', resize);
        resize();
        drawStars();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Canvas Shape Morphing Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationFrameId;
        const particleCount = 1200; 
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            const parent = canvas.parentElement;
            width = parent.offsetWidth;
            height = parent.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for(let i=0; i<particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    tx: Math.random() * width, 
                    ty: Math.random() * height, 
                    vx: 0,
                    vy: 0,
                    color: `hsl(${30 + Math.random() * 20}, 40%, ${20 + Math.random() * 20}%)`, // Brown/Sepia tones
                    size: Math.random() * 1.5 + 0.5
                });
            }
            updateTargets();
        };

        const updateTargets = () => {
            const shapeType = memories[activeId].shapeType;
            updateParticleTargets(shapeType, width, height, particles);
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                // Mouse Interaction
                const dxMouse = mouse.x - p.x;
                const dyMouse = mouse.y - p.y;
                const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
                if (distMouse < 100) {
                    const force = (100 - distMouse) / 100;
                    p.vx -= (dxMouse / distMouse) * force * 2;
                    p.vy -= (dyMouse / distMouse) * force * 2;
                }

                // Ease - Smoother transition
                const dx = p.tx - p.x;
                const dy = p.ty - p.y;
                p.vx += dx * 0.003; // Reduced force for smoother movement
                p.vy += dy * 0.003;
                p.vx *= 0.92; // Increased friction for less jitter
                p.vy *= 0.92;
                p.x += p.vx;
                p.y += p.vy;

                ctx.fillStyle = p.color; 
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Connect
            ctx.strokeStyle = 'rgba(93, 64, 55, 0.1)';
            ctx.lineWidth = 0.5;
            for(let i=0; i<particles.length; i+=8) { // Optimized connection count
                const p1 = particles[i];
                for(let j=i+1; j<particles.length; j+=15) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    if (dx*dx + dy*dy < 1600) { 
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [activeId]);

    // Update targets when activeId changes
    useEffect(() => {
        if (textRef.current) {
            // Animate text out
            gsap.to(textRef.current.children, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    // Reset position for incoming animation
                    gsap.set(textRef.current.children, { y: 20 });
                    // Animate text in
                    gsap.to(textRef.current.children, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out"
                    });
                }
            });
        }
    }, [activeId]);

    return (
        <section className="hero-split-section" id="home">
            <canvas ref={bgCanvasRef} className="star-background-canvas" />
            <div className="ancient-box">
                <div className="hero-left-wrapper">
                    {/* Top Left: Text Story */}
                    <div className="hero-col-text">
                        <div className="text-card-bg" style={{ backgroundImage: `url(${memories[activeId].img})` }}></div>
                        <div className="text-card-overlay">
                            <div className="text-content" ref={textRef}>
                                <span className="chapter-year">{memories[activeId].year}</span>
                                <h1 className="chapter-title">{memories[activeId].puzzle}</h1>
                                <div className="separator-line"></div>
                                <p className="chapter-desc">{memories[activeId].significance}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Left: Interactive Canvas */}
                    <div className="hero-col-visual">
                        <div className="visual-header">
                            <span>Interactive Memory</span>
                            <div className="visual-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                        <canvas ref={canvasRef} className="interactive-canvas"></canvas>
                        <div className="visual-footer">
                            <span>{isTouch ? "Touch to interact" : "Move cursor to interact"}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Scattered Postcards */}
                <div className="hero-col-nav">
                    <div className="postcards-container">
                        {memories.map((mem, index) => (
                            <div 
                                key={mem.id}
                                className={`scattered-postcard ${activeId === index ? 'active' : ''}`}
                                style={{ 
                                    top: mem.top, 
                                    left: mem.left, 
                                    transform: `rotate(${mem.rotation})` 
                                }}
                                onClick={() => setActiveId(index)}
                                onMouseEnter={handleCursorGrow}
                                onMouseMove={(e) => handlePostcardMove(e, index)}
                                onMouseLeave={(e) => handlePostcardLeave(e, mem)}
                            >
                                <div className="postcard-face">
                                    <img src={mem.img} alt={mem.year} />
                                    <div className="postcard-mark">
                                        <span>{mem.year}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
