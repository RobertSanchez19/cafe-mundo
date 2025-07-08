// === HELPER FUNCTIONS FOR THEME ===
function updateContactFormColors(theme) {
    // Verificar que el tema sea válido
    if (!theme || (theme !== 'dark' && theme !== 'light')) {
        return;
    }
    
    try {
        // Colores para modo oscuro y claro
        const colors = {
            dark: {
                text: '#e9ecef',
                background: '#1e1e1e',
                border: '#404040',
                placeholder: '#adb5bd',
                mutedText: '#adb5bd'
            },
            light: {
                text: '#333',
                background: '#fff',
                border: '#dee2e6',
                placeholder: '#6c757d',
                mutedText: '#6c757d'
            }
        };
        
        const currentColors = colors[theme];
        
        // Actualizar inputs del formulario /Intento de correccion uno/ IDEA DE ACTUALIZAR TODO SI EXISTE
        const formInputs = document.querySelectorAll('.form-control, .form-select');
        formInputs.forEach(input => {
            if (input) {
                input.style.setProperty('color', currentColors.text, 'important');
                input.style.setProperty('background-color', currentColors.background, 'important');
                input.style.setProperty('border-color', currentColors.border, 'important');
            }
        });
        
        // Actualizar labels 
        const formLabels = document.querySelectorAll('.form-label, label, .form-check-label');
        formLabels.forEach(label => {
            if (label) {
                label.style.setProperty('color', currentColors.text, 'important');
            }
        });
        
        // Actualizar texto de ayuda 
        const helpTexts = document.querySelectorAll('.form-text, .small, .text-muted');
        helpTexts.forEach(text => {
            if (text) {
                text.style.setProperty('color', currentColors.mutedText, 'important');
            }
        });
        
        // Actualizar elementos de contacto 
        const contactItems = document.querySelectorAll('.contact-item, .contact-item div, .contact-item strong');
        contactItems.forEach(item => {
            if (item) {
                item.style.setProperty('color', currentColors.text, 'important');
            }
        });
        
        // Actualizar cards 
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (card) {
                card.style.setProperty('background-color', currentColors.background, 'important');
                card.style.setProperty('border-color', currentColors.border, 'important');
            }
        });
        
        // Actualizar texto en cards 
        const cardTexts = document.querySelectorAll('.card-body, .card-text, .card-title, .card-footer');
        cardTexts.forEach(element => {
            if (element) {
                element.style.setProperty('color', currentColors.text, 'important');
            }
        });
    } catch (error) {
        console.log('Error al actualizar colores del formulario:', error);
    }
}

function updateTextColors(theme) {
    // Verificar que el tema sea válido
    if (!theme || (theme !== 'dark' && theme !== 'light')) {
        return;
    }
    
    try {
        const textColor = theme === 'dark' ? '#e9ecef' : '#333';
        const mutedColor = theme === 'dark' ? '#adb5bd' : '#6c757d';
        
        // Actualizar textos generales 
        const textElements = document.querySelectorAll(
            '.card-text, .article-meta, .card-body p, .card-body h5, .card-body h6, ' +
            '.modal-body p, .modal-body h4, .modal-body h5, .modal-body h6, .modal-body li, ' +
            '.breadcrumb-item, .card-footer, p, .lead'
        );
        
        textElements.forEach(element => {
            if (element) {
                if (element.classList.contains('text-muted')) {
                    element.style.setProperty('color', mutedColor, 'important');
                } else {
                    element.style.setProperty('color', textColor, 'important');
                }
            }
        });
        
        // Actualizar elementos de modales 
        const modalElements = document.querySelectorAll('.modal-body *');
        modalElements.forEach(element => {
            if (element && (element.tagName === 'P' || element.tagName === 'LI' || 
                element.tagName === 'H4' || element.tagName === 'H5' || element.tagName === 'H6')) {
                element.style.setProperty('color', textColor, 'important');
            }
        });
        
        // Actualizar labels del formulario específicamente
        const formLabels = document.querySelectorAll('.form-label, label, .form-check-label');
        formLabels.forEach(label => {
            if (label) {
                label.style.setProperty('color', textColor, 'important');
            }
        });
        
        // Actualizar placeholders (esto requiere CSS, pero podemos forzar el color del input)
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input) {
                input.style.setProperty('color', textColor, 'important');
            }
        });
        
    } catch (error) {
        console.log('Error al actualizar colores de texto:', error);
    }
}

