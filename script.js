// Obtener los modales y sus elementos
const portfolioModal = document.getElementById('portfolioModal');
const videoModal = document.getElementById('videoModal');
const modalTitle = document.querySelector('#portfolioModal .modal-title');
const modalDescription = document.querySelector('#portfolioModal .modal-description');
const modalImages = document.querySelectorAll('.modal-img');
const closeBtns = document.querySelectorAll('.close');

// Obtener elementos específicos del modal de video
const videoModalTitle = document.querySelector('#videoModal .modal-title');
const videoWrapper = document.querySelector('.video-wrapper');

// Mapeo de IDs de video a archivos locales
const videoSources = {
    'VIDEO_ID_1': 'video/v-pintura.mp4',
    'VIDEO_ID_2': 'video/v-natural.mp4',
    'VIDEO_ID_3': 'video/v-gym.mp4',
    'VIDEO_ID_4': 'video/v-burger.mp4',
    'VIDEO_ID_5': 'video/v-podcast.mp4',
    'VIDEO_ID_6': 'video/v-frape.mp4',
    'VIDEO_ID_7': 'video/v-bank.mp4',
    'VIDEO_ID_8': 'video/v-moto.mp4'
};

// Títulos de los videos
const videoTitles = {
    'VIDEO_ID_1': 'Reel',
    'VIDEO_ID_2': 'Spot',
    'VIDEO_ID_3': 'Reel',
    'VIDEO_ID_4': 'Reel',
    'VIDEO_ID_5': 'Spot - podcast',
    'VIDEO_ID_6': 'Reel',
    'VIDEO_ID_7': 'Reel',
    'VIDEO_ID_8': 'Reel'
};

// Variable para controlar el video actual
let currentVideo = null;

// Datos para los modales - uno por cada tarjeta del portafolio (en el mismo orden que aparecen en el HTML)
const projectsData = [
    // Tarjeta 1: Redes sociales - Caligrafía
    {
        title: 'Redes sociales - Caligrafía',
        description: 'Diseño de publicaciones con caligrafía para redes sociales.',
        images: ['img/19.png', 'img/22.png']
    },
    // Tarjeta 2: Plataforma e-commerce
    {
        title: 'Caligrafía sobre fotografía',
        description: 'Diseño de portadas e ilustración sobre fotografía. Se creo la caligrafía sobre la fotografía.',
        images: ['img/3.png', 'img/2.png']
    },
    // Tarjeta 3: Banners varios
    {
        title: 'Banners para redes sociales',
        description: 'Diseño de banners para abordar el tema sobre las herramientas que ofrece la asociación.',
        images: ['img/banner-mes-AGOSTO--1-.jpg', 'img/banner-mes-AGOSTO--1.jpg']
    },
    // Tarjeta 4: Banners varios 2
    {
        title: 'Banners promocionales',
        description: 'Diseño de banners para el tema sobre la alimentación.',
        images: ['img/banner-mes-JUNIO---3.jpg', 'img/banner-mes-JUNIO---4.jpg']
    },
    // Tarjeta 5: Edición sobre imagen e ilustración
    {
        title: 'Edición sobre imagen e ilustración',
        description: 'Trabajos de edición y manipulación de imágenes con elementos ilustrados.',
        images: ['img/15.png', 'img/18.png']
    },
    // Tarjeta 6: Banners varios 3
    {
        title: 'Banners temáticos',
        description: 'Diseño de banners temático sobre el cuidado de agua.',
        images: ['img/1agua.jpg', 'img/2agua.jpg', 'img/3agua.jpg', 'img/4agua.jpg']
    },
    // Tarjeta 7: Banners GYM
    {
        title: 'Redes sociales - Banners GYM',
        description: 'Diseño de banners para gimnasio y entrenamiento físico.',
        images: ['img/gym1.jpg', 'img/gym2.jpg']
    },
    // Tarjeta 8: Banners varios 4
    {
        title: 'Banners varios',
        description: 'Diseño de banners para diferentes campañas y promociones.',
        images: ['img/bannerJULIO---3.jpg', 'img/bannerJULIO---5.jpg']
    },
    // Tarjeta 9: Banners Depresión
    {
        title: 'Redes sociales - Banners Depresión',
        description: 'Contenido visual para concientización sobre salud mental.',
        images: ['img/diaMundialDepresion.jpg', 'img/diaInternacionaldelaFelicidad.jpg']
    },
    // Tarjeta 10: Banners Perros
    {
        title: 'Redes sociales - Banners Perros',
        description: 'Diseño de contenido para redes sociales sobre cuidado de mascotas.',
        images: ['img/pe4.png']
    },
    // Tarjeta 11: Banners Hor Salud
    {
        title: 'Redes sociales - Banners Hor Salud',
        description: 'Contenido visual para servicios de salud y bienestar.',
        images: ['img/banner-Hor-Salud.jpg']
    },
    // Tarjeta 12: Portadas para podcast
    {
        title: 'Portadas para podcast',
        description: 'Diseño de portadas para episodios de podcast.',
        images: ['img/banner-PODCAST-Cuadrado.jpg']
    }
    
];

