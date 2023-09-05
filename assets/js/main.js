/*Function for link Hover with cursor movement with cursor*/
(function () {
    /*For class hover-this only */
    const link = document.querySelectorAll('.hover-this');

    const animateit = function (e) {
        /*Selecting mouse position in pixels */
        const { offsetX: x, offsetY: y } = e,
        { offsetWidth: width, offsetHeight: height } = this,
        move = 25,
        /*the speed of movement */
        xMove = x / width * (move * 2) - move,
        yMove = y / height * (move * 2) - move;
        /*Changing the style here of the box hover-this */
        this.style.transform = `translate(${xMove}px, ${yMove}px)`;
        /*When Mouse leaves reseting it to normal */
        if (e.type === 'mouseleave') {
            this.style.transform = '';
        }
    };
    /*Giving to each hoverthis on mouse movement as per need*/
    link.forEach(b => b.addEventListener('mousemove', animateit));
    link.forEach(b => b.addEventListener('mouseleave', animateit));

})();

/*Cursor Change and it's look */
var cursor = document.querySelector(".cursor"),
/*How will it look on hovering hover-this */
cursorScale = document.querySelectorAll('.hover-this'),
mouseX = 0, mouseY = 0;
gsap.to({}, 0.016, {
    repeat:-1,
    /*setting mouse top and left as per the cursor movement */
    onRepeat: function(){
        gsap.set(cursor, {
            css:{
                left:mouseX,
                top:mouseY
            }
        })
    }
});
//performing the mouse movement function
window.addEventListener("mousemove", function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
});
//Giving a new css when on hover-this
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

//Timeline of Gsap
const t1 = gsap.timeline();
//preloader to main site
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
function revealWeb(){
    t1.to(".website-content", 1, {
        opacity: 1,
        display: "block",
        ease: "power2.inOut"
    });
    t1.to(".contact-web", 0,{
        opacity: 0,
        display: "none",
        ease: "power3.inOut",
    }, "-=1.0");
    t1.from(".hover-this", 2, {
        y: 40,
        opacity: 0,
        ease: "power3.inOut",
        stagger: {
            amount: 0.2,
        },
    }, "-=1.1");
    t1.to("body, html", 1, {
        background: "#efe3dc"
    });
}
function revealContact(){
    t1.to(".website-content", 1, {
        opacity: 0,
        display: "none",
        ease: "power2.inOut"
    });
    t1.to(".contact-web", 1,{
        opacity: 1,
        display: "block",
        ease: "power3.inOut",
        delay: "1s"
    });
    t1.from(".contact-web", 2,{
        y: 150,
    }, "-=1.5");
    t1.to("body, html", 2, {
        background: "#0a0a0a"
    });
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

/*Two photo moving parralx effect */
document.addEventListener("mousemove", parralax);
function parralax(e){
    this.querySelectorAll(".layer").forEach((layer)=>{
        const speed = layer.getAttribute("data-speed");
        const x = (window.innerWidth - e.pageX*speed) / 300;
        const y = (window.innerWidth - e.pageY*speed) / 300;
        //transform css to the images
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

/*const canvas = document.querySelector('.draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADASS"
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 75;
let isDrawing = false;
let lastX = 10;
let lastY = 10;
let hue = 0;

let direction = true;
function draw(e){
    if(!isDrawing)
        return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    
    hue++;
    if(hue> 360)
        hue = 0;
}
function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", (e)=>{
    isDrawing = true;
    [lastX, lastY]= [e.offsetX, e.offsetY];
        
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", ()=>{
    isDrawing = false;
    clearCanvas();
});
canvas.addEventListener("mouseout", ()=>{
    isDrawing = false;
    clearCanvas();
});*/
//structuring the circle of the logo box
const circleType = new CircleType(
    document.getElementById("rotated")
    ).radius(40);

document.addEventListener('contextmenu', event => {
    alert("If you want the code take it from Github don't do this things.");
    event.preventDefault()
});