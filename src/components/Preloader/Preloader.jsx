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
    const canvasRef = useRef(null);

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
            planets.push({ radiusX: minDim * 0.28, radiusY: minDim * 0.28 * squashFactor, radius: 5.5, speed: 0.003, color: '#4F86F7', angle: Math.random() * Math.PI * 2, label: "we live in this" }); // Earth
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
                speed: Math.random() * 15 + 10,
                angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // Diagonal
                opacity: 1
            });
        };

        const draw = () => {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, width, height);
            
            const systemTilt = -15 * (Math.PI / 180); // 15 degree tilt
            const centerX = width / 2;
            const centerY = height / 2;

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
            if (Math.random() < 0.03) createShootingStar();

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
                        if (prevCount % 20 === 0) { // Adjusted for slower speed
                            setThought(techThoughts[Math.floor(Math.random() * techThoughts.length)]);
                        }
                        return prevCount + 1;
                    } else {
                        clearInterval(interval);
                        
                        // Exit animation using GSAP - Slower and smoother
                        gsap.to(".preloader", {
                            yPercent: -100,
                            duration: 1.8,
                            ease: "power3.inOut",
                            onComplete: () => {
                                setVisible(false);
                                // Re-enable scrolling
                                document.body.style.overflow = '';
                            }
                        });
                        
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

    if (!visible) return null;

    return (
        <div className="preloader">
            <canvas ref={canvasRef} className="preloader-canvas"></canvas>
            <div className="preloader-content">
                <div className="count-preload">{count}%</div>
                <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={{ width: `${count}%` }}></div>
                </div>
                <div className="thought-text">{thought}</div>
            </div>
        </div>
    );
};

export default Preloader;
