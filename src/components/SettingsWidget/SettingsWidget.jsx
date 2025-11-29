import React, { useState, useEffect } from 'react';
import './SettingsWidget.css';

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
    };

    return (
        <>
            <div 
                className={`settings-ribbon-container ${isOpen ? 'open' : ''}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="settings-ribbon">
                    <span className="ribbon-text">Settings & Config.</span>
                </div>
                
                <div className="settings-panel">
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