// === DARK MODE FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Verificar que el botón existe
    if (!darkModeToggle) {
        return;
    }
    
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    const text = darkModeToggle.querySelector('.dark-mode-text');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon and text based on current theme
    updateDarkModeButton(currentTheme);
    
    // Apply colors on page load
    setTimeout(() => {
        updateContactFormColors(currentTheme);
        updateTextColors(currentTheme);
    }, 100);
    
    // Dark mode toggle event listener
    darkModeToggle.addEventListener('click', function() {
        try {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateDarkModeButton(newTheme);
            
            // Update colors with delay to ensure DOM is ready
            setTimeout(() => {
                updateContactFormColors(newTheme);
                updateTextColors(newTheme);
            }, 50);
            
            // Show confirmation alert
            showAlert(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 'success');
        } catch (error) {
            console.log('Error al cambiar modo:', error);
        }
    });
    
    function updateDarkModeButton(theme) {
        try {
            if (!icon || !text) return;
            
            if (theme === 'dark') {
                icon.className = 'bi bi-sun-fill';
                text.textContent = 'MODO CLARO 🔆';
            } else {
                icon.className = 'bi bi-moon-fill';
                text.textContent = 'MODO OSCURO 🌙';
            }
        } catch (error) {
            console.log('Error al actualizar botón:', error);
        }
    }
});

// === WELCOME MODAL ===
function showWelcomeModal() {
    const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();
}

// === SMOOTH SCROLLING ===
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    } else {
        navbar.style.background = '';
    }
});

// === ALERT SYSTEM ===
function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertContainer.style.cssText = `
        top: 100px; 
        right: 20px; 
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
    `;
    
    alertContainer.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertContainer && alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, 3000);
}

