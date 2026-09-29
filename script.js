/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   TYPING EFFECT
========================================= */

const typingText = document.getElementById("typing-text");

const roles = [
    "BCA Student",
    "Web Developer",
    "Software Developer",
    "Data Analyst"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealOnScroll = () => {

    const windowHeight =
        window.innerHeight;

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {

            element.classList.add("show");

        }

    });

};


window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();

/* =========================================
   ANIMATED CODE BACKGROUND
========================================= */

const canvas = document.getElementById("code-background");
const ctx = canvas.getContext("2d");

let width;
let height;

const codeSnippets = [
    "const developer = 'Arnab';",
    "function buildWebsite() {}",
    "print('Hello World');",
    "System.out.println();",
    "SELECT * FROM users;",
    "<html>",
    "</html>",
    "body { display: flex; }",
    "npm install",
    "git push origin main",
    "git commit -m 'update'",
    "if (success) {",
    "return true;",
    "for(let i = 0; i < 10; i++)",
    "while(true) {}",
    "def calculate():",
    "import pandas as pd",
    "import numpy as np",
    "class Developer {}",
    "public static void main()",
    "console.log('Hello');",
    "const portfolio = {};",
    "Python",
    "Java",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "C",
    "C++",
    "{ code }",
    "</>",
    "01010101",
    "10101010",
    "API",
    "DATABASE",
    "DEVELOPER",
    "WEB DEV",
    "DATA"
];

const particles = [];

const particleCount = 45;


/* =========================================
   CANVAS SIZE
========================================= */

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =========================================
   CREATE CODE PARTICLES
========================================= */

function createParticles() {

    particles.length = 0;

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * width,

            y: Math.random() * height,

            speed:
                0.15 +
                Math.random() * 0.45,

            text:
                codeSnippets[
                    Math.floor(
                        Math.random() *
                        codeSnippets.length
                    )
                ],

            size:
                10 +
                Math.random() * 4,

            opacity:
                0.08 +
                Math.random() * 0.18,

            direction:
                Math.random() > 0.5 ? 1 : -1,

            drift:
                (Math.random() - 0.5) * 0.25

        });

    }

}

createParticles();


/* =========================================
   DRAW BACKGROUND
========================================= */

function drawBackground() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(particle => {

        particle.y +=
            particle.speed *
            particle.direction;

        particle.x +=
            particle.drift;


        /* Reset when leaving screen */

        if (particle.direction === 1 &&
            particle.y > height + 50) {

            particle.y = -50;
            particle.x =
                Math.random() * width;

        }


        if (particle.direction === -1 &&
            particle.y < -50) {

            particle.y = height + 50;
            particle.x =
                Math.random() * width;

        }


        /* Keep particles inside horizontal area */

        if (particle.x < -200) {
            particle.x = width;
        }

        if (particle.x > width + 200) {
            particle.x = -200;
        }


        /* Text styling */

        ctx.font =
            `${particle.size}px monospace`;

        ctx.fillStyle =
            `rgba(124, 92, 255, ${particle.opacity})`;


        ctx.fillText(
            particle.text,
            particle.x,
            particle.y
        );

    });


    requestAnimationFrame(drawBackground);

}

drawBackground();