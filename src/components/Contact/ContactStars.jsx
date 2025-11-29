import React, { useEffect, useRef } from 'react';

const ContactStars = () => {
    const starCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = starCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const stars = [];
        const initStars = () => {
            stars.length = 0;
            const numStars = Math.floor((canvas.width * canvas.height) / 1000);
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    alpha: Math.random(),
                    twinkleSpeed: Math.random() * 0.02 + 0.005
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
                
                star.alpha += star.twinkleSpeed;
                if (star.alpha > 1 || star.alpha < 0.2) {
                    star.twinkleSpeed *= -1;
                }
            });
            
            animationFrameId = requestAnimationFrame(drawStars);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        initStars();
        drawStars();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={starCanvasRef} className="btn-star-canvas"></canvas>;
};

export default ContactStars;