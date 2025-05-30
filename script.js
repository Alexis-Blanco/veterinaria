// Datos en memoria

const duenos = [];
const mascotas = [];

const especiesValidas = ['Perro', 'Gato', 'Ave', 'Reptil', 'Otro'];
const estadosSaludValidos = ['Sano', 'Enfermo', 'En tratamiento'];

// Utilidades

const generarId = () => crypto.randomUUID();
const validarTexto = (texto) => texto && texto.trim() !== '';
const validarNumeroPositivo = (n) => !isNaN(n) && Number(n) > 0;

// Parte 1: CRUD Básico

const listarMascotas = () => {
  if (mascotas.length === 0) return alert('No hay mascotas registradas.');
  mascotas.forEach((m, i) => {
    const dueno = duenos.find(d => d.id === m.idDueno);
    console.log(`\n${i + 1}. Nombre: ${m.nombre}\n   Especie: ${m.especie}\n   Edad: ${m.edad}\n   Peso: ${m.peso} kg\n   Estado: ${m.estadoSalud}\n   Dueño: ${dueno ? dueno.nombre : 'Desconocido'}`);
  });
};

// Funciones Asíncronas

function registrarDuenoAsync(callback) {
  const nombre = prompt('Ingrese el nombre del dueño:');
  const cedula = prompt('Ingrese la cédula:');
  const telefono = prompt('Ingrese el teléfono:');
  const correo = prompt('Ingrese el correo electrónico:');

  setTimeout(() => {
    if (![nombre, cedula, telefono, correo].every(validarTexto)) {
      alert('Todos los campos deben estar completos.');
      return callback && callback(false);
    }

    const existe = duenos.some(d => d.cedula === cedula);
    if (existe) {
      alert('Ya existe un dueño con esa cédula.');
      return callback && callback(false);
    }

    const nuevoDueno = { id: generarId(), nombre, cedula, telefono, correo };
    duenos.push(nuevoDueno);
    alert('Dueño registrado correctamente (validación simulada).');
    callback && callback(true);
  }, 1500);
}

function registrarMascotaAsync(callback) {
  const nombre = prompt('Ingrese el nombre de la mascota:');
  const especie = prompt(`Ingrese la especie (${especiesValidas.join(', ')}):`);
  const edad = prompt('Ingrese la edad en años:');
  const peso = prompt('Ingrese el peso en kilogramos:');
  const estadoSalud = prompt(`Ingrese el estado de salud (${estadosSaludValidos.join(', ')}):`);
  const cedulaDueno = prompt('Ingrese la cédula del dueño:');

  setTimeout(() => {
    if (![nombre, especie, estadoSalud, cedulaDueno].every(validarTexto) ||
        !validarNumeroPositivo(edad) ||
        !validarNumeroPositivo(peso) ||
        !especiesValidas.includes(especie) ||
        !estadosSaludValidos.includes(estadoSalud)) {
      alert('Datos inválidos.');
      return callback && callback(false);
    }

    const dueno = duenos.find(d => d.cedula === cedulaDueno);
    if (!dueno) {
      alert('No existe un dueño con esa cédula.');
      return callback && callback(false);
    }

    const nuevaMascota = {
      id: generarId(),
      nombre,
      especie,
      edad: Number(edad),
      peso: Number(peso),
      estadoSalud,
      idDueno: dueno.id
    };

    mascotas.push(nuevaMascota);
    alert('Mascota registrada correctamente (validación simulada).');
    callback && callback(true);
  }, 2000);
}

function buscarMascotaPorNombreAsync() {
  const nombre = prompt('Ingrese el nombre de la mascota a buscar:');
  if (!validarTexto(nombre)) return alert('Nombre inválido.');

  new Promise(resolve => {
    setTimeout(() => {
      const resultados = mascotas.filter(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      resolve(resultados);
    }, 1500);
  }).then(resultados => {
    if (resultados.length === 0) return alert('No se encontró ninguna mascota.');
    let mensaje = 'Mascotas encontradas:\n\n';
    resultados.forEach((m, i) => {
      const dueno = duenos.find(d => d.id === m.idDueno);
      mensaje += `${i + 1}. Nombre: ${m.nombre}\n   Especie: ${m.especie}\n   Edad: ${m.edad}\n   Peso: ${m.peso} kg\n   Estado: ${m.estadoSalud}\n   Dueño: ${dueno ? dueno.nombre : 'Desconocido'}\n\n`;
    });
    alert(mensaje);
  });
}

async function actualizarEstadoMascotaAsync() {
  const nombre = prompt('Nombre de la mascota a actualizar:');
  if (!validarTexto(nombre)) return alert('Nombre inválido.');
  const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
  if (!mascota) return alert('Mascota no encontrada.');

  const nuevoEstado = prompt(`Nuevo estado de salud (${estadosSaludValidos.join(', ')}):`);
  if (!estadosSaludValidos.includes(nuevoEstado)) return alert('Estado inválido.');

  await new Promise(res => setTimeout(res, 1000));
  mascota.estadoSalud = nuevoEstado;
  alert('Estado actualizado (espera simulada).');
}

function eliminarMascotaPorNombreAsync() {
  const nombre = prompt('Nombre de la mascota a eliminar:');
  if (!validarTexto(nombre)) return alert('Nombre inválido.');

  new Promise(resolve => {
    setTimeout(() => {
      const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      resolve(index);
    }, 2000);
  }).then(index => {
    if (index === -1) return alert('Mascota no encontrada.');
    if (confirm('¿Eliminar esta mascota?')) {
      mascotas.splice(index, 1);
      alert('Mascota eliminada.');
    } else {
      alert('Eliminación cancelada.');
    }
  });
}

async function verMascotasDeDuenoAsync() {
  const cedula = prompt('Ingrese la cédula del dueño:');
  if (!validarTexto(cedula)) return alert('Cédula inválida.');
  const dueno = duenos.find(d => d.cedula === cedula);
  if (!dueno) return alert('Dueño no encontrado.');

  await new Promise(res => setTimeout(res, 2000));

  const mascotasDelDueno = mascotas.filter(m => m.idDueno === dueno.id);
  if (mascotasDelDueno.length === 0) return alert('No tiene mascotas registradas.');

  let mensaje = `Mascotas de ${dueno.nombre}:\n\n`;
  mascotasDelDueno.forEach((m, i) => {
    mensaje += `${i + 1}. ${m.nombre} - ${m.especie}, ${m.edad} años, ${m.peso}kg, ${m.estadoSalud}\n`;
  });
  alert(mensaje);
}

// Menú principal

function main() {
  let opcion;
  do {
    opcion = prompt(`Seleccione una opción:\n\n1. Registrar dueño\n2. Registrar mascota\n3. Listar mascotas\n4. Buscar mascota\n5. Actualizar estado de salud\n6. Eliminar mascota\n7. Ver mascotas de un dueño\n8. Salir`);
    switch (opcion) {
      case '1': registrarDuenoAsync(); break;
      case '2': registrarMascotaAsync(); break;
      case '3': listarMascotas(); break;
      case '4': buscarMascotaPorNombreAsync(); break;
      case '5': actualizarEstadoMascotaAsync(); break;
      case '6': eliminarMascotaPorNombreAsync(); break;
      case '7': verMascotasDeDuenoAsync(); break;
      case '8': alert('Saliendo...'); break;
      default: alert('Opción inválida');
    }
  } while (opcion !== '8');
}

window.main = main;
