// === ⚙️ SISTEMA DEMO ===
const DEMO_ENABLED = true;   // ← Cambia a false para desactivar DEMO y ocultar el banner
const DEMO_DAYS = 7;        // Días de prueba

function initDemo() {
    if (!DEMO_ENABLED) return null;

    const now = new Date();
    const demoKey = 'autobuses_lebrija_demo_2026';
    const stored = localStorage.getItem(demoKey);

    let startDate, daysLeft;

    if (stored) {
        startDate = new Date(parseInt(stored));
        const elapsed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        daysLeft = Math.max(0, DEMO_DAYS - elapsed);
    } else {
        startDate = now;
        localStorage.setItem(demoKey, startDate.getTime().toString());
        daysLeft = DEMO_DAYS;
    }

    return { isActive: daysLeft > 0, daysLeft, startDate };
}

const demo = initDemo();

// === 🔒 SISTEMA DE SEGURIDAD: SOLO FUNCIONA ONLINE ===
(function() {
    // Desregistrar TODOS los Service Workers existentes
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister().then(() => {
                    console.log('Service Worker desregistrado y caché eliminado');
                    // Eliminar todos los cachés
                    if (window.caches) {
                        caches.keys().then(cacheNames => {
                            cacheNames.forEach(cacheName => {
                                caches.delete(cacheName);
                            });
                        });
                    }
                });
            });
        }).catch(err => console.error('Error desregistrando SW:', err));
    }

    // Verificar conexión a internet al cargar
    function checkConnection() {
        const statusElement = document.getElementById('connection-status');
        
        if (!navigator.onLine) {
            // Mostrar mensaje de error
            if (!statusElement) {
                const errorDiv = document.createElement('div');
                errorDiv.id = 'connection-status';
                errorDiv.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(135deg, #ff4444, #cc0000);
                    color: white;
                    text-align: center;
                    padding: 15px;
                    font-weight: bold;
                    font-size: 1.1rem;
                    z-index: 10000;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                `;
                errorDiv.innerHTML = '⚠️ SIN CONEXIÓN A INTERNET - Esta aplicación requiere conexión para funcionar';
                document.body.prepend(errorDiv);
            } else {
                statusElement.style.display = 'flex';
            }
            
            // Deshabilitar toda la funcionalidad
            document.body.style.opacity = '0.6';
            document.body.style.pointerEvents = 'none';
            
            // Mostrar mensaje en el contenedor principal
            const scheduleView = document.getElementById('scheduleView');
            if (scheduleView) {
                scheduleView.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: white; border-radius: 12px; margin-top: 20px;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">🔌</div>
                        <h2 style="color: #cc0000; margin-bottom: 15px;">Sin conexión a internet</h2>
                        <p style="font-size: 1.1rem; color: #555; margin-bottom: 25px;">
                            Esta aplicación requiere conexión a internet para funcionar.<br>
                            Por favor, verifica tu conexión y recarga la página.
                        </p>
                        <button onclick="location.reload()" style="
                            background: linear-gradient(135deg, #A8C5B5, #8BA89A);
                            color: white;
                            border: none;
                            padding: 12px 35px;
                            border-radius: 25px;
                            font-size: 1.1rem;
                            font-weight: 600;
                            cursor: pointer;
                            box-shadow: 0 4px 15px rgba(139, 168, 154, 0.3);
                            transition: all 0.3s ease;
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            Recargar página
                        </button>
                    </div>
                `;
            }
            return false;
        }
        
        // Conexión restablecida
        if (statusElement) {
            statusElement.style.display = 'none';
        }
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
        return true;
    }

    // Verificar al cargar la página
    window.addEventListener('load', () => {
        if (!checkConnection()) {
            console.warn('App iniciada sin conexión a internet');
        }
    });

    // Verificar periódicamente (cada 10 segundos)
    setInterval(checkConnection, 10000);

    // Escuchar cambios de conexión
    window.addEventListener('online', () => {
        console.log('Conexión restablecida');
        checkConnection();
        if (confirm('✅ ¡Conexión restablecida!\n\n¿Quieres recargar la página para actualizar los datos?')) {
            location.reload();
        }
    });

    window.addEventListener('offline', () => {
        console.warn('Conexión perdida');
        checkConnection();
        alert('⚠️ Se ha perdido la conexión a internet.\n\nLa aplicación no funcionará hasta que se restablezca la conexión.');
    });
})();

