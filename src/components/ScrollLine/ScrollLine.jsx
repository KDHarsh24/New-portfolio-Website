import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollLine.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollLine = () => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const path1Ref = useRef(null);
    const path2Ref = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        const path1 = path1Ref.current;
        const path2 = path2Ref.current;
        
        let resizeObserver;

        const drawPath = () => {
            const width = window.innerWidth;
            const height = document.documentElement.scrollHeight; // Full document height

            // Update SVG dimensions
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);
            svg.style.height = `${height}px`;

            // Path parameters
            const amplitude = width * 0.3; // Swing width
            const frequency = 0.002; // How fast it waves
            const center = width * 0.5;

            // Start from center so the line originates in the middle of the page
            const startX = center;

            let d1 = `M ${startX} 0`;
            let d2 = `M ${startX + 10} 0`; // Offset by 10px

            // Generate points
            const steps = Math.ceil(height / 50); // Resolution
            
            for (let i = 0; i <= steps; i++) {
                const y = (i / steps) * height;
                
                // Calculate X based on Sine wave
                // We want it to wander across the screen
                // Let's combine two sines for more "swirl"
                const xOffset = Math.sin(y * frequency) * amplitude + Math.sin(y * frequency * 0.5) * (amplitude * 0.5);
                
                const x = center + xOffset;
                
                // Simple line to point
                d1 += ` L ${x} ${y}`;
                d2 += ` L ${x + 10} ${y}`;
            }

            path1.setAttribute('d', d1);
            path2.setAttribute('d', d2);

            // Setup ScrollTrigger animation
            const length1 = path1.getTotalLength();
            const length2 = path2.getTotalLength();

            // Calculate initial draw length to ensure line is visible at the bottom of the viewport
            // We want the line to "lead" the scroll, so it appears to be drawing ahead of the user
            const viewportHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            
            // Calculate ratio of viewport to total height
            // We want the tip of the line to start at the middle of the screen (0.5 viewport)
            // and stay roughly in the middle as we scroll.
            const initialDrawRatio = (viewportHeight * 0.5) / docHeight;
            const initialOffset = length1 * initialDrawRatio;

            // Reset styles
            // Start with the line partially drawn
            gsap.set([path1, path2], {
                strokeDasharray: length1,
                strokeDashoffset: length1 - initialOffset,
                opacity: 1
            });

            // Animate
            gsap.to([path1, path2], {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5, // Tighter scrub to keep it in the middle without lagging too far behind
                }
            });
        };

        // Initial draw
        drawPath();

        // Handle resize
        resizeObserver = new ResizeObserver(() => {
            drawPath();
            ScrollTrigger.refresh();
        });
        
        resizeObserver.observe(document.body);

        return () => {
            resizeObserver.disconnect();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="scroll-line-container">
            <svg ref={svgRef} className="scroll-line-svg">
                {/* Outer glow/blur path */}
                <path ref={path1Ref} className="scroll-line-path-cyan" />
                <path ref={path2Ref} className="scroll-line-path-orange" style={{ opacity: 0.7 }} />
            </svg>
        </div>
    );
};

export default ScrollLine;
