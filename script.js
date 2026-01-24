document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    const headerLogo = document.getElementById('header-logo');
    const headerTitle = document.getElementById('header-title');
    const logoLink = document.getElementById('logo-link');
    
    let isHeaderShrunk = false;

    // Optimized Scroll Handler with requestAnimationFrame
    let scrollTicking = false;
    const backToTopButton = document.getElementById('back-to-top');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    let isBackToTopVisible = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Header Logic
                const shouldShrink = scrollY > 10;
                if (shouldShrink && !isHeaderShrunk) {
                    header.classList.add('shadow-lg', 'py-2');
                    header.classList.remove('shadow-md', 'py-4');
                    headerLogo.classList.add('h-12', 'w-12');
                    headerLogo.classList.remove('h-16', 'w-16');
                    headerTitle.classList.add('text-lg', 'sm:text-xl');
                    headerTitle.classList.remove('text-xl', 'md:text-2xl');
                    isHeaderShrunk = true;
                } else if (!shouldShrink && isHeaderShrunk) {
                    header.classList.remove('shadow-lg', 'py-2');
                    header.classList.add('shadow-md', 'py-4');
                    headerLogo.classList.remove('h-12', 'w-12');
                    headerLogo.classList.add('h-16', 'w-16');
                    headerTitle.classList.remove('text-lg', 'sm:text-xl');
                    headerTitle.classList.add('text-xl', 'md:text-2xl');
                    isHeaderShrunk = false;
                }

                // Scroll Progress Bar Logic
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                if (scrollProgressBar) scrollProgressBar.style.width = scrolled + "%";

                // Back to Top Logic
                const shouldShowBackToTop = scrollY > 300;
                if (shouldShowBackToTop && !isBackToTopVisible) {
                    backToTopButton.classList.remove('hidden');
                    isBackToTopVisible = true;
                } else if (!shouldShowBackToTop && isBackToTopVisible) {
                    backToTopButton.classList.add('hidden');
                    isBackToTopVisible = false;
                }

                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    const toggleMenu = () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            // Force reflow to ensure transition happens
            requestAnimationFrame(() => {
                mobileMenu.classList.remove('-translate-y-full');
            });
            menuOpenIcon.classList.add('hidden');
            menuCloseIcon.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('-translate-y-full');
            // Wait for transition to finish before hiding
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
        }
    };

    mobileMenuButton.addEventListener('click', toggleMenu);
    
    // Close mobile menu on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
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
    const activeTabIndicator = document.getElementById('active-tab-indicator');

    const updateIndicator = (activeTab) => {
        if (activeTab) {
            activeTabIndicator.style.left = `${activeTab.offsetLeft}px`;
            activeTabIndicator.style.width = `${activeTab.offsetWidth}px`;
        }
    };

    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            courseTabs.forEach(t => {
                t.classList.remove('active', 'text-prata-dark');
                t.classList.add('text-gray-500', 'border-transparent');
            });
            tab.classList.add('active', 'text-prata-dark');
            tab.classList.remove('text-gray-500', 'border-transparent');

            updateIndicator(tab);

            courseContents.forEach(content => {
                if (content.id === target) {
                    content.classList.remove('hidden');
                    content.classList.add('grid');
                    content.firstElementChild.classList.add('opacity-0');
                    content.firstElementChild.style.animation = 'text-fade-in 0.5s forwards';
                } else {
                    content.classList.add('hidden');
                    content.classList.remove('grid');
                    content.firstElementChild.style.animation = '';
                }
            });
        });
    });

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        const eventPopupCta = document.getElementById('event-popup-cta');

        // Pop-up 2: 
        const vocationalPromoOverlay = document.getElementById('vocational-promo-popup-overlay');
        const vocationalPromoPopup = document.getElementById('vocational-promo-popup');
        const vocationalPromoCtaBtn = document.getElementById('vocational-promo-cta-btn');
        const closeVocationalPromoBtn = document.getElementById('close-vocational-promo-btn');
        // --- Funções para o Pop-up de Sugestão Vocacional ---
        const openVocationalPromoPopup = () => {
            vocationalPromoOverlay.classList.remove('hidden');
            // Pequeno delay para garantir que o display foi aplicado antes de iniciar a transição
            setTimeout(() => {
                vocationalPromoOverlay.classList.remove('opacity-0');
                vocationalPromoPopup.classList.remove('scale-95', 'opacity-0');
            }, 50);
        };

        const closeVocationalPromoPopup = () => {
            vocationalPromoPopup.classList.add('scale-95', 'opacity-0');
            vocationalPromoOverlay.classList.add('opacity-0');
            setTimeout(() => {
                vocationalPromoOverlay.classList.add('hidden');
            }, 500);
        };

        // --- Funções para o Pop-up de Evento (1) ---
        const closeEventPopup = () => {
            eventPopupOverlay.classList.add('opacity-0'); // Oculta visualmente o overlay inteiro
            // Espera a transição terminar para esconder o elemento
            setTimeout(() => {
                eventPopupOverlay.style.display = 'none';

                // Abre o pop-up de sugestão vocacional após fechar o de evento
                if (!sessionStorage.getItem('vocationalPopupShown')) {
                    setTimeout(() => {
                        openVocationalPromoPopup();
                        sessionStorage.setItem('vocationalPopupShown', 'true');
                    }, 1500);
                }
            }, 500); // Deve corresponder à duração da transição (500ms)
        };

        const openEventPopup = () => {
            eventPopupOverlay.style.display = 'flex';
            // Pequeno delay para garantir que o display 'flex' foi aplicado antes de iniciar a transição
            setTimeout(() => {
                eventPopupOverlay.classList.remove('opacity-0');
            }, 10); // Delay mínimo
        };

        // --- Controle de Exibição dos Pop-ups ---
        // Verifica se os pop-ups já foram mostrados nesta sessão
        if (!sessionStorage.getItem('eventPopupShown')) {
            // Mostra o primeiro pop-up após um pequeno delay para não sobrecarregar o carregamento inicial
            setTimeout(() => {
                openEventPopup();
                sessionStorage.setItem('eventPopupShown', 'true'); 
            }, 1000); 
        } else if (!sessionStorage.getItem('vocationalPopupShown')) {
            // Se o de evento já foi visto, mostra o vocacional após um tempo
            setTimeout(() => {
                openVocationalPromoPopup();
                sessionStorage.setItem('vocationalPopupShown', 'true');
            }, 3000);
        }

        // --- Event Listeners ---
        closeEventBtn.addEventListener('click', closeEventPopup);
        eventPopupOverlay.addEventListener('click', (event) => {
            if (event.target === eventPopupOverlay) {
                closeEventPopup();
            }
        });

        // Fecha o pop-up ao clicar no botão "Saiba Mais"
        if (eventPopupCta) {
            eventPopupCta.addEventListener('click', closeEventPopup);
        }

        // Botão "Fazer Teste Grátis" no pop-up de sugestão
        vocationalPromoCtaBtn.addEventListener('click', () => {
            closeVocationalPromoPopup();
            // Abre o modal do teste vocacional real
            document.getElementById('open-vocational-test-btn').click();
        });

        closeVocationalPromoBtn.addEventListener('click', closeVocationalPromoPopup);
        vocationalPromoOverlay.addEventListener('click', (event) => {
            if (event.target === vocationalPromoOverlay) {
                closeVocationalPromoPopup();
            }
        });
    })();

    // Iniloba
    // --- Vocational Test Logic ---
    const vocationalOverlay = document.getElementById('vocational-modal-overlay');
    const vocationalModal = document.getElementById('vocational-modal');
    const openVocationalBtn = document.getElementById('open-vocational-test-btn');
    const closeVocationalBtn = document.getElementById('close-vocational-modal-btn');
    
    // Quiz Elements
    const startScreen = document.getElementById('vocational-start');
    const quizScreen = document.getElementById('vocational-quiz');
    const resultScreen = document.getElementById('vocational-result');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    // Result Elements
    const resultCourseName = document.getElementById('result-course-name');
    const resultDescription = document.getElementById('result-description');
    const resultWhatsappLink = document.getElementById('result-whatsapp-link');
    const shareWhatsappBtn = document.getElementById('share-whatsapp');
    const shareTwitterBtn = document.getElementById('share-twitter');
    const downloadResultBtn = document.getElementById('download-result-btn');

    // Chart Elements
    const barAdm = document.getElementById('bar-adm');
    const scoreAdm = document.getElementById('score-adm');
    const barGas = document.getElementById('bar-gas');
    const scoreGas = document.getElementById('score-gas');
    const barSis = document.getElementById('bar-sis');
    const scoreSis = document.getElementById('score-sis');

    // Quiz Data
    const questions = [
        {
            text: "O que você prefere fazer no seu tempo livre?",
            options: [
                { text: "Cozinhar, testar receitas ou assistir vídeos de comida", type: "gastronomia" },
                { text: "Jogar videogame, mexer no computador ou celular", type: "sistemas" },
                { text: "Organizar suas coisas, planejar a semana ou liderar grupos", type: "administracao" }
            ]
        },
        {
            text: "Em um trabalho em grupo, qual papel você geralmente assume?",
            options: [
                { text: "Lidero, organizo as tarefas e garanto que todos cumpram os prazos", type: "administracao" },
                { text: "Cuido da parte visual, criativa ou prática da apresentação", type: "gastronomia" },
                { text: "Fico responsável pela pesquisa técnica, dados e formatação lógica", type: "sistemas" }
            ]
        },
        {
            text: "O que mais te chama atenção em uma carreira?",
            options: [
                { text: "Gerenciar pessoas, negócios e tomar decisões estratégicas", type: "administracao" },
                { text: "Criar experiências sensoriais e trabalhar com arte e cultura", type: "gastronomia" },
                { text: "Resolver problemas complexos e criar inovações tecnológicas", type: "sistemas" }
            ]
        },
        {
            text: "Como você lida com problemas inesperados?",
            options: [
                { text: "Analiso os recursos disponíveis e delego funções para resolver", type: "administracao" },
                { text: "Improviso com criatividade usando o que tenho à mão", type: "gastronomia" },
                { text: "Busco a causa raiz lógica e tento consertar o sistema", type: "sistemas" }
            ]
        },
        {
            text: "Qual disciplina escolar você tem mais afinidade?",
            options: [
                { text: "História, Geografia ou Matemática Financeira", type: "administracao" },
                { text: "Química, Biologia ou Artes", type: "gastronomia" },
                { text: "Física, Matemática ou Informática", type: "sistemas" }
            ]
        },
        {
            text: "Se você fosse abrir um negócio, qual seria?",
            options: [
                { text: "Uma consultoria empresarial ou uma startup de gestão", type: "administracao" },
                { text: "Um restaurante, bistrô ou confeitaria", type: "gastronomia" },
                { text: "Uma empresa de software, aplicativos ou games", type: "sistemas" }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let scores = { administracao: 0, gastronomia: 0, sistemas: 0 };

    if (openVocationalBtn && vocationalOverlay) {
        openVocationalBtn.addEventListener('click', () => {
            vocationalOverlay.classList.remove('hidden');
            setTimeout(() => {
                vocationalOverlay.classList.remove('opacity-0');
                vocationalModal.classList.remove('scale-95', 'opacity-0');
            }, 10);
        });

        // Close Modal
        const closeVocationalModal = () => {
            vocationalModal.classList.add('scale-95', 'opacity-0');
            vocationalOverlay.classList.add('opacity-0');
            setTimeout(() => {
                vocationalOverlay.classList.add('hidden');
                resetQuiz(); // Reset on close
            }, 300);
        };

        closeVocationalBtn.addEventListener('click', closeVocationalModal);
        vocationalOverlay.addEventListener('click', (e) => {
            if (e.target === vocationalOverlay) closeVocationalModal();
        });

        if (downloadResultBtn) {
            downloadResultBtn.addEventListener('click', () => {
                html2canvas(document.getElementById('vocational-result'), { backgroundColor: '#ffffff', scale: 2 }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'Meu-Resultado-ECIT-Prata.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
            });
        }

        // Quiz Logic
        startQuizBtn.addEventListener('click', () => {
            startScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            loadQuestion();
        });

        restartQuizBtn.addEventListener('click', resetQuiz);

        // Helper to get icons for options
        const getIconForType = (type) => {
            const icons = {
                administracao: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`,
                gastronomia: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`, // Using book/menu icon as generic
                sistemas: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
            };
            // Specific override for Gastronomy to look more like food if needed, or keep generic
            if (type === 'gastronomia') {
                 return `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>`;
            }
            return icons[type] || '';
        };

        function loadQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionText.innerText = currentQuestion.text;
            optionsContainer.innerHTML = '';
            
            // Add animation class to container
            quizScreen.classList.remove('quiz-animate-in');
            void quizScreen.offsetWidth; // Trigger reflow
            quizScreen.classList.add('quiz-animate-in');

            // Update Progress
            const progress = ((currentQuestionIndex) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.innerText = `${Math.round(progress)}%`;
            questionCounter.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;

            currentQuestion.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-gray-700 font-medium flex items-center gap-4 group';
                
                // Icon container
                const iconDiv = document.createElement('div');
                iconDiv.className = 'p-2 bg-gray-100 rounded-full text-gray-500 group-hover:bg-blue-200 group-hover:text-blue-700 transition-colors';
                iconDiv.innerHTML = getIconForType(option.type);
                
                const textSpan = document.createElement('span');
                textSpan.innerText = option.text;

                btn.appendChild(iconDiv);
                btn.appendChild(textSpan);
                
                btn.onclick = () => selectOption(option.type, btn);
                optionsContainer.appendChild(btn);
            });
        }

        function selectOption(type, btnElement) {
            // Visual Feedback
            const allBtns = optionsContainer.querySelectorAll('button');
            allBtns.forEach(b => b.disabled = true); // Prevent multiple clicks
            btnElement.classList.remove('border-gray-100', 'hover:border-blue-400');
            btnElement.classList.add('border-blue-600', 'bg-blue-100', 'ring-2', 'ring-blue-200');

            setTimeout(() => {
                scores[type]++;
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    showResult();
                }
            }, 400); // Short delay for better UX
        }

        function showResult() {
            quizScreen.classList.add('hidden');
            resultScreen.classList.remove('hidden');
            
            // Determine winner
            let winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            
            // Content mapping
            const results = {
                administracao: {
                    name: "Técnico em Administração",
                    desc: "Você é um líder nato! Seu perfil indica uma forte capacidade de organização, estratégia e gestão de pessoas. O curso de Administração vai aprimorar sua visão de negócios e prepará-lo para comandar grandes projetos.",
                    msg: "Ol%C3%A1%2C%20fiz%20o%20teste%20vocacional%20e%20deu%20Administra%C3%A7%C3%A3o!%20Quero%20saber%20mais."
                },
                gastronomia: {
                    name: "Técnico em Gastronomia",
                    desc: "Você tem alma de artista e criador! Sua afinidade com processos práticos e sensoriais mostra que a Gastronomia é o seu lugar. Prepare-se para transformar ingredientes em experiências inesquecíveis.",
                    msg: "Ol%C3%A1%2C%20fiz%20o%20teste%20vocacional%20e%20deu%20Gastronomia!%20Quero%20saber%20mais."
                },
                sistemas: {
                    name: "Desenvolvimento de Sistemas",
                    desc: "Você é o futuro da inovação! Seu raciocínio lógico e interesse por tecnologia indicam que você nasceu para o Desenvolvimento de Sistemas. Aqui você aprenderá a criar as soluções digitais que movem o mundo.",
                    msg: "Ol%C3%A1%2C%20fiz%20o%20teste%20vocacional%20e%20deu%20Sistemas!%20Quero%20saber%20mais."
                }
            };

            const result = results[winner];
            resultCourseName.innerText = result.name;
            resultDescription.innerText = result.desc;
            resultWhatsappLink.href = `https://wa.me/558333106928?text=${result.msg}`;

            // Update Share Links
            const shareText = `Fiz o teste vocacional da ECIT Prata e meu perfil ideal é ${result.name}! 🚀 Descubra o seu futuro também.`;
            const shareUrl = window.location.href; // Pega a URL atual do site
            const encodedText = encodeURIComponent(shareText);
            const encodedUrl = encodeURIComponent(shareUrl);

            if(shareWhatsappBtn) shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
            if(shareTwitterBtn) shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

            // Update Chart
            const total = questions.length;
            const admPercent = Math.round((scores.administracao / total) * 100);
            const gasPercent = Math.round((scores.gastronomia / total) * 100);
            const sisPercent = Math.round((scores.sistemas / total) * 100);

            // Use setTimeout to allow transition to happen after display block
            setTimeout(() => {
                if(barAdm) { barAdm.style.width = `${admPercent}%`; scoreAdm.innerText = `${admPercent}%`; }
                if(barGas) { barGas.style.width = `${gasPercent}%`; scoreGas.innerText = `${gasPercent}%`; }
                if(barSis) { barSis.style.width = `${sisPercent}%`; scoreSis.innerText = `${sisPercent}%`; }

                // Trigger Confetti
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#2563eb', '#fbbf24', '#10b981'], // Cores da escola/cursos
                        zIndex: 200 // Garante que apareça acima do modal (z-[110])
                    });
                }
            }, 100);
        }

        function resetQuiz() {
            currentQuestionIndex = 0;
            scores = { administracao: 0, gastronomia: 0, sistemas: 0 };
            resultScreen.classList.add('hidden');
            quizScreen.classList.add('hidden');
            startScreen.classList.remove('hidden');
            
            // Reset bars
            if(barAdm) { barAdm.style.width = '0%'; scoreAdm.innerText = '0%'; }
            if(barGas) { barGas.style.width = '0%'; scoreGas.innerText = '0%'; }
            if(barSis) { barSis.style.width = '0%'; scoreSis.innerText = '0%'; }
        }
    }

    // --- Virtual Tour Logic ---
    const tourThumbnails = document.querySelectorAll('.tour-thumb');
    const tourMainImage = document.getElementById('tour-main-image');
    const tourLightboxLink = document.getElementById('tour-lightbox-link');
    const tourLocationTitle = document.getElementById('tour-location-title');
    
    if(tourThumbnails.length > 0 && tourMainImage) {
        tourThumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Update active state styles
                tourThumbnails.forEach(t => {
                    t.classList.remove('border-blue-500', 'opacity-100');
                    t.classList.add('border-transparent', 'opacity-60');
                });
                thumb.classList.remove('border-transparent', 'opacity-60');
                thumb.classList.add('border-blue-500', 'opacity-100');
                
                // Update title
                const titleSpan = thumb.querySelector('span');
                if (titleSpan && tourLocationTitle) {
                    tourLocationTitle.textContent = titleSpan.textContent;
                }

                // Update main image with fade effect
                const img = thumb.querySelector('img');
                if(img) {
                    tourMainImage.style.opacity = '0.4';
                    setTimeout(() => {
                        tourMainImage.src = img.src;
                        if (tourLightboxLink) {
                            tourLightboxLink.setAttribute('href', img.src);
                            if (typeof refreshFsLightbox === 'function') refreshFsLightbox();
                        }
                        tourMainImage.style.opacity = '0.7';
                    }, 200);
                }
            });
        });
    }

    // Lazy Load Iframes (YouTube & Google Maps)
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframe.onload = () => iframe.classList.remove('opacity-0');
                iframe.removeAttribute('data-src');
                observer.unobserve(iframe);
            }
        });
    }, { rootMargin: '200px' }); // Start loading 200px before viewport

    lazyIframes.forEach(iframe => {
        iframeObserver.observe(iframe);
    });
});
