// Configuração Tailwind extraída de section.html

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#f4c025",
                "background-light": "#f8f8f5",
                "background-dark": "#221e10",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
}

// Botão de voltar para página inicial
document.addEventListener('DOMContentLoaded', function () {
    var backBtn = document.querySelector('.sticky button');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }
});
