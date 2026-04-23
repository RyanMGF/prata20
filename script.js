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

    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            courseTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.add('bg-primary-yellow', 'text-primary-blue');
                t.classList.remove('bg-primary-red', 'text-white');
            });
            tab.classList.add('active');
            tab.classList.remove('bg-primary-yellow', 'text-primary-blue');
            tab.classList.add('bg-primary-red', 'text-white');

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

    // Iniloba
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
