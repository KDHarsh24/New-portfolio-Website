import React, { useEffect, useState, useRef } from 'react';
import './Preloader.css';
import gsap from 'gsap';

const techThoughts = [
    "Initializing creative sequence...",
    "Loading high-res assets...",
    "Calibrating user experience...",
    "Optimizing neural pathways...",
    "Rendering digital dreams...",
    "Establishing secure connection...",
    "Polishing pixels...",
    "Compiling awesomeness..."
];

const Preloader = () => {
    const [count, setCount] = useState(0);
    const [thought, setThought] = useState(techThoughts[0]);
    const [visible, setVisible] = useState(true);
    const [showSmileCanvas, setShowSmileCanvas] = useState(false);
    const [smileSuccess, setSmileSuccess] = useState(false);
    const canvasRef = useRef(null);
    const smileCanvasRef = useRef(null);
    const isDrawing = useRef(false);
    const currentPath = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        let planets = [];
        let asteroids = [];
        let shootingStars = [];
        let animationFrameId;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
            initPlanets();
            initAsteroids();
        };

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((width * height) / 4000); // Density
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5,
                    alpha: Math.random(),
                    twinkleSpeed: Math.random() * 0.02 + 0.005
                });
            }
        };

        const initPlanets = () => {
            planets = [];
            const centerX = width / 2;
            const centerY = height / 2;
            const minDim = Math.min(width, height);
            const squashFactor = 0.4; // Makes orbits elliptical
            
            // Planets: radiusX, radiusY, radius, speed, color, angle
            planets.push({ radiusX: minDim * 0.12, radiusY: minDim * 0.12 * squashFactor, radius: 3, speed: 0.005, color: '#A5A5A5', angle: Math.random() * Math.PI * 2 }); // Mercury
            planets.push({ radiusX: minDim * 0.18, radiusY: minDim * 0.18 * squashFactor, radius: 5, speed: 0.004, color: '#E3BB76', angle: Math.random() * Math.PI * 2 }); // Venus
            planets.push({ radiusX: minDim * 0.28, radiusY: minDim * 0.28 * squashFactor, radius: 5.5, speed: 0.003, color: '#4F86F7', angle: Math.random() * Math.PI * 2, label: "I live here" }); // Earth
            planets.push({ radiusX: minDim * 0.38, radiusY: minDim * 0.38 * squashFactor, radius: 4, speed: 0.0024, color: '#FF5733', angle: Math.random() * Math.PI * 2 }); // Mars
            planets.push({ radiusX: minDim * 0.55, radiusY: minDim * 0.55 * squashFactor, radius: 10, speed: 0.0016, color: '#D9A066', angle: Math.random() * Math.PI * 2 }); // Jupiter
        };

        const initAsteroids = () => {
            asteroids = [];
            const minDim = Math.min(width, height);
            const squashFactor = 0.4;
            const numAsteroids = 300;

            for (let i = 0; i < numAsteroids; i++) {
                // Band between Mars (0.38) and Jupiter (0.55)
                const distBase = 0.42 + Math.random() * 0.08; 
                const radiusX = minDim * distBase;
                const radiusY = radiusX * squashFactor;
                
                asteroids.push({
                    radiusX,
                    radiusY,
                    radius: Math.random() * 1.2 + 0.3,
                    speed: 0.002 + (Math.random() * 0.001 - 0.0005),
                    angle: Math.random() * Math.PI * 2,
                    color: `rgba(160, 160, 160, ${Math.random() * 0.5 + 0.3})`
                });
            }
        };

        const createShootingStar = () => {
             shootingStars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.5,
                length: Math.random() * 80 + 20,
                speed: Math.random() * 2 + 10,
                angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // Diagonal
                opacity: 0.8
            });
        };

        const draw = () => {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, width, height);
            
            const systemTilt = -15 * (Math.PI / 180); // 15 degree tilt
            const centerX = width / 2;
            // Move the solar system slightly up from the exact center for better visual balance
            const centerY = height * 0.38;

            // Draw Stars
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
                
                star.alpha += star.twinkleSpeed;
                if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed *= -1;
            });

            // Helper to calculate planet position with tilt
            const getPlanetPos = (planet) => {
                const cosA = Math.cos(planet.angle);
                const sinA = Math.sin(planet.angle);
                const cosT = Math.cos(systemTilt);
                const sinT = Math.sin(systemTilt);
                
                // Unrotated relative coords
                const ux = cosA * planet.radiusX;
                const uy = sinA * planet.radiusY;
                
                // Rotated coords
                const x = centerX + ux * cosT - uy * sinT;
                const y = centerY + ux * sinT + uy * cosT;
                
                return { x, y };
            };

            // Draw Orbits (Background)
            planets.forEach(planet => {
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, planet.radiusX, planet.radiusY, systemTilt, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Draw Back Planets (behind Sun)
            planets.filter(p => Math.sin(p.angle) < 0).forEach(planet => {
                planet.angle += planet.speed;
                const { x, y } = getPlanetPos(planet);
                
                ctx.beginPath();
                ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
                ctx.fillStyle = planet.color;
                ctx.fill();
            });

            // Draw Back Asteroids
            asteroids.filter(a => Math.sin(a.angle) < 0).forEach(asteroid => {
                asteroid.angle += asteroid.speed;
                const { x, y } = getPlanetPos(asteroid);
                ctx.beginPath();
                ctx.arc(x, y, asteroid.radius, 0, Math.PI * 2);
                ctx.fillStyle = asteroid.color;
                ctx.fill();
            });
            
            // Draw Sun
            ctx.beginPath();
            ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#FFD700';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw Front Asteroids
            asteroids.filter(a => Math.sin(a.angle) >= 0).forEach(asteroid => {
                asteroid.angle += asteroid.speed;
                const { x, y } = getPlanetPos(asteroid);
                ctx.beginPath();
                ctx.arc(x, y, asteroid.radius, 0, Math.PI * 2);
                ctx.fillStyle = asteroid.color;
                ctx.fill();
            });

            // Draw Front Planets (in front of Sun)
            planets.filter(p => Math.sin(p.angle) >= 0).forEach(planet => {
                planet.angle += planet.speed;
                const { x, y } = getPlanetPos(planet);

                // Planet
                ctx.beginPath();
                ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
                ctx.fillStyle = planet.color;
                ctx.fill();
            });

            // Draw Labels (Always on top)
            planets.forEach(planet => {
                if (planet.label) {
                    const { x, y } = getPlanetPos(planet);
                    const padding = 8;
                    const fontSize = 12;
                    ctx.font = `500 ${fontSize}px "Neue Montreal", sans-serif`;
                    const textMetrics = ctx.measureText(planet.label);
                    const boxWidth = textMetrics.width + padding * 2;
                    const boxHeight = fontSize + padding * 2;
                    
                    // Pixel snap coordinates for sharpness
                    const boxX = Math.round(x + 20);
                    const boxY = Math.round(y - boxHeight / 2);

                    // Glass background
                    ctx.save();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.lineWidth = 1;
                    
                    // Draw rounded rect manually
                    ctx.beginPath();
                    ctx.moveTo(boxX + 4, boxY);
                    ctx.lineTo(boxX + boxWidth - 4, boxY);
                    ctx.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + 4);
                    ctx.lineTo(boxX + boxWidth, boxY + boxHeight - 4);
                    ctx.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - 4, boxY + boxHeight);
                    ctx.lineTo(boxX + 4, boxY + boxHeight);
                    ctx.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - 4);
                    ctx.lineTo(boxX, boxY + 4);
                    ctx.quadraticCurveTo(boxX, boxY, boxX + 4, boxY);
                    ctx.closePath();
                    
                    ctx.fill();
                    ctx.stroke();

                    // Text
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(planet.label, boxX + padding, boxY + boxHeight/2 + fontSize/3);
                    
                    // Connecting line
                    ctx.beginPath();
                    ctx.moveTo(x + planet.radius + 2, y);
                    ctx.lineTo(boxX, y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                    ctx.stroke();
                    ctx.restore();
                }
            });

            // Shooting Stars
            if (Math.random() < 0.01) createShootingStar();

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                
                const endX = s.x + Math.cos(s.angle) * s.length;
                const endY = s.y + Math.sin(s.angle) * s.length;

                const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();

                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.02;

                if (s.opacity <= 0 || s.x > width || s.y > height) {
                    shootingStars.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        // Disable scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            startLoading();
        } else {
            window.addEventListener('load', startLoading);
        }

        function startLoading() {
            const interval = setInterval(() => {
                setCount((prevCount) => {
                    if (prevCount < 100) {
                        // Change thought randomly every ~25% for longer visibility
                        if (prevCount % 30 === 0) { // Adjusted for slower speed
                            setThought(techThoughts[Math.floor(Math.random() * techThoughts.length)]);
                        }
                        return prevCount + 1;
                    } else {
                        clearInterval(interval);
                        
                        // Check if user has already ticked before
                        const hasTicked = localStorage.getItem('preloaderTicked');
                        
                        if (hasTicked) {
                            // Skip drawing and exit immediately
                            gsap.to(".preloader", {
                                yPercent: -100,
                                borderBottomLeftRadius: "50vw",
                                borderBottomRightRadius: "50vw",
                                duration: 1.5,
                                ease: "power3.inOut",
                                onComplete: () => {
                                    setVisible(false);
                                    document.body.style.overflow = '';
                                }
                            });
                        } else {
                            setShowSmileCanvas(true);
                        }
                        return 100;
                    }
                });
            }, 70); // Slower speed (70ms * 100 = 7 seconds)
            
            return () => clearInterval(interval);
        }

        return () => {
            window.removeEventListener('load', startLoading);
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (!showSmileCanvas) return;
        const canvas = smileCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        const resizeSmileCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 8;
            ctx.strokeStyle = '#ffffff'; // White ink
        };
        
        resizeSmileCanvas();
        window.addEventListener('resize', resizeSmileCanvas);

        const startDrawing = (e) => {
            e.preventDefault(); // Prevent scrolling/default touch actions
            isDrawing.current = true;
            currentPath.current = [];
            ctx.beginPath();
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            ctx.moveTo(clientX, clientY);
            currentPath.current.push({ x: clientX, y: clientY });
        };

        const draw = (e) => {
            e.preventDefault();
            if (!isDrawing.current) return;
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            ctx.lineTo(clientX, clientY);
            ctx.stroke();
            currentPath.current.push({ x: clientX, y: clientY });
        };

        const stopDrawing = () => {
            if (!isDrawing.current) return;
            isDrawing.current = false;
            ctx.closePath();
            checkTick();
        };

        const checkTick = () => {
            const path = currentPath.current;
            if (path.length < 10) return;

            // Find min/max Y and their indices
            let minY = Infinity;
            let maxY = -Infinity;
            let maxYIndex = -1;

            path.forEach((p, index) => {
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) {
                    maxY = p.y;
                    maxYIndex = index;
                }
            });

            const start = path[0];
            const end = path[path.length - 1];
            const lowestPoint = path[maxYIndex];

            // Heuristics for a Tick (Checkmark)
            // 1. It goes down then up (Lowest point is somewhere in the middle)
            // 2. Start is to the left of lowest point
            // 3. End is to the right of lowest point
            // 4. End is higher (smaller Y) than lowest point
            
            const isDownThenUp = lowestPoint.y > start.y && lowestPoint.y > end.y;
            const isLeftToRight = start.x < lowestPoint.x && end.x > lowestPoint.x;
            
            // Relaxed check: Just check if we have a significant "V" or "U" shape
            // Or even simpler: just check if we drew something significant
            const width = Math.max(...path.map(p => p.x)) - Math.min(...path.map(p => p.x));
            const height = maxY - minY;

            if (width > 30 && height > 30 && isDownThenUp) {
                setSmileSuccess(true);
                localStorage.setItem('preloaderTicked', 'true');
                
                // Exit animation using GSAP
                gsap.to(".preloader", {
                    yPercent: -100,
                    borderBottomLeftRadius: "50vw", // Round bottom corners
                    borderBottomRightRadius: "50vw",
                    duration: 1.5,
                    ease: "power3.inOut",
                    delay: 0.2,
                    onComplete: () => {
                        setVisible(false);
                        document.body.style.overflow = '';
                    }
                });
            }
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        return () => {
            window.removeEventListener('resize', resizeSmileCanvas);
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', stopDrawing);
        };
    }, [showSmileCanvas]);

    if (!visible) return null;

    return (
        <div className="preloader">
            <canvas ref={canvasRef} className="preloader-canvas"></canvas>
            {showSmileCanvas && (
                <canvas 
                    ref={smileCanvasRef} 
                    className="smile-canvas"
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        zIndex: 10, 
                        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'></path></svg>") 0 24, auto`,
                        opacity: smileSuccess ? 0 : 1,
                        transition: 'opacity 0.5s ease'
                    }}
                ></canvas>
            )}
            <div className={`preloader-content ${showSmileCanvas ? 'fade-out' : ''}`}>
                <div className="count-preload">{count}%</div>
                <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={{ width: `${count}%` }}></div>
                </div>
                <div className="thought-text">{thought}</div>
            </div>
            
            {showSmileCanvas && !smileSuccess && (
                <div className="smile-instruction">
                    Draw a tick to continue
                </div>
            )}
        </div>
    );
};

export default Preloader;