// === LOADING ANIMATIONS ===
function animateOnScroll() {
    const elements = document.querySelectorAll('.loading');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('show');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// === CONTACT FORM VALIDATION ===
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Reset previous validation
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    
    // Name validation
    if (!name.value.trim()) {
        showFieldError(name, 'Por favor ingresa tu nombre');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showFieldError(email, 'Por favor ingresa tu email');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showFieldError(email, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Message validation
    if (!message.value.trim()) {
        showFieldError(message, 'Por favor ingresa tu mensaje');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    if (isValid) {
        // Create mailto link
        const subject = 'Contacto desde Café Mundo';
        const body = `Hola,

Mi nombre es: ${name.value}
Email: ${email.value}

Mensaje:
${message.value}

Saludos cordiales.`;
        
        const mailtoLink = `mailto:rs24-0177@unphu.edu.do?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        showAlert('Abriendo cliente de correo...', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
    }
    
    return false; // Prevent form submission
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// === ENHANCED SEARCH FUNCTIONALITY ===
let searchTimeout;
function searchArticles() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const articles = document.querySelectorAll('.article-card');
        let visibleCount = 0;
        
        articles.forEach(article => {
            const title = article.querySelector('h5')?.textContent.toLowerCase() || '';
            const content = article.querySelector('.card-text')?.textContent.toLowerCase() || '';
            const badge = article.querySelector('.badge')?.textContent.toLowerCase() || '';
            
            const isVisible = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            content.includes(searchTerm) || 
                            badge.includes(searchTerm);
            
            const cardContainer = article.closest('.col-lg-4, .col-md-6, .col-12');
            if (cardContainer) {
                cardContainer.style.display = isVisible ? 'block' : 'none';
                if (isVisible) visibleCount++;
            }
        });
        
        // Show results message
        const resultsMessage = document.getElementById('searchResults');
        if (resultsMessage) {
            if (searchTerm) {
                const alertClass = visibleCount > 0 ? 'alert-info' : 'alert-warning';
                const message = visibleCount > 0 ? 
                    `Se encontraron ${visibleCount} artículo(s) para "${searchTerm}"` :
                    `No se encontraron resultados para "${searchTerm}"`;
                    
                resultsMessage.innerHTML = `
                    <div class="alert ${alertClass}">
                        <i class="bi bi-search me-2"></i>
                        ${message}
                    </div>
                `;
            } else {
                resultsMessage.innerHTML = '';
            }
        }
        
        // Add animation to visible cards
        const visibleCards = document.querySelectorAll('.article-card:not([style*="display: none"])');
        visibleCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.3s ease-out forwards';
            }, index * 50);
        });
    }, 300);
}

// === ENHANCED COFFEE TIMER FUNCTIONALITY ===
let timerInterval;
let timerSeconds = 0;
let timerAudio;
let timerStartTime;

function initializeTimer() {
    // Create audio context for timer sounds (optional)
    try {
        timerAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCDuY2/LFeSUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFA==');
    } catch (e) {
        console.log('Audio not supported');
    }
}

function startCoffeeTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerSeconds = 0;
    timerStartTime = Date.now();
    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startTimer');
    const stopBtn = document.getElementById('stopTimer');
    
    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
    
    timerInterval = setInterval(() => {
        timerSeconds++;
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Visual feedback and alerts at key intervals
        if (timerSeconds === 30) {
            showAlert('30 segundos - Tiempo ideal para espresso ⏰', 'info');
            if (timerDisplay) {
                timerDisplay.style.color = '#0dcaf0';
                setTimeout(() => {
                    if (timerDisplay) timerDisplay.style.color = '';
                }, 1000);
            }
        } else if (timerSeconds === 120) {
            showAlert('2 minutos - Tiempo mínimo pour-over ⏰', 'info');
        } else if (timerSeconds === 180) {
            showAlert('3 minutos - Tiempo ideal pour-over ⏰', 'warning');
        } else if (timerSeconds === 240) {
            showAlert('4 minutos - Tiempo ideal prensa francesa ⏰', 'success');
            if (timerDisplay) {
                timerDisplay.style.color = '#198754';
                setTimeout(() => {
                    if (timerDisplay) timerDisplay.style.color = '';
                }, 1000);
            }
        }
        
        // Visual feedback every 30 seconds after 4 minutes
        if (timerSeconds > 240 && timerSeconds % 30 === 0) {
            if (timerDisplay) {
                timerDisplay.style.color = '#dc3545';
                setTimeout(() => {
                    if (timerDisplay) timerDisplay.style.color = '';
                }, 500);
            }
        }
    }, 1000);
    
    showAlert('⏱️ Temporizador de café iniciado', 'success');
}

function stopCoffeeTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const startBtn = document.getElementById('startTimer');
    const stopBtn = document.getElementById('stopTimer');
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (startBtn) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
    
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Determine brewing method based on time
    let brewingMethod = '';
    let feedback = '';
    if (timerSeconds <= 35) {
        brewingMethod = 'Espresso';
        feedback = timerSeconds >= 25 && timerSeconds <= 30 ? '✅ Tiempo perfecto' : 
                  timerSeconds < 25 ? '⚠️ Muy rápido - molienda más fina' : '⚠️ Muy lento - molienda más gruesa';
    } else if (timerSeconds <= 90) {
        brewingMethod = 'AeroPress';
        feedback = '✅ Tiempo adecuado para AeroPress';
    } else if (timerSeconds <= 210) {
        brewingMethod = 'Pour-over (corto)';
        feedback = '⚠️ Tiempo corto para pour-over';
    } else if (timerSeconds <= 270) {
        brewingMethod = 'Pour-over';
        feedback = '✅ Tiempo ideal para pour-over';
    } else if (timerSeconds <= 300) {
        brewingMethod = 'Prensa Francesa';
        feedback = '✅ Tiempo perfecto para prensa francesa';
    } else {
        brewingMethod = 'Inmersión larga';
        feedback = '⏰ Tiempo largo - posible sobreextracción';
    }
    
    // Reset timer display color
    if (timerDisplay) {
        timerDisplay.style.color = '';
    }
    
    // Play sound if available
    if (timerAudio) {
        try {
            timerAudio.play();
        } catch (e) {
            console.log('Audio play failed');
        }
    }
    
    // Show detailed completion message
    const alertType = feedback.includes('✅') ? 'success' : 'warning';
    showAlert(`⏰ ${brewingMethod}: ${timeString}<br><small>${feedback}</small>`, alertType);
    
    // Reset timer after 3 seconds
    setTimeout(() => {
        if (timerDisplay && !timerInterval) {
            timerDisplay.textContent = '00:00';
        }
    }, 3000);
}

// === ENHANCED COFFEE CALCULATOR ===
function calculateCoffeeRatio() {
    const water = parseFloat(document.getElementById('waterAmount')?.value || 0);
    const ratio = parseFloat(document.getElementById('coffeeRatio')?.value || 16);
    const resultDiv = document.getElementById('coffeeResult');
    
    if (!resultDiv) return;
    
    if (water && ratio && water > 0) {
        const coffee = water / ratio;
        const strength = ratio <= 15 ? 'Fuerte' : ratio >= 17 ? 'Suave' : 'Equilibrado';
        const color = ratio <= 15 ? 'success' : ratio >= 17 ? 'info' : 'warning';
        
        // Determinar método recomendado
        let recommendedMethod = '';
        if (ratio <= 15) {
            recommendedMethod = 'Ideal para espresso o métodos de concentración';
        } else if (ratio <= 16) {
            recommendedMethod = 'Perfecto para pour-over y métodos de filtro';
        } else {
            recommendedMethod = 'Excelente para prensa francesa o cold brew';
        }
        
        // Calcular tiempo aproximado de extracción
        let extractionTime = '';
        if (ratio <= 15) {
            extractionTime = '25-30 segundos (espresso)';
        } else if (ratio <= 16) {
            extractionTime = '2:30-3:30 minutos (pour-over)';
        } else {
            extractionTime = '4-6 minutos (inmersión)';
        }
        
        resultDiv.innerHTML = `
            <div class="alert alert-${color}">
                <i class="bi bi-calculator me-2"></i>
                <strong>Resultado del Cálculo:</strong><br>
                <div class="row mt-2">
                    <div class="col-6">
                        <strong>Agua:</strong> ${water}ml<br>
                        <strong>Café:</strong> ${coffee.toFixed(1)}g
                    </div>
                    <div class="col-6">
                        <strong>Ratio:</strong> 1:${ratio}<br>
                        <strong>Perfil:</strong> ${strength}
                    </div>
                </div>
                <hr class="my-2">
                <small class="text-muted">
                    <i class="bi bi-info-circle me-1"></i>
                    ${recommendedMethod}<br>
                    <i class="bi bi-clock me-1"></i>
                    Tiempo estimado: ${extractionTime}
                </small>
            </div>
        `;
        
        // Mostrar alerta de éxito
        showAlert(`Calculado: ${coffee.toFixed(1)}g de café para ${water}ml de agua`, 'success');
        
    } else {
        resultDiv.innerHTML = `
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle me-2"></i>
                <strong>Error en el cálculo</strong><br>
                Por favor ingresa una cantidad válida de agua (mayor que 0)
            </div>
        `;
    }
}

// === ENHANCED RANDOM COFFEE TIP ===
function showRandomTip() {
    const tips = [
        "La temperatura ideal del agua para preparar café está entre 90-96°C",
        "Los granos de café molidos justo antes de preparar conservan mejor su sabor",
        "El café Arábica tiene menos cafeína que el Robusta pero más sabor",
        "Un espresso perfecto se extrae en 25-30 segundos",
        "Almacena el café en un lugar fresco, seco y oscuro",
        "La proporción dorada es 1:15 a 1:17 (café:agua)",
        "El primer 'crack' en el tostado indica que el café está listo",
        "El café recién tostado necesita 'desgasificar' por 24-48 horas",
        "El café es la segunda mercancía más comercializada del mundo",
        "Los finlandeses consumen más café per cápita que cualquier otro país",
        "La molienda consistente es más importante que el tamaño exacto",
        "El agua representa más del 98% de tu taza de café",
        "La crema del espresso debe tener un color avellana dorado",
        "El café verde puede almacenarse hasta un año sin perder calidad",
        "La altitud afecta el sabor: mayor altura = más acidez",
        "El café lavado tiene sabores más limpios que el natural",
        "Un tamper de 30 libras de presión es ideal para espresso",
        "El café frío extrae más lentamente pero puede ser más dulce",
        "Las variedades heirloom tienen sabores más complejos",
        "El cupping profesional requiere café a 93.3°C exactamente"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    // Si estamos en la página de herramientas, actualizar el elemento específico
    const tipContent = document.getElementById('tipContent');
    if (tipContent) {
        tipContent.style.transition = 'opacity 0.3s ease';
        tipContent.style.opacity = '0';
        
        setTimeout(() => {
            tipContent.textContent = randomTip;
            tipContent.style.opacity = '1';
        }, 300);
        
        showAlert('¡Nuevo consejo actualizado!', 'success');
        return;
    }
    
    // Si no estamos en herramientas, mostrar modal como antes
    const tipModal = document.createElement('div');
    tipModal.className = 'modal fade';
    tipModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="bi bi-lightbulb-fill text-warning me-2"></i>
                        Consejo del Día
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">${randomTip}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        ¡Gracias!
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(tipModal);
    const modal = new bootstrap.Modal(tipModal);
    modal.show();
    
    // Remove modal from DOM after hiding
    tipModal.addEventListener('hidden.bs.modal', () => {
        tipModal.remove();
    });
}

// === ENHANCED COFFEE FACTS WITH ROTATION ===
function showCoffeeFacts() {
    const facts = [
        "El café es la segunda mercancía más comercializada del mundo después del petróleo",
        "Los finlandeses consumen más café per cápita que cualquier otro país del mundo",
        "El café fue descubierto en Etiopía por un pastor llamado Kaldi según la leyenda",
        "Una taza de café contiene más de 1000 compuestos químicos diferentes",
        "El café decafeinado contiene entre 2-12mg de cafeína por taza",
        "Brasil produce aproximadamente un tercio del café mundial",
        "El café puede mantenerte alerta por 6 horas después de consumirlo",
        "La palabra 'café' deriva del término árabe 'qahwa'",
        "El café Robusta tiene el doble de cafeína que el Arábica",
        "La primera cafetería del mundo abrió en Constantinopla en 1475"
    ];
    
    let currentFact = 0;
    const factDisplay = document.getElementById('coffeeFactDisplay');
    
    if (factDisplay) {
        const showNextFact = () => {
            factDisplay.style.transition = 'opacity 0.3s ease';
            factDisplay.style.opacity = '0';
            
            setTimeout(() => {
                factDisplay.textContent = facts[currentFact];
                factDisplay.style.opacity = '1';
                currentFact = (currentFact + 1) % facts.length;
            }, 300);
        };
        
        // Show initial fact
        showNextFact();
        
        // Auto rotate facts every 5 seconds
        setInterval(showNextFact, 5000);
    }
}

// === SOCIAL SHARING ===
function shareOnSocial(platform) {
    const url = encodeURIComponent('https://robertsanchez19.github.io/cafe-mundo/');
    const title = encodeURIComponent('Café Mundo - El Viaje Perfecto del Grano a la Taza');
    const description = encodeURIComponent('Descubre el fascinante mundo del café con nuestra guía completa');
    
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/18094079575?text=${title}%20${url}`;
            break;
        case 'instagram':
            // Open Instagram with username
            window.open('https://instagram.com/robertsanchezg', '_blank');
            showAlert('Síguenos en Instagram @robertsanchezg', 'info');
            return;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    showAlert(`Compartiendo en ${platform}`, 'success');
}

// === COPY TO CLIPBOARD FUNCTION ===
function copyToClipboard(text) {
    if (!text) {
        const urlInput = document.querySelector('input[readonly]');
        if (urlInput) {
            text = urlInput.value;
            urlInput.select();
            urlInput.setSelectionRange(0, 99999);
        }
    }
    
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showAlert('URL copiada al portapapeles', 'success');
            });
        } else {
            // Fallback for older browsers
            document.execCommand('copy');
            showAlert('URL copiada al portapapeles', 'success');
        }
    } catch (err) {
        showAlert('Error al copiar la URL', 'error');
    }
}

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements with loading class
        document.querySelectorAll('.loading').forEach(el => {
            observer.observe(el);
        });
    }
}

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    // Solo mostrar alertas para errores críticos, no para errores menores
    if (e.error && e.error.name && (e.error.name === 'TypeError' || e.error.name === 'ReferenceError')) {
        console.error('Error capturado:', e.error);
        // Comentamos la alerta para evitar mostrar errores menores
        // showAlert('Ha ocurrido un error. Por favor recarga la página.', 'warning');
    }
});

