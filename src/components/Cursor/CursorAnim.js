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

export const initCursorAnimation = () => {
    cursor = document.querySelector(".cursor");
    let mouseX = 0;
    let mouseY = 0;

    // Mouse movement tracking
    const mouseMoveHandler = function(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    window.addEventListener("mousemove", mouseMoveHandler);

    // GSAP ticker for smooth following
    const ticker = gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function(){
            if (cursor) {
                gsap.set(cursor, {
                    css:{
                        left: mouseX,
                        top: mouseY
                    }
                });
            }
        }
    });

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
        ticker.kill();
        links.forEach(removeHoverEffect);
        growOnlyLinks.forEach(link => {
            link.removeEventListener("mousemove", cursorEnter);
            link.removeEventListener("mouseleave", cursorLeave);
        });
    };
};
