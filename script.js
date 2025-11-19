document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('shadow-lg');
            header.classList.remove('shadow-md');
        } else {
            header.classList.remove('shadow-lg');
            header.classList.add('shadow-md');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('is-open');
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('is-open');
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
        });
    });

    // Projects Swiper
    new Swiper('.projects-swiper', {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-proj',
            prevEl: '.swiper-button-prev-proj',
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        }
    });

    // Sports Swiper
    new Swiper('.sports-swiper', {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
         autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next-sport',
            prevEl: '.swiper-button-prev-sport',
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        }
    });

    // Courses Tab Functionality
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseContents = document.querySelectorAll('.course-content');

    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            courseTabs.forEach(t => {
                t.classList.remove('active', 'border-prata-dark', 'text-prata-dark');
                t.classList.add('text-gray-500', 'border-transparent');
            });
            tab.classList.add('active', 'border-prata-dark', 'text-prata-dark');
            tab.classList.remove('text-gray-500', 'border-transparent');

            courseContents.forEach(content => {
                if (content.id === target) {
                    content.classList.remove('hidden');
                    content.classList.add('grid');
                } else {
                    content.classList.add('hidden');
                     content.classList.remove('grid');
                }
            });
        });
    });

    // Number Counter Animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter-number');
        const duration = 2000; // 2 seconds

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const isDecimal = target % 1 !== 0;
            let startTimestamp = null;

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                
                // Apply ease-out effect
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                let currentValue = easedProgress * target;

                if (isDecimal) {
                    counter.innerText = currentValue.toFixed(1);
                } else {
                    counter.innerText = Math.floor(currentValue);
                }

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        });
    };

    // Scroll Animation Observer
    const animatedSections = document.querySelectorAll('.animated-section');
    let countersAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Trigger counter animation only for achievements section and only once
                if (entry.target.id === 'achievements' && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // Contact Form Success Message
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formSuccess.classList.remove('hidden');
            contactForm.reset();
            setTimeout(() => formSuccess.classList.add('hidden'), 4000);
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav a, #mobile-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // A seção precisa estar 50% visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* --- LÓGICA PARA OS POP-UPS --- */
    (() => {
        // Pop-up 1: Semana do Empreendedor
        const eventPopupOverlay = document.getElementById('event-popup-overlay');
        const eventPopup = document.getElementById('event-popup');
        const closeEventBtn = document.getElementById('close-popup-btn');

        // Pop-up 2: Jogos Internos
        const sportsPopupOverlay = document.getElementById('sports-popup-overlay');
        const sportsPopup = document.getElementById('sports-popup');
        const closeSportsBtn = document.getElementById('close-sports-popup-btn');
        const sportsCtaBtn = document.getElementById('sports-popup-cta-btn'); // Botão "Saiba Mais"

        // --- Funções para o Pop-up de Esportes (2) ---
        const openSportsPopup = () => {
            sportsPopupOverlay.classList.remove('hidden');
            // Pequeno delay para garantir que o display foi aplicado antes de iniciar a transição
            setTimeout(() => {
                sportsPopupOverlay.classList.remove('opacity-0');
                sportsPopup.classList.remove('scale-95', 'opacity-0');
            }, 50);
        };

        const closeSportsPopup = () => {
            sportsPopup.classList.add('scale-95', 'opacity-0');
            sportsPopupOverlay.classList.add('opacity-0');
            setTimeout(() => {
                sportsPopupOverlay.classList.add('hidden');
            }, 500);
        };

        // --- Funções para o Pop-up de Evento (1) ---
        const closeEventPopup = () => {
            eventPopup.style.animation = ''; // Limpa a animação de entrada
            eventPopup.classList.add('opacity-0'); // Apenas faz o fade out
            eventPopupOverlay.classList.add('opacity-0');
            // Espera a transição terminar para esconder o elemento
            setTimeout(() => {
                eventPopupOverlay.style.display = 'none';
                eventPopup.classList.remove('opacity-0'); // Reseta para a próxima abertura
                openSportsPopup();
            }, 500); // Deve corresponder à duração da transição (500ms)
        };

        const openEventPopup = () => {
            eventPopupOverlay.style.display = 'flex';
            // Pequeno delay para garantir que o display 'flex' foi aplicado antes de iniciar a transição
            setTimeout(() => {
                eventPopupOverlay.classList.remove('opacity-0');
            }, 10); // Delay mínimo
        };

        // Abre o primeiro pop-up assim que a página carrega
        openEventPopup();

        // --- Event Listeners ---
        closeEventBtn.addEventListener('click', closeEventPopup);
        eventPopupOverlay.addEventListener('click', (event) => {
            if (event.target === eventPopupOverlay) {
                closeEventPopup();
            }
        });

        // Fecha o pop-up de esportes ao clicar no botão "Saiba Mais"
        sportsCtaBtn.addEventListener('click', closeSportsPopup);

        closeSportsBtn.addEventListener('click', closeSportsPopup);
        sportsPopupOverlay.addEventListener('click', (event) => {
            if (event.target === sportsPopupOverlay) {
                closeSportsPopup();
            }
        });
    })();
});