// Reset stop selection when changing line, filter or direction
function resetStopSelection() {
    currentStop = '';
    const stopSelect = document.getElementById('stopSelect');
    if (stopSelect) {
        stopSelect.value = '';
    }
}

// Datos de horarios de todas las líneas
const busSchedules = {
    // ... (LOS DATOS DE HORARIOS PERMANECEN IGUALES - NO CAMBIAN) ...
    // [Mantén exactamente el mismo contenido de busSchedules que tenías]
    urbana: { /* ... */ },
    renfe: { /* ... */ },
    sevilla: { /* ... */ }
};

// Variables globales
let currentLine = 'urbana';
let currentFilter = 'laborables';
let currentStop = '';
let currentDirection = 'ida';
let deferredPrompt = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Verificar conexión antes de inicializar
    if (!navigator.onLine) {
        console.warn('App iniciada sin conexión - inicialización detenida');
        return;
    }
    
    // Inicializar demo banner
    initDemoBanner();
    
    initDateDisplay();
    initEventListeners();
    loadStopsToSelect();
    loadSchedule(currentLine, currentFilter);
    
    // Eliminar cualquier Service Worker residual
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(reg => reg.unregister());
        });
    }
});

// Inicializar banner DEMO
function initDemoBanner() {
    const demoBanner = document.getElementById('demo-banner');
    
    if (DEMO_ENABLED) {
        if (demo && demo.isActive) {
            demoBanner.textContent = `🔷 DEMO — Quedan ${demo.daysLeft} día${demo.daysLeft !== 1 ? 's' : ''} de prueba`;
            demoBanner.className = 'demo-banner';
        } else {
            demoBanner.textContent = '🔶 DEMO EXPIRADA — Funcionalidad limitada. Contacta para versión completa.';
            demoBanner.className = 'demo-banner expired';
        }
    } else {
        // Ocultar completamente el banner si DEMO desactivada
        demoBanner.style.display = 'none';
    }
}

// Mostrar fecha actual
function initDateDisplay() {
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    dateElement.textContent = now.toLocaleDateString('es-ES', options);
}

// Inicializar eventos
function initEventListeners() {
    // Cambiar línea
    document.querySelectorAll('.line-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Verificar conexión primero
            if (!navigator.onLine) {
                alert('⚠️ Necesitas conexión a internet para usar esta función');
                return;
            }
            
            if (DEMO_ENABLED && demo && !demo.isActive) {
                showDemoExpiredAlert();
                return;
            }
            
            document.querySelectorAll('.line-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.line-btn').classList.add('active');
            currentLine = e.target.closest('.line-btn').dataset.line;
            document.getElementById('scheduleTitle').textContent = getLineName(currentLine);
            
            // ✅ REINICIAR SELECCIÓN DE PARADA AL CAMBIAR DE LÍNEA
            resetStopSelection();
            
            // Mostrar/ocultar selector de sentido
            const directionSelector = document.getElementById('directionSelector');
            if (currentLine === 'sevilla') {
                directionSelector.style.display = 'block';
            } else {
                directionSelector.style.display = 'none';
            }
            
            loadStopsToSelect();
            loadSchedule(currentLine, currentFilter);
        });
    });

    // Cambiar filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Verificar conexión primero
            if (!navigator.onLine) {
                alert('⚠️ Necesitas conexión a internet para usar esta función');
                return;
            }
            
            if (DEMO_ENABLED && demo && !demo.isActive) {
                showDemoExpiredAlert();
                return;
            }
            
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            
            // ✅ REINICIAR SELECCIÓN DE PARADA AL CAMBIAR DE FILTRO
            resetStopSelection();
            
            loadStopsToSelect();
            loadSchedule(currentLine, currentFilter);
        });
    });

    // Cambiar parada
    document.getElementById('stopSelect').addEventListener('change', (e) => {
        // Verificar conexión primero
        if (!navigator.onLine) {
            alert('⚠️ Necesitas conexión a internet para usar esta función');
            return;
        }
        
        if (DEMO_ENABLED && demo && !demo.isActive) {
            showDemoExpiredAlert();
            return;
        }
        
        currentStop = e.target.value;
        loadSchedule(currentLine, currentFilter);
    });

    // Cambiar sentido (solo para línea Sevilla)
    document.getElementById('directionSelect')?.addEventListener('change', (e) => {
        // Verificar conexión primero
        if (!navigator.onLine) {
            alert('⚠️ Necesitas conexión a internet para usar esta función');
            return;
        }
        
        if (DEMO_ENABLED && demo && !demo.isActive) {
            showDemoExpiredAlert();
            return;
        }
        
        currentDirection = e.target.value;
        
        // ✅ REINICIAR SELECCIÓN DE PARADA AL CAMBIAR DE DIRECCIÓN
        resetStopSelection();
        
        loadStopsToSelect();
        loadSchedule(currentLine, currentFilter);
    });

    // Botón de instalación
    document.getElementById('installBtn').addEventListener('click', installApp);
}