// Función para abrir el modal de portafolio
function openPortfolioModal(projectIndex) {
    // Cerrar cualquier modal abierto primero
    closeAllModals();
    
    // Usar el índice del proyecto o el primer proyecto si no existe
    const project = projectsData[projectIndex] || projectsData[0];
    
    // Obtener datos de la tarjeta clickeada como respaldo
    const clickedCard = document.querySelectorAll('.portfolio-container .card:not(.video-card)')[projectIndex];
    const cardTitle = clickedCard ? clickedCard.querySelector('h3')?.textContent || 'Proyecto' : 'Proyecto';
    const cardImage = clickedCard ? clickedCard.querySelector('img')?.src : '';
    
    // Usar título del proyecto o de la tarjeta, y descripción del proyecto
    modalTitle.textContent = project?.title || cardTitle;
    modalDescription.textContent = project?.description || '';
    
    // Establecer las imágenes
    if (project?.images) {
        modalImages.forEach((img, index) => {
            img.src = project.images[index] || project.images[0];
        });
    } else if (cardImage) {
        // Si no hay datos del proyecto pero hay una imagen en la tarjeta
        modalImages.forEach(img => {
            img.src = cardImage;
        });
    }
    
    // Mostrar el modal de portafolio
    portfolioModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir el scroll del fondo
}

// Función para limpiar el video actual
function cleanupCurrentVideo() {
    if (currentVideo) {
        // Pausar y limpiar el video actual
        currentVideo.pause();
        currentVideo.currentTime = 0;
        currentVideo.removeAttribute('src');
        currentVideo.load();
        
        // Eliminar el elemento del DOM
        if (currentVideo.parentNode) {
            currentVideo.parentNode.removeChild(currentVideo);
        }
        
        currentVideo = null;
    }
    
    // Limpiar el contenedor
    if (videoWrapper) {
        videoWrapper.innerHTML = '';
    }
}

// Función para cerrar todos los modales
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        const display = window.getComputedStyle(modal).display;
        if (display === 'flex' || display === 'block') {
            closeModal(modal);
        }
    });
}

