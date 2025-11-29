import React from 'react';
import gsap from 'gsap';

const JourneyPostcards = ({ activeId, setActiveId, memories }) => {
    
    const handleCursorGrow = () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.classList.add('grow');
    };

    const handleCursorShrink = () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.classList.remove('grow');
    };

    const handlePostcardMove = (e, index) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        const baseRotate = (memories[index] && memories[index].rotation) ? memories[index].rotation : '0deg';

        gsap.to(card, {
            transformPerspective: 1000,
            rotation: baseRotate,
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.1,
            duration: 0.1,
            ease: "power1.out",
            overwrite: "auto"
        });
    };

    const handlePostcardLeave = (e, mem) => {
        handleCursorShrink();
        gsap.to(e.currentTarget, {
            rotation: mem.rotation,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
        });
    };

    return (
        <div className="journey-col-nav">
            <div className="postcards-container">
                {memories.map((mem, index) => (
                    <div 
                        key={mem.id}
                        className={`scattered-postcard ${activeId === index ? 'active' : ''}`}
                        style={{ 
                            top: mem.top, 
                            left: mem.left, 
                            transform: `rotate(${mem.rotation})` 
                        }}
                        onClick={() => setActiveId(index)}
                        onMouseEnter={handleCursorGrow}
                        onMouseMove={(e) => handlePostcardMove(e, index)}
                        onMouseLeave={(e) => handlePostcardLeave(e, mem)}
                    >
                        <div className="postcard-face">
                            <img src={mem.img} alt={mem.year} />
                            <div className="postcard-mark">
                                <span>{mem.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JourneyPostcards;