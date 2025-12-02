/* ========================================
   HYGUINHO QUADRICICLOS - JAVASCRIPT MODERNO
   Interações, Animações e Funcionalidades
   ======================================== */

(function() {
    'use strict';

    // ====== CONFIGURAÇÃO INICIAL ======
    const state = {
        isMenuOpen: false,
        scrollY: 0,
        theme: localStorage.getItem('theme') || 'light'
    };

    // ====== INICIALIZAÇÃO ======
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
        initMobileMenu();
        initScrollEffects();
        initParallax();
        initAnimations();
        initLazyLoading();
        initSmoothScroll();
    });

    // ====== TEMA ESCURO/CLARO ======
    function initTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('theme-toggle');
        
        // Aplica tema salvo
        if (state.theme === 'dark') {
            html.classList.add('dark');
        }

        // Toggle de tema
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                html.classList.toggle('dark');
                state.theme = html.classList.contains('dark') ? 'dark' : 'light';
                localStorage.setItem('theme', state.theme);
                
                // Atualiza ícone
                const icon = themeToggle.querySelector('.material-symbols-rounded');
                if (icon) {
                    icon.textContent = state.theme === 'dark' ? 'light_mode' : 'dark_mode';
                }
            });
        }
    }

    // ====== MENU MOBILE ======
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuPanel = document.getElementById('menu-panel');
        const menuBackdrop = document.getElementById('menu-backdrop');

        if (!menuToggle || !mobileMenu) return;

        // Abrir menu
        menuToggle.addEventListener('click', () => {
            state.isMenuOpen = true;
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Fechar menu
        const closeMenu = () => {
            state.isMenuOpen = false;
            mobileMenu.classList.remove('active');
            if (menuPanel) menuPanel.style.transform = '';
            document.body.style.overflow = '';
        };

        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }

        if (menuBackdrop) {
            menuBackdrop.addEventListener('click', closeMenu);
        }

        // Fechar ao clicar em links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!link.hasAttribute('target')) {
                    closeMenu();
                }
            });
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isMenuOpen) {
                closeMenu();
            }
        });
    }

    // ====== EFEITOS DE SCROLL ======
    function initScrollEffects() {
        const header = document.getElementById('main-header');
        let lastScrollY = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            state.scrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        function updateHeader() {
            if (!header) return;

            // Adiciona classe quando rolar
            if (state.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Esconde header ao rolar para baixo (opcional)
            // if (state.scrollY > lastScrollY && state.scrollY > 100) {
            //     header.style.transform = 'translateY(-100%)';
            // } else {
            //     header.style.transform = 'translateY(0)';
            // }

            lastScrollY = state.scrollY;
        }
    }

    // ====== PARALLAX NO HERO ======
    function initParallax() {
        const heroBg = document.getElementById('hero-bg');
        if (!heroBg) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const parallaxSpeed = 0.5;
                    heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ====== ANIMAÇÕES AO SCROLL (INTERSECTION OBSERVER) ======
    function initAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Adiciona delay escalonado
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observa elementos com classe reveal
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        // Adiciona classe reveal automaticamente em cards, sections, etc
        const autoReveal = document.querySelectorAll('section > div > div, .grid > div');
        autoReveal.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
                observer.observe(el);
            }
        });
    }

    // ====== LAZY LOADING DE IMAGENS ======
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-lazy]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-lazy');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-lazy');
                            img.classList.add('loaded');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antigos
            images.forEach(img => {
                const src = img.getAttribute('data-lazy');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-lazy');
                }
            });
        }
    }

    // ====== SMOOTH SCROLL ======
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.getElementById('main-header')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ====== UTILITÁRIOS ======
    
    // Debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ====== PERFORMANCE ======
    
    // Pré-carrega links importantes
    const importantLinks = document.querySelectorAll('a[href$=".html"]');
    if ('IntersectionObserver' in window) {
        const linkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = entry.target;
                    const href = link.getAttribute('href');
                    
                    if (href && !href.startsWith('http')) {
                        const linkTag = document.createElement('link');
                        linkTag.rel = 'prefetch';
                        linkTag.href = href;
                        document.head.appendChild(linkTag);
                    }
                    
                    linkObserver.unobserve(link);
                }
            });
        });

        importantLinks.forEach(link => linkObserver.observe(link));
    }

    // ====== ANALYTICS (OPCIONAL) ======
    
    // Rastreia cliques em CTAs
    const ctaButtons = document.querySelectorAll('a[href*="wa.me"], a[href^="tel:"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.href.includes('wa.me') ? 'WhatsApp Click' : 'Phone Click';
            console.log('CTA Click:', action);
            // Aqui você pode adicionar Google Analytics, Facebook Pixel, etc.
        });
    });

})();