// Función para abrir el modal de video
function openVideoModal(videoId) {
    if (!videoId || !videoSources[videoId]) {
        console.error('ID de video no válido:', videoId);
        return;
    }
    
    // Cerrar cualquier modal abierto primero
    closeAllModals();
    
    // Limpiar cualquier video existente primero
    cleanupCurrentVideo();
    
    // Establecer el título del video
    videoModalTitle.textContent = videoTitles[videoId] || 'Video';
    
    // Crear un nuevo elemento de video
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.className = 'video-player';
    
    // Configurar la fuente del video
    const source = document.createElement('source');
    source.src = videoSources[videoId];
    source.type = 'video/mp4'; // Asumimos que todos son MP4 para simplificar
    
    videoElement.appendChild(source);
    
    // Limpiar y agregar el nuevo video al contenedor
    videoWrapper.innerHTML = '';
    videoWrapper.appendChild(videoElement);
    
    // Guardar referencia al video actual
    currentVideo = videoElement;
    
    // Mostrar el modal
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Intentar reproducir automáticamente
    const playPromise = videoElement.play();
    
    // Manejar el error de reproducción automática
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('La reproducción automática falló, se requiere interacción del usuario:', error);
        });
    }
}

// Función para cerrar cualquier modal
function closeModal(modal) {
    if (!modal) return;
    
    // Limpiar el video si es el modal de video
    if (modal === videoModal) {
        cleanupCurrentVideo();
    }
    
    // Ocultar el modal con transición
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        // Solo restablecer el overflow si no hay otros modales abiertos
        if (!document.querySelector('.modal[style*="display: flex"], .modal[style*="display:block"]')) {
            document.body.style.overflow = 'auto';
        }
    }, 200);
}

// Delegación de eventos para manejar clics en las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el modal de video y sus elementos
    const videoModal = document.getElementById('videoModal');
    
    // Función para cerrar el modal de video
    const closeVideoModal = () => {
        cleanupCurrentVideo();
        
        // Ocultar el modal con transición suave
        videoModal.style.opacity = '0';
        setTimeout(() => {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 200);
    };
    
    // Función para centrar el modal
    const centerVideoModal = () => {
        if (videoModal.style.display === 'flex') {
            const modalContent = videoModal.querySelector('.video-modal-content');
            if (modalContent) {
                const windowHeight = window.innerHeight;
                const modalHeight = modalContent.offsetHeight;
                const topPosition = Math.max(20, (windowHeight - modalHeight) / 2);
                modalContent.style.marginTop = `${topPosition}px`;
            }
        }
    };
    
    // Ajustar el centrado al cambiar el tamaño de la ventana
    window.addEventListener('resize', centerVideoModal);
    
    // Cerrar al hacer clic en la X
    const closeBtn = videoModal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeVideoModal;
    }
    
    // Cerrar al hacer clic fuera del contenido del modal
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });
    
    // Obtener todos los contenedores de portafolio
    const portfolioContainers = document.querySelectorAll('.portfolio-container');
    
    // Configurar manejadores de eventos para cada contenedor
    portfolioContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            const card = e.target.closest('.card');
            if (!card) return;
            
            // Verificar si es una tarjeta de video
            if (card.classList.contains('video-card')) {
                e.preventDefault();
                const videoId = card.getAttribute('data-video-id');
                if (videoId) {
                    openVideoModal(videoId);
                    // Forzar el centrado después de abrir
                    setTimeout(centerVideoModal, 10);
                }
                return;
            }
            
            // Si es una tarjeta normal del portafolio
            const cards = Array.from(container.querySelectorAll('.card:not(.video-card)'));
            const index = cards.indexOf(card);
            console.log('Portfolio card clicked, index:', index, 'Total cards:', cards.length);
            
            if (index !== -1) {
                openPortfolioModal(index);
            } else {
                console.error('No se pudo determinar el índice de la tarjeta');
            }
        });
    });

    // Cerrar modales al hacer clic en la X
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Close button clicked'); // Debug
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            } else {
                console.error('No se pudo encontrar el modal padre');
            }
        });
    });

    // Cerrar modales al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            // Cerrar solo el modal en el que se hizo clic
            closeModal(event.target);
            // Prevenir que el evento se propague a otros manejadores
            event.stopPropagation();
        }
    });

    // Cerrar modales con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal');
            openModals.forEach(modal => {
                if (window.getComputedStyle(modal).display === 'flex' || window.getComputedStyle(modal).display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
});
