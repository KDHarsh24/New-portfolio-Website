import React, { useEffect } from 'react';
import './Cursor.css';
import { initCursorAnimation } from './CursorAnim';

const Cursor = () => {
    useEffect(() => {
        // Initialize cursor animation after component mount
        // We use a timeout to ensure other components are rendered and .hover-this elements exist
        const timer = setTimeout(() => {
            initCursorAnimation();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return <div className="cursor"></div>;
};

export default Cursor;
