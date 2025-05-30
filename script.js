// Datos en memoria
const duenos = [];
const mascotas = [];

// Función para generar IDs únicos simples
const generarId = () => Math.random().toString(36).substr(2, 9);

// Validaciones básicas
const validarTexto = texto => texto && texto.trim() !== '';
const validarNumeroPositivo = num => !isNaN(num) && Number(num) > 0;
const estadosSaludValidos = ['Sano', 'Enfermo', 'En tratamiento'];
const especiesValidas = ['Perro', 'Gato', 'Ave', 'Reptil', 'Otro'];

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
