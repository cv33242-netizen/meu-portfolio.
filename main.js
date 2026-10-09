// =====================================================
// PORTFÓLIO - CARLOS VINICIUS
// JavaScript minimalista
// =====================================================


// =====================================================
// ANO AUTOMÁTICO NO RODAPÉ
// =====================================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =====================================================
// ANIMAÇÃO SUAVE AO ROLAR A PÁGINA
// =====================================================

const elementsToAnimate = document.querySelectorAll(
    ".profile__container, " +
    ".timeline__item, " +
    ".especialidades__card, " +
    ".smartbed__hero, " +
    ".architecture__item, " +
    ".project-number, " +
    ".evolution-card, " +
    ".skill-card, " +
    ".contact__container"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }
);

elementsToAnimate.forEach((element) => {

    element.classList.add("hidden");

    observer.observe(element);

});


// =====================================================
// CANVAS DO HEADER
// PARTICULAS MINIMALISTAS
// =====================================================

const canvas = document.getElementById("header-canvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];

    const particleCount = 45;


    // ---------------------------------------------
    // Ajusta o tamanho do canvas
    // ---------------------------------------------

    function resizeCanvas() {

        canvas.width = window.innerWidth;

        canvas.height = canvas.offsetHeight;

    }


    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    // ---------------------------------------------
    // Partícula
    // ---------------------------------------------

    class Particle {

        constructor() {

            this.reset();

        }


        reset() {

            this.x = Math.random() * canvas.width;

            this.y = Math.random() * canvas.height;

            this.size = Math.random() * 1.5 + 0.5;

            this.speedX =
                (Math.random() - 0.5) * 0.25;

            this.speedY =
                (Math.random() - 0.5) * 0.25;

            this.opacity =
                Math.random() * 0.5 + 0.15;

        }


        update() {

            this.x += this.speedX;

            this.y += this.speedY;


            if (
                this.x < 0 ||
                this.x > canvas.width ||
                this.y < 0 ||
                this.y > canvas.height
            ) {

                this.reset();

            }

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0, 230, 118, ${this.opacity})`;

            ctx.fill();

        }

    }


    // ---------------------------------------------
    // Criando partículas
    // ---------------------------------------------

    function createParticles() {

        particles = [];

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    createParticles();


    // ---------------------------------------------
    // Linhas entre partículas próximas
    // ---------------------------------------------

    function connectParticles() {

        for (
            let a = 0;
            a < particles.length;
            a++
        ) {

            for (
                let b = a + 1;
                b < particles.length;
                b++
            ) {

                const dx =
                    particles[a].x -
                    particles[b].x;

                const dy =
                    particles[a].y -
                    particles[b].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 120) {

                    const opacity =
                        1 - distance / 120;


                    ctx.beginPath();

                    ctx.strokeStyle =
                        `rgba(0, 230, 118, ${opacity * 0.08})`;

                    ctx.lineWidth = 0.5;


                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );


                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );


                    ctx.stroke();

                }

            }

        }

    }


    // ---------------------------------------------
    // Animação
    // ---------------------------------------------

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(
            (particle) => {

                particle.update();

                particle.draw();

            }
        );


        connectParticles();


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

}


// =====================================================
// SCROLL SUAVE DOS LINKS DO MENU
// =====================================================

const navigationLinks =
    document.querySelectorAll('a[href^="#"]');


navigationLinks.forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            const targetID =
                this.getAttribute("href");


            if (
                targetID === "#" ||
                targetID.length <= 1
            ) {

                return;

            }


            const targetElement =
                document.querySelector(
                    targetID
                );


            if (targetElement) {

                event.preventDefault();


                targetElement.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            }

        }
    );

});