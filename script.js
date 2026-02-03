// Variables globales
let currentLine = 'urbana';
let currentFilter = 'laborables';
let currentStop = '';
let currentDirection = 'ida';
let deferredPrompt = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initDateDisplay();
    initEventListeners();
    loadStopsToSelect();
    loadSchedule(currentLine, currentFilter);
    
    // Detectar evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        // Mostrar botón de instalación cuando esté disponible
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.style.display = 'block';
            installBtn.innerHTML = '📲 Instalar App';
        }
    });
    
    // Ocultar botón si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
        const installBtn = document.getElementById('installBtn');
        if (installBtn) installBtn.style.display = 'none';
    }
});

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
            document.querySelectorAll('.line-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.line-btn').classList.add('active');
            currentLine = e.target.closest('.line-btn').dataset.line;
            document.getElementById('scheduleTitle').textContent = getLineName(currentLine);
            
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
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            loadStopsToSelect();
            loadSchedule(currentLine, currentFilter);
        });
    });

    // Cambiar parada
    document.getElementById('stopSelect').addEventListener('change', (e) => {
        currentStop = e.target.value;
        loadSchedule(currentLine, currentFilter);
    });

    // Cambiar sentido (solo para línea Sevilla)
    document.getElementById('directionSelect')?.addEventListener('change', (e) => {
        currentDirection = e.target.value;
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

// Obtener el próximo horario de una parada
function getNextTimeIndex(times) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    for (let i = 0; i < times.length; i++) {
        const [h, m] = times[i].split(':').map(Number);
        const scheduleTime = h * 60 + m;
        if (scheduleTime > currentTime) {
            return i;
        }
    }
    return -1;
}

// Renderizar ruta completa
function renderFullRoute(line, filter) {
    const scheduleView = document.getElementById('scheduleView');
    
    if (!busSchedules[line] || !busSchedules[line][filter]) {
        scheduleView.innerHTML = '<div class="no-schedules"><p>No hay horarios disponibles para esta línea</p></div>';
        return;
    }
    
    const data = busSchedules[line][filter];
    let html = '';
    
    // Para la línea Sevilla-Chipiona, mostrar ida y vuelta separadamente
    if (line === 'sevilla' && data.ida && data.vuelta) {
        html += '<div class="route-direction"><h3>Ida: Chipiona → Lebrija → Sevilla</h3>';
        html += renderRouteSection(data.ida, 'ida');
        html += '</div>';
        
        html += '<div class="route-direction"><h3>Vuelta: Sevilla → Lebrija → Chipiona</h3>';
        html += renderRouteSection(data.vuelta, 'vuelta');
        html += '</div>';
    } else if (data.stops) {
        html += '<div class="full-route">';
        data.stops.forEach(stop => {
            html += renderStopCard(stop);
        });
        html += '</div>';
    } else {
        scheduleView.innerHTML = '<div class="no-schedules"><p>No hay horarios disponibles para este día</p></div>';
        return;
    }
    
    scheduleView.innerHTML = html;
}

// Renderizar sección de ruta
function renderRouteSection(stops, direction) {
    let html = '<div class="full-route">';
    stops.forEach(stop => {
        html += renderStopCard(stop, direction);
    });
    html += '</div>';
    return html;
}

// Renderizar tarjeta de parada
function renderStopCard(stop, direction = null) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const isOrigin = (direction === 'ida' && (stop.name === 'Chipiona' || stop.name === 'Lebrija')) ||
                     (direction === 'vuelta' && (stop.name === 'Sevilla' || stop.name === 'Lebrija'));
    
    const nextTimeIndex = getNextTimeIndex(stop.times);
    
    let html = `
        <div class="stop-card">
            <div class="stop-name">
                ${stop.name}
                ${stop.origin ? '<span class="origin-label">Origen</span>' : ''}
                ${stop.destination ? '<span class="destination-label">Destino</span>' : ''}
            </div>
            <div class="stop-times">
    `;
    
    stop.times.forEach((time, index) => {
        const [h, m] = time.split(':').map(Number);
        const scheduleTime = h * 60 + m;
        
        let isNext = false;
        
        if (stop.highlightOnly) {
            isNext = (index === nextTimeIndex);
        } else if (currentLine === 'renfe') {
            isNext = (index === nextTimeIndex);
        } else if (currentLine === 'sevilla') {
            isNext = false;
        } else {
            isNext = isOrigin && scheduleTime > currentTime && scheduleTime <= currentTime + 60;
        }
        
        html += `<span class="time-badge ${isNext ? 'highlight' : ''}">${time}</span>`;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

// Renderizar vista de parada única
function renderSingleStop(line, filter, stopIndex) {
    const scheduleView = document.getElementById('scheduleView');
    
    if (!busSchedules[line] || !busSchedules[line][filter]) {
        scheduleView.innerHTML = '<div class="no-schedules"><p>No hay horarios disponibles para esta línea</p></div>';
        return;
    }
    
    const data = busSchedules[line][filter];
    let stop;
    
    if (line === 'sevilla' && data.ida && data.vuelta) {
        const directionData = data[currentDirection];
        stop = directionData[stopIndex];
    } else if (data.stops && stopIndex < data.stops.length) {
        stop = data.stops[stopIndex];
    } else {
        scheduleView.innerHTML = '<div class="no-schedules"><p>Parada no encontrada</p></div>';
        return;
    }
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const nextTimeIndex = getNextTimeIndex(stop.times);
    
    let html = `
        <div class="single-stop-view">
            <div class="single-stop-name">📍 ${stop.name}</div>
            <div class="times-grid">
    `;
    
    stop.times.forEach((time, index) => {
        const [h, m] = time.split(':').map(Number);
        const scheduleTime = h * 60 + m;
        const isPast = scheduleTime < currentTime;
        
        let isNext = false;
        let status = '';
        
        if (stop.highlightOnly || currentLine === 'renfe') {
            isNext = (index === nextTimeIndex);
            status = isNext ? 'Próximo' : (isPast ? 'Pasado' : 'Hoy');
        } else if (currentLine === 'sevilla') {
            isNext = false;
            status = isPast ? 'Pasado' : 'Hoy';
        } else {
            isNext = scheduleTime > currentTime && scheduleTime <= currentTime + 60;
            status = isNext ? 'Próximo' : (isPast ? 'Pasado' : 'Hoy');
        }
        
        html += `
            <div class="time-card ${isNext ? 'highlight' : ''}">
                <div class="time">${time}</div>
                <div class="status">${status}</div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    scheduleView.innerHTML = html;
}

// Instalar app manualmente
function installApp() {
    if (deferredPrompt) {
        // Mostrar confirmación antes de instalar
        if (confirm('¿Quieres instalar la aplicación de Autobuses Lebrija?\n\n✅ Funciona sin internet\n✅ Acceso rápido desde tu pantalla de inicio\n✅ Notificaciones de próximos autobuses')) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    alert('✅ ¡App instalada correctamente!\n\nPuedes encontrarla en tu pantalla de inicio o en tus aplicaciones instaladas.');
                    // Ocultar botón después de instalar
                    document.getElementById('installBtn').style.display = 'none';
                } else {
                    alert('❌ Instalación cancelada');
                }
                deferredPrompt = null;
            });
        }
    } else {
        // Mostrar instrucciones detalladas
        showInstallInstructions();
    }
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
        background: rgba(0,0,0,0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); border-radius: var(--border-radius); width: 100%; max-width: 500px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: var(--primary-color); margin: 0; font-size: 1.4rem;">📲 Instalar App</h3>
                <button id="closeModalBtn" style="background: none; border: none; color: var(--text-color); font-size: 1.5rem; cursor: pointer;">×</button>
            </div>
            
            <div style="background: rgba(0, 120, 215, 0.1); border-left: 4px solid var(--primary-color); padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
                <p style="margin: 0; line-height: 1.5;">
                    <strong>💡 ¿Por qué instalar la app?</strong><br>
                    • Funciona sin internet<br>
                    • Acceso rápido desde tu pantalla de inicio<br>
                    • Notificaciones de próximos autobuses<br>
                    • Experiencia como app nativa
                </p>
            </div>
            
            <div id="instructions-android" style="display: none; margin-bottom: 25px;">
                <h4 style="color: var(--secondary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="#0078D7"/>
                    </svg>
                    En Android (Chrome)
                </h4>
                <ol style="padding-left: 20px; line-height: 1.6;">
                    <li>Abre el menú de Chrome (⋮)</li>
                    <li>Selecciona "Instalar app"</li>
                    <li>Confirma con "Añadir"</li>
                </ol>
            </div>
            
            <div id="instructions-ios" style="display: none; margin-bottom: 25px;">
                <h4 style="color: var(--secondary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="#0078D7"/>
                    </svg>
                    En iPhone (Safari)
                </h4>
                <ol style="padding-left: 20px; line-height: 1.6;">
                    <li>Toca el botón "Compartir" <span style="background: #333; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">↗</span></li>
                    <li>Desplázate y selecciona "Añadir a pantalla de inicio"</li>
                    <li>Toca "Añadir" en la esquina superior derecha</li>
                </ol>
            </div>
            
            <div id="instructions-desktop" style="display: none; margin-bottom: 25px;">
                <h4 style="color: var(--secondary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="#0078D7"/>
                    </svg>
                    En Escritorio (Chrome/Edge)
                </h4>
                <ol style="padding-left: 20px; line-height: 1.6;">
                    <li>Mira la barra de direcciones</li>
                    <li>Haz clic en el icono <span style="background: #333; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">+</span> o <span style="background: #333; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">⬇</span></li>
                    <li>Selecciona "Instalar"</li>
                </ol>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button id="closeModalBtn2" style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid var(--primary-color); padding: 12px; border-radius: 8px; color: var(--text-color); font-weight: 600; cursor: pointer;">
                    Cerrar
                </button>
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