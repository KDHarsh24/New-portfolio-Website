import gsap from 'gsap';

let cursor = null;

const animateit = function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const { offsetWidth: width, offsetHeight: height } = this;
    const move = 25;
    const xMove = x / width * (move * 2) - move;
    const yMove = y / height * (move * 2) - move;

    this.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === 'mouseleave') {
        this.style.transform = '';
    }
};

const cursorEnter = function() {
    if (!cursor) return;
    cursor.classList.add('grow');
    if (this.classList.contains('small')) {
        cursor.classList.remove('grow');
        cursor.classList.add('grow-small');
    }
};

const cursorLeave = function() {
    if (!cursor) return;
    cursor.classList.remove('grow');
    cursor.classList.remove('grow-small');
};

export const addHoverEffect = (link) => {
    if (!link) return;
    link.addEventListener('mousemove', animateit);
    link.addEventListener('mouseleave', animateit);
    link.addEventListener("mousemove", cursorEnter);
    link.addEventListener("mouseleave", cursorLeave);
};

export const removeHoverEffect = (link) => {
    if (!link) return;
    link.removeEventListener('mousemove', animateit);
    link.removeEventListener('mouseleave', animateit);
    link.removeEventListener("mousemove", cursorEnter);
    link.removeEventListener("mouseleave", cursorLeave);
};

export const setCursorText = (text) => {
    if (!cursor) return;
    const content = cursor.querySelector('.cursor-content');
    if (content) {
        content.innerHTML = text;
        if (text) {
            cursor.classList.add('has-content');
        } else {
            cursor.classList.remove('has-content');
        }
    }
};

export const setCursorMedia = (url) => {
    if (!cursor) return;
    const media = cursor.querySelector('.cursor-media');
    if (media) {
        if (url) {
            media.style.backgroundImage = `url(${url})`;
            cursor.classList.add('has-media');
        } else {
            media.style.backgroundImage = '';
            cursor.classList.remove('has-media');
        }
    }
};

export const setCursorBubble = (active) => {
    if (!cursor) return;
    if (active) {
        cursor.classList.add('is-bubble');
    } else {
        cursor.classList.remove('is-bubble');
    }
};

export const setCursorGrow = (active) => {
    if (!cursor) return;
    if (active) {
        cursor.classList.add('grow-small');
    } else {
        cursor.classList.remove('grow-small');
    }
};

export const initCursorAnimation = () => {
    cursor = document.querySelector(".cursor");
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let ease = 0.16; // smoothing factor (0.01-1)
    let scrollTimer = null;

    // Update target on pointer move. Keep handler lightweight.
    const mouseMoveHandler = (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    };
    window.addEventListener('mousemove', mouseMoveHandler, { passive: true });

    // RAF loop: interpolate current position towards target and apply transform via translate3d.
    let rafId = null;
    const render = () => {
        // lerp
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        if (cursor) {
            // Use translate3d for GPU acceleration and include the centering and scale variable.
            cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(var(--cursor-scale))`;
        }

        rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // Improve responsiveness during scroll: temporarily increase easing so cursor doesn't trail badly
    const onScrollActivity = () => {
        // make cursor snappier during scroll
        ease = 0.32;
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            ease = 0.16; // restore
            scrollTimer = null;
        }, 180);
    };

    // Use passive listeners for scroll/touch/wheel to avoid blocking
    window.addEventListener('scroll', onScrollActivity, { passive: true });
    window.addEventListener('wheel', onScrollActivity, { passive: true });
    window.addEventListener('touchmove', onScrollActivity, { passive: true });

    // Hover effects
    const links = document.querySelectorAll('.hover-this');
    const growOnlyLinks = document.querySelectorAll('.hover-grow-only');
    
    links.forEach(addHoverEffect);

    growOnlyLinks.forEach(link => {
        link.addEventListener("mousemove", cursorEnter);
        link.addEventListener("mouseleave", cursorLeave);
    });

    // Cleanup function
    return () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
        if (rafId) cancelAnimationFrame(rafId);
        links.forEach(removeHoverEffect);
        growOnlyLinks.forEach(link => {
            link.removeEventListener('mousemove', cursorEnter);
            link.removeEventListener('mouseleave', cursorLeave);
        });
    };
};
