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
    let mouseX = 0;
    let mouseY = 0;

    // Smoothly animate the cursor to follow the pointer while keeping it centered.
    // Use a single mousemove handler that tweens left/top with overwrite so we don't spawn many tweens.
    const mouseMoveHandler = function(e){
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!cursor) return;
        // Animate the left/top with a short duration and easing for smooth trailing.
        gsap.to(cursor, {
            duration: 0.12,
            left: mouseX,
            top: mouseY,
            ease: 'power3.out',
            overwrite: 'auto'
        });
    };
    window.addEventListener("mousemove", mouseMoveHandler, { passive: true });

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
        window.removeEventListener("mousemove", mouseMoveHandler);
        links.forEach(removeHoverEffect);
        growOnlyLinks.forEach(link => {
            link.removeEventListener("mousemove", cursorEnter);
            link.removeEventListener("mouseleave", cursorLeave);
        });
    };
};