// Obtener nombre de la línea
function getLineName(line) {
    const names = {
        'urbana': 'Línea Urbana',
        'renfe': 'Línea Renfe',
        'sevilla': 'Lebrija-Sevilla-Chipiona'
    };
    return names[line] || 'Horarios';
}

// Cargar paradas al selector
function loadStopsToSelect() {
    // Verificar conexión primero
    if (!navigator.onLine) {
        console.warn('Carga de paradas cancelada: sin conexión');
        return;
    }
    
    const select = document.getElementById('stopSelect');
    select.innerHTML = '<option value="">Todas las paradas</option>';
    
    if (busSchedules[currentLine] && busSchedules[currentLine][currentFilter]) {
        const data = busSchedules[currentLine][currentFilter];
        let stops = [];
        
        // Para la línea Sevilla-Chipiona, manejar ida y vuelta y solo mostrar orígenes
        if (currentLine === 'sevilla' && data.ida && data.vuelta) {
            const directionData = data[currentDirection];
            stops = directionData.filter(stop => stop.origin || stop.highlightOnly);
        } else if (data.stops) {
            stops = data.stops;
        }
        
        stops.forEach((stop, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = stop.name;
            select.appendChild(option);
        });
    }
}

// Cargar horarios
function loadSchedule(line, filter) {
    // Verificar conexión primero
    if (!navigator.onLine) {
        console.warn('Carga de horarios cancelada: sin conexión');
        document.getElementById('scheduleView').innerHTML = `
            <div class="no-schedules">
                <p>⚠️ Conexión a internet requerida para ver los horarios</p>
                <button onclick="location.reload()" class="install-btn" style="margin-top: 15px;">
                    Recargar página
                </button>
            </div>
        `;
        return;
    }
    
    const scheduleView = document.getElementById('scheduleView');
    scheduleView.innerHTML = '<div class="loading"><div class="spinner"></div><p>Cargando horarios...</p></div>';

    setTimeout(() => {
        if (currentStop === '') {
            renderFullRoute(line, filter);
        } else {
            renderSingleStop(line, filter, parseInt(currentStop));
        }
    }, 500);
}

// [RESTO DE LAS FUNCIONES PERMANECEN IGUALES: getNextTimeIndex, renderFullRoute, renderRouteSection, renderStopCard, renderSingleStop]

// Instalar app manualmente
function installApp() {
    // Verificar conexión primero
    if (!navigator.onLine) {
        alert('⚠️ Necesitas conexión a internet para instalar la aplicación');
        return;
    }
    
    if (DEMO_ENABLED && demo && !demo.isActive) {
        showDemoExpiredAlert();
        return;
    }
    
    if (deferredPrompt) {
        // Mostrar confirmación antes de instalar (SIN mencionar offline)
        if (confirm('¿Quieres instalar la aplicación de Autobuses Lebrija?\n\n✅ Acceso rápido desde tu pantalla de inicio\n✅ Notificaciones de próximos autobuses\n✅ Interfaz optimizada para móvil')) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    alert('✅ ¡App instalada correctamente!\n\n⚠️ IMPORTANTE: Esta aplicación requiere conexión a internet para funcionar.');
                    // Ocultar botón después de instalar
                    document.getElementById('installBtn').style.display = 'none';
                } else {
                    alert('❌ Instalación cancelada');
                }
                deferredPrompt = null;
            });
        }
    } else {
        // Mostrar instrucciones detalladas (SIN mencionar offline)
        showInstallInstructions();
    }
}

// Mostrar alerta de demo expirada
function showDemoExpiredAlert() {
    alert('⚠️ Versión DEMO expirada.\n\nContacta con el administrador para obtener la versión completa con acceso a todos los horarios y funcionalidades.');
}

