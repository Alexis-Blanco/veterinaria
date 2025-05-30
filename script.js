// Datos en memoria
const duenos = [];
const mascotas = [];

// Función para generar IDs únicos simples
const generarId = () => Math.random().toString(36).substr(2, 9);

// Validaciones básicas
const validarTexto = texto => texto && texto.trim() !== '';
const validarNumeroPositivo = num => !isNaN(num) && Number(num) > 0;
const estadosSaludValidos = ['Sano', 'Enfermo', 'En tratamiento'];
const especiesValidas = ['Perro', 'Gato', 'Ave', 'Reptil', 'Pez', 'Otro'];

// Función para mostrar menú y pedir opción
function mostrarMenu() {
  return prompt(
    `Menú Veterinaria Patitas Felices\n
1. Registrar un nuevo dueño
2. Registrar una nueva mascota
3. Listar todas las mascotas
4. Buscar una mascota por nombre
5. Actualizar el estado de salud de una mascota
6. Eliminar una mascota por nombre
7. Ver mascotas de un dueño (por cédula)
8. Salir
\nIngresa el número de la opción:`
  );
}

// Función principal que controla el flujo sincrónico
function main() {
  let opcion;
  do {
    opcion = mostrarMenu();
    switch(opcion) {
      case '1': registrarDuenosAsync(); break;
      case '2': registrarMascotaAsync(); break;
      case '3': listarMascotas(); break;
      case '4': buscarMascotaPorNombre(); break;
      case '5': actualizarEstadoMascota(); break;
      case '6': eliminarMascotaPorNombre(); break;
      case '7': verMascotasDeDuenos(); break;
      case '8': alert('Gracias por usar la app. ¡Hasta luego!'); break;
      default: alert('Opción inválida, por favor intenta de nuevo.');
    }
  } while(opcion !== '8');
}

function registrarDuenoAsync(callback) {
  const nombre = prompt('Ingrese el nombre del dueño:');
  const cedula = prompt('Ingrese la cédula:');
  const telefono = prompt('Ingrese el teléfono:');
  const correo = prompt('Ingrese el correo electrónico:');

  // Simulamos una validación asincrónica de 1.5 segundos
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

    const nuevoDueno = {
      id: generarId(),
      nombre,
      cedula,
      telefono,
      correo
    };

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

  // Simulamos verificación de existencia del dueño (2 segundos)
  setTimeout(() => {
    if (![nombre, especie, estadoSalud, cedulaDueno].every(validarTexto) ||
        !validarNumeroPositivo(edad) ||
        !validarNumeroPositivo(peso) ||
        !especiesValidas.includes(especie) ||
        !estadosSaludValidos.includes(estadoSalud)) {
      alert('Datos inválidos. Verifica los campos e intenta nuevamente.');
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


function listarMascotas() {
  if (mascotas.length === 0) {
    alert("No hay mascotas registradas.");
    return;
  }

  let listado = "Mascotas registradas:\n\n";
  mascotas.forEach((m, i) => {
    const dueno = duenos.find(d => d.id === m.idDueno);
    listado += `${i + 1}. Nombre: ${m.nombre}\n   Especie: ${m.especie}\n   Edad: ${m.edad} años\n   Peso: ${m.peso} kg\n   Estado de salud: ${m.estadoSalud}\n   Dueño: ${dueno ? dueno.nombre : "Desconocido"}\n\n`;
  });

  alert(listado);
}

function buscarMascotaPorNombre() {
  const nombreBuscado = prompt("Ingrese el nombre de la mascota a buscar:");
  if (!validarTexto(nombreBuscado)) {
    alert("Nombre inválido.");
    return;
  }

  const encontrada = mascotas.filter(m => m.nombre.toLowerCase() === nombreBuscado.toLowerCase());
  if (encontrada.length === 0) {
    alert("No se encontró ninguna mascota con ese nombre.");
    return;
  }

  let resultado = "Mascotas encontradas:\n\n";
  encontrada.forEach((m, i) => {
    const dueno = duenos.find(d => d.id === m.idDueno);
    resultado += `${i + 1}. Nombre: ${m.nombre}\n   Especie: ${m.especie}\n   Edad: ${m.edad} años\n   Peso: ${m.peso} kg\n   Estado de salud: ${m.estadoSalud}\n   Dueño: ${dueno ? dueno.nombre : "Desconocido"}\n\n`;
  });

  alert(resultado);
}

function actualizarEstadoMascota() {
  const nombre = prompt("Ingrese el nombre de la mascota a actualizar:");
  if (!validarTexto(nombre)) {
    alert("Nombre inválido.");
    return;
  }

  const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
  if (!mascota) {
    alert("No se encontró ninguna mascota con ese nombre.");
    return;
  }

  const nuevoEstado = prompt(`Ingrese el nuevo estado de salud (${estadosSaludValidos.join(', ')}):`);
  if (!estadosSaludValidos.includes(nuevoEstado)) {
    alert("Estado de salud inválido.");
    return;
  }

  mascota.estadoSalud = nuevoEstado;
  alert("Estado de salud actualizado correctamente.");
}

function eliminarMascotaPorNombre() {
  const nombre = prompt("Ingrese el nombre de la mascota a eliminar:");
  if (!validarTexto(nombre)) {
    alert("Nombre inválido.");
    return;
  }

  const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
  if (index === -1) {
    alert("No se encontró ninguna mascota con ese nombre.");
    return;
  }

  mascotas.splice(index, 1);
  alert("Mascota eliminada correctamente.");
}

function verMascotasDeDuenos() {
  const cedula = prompt("Ingrese la cédula del dueño:");
  if (!validarTexto(cedula)) {
    alert("Cédula inválida.");
    return;
  }

  const dueno = duenos.find(d => d.cedula === cedula);
  if (!dueno) {
    alert("No se encontró ningún dueño con esa cédula.");
    return;
  }

  const mascotasDelDueno = mascotas.filter(m => m.idDueno === dueno.id);
  if (mascotasDelDueno.length === 0) {
    alert(`El dueño ${dueno.nombre} no tiene mascotas registradas.`);
    return;
  }

  let mensaje = `Mascotas de ${dueno.nombre}:\n\n`;
  mascotasDelDueno.forEach((m, i) => {
    mensaje += `${i + 1}. Nombre: ${m.nombre}\n   Especie: ${m.especie}\n   Edad: ${m.edad} años\n   Peso: ${m.peso} kg\n   Estado de salud: ${m.estadoSalud}\n\n`;
  });

  alert(mensaje);
}

window.main = main;