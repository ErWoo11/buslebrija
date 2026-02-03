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
                { name: 'Sevilla', times: ['06:00', '07:00', '09:00', '11:00', '13:00', '13:45', '15:00', '17:00', '19:00'], origin: true },
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
                { name: 'Sevilla', times: ['08:00', '10:00', '12:00', '16:00', '20:00'], origin: true },
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
                { name: 'Sevilla', times: ['08:00', '10:00', '12:00', '16:00', '20:00'], origin: true },
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
let currentDirection = 'ida'; // Para la línea Sevilla-Chipiona
let deferredPrompt;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initDateDisplay();
    initEventListeners();
    loadStopsToSelect();
    loadSchedule(currentLine, currentFilter);
    
    // Manejar instalación PWA
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
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
            stops = directionData.filter(stop => stop.origin || stop.highlightOnly); // Solo Chipiona (origen) y Lebrija (highlightOnly)
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

    // Simular carga asíncrona
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
            return i; // Devuelve el índice del próximo horario
        }
    }
    return -1; // No hay horarios futuros
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
        html += '<div class="route-direction"><h3>Sentido: Chipiona → Lebrija → Sevilla</h3>';
        html += renderRouteSection(data.ida, 'ida');
        html += '</div>';
        
        html += '<div class="route-direction"><h3>Sentido: Sevilla → Lebrija → Chipiona</h3>';
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
    
    // Determinar si es origen o destino según la dirección
    const isOrigin = (direction === 'ida' && (stop.name === 'Chipiona' || stop.name === 'Lebrija')) ||
                     (direction === 'vuelta' && (stop.name === 'Sevilla' || stop.name === 'Lebrija'));
    
    // Obtener el índice del próximo horario
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
        
        // Lógica de resaltado:
        // - Para Renfe: resaltar el próximo bus de AMBAS paradas
        // - Para Sevilla-Chipiona: resaltar SOLO el próximo bus de Lebrija
        // - Para otras líneas: resaltar próximos buses en la próxima hora
        let isNext = false;
        
        if (stop.highlightOnly) {
            // Solo resaltar el próximo bus de Lebrija
            isNext = (index === nextTimeIndex);
        } else if (currentLine === 'renfe') {
            // Para Renfe, resaltar el próximo bus de ambas paradas
            isNext = (index === nextTimeIndex);
        } else if (currentLine === 'sevilla') {
            // Para Sevilla-Chipiona, NO resaltar nada (solo Lebrija tiene highlightOnly)
            isNext = false;
        } else {
            // Para otras líneas, resaltar próximos buses en la próxima hora
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
    
    // Para la línea Sevilla-Chipiona, manejar ida y vuelta
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
    
    // Obtener el índice del próximo horario
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
        
        // Lógica de resaltado:
        // - Para Renfe y Lebrija: resaltar SOLO el próximo bus
        // - Para Sevilla-Chipiona (Chipiona/Sevilla): NO resaltar nada
        // - Para otras paradas: resaltar próximos buses en la próxima hora
        let isNext = false;
        let status = '';
        
        if (stop.highlightOnly || currentLine === 'renfe') {
            // Solo resaltar el próximo bus
            isNext = (index === nextTimeIndex);
            status = isNext ? 'Próximo' : (isPast ? 'Pasado' : 'Hoy');
        } else if (currentLine === 'sevilla') {
            // Para Sevilla-Chipiona (Chipiona/Sevilla), NO resaltar nada
            isNext = false;
            status = isPast ? 'Pasado' : 'Hoy';
        } else {
            // Resaltar próximos buses en la próxima hora
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
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuario aceptó la instalación');
                // Ocultar el botón después de instalar
                document.getElementById('installBtn').style.display = 'none';
            } else {
                console.log('Usuario rechazó la instalación');
            }
            deferredPrompt = null;
        });
    } else {
        // Verificar si ya está instalada
        if (window.matchMedia('(display-mode: standalone)').matches) {
            alert('✅ La aplicación ya está instalada en tu dispositivo.\n\nPuedes encontrarla en tu pantalla de inicio o en tus aplicaciones instaladas.');
        } else {
            alert('📱 Para instalar la aplicación:\n\n1. Abre el menú del navegador (⋮ o ...)\n2. Selecciona "Añadir a pantalla de inicio" o "Instalar aplicación"\n3. Confirma la instalación\n\nLa app funcionará como una aplicación nativa con acceso offline.');
        }
    }
}

// Actualizar fecha cada minuto
setInterval(() => {
    initDateDisplay();
}, 60000);