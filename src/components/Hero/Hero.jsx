import React, { useEffect } from 'react';
import CircleType from 'circletype';
import './Hero.css';
import { initHeroAnimations } from './HeroAnim';

const Hero = () => {
    useEffect(() => {
        // Initialize CircleType
        const rotated = document.getElementById("rotated");
        if (rotated) {
            new CircleType(rotated).radius(40);
        }

        // Initialize Animations
        const cleanup = initHeroAnimations();
        return cleanup;
    }, []);

    return (
        <section className="website-content" id="home">
            {/* Circular text with logo */}
            {/* <div className="logo-box">
                <div className="circular-text">
                    <span id="rotated">
                        Harsh   Kumar  Das   Harsh   Kumar   Das   Harsh   Kumar   Das
                    </span>
                </div>
                <img src="/assets/img/Logo.png" alt="" className="img-logo" />
            </div> */}

            {/* Body of the Landing Page */}
            <div className="site-header">
                <div className="wrapper">
                    {/* Buttons */}
                    <div className="container">
                        <div>
                            <a href="#project" className="text-link"><div className="text-link hover-this">Project</div></a>
                        </div>
                        <div>
                            <div className="text-link hover-this">Mysterys</div>
                            <a href="#contact" className="text-link"><div className="text-link hover-this">Contact</div></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Running Marquee */}
            <div className="marquee">
                <span>
                Creative. Technology. Software. Analysis. Creative. Technology. Software. Analysis. Creative. Technology. Software. Analysis. Creative. Technology. Software. Analysis. Creative. Technology. Software. Analysis.
                </span>
            </div>
        </section>
    );
};

export default Hero;
