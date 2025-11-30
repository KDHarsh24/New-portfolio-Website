import React, { useState, useEffect, useRef } from 'react';
import './SettingsWidget.css';
import { FiSettings } from 'react-icons/fi';
import { trackUser } from '../../utils/trackUser';

const SettingsWidget = () => {
    const [theme, setTheme] = useState('light');
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Check for cookie consent
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowCookieBanner(true);
        } else {
            setCookiesAccepted(true);
            // If consent already given, trigger tracking once per session
            try {
                trackUser();
            } catch (err) {
                // fail silently
                console.warn('trackUser error:', err);
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setCookiesAccepted(true);
        setShowCookieBanner(false);
        // Start tracking now that user consented
        try {
            trackUser();
        } catch (err) {
            console.warn('trackUser error:', err);
        }
    };

    const containerRef = useRef(null);

    // Close when clicking outside the widget
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!containerRef.current) return;

            // Use composedPath when available to handle shadow DOM / SVG / nested elements
            const path = (e.composedPath && e.composedPath()) || e.path || (e.composedPath && e.composedPath()) || [];
            const clickedInside = path && path.length ? path.includes(containerRef.current) : containerRef.current.contains(e.target);

            if (isOpen && !clickedInside) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    return (
        <>
            <div 
                ref={containerRef}
                className={`settings-ribbon-container ${isOpen ? 'open' : ''}`}
            >
                <div 
                    className="settings-ribbon"
                    onClick={() => setIsOpen(v => !v)}
                    role="button"
                    aria-expanded={isOpen}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(v => !v); } }}
                >
                    <span className="ribbon-gear" aria-hidden="true">
                        <FiSettings size={16} />
                    </span>
                    <span className="ribbon-text">Settings</span>
                </div>
                
                <div className="settings-panel" onMouseDown={(e) => e.stopPropagation()}>
                    <div className="settings-content">
                        <div className="setting-item">
                            <span className="setting-label">System Status</span>
                            <div className="widget-tag">
                                <span className="status-dot"></span>
                                <span className="status-text">Active</span>
                            </div>
                        </div>

                        <div className="setting-item">
                            <span className="setting-label">Appearance</span>
                            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                                <div className={`toggle-track ${theme}`}>
                                    <div className="toggle-thumb">
                                        {theme === 'light' ? '☀️' : '🌙'}
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className="setting-item">
                            <span className="setting-label">Cookies</span>
                            <span className="cookie-status">
                                {cookiesAccepted ? 'Accepted' : 'Pending'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {showCookieBanner && !cookiesAccepted && (
                <div className="cookie-banner">
                    <div className="cookie-content">
                        <p>We use cookies to enhance your experience.</p>
                        <button onClick={acceptCookies} className="cookie-btn">Accept</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingsWidget;
