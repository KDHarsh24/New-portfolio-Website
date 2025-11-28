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
//Canvas Code not neeeded
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

// document.addEventListener('contextmenu', event => {
//     alert("If you want the code take it from Github don't do this things.");
//     event.preventDefault()
// });

$(window).scroll(function() {
    if($(this).scrollTop() > 50)  /*height in pixels when the navbar becomes non opaque*/ 
    {
        $('.opaque-navbar').addClass('opaque');
        $('.logo').addClass('navbarLogo')
    } else {
        $('.opaque-navbar').removeClass('opaque');
        $('.logo').removeClass('navbarLogo')
    }
    if($(this).scrollTop() > 120)
        document.getElementsByClassName('branding')[0].style.display = "flex";
    else
        document.getElementsByClassName('branding')[0].style.display = "none";
});

gsap.registerPlugin(ScrollTrigger);
// gsap.from('.contact-details', {
//     x: -100,
//     opacity: 0,
//     duration: 3,
//     scrollTrigger: {
//         trigger: ".contact-details",
//         start: "top 50%", //at what point of screen to beginb that is from top 70%
//         end: "center 20%", //at what point of screen to end that is from center 300%
//         markers: true,
//         toggleActions: "restart reverse restart reverse"
//                     //  onEnter onLeave onEnterBack onLeaveBack
//                     //pause stops movement onleave
//         // toggleClass: "pink", // pink class will be added
//     }
// });

gsap.to('.website-content', {
    duration: 3,
    scale: 0.75,
    opacity: 0.8,
    ease: "power2.in",
    scrollTrigger: {
        trigger: ".website-content",
        start: "top 0%", //at what point of screen to beginb that is from top 70%
        end: "bottom 50%", //at what point of screen to end that is from center 300%
        markers: true,
        scrub: 3,
        toggleActions: "restart reverse none none"
                    //  onEnter onLeave onEnterBack onLeaveBack
                    //pause stops movement onleave
        // toggleClass: "pink", // pink class will be added
    }
});
gsap.from('.contact-web', {
    scale: 0.75,
    duration: 3, 
    ease: "power3.out",
    opacity: 0.8,
    scrollTrigger: {
        trigger: ".contact-web",
        start: "top 110%", //at what point of screen to beginb that is from top 70%
        end: "center 90%", //at what point of screen to end that is from center 300%
        markers: true,
        scrub: 3,
        toggleActions: "restart reverse none reverse",
                    //  onEnter onLeave onEnterBack onLeaveBack
                    //  pause stops movement onleave
        // toggleClass: "contact-web-anime", // pink class will be added
    }
});

$(document).ready(() => {
    let count = 0;
    let counter = setInterval(() => {
        if (count < 101)
        {
            $('.count-preload').text(count + '%');
            $('.loader').css('width', 100 - count + '%');
            count++;   
        }
        else {
            clearInterval(counter);
            $('.preloader').css('display', "none")
        }
    });
});