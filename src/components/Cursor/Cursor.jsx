import React, { useEffect, useState } from 'react';
import './Cursor.css';
import { initCursorAnimation } from './CursorAnim';

const Cursor = () => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            const touch = (typeof window !== 'undefined') && (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches || 'ontouchstart' in window);
            setIsTouch(Boolean(touch));
        };

        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    useEffect(() => {
        if (isTouch) return; // Do not initialize on touch devices

        // Initialize cursor animation after component mount
        const timer = setTimeout(() => {
            const cleanup = initCursorAnimation();
            // store cleanup on the timer closure
        }, 100);
        return () => clearTimeout(timer);
    }, [isTouch]);

    if (isTouch) return null;

    return (
        <div className="cursor">
            <div className="cursor-content"></div>
            <div className="cursor-media"></div>
        </div>
    );
};

export default Cursor;
