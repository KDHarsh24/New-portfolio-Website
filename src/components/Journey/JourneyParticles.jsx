import React, { useEffect, useRef } from 'react';
import { updateParticleTargets } from './particleShapes';

const JourneyParticles = ({ activeId, memories, isTouch }) => {
    const canvasRef = useRef(null);

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
                    color: `hsl(${30 + Math.random() * 20}, 40%, ${20 + Math.random() * 20}%)`,
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
                const dxMouse = mouse.x - p.x;
                const dyMouse = mouse.y - p.y;
                const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
                if (distMouse < 100) {
                    const force = (100 - distMouse) / 100;
                    p.vx -= (dxMouse / distMouse) * force * 2;
                    p.vy -= (dyMouse / distMouse) * force * 2;
                }

                const dx = p.tx - p.x;
                const dy = p.ty - p.y;
                p.vx += dx * 0.003;
                p.vy += dy * 0.003;
                p.vx *= 0.92;
                p.vy *= 0.92;
                p.x += p.vx;
                p.y += p.vy;

                ctx.fillStyle = p.color; 
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.strokeStyle = 'rgba(93, 64, 55, 0.1)';
            ctx.lineWidth = 0.5;
            for(let i=0; i<particles.length; i+=8) {
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
    }, [activeId, memories]);

    return (
        <div className="journey-col-visual">
            {/* <div className="visual-header">
                <span>Interactive Memory</span>
                <div className="visual-dots">
                    <span></span><span></span><span></span>
                </div>
            </div> */}
            <canvas ref={canvasRef} className="interactive-canvas"></canvas>
            <div className="visual-footer">
                <span>{isTouch ? "Touch to interact" : "Move cursor to interact"}</span>
            </div>
        </div>
    );
};

export default JourneyParticles;