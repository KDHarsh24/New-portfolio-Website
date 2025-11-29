import React, { useEffect, useRef } from 'react';

const ContactBlackhole = () => {
    const blackholeCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = blackholeCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = 60;
            canvas.height = 60;
        };

        const particles = [];
        const initParticles = () => {
            particles.length = 0;
            for(let i=0; i<40; i++){
                particles.push({
                    angle: Math.random() * Math.PI * 2,
                    radius: 12 + Math.random() * 15,
                    speed: 0.05 + Math.random() * 0.1,
                    size: Math.random() * 1.5,
                    color: `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`
                })
            }
        };

        const drawBlackhole = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

            // Accretion Disk
            particles.forEach(p => {
                p.angle += p.speed;
                // Elliptical orbit
                const x = centerX + Math.cos(p.angle) * p.radius;
                const y = centerY + Math.sin(p.angle) * (p.radius * 0.4); 
                
                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                // Black particles in dark mode
                ctx.fillStyle = isDark 
                    ? p.color.replace('255, 255, 255', '0, 0, 0') 
                    : p.color;
                ctx.fill();
            });

            // Event Horizon (Black Circle)
            ctx.beginPath();
            ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
            // In dark mode (light bg), make the hole black but maybe with a white rim? 
            // Or just keep it black as requested "blackhole in black colour"
            ctx.fillStyle = '#000'; 
            ctx.fill();
            
            // Optional: Add a rim to distinguish it if needed, but user asked for black
            if (isDark) {
                ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };

        const animate = () => {
            drawBlackhole();
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        initParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={blackholeCanvasRef} className="contact-blackhole" />;
};


export default ContactBlackhole;