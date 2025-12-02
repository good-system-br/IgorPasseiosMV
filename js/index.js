// Configuração Tailwind extraída de index.html

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#f4c025",
                "background-light": "#f8f8f5",
                "background-dark": "#221e10",
                "surface": "#ffffff",
                "surface-dark": "#2a261a",
                "text-primary-light": "#181611",
                "text-primary-dark": "#f8f8f5",
                "text-secondary-light": "#8a8060",
                "text-secondary-dark": "#a19a81",
                "border-light": "#e6e3db",
                "border-dark": "#4d4632"
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
}

// Menu hambúrguer para mobile
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');

    // Links do menu
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (menuToggle && mobileMenu && menuClose) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.style.transform = 'translateY(0)';
        });
        menuClose.addEventListener('click', function () {
            mobileMenu.style.transform = 'translateY(-100%)';
        });
        // Fecha o menu ao clicar fora dele
        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu) {
                mobileMenu.style.transform = 'translateY(-100%)';
            }
        });

        // Navegação entre páginas pelo menu
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Se for link interno, navega e fecha menu
                if (link.getAttribute('href') === '#') {
                    window.location.href = 'index.html';
                } else if (link.getAttribute('href') && !link.getAttribute('target')) {
                    window.location.href = link.getAttribute('href');
                }
                mobileMenu.style.transform = 'translateY(-100%)';
            });
        });
    }
});
