import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const JourneyText = ({ activeId, memories }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.to(textRef.current.children, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(textRef.current.children, { y: 20 });
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
        <div className="journey-col-text">
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
    );
};

export default JourneyText;