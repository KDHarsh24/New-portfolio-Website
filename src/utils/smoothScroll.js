import Lenis from 'lenis'

export const initSmoothScroll = () => {
    // Check if Lenis is available globally (CDN fallback) or imported
    const LenisClass = typeof Lenis !== 'undefined' ? Lenis : window.Lenis;
    
    if (!LenisClass) {
        console.warn('Lenis not loaded');
        return { destroy: () => {} };
    }

    const lenis = new LenisClass({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    
    return lenis;
}