// Mostrar instrucciones detalladas para instalar manualmente
function showInstallInstructions() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(74, 83, 85, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; width: 100%; max-width: 500px; padding: 25px; box-shadow: 0 10px 40px rgba(139, 168, 154, 0.2);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: #8BA89A; margin: 0; font-size: 1.4rem; font-weight: 700;">📲 Instalar App</h3>
                <button id="closeModalBtn" style="background: none; border: none; color: #4A5355; font-size: 1.5rem; cursor: pointer; padding: 5px;">×</button>
            </div>
            
            <div style="background: #F5F1E8; border-left: 4px solid #A8C5B5; padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
                <p style="margin: 0; line-height: 1.5; color: #4A5355;">
                    <strong style="color: #8BA89A;">💡 ¿Por qué instalar la app?</strong><br>
                    • Acceso rápido desde tu pantalla de inicio<br>
                    • Notificaciones de próximos autobuses<br>
                    • Interfaz optimizada para móvil<br>
                    • <span style="color: #cc0000; font-weight: bold;">⚠️ Requiere conexión a internet para funcionar</span>
                </p>
            </div>
            
            <div id="instructions-android" style="display: none; margin-bottom: 25px;">
                <h4 style="color: #A8C5B5; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="#A8C5B5"/>
                    </svg>
                    En Android (Chrome)
                </h4>
                <ol style="padding-left: 20px; line-height: 1.6; color: #4A5355;">
                    <li>Abre el menú de Chrome (⋮)</li>
                    <li>Selecciona "Instalar app"</li>
                    <li>Confirma con "Añadir"</li>
                </ol>
            </div>
            
            <div id="instructions-ios" style="display: none; margin-bottom: 25px;">
                <h4 style="color: #A8C5B5; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="#A8C5B5"/>
                    </svg>
                    En iPhone (Safari)
                </h4>
                <ol style="padding-left: 20px; line-height: 1.6; color: #4A5355;">
                    <li>Toca el botón "Compartir" <span style="background: #E0DDD6; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">↗</span></li>
                    <li>Desplázate y selecciona "Añadir a pantalla de inicio"</li>
                    <li>Toca "Añadir" en la esquina superior derecha</li>
                </ol>
            </div>
            
            <div id="instructions-desktop" style="display: none; margin-bottom: 25px;">
                <h4 style="color: #A8C5B5; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="#A8C5B5"/>
                    </svg>
                    En Escritorio (Chrome/Edge)
                </h4>
                <ol style="padding-left: 20px; line-height: 1.6; color: #4A5355;">
                    <li>Mira la barra de direcciones</li>
                    <li>Haz clic en el icono <span style="background: #E0DDD6; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">+</span> o <span style="background: #E0DDD6; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">⬇</span></li>
                    <li>Selecciona "Instalar"</li>
                </ol>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button id="closeModalBtn2" style="flex: 1; background: #F5F1E8; border: 2px solid #A8C5B5; padding: 12px; border-radius: 8px; color: #4A5355; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    Cerrar
                </button>
            </div>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #E0DDD6; text-align: center; color: #cc0000; font-weight: bold;">
                ⚠️ Esta aplicación REQUIERE conexión a internet para funcionar
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Detectar sistema operativo
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
        document.getElementById('instructions-android').style.display = 'block';
    } else if (/iPad|iPhone|iPod/.test(ua)) {
        document.getElementById('instructions-ios').style.display = 'block';
    } else {
        document.getElementById('instructions-desktop').style.display = 'block';
    }
    
    // Event listeners para cerrar modal
    document.getElementById('closeModalBtn').addEventListener('click', () => modal.remove());
    document.getElementById('closeModalBtn2').addEventListener('click', () => modal.remove());
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Actualizar fecha cada minuto
setInterval(() => {
    initDateDisplay();
}, 60000);

// Actualizar banner DEMO cada minuto
setInterval(() => {
    if (DEMO_ENABLED && demo) {
        const now = new Date();
        const elapsed = Math.floor((now - demo.startDate) / (1000 * 60 * 60 * 24));
        const daysLeft = Math.max(0, DEMO_DAYS - elapsed);
        
        const demoBanner = document.getElementById('demo-banner');
        if (daysLeft > 0) {
            demoBanner.textContent = `🔷 DEMO — Quedan ${daysLeft} día${daysLeft !== 1 ? 's' : ''} de prueba`;
            demoBanner.className = 'demo-banner';
        } else {
            demoBanner.textContent = '🔶 DEMO EXPIRADA — Funcionalidad limitada. Contacta para versión completa.';
            demoBanner.className = 'demo-banner expired';
        }
    }
}, 60000);