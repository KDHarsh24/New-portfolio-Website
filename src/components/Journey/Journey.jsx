import React, { useEffect, useState } from 'react';
import './Journey.css';
import { memories } from './JourneyData';
import JourneyBackground from './JourneyBackground';
import JourneyText from './JourneyText';
import JourneyParticles from './JourneyParticles';
import JourneyPostcards from './JourneyPostcards';

const Journey = () => {
    const [activeId, setActiveId] = useState(0);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 1024);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    return (
        <section className="journey-split-section" id="journey">
            <div className="journey-header-container">
                <h2 className="journey-heading">Journey</h2>
                <p className="journey-subheading">A timeline of my professional evolution.</p>
            </div>
            <JourneyBackground />
            <div className="ancient-box">
                <div className="journey-left-wrapper">
                    <JourneyText activeId={activeId} memories={memories} />
                    <JourneyParticles activeId={activeId} memories={memories} isTouch={isTouch} />
                </div>
                <JourneyPostcards activeId={activeId} setActiveId={setActiveId} memories={memories} />
            </div>
        </section>
    );
};

export default Journey;
