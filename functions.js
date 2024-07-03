let registros = [];

function toggleConfigMenu() {
    const configMenu = document.getElementById('configMenu');
    configMenu.style.display = configMenu.style.display === 'block' ? 'none' : 'block';
}

function calcularUGP() {
    const nombre = document.getElementById('nombre').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const proteinas = parseFloat(document.getElementById('proteinas').value);
    const grasas = parseFloat(document.getElementById('grasas').value);
    const hidratos = parseFloat(document.getElementById('hidratos').value);

    if (!nombre || isNaN(cantidad) || isNaN(proteinas) || isNaN(grasas) || isNaN(hidratos)) {
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

    const resultadoHTML = `
        <p><strong>Total UGP:</strong> ${totalUGP.toFixed(2)} UGP</p>
    `;
    document.getElementById('resultado').innerHTML = resultadoHTML;

    const registro = {
        nombre,
        cantidad,
        proteinas,
        grasas,
        hidratos,
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

// Cargar registros al iniciar la página
document.addEventListener('DOMContentLoaded', (event) => {
    cargarRegistros();
});
