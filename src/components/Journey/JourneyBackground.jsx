import React, { useEffect, useRef } from 'react';

const JourneyBackground = () => {
    const bgCanvasRef = useRef(null);

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
            const numStars = width < 768 ? 300 : 800;
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
                ctx.fillStyle = `rgba(44, 44, 44, ${star.alpha})`;
                ctx.fill();
                
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

    return <canvas ref={bgCanvasRef} className="star-background-canvas" />;
};

export default JourneyBackground;