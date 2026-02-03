// Datos de horarios de todas las líneas
const busSchedules = {
    urbana: {
        laborables: {
            stops: [
                { name: 'Hospital', times: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00'] },
                { name: 'Plaza de Abastos', times: ['8:03', '9:03', '10:03', '11:03', '12:03', '13:03'] },
                { name: 'José Fernández Ruiz - Cantarería', times: ['8:05', '9:05', '10:05', '11:05', '12:05', '13:05'] },
                { name: 'José Fernández Ruiz C/Roma', times: ['8:07', '9:07', '10:07', '11:07', '12:07', '13:07'] },
                { name: 'Glorieta María Auxiliadora', times: ['8:08', '9:08', '10:08', '11:08', '12:08', '13:08'] },
                { name: 'Avenida Canga C/Francia', times: ['8:11', '9:11', '10:11', '11:11', '12:11', '13:11'] },
                { name: 'Avenida Canga C/Hijas Caridad', times: ['8:13', '9:13', '10:13', '11:13', '12:13', '13:13'] },
                { name: 'Avenida Canga Pza Campiña', times: ['8:15', '9:15', '10:15', '11:15', '12:15', '13:15'] },
                { name: 'Venta Renaul', times: ['8:16', '9:16', '10:16', '11:16', '12:16', '13:16'] },
                { name: 'A. Calvo Ruiz Sta Brígida', times: ['8:17', '9:17', '10:17', '11:17', '12:17', '13:17'] },
                { name: 'Plaza Manuela Murube', times: ['8:20', '9:20', '10:20', '11:20', '12:20', '13:20'] },
                { name: 'Cala de Vargas (Ajudisle)', times: ['8:21', '9:21', '10:21', '11:21', '12:21', '13:21'] },
                { name: 'Tetuán - Veracruz', times: ['8:22', '9:22', '10:22', '11:22', '12:22', '13:22'] },
                { name: 'Zancarrón - Jazmín', times: ['8:23', '9:23', '10:23', '11:23', '12:23', '13:23'] },
                { name: 'Reyes Católicos', times: ['8:24', '9:24', '10:24', '11:24', '12:24', '13:24'] },
                { name: 'Miguel Unamuno-Hta Macenas 1ª parada', times: ['8:25', '9:25', '10:25', '11:25', '12:25', '13:25'] },
                { name: 'Miguel Unamuno-Hta Macenas 2ª parada', times: ['8:26', '9:26', '10:26', '11:26', '12:26', '13:26'] },
                { name: 'Miguel Unamuno-Hta Macenas 3ª parada', times: ['8:27', '9:27', '10:27', '11:27', '12:27', '13:27'] },
                { name: 'Cañada Lebrija-Trebujena', times: ['8:30', '9:30', '10:30', '11:30', '12:30', '13:30'] },
                { name: 'Dr. José Viel (antiguo Lidl)', times: ['8:32', '9:32', '10:32', '11:32', '12:32', '13:32'] },
                { name: 'Avenida Andalucía', times: ['8:33', '9:33', '10:33', '11:33', '12:33', '13:33'] },
                { name: 'Ambulatorio', times: ['8:34', '9:34', '10:34', '11:34', '12:34', '13:34'] },
                { name: 'Plaza Manuela Murube', times: ['8:35', '9:35', '10:35', '11:35', '12:35', '13:35'] },
                { name: 'Cala de Vargas (Ajudisle)', times: ['8:36', '9:36', '10:36', '11:36', '12:36', '13:36'] },
                { name: 'Esquina Tetuán-Veracruz', times: ['8:37', '9:37', '10:37', '11:37', '12:37', '13:37'] },
                { name: 'Camino del Aceituno (Mercadona)', times: ['8:38', '9:38', '10:38', '11:38', '12:38', '13:38'] },
                { name: 'Hospital', times: ['8:40', '9:40', '10:40', '11:40', '12:40', '13:40'] }
            ]
        },
        sabados: {
            stops: [
                { name: 'Hospital', times: ['10:00', '11:00', '12:00'] },
                { name: 'Plaza de Abastos', times: ['10:03', '11:03', '12:03'] },
                { name: 'José Fernández Ruiz - Cantarería', times: ['10:05', '11:05', '12:05'] },
                { name: 'José Fernández Ruiz - C/Roma', times: ['10:07', '11:07', '12:07'] },
                { name: 'Glorieta María Auxiliadora', times: ['10:08', '11:08', '12:08'] },
                { name: 'Avda Canga - C/Francia', times: ['10:11', '11:11', '12:11'] },
                { name: 'Avda Canga - Hijas Caridad', times: ['10:13', '11:13', '12:13'] },
                { name: 'Avda Canga - Plaza Campiña', times: ['10:15', '11:15', '12:15'] },
                { name: 'Venta Renaul', times: ['10:16', '11:16', '12:16'] },
                { name: 'Antonio Calvo Ruiz - Sta Brigida', times: ['10:17', '11:17', '12:17'] },
                { name: 'Plaza Manuela Murube', times: ['10:20', '11:20', '12:20'] },
                { name: 'Cala de Vargas (Ajudisle)', times: ['10:21', '11:21', '12:21'] },
                { name: 'Tetuán - Veracruz', times: ['10:22', '11:22', '12:22'] },
                { name: 'Zancarrón - Jazmín', times: ['10:23', '11:23', '12:23'] },
                { name: 'Reyes Católicos', times: ['10:24', '11:24', '12:24'] },
                { name: 'Miguel Unamuno-Hta Macenas 1ª parada', times: ['10:25', '11:25', '12:25'] },
                { name: 'Miguel Unamuno-Hta Macenas 2ª parada', times: ['10:26', '11:26', '12:26'] },
                { name: 'Miguel Unamuno-Hta Macenas 3ª parada', times: ['10:27', '11:27', '12:27'] },
                { name: 'Cañada Lebrija-Trebujena', times: ['10:30', '11:30', '12:30'] },
                { name: 'Avda José Viel (Lidl)', times: ['10:32', '11:32', '12:32'] },
                { name: 'Avenida Andalucía', times: ['10:33', '11:33', '12:33'] },
                { name: 'Ambulatorio', times: ['10:34', '11:34', '12:34'] },
                { name: 'Plaza Manuela Murube', times: ['10:35', '11:35', '12:35'] },
                { name: 'Cala de Vargas (Ajudisle)', times: ['10:36', '11:36', '12:36'] },
                { name: 'Esquina Tetuán-Veracruz', times: ['10:37', '11:37', '12:37'] },
                { name: 'Camino del Aceituno (Mercadona)', times: ['10:38', '11:38', '12:38'] },
                { name: 'Hospital', times: ['10:40', '11:40', '12:40'] }
            ]
        },
        domingos: {
            stops: []
        }
    },
    renfe: {
        laborables: {
            stops: [
                { name: 'Plaza Manuela Murube (Asilo)', times: ['6:00', '6:40', '6:50', '7:45', '9:00', '9:35', '10:15', '11:30', '12:00', '13:15', '13:40', '15:10', '15:55', '16:20', '16:45', '18:00', '20:00', '20:45', '21:00'] },
                { name: 'Estación de Renfe', times: ['6:15', '6:55', '7:05', '8:00', '9:15', '9:50', '10:30', '11:45', '12:15', '13:30', '13:55', '15:25', '16:10', '16:35', '17:00', '18:15', '20:15', '21:00', '21:15'] }
            ]
        },
        sabados: {
            stops: [
                { name: 'Plaza Manuela Murube (Asilo)', times: ['9:00', '12:00', '15:10', '16:45', '18:00', '20:00', '20:45'] },
                { name: 'Estación de Renfe', times: ['9:15', '12:15', '15:25', '17:00', '18:15', '20:15', '21:00'] }
            ]
        },
        domingos: {
            stops: [
                { name: 'Plaza Manuela Murube (Asilo)', times: ['9:00', '12:00', '15:10', '16:45', '18:00', '20:00', '20:45'] },
                { name: 'Estación de Renfe', times: ['9:15', '12:15', '15:25', '17:00', '18:15', '20:15', '21:00'] }
            ]
        }
    },
    sevilla: {
        laborables: {
            ida: [
                { name: 'Chipiona', times: ['06:45', '09:00', '11:00', '13:00', '15:00', '16:00', '18:00', '20:00'], origin: true },
                { name: 'Lebrija', times: ['07:45', '10:00', '12:00', '14:00', '16:00', '17:00', '19:00', '21:00'], highlightOnly: true },
                { name: 'Sevilla', times: ['09:00', '11:15', '13:15', '15:15', '17:15', '18:15', '20:15', '22:15'], destination: true }
            ],
            vuelta: [
                { name: 'Sevilla', times: ['06:00', '07:00', '09:00', '11:00', '13:00', '13:45', '15:00', '17:00', '19:00'] },
                { name: 'Lebrija', times: ['07:15', '08:15', '10:15', '12:15', '14:15', '15:00', '16:15', '18:15', '20:15'], highlightOnly: true },
                { name: 'Chipiona', times: ['08:15', '09:15', '11:15', '13:15', '15:15', '16:00', '17:15', '19:15', '21:15'], destination: true }
            ]
        },
        sabados: {
            ida: [
                { name: 'Chipiona', times: ['08:00', '10:00', '16:00', '18:00', '20:00'], origin: true },
                { name: 'Lebrija', times: ['09:00', '11:00', '17:00', '19:00', '21:00'], highlightOnly: true },
                { name: 'Sevilla', times: ['10:15', '12:15', '18:15', '20:15', '22:15'], destination: true }
            ],
            vuelta: [
                { name: 'Sevilla', times: ['08:00', '10:00', '12:00', '16:00', '20:00'] },
                { name: 'Lebrija', times: ['09:15', '11:15', '13:15', '17:15', '21:15'], highlightOnly: true },
                { name: 'Chipiona', times: ['10:15', '12:15', '14:15', '18:15', '22:15'], destination: true }
            ]
        },
        domingos: {
            ida: [
                { name: 'Chipiona', times: ['08:00', '10:00', '16:00', '18:00', '20:00'], origin: true },
                { name: 'Lebrija', times: ['09:00', '11:00', '17:00', '19:00', '21:00'], highlightOnly: true },
                { name: 'Sevilla', times: ['10:15', '12:15', '18:15', '20:15', '22:15'], destination: true }
            ],
            vuelta: [
                { name: 'Sevilla', times: ['08:00', '10:00', '12:00', '16:00', '20:00'] },
                { name: 'Lebrija', times: ['09:15', '11:15', '13:15', '17:15', '21:15'], highlightOnly: true },
                { name: 'Chipiona', times: ['10:15', '12:15', '14:15', '18:15', '22:15'], destination: true }
            ]
        }
    }
};

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