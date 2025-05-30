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
      case '1': registrarDuenos(); break;
      case '2': registrarMascota(); break;
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

function registrarDuenos() {
  const nombre = prompt('Ingrese el nombre del dueño:');
  if (!validarTexto(nombre)) return alert('Nombre inválido.');

  const cedula = prompt('Ingrese la cédula:');
  if (!validarTexto(cedula)) return alert('Cédula inválida.');

  const telefono = prompt('Ingrese el teléfono:');
  if (!validarTexto(telefono)) return alert('Teléfono inválido.');

  const correo = prompt('Ingrese el correo electrónico:');
  if (!validarTexto(correo)) return alert('Correo inválido.');

  // Verificar que la cédula sea única
  const existe = duenos.some(d => d.cedula === cedula);
  if (existe) return alert('Ya existe un dueño con esa cédula.');

  const nuevoDueno = {
    id: generarId(),
    nombre,
    cedula,
    telefono,
    correo
  };

  duenos.push(nuevoDueno);
  alert('Dueño registrado correctamente.');
}

function registrarMascota() {
  const nombre = prompt('Ingrese el nombre de la mascota:');
  if (!validarTexto(nombre)) return alert('Nombre inválido.');

  const especie = prompt(`Ingrese la especie (${especiesValidas.join(', ')}):`);
  if (!especiesValidas.includes(especie)) return alert('Especie inválida.');

  const edad = prompt('Ingrese la edad en años:');
  if (!validarNumeroPositivo(edad)) return alert('Edad inválida.');

  const peso = prompt('Ingrese el peso en kilogramos:');
  if (!validarNumeroPositivo(peso)) return alert('Peso inválido.');

  const estadoSalud = prompt(`Ingrese el estado de salud (${estadosSaludValidos.join(', ')}):`);
  if (!estadosSaludValidos.includes(estadoSalud)) return alert('Estado de salud inválido.');

  const cedulaDueno = prompt('Ingrese la cédula del dueño:');
  if (!validarTexto(cedulaDueno)) return alert('Cédula inválida.');

  // Verificar que el dueño exista
  const duenoEncontrado = duenos.find(d => d.cedula === cedulaDueno);
  if (!duenoEncontrado) return alert('No existe un dueño con esa cédula.');

  const nuevaMascota = {
    id: generarId(),
    nombre,
    especie,
    edad: Number(edad),
    peso: Number(peso),
    estadoSalud,
    idDueno: duenoEncontrado.id
  };

  mascotas.push(nuevaMascota);
  alert('Mascota registrada correctamente.');
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

