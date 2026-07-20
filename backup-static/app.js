document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PRELOADER LOGIC
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    
    // Ocultar preloader con desvanecimiento una vez cargada la página
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
            }
        }, 800); // Pequeño delay para que se aprecie la animación premium de carga
    });

    // Fallback de seguridad por si tarda demasiado en cargar recursos externos
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 4000);

    /* ==========================================================================
       2. SCROLLED NAVBAR & MOBILE MENU
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    // Cambiar apariencia del navbar al hacer scroll
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Ejecutar en carga inicial

    // Menu móvil toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       3. INTERACTIVE PARTICLE CANVAS (BACKGROUND)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
                this.baseSize = size;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX;
                this.y += this.directionY;

                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x += (dx / distance) * force * 1.2;
                        this.y += (dy / distance) * force * 1.2;
                        this.size = this.baseSize * (1 + force * 0.8);
                    } else {
                        if (this.size > this.baseSize) this.size -= 0.1;
                    }
                } else {
                    if (this.size > this.baseSize) this.size -= 0.1;
                }

                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 13000);
            
            const colors = [
                'rgba(139, 92, 246, 0.25)', // Violeta
                'rgba(6, 182, 212, 0.25)',  // Cian
                'rgba(236, 72, 153, 0.15)',  // Rosa
                'rgba(255, 255, 255, 0.15)'  // Blanco
            ];

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1.2;
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = colors[Math.floor(Math.random() * colors.length)];

                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 110) {
                        opacityValue = 1 - (distance / 110);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.05})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
            requestAnimationFrame(animateParticles);
        };

        resizeCanvas();
        animateParticles();
    }

    /* ==========================================================================
       4. INTERACTIVE 3D TILT EFFECT & GLOW (CARDS)
       ========================================================================== */
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            
            const tiltX = (dy / yc) * -12;
            const tiltY = (dx / xc) * 12;

            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    /* ==========================================================================
       5. SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       6. STATS COUNTERS ANIMATION
       ========================================================================== */
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeProgress = progress * (2 - progress);
                const currentCount = Math.floor(easeProgress * target);

                counter.textContent = currentCount;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
                statsObserver.unobserve(statsSection);
            }
        }, {
            threshold: 0.3
        });

        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       7. CONTACT FORM INTERACTION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const btnSubmit = document.getElementById('btn-submit-contact');
    const successMsg = document.getElementById('form-success-message');

    if (contactForm && btnSubmit && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span class="spinner-small"></span> Procesando...';
            
            const spinnerStyle = document.createElement('style');
            spinnerStyle.id = 'spinner-style';
            spinnerStyle.innerHTML = `
                .spinner-small {
                    width: 16px;
                    height: 16px;
                    border: 2px solid transparent;
                    border-top-color: #000;
                    border-radius: 50%;
                    display: inline-block;
                    animation: spin 0.8s linear infinite;
                }
            `;
            document.head.appendChild(spinnerStyle);

            setTimeout(() => {
                btnSubmit.style.display = 'none';
                successMsg.style.display = 'flex';
                contactForm.reset();
                
                const styleEl = document.getElementById('spinner-style');
                if (styleEl) styleEl.remove();
            }, 1800);
        });
    }

    /* ==========================================================================
       8. INTERACTIVE HERO SLIDER
       ========================================================================== */
    const slidesLeft = document.querySelectorAll('.slide-text-left');
    const slidesRight = document.querySelectorAll('.slide-text-right');
    const slidesScreen = document.querySelectorAll('.slide-screen-content');
    const bgRight = document.getElementById('hero-bg-right');
    const btnPrev = document.getElementById('slider-prev');
    const btnNext = document.getElementById('slider-next');
    
    // Colores correspondientes al fondo del lado derecho para cada slide
    const bgColors = [
        'hsl(38, 85%, 28%)',  // Slide 0: Dorado ocre
        'hsl(188, 85%, 15%)', // Slide 1: Cian oscuro
        'hsl(263, 70%, 15%)'  // Slide 2: Violeta oscuro
    ];
    
    let activeIndex = 0;
    let sliderTimer = null;
    
    const goToSlide = (index) => {
        if (slidesLeft.length === 0) return;

        // Limpiar estado activo anterior
        slidesLeft[activeIndex].classList.remove('active');
        slidesRight[activeIndex].classList.remove('active');
        slidesScreen[activeIndex].classList.remove('active');
        
        // Calcular nuevo índice circular
        activeIndex = (index + slidesLeft.length) % slidesLeft.length;
        
        // Establecer nuevo estado activo
        slidesLeft[activeIndex].classList.add('active');
        slidesRight[activeIndex].classList.add('active');
        slidesScreen[activeIndex].classList.add('active');
        
        // Cambiar color de fondo del lado derecho con transición suave
        if (bgRight) {
            bgRight.style.backgroundColor = bgColors[activeIndex];
        }
    };
    
    const startAutoplay = () => {
        stopAutoplay();
        sliderTimer = setInterval(() => {
            goToSlide(activeIndex + 1);
        }, 6500); // 6.5 segundos por slide
    };
    
    const stopAutoplay = () => {
        if (sliderTimer) {
            clearInterval(sliderTimer);
        }
    };
    
    // Configurar controladores de navegación
    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            goToSlide(activeIndex - 1);
            startAutoplay(); // Resetear cronómetro tras acción manual
        });
        
        btnNext.addEventListener('click', () => {
            goToSlide(activeIndex + 1);
            startAutoplay(); // Resetear cronómetro tras acción manual
        });
    }

    /* ==========================================================================
       9. EFECTO DE PARTÍCULAS 3D EN HOVER SOBRE LA LAPTOP
       ========================================================================== */
    const laptopContainer = document.querySelector('.laptop-container');
    const symbolsContainer = document.getElementById('floating-symbols-container');
    
    // Símbolos de ciberseguridad, TI e IA
    const symbolsList = ['🛡', '🔑', '💻', '🔒', '👁', '🤖', '⚙', '✦', '◇', '▲', '⚡', '1', '0', 'AI', 'ISO'];
    
    // Colores asociados a cada slide para los símbolos flotantes
    const symbolColors = [
        '#f59e0b', // Slide 0: Dorado
        '#06b6d4', // Slide 1: Cian
        '#a78bfa'  // Slide 2: Violeta claro
    ];
    
    let symbolIntervalId = null;
    
    const createFloatingSymbol = () => {
        if (!symbolsContainer) return;
        
        const symbolEl = document.createElement('span');
        symbolEl.className = 'floating-symbol';
        
        // Elegir símbolo aleatorio
        const symbolText = symbolsList[Math.floor(Math.random() * symbolsList.length)];
        symbolEl.textContent = symbolText;
        
        // Parámetros aleatorios de animación
        const startX = Math.random() * 40 + 30; // 30% a 70% (centro horizontal de la pantalla)
        const startY = Math.random() * 30 + 35; // 35% a 65% (centro vertical de la pantalla)
        const endX = (Math.random() * 500 - 250); // -250px a 250px en abanico
        const endY = (Math.random() * 400 - 200); // -200px a 200px
        const duration = Math.random() * 1.0 + 1.6; // 1.6s a 2.6s
        const rotZ = Math.random() * 180 - 90; // -90deg a 90deg
        const maxOpacity = Math.random() * 0.35 + 0.6; // 0.6 a 0.95
        const fontSize = Math.random() * 0.8 + 1.0; // 1.0rem a 1.8rem
        
        // Color basado en el índice de slide activo
        const currentColor = symbolColors[activeIndex];
        
        // Asignar variables custom CSS
        symbolEl.style.setProperty('--start-x', `${startX}%`);
        symbolEl.style.setProperty('--start-y', `${startY}%`);
        symbolEl.style.setProperty('--end-x', `${endX}px`);
        symbolEl.style.setProperty('--end-y', `${endY}px`);
        symbolEl.style.setProperty('--duration', `${duration}s`);
        symbolEl.style.setProperty('--rot-z', `${rotZ}deg`);
        symbolEl.style.setProperty('--max-opacity', maxOpacity);
        symbolEl.style.setProperty('--font-size', `${fontSize}rem`);
        
        // Aplicar color
        symbolEl.style.color = currentColor;
        
        // Agregar al DOM
        symbolsContainer.appendChild(symbolEl);
        
        // Eliminar al finalizar la animación
        setTimeout(() => {
            symbolEl.remove();
        }, duration * 1000);
    };
    
    if (laptopContainer && symbolsContainer) {
        laptopContainer.addEventListener('mouseenter', () => {
            if (symbolIntervalId === null) {
                // Crear algunos de inmediato para un efecto instantáneo
                createFloatingSymbol();
                createFloatingSymbol();
                createFloatingSymbol();
                
                // Empezar a generar símbolos continuamente
                symbolIntervalId = setInterval(createFloatingSymbol, 140);
            }
        });
        
        laptopContainer.addEventListener('mouseleave', () => {
            if (symbolIntervalId !== null) {
                clearInterval(symbolIntervalId);
                symbolIntervalId = null;
            }
        });
    }

    // Inicializar carrusel
    if (slidesLeft.length > 0) {
        goToSlide(0);
        startAutoplay();
    }

    /* ==========================================================================
       10. ACTIVE NAV LINK ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    const activeMenuOnScroll = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Ajustar por el navbar header
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activeMenuOnScroll);
});