// === ACCESSIBILITY IMPROVEMENTS ===
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const modal = bootstrap.Modal.getInstance(openModal);
            if (modal) modal.hide();
        }
    }
    
    // Enter key for buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// === PERFORMANCE OPTIMIZATION ===
// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('Café Mundo - Sitio web cargado correctamente ☕');
    console.log('Desarrollado por Robert Sanchez - Universidad Nacional Pedro Henríquez Ureña');
    
    try {
        // Initialize all components
        initializeTimer();
        initScrollAnimations();
        
        // Initialize coffee facts if element exists
        if (document.getElementById('coffeeFactDisplay')) {
            showCoffeeFacts();
        }
        
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Initialize search input listener
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', searchArticles);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchArticles();
                }
            });
        }
        
        // Add loading animations to elements
        const animatedElements = document.querySelectorAll('.card, .brewing-icon, .hero-content, .article-card');
        animatedElements.forEach(el => {
            if (!el.classList.contains('loading')) {
                el.classList.add('loading');
            }
        });
        
        // Trigger initial animation check
        setTimeout(() => {
            initScrollAnimations();
            animateOnScroll();
        }, 100);
        
        // Auto-focus search input on articles page
        if (window.location.pathname.includes('articulos.html') && searchInput) {
            setTimeout(() => searchInput.focus(), 500);
        }
        
        // Initialize tooltips if Bootstrap is available
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
        
        // Apply theme colors with delay to ensure all elements are loaded
        setTimeout(() => {
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            updateContactFormColors(theme);
            updateTextColors(theme);
        }, 1000);
        
    } catch (error) {
        console.log('Error en inicialización:', error);
    }
});
