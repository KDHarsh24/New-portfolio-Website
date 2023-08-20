
(function () {

    const link = document.querySelectorAll('.hover-this');
    const cursor = document.querySelector('.cursor');

    const animateit = function (e) {
          const span = document.querySelector('.hover-this');
          const { offsetX: x, offsetY: y } = e,
          { offsetWidth: width, offsetHeight: height } = this,

          move = 25,
          xMove = x / width * (move * 2) - move,
          yMove = y / height * (move * 2) - move;

          span.style.transform = `translate(${xMove}px, ${yMove}px)`;

          if (e.type === 'mouseleave') {
            span.style.transform = '';
            }
    };

    link.forEach(b => b.addEventListener('mousemove', animateit));
    link.forEach(b => b.addEventListener('mouseleave', animateit));

})();
var cursor = document.querySelector(".cursor"),
cursorScale = document.querySelectorAll('.hover-this'),
mouseX = 0, mouseY = 0;
gsap.to({}, 0.016, {
    repeat:-1,
    onRepeat: function(){
        gsap.set(cursor, {
            css:{
                left:mouseX,
                top:mouseY
            }
        })
    }
});
window.addEventListener("mousemove", function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
});
cursorScale.forEach(link =>{
    link.addEventListener("mouseleave", ()=>{
        cursor.classList.remove('grow');
        cursor.classList.remove('grow-small');
    });
    link.addEventListener("mousemove", ()=>{
        cursor.classList.add('grow');
        if (link.classList.contains('small')) {
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});
const t1 = gsap.timeline();

function revealSite(){
    t1.to(".pre-loader", 1, {
        opacity: 0,
        display: "none",
        ease: "power2.inOut",
    });
    t1.from(".hover-this", 2, {
        y: 40,
        opacity: 0,
        ease: "power3.inOut",
        stagger: {
            amount: 0.2,
        },
    }, "-=1.1");
}
t1.to(".header > h1", 2, {
    top: 0,
    ease: "power3.inOut",
    stagger: {
        amount: 0.3,
    }
}).to(".pre-loader-btn", 0.3, {
    opacity: 1,
    delay: 1,
});
document.addEventListener("mousemove", parralax);
function parralax(e){
    this.querySelectorAll(".layer").forEach((layer)=>{
        const speed = layer.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX*speed) / 300;
        const y = (window.innerWidth - e.pageY*speed) / 300;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
};
//For Eyes Land
const svg = document.querySelector("svg");
const mouse = svg.createSVGPoint();
const leftEye = createEye("#left-eye");
const rightEye = createEye("#right-eye");

let requestId = null;

window.addEventListener("mousemove", onMouseMove);

function onFrame(){
    let point = mouse.matrixTransform(svg.getScreenCTM().inverse());
    leftEye.rotateTo(point);
    rightEye.rotateTo(point);

    requestId = null;
}

function onMouseMove(event){
    mouse.x = event.clientX-100;
    mouse.y = event.clientY-130;

    if (!requestId){
        requestId = requestAnimationFrame(onFrame);
    }
}

function createEye(selector){
    const element = document.querySelector(selector);
    TweenMax.set(element, {
        transformOrigin: "center",

    });
    let bbox = element.getBBox();
    let centerX = bbox.x - bbox.width / 2;
    let centerY = bbox.y - bbox.height / 2;

    function rotateTo(point){
        let dx = point.x - centerX;
        let dy = point.y - centerY;

        let angle = Math.atan2(dy, dx);

        TweenMax.to(element, 0, {
            rotation: angle + "_rad_short",
        });
    }

    return {
        element,
        rotateTo,
    };
}
