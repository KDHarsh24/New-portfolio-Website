import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import { initNavbarAnimations, blinkEyes } from './NavbarAnim';
import { addHoverEffect, removeHoverEffect } from '../Cursor/CursorAnim';
import Menu from '../Menu/Menu';

const Navbar = () => {
    const [opaque, setOpaque] = useState(false);
    const [showBranding, setShowBranding] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const hamburger = hamburgerRef.current;
        if (hamburger) {
            addHoverEffect(hamburger);
        }
        return () => {
            if (hamburger) {
                removeHoverEffect(hamburger);
            }
        };
    }, []);

    useEffect(() => {
        const cleanup = initNavbarAnimations();

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setOpaque(true);
            } else {
                setOpaque(false);
            }

            if (scrollTop > 120) {
                setShowBranding(true);
            } else {
                setShowBranding(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cleanup();
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <div className={`navbar navbar-inverse navbar-fixed-top opaque-navbar ${opaque ? 'opaque' : ''}`}>
                
                <div className={`branding ${opaque ? 'light' : ''}`}>
                    <p>HKD</p>
                    <img src="/assets/img/Logo.png" alt="" className="contact-logo"/>
                    <p>2004</p>
                </div>
                {/* Navbar Eyes */}
                <div className="navbar-eyes-container hover-grow-only small" onClick={blinkEyes} style={{ cursor: 'none' }}>
                    <svg id="navbar-eyes" viewBox="0 0 200 100">
                        <g id="nav-left-eye">
                            <circle className="eye-outer" cx="50" cy="50" r="49" stroke="#0f0f0f" strokeWidth="2" fill="#fff"/>
                            <circle className="eye-inner" cx="50" cy="50" r="15" fill="#0f0f0f"/>
                        </g>
                        <g id="nav-right-eye">
                            <circle className="eye-outer" cx="150" cy="50" r="49" stroke="#0f0f0f" strokeWidth="2" fill="#fff"/>
                            <circle className="eye-inner" cx="150" cy="50" r="15" fill="#0f0f0f"/>
                        </g>
                    </svg>
                </div>

                
                <div 
                    ref={hamburgerRef}
                    className="hamburger-menu hover-this small" 
                    style={{ cursor: 'none', zIndex: 100 }} 
                    onClick={toggleMenu}
                >
                    <div className={`bar ${opaque && !isMenuOpen ? 'light' : 'dark'}`}></div>
                    <div className={`bar ${opaque && !isMenuOpen ? 'light' : 'dark'}`}></div>
                    <div className={`bar ${opaque && !isMenuOpen ? 'light' : 'dark'}`}></div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
