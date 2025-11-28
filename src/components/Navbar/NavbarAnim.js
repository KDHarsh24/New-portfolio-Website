import gsap from 'gsap';

export const blinkEyes = () => {
    const leftEye = document.querySelector("#nav-left-eye");
    const rightEye = document.querySelector("#nav-right-eye");
    
    if (leftEye && rightEye) {
        const tl = gsap.timeline();
        tl.to([leftEye, rightEye], {
            scaleY: 0.1,
            duration: 0.15,
            ease: "power2.inOut",
            transformOrigin: "center"
        })
        .to([leftEye, rightEye], {
            scaleY: 1,
            duration: 0.15,
            ease: "power2.inOut",
            transformOrigin: "center"
        });
    }
};

export const initNavbarAnimations = () => {
    const svg = document.querySelector("#navbar-eyes");
    if (svg) {
        const mouse = svg.createSVGPoint();
        const leftEye = createEye("#nav-left-eye");
        const rightEye = createEye("#nav-right-eye");
        let requestId = null;

        const onFrame = () => {
            let point = mouse.matrixTransform(svg.getScreenCTM().inverse());
            leftEye.rotateTo(point);
            rightEye.rotateTo(point);
            requestId = null;
        };

        const onMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            if (!requestId) {
                requestId = requestAnimationFrame(onFrame);
            }
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }
    return () => {};
};

function createEye(selector) {
    const element = document.querySelector(selector);
    if (!element) return { rotateTo: () => {} };
    
    // Set initial transform origin for rotation
    // We need to be careful not to conflict with the scale transform for blinking
    // GSAP handles multiple transforms well if we use its properties
    
    let bbox = element.getBBox();
    let centerX = bbox.x + bbox.width / 2; // Corrected center calculation for group/circle
    let centerY = bbox.y + bbox.height / 2;

    // If it's a group with circles inside, bbox might be tricky if not rendered yet, 
    // but here we know the coordinates from JSX.
    // Left Eye: cx=50, cy=50. Right Eye: cx=150, cy=50.
    
    // Let's hardcode centers based on the new SVG coordinates we plan to use
    if (selector.includes("left")) {
        centerX = 50;
        centerY = 50;
    } else {
        centerX = 150;
        centerY = 50;
    }

    function rotateTo(point) {
        let dx = point.x - centerX;
        let dy = point.y - centerY;
        let angle = Math.atan2(dy, dx);
        let angleDeg = angle * (180 / Math.PI);

        // We apply rotation to the inner pupil, not the whole eye, 
        // otherwise the blink (scaleY) on the whole eye might look weird if rotated.
        // Wait, the previous implementation rotated the whole element.
        // If we blink (scaleY) a rotated element, it skews.
        // Better to rotate the inner pupil only?
        // The previous code rotated `element` which was `#nav-left-eye` (the group).
        
        // Let's change strategy: Rotate the inner pupil, Blink the outer eye (or the whole group).
        // If we rotate the group, blinking (scaling Y) will happen along the rotated axis.
        // That actually looks like a real eye blinking (eyelids close perpendicular to face, but here it's 2D).
        // If the eye looks up (rotated -90deg) and we scaleY, it will scale horizontally. That's wrong.
        // We should rotate the pupil (inner circle) for looking direction.
        // And scale the group for blinking.
        
        const inner = element.querySelector(".eye-inner");
        if (inner) {
             // Calculate displacement for pupil
             const maxDist = 25; // Limit pupil movement
             const dist = Math.min(Math.sqrt(dx*dx + dy*dy), maxDist);
             const moveX = Math.cos(angle) * dist;
             const moveY = Math.sin(angle) * dist;
             
             gsap.to(inner, 0.1, {
                 x: moveX,
                 y: moveY
             });
        }
    }

    return {
        element,
        rotateTo,
    };
}
