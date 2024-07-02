let registros = [];

function obtenerRatioPorHora() {
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();

    const inicio39 = parseTime(document.getElementById('inicio39').value);
    const fin39 = parseTime(document.getElementById('fin39').value);
    const inicio44 = parseTime(document.getElementById('inicio44').value);
    const fin44 = parseTime(document.getElementById('fin44').value);
    const inicio45 = parseTime(document.getElementById('inicio45').value);
    const fin45 = parseTime(document.getElementById('fin45').value);

    if (estaEntre(horas, minutos, inicio39.hora, inicio39.minuto, fin39.hora, fin39.minuto)) {
        return parseFloat(document.getElementById('ratio39').value);
    } else if (estaEntre(horas, minutos, inicio44.hora, inicio44.minuto, fin44.hora, fin44.minuto)) {
        return parseFloat(document.getElementById('ratio44').value);
    } else {
        return parseFloat(document.getElementById('ratio45').value);
    }
}

function estaEntre(horas, minutos, inicioHora, inicioMinuto, finHora, finMinuto) {
    if (horas > inicioHora && horas < finHora) {
        return true;
    } else if (horas === inicioHora && minutos >= inicioMinuto) {
        return true;
    } else if (horas === finHora && minutos <= finMinuto) {
        return true;
    } else {
        return false;
    }
}

function parseTime(timeString) {
    const split = timeString.split(":");
    return {
        hora: parseInt(split[0]),
        minuto: parseInt(split[1])
    };
}

function toggleConfigMenu() {
    const configMenu = document.getElementById('configMenu');
    configMenu.style.display = configMenu.style.display === 'block' ? 'none' : 'block';
}

function guardarConfigRatios() {
    const nombre39 = document.getElementById('nombre39').value;
    const inicio39 = document.getElementById('inicio39').value;
    const fin39 = document.getElementById('fin39').value;
    const ratio39 = document.getElementById('ratio39').value;

    const nombre44 = document.getElementById('nombre44').value;
    const inicio44 = document.getElementById('inicio44').value;
    const fin44 = document.getElementById('fin44').value;
    const ratio44 = document.getElementById('ratio44').value;

    const nombre45 = document.getElementById('nombre45').value;
    const inicio45 = document.getElementById('inicio45').value;
    const fin45 = document.getElementById('fin45').value;
    const ratio45 = document.getElementById('ratio45').value;

    localStorage.setItem('nombre39', nombre39);
    localStorage.setItem('inicio39', inicio39);
    localStorage.setItem('fin39', fin39);
    localStorage.setItem('ratio39', ratio39);

    localStorage.setItem('nombre44', nombre44);
    localStorage.setItem('inicio44', inicio44);
    localStorage.setItem('fin44', fin44);
    localStorage.setItem('ratio44', ratio44);

    localStorage.setItem('nombre45', nombre45);
    localStorage.setItem('inicio45', inicio45);
    localStorage.setItem('fin45', fin45);
    localStorage.setItem('ratio45', ratio45);

    alert("Configuración de ratios guardada correctamente.");
}

function cargarConfigRatios() {
    const nombre39 = localStorage.getItem('nombre39');
    const inicio39 = localStorage.getItem('inicio39');
    const fin39 = localStorage.getItem('fin39');
    const ratio39 = localStorage.getItem('ratio39');

    const nombre44 = localStorage.getItem('nombre44');
    const inicio44 = localStorage.getItem('inicio44');
    const fin44 = localStorage.getItem('fin44');
    const ratio44 = localStorage.getItem('ratio44');

    const nombre45 = localStorage.getItem('nombre45');
    const inicio45 = localStorage.getItem('inicio45');
    const fin45 = localStorage.getItem('fin45');
    const ratio45 = localStorage.getItem('ratio45');

    if (nombre39) document.getElementById('nombre39').value = nombre39;
    if (inicio39) document.getElementById('inicio39').value = inicio39;
    if (fin39) document.getElementById('fin39').value = fin39;
    if (ratio39) document.getElementById('ratio39').value = ratio39;

    if (nombre44) document.getElementById('nombre44').value = nombre44;
    if (inicio44) document.getElementById('inicio44').value = inicio44;
    if (fin44) document.getElementById('fin44').value = fin44;
    if (ratio44) document.getElementById('ratio44').value = ratio44;

    if (nombre45) document.getElementById('nombre45').value = nombre45;
    if (inicio45) document.getElementById('inicio45').value = inicio45;
    if (fin45) document.getElementById('fin45').value = fin45;
    if (ratio45) document.getElementById('ratio45').value = ratio45;
}

