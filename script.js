document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica para las pestañas de la sección El Módulo ---
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(tab.getAttribute('data-tab'));
            target.classList.add('active');
        });
    });

    // --- Lógica para el Gráfico de Ventajas (Chart.js) ---
    const ctx = document.getElementById('advantagesChart').getContext('2d');
    const advantagesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Costo Estructural', 'Tiempo de Ejecución', 'Residuos de Construcción'],
            datasets: [{
                label: 'Construcción Tradicional (Base 100%)',
                data: [100, 100, 100],
                backgroundColor: '#94a3b8', // slate-400
                borderColor: '#e2e8f0', // slate-200
                borderWidth: 1,
                borderRadius: 4,
            }, {
                label: 'Construcción con Contenedores',
                data: [30, 40, 10], // Representa >70% de reducción, 60% de reducción, etc.
                backgroundColor: '#10b981', // emerald-500
                borderColor: '#a7f3d0', // emerald-200
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) { return value + '%' }
                    },
                    title: {
                        display: true,
                        text: 'Índice Relativo (Tradicional = 100%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Análisis Comparativo de Construcción',
                    font: { size: 18 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.datasetIndex === 0) {
                                    label += '100% (Base de Referencia)';
                                } else {
                                     const reduction = 100 - context.parsed.y;
                                     label += `${context.parsed.y}% del costo/tiempo (Reducción de ~${reduction}%)`;
                                }
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
    
    // --- Lógica para la animación de entrada al hacer scroll ---
    const faders = document.querySelectorAll('.fade-in');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    faders.forEach(fader => {
        scrollObserver.observe(fader);
    });

    // --- Lógica para resaltar el enlace de navegación activo al hacer scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 70) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- NUEVA LÓGICA PARA EL REPRODUCTOR DE AUDIO ---
    const audioPlayer = document.getElementById('audio-player');
    const audioButton = document.getElementById('audio-toggle-button');
    const audioIcon = document.getElementById('audio-icon');

    const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    
    // Establecer el ícono inicial de "play"
    audioIcon.innerHTML = playIcon;

    audioButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            audioIcon.innerHTML = pauseIcon;
        } else {
            audioPlayer.pause();
            audioIcon.innerHTML = playIcon;
        }
    });

    // Opcional: Cuando el audio termine, volver al ícono de "play"
    audioPlayer.addEventListener('ended', function() {
        audioIcon.innerHTML = playIcon;
    });
});
