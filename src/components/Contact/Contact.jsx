import React, { useEffect, useRef } from 'react';
import './Contact.css';
import { initContactAnimations } from './ContactAnim';
import { addHoverEffect, removeHoverEffect } from '../Cursor/CursorAnim';

const Contact = () => {
    const starCanvasRef = useRef(null);
    const blackholeCanvasRef = useRef(null);
    const submitBtnRef = useRef(null);

    useEffect(() => {
        initContactAnimations();
        
        const btn = submitBtnRef.current;
        if (btn) {
            addHoverEffect(btn);
        }

        // Submit button blast handler
        const handleBlast = (ev) => {
            // Prevent actual form submit; show effect and message instead
            ev.preventDefault();
            const button = submitBtnRef.current;
            if (!button) return;
            if (button.classList.contains('sent') || button.classList.contains('blast')) return;
            button.classList.add('blast');
            button.disabled = true;

            // After animation, show confirmation text
            setTimeout(() => {
                const span = button.querySelector('.btn-content span');
                if (span) span.textContent = 'Teleported';
                button.classList.remove('blast');
                button.classList.add('sent');
            }, 1200); // matches CSS animation duration
        };

        if (btn) btn.addEventListener('click', handleBlast);

        return () => {
            if (btn) {
                removeHoverEffect(btn);
                btn.removeEventListener('click', handleBlast);
            }
        };
    }, []);

    // Star Background Effect
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
            const numStars = Math.floor((canvas.width * canvas.height) / 1000); // Higher density for small button
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
                
                // Twinkle effect from Preloader
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

    // Blackhole Effect
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

            // Accretion Disk
            particles.forEach(p => {
                p.angle += p.speed;
                // Elliptical orbit
                const x = centerX + Math.cos(p.angle) * p.radius;
                const y = centerY + Math.sin(p.angle) * (p.radius * 0.4); 
                
                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            // Event Horizon (Black Circle)
            ctx.beginPath();
            ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#000';
            ctx.fill();
            
            // Photon Ring (White Glow)
            ctx.beginPath();
            ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 1;
            ctx.stroke();

            animationFrameId = requestAnimationFrame(drawBlackhole);
        };

        resizeCanvas();
        initParticles();
        drawBlackhole();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section className="contact-web" id="contact">
            <div className="contact-marquee">
                <span>
                    Contact Me / Contact Me / Contact Me / Contact Me / Contact Me / Contact Me / Contact Me / 
                </span>
            </div>
            <div className="contact-section">
                <div className="contact-details col">
                    <div className="social-media items">
                        <h3>Handles</h3>
                        <span>
                            <a href="https://github.com/KDHarsh24" target="_blank" rel="noreferrer" className="social-link hover-this small">
                                <ion-icon name="logo-github"></ion-icon> GitHub
                            </a> 
                            <a href="https://www.linkedin.com/in/kdharsh24" target="_blank" rel="noreferrer" className="social-link hover-this small">
                                <ion-icon name="logo-linkedin"></ion-icon> Linkedin
                            </a>
                        </span>
                    </div>
                    <div className="contact-info">
                        <div className="email item">
                            <h3>Get in touch</h3>
                            <a href="mailto:harshkumardas24@gmail.com" className="social-link hover-this small">harshkumardas24@gmail.com</a>
                        </div> 
                        <div className="address item">
                            <h3>Location</h3>
                            Kolkata-INDIA
                        </div>                   
                    </div>
                    <div className="map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29434.727430265862!2d88.34856616798045!3d22.752708731374927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89aefcc6fe3a7%3A0x6a6d434ac504dbc5!2sBarrackpore%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1718899336347!5m2!1sen!2sin" 
                            style={{border:0}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade" 
                            className="mapPart"
                            title="map"
                        ></iframe>
                    </div>
                </div>
                <div className="contact-form col">
                    <h4 className="mail-notification">Send a Message</h4>
                    <form className="contact-wrapper" id="myform" action="https://formsubmit.co/kdharsh24@gmail.com" method="POST">
                        <div className="contact-row">
                            <input type="text" placeholder="Name" name="name" className="hover-this" id="name"/>
                        </div>
                        <div className="contact-row">
                            <input type="email" placeholder="Email" name="email" className="hover-this" id="email"/>
                        </div>
                        <div className="contact-row">
                            <textarea name="message" 
                            id="message"
                            rows="4" placeholder="Message" className="hover-this"></textarea>
                        </div>
                        <div className="submit contact-row">
                            <button type="submit" className="hover-this" ref={submitBtnRef}>
                                <canvas ref={starCanvasRef} className="btn-star-canvas"></canvas>
                                <div className="btn-content">
                                    <span>Submit</span>
                                    <canvas ref={blackholeCanvasRef} className="blackhole-canvas"></canvas>
                                </div>
                                <div className="blast-overlay" aria-hidden="true"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