function calcularUGP() {
    const nombre = document.getElementById('nombre').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const proteinas = parseFloat(document.getElementById('proteinas').value);
    const grasas = parseFloat(document.getElementById('grasas').value);
    const hidratos = parseFloat(document.getElementById('hidratos').value);
    const ratio = obtenerRatioPorHora();

    if (!nombre || isNaN(cantidad) || isNaN(proteinas) || isNaN(grasas) || isNaN(hidratos) || isNaN(ratio)) {
        alert("Por favor, ingrese valores válidos en todos los campos.");
        return;
    }

    const proteinaTotal = (proteinas * cantidad) / 100;
    const grasaTotal = (grasas * cantidad) / 100;
    const hidratoTotal = (hidratos * cantidad) / 100;

    const kcalProteinas = proteinaTotal * 4;
    const kcalGrasas = grasaTotal * 9;

    const ugpProteinas = kcalProteinas / 150;
    const ugpGrasas = kcalGrasas / 150;
    const totalUGP = ugpProteinas + ugpGrasas;

    const racionesHC = hidratoTotal / 10;
    const insulinaHC = racionesHC * ratio;
    const insulinaUGP = totalUGP * ratio;

    const insulinaTotal = insulinaHC + insulinaUGP;

    const resultadoHTML = `
        <p><strong>Total UGP:</strong> ${totalUGP.toFixed(2)} UGP</p>
        <p><strong>Insulina necesaria para hidratos de carbono:</strong> ${insulinaHC.toFixed(2)} UI</p>
        <p><strong>Insulina necesaria para UGP:</strong> ${insulinaUGP.toFixed(2)} UI</p>
        <p><strong>Total de insulina necesaria:</strong> ${insulinaTotal.toFixed(2)} UI</p>
    `;
    document.getElementById('resultado').innerHTML = resultadoHTML;

    const registro = {
        nombre,
        cantidad,
        proteinas,
        grasas,
        hidratos,
        ratio,
        resultadoHTML
    };

    registros.push(registro);
    guardarRegistros();
    actualizarRegistros();
}

function guardarRegistros() {
    localStorage.setItem('registros', JSON.stringify(registros));
}

function cargarRegistros() {
    const registrosGuardados = JSON.parse(localStorage.getItem('registros'));
    if (registrosGuardados) {
        registros = registrosGuardados;
        actualizarRegistros();
    }
}

function actualizarRegistros() {
    const registrosDiv = document.getElementById('registros');
    registrosDiv.innerHTML = '';
    registros.forEach((registro, index) => {
        const registroDiv = document.createElement('div');
        registroDiv.className = 'record';
        registroDiv.innerHTML = `
            <span onclick="mostrarDetalles(${index})"><strong>${registro.nombre}</strong></span>
            <div class="actions">
                <i class="fas fa-cog" onclick="modificarRegistro(event, ${index})"></i>
                <i class="fas fa-times" onclick="confirmarBorrado(event, ${index})"></i>
            `;
        registrosDiv.appendChild(registroDiv);
    });
}

function mostrarDetalles(index) {
    const registro = registros[index];
    const detalleHTML = `
        <p><strong>Nombre:</strong> ${registro.nombre}</p>
        <p><strong>Cantidad:</strong> ${registro.cantidad} g</p>
        <p><strong>Proteínas:</strong> ${registro.proteinas} g/100g</p>
        <p><strong>Grasas:</strong> ${registro.grasas} g/100g</p>
        <p><strong>Hidratos de carbono:</strong> ${registro.hidratos} g/100g</p>
        <p><strong>Ratio de insulina:</strong> ${registro.ratio}</p>
        ${registro.resultadoHTML}
    `;
    document.getElementById('resultado').innerHTML = detalleHTML;
}

function modificarRegistro(event, index) {
    event.stopPropagation();
    const registro = registros[index];
    document.getElementById('nombre').value = registro.nombre;
    document.getElementById('cantidad').value = registro.cantidad;
    document.getElementById('proteinas').value = registro.proteinas;
    document.getElementById('grasas').value = registro.grasas;
    document.getElementById('hidratos').value = registro.hidratos;
    document.getElementById('ratio').value = registro.ratio;
}

function confirmarBorrado(event, index) {
    event.stopPropagation();
    const registroDiv = event.target.parentNode.parentNode;
    const confirmacionDiv = document.createElement('div');
    confirmacionDiv.className = 'confirmacion';
    confirmacionDiv.innerHTML = `
        <span>¿Estás seguro que quieres borrar?</span>
        <span class="si" onclick="borrarRegistro(${index})"><i class="fas fa-check"></i> Sí</span>
        <span class="no" onclick="cancelarBorrado(event)"><i class="fas fa-times"></i> No</span>
    `;
    registroDiv.appendChild(confirmacionDiv);
}

function cancelarBorrado(event) {
    event.stopPropagation();
    const confirmacionDiv = event.target.parentNode;
    confirmacionDiv.parentNode.removeChild(confirmacionDiv);
}

function borrarRegistro(index) {
    registros.splice(index, 1);
    guardarRegistros();
    actualizarRegistros();
}

// Cargar configuración de ratios al iniciar la página
document.addEventListener('DOMContentLoaded', (event) => {
    cargarConfigRatios();
    cargarRegistros();
});
