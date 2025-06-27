// Lista de palabras predefinidas (puedes añadir más si quieres)
const palabrasPredefinidas = ["manzana", "banana", "pera", "durazno", "frutilla", "mango", "naranja", "limon", "sandia", "melon", "kiwi", "uva", "cereza", "anana"];

// Obtener referencias a los elementos del DOM
const filtroForm = document.getElementById('filtroForm');
const filtroInput = document.getElementById('filtroInput');
const listaPalabrasUl = document.getElementById('listaPalabras');
const mensajeErrorDiv = document.getElementById('mensajeError');

/**
 * Función para renderizar (mostrar) la lista de palabras en el DOM.
 * @param {Array<string>} palabras - El array de palabras a mostrar.
 */
function renderizarLista(palabras) {
    // Limpiar cualquier contenido anterior en la lista
    listaPalabrasUl.innerHTML = '';

    // Si no hay palabras para mostrar (después de un filtrado, por ejemplo)
    if (palabras.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron palabras que coincidan.';
        listaPalabrasUl.appendChild(li);
        return;
    }

    // Crear un elemento <li> por cada palabra y añadirlo a la lista <ul>
    palabras.forEach(palabra => {
        const li = document.createElement('li');
        li.textContent = palabra;
        listaPalabrasUl.appendChild(li);
    });
}

/**
 * Función que se ejecuta cuando se envía el formulario (al hacer clic en "Filtrar").
 * Realiza la lógica de filtrado de palabras.
 * @param {Event} event - El objeto de evento del formulario (submit).
 */
filtroForm.addEventListener('submit', (event) => {
    // Previene que el navegador recargue la página, que es el comportamiento por defecto de un formulario
    event.preventDefault();

    // Obtener el texto del input de filtro y eliminar espacios en blanco al inicio/final
    const textoFiltro = filtroInput.value.trim();

    // --- Validación: Si el campo de texto está vacío ---
    if (textoFiltro === "") {
        mensajeErrorDiv.textContent = "Por favor, ingresa un texto para filtrar."; // Mostrar mensaje de error
        renderizarLista(palabrasPredefinidas); // Vuelve a mostrar la lista completa si el input está vacío
        return; // Detiene la ejecución de la función
    } else {
        mensajeErrorDiv.textContent = ""; // Limpiar cualquier mensaje de error anterior
    }

    // Convertir el texto de filtro a minúsculas para una búsqueda insensible a mayúsculas/minúsculas
    const textoFiltroMinusculas = textoFiltro.toLowerCase();

    // Filtrar las palabras predefinidas:
    // `filter()` crea un nuevo array con todas las palabras que cumplan la condición.
    // `includes()` verifica si una cadena contiene otra (el texto de filtro).
    const palabrasFiltradas = palabrasPredefinidas.filter(palabra =>
        palabra.toLowerCase().includes(textoFiltroMinusculas)
    );

    // Actualizar el contenido mostrado en la página con las palabras filtradas
    renderizarLista(palabrasFiltradas);
});

// --- Carga inicial de la página ---
// Cuando el DOM esté completamente cargado, mostramos la lista completa de palabras.
document.addEventListener('DOMContentLoaded', () => {
    renderizarLista(palabrasPredefinidas);
});